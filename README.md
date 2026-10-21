# Weather Ready CH

A small educational quiz web app that helps students in Switzerland learn how to stay safe during extreme weather. It covers three scenarios: flooding, heatwaves and severe thunderstorms.

> **Status:** prototype. The questions are placeholders until the final content is supplied by the project team.

## Features

- Home page with three scenarios
- Three multiple-choice questions per scenario
- Feedback after each answer, with an explanation and a link to official guidance
- Final score and summary, with options to restart or choose another scenario
- Works on mobile and desktop, supports dark mode and keyboard navigation
- No accounts, no database, no tracking

## Run locally

No installation is required.

1. Download or clone this repository:
   ```
   git clone https://github.com/<your-username>/weather-ready-ch.git
   ```
2. Open `index.html` in any modern browser (Chrome, Firefox, Safari, Edge) by double-clicking it.

Optional: to serve it like a website, run `python -m http.server` in the project folder and open http://localhost:8000.

## Edit the content

All questions, answers, explanations and links are in **`js/content.js`**. The instructions for editing are at the top of that file. Note that `answer` counts from 0 (0 = first option). Save the file and reload the page to see the changes.

## Project structure

```
weather-ready-ch/
├── index.html       Page frame; loads the styles and scripts
├── css/
│   └── style.css    Colours, layout, dark mode
├── js/
│   ├── content.js   Editable quiz content
│   └── app.js       Quiz logic (screens, scoring, feedback)
└── README.md
```

## Publish with GitHub Pages (optional)

In the repository on GitHub: **Settings → Pages → Branch: `main` / root → Save**. The app will be available at `https://<your-username>.github.io/weather-ready-ch/`.

## Dependencies and third-party assets

| Item | Source | Licence |
|---|---|---|
| Barlow Semi Condensed (font) | Google Fonts | SIL Open Font License 1.1 |
| Source Sans 3 (font) | Google Fonts | SIL Open Font License 1.1 |
| Icons | Drawn as inline SVG for this project | Part of this project |

No JavaScript libraries or frameworks are used. If the fonts cannot load, system fonts are used instead.

## Use of generative AI

An AI coding assistant (Claude, by Anthropic) was used to draft the code and the placeholder questions. All output was reviewed by the developer and tested manually in desktop and mobile browsers. The final quiz content is supplied and checked by the project team.
