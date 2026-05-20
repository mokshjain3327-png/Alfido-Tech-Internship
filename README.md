Here's your README:

---

# 🧠 BrainBurst — Interactive Quiz App

A mini interactive quiz application built with vanilla HTML, CSS, and JavaScript using DOM manipulation. Features a live countdown timer, instant answer feedback, score tracking, and a results screen — all without any frameworks or libraries.

---

## 🔗 Live Demo

[View Live App](https://mokshjain3327-png.github.io/quiz-app)

---

## 📌 Table of Contents

- [About](#about)
- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [File Structure](#file-structure)
- [How It Works](#how-it-works)
- [DOM Concepts Used](#dom-concepts-used)
- [Questions Covered](#questions-covered)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Contact](#contact)

---

## About

BrainBurst is a browser-based quiz app built as part of an internship task focused on JavaScript DOM manipulation. The app presents 10 IT-focused multiple choice questions, one at a time, with a 15-second countdown per question. It tracks the user's score in real time and displays a detailed result summary at the end.

No frameworks. No libraries. Pure HTML, CSS, and JavaScript.

---

## ✨ Features

- 10 IT-focused multiple choice questions
- 15-second countdown timer per question with animated SVG ring
- Timer turns red in the last 5 seconds as a warning
- Live score counter updates on every correct answer
- Progress bar fills as you move through questions
- Instant color-coded feedback — green for correct, red for wrong
- Correct answer is always highlighted, even if time runs out
- Result screen with final score, accuracy percentage, correct count, and wrong count
- Dynamic result message based on performance (5 different tiers)
- Play Again button resets everything cleanly
- Fully responsive — works on mobile, tablet, and desktop
- Clean dark UI with indigo accent colors and subtle grid background

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Page structure, semantic elements |
| CSS3 | Styling, animations, responsive layout, SVG ring |
| JavaScript (Vanilla ES5/ES6) | Quiz logic, DOM manipulation, timer, state management |
| Google Fonts | Typography — Bebas Neue + Manrope |

No frameworks. No build tools. No dependencies.

---

## 📁 File Structure

```
quiz-app/
│
├── index.html    →  Page structure and all screen layouts
├── style.css     →  All styling, animations, color variables, responsive rules
└── script.js     →  All quiz logic, DOM manipulation, timer, scoring
```

Each file has a single responsibility. HTML handles structure, CSS handles appearance, JS handles behaviour — clean separation of concerns.

---

## ⚙️ How It Works

### Screen Flow
The app has three screens managed in JavaScript:

```
Start Screen  →  Quiz Screen  →  Result Screen
                    ↑                  |
                    └──── Play Again ──┘
```

Only one screen is visible at a time. The `showScreen()` function removes the `active` class from all screens and adds it to the target screen.

### Timer Logic
Each question starts a `setInterval` that ticks every 1000ms. The SVG circle's `stroke-dashoffset` is updated each tick to visually shrink the ring. At 5 seconds remaining, the ring turns red. At 0, the question is auto-submitted as wrong and the correct answer is highlighted.

```js
var offset = CIRCUMFERENCE * (1 - timeLeft / TOTAL_TIME);
timerArc.style.strokeDashoffset = offset;
```

### Answer Checking
When a user clicks an option, the selected text is compared directly against the stored answer string. The correct option button gets a `.correct` class (green), and the wrong one gets a `.wrong` class (red). All buttons are then disabled to prevent multiple clicks.

### Score Tracking
Score is stored as a plain variable. On every correct answer it increments and the live score display in the top bar is updated via `textContent`. At the end, accuracy is calculated as:

```js
var pct = Math.round((score / questions.length) * 100);
```

---

## 🧩 DOM Concepts Used

This project demonstrates the following JavaScript DOM manipulation concepts:

- `document.getElementById()` — selecting elements by ID
- `element.addEventListener()` — attaching click and event listeners
- `element.classList.add/remove()` — toggling CSS classes dynamically
- `element.textContent` — updating text content of elements
- `element.style.display / style.width` — directly manipulating inline styles
- `document.createElement()` — dynamically creating option buttons
- `element.innerHTML` — injecting HTML into the options grid
- `element.disabled` — disabling buttons after answer selection
- `setInterval / clearInterval` — managing the countdown timer
- `querySelectorAll + forEach` — iterating over multiple elements

---

## 📝 Questions Covered

The quiz covers 10 multiple choice questions across 5 IT categories:

| # | Category | Topic |
|---|---|---|
| 1 | Web Development | HTML `<link>` tag for CSS |
| 2 | JavaScript | Array `push()` method |
| 3 | Java | `extends` keyword for inheritance |
| 4 | Databases | SQL `WHERE` clause |
| 5 | Networking | What VLAN stands for |
| 6 | Web Development | CSS `margin` vs `padding` |
| 7 | JavaScript | What DOM stands for |
| 8 | General IT | HTML is markup, not programming |
| 9 | Databases | SQL `SELECT` command |
| 10 | General IT | What CPU stands for |

---

## 🚀 Getting Started

### Run Locally

No installation or server required.

```bash
# 1. Clone or download the repository
git clone https://github.com/mokshjain3327-png/quiz-app.git

# 2. Open the folder
cd quiz-app

# 3. Open index.html directly in your browser
# On Mac:
open index.html

# On Windows:
start index.html
```

> **Important:** All three files (`index.html`, `style.css`, `script.js`) must be in the **same folder** for the app to work correctly. The HTML file links to the CSS and JS by filename.

### Add Your Own Questions

Questions are stored as a plain array of objects in `script.js`. To add or edit questions, update the `questions` array at the top of the file:

```js
{
  cat: "Your Category",
  q: "Your question here?",
  opts: ["Option A", "Option B", "Option C", "Option D"],
  ans: "Option A"   // must exactly match one of the opts
}
```

---

## 🌐 Deployment on GitHub Pages

1. Create a new GitHub repository (e.g. `quiz-app`)
2. Upload all three files — `index.html`, `style.css`, `script.js` — into the root of the repo
3. Go to **Settings → Pages**
4. Under **Source**, select **Branch: main** and folder **/ (root)**
5. Click **Save**
6. Your app will be live at:

```
https://mokshjain3327-png.github.io/Alfido-Tech-Internship/
```
---

## 📬 Contact

**Moksh Jain**
BSc IT Student — K.C. College, Mumbai

- 📧 Email: [mokshjain3327@gmail.com](mailto:mokshjain3327@gmail.com)
- 📞 Phone: +91 8369042773
- 💻 GitHub: [github.com/mokshjain3327-png](https://github.com/mokshjain3327-png/projects)
- 📍 Location: Virar (West), Mumbai, Maharashtra

---

Built with vanilla JavaScript as part of an internship project — 2026
