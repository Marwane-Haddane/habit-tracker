# Frontend Assessment Answers

## 1. How to run

Install Node.js, then run:

```bash
npm install
npm run dev
```

Open the local Vite URL, usually `http://localhost:5173`.

To make a production build:

```bash
npm run build
```

No deployed URL yet.

## 2. Stack & design choices

I used React with Vite because this app has small pieces of interactive state: habits, checkmarks, the selected week, and inline renaming. Vite keeps the setup simple, and React makes it easy to update the grid when the user clicks a day or changes weeks.

I chose a Monday-start week because it reads like a school/work planning week: weekdays first, then the weekend at the end. That makes the weekly grid easier to scan when the user is checking daily routines.

Visual decision 1: the tracker is a table with habits down the left and days across the top because the main question is "did I do this habit on this date?" A grid answers that faster than a list of cards.

Visual decision 2: today's column gets a soft blue background, while completed cells use stronger green. The highlight tells the user where they are in the week, and the green is saved for actual progress.

For streaks, "current" counts through today if today is checked. If today is not checked, it counts the streak up to yesterday. I picked this because missing today's check early in the day should not immediately make a good streak look broken.

## 3. Responsive & accessibility

On a 360px phone, the layout stacks: nav stays simple, the hero becomes one column, the add form becomes vertical, and the grid scrolls horizontally so the day columns stay readable.

On a 1440px laptop, the hero uses two columns and the tracker has more breathing room. The table can show habits, seven days, streaks, and actions without feeling cramped.

Accessibility handled: inputs and buttons have labels or clear accessible names, the check buttons use `aria-pressed`, keyboard focus has a visible outline, and future dates are disabled instead of silently accepting clicks.

Accessibility skipped: I did not add a full screen-reader-only table summary for the grid. With another pass, I would add a short hidden description explaining the Monday-start week and disabled future dates.

## 4. AI usage

I used OpenAI Codex in this editor to refactor the existing React/Vite project. I asked it to create a medium-level student habit tracker with a navbar, footer, hero area, localStorage persistence, weekly grid, streaks, and responsive styling.

Codex gave me the React component structure, CSS, README, and this ANSWERS.md draft. I changed the output to keep it simpler and more student-like: no extra libraries, no icons package, and no complex date library. I also kept the grid as a plain HTML table because it is easier to understand and more accessible than a custom div grid.

For the hero image, I asked Codex for a Nano Banana prompt. The image itself is not generated in the repo yet. The app expects `public/hero-habit.png`, and I left a styled fallback so the page still looks complete before the final image is added.

One specific AI-output change: the first persistence approach loaded localStorage inside an effect and ESLint complained about synchronous setState in the effect. I changed it to lazy initial state, so the saved data is read before the first render and the lint rule passes.

## 5. Honest gap

The least polished part is the inline rename flow. It works, but it is basic: it saves every typed change immediately and has no cancel button. With another day, I would add Save and Cancel buttons, prevent empty habit names, and show a small confirmation before deleting a habit.
