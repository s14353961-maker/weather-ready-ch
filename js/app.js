/*
  Weather Ready CH – app.js
  ---------------------------------------------------------------
  Purpose: the quiz logic. It reads the questions from CONTENT
  (defined in js/content.js) and draws each screen into <main id="app">.

  Screen flow:
    home()  ->  start(id)  ->  question()  ->  answer()  -> (next question)
                                                         -> summary()
    From summary(): "Restart scenario" -> start(id), "Choose another" -> home()

  No data is saved or sent anywhere; everything happens in the browser.
*/

/* ===== 1. APP STATE =====
   These three variables remember where the user is in the quiz. */
const app = document.getElementById('app');  // the element every screen is drawn into
let scenario = null;   // the scenario currently being played (an object from CONTENT)
let index = 0;         // number of the current question (0 = first)
let picks = [];        // the option the user chose for each question, in order

/* ===== 2. HELPER FUNCTIONS ===== */

// Makes text safe to insert into HTML (e.g. "<" becomes "&lt;"),
// so that characters in the content file cannot break the page.
function esc(text) {
  return String(text).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

// Wraps the SVG path data from content.js in a complete <svg> icon element.
function icon(paths) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
}

// Builds the row of progress bars (one bar per question, filled up to the current one).
function progressBar() {
  const total = scenario.questions.length;
  const bars = scenario.questions
    .map((_, k) => `<i class="${k <= index ? 'done' : ''}"></i>`)
    .join('');
  return `<div class="progress" aria-label="Question ${index + 1} of ${total}">${bars}</div>`;
}

/* ===== 3. HOME SCREEN =====
   Shows the intro text, the Swiss danger-level scale and one card per scenario. */
function home() {
  scenario = null;

  // One clickable card for each scenario in content.js
  const cards = CONTENT.scenarios.map(s => `
    <button class="card" style="--c: var(${s.color})" data-id="${s.id}">
      ${icon(s.icon)}
      <span><b>${esc(s.title)}</b><small>${esc(s.blurb)} · ${s.questions.length} questions</small></span>
      <span class="go">Start →</span>
    </button>`).join('');

  app.innerHTML = `
    <div class="stack">
      <h1>Are you ready for extreme weather?</h1>
      <p class="lead">Choose a scenario and answer three questions. Each answer comes with an explanation and a link to official Swiss guidance.</p>

      <!-- Swiss official danger levels 1 (low) to 5 (very high), as used by MeteoSwiss -->
      <div class="levels" aria-hidden="true">Swiss danger levels
        <span style="background:#7fc97f"></span><span style="background:#f7e84a"></span><span style="background:#f5a623"></span><span style="background:#e2382c"></span><span style="background:#8b1a1a"></span> 1–5
      </div>

      <div class="cards">${cards}</div>
    </div>`;

  // When a card is clicked, start that scenario
  app.querySelectorAll('.card').forEach(button => {
    button.onclick = () => start(button.dataset.id);
  });
}

/* ===== 4. START A SCENARIO =====
   Finds the chosen scenario, resets the progress and shows the first question. */
function start(id) {
  scenario = CONTENT.scenarios.find(s => s.id === id);
  index = 0;
  picks = [];
  question();
}

/* ===== 5. QUESTION SCREEN =====
   Shows the current question with its answer options. */
function question() {
  const q = scenario.questions[index];
  const total = scenario.questions.length;

  // Answer buttons labelled A, B, C, ...
  const options = q.options.map((option, k) => `
    <button class="opt" data-k="${k}">
      <span class="k">${String.fromCharCode(65 + k)}</span><span>${esc(option)}</span>
    </button>`).join('');

  app.innerHTML = `
    <div class="stack" style="--c: var(${scenario.color})">
      <div class="top">
        <span class="tag">${esc(scenario.title)} · ${index + 1}/${total}</span>
        ${progressBar()}
      </div>
      <div class="q">
        <h2>${esc(q.q)}</h2>
        <div class="opts">${options}</div>
        <div id="feedback"></div> <!-- filled by answer() after the user chooses -->
      </div>
      <div class="row"><button class="btn ghost" id="quit">All scenarios</button></div>
    </div>`;

  // Clicking an option checks the answer
  app.querySelectorAll('.opt').forEach(button => {
    button.onclick = () => answer(Number(button.dataset.k));
  });
  document.getElementById('quit').onclick = home;

  // Move keyboard focus to the first option so keyboard users can answer straight away
  app.querySelector('.opt').focus({ preventScroll: true });
}

