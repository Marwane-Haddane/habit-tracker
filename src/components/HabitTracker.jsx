import { useEffect, useState } from 'react';
import './HabitTracker.css';

const STORAGE_KEY = 'habit-tracker-data-v2';
const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function getWeekStart(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function getDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getWeekDates(weekStart) {
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(weekStart);
    date.setDate(date.getDate() + index);
    return date;
  });
}

function formatShortDate(date) {
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

function formatLongDate(date) {
  return date.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });
}

function loadSavedData() {
  const fallback = {
    habits: [],
    checks: {},
    week: getWeekStart(new Date()),
  };

  try {
    const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('habit-tracker-data');
    if (!saved) return fallback;

    const data = JSON.parse(saved);
    return {
      habits: data.habits || [],
      checks: data.checks || {},
      week: data.week ? new Date(data.week) : fallback.week,
    };
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return fallback;
  }
}

export default function HabitTracker() {
  const [savedData] = useState(loadSavedData);
  const [habits, setHabits] = useState(savedData.habits);
  const [currentWeekStart, setCurrentWeekStart] = useState(savedData.week);
  const [checks, setChecks] = useState(savedData.checks);
  const [newHabit, setNewHabit] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const data = {
      habits,
      checks,
      week: currentWeekStart.toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [habits, checks, currentWeekStart]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayKey = getDateKey(today);
  const thisWeekStart = getWeekStart(today);
  const weekDates = getWeekDates(currentWeekStart);
  const weekEnd = weekDates[6];
  const isThisWeek = getDateKey(currentWeekStart) === getDateKey(thisWeekStart);

  const addHabit = (event) => {
    event.preventDefault();
    if (!newHabit.trim()) return;

    const id = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString();
    setHabits([...habits, { id, name: newHabit.trim() }]);
    setNewHabit('');
  };

  const renameHabit = (id, name) => {
    setHabits(habits.map((habit) => (habit.id === id ? { ...habit, name } : habit)));
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter((habit) => habit.id !== id));
    setChecks((currentChecks) => {
      const nextChecks = { ...currentChecks };
      Object.keys(nextChecks).forEach((key) => {
        if (key.startsWith(`${id}_`)) delete nextChecks[key];
      });
      return nextChecks;
    });
  };

  const toggleCheck = (habitId, dateKey) => {
    const key = `${habitId}_${dateKey}`;
    setChecks((currentChecks) => ({ ...currentChecks, [key]: !currentChecks[key] }));
  };

  const changeWeek = (offset) => {
    const newStart = new Date(currentWeekStart);
    newStart.setDate(newStart.getDate() + offset * 7);
    setCurrentWeekStart(newStart);
  };

  const calculateStreak = (habitId) => {
    let streak = 0;
    const cursor = new Date(today);

    if (!checks[`${habitId}_${todayKey}`]) {
      cursor.setDate(cursor.getDate() - 1);
    }

    while (true) {
      const key = `${habitId}_${getDateKey(cursor)}`;
      if (!checks[key]) break;
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    }

    return streak;
  };

  return (
    <section className="tracker-section" id="tracker" aria-labelledby="tracker-title">
      <div className="tracker-header">
        <div>
          <p className="section-kicker">Current week grid</p>
          <h2 id="tracker-title">Your habits</h2>
        </div>
        <p className="tracker-summary">
          {habits.length === 0
            ? 'No habits yet'
            : `${habits.length} habit${habits.length === 1 ? '' : 's'} tracked`}
        </p>
      </div>

      <form className="add-habit" onSubmit={addHabit}>
        <label htmlFor="habit-name">Add a daily habit</label>
        <div className="add-row">
          <input
            id="habit-name"
            placeholder="Read 30 min"
            value={newHabit}
            onChange={(event) => setNewHabit(event.target.value)}
          />
          <button type="submit">Add</button>
        </div>
      </form>

      <div className="week-nav" aria-label="Week navigation">
        <button type="button" onClick={() => changeWeek(-1)} aria-label="Previous week">
          Prev
        </button>
        <div className="week-range" aria-live="polite">
          <strong>{formatShortDate(currentWeekStart)} - {formatShortDate(weekEnd)}</strong>
          <span>{isThisWeek ? 'This week' : 'Viewing another week'}</span>
        </div>
        <button type="button" onClick={() => changeWeek(1)} aria-label="Next week">
          Next
        </button>
        <button type="button" className="quiet-button" onClick={() => setCurrentWeekStart(thisWeekStart)}>
          Back to this week
        </button>
      </div>

      {habits.length === 0 ? (
        <div className="empty-state">
          <h3>No habits yet</h3>
          <p>Add one small daily habit above. Your weekly grid will appear here.</p>
        </div>
      ) : (
        <div className="grid-wrap" aria-label="Weekly habit grid">
          <table className="habit-grid">
            <thead>
              <tr>
                <th scope="col" className="habit-column">Habit</th>
                {weekDates.map((date, index) => {
                  const dateKey = getDateKey(date);
                  const isToday = dateKey === todayKey;
                  return (
                    <th key={dateKey} scope="col" className={isToday ? 'today-column' : ''}>
                      <span>{DAY_LABELS[index]}</span>
                      <small>{date.getDate()}</small>
                    </th>
                  );
                })}
                <th scope="col" className="streak-column">Streak</th>
                <th scope="col" className="actions-column">Edit</th>
              </tr>
            </thead>
            <tbody>
              {habits.map((habit) => (
                <tr key={habit.id}>
                  <th scope="row" className="habit-name">
                    {editingId === habit.id ? (
                      <input
                        value={habit.name}
                        aria-label={`Rename ${habit.name}`}
                        onChange={(event) => renameHabit(habit.id, event.target.value)}
                        onBlur={() => setEditingId(null)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') setEditingId(null);
                        }}
                        autoFocus
                      />
                    ) : (
                      <span>{habit.name}</span>
                    )}
                  </th>
                  {weekDates.map((date) => {
                    const dateKey = getDateKey(date);
                    const checked = !!checks[`${habit.id}_${dateKey}`];
                    const isToday = dateKey === todayKey;
                    const isFuture = date > today;

                    return (
                      <td key={dateKey} className={isToday ? 'today-cell' : ''}>
                        <button
                          type="button"
                          className={`check-cell ${checked ? 'is-checked' : ''}`}
                          onClick={() => toggleCheck(habit.id, dateKey)}
                          aria-pressed={checked}
                          aria-label={`${habit.name} on ${formatLongDate(date)}`}
                          disabled={isFuture}
                        >
                          {checked ? '✓' : ''}
                        </button>
                      </td>
                    );
                  })}
                  <td className="streak-count">
                    <strong>{calculateStreak(habit.id)}</strong>
                    <span>days</span>
                  </td>
                  <td className="row-actions">
                    <button type="button" onClick={() => setEditingId(habit.id)}>
                      Rename
                    </button>
                    <button type="button" className="danger-button" onClick={() => deleteHabit(habit.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
