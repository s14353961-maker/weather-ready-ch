/*
  Weather Ready CH – content.js
  ---------------------------------------------------------------
  Purpose: ALL quiz text lives in this one file, so the content can be
  edited without touching the app code (js/app.js).

  NOTE: the questions below are PLACEHOLDERS written for the prototype.
  Replace them with the content supplied by the project team.

  How to edit:
  - Each scenario has: id, title, blurb (short description), color, icon
    and a list of questions.
  - Each question has:
      q        the question text
      options  the answer choices (2 or more)
      answer   the number of the correct option, COUNTING FROM 0
               (0 = first option, 1 = second, 2 = third)
      explain  the explanation shown after answering
      link     label + url of the official guidance
  - Keep the quotes, commas and brackets exactly as they are.
    After editing, reload index.html in the browser to see the changes.

  Why a .js file and not .json? A .json file cannot be loaded when
  index.html is opened directly from the computer (browser security rule),
  but a .js file can. This keeps the app runnable without a server.
*/

const CONTENT = {
  scenarios: [

    /* ---------- Scenario 1: Flooding ---------- */
    {
      id: "flood",                       // internal name, must be unique, no spaces
      title: "Flooding",                 // shown on the card and quiz screens
      blurb: "Heavy rain, rising rivers and flooded cellars",
      color: "--flood",                  // colour variable defined in css/style.css
      // Icon drawn as SVG lines (wave and raindrop). No image file needed.
      icon: '<path d="M3 15c2 0 2-1.5 4.5-1.5S10 15 12 15s2.5-1.5 4.5-1.5S19 15 21 15M3 19c2 0 2-1.5 4.5-1.5S10 19 12 19s2.5-1.5 4.5-1.5S19 19 21 19M12 3s-4 4.5-4 7a4 4 0 0 0 8 0c0-2.5-4-7-4-7z"/>',
      questions: [
        {
          q: "A flood warning is issued for your area and water is entering the building. Where should you go?",
          options: ["Into the basement to save belongings", "To an upper floor", "Outside to your car to drive away"],
          answer: 1,
          explain: "Basements can fill with water very quickly and doors may become impossible to open. Move to higher floors.",
          link: { label: "natural-hazards.ch – Flooding", url: "https://www.natural-hazards.ch" }
        },
        {
          q: "A road ahead is covered by flowing water about 30 cm deep. What do you do?",
          options: ["Drive through slowly", "Walk through holding on to the railing", "Turn around and find another route"],
          answer: 2,
          explain: "Even shallow flowing water can sweep away people and cars, and the road beneath may be damaged.",
          link: { label: "natural-hazards.ch – Behaviour", url: "https://www.natural-hazards.ch" }
        },
        {
          q: "Where can you check the official danger level for your region in Switzerland?",
          options: ["Social media posts", "The MeteoSwiss app or natural-hazards.ch", "A general weather site from abroad"],
          answer: 1,
          explain: "Official Swiss warnings use danger levels 1–5 and are published by the federal authorities.",
          link: { label: "MeteoSwiss – Warnings", url: "https://www.meteoswiss.admin.ch" }
        }
      ]
    },

    /* ---------- Scenario 2: Heatwaves ---------- */
    {
      id: "heat",
      title: "Heatwaves",
      blurb: "Several days above 30 °C, hot nights",
      color: "--heat",
      // Sun icon
      icon: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
      questions: [
        {
          q: "When is the best time to air out your flat during a heatwave?",
          options: ["At midday", "Late at night and early morning", "Keep windows open all day"],
          answer: 1,
          explain: "Ventilate when outside air is coolest and keep windows and blinds closed during the day.",
          link: { label: "FOPH – Heatwaves", url: "https://www.bag.admin.ch" }
        },
        {
          q: "Which drink is best for staying hydrated in extreme heat?",
          options: ["Water, regularly, before you feel thirsty", "Alcohol, because it is cold", "Several energy drinks"],
          answer: 0,
          explain: "Drink regularly even without thirst. Alcohol and very sugary drinks increase fluid loss.",
          link: { label: "FOPH – Heatwaves", url: "https://www.bag.admin.ch" }
        },
        {
          q: "An older neighbour lives alone. What is the most helpful action during a heatwave?",
          options: ["Nothing, adults can manage", "Check on them daily", "Advise a walk in the afternoon sun"],
          answer: 1,
          explain: "Older people are at higher risk and may not notice dehydration. Regular contact helps.",
          link: { label: "FOPH – Heatwaves", url: "https://www.bag.admin.ch" }
        }
      ]
    },

    /* ---------- Scenario 3: Severe thunderstorms ---------- */
    {
      id: "storm",
      title: "Severe thunderstorms",
      blurb: "Lightning, hail and violent gusts",
      color: "--storm",
      // Cloud with lightning bolt icon
      icon: '<path d="M7 16a5 5 0 1 1 1.5-9.8A6 6 0 0 1 20 9a4 4 0 0 1-1 7.9M13 12l-3 5h4l-3 5"/>',
      questions: [
        {
          q: "You are hiking and hear thunder. What should you do?",
          options: ["Shelter under a lone tall tree", "Leave ridges and summits and seek a building", "Continue to the summit quickly"],
          answer: 1,
          explain: "Exposed high points and isolated trees attract lightning. Descend and find solid shelter.",
          link: { label: "MeteoSwiss – Thunderstorms", url: "https://www.meteoswiss.admin.ch" }
        },
        {
          q: "Hail is forecast this afternoon. What can you do in advance?",
          options: ["Park the car under cover and bring in loose objects", "Open the windows", "Nothing can be done"],
          answer: 0,
          explain: "Protecting vehicles and securing outdoor objects reduces damage and flying debris.",
          link: { label: "natural-hazards.ch – Hail", url: "https://www.natural-hazards.ch" }
        },
        {
          q: "Lightning is close. Which place is safest?",
          options: ["A tent", "Inside a car or a building", "Open field, lying flat"],
          answer: 1,
          explain: "Closed cars and buildings protect you. Tents and open ground offer no protection.",
          link: { label: "MeteoSwiss – Thunderstorms", url: "https://www.meteoswiss.admin.ch" }
        }
      ]
    }

  ]
};
