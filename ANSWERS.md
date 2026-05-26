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

## Deployment

This project is hosted on **Firebase Hosting**. Follow these steps to build and deploy your own updates:
 Live Demo
You can view the live application here:
```
👉 https://habit-tracker4marwane.web.app
```

### Prerequisites
#### 1-Make sure you have the Firebase CLI tools installed globally:
```bash
npm install -g firebase-tools
```
#### 2-Deployment Steps

#### 2.1-Build the production assets:
This creates a optimized, production-ready dist/ folder.

Bash
```
   npm run build
```
#### 2.2-Initialize Firebase (First time only):

Bash
```
   npx firebase init
```
When prompted, use these configuration settings:

Feature: Choose Hosting: Set up deployments for static web apps.

Project Setup: Select Use an existing project and pick your habit tracker project (or create a new project)

Public directory: Type dist (matching your Vite build output after building the project in steps before).

Single-page app configuration: Choose Yes (rewrites all URLs to /index.html).

Overwrite dist/index.html: Choose No to prevent overwriting your built files.

#### 2.3-Deploy live to the web:

Bash
```
   npx firebase deploy
```


---



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

I used gemini to handle some problems of letting website responsive and add some some hover effect

i use the nanobanana to generate the image of the hero

i use ai to write some of readme file and answer.md actually ( by the way now i write the answers manually hahaha )

## 5. Honest gap

In this version i don't add a login to give each user the possibility to use this app it's actually complex alittle bit and need backend for high level project to store username and password in database using sqlite or mangodb atlas ... , and for the backend i will use the flask to capture the ip of the user in case i don't add login i can see the ip of the user who write a habit their, for the feature that i thought is to add an ai that give advices based on the habits, give some statistics on how those habits gonna effect ur longterm life, so that is what i think about right now   