/* ===== 6. CHECK AN ANSWER AND SHOW FEEDBACK =====
   Locks the options, colours the correct (green) and the wrong choice (red),
   and shows the explanation with the link to official guidance. */
function answer(chosen) {
  const q = scenario.questions[index];
  const correct = chosen === q.answer;
  picks.push(chosen);   // remember the choice for the final summary

  // Disable all options and mark the right / wrong ones
  app.querySelectorAll('.opt').forEach((button, k) => {
    button.disabled = true;
    if (k === q.answer) button.classList.add('right');
    else if (k === chosen) button.classList.add('wrong');
  });

  const isLast = index === scenario.questions.length - 1;

  document.getElementById('feedback').innerHTML = `
    <div class="fb ${correct ? 'ok' : 'no'}">
      <strong>${correct ? 'Correct' : 'Not quite'}</strong>
      <p>${esc(q.explain)}</p>
      <p>Official guidance: <a href="${esc(q.link.url)}" target="_blank" rel="noopener">${esc(q.link.label)}</a></p>
    </div>
    <div class="row" style="margin-top:12px">
      <button class="btn" id="next">${isLast ? 'See my score' : 'Next question'}</button>
    </div>`;

  // "Next question" goes on; after the last question it opens the summary
  const next = document.getElementById('next');
  next.onclick = () => {
    if (isLast) summary();
    else { index++; question(); }
  };
  next.focus();
}

/* ===== 7. RESULT SCREEN =====
   Shows the score, a short message and a review of every question. */
function summary() {
  const total = scenario.questions.length;

  // Count how many chosen options match the correct answer
  const score = scenario.questions.reduce((sum, q, k) => sum + (picks[k] === q.answer ? 1 : 0), 0);

  // Message depends on the score
  let message;
  if (score === total) message = 'Excellent. You know how to stay safe.';
  else if (score > 0)  message = 'Good start. Review the guidance for the questions you missed.';
  else                 message = 'Take a look at the official guidance and try again.';

  // One row per question: ✓ or ✗, the question, the correct answer and the source link
  const rows = scenario.questions.map((q, k) => {
    const right = picks[k] === q.answer;
    return `
      <li>
        <span class="m ${right ? 'y' : 'n'}" aria-label="${right ? 'correct' : 'wrong'}">${right ? '✓' : '✗'}</span>
        <span>${esc(q.q)}<br>
          <small>Answer: ${esc(q.options[q.answer])} ·
            <a href="${esc(q.link.url)}" target="_blank" rel="noopener">${esc(q.link.label)}</a></small>
        </span>
      </li>`;
  }).join('');

  app.innerHTML = `
    <div class="stack" style="--c: var(${scenario.color})">
      <span class="tag">${esc(scenario.title)} · Result</span>
      <div class="result-head">
        <span class="score">${score}/${total}</span>
        <h2>${message}</h2>
      </div>
      <ul class="sum">${rows}</ul>
      <div class="row">
        <button class="btn" id="again">Restart scenario</button>
        <button class="btn ghost" id="other">Choose another scenario</button>
      </div>
    </div>`;

  document.getElementById('again').onclick = () => start(scenario.id);
  document.getElementById('other').onclick = home;
}

/* ===== 8. START THE APP =====
   Show the home screen as soon as the page has loaded. */
home();
