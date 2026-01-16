

// Upper Body Innervation app script
// This script powers the upper body page by loading the Innervation SVGs,
// organising them into routines, handling user preferences for duration,
// rest and rounds, and animating a progress bar that fills and empties on
// alternating movements.

// CONFIGURE IMAGE PATH
// The SVGs reside in the InnervationSVGs directory at the site root.
// Do not rename files or directories; simply ensure this constant points
// to the folder containing the individual movement SVGs.
const IMAGE_BASE_PATH = "InnervationSVGs/";

// Upper body routines definition.  Each routine key lists the SVG filename
// and an order value.  The order ensures movements are presented in the
// correct sequence.  Do not change filenames or orders.
const ROUTINES = {
  // Palms together (clasp) – renamed for clarity
  PALMSTOGETHER: [
    { file: "2_CLASPMID_LEFT_D_IMG.svg", order: 1 },
    { file: "2_CLASPMID_RIGHT_D_IMG.svg", order: 4 },
    { file: "2_CLASPUP_LEFT_D_IMG.svg", order: 3 },
    { file: "2_CLASPUP_RIGHT_D_IMG.svg", order: 6 },
    { file: "2_CLASPDOWN_LEFT_D_IMG.svg", order: 2 },
    { file: "2_CLASPDOWN_RIGHT_D_IMG.svg", order: 5 }
  ],
  PALMIN: [
    { file: "2_PALMIN_UP_D_IMG.svg", order: 1 },
    { file: "2_PALMIN_IN_D_IMG.svg", order: 2 },
    { file: "2_PALMIN_DOWN_D_IMG.svg", order: 3 },
    { file: "2_PALMIN_OUT_D_IMG.svg", order: 4 }
  ],
  PALMOPEN: [
    { file: "2_PALMOPEN_UP_D_IMG.svg", order: 1 },
    { file: "2_PALMOPEN_IN_D_IMG.svg", order: 2 },
    { file: "2_PALMOPEN_DOWN_D_IMG.svg", order: 3 },
    { file: "2_PALMOPEN_OUT_D_IMG.svg", order: 4 }
  ],
  PALMOUT: [
    { file: "2_PALMOUT_DOWN_D_IMG.svg", order: 1 },
    { file: "2_PALMOUT_OUT_D_IMG.svg", order: 2 },
    { file: "2_PALMOUT_UP_D_IMG.svg", order: 3 },
    { file: "2_PALMOUT_IN_D_IMG.svg", order: 4 }
  ],
  PALMCLOSED: [
    { file: "2_PALMCLOSED_UP_D_IMG.svg", order: 1 },
    { file: "2_PALMCLOSED_IN_D_IMG.svg", order: 2 },
    { file: "2_PALMCLOSED_DOWN_D_IMG.svg", order: 3 },
    { file: "2_PALMCLOSED_OUT_D_IMG.svg", order: 4 }
  ],
  HEARTOPEN: [
    { file: "2_HEARTOPEN_RIGHT_D_IMG.svg", order: 1 },
    { file: "2_HEARTOPEN_LEFT_D_IMG.svg", order: 2 },
    { file: "2_HEARTOPEN_BOTH_D_IMG.svg", order: 3 }
  ],
  HEARTPROTECTED: [
    { file: "2_HEARTPROTECTED_RIGHT_D_IMG.svg", order: 1 },
    { file: "2_HEARTPROTECTED_LEFT_D_IMG.svg", order: 2 },
    { file: "2_HEARTPROTECTED_BOTH_D_IMG.svg", order: 3 }
  ],
  SCAPULA: [
    { file: "2_SCAPULA_RIGHT_D_IMG.svg", order: 1 },
    { file: "2_SCAPULA_LEFT_D_IMG.svg", order: 2 },
    { file: "2_SCAPULA_BOTH_D_IMG.svg", order: 3 }
  ],
  // Cross – Open Palm sequences (five directions)
  CROSSOPENBACKWARD: [
    { file: "2_CROSSPALM_BACKWARD_0_IMG.svg", order: 1 },
    { file: "2_CROSSPALM_BACKWARD_45L_IMG.svg", order: 2 },
    { file: "2_CROSSPALM_BACKWARD_90L_IMG.svg", order: 3 },
    { file: "2_CROSSPALM_BACKWARD_135L_IMG.svg", order: 4 },
    { file: "2_CROSSPALM_BACKWARD_45R_IMG.svg", order: 5 },
    { file: "2_CROSSPALM_BACKWARD_90R_IMG.svg", order: 6 },
    { file: "2_CROSSPALM_BACKWARD_135R_IMG.svg", order: 7 }
  ],
  CROSSOPENDOWN: [
    { file: "2_CROSSPALM_DOWN_0_IMG.svg", order: 1 },
    { file: "2_CROSSPALM_DOWN_45L_IMG.svg", order: 2 },
    { file: "2_CROSSPALM_DOWN_90L_IMG.svg", order: 3 },
    { file: "2_CROSSPALM_DOWN_135L_IMG.svg", order: 4 },
    { file: "2_CROSSPALM_DOWN_45R_IMG.svg", order: 5 },
    { file: "2_CROSSPALM_DOWN_90R_IMG.svg", order: 6 },
    { file: "2_CROSSPALM_DOWN_135R_IMG.svg", order: 7 }
  ],
  CROSSOPENFORWARD: [
    { file: "2_CROSSPALM_FORWARD_0_IMG.svg", order: 1 },
    { file: "2_CROSSPALM_FORWARD_45L_IMG.svg", order: 2 },
    { file: "2_CROSSPALM_FORWARD_90L_IMG.svg", order: 3 },
    { file: "2_CROSSPALM_FORWARD_135L_IMG.svg", order: 4 },
    { file: "2_CROSSPALM_FORWARD_45R_IMG.svg", order: 5 },
    { file: "2_CROSSPALM_FORWARD_90R_IMG.svg", order: 6 },
    { file: "2_CROSSPALM_FORWARD_135R_IMG.svg", order: 7 }
  ],
  CROSSOPENREVERSE: [
    { file: "2_CROSSPALM_REVERSE_0_IMG.svg", order: 1 },
    { file: "2_CROSSPALM_REVERSE_45L_IMG.svg", order: 2 },
    { file: "2_CROSSPALM_REVERSE_90L_IMG.svg", order: 3 },
    { file: "2_CROSSPALM_REVERSE_135L_IMG.svg", order: 4 },
    { file: "2_CROSSPALM_REVERSE_45R_IMG.svg", order: 5 },
    { file: "2_CROSSPALM_REVERSE_90R_IMG.svg", order: 6 },
    { file: "2_CROSSPALM_REVERSE_135R_IMG.svg", order: 7 }
  ],
  CROSSOPENUP: [
    { file: "2_CROSSPALM_UP_0_IMG.svg", order: 1 },
    { file: "2_CROSSPALM_UP_45L_IMG.svg", order: 2 },
    { file: "2_CROSSPALM_UP_90L_IMG.svg", order: 3 },
    { file: "2_CROSSPALM_UP_135L_IMG.svg", order: 4 },
    { file: "2_CROSSPALM_UP_45R_IMG.svg", order: 5 },
    { file: "2_CROSSPALM_UP_90R_IMG.svg", order: 6 },
    { file: "2_CROSSPALM_UP_135R_IMG.svg", order: 7 }
  ],
  // Cross – Closed Palm sequences (five directions)
  CROSSCLOSEDBACKWARD: [
    { file: "2_CROSSFIST_BACKWARD_0_IMG.svg", order: 1 },
    { file: "2_CROSSFIST_BACKWARD_45L_IMG.svg", order: 2 },
    { file: "2_CROSSFIST_BACKWARD_90L_IMG.svg", order: 3 },
    { file: "2_CROSSFIST_BACKWARD_135L_IMG.svg", order: 4 },
    { file: "2_CROSSFIST_BACKWARD_45R_IMG.svg", order: 5 },
    { file: "2_CROSSFIST_BACKWARD_90R_IMG.svg", order: 6 },
    { file: "2_CROSSFIST_BACKWARD_135R_IMG.svg", order: 7 }
  ],
  CROSSCLOSEDDOWN: [
    { file: "2_CROSSFIST_DOWN_0_IMG.svg", order: 1 },
    { file: "2_CROSSFIST_DOWN_45L_IMG.svg", order: 2 },
    { file: "2_CROSSFIST_DOWN_90L_IMG.svg", order: 3 },
    { file: "2_CROSSFIST_DOWN_135L_IMG.svg", order: 4 },
    { file: "2_CROSSFIST_DOWN_45R_IMG.svg", order: 5 },
    { file: "2_CROSSFIST_DOWN_90R_IMG.svg", order: 6 },
    { file: "2_CROSSFIST_DOWN_135R_IMG.svg", order: 7 }
  ],
  CROSSCLOSEDFORWARD: [
    { file: "2_CROSSFIST_FORWARD_0_IMG.svg", order: 1 },
    { file: "2_CROSSFIST_FORWARD_45L_IMG.svg", order: 2 },
    { file: "2_CROSSFIST_FORWARD_90L_IMG.svg", order: 3 },
    { file: "2_CROSSFIST_FORWARD_135L_IMG.svg", order: 4 },
    { file: "2_CROSSFIST_FORWARD_45R_IMG.svg", order: 5 },
    { file: "2_CROSSFIST_FORWARD_90R_IMG.svg", order: 6 },
    { file: "2_CROSSFIST_FORWARD_135R_IMG.svg", order: 7 }
  ],
  CROSSCLOSEDREVERSE: [
    { file: "2_CROSSFIST_REVERSE_0_IMG.svg", order: 1 },
    { file: "2_CROSSFIST_REVERSE_45L_IMG.svg", order: 2 },
    { file: "2_CROSSFIST_REVERSE_90L_IMG.svg", order: 3 },
    { file: "2_CROSSFIST_REVERSE_135L_IMG.svg", order: 4 },
    { file: "2_CROSSFIST_REVERSE_45R_IMG.svg", order: 5 },
    { file: "2_CROSSFIST_REVERSE_90R_IMG.svg", order: 6 },
    { file: "2_CROSSFIST_REVERSE_135R_IMG.svg", order: 7 }
  ],
  CROSSCLOSEDUP: [
    { file: "2_CROSSFIST_UP_0_IMG.svg", order: 1 },
    { file: "2_CROSSFIST_UP_45L_IMG.svg", order: 2 },
    { file: "2_CROSSFIST_UP_90L_IMG.svg", order: 3 },
    { file: "2_CROSSFIST_UP_135L_IMG.svg", order: 4 },
    { file: "2_CROSSFIST_UP_45R_IMG.svg", order: 5 },
    { file: "2_CROSSFIST_UP_90R_IMG.svg", order: 6 },
    { file: "2_CROSSFIST_UP_135R_IMG.svg", order: 7 }
  ]
};

// State variables
let selectedRoutineKey = null;
let selectedRoutineMovements = [];
let prefs = {
  secondsPerMovement: 45,
  restBetween: 3,
  rounds: 2
};

let isRunning = false;
let movementTimerId = null;
let currentMovementIndex = 0;
let currentRound = 1;
let currentPhase = "idle";
let secondsRemaining = 0;

// Audio settings
let audioEnabled = true;
let audioEl;

function playDing() {
  if (!audioEnabled || !audioEl) return;
  try {
    audioEl.currentTime = 0;
    audioEl.play();
  } catch (e) {
    // ignore playback error
  }
}

// DOM helper functions
function qs(sel) { return document.querySelector(sel); }
function qsa(sel) { return Array.from(document.querySelectorAll(sel)); }

function switchScreen(screenId) {
  qsa(".screen").forEach(s => {
    if (s.id === screenId) s.classList.add("screen-active");
    else s.classList.remove("screen-active");
  });
}

function prettyRoutineName(key) {
  const map = {
    PALMSTOGETHER: "Palms Together",
    PALMIN: "Palms In",
    PALMOPEN: "Palms Open",
    PALMOUT: "Palms Out",
    PALMCLOSED: "Palms Closed",
    HEARTOPEN: "Heart Open",
    HEARTPROTECTED: "Heart Protected",
    SCAPULA: "Scapula",
    CROSSOPENBACKWARD: "Cross – Open Palm Backward",
    CROSSOPENDOWN: "Cross – Open Palm Down",
    CROSSOPENFORWARD: "Cross – Open Palm Forward",
    CROSSOPENREVERSE: "Cross – Open Palm Reverse",
    CROSSOPENUP: "Cross – Open Palm Up",
    CROSSCLOSEDBACKWARD: "Cross – Closed Palm Backward",
    CROSSCLOSEDDOWN: "Cross – Closed Palm Down",
    CROSSCLOSEDFORWARD: "Cross – Closed Palm Forward",
    CROSSCLOSEDREVERSE: "Cross – Closed Palm Reverse",
    CROSSCLOSEDUP: "Cross – Closed Palm Up",
    CUSTOM: "Custom Random"
  };
  return map[key] || key;
}

// Generate human-friendly labels from the filename.  This parses the file name
// and attempts to generate a name like "Up 45 Left", etc.  For routines
// where the key already describes the direction, we omit additional text.
function movementLabelFromFile(key, file) {
  // If the key is not a cross routine, derive from file name by splitting on underscores.
  const base = file.replace(".svg", "");
  const parts = base.split("_");
  // parts[1] will be e.g. PALMOPEN, HEARTOPEN, etc.  parts[2] is variation (e.g. UP, DOWN).
  const category = parts[1] || key;
  const variation = parts[2] || "";
  let label = (category + " " + variation)
    .toLowerCase()
    .replace(/_/g, " ")
    .split(" ")
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  // For cross routines, keep file pattern (e.g. 0_IMG) but remove suffixes
  if (category === "CROSSPALM" || category === "CROSSFIST") {
    // Variation may be BACKWARD, DOWN, FORWARD, REVERSE, UP
    // The angle comes after that; we want "0", "45L", etc.
    const angle = parts[3] || "";
    // Compose label using direction and angle
    label = variation.toLowerCase().replace(/_/g, " ");
    label = label.charAt(0).toUpperCase() + label.slice(1);
    if (angle) {
      label += " " + angle.replace(/_/g, "");
    }
    label = label
      .split(" ")
      .filter(Boolean)
      .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");
  }
  return label;
}

function sortedMovementsFor(key) {
  const arr = ROUTINES[key] || [];
  return [...arr].sort((a, b) => a.order - b.order);
}

// Custom random routine builder for upper body.  Prompts user for number of movements
// (between 3 and 12) and shuffles all available movements across all routines.
function handleCustomSequence() {
  const allMoves = Array.from(new Set([].concat(...Object.values(ROUTINES).map(arr => arr.map(m => m.file)))));
  const maxAllowed = Math.min(12, allMoves.length);
  let num = parseInt(prompt(`Enter number of movements for a custom random routine (3–${maxAllowed})`, "5"), 10);
  if (isNaN(num) || num < 3) num = 3;
  if (num > maxAllowed) num = maxAllowed;
  const shuffled = allMoves.sort(() => Math.random() - 0.5);
  const selectedFiles = shuffled.slice(0, num);
  selectedRoutineKey = "CUSTOM";
  selectedRoutineMovements = selectedFiles.map((file, idx) => ({ file: file, order: idx + 1 }));
  qs("#prefs-title").textContent = "Custom Random";
  qs("#prefs-tagline").textContent = "Set your preferred timing, then begin.";
  qs("#prefs-preview-label").textContent = "Custom Random";
  const strip = qs("#prefs-preview-strip");
  strip.innerHTML = "";
  selectedRoutineMovements.forEach(m => {
    const d = document.createElement("div");
    d.className = "preview-thumb";
    const img = document.createElement("img");
    img.src = IMAGE_BASE_PATH + m.file;
    img.alt = movementLabelFromFile("CUSTOM", m.file);
    d.appendChild(img);
    strip.appendChild(d);
  });
  switchScreen("screen-prefs");
}

function renderRoutineCards() {
  const container = qs("#upper-routine-list");
  container.innerHTML = "";
  Object.keys(ROUTINES).forEach(key => {
    const moves = sortedMovementsFor(key);
    const card = document.createElement("div");
    card.className = "routine-card";
    card.dataset.key = key;

    const header = document.createElement("div");
    header.className = "routine-header-row";
    const title = document.createElement("div");
    title.className = "routine-name";
    title.textContent = prettyRoutineName(key);
    const count = document.createElement("div");
    count.className = "routine-count";
    count.textContent = moves.length + " movements";
    header.appendChild(title);
    header.appendChild(count);
    card.appendChild(header);
    const strip = document.createElement("div");
    strip.className = "thumb-strip";
    moves.forEach(m => {
      const t = document.createElement("div");
      t.className = "thumb";
      const img = document.createElement("img");
      img.src = IMAGE_BASE_PATH + m.file;
      img.alt = movementLabelFromFile(key, m.file);
      t.appendChild(img);
      strip.appendChild(t);
    });
    card.appendChild(strip);
    card.addEventListener("click", () => {
      handleRoutineSelected(key);
    });
    container.appendChild(card);
  });
  // Append custom random card
  const customCard = document.createElement("div");
  customCard.className = "routine-card";
  customCard.addEventListener("click", () => {
    handleCustomSequence();
  });
  const header = document.createElement("div");
  header.className = "routine-header-row";
  const title = document.createElement("div");
  title.className = "routine-name";
  title.textContent = "Custom Random";
  const count = document.createElement("div");
  count.className = "routine-count";
  count.textContent = "3–12 movements";
  header.appendChild(title);
  header.appendChild(count);
  customCard.appendChild(header);
  const strip = document.createElement("div");
  strip.className = "thumb-strip";
  // leave empty for custom random card
  customCard.appendChild(strip);
  container.appendChild(customCard);
}

function handleRoutineSelected(key) {
  selectedRoutineKey = key;
  selectedRoutineMovements = sortedMovementsFor(key);
  // Populate preview in preferences
  const titleEl = qs("#prefs-title");
  const taglineEl = qs("#prefs-tagline");
  const labelEl = qs("#prefs-preview-label");
  titleEl.textContent = prettyRoutineName(key);
  taglineEl.textContent = "Set your preferred timing, then begin.";
  labelEl.textContent = prettyRoutineName(key);
  const strip = qs("#prefs-preview-strip");
  strip.innerHTML = "";
  selectedRoutineMovements.forEach(m => {
    const d = document.createElement("div");
    d.className = "preview-thumb";
    const img = document.createElement("img");
    img.src = IMAGE_BASE_PATH + m.file;
    img.alt = movementLabelFromFile(key, m.file);
    d.appendChild(img);
    strip.appendChild(d);
  });
  switchScreen("screen-prefs");
}

function startRoutine() {
  stopRoutineTimers();
  // Set initial state
  currentMovementIndex = 0;
  currentRound = 1;
  isRunning = true;
  qs("#btn-play-pause").textContent = "Pause";
  qs("#status-message").textContent = "";
  startPhase("move");
}

function stopRoutineTimers() {
  if (movementTimerId) {
    clearInterval(movementTimerId);
    movementTimerId = null;
  }
}

function startPhase(phase) {
  currentPhase = phase;
  secondsRemaining = (phase === "move") ? prefs.secondsPerMovement : prefs.restBetween;
  updateMovementUI();
  if (movementTimerId) clearInterval(movementTimerId);
  if (!isRunning) return;
  if (secondsRemaining <= 0) {
    handlePhaseComplete();
    return;
  }
  movementTimerId = setInterval(() => {
    if (!isRunning) return;
    secondsRemaining -= 1;
    if (secondsRemaining <= 0) {
      clearInterval(movementTimerId);
      movementTimerId = null;
      handlePhaseComplete();
    } else {
      updatePhaseLabel();
    }
  }, 1000);
}

function handlePhaseComplete() {
  if (currentPhase === "move" && prefs.restBetween > 0) {
    playDing();
    startPhase("rest");
  } else {
    playDing();
    advanceMovement();
  }
}

function advanceMovement() {
  currentMovementIndex += 1;
  if (currentMovementIndex >= selectedRoutineMovements.length) {
    currentRound += 1;
    if (currentRound > prefs.rounds) {
      finishRoutine();
      return;
    }
    currentMovementIndex = 0;
  }
  startPhase("move");
}

function finishRoutine() {
  isRunning = false;
  stopRoutineTimers();
  qs("#btn-play-pause").textContent = "Restart";
  qs("#phase-label").textContent = "Complete";
  qs("#status-message").textContent = "Routine complete.";
}

function updateMovementUI() {
  const move = selectedRoutineMovements[currentMovementIndex];
  if (!move) return;
  const label = movementLabelFromFile(selectedRoutineKey, move.file);
  qs("#current-movement-label").textContent = label;
  const imgEl = qs("#current-movement-image");
  imgEl.src = IMAGE_BASE_PATH + move.file;
  imgEl.alt = label;
  qs("#movement-count").textContent = `Movement ${currentMovementIndex + 1} of ${selectedRoutineMovements.length}`;
  qs("#round-count").textContent = `Round ${currentRound} of ${prefs.rounds}`;
  updatePhaseLabel();
  // Reset progress bar and animate for next movement
  const bar = qs("#prog");
  bar.style.transition = "none";
  bar.style.width = currentPhase === "move" ? "0%" : "100%";
  // Next tick: animate to full or empty
  setTimeout(() => {
    bar.style.transition = `width ${prefs.secondsPerMovement}s linear`;
    bar.style.width = currentPhase === "move" ? "100%" : "0%";
  }, 50);
}

function updatePhaseLabel() {
  let txt = "";
  if (currentPhase === "move") {
    txt = `Move · ${secondsRemaining}s`;
  } else if (currentPhase === "rest") {
    txt = `Rest · ${secondsRemaining}s`;
  } else {
    txt = "Ready";
  }
  qs("#phase-label").textContent = txt;
}

function togglePlayPause() {
  if (!selectedRoutineMovements.length) return;
  if (!isRunning && currentPhase === "idle") {
    startRoutine();
    return;
  }
  if (isRunning) {
    isRunning = false;
    stopRoutineTimers();
    qs("#btn-play-pause").textContent = "Resume";
  } else {
    isRunning = true;
    qs("#btn-play-pause").textContent = "Pause";
    startPhase(currentPhase || "move");
  }
}

function restartRoutine() {
  if (!selectedRoutineMovements.length) return;
  startRoutine();
}

function initBackButtons() {
  qsa(".back-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.back;
      if (!target) return;
      // Reset player state when navigating back
      stopRoutineTimers();
      isRunning = false;
      qs("#btn-play-pause").textContent = "Start";
      currentPhase = "idle";
      qs("#phase-label").textContent = "Ready";
      switchScreen(target);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderRoutineCards();
  initBackButtons();
  const randomBtn = qs("#upper-btn-random");
  if (randomBtn) randomBtn.addEventListener("click", handleCustomSequence);
  const playPauseBtn = qs("#btn-play-pause");
  const restartBtn = qs("#btn-restart");
  playPauseBtn.addEventListener("click", togglePlayPause);
  restartBtn.addEventListener("click", restartRoutine);
  // Audio toggle setup
  audioEl = document.getElementById("audio-ding");
  const toggle = qs("#upper-audio-toggle");
  toggle.addEventListener("click", () => {
    const on = toggle.dataset.on === "1";
    if (on) {
      toggle.dataset.on = "0";
      audioEnabled = false;
      toggle.classList.remove("pill-on");
      toggle.querySelector(".pill-label").textContent = "Off";
    } else {
      toggle.dataset.on = "1";
      audioEnabled = true;
      toggle.classList.add("pill-on");
      toggle.querySelector(".pill-label").textContent = "On";
    }
  });
  // Set defaults from preferences inputs
  const secInput = qs("#input-seconds");
  const restInput = qs("#input-rest");
  const roundsInput = qs("#input-rounds");
  secInput.addEventListener("change", () => {
    prefs.secondsPerMovement = Math.max(5, parseInt(secInput.value, 10) || 45);
  });
  restInput.addEventListener("change", () => {
    prefs.restBetween = Math.max(0, parseInt(restInput.value, 10) || 3);
  });
  roundsInput.addEventListener("change", () => {
    prefs.rounds = Math.max(1, parseInt(roundsInput.value, 10) || 2);
  });
  // Start routine button
  const startBtn = qs("#btn-start-routine");
  startBtn.addEventListener("click", () => {
    startRoutine();
    switchScreen("screen-player");
  });
  // Parse URL query parameter for routine
  const params = new URLSearchParams(window.location.search);
  const randomFlag = params.get("random");
  const r = params.get("routine");
  if (randomFlag === "1") {
    handleCustomSequence();
  } else if (r) {
    const upperKey = r.toUpperCase();
    if (ROUTINES[upperKey]) {
      handleRoutineSelected(upperKey);
    }
  }
});


// Mudra Generator App
// Random mudra sequences with simple timing + audio cues.
// Uses numeric filenames: 1.svg, 2.svg, ... up to TOTAL_MUDRAS in assets/mudras/.

const IMAGE_BASE_PATH = "assets/mudras/";
const TOTAL_MUDRAS = 45; // we have 1.svg ... 45.svg (change if you have fewer)

// Build an array: ["1.svg", "2.svg", ..., "45.svg"]
const MUDRA_FILES = Array.from({ length: TOTAL_MUDRAS }, (_, i) => `${i + 1}.svg`);

// STATE
let mudraSequence = [];
let prefs = {
  count: 3,
  secondsPerMudra: 45,
  restBetween: 3
};

let isRunning = false;
let currentIndex = 0;
let currentPhase = "idle"; // "move" | "rest" | "idle"
let secondsRemaining = 0;
let timerId = null;

// Audio + progress bar
let audioEnabled = true;
let audioEl = null;
let bar = null;
let barDirectionForward = true;

// Helpers
function qs(sel) { return document.querySelector(sel); }
function qsa(sel) { return Array.from(document.querySelectorAll(sel)); }

function playDing() {
  if (!audioEnabled || !audioEl) return;
  try {
    audioEl.currentTime = 0;
    audioEl.play();
  } catch (e) {
    // ignore autoplay restrictions
  }
}

function switchScreen(id) {
  qsa(".screen").forEach(s => {
    if (s.id === id) s.classList.add("screen-active");
    else s.classList.remove("screen-active");
  });
}

// Generate a random mudra sequence
function generateMudraSequence(count) {
  const maxCount = Math.min(count, MUDRA_FILES.length);
  const shuffled = [...MUDRA_FILES].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, maxCount);

  mudraSequence = selected.map((file, idx) => ({
    file,
    label: `Mudra ${idx + 1}`
  }));
}

// Build preview strip and setup player UI
function setupPlayerUI() {
  const title = qs("#player-title");
  const label = qs("#player-preview-label");
  const strip = qs("#player-preview-strip");

  if (title) title.textContent = "Mudra Session";
  if (label) label.textContent = "Sequence";

  if (strip) {
    strip.innerHTML = "";
    mudraSequence.forEach(m => {
      const d = document.createElement("div");
      d.className = "preview-thumb";
      const img = document.createElement("img");
      img.loading = "lazy";
      img.src = IMAGE_BASE_PATH + m.file;
      img.alt = m.label;
      d.appendChild(img);
      strip.appendChild(d);
    });
  }

  updateMudraUI();
}

// Progress bar
function animateProgressBarForPhase(seconds) {
  if (!bar) return;
  bar.style.transition = `width ${seconds}s linear`;
  if (barDirectionForward) {
    bar.style.width = "100%";
  } else {
    bar.style.width = "0%";
  }
  barDirectionForward = !barDirectionForward;
}

function resetProgressBarInstant() {
  if (!bar) return;
  bar.style.transition = "none";
  bar.style.width = barDirectionForward ? "0%" : "100%";
}

// Start a fresh session (does not auto-start the timer)
function prepareSession() {
  if (!mudraSequence.length) return;

  isRunning = false;
  currentIndex = 0;
  currentPhase = "idle";
  secondsRemaining = 0;
  resetProgressBarInstant();
  updateMudraUI();

  const phaseLabel = qs("#phase-label");
  if (phaseLabel) phaseLabel.textContent = "Ready";

  const playBtn = qs("#btn-play-pause");
  if (playBtn) playBtn.textContent = "Start";

  const status = qs("#status-message");
  if (status) status.textContent = "";

  switchScreen("screen-player");
}

function startSession() {
  if (!mudraSequence.length) return;
  if (isRunning) return;

  isRunning = true;
  const playBtn = qs("#btn-play-pause");
  if (playBtn) playBtn.textContent = "Pause";
  currentPhase = "move";
  secondsRemaining = prefs.secondsPerMudra;
  barDirectionForward = true;
  resetProgressBarInstant();

  requestAnimationFrame(() => {
    animateProgressBarForPhase(prefs.secondsPerMudra);
  });

  runTimerTick();
}

function runTimerTick() {
  if (timerId) clearInterval(timerId);
  updatePhaseLabel();

  timerId = setInterval(() => {
    if (!isRunning) return;
    secondsRemaining--;
    if (secondsRemaining <= 0) {
      clearInterval(timerId);
      timerId = null;
      handlePhaseComplete();
    } else {
      updatePhaseLabel();
    }
  }, 1000);
}

function handlePhaseComplete() {
  playDing();

  if (currentPhase === "move" && prefs.restBetween > 0) {
    // Go into rest
    currentPhase = "rest";
    secondsRemaining = prefs.restBetween;
    if (bar) bar.style.transition = "none";
    updatePhaseLabel();
    runTimerTick();
    return;
  }

  // Finished rest or no rest: advance to next mudra
  currentIndex++;
  if (currentIndex >= mudraSequence.length) {
    finishSession();
    return;
  }

  currentPhase = "move";
  secondsRemaining = prefs.secondsPerMudra;
  updateMudraUI();
  barDirectionForward = !barDirectionForward;
  resetProgressBarInstant();

  requestAnimationFrame(() => {
    animateProgressBarForPhase(prefs.secondsPerMudra);
  });

  runTimerTick();
}

function finishSession() {
  isRunning = false;
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }

  const playBtn = qs("#btn-play-pause");
  if (playBtn) playBtn.textContent = "Restart";

  const phaseLabel = qs("#phase-label");
  if (phaseLabel) phaseLabel.textContent = "Complete";

  const status = qs("#status-message");
  if (status) status.textContent = "Session complete. Sit for a moment and notice what shifted.";

  playDing();
}

function updateMudraUI() {
  const current = mudraSequence[currentIndex];
  const labelEl = qs("#current-mudra-label");
  const imgEl = qs("#current-mudra-image");
  const countEl = qs("#mudra-count");

  if (current) {
    if (labelEl) labelEl.textContent = current.label;
    if (imgEl) {
      imgEl.src = IMAGE_BASE_PATH + current.file;
      imgEl.alt = current.label;
    }
    if (countEl) {
      countEl.textContent = `Mudra ${currentIndex + 1} of ${mudraSequence.length}`;
    }
  } else {
    if (labelEl) labelEl.textContent = "Mudra";
    if (countEl) countEl.textContent = "";
  }

  updatePhaseLabel();
}

function updatePhaseLabel() {
  const phaseLabel = qs("#phase-label");
  if (!phaseLabel) return;

  let txt = "Ready";
  if (currentPhase === "move") {
    txt = `Hold · ${secondsRemaining}s`;
  } else if (currentPhase === "rest") {
    txt = `Rest · ${secondsRemaining}s`;
  }
  phaseLabel.textContent = txt;
}

function togglePlayPause() {
  if (!mudraSequence.length) return;

  const playBtn = qs("#btn-play-pause");

  if (!isRunning && currentPhase === "idle") {
    startSession();
    return;
  }

  if (isRunning) {
    // Pause
    isRunning = false;
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
    if (playBtn) playBtn.textContent = "Resume";
    if (bar) bar.style.transition = "none";
  } else {
    // Resume
    isRunning = true;
    if (playBtn) playBtn.textContent = "Pause";

    if (currentPhase === "move") {
      barDirectionForward = !barDirectionForward;
      resetProgressBarInstant();
      requestAnimationFrame(() => {
        animateProgressBarForPhase(secondsRemaining);
      });
    }

    runTimerTick();
  }
}

function restartSession() {
  if (!mudraSequence.length) return;
  isRunning = false;
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
  currentIndex = 0;
  currentPhase = "idle";
  secondsRemaining = 0;
  prepareSession();
}

// Handle Generate button (random sequence) and One Mudra Now
function handleGenerateClick(single) {
  const countInput = qs("#input-mudra-count");
  const secInput = qs("#input-seconds");
  const restInput = qs("#input-rest");
  const status = qs("#status-message");

  let count = parseInt(countInput && countInput.value, 10) || prefs.count;
  let seconds = parseInt(secInput && secInput.value, 10) || prefs.secondsPerMudra;
  let rest = parseInt(restInput && restInput.value, 10);
  if (isNaN(rest)) rest = prefs.restBetween;

  if (single) count = 1;

  // clamp values
  count = Math.max(1, Math.min(count, MUDRA_FILES.length));
  seconds = Math.max(5, Math.min(seconds, 300));
  rest = Math.max(0, Math.min(rest, 120));

  prefs.count = count;
  prefs.secondsPerMudra = seconds;
  prefs.restBetween = rest;

  if (status) status.textContent = "";

  generateMudraSequence(count);
  setupPlayerUI();
  prepareSession();
}

// INIT
function initMudrasApp() {
  audioEl = document.getElementById("audio-ding");
  bar = document.getElementById("prog");

  const audioToggle = qs("#mudra-audio-toggle");
  if (audioToggle) {
    audioToggle.addEventListener("click", () => {
      audioEnabled = !audioEnabled;
      audioToggle.dataset.on = audioEnabled ? "1" : "0";
      const labelSpan = audioToggle.querySelector(".pill-label");
      if (labelSpan) labelSpan.textContent = audioEnabled ? "On" : "Off";
    });
  }

  const genBtn = qs("#btn-generate-sequence");
  if (genBtn) {
    genBtn.addEventListener("click", () => handleGenerateClick(false));
  }

  const singleBtn = qs("#btn-single-mudra");
  if (singleBtn) {
    singleBtn.addEventListener("click", () => handleGenerateClick(true));
  }

  const playBtn = qs("#btn-play-pause");
  if (playBtn) {
    playBtn.addEventListener("click", togglePlayPause);
  }

  const restartBtn = qs("#btn-restart");
  if (restartBtn) {
    restartBtn.addEventListener("click", restartSession);
  }

  const backBtn = qs("#btn-back-to-config");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      // stop everything and go back
      isRunning = false;
      if (timerId) {
        clearInterval(timerId);
        timerId = null;
      }
      currentPhase = "idle";
      const phaseLabel = qs("#phase-label");
      if (phaseLabel) phaseLabel.textContent = "Ready";
      switchScreen("screen-config");
    });
  }
}

// Run init whether script is deferred or at bottom of body
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMudrasApp);
} else {
  initMudrasApp();
}

// Lower Body Innervation app script for Neocities
// This script powers the legs page by loading the Innervation SVGs, organising them into routines,
// handling user preferences for duration, rest and rounds, and animating a progress bar
// that fills and empties on alternating movements.

// CONFIGURE IMAGE PATH
// The SVGs live in the InnervationSVGs folder at the site root.  Do not rename files or
// directories; simply ensure this constant points to the folder containing the individual
// movement SVGs.  Each file listed in ROUTINES must exist in this folder.
const IMAGE_BASE_PATH = "InnervationSVGs/";

// ROUTINES definition.  Each routine key lists the SVG filename and an order value.  The
// order ensures movements are presented in the correct sequence.  Do not change file names.
const ROUTINES = {
  FEET: [
    { file: "1_FEET_MIDCROSSRIGHT_D_IMG.svg", order: 1 },
    { file: "1_FEET_MIDCROSSLEFT_D_IMG.svg",  order: 2 },
    { file: "1_FEET_SIDECROSSRIGHT_D_IMG.svg", order: 3 },
    { file: "1_FEET_SIDECROSSLEFT_D_IMG.svg",  order: 4 },
    { file: "1_FEET_BACKRIGHT_D_IMG.svg",      order: 5 },
    { file: "1_FEET_BACKLEFT_D_IMG.svg",       order: 6 },
    { file: "1_FEET_OUTRIGHT_D_IMG.svg",       order: 7 },
    { file: "1_FEET_OUTLEFT_D_IMG.svg",        order: 8 }
  ],
  GROUNDING: [
    { file: "1_GROUNDING_FORWARD_D_IMG.svg",   order: 1 },
    { file: "1_GROUNDING_OUT_D_IMG.svg",       order: 2 },
    { file: "1_GROUNDING_IN_D_IMG.svg",        order: 3 },
    { file: "1_GROUNDING_CROSSLEFT_D_IMG.svg", order: 4 },
    { file: "1_GROUNDING_CROSSRIGHT_D_IMG.svg",order: 5 }
  ],
  HIPS1: [
    { file: "1_HIPS1_LEFTFRONTIN_D_IMG.svg",   order: 1 },
    { file: "1_HIPS1_LEFTFRONTOUT_D_IMG.svg",  order: 2 },
    { file: "1_HIPS1_LEFTMIDIN_D_IMG.svg",     order: 3 },
    { file: "1_HIPS1_LEFTMIDOUT_D_IMG.svg",    order: 4 },
    { file: "1_HIPS1_LEFTREARIN_D_IMG.svg",    order: 5 },
    { file: "1_HIPS1_LEFTREAROUT_D_IMG.svg",   order: 6 },
    { file: "1_HIPS1_RIGHTFRONTIN_D_IMG.svg",  order: 7 },
    { file: "1_HIPS1_RIGHTFRONTOUT_D_IMG.svg", order: 8 },
    { file: "1_HIPS1_RIGHTMIDIN_D_IMG.svg",    order: 9 },
    { file: "1_HIPS1_RIGHTMIDOUT_D_IMG.svg",   order: 10 },
    { file: "1_HIPS1_RIGHTREARIN_D_IMG.svg",   order: 11 },
    { file: "1_HIPS1_RIGHTREAROUT_D_IMG.svg",  order: 12 }
  ],
  HIPS2: [
    { file: "1_HIPS2_PLANKOPPOSITELEFTFRONT_D_IMG.svg",   order: 1 },
    { file: "1_HIPS2_PLANKSAMELEFTFRONT_D_IMG.svg",       order: 2 },
    { file: "1_HIPS2_PLANKSAMERIGHTFRONT_D_IMG.svg",      order: 3 },
    { file: "1_HIPS2_PLANKOPPOSITERIGHTFRONT_D_IMG.svg",  order: 4 },
    { file: "1_HIPS2_STAGGEROPPOSITERIGHTFRONT_D_IMG.svg",order: 5 },
    { file: "1_HIPS2_STAGGEROPPOSITELEFTFRONT_D_IMG.svg", order: 6 },
    { file: "1_HIPS2_STAGGERSAMELEFTFRONT_D_IMG.svg",     order: 7 },
    { file: "1_HIPS2_STAGGERSAMERIGHTFRONT_D_IMG.svg",    order: 8 }
  ]
};

// State variables
let selectedRoutineKey = null;
let selectedRoutineMovements = [];
let prefs = {
  secondsPerMovement: 45,
  restBetween: 3, // default rest between movements (3 seconds)
  rounds: 2
};

let isRunning = false;
let movementTimerId = null;
let currentMovementIndex = 0;
let currentRound = 1;
let currentPhase = "idle"; // possible values: "move", "rest", "idle"
let secondsRemaining = 0;

// Audio settings
let audioEnabled = true;
let audioEl; // assigned on DOMContentLoaded

// Play the ding sound if enabled
function playDing() {
  if (!audioEnabled || !audioEl) return;
  try {
    audioEl.currentTime = 0;
    audioEl.play();
  } catch (e) {
    // Ignore playback errors (e.g. autoplay restrictions)
  }
}

// DOM helpers
function qs(sel) { return document.querySelector(sel); }
function qsa(sel) { return Array.from(document.querySelectorAll(sel)); }

// Switch screen visibility based on id
function switchScreen(screenId) {
  qsa(".screen").forEach(s => {
    if (s.id === screenId) s.classList.add("screen-active");
    else s.classList.remove("screen-active");
  });
}

// Pretty names for routines
function prettyRoutineName(key) {
  if (key === "FEET") return "FEET / SHINS";
  if (key === "GROUNDING") return "GROUNDING";
  if (key === "HIPS1") return "HIPS I";
  if (key === "HIPS2") return "HIPS II";
  return key;
}

// Derive human-friendly movement label from filename
function movementLabelFromFile(key, file) {
  const base = file.replace(".svg", "");
  const parts = base.split("_");
  const routinePart = parts[1] || key;
  const movePart = parts[2] || "";
  const label = (routinePart + " " + movePart)
    .toLowerCase()
    .replace(/_/g, " ")
    .split(" ")
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return label;
}

// Sort movements by order for a given routine key
function sortedMovementsFor(key) {
  const arr = ROUTINES[key] || [];
  return [...arr].sort((a, b) => a.order - b.order);
}

// Generate a random custom sequence of movements based on user input.
// Prompts the user for a number between 3 and 12, shuffles all available
// movement files across all routines, and creates a new sequence.  The
// preview is updated and the preferences screen is shown.
function handleCustomSequence() {
  // Gather all unique movement filenames from the ROUTINES definitions
  const allMoves = Array.from(new Set([].concat(...Object.values(ROUTINES).map(arr => arr.map(m => m.file)))));
  // Determine maximum allowed (cap at 12 for UX)
  const maxAllowed = Math.min(12, allMoves.length);
  let num = parseInt(prompt(`Enter number of movements for a custom random routine (3–${maxAllowed})`, "5"), 10);
  if (isNaN(num) || num < 3) num = 3;
  if (num > maxAllowed) num = maxAllowed;
  // Shuffle the list and select the requested number
  const shuffled = allMoves.sort(() => Math.random() - 0.5);
  const selectedFiles = shuffled.slice(0, num);
  // Build movement objects with sequential order
  selectedRoutineKey = "CUSTOM";
  selectedRoutineMovements = selectedFiles.map((file, idx) => ({ file: file, order: idx + 1 }));
  // Update preview labels
  qs("#prefs-title").textContent = "Custom Random";
  qs("#prefs-tagline").textContent = "Set your preferred timing, then begin.";
  qs("#prefs-preview-label").textContent = "Custom Random";
  const strip = qs("#prefs-preview-strip");
  strip.innerHTML = "";
  selectedRoutineMovements.forEach(m => {
    const d = document.createElement("div");
    d.className = "preview-thumb";
    const img = document.createElement("img");
    img.src = IMAGE_BASE_PATH + m.file;
    img.alt = movementLabelFromFile("CUSTOM", m.file);
    d.appendChild(img);
    strip.appendChild(d);
  });
  switchScreen("screen-prefs");
}

// Render cards for each routine on the picker screen
function renderRoutineCards() {
  const container = qs("#routine-list");
  container.innerHTML = "";
  Object.keys(ROUTINES).forEach(key => {
    const moves = sortedMovementsFor(key);
    const card = document.createElement("div");
    card.className = "routine-card";
    card.dataset.key = key;

    const header = document.createElement("div");
    header.className = "routine-header-row";

    const title = document.createElement("div");
    title.className = "routine-name";
    title.textContent = prettyRoutineName(key);

    const count = document.createElement("div");
    count.className = "routine-count";
    count.textContent = moves.length + " movements";

    header.appendChild(title);
    header.appendChild(count);
    card.appendChild(header);

    const strip = document.createElement("div");
    strip.className = "thumb-strip";
    moves.forEach(m => {
      const t = document.createElement("div");
      t.className = "thumb";
      const img = document.createElement("img");
      img.src = IMAGE_BASE_PATH + m.file;
      img.alt = movementLabelFromFile(key, m.file);
      t.appendChild(img);
      strip.appendChild(t);
    });
    card.appendChild(strip);

    card.addEventListener("click", () => {
      handleRoutineSelected(key);
    });

    container.appendChild(card);
  });

  // Add a dedicated card for creating a custom random sequence.  This card
  // allows the user to choose any number of movements and generates a random
  // sequence from the entire lower body library.
  const customCard = document.createElement("div");
  customCard.className = "routine-card";
  customCard.dataset.key = "CUSTOM";
  const header = document.createElement("div");
  header.className = "routine-header-row";
  const title = document.createElement("div");
  title.className = "routine-name";
  title.textContent = "Custom Random";
  const countLabel = document.createElement("div");
  countLabel.className = "routine-count";
  countLabel.textContent = "3–12 movements";
  header.appendChild(title);
  header.appendChild(countLabel);
  customCard.appendChild(header);
  const strip = document.createElement("div");
  strip.className = "thumb-strip";
  // Populate with a few preview images from the full set
  const previewFiles = Array.from(new Set([].concat(...Object.values(ROUTINES).map(arr => arr.map(m => m.file))))).slice(0, 3);
  previewFiles.forEach(file => {
    const t = document.createElement("div");
    t.className = "thumb";
    const img = document.createElement("img");
    img.src = IMAGE_BASE_PATH + file;
    img.alt = movementLabelFromFile("CUSTOM", file);
    t.appendChild(img);
    strip.appendChild(t);
  });
  customCard.appendChild(strip);
  customCard.addEventListener("click", handleCustomSequence);
  container.appendChild(customCard);
}

// Handle clicking a routine card
function handleRoutineSelected(key) {
  selectedRoutineKey = key;
  selectedRoutineMovements = sortedMovementsFor(key);

  // Update preview for preferences screen
  qs("#prefs-title").textContent = prettyRoutineName(key);
  qs("#prefs-tagline").textContent = "Set your preferred timing, then begin.";
  qs("#prefs-preview-label").textContent = prettyRoutineName(key);

  const strip = qs("#prefs-preview-strip");
  strip.innerHTML = "";
  selectedRoutineMovements.forEach(m => {
    const d = document.createElement("div");
    d.className = "preview-thumb";
    const img = document.createElement("img");
    img.src = IMAGE_BASE_PATH + m.file;
    img.alt = movementLabelFromFile(key, m.file);
    d.appendChild(img);
    strip.appendChild(d);
  });

  switchScreen("screen-prefs");
}

// Random routine selection
function pickRandomRoutine() {
  // Choose a random existing routine key (FEET, GROUNDING, HIPS1, HIPS2)
  const keys = Object.keys(ROUTINES);
  if (!keys.length) return;
  const key = keys[Math.floor(Math.random() * keys.length)];
  handleRoutineSelected(key);
}

// Collect preferences from inputs and start the routine
function collectPrefsAndStart() {
  const sec = parseInt(qs("#input-seconds").value, 10) || 45;
  const rest = parseInt(qs("#input-rest").value, 10) || 3;
  const rounds = parseInt(qs("#input-rounds").value, 10) || 2;

  prefs.secondsPerMovement = Math.max(5, sec);
  prefs.restBetween = Math.max(0, rest);
  prefs.rounds = Math.max(1, rounds);

  startRoutine();
}

// Initialise the player UI
function setupPlayerUI() {
  if (!selectedRoutineKey || !selectedRoutineMovements.length) return;
  qs("#player-title").textContent = prettyRoutineName(selectedRoutineKey);
  qs("#player-tagline").textContent = "Stay curious about what you feel in the feet, hips and spine.";
  qs("#player-preview-label").textContent = prettyRoutineName(selectedRoutineKey);
  const strip = qs("#player-preview-strip");
  strip.innerHTML = "";
  selectedRoutineMovements.forEach(m => {
    const d = document.createElement("div");
    d.className = "preview-thumb";
    const img = document.createElement("img");
    img.src = IMAGE_BASE_PATH + m.file;
    img.alt = movementLabelFromFile(selectedRoutineKey, m.file);
    d.appendChild(img);
    strip.appendChild(d);
  });
  switchScreen("screen-player");
}

// -------------------------
// Progress bar animation logic
// -------------------------
const bar = document.getElementById("prog");
// Direction flag: true = fill to 100%, false = empty to 0%
let barDirectionForward = true;

function animateProgressBarForMovement(seconds) {
  if (!bar) return;
  // Set transition duration for this movement
  bar.style.transition = `width ${seconds}s linear`;
  if (barDirectionForward) {
    bar.style.width = "100%";
  } else {
    bar.style.width = "0%";
  }
  // Flip direction for the next movement
  barDirectionForward = !barDirectionForward;
}

function resetProgressBarInstant() {
  if (!bar) return;
  bar.style.transition = "none";
  // Immediately jump to starting position for current direction
  bar.style.width = barDirectionForward ? "0%" : "100%";
}

// -------------------------
// Routine lifecycle
// -------------------------
function startRoutine() {
  stopRoutineTimers();
  setupPlayerUI();
  currentMovementIndex = 0;
  currentRound = 1;
  isRunning = true;
  qs("#btn-play-pause").textContent = "Pause";
  qs("#status-message").textContent = "";
  // Reset bar state
  barDirectionForward = true;
  resetProgressBarInstant();
  startPhase("move");
}

// Stop any existing timers
function stopRoutineTimers() {
  if (movementTimerId) {
    clearInterval(movementTimerId);
    movementTimerId = null;
  }
}

// Start a phase: 'move' or 'rest'
function startPhase(phase) {
  currentPhase = phase;
  if (phase === "move") {
    secondsRemaining = prefs.secondsPerMovement;
    // Reset progress bar instantly and then animate for this movement
    resetProgressBarInstant();
    // Use requestAnimationFrame to ensure the reset happens before the transition
    requestAnimationFrame(() => {
      animateProgressBarForMovement(prefs.secondsPerMovement);
    });
  } else {
    // rest phase
    secondsRemaining = prefs.restBetween;
    // Freeze progress bar during rest (no animation)
    if (bar) {
      bar.style.transition = "none";
    }
  }
  updateMovementUI();
  // Manage timers
  if (movementTimerId) clearInterval(movementTimerId);
  if (!isRunning) return;
  if (secondsRemaining <= 0) {
    handlePhaseComplete();
    return;
  }
  movementTimerId = setInterval(() => {
    if (!isRunning) return;
    secondsRemaining--;
    if (secondsRemaining <= 0) {
      clearInterval(movementTimerId);
      movementTimerId = null;
      handlePhaseComplete();
    } else {
      updatePhaseLabel();
    }
  }, 1000);
}

// When a phase ends
function handlePhaseComplete() {
  // Play ding at the end of every phase
  playDing();
  if (currentPhase === "move" && prefs.restBetween > 0) {
    startPhase("rest");
  } else {
    advanceMovement();
  }
}

// Move to the next movement or next round
function advanceMovement() {
  currentMovementIndex++;
  if (currentMovementIndex >= selectedRoutineMovements.length) {
    currentRound++;
    if (currentRound > prefs.rounds) {
      finishRoutine();
      return;
    }
    currentMovementIndex = 0;
  }
  startPhase("move");
}

// Complete routine
function finishRoutine() {
  isRunning = false;
  stopRoutineTimers();
  qs("#btn-play-pause").textContent = "Restart";
  qs("#phase-label").textContent = "Complete";
  qs("#status-message").textContent = "Routine complete. Notice how your lower body feels.";
  // Final ding when routine finishes
  playDing();
}

// UI update for current movement and phase
function updateMovementUI() {
  const move = selectedRoutineMovements[currentMovementIndex];
  if (!move) return;
  const label = movementLabelFromFile(selectedRoutineKey, move.file);
  qs("#current-movement-label").textContent = label;
  const img = qs("#current-movement-image");
  img.src = IMAGE_BASE_PATH + move.file;
  img.alt = label;
  qs("#movement-count").textContent = `Movement ${currentMovementIndex + 1} of ${selectedRoutineMovements.length}`;
  qs("#round-count").textContent = `Round ${currentRound} of ${prefs.rounds}`;
  updatePhaseLabel();
}

function updatePhaseLabel() {
  let txt = "";
  if (currentPhase === "move") {
    txt = `Move · ${secondsRemaining}s`;
  } else if (currentPhase === "rest") {
    txt = `Transition · ${secondsRemaining}s`;
  } else {
    txt = "Ready";
  }
  qs("#phase-label").textContent = txt;
}

// Play/pause toggle
function togglePlayPause() {
  if (!selectedRoutineMovements.length) return;
  if (!isRunning && currentPhase === "idle") {
    startRoutine();
    return;
  }
  if (isRunning) {
    isRunning = false;
    if (movementTimerId) {
      clearInterval(movementTimerId);
      movementTimerId = null;
    }
    qs("#btn-play-pause").textContent = "Resume";
    // Pause progress bar by freezing transition
    if (bar) {
      bar.style.transition = "none";
    }
  } else {
    isRunning = true;
    qs("#btn-play-pause").textContent = "Pause";
    // Continue the current phase
    if (currentPhase === "move") {
      // Resume the bar animation for the remaining time
      animateProgressBarForMovement(secondsRemaining);
    }
    startPhase(currentPhase || "move");
  }
}

// Restart the routine from the beginning
function restartRoutine() {
  if (!selectedRoutineMovements.length) return;
  startRoutine();
}

// Initialise back buttons for navigation
function initBackButtons() {
  qsa(".back-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.back;
      if (!target) return;
      if (btn.closest("#screen-player")) {
        // Stop timers when leaving player
        stopRoutineTimers();
        isRunning = false;
        qs("#btn-play-pause").textContent = "Start";
        currentPhase = "idle";
        qs("#phase-label").textContent = "Ready";
      }
      switchScreen(target);
    });
  });
}

// DOMContentLoaded initialisation
document.addEventListener("DOMContentLoaded", () => {
  // If a routine query parameter is present in the URL, automatically load that routine
  const params = new URLSearchParams(window.location.search);
  const routineParam = params.get("routine");
  if (routineParam) {
    const upperKey = routineParam.toUpperCase();
    if (ROUTINES[upperKey]) {
      // Preselect the routine on load.  This mimics clicking its card and brings up the preferences screen.
      handleRoutineSelected(upperKey);
    }
  }
  renderRoutineCards();
  initBackButtons();
  qs("#btn-random").addEventListener("click", pickRandomRoutine);
  qs("#btn-start-routine").addEventListener("click", collectPrefsAndStart);
  qs("#btn-play-pause").addEventListener("click", togglePlayPause);
  qs("#btn-restart").addEventListener("click", restartRoutine);

  // Set up audio element and toggle control
  audioEl = document.getElementById("audio-ding");
  const audioToggle = document.getElementById("legs-audio-toggle");
  if (audioToggle) {
    audioToggle.addEventListener("click", () => {
      audioEnabled = !audioEnabled;
      audioToggle.dataset.on = audioEnabled ? "1" : "0";
      const labelSpan = audioToggle.querySelector(".pill-label");
      if (labelSpan) labelSpan.textContent = audioEnabled ? "On" : "Off";
    });
  }
});

// Head Innervation app script for Neocities
// Mirrors the lower/upper/ocular pages: routine picker → prefs → player
// Uses the shared InnervationSVGs folder for images.

const IMAGE_BASE_PATH = "InnervationSVGs/";

// HEAD ROUTINES
// Each key is a routine; each entry has file + order for sequence.
const ROUTINES = {
  CHINBOTTOM: [
    { file: "3_CHINBOTTOM_0_D_IMG.svg", order: 1 },
    { file: "3_CHINBOTTOM_L_D_IMG.svg", order: 2 },
    { file: "3_CHINBOTTOM_R_D_IMG.svg", order: 3 },
    { file: "3_CHINBOTTOM_1_D_IMG.svg", order: 4 },
    { file: "3_CHINBOTTOM_2_D_IMG.svg", order: 5 },
    { file: "3_CHINBOTTOM_3_D_IMG.svg", order: 6 },
    { file: "3_CHINBOTTOM_4_D_IMG.svg", order: 7 },
    { file: "3_CHINBOTTOM_5_D_IMG.svg", order: 8 },
    { file: "3_CHINBOTTOM_6_D_IMG.svg", order: 9 },
    { file: "3_CHINBOTTOM_7_D_IMG.svg", order: 10 },
    { file: "3_CHINBOTTOM_8_D_IMG.svg", order: 11 }
  ],
  CHINTOP: [
    { file: "3_CHINTOP_0_D_IMG.svg", order: 1 },
    { file: "3_CHINTOP_L_D_IMG.svg", order: 2 },
    { file: "3_CHINTOP_R_D_IMG.svg", order: 3 },
    { file: "3_CHINTOP_1_D_IMG.svg", order: 4 },
    { file: "3_CHINTOP_2_D_IMG.svg", order: 5 },
    { file: "3_CHINTOP_3_D_IMG.svg", order: 6 },
    { file: "3_CHINTOP_4_D_IMG.svg", order: 7 },
    { file: "3_CHINTOP_5_D_IMG.svg", order: 8 },
    { file: "3_CHINTOP_6_D_IMG.svg", order: 9 },
    { file: "3_CHINTOP_7_D_IMG.svg", order: 10 },
    { file: "3_CHINTOP_8_D_IMG.svg", order: 11 }
  ],
  LION: [
    { file: "3_LION_0_D_IMG.svg", order: 1 },
    { file: "3_LION_1_D_IMG.svg", order: 2 },
    { file: "3_LION_2_D_IMG.svg", order: 3 },
    { file: "3_LION_3_D_IMG.svg", order: 4 },
    { file: "3_LION_4_D_IMG.svg", order: 5 },
    { file: "3_LION_5_D_IMG.svg", order: 6 },
    { file: "3_LION_6_D_IMG.svg", order: 7 },
    { file: "3_LION_7_D_IMG.svg", order: 8 },
    { file: "3_LION_8_D_IMG.svg", order: 9 }
  ],
  LIONLEFT: [
    { file: "3_LIONLEFT_0_D_IMG.svg", order: 1 },
    { file: "3_LIONLEFT_1_D_IMG.svg", order: 2 },
    { file: "3_LIONLEFT_2_D_IMG.svg", order: 3 },
    { file: "3_LIONLEFT_3_D_IMG.svg", order: 4 },
    { file: "3_LIONLEFT_4_D_IMG.svg", order: 5 },
    { file: "3_LIONLEFT_5_D_IMG.svg", order: 6 },
    { file: "3_LIONLEFT_6_D_IMG.svg", order: 7 },
    { file: "3_LIONLEFT_7_D_IMG.svg", order: 8 },
    { file: "3_LIONLEFT_8_D_IMG.svg", order: 9 }
  ],
  LIONRIGHT: [
    { file: "3_LIONRIGHT_0_D_IMG.svg", order: 1 },
    { file: "3_LIONRIGHT_1_D_IMG.svg", order: 2 },
    { file: "3_LIONRIGHT_2_D_IMG.svg", order: 3 },
    { file: "3_LIONRIGHT_3_D_IMG.svg", order: 4 },
    { file: "3_LIONRIGHT_4_D_IMG.svg", order: 5 },
    { file: "3_LIONRIGHT_5_D_IMG.svg", order: 6 },
    { file: "3_LIONRIGHT_6_D_IMG.svg", order: 7 },
    { file: "3_LIONRIGHT_7_D_IMG.svg", order: 8 },
    { file: "3_LIONRIGHT_8_D_IMG.svg", order: 9 }
  ],
  NOSE: [
    { file: "3_OPENNOSE_CLOSEMOUTH_D_IMG.svg", order: 1 },
    { file: "3_OPENNOSE_OPENMOUTH_D_IMG.svg", order: 2 },
    { file: "3_PULLNOSE_MID_D_IMG.svg", order: 3 },
    { file: "3_PULLNOSE_L_D_IMG.svg", order: 4 },
    { file: "3_PULLNOSE_R_D_IMG.svg", order: 5 },
    { file: "3_SCRUNCHNOSE_MID_D_IMG.svg", order: 6 },
    { file: "3_SCRUNCHNOSE_R_D_IMG.svg", order: 7 },
    { file: "3_SCRUNCHNOSE_L_D_IMG.svg", order: 8 }
  ],
  PULL: [
    { file: "3_PULLTOP_R_D_IMG.svg", order: 1 },
    { file: "3_PULLTOP_L_D_IMG.svg", order: 2 },
    { file: "3_PULLFOREHEAD_R_D_IMG.svg", order: 3 },
    { file: "3_PULLFOREHEAD_L_D_IMG.svg", order: 4 },
    { file: "3_PULLJAW_R_D_IMG.svg", order: 5 },
    { file: "3_PULLJAW_L_D_IMG.svg", order: 6 },
    { file: "3_PULLEAR_R_D_IMG.svg", order: 7 },
    { file: "3_PULLEAR_L_D_IMG.svg", order: 8 }
  ]
};

// STATE
let selectedRoutineKey = null;
let selectedRoutineMovements = [];
let prefs = {
  secondsPerMovement: 45,
  restBetween: 3,
  rounds: 2
};

let isRunning = false;
let movementTimerId = null;
let currentMovementIndex = 0;
let currentRound = 1;
let currentPhase = "idle"; // "move" | "rest" | "idle"
let secondsRemaining = 0;

// AUDIO
let audioEnabled = true;
let audioEl = null;

function playDing() {
  if (!audioEnabled || !audioEl) return;
  try {
    audioEl.currentTime = 0;
    audioEl.play();
  } catch (e) {
    // ignore autoplay errors
  }
}

// DOM HELPERS
function qs(sel) { return document.querySelector(sel); }
function qsa(sel) { return Array.from(document.querySelectorAll(sel)); }

// SCREEN SWITCH
function switchScreen(screenId) {
  qsa(".screen").forEach(s => {
    if (s.id === screenId) s.classList.add("screen-active");
    else s.classList.remove("screen-active");
  });
}

// PRETTY NAMES
function prettyRoutineName(key) {
  const map = {
    CHINBOTTOM: "Chin – Bottom",
    CHINTOP: "Chin – Top",
    LION: "Lion (Center)",
    LIONLEFT: "Lion (Left Bias)",
    LIONRIGHT: "Lion (Right Bias)",
    NOSE: "Nose & Mid-Face",
    PULL: "Top / Forehead / Jaw / Ear Pulls",
    CUSTOM: "Custom Random"
  };
  return map[key] || key;
}

// LABEL FROM FILENAME (similar to lower/upper)
function movementLabelFromFile(key, file) {
  const base = file.replace(".svg", "");
  const parts = base.split("_");
  const routinePart = parts[1] || key;
  const movePart = parts[2] || "";
  const label = (routinePart + " " + movePart)
    .toLowerCase()
    .replace(/_/g, " ")
    .split(" ")
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return label;
}

// SORTED MOVES
function sortedMovementsFor(key) {
  const arr = ROUTINES[key] || [];
  return [...arr].sort((a, b) => a.order - b.order);
}

// CUSTOM RANDOM SEQUENCE (3–12 positions from all head files)
function handleCustomSequence() {
  const allMoves = Array.from(
    new Set([].concat(...Object.values(ROUTINES).map(arr => arr.map(m => m.file))))
  );
  const maxAllowed = Math.min(12, allMoves.length);
  let num = parseInt(
    prompt(`Enter number of movements for a custom random routine (3–${maxAllowed})`, "5"),
    10
  );
  if (isNaN(num) || num < 3) num = 3;
  if (num > maxAllowed) num = maxAllowed;

  const shuffled = allMoves.sort(() => Math.random() - 0.5);
  const selectedFiles = shuffled.slice(0, num);

  selectedRoutineKey = "CUSTOM";
  selectedRoutineMovements = selectedFiles.map((file, idx) => ({
    file,
    order: idx + 1
  }));

  qs("#prefs-title").textContent = "Custom Random";
  qs("#prefs-tagline").textContent = "Set your timing, then begin.";
  qs("#prefs-preview-label").textContent = "Custom Random";

  const strip = qs("#prefs-preview-strip");
  strip.innerHTML = "";
  selectedRoutineMovements.forEach(m => {
    const d = document.createElement("div");
    d.className = "preview-thumb";
    const img = document.createElement("img");
    img.src = IMAGE_BASE_PATH + m.file;
    img.alt = movementLabelFromFile("CUSTOM", m.file);
    d.appendChild(img);
    strip.appendChild(d);
  });

  switchScreen("screen-prefs");
}

// RENDER ROUTINE CARDS
function renderRoutineCards() {
  const container = qs("#routine-list");
  container.innerHTML = "";

  Object.keys(ROUTINES).forEach(key => {
    const moves = sortedMovementsFor(key);

    const card = document.createElement("div");
    card.className = "routine-card";
    card.dataset.key = key;

    const header = document.createElement("div");
    header.className = "routine-header-row";

    const title = document.createElement("div");
    title.className = "routine-name";
    title.textContent = prettyRoutineName(key);

    const count = document.createElement("div");
    count.className = "routine-count";
    count.textContent = moves.length + " positions";

    header.appendChild(title);
    header.appendChild(count);
    card.appendChild(header);

    const strip = document.createElement("div");
    strip.className = "thumb-strip";
    moves.forEach(m => {
      const t = document.createElement("div");
      t.className = "thumb";
      const img = document.createElement("img");
      img.src = IMAGE_BASE_PATH + m.file;
      img.alt = movementLabelFromFile(key, m.file);
      t.appendChild(img);
      strip.appendChild(t);
    });
    card.appendChild(strip);

    card.addEventListener("click", () => handleRoutineSelected(key));

    container.appendChild(card);
  });

  // Custom random card
  const customCard = document.createElement("div");
  customCard.className = "routine-card";
  customCard.dataset.key = "CUSTOM";

  const header = document.createElement("div");
  header.className = "routine-header-row";

  const title = document.createElement("div");
  title.className = "routine-name";
  title.textContent = "Custom Random";

  const countLabel = document.createElement("div");
  countLabel.className = "routine-count";
  countLabel.textContent = "3–12 positions";

  header.appendChild(title);
  header.appendChild(countLabel);
  customCard.appendChild(header);

  const strip = document.createElement("div");
  strip.className = "thumb-strip";

  const previewFiles = Array.from(
    new Set([].concat(...Object.values(ROUTINES).map(arr => arr.map(m => m.file))))
  ).slice(0, 3);

  previewFiles.forEach(file => {
    const t = document.createElement("div");
    t.className = "thumb";
    const img = document.createElement("img");
    img.src = IMAGE_BASE_PATH + file;
    img.alt = movementLabelFromFile("CUSTOM", file);
    t.appendChild(img);
    strip.appendChild(t);
  });

  customCard.appendChild(strip);
  customCard.addEventListener("click", handleCustomSequence);
  container.appendChild(customCard);
}

// ON ROUTINE SELECT
function handleRoutineSelected(key) {
  selectedRoutineKey = key;
  selectedRoutineMovements = sortedMovementsFor(key);

  qs("#prefs-title").textContent = prettyRoutineName(key);
  qs("#prefs-tagline").textContent = "Set your preferred timing, then begin.";
  qs("#prefs-preview-label").textContent = prettyRoutineName(key);

  const strip = qs("#prefs-preview-strip");
  strip.innerHTML = "";
  selectedRoutineMovements.forEach(m => {
    const d = document.createElement("div");
    d.className = "preview-thumb";
    const img = document.createElement("img");
    img.src = IMAGE_BASE_PATH + m.file;
    img.alt = movementLabelFromFile(key, m.file);
    d.appendChild(img);
    strip.appendChild(d);
  });

  switchScreen("screen-prefs");
}

// RANDOM ROUTINE
function pickRandomRoutine() {
  const keys = Object.keys(ROUTINES);
  if (!keys.length) return;
  const key = keys[Math.floor(Math.random() * keys.length)];
  handleRoutineSelected(key);
}

// COLLECT PREFS & START
function collectPrefsAndStart() {
  const sec = parseInt(qs("#input-seconds").value, 10) || 45;
  const rest = parseInt(qs("#input-rest").value, 10) || 3;
  const rounds = parseInt(qs("#input-rounds").value, 10) || 2;

  prefs.secondsPerMovement = Math.max(5, sec);
  prefs.restBetween = Math.max(0, rest);
  prefs.rounds = Math.max(1, rounds);

  startRoutine();
}

// SETUP PLAYER UI
function setupPlayerUI() {
  if (!selectedRoutineKey || !selectedRoutineMovements.length) return;

  qs("#player-title").textContent = prettyRoutineName(selectedRoutineKey);
  qs("#player-tagline").textContent =
    "Stay curious about what you feel in jaw, face, scalp and neck.";
  qs("#player-preview-label").textContent = prettyRoutineName(selectedRoutineKey);

  const strip = qs("#player-preview-strip");
  strip.innerHTML = "";
  selectedRoutineMovements.forEach(m => {
    const d = document.createElement("div");
    d.className = "preview-thumb";
    const img = document.createElement("img");
    img.src = IMAGE_BASE_PATH + m.file;
    img.alt = movementLabelFromFile(selectedRoutineKey, m.file);
    d.appendChild(img);
    strip.appendChild(d);
  });

  switchScreen("screen-player");
}

// PROGRESS BAR
const bar = document.getElementById("prog");
let barDirectionForward = true;

function animateProgressBarForMovement(seconds) {
  if (!bar) return;
  bar.style.transition = `width ${seconds}s linear`;
  if (barDirectionForward) {
    bar.style.width = "100%";
  } else {
    bar.style.width = "0%";
  }
  barDirectionForward = !barDirectionForward;
}

function resetProgressBarInstant() {
  if (!bar) return;
  bar.style.transition = "none";
  bar.style.width = barDirectionForward ? "0%" : "100%";
}

// ROUTINE LIFECYCLE
function startRoutine() {
  stopRoutineTimers();
  setupPlayerUI();
  currentMovementIndex = 0;
  currentRound = 1;
  isRunning = true;
  qs("#btn-play-pause").textContent = "Pause";
  qs("#status-message").textContent = "";
  barDirectionForward = true;
  resetProgressBarInstant();
  startPhase("move");
}

function stopRoutineTimers() {
  if (movementTimerId) {
    clearInterval(movementTimerId);
    movementTimerId = null;
  }
}

function startPhase(phase) {
  currentPhase = phase;

  if (phase === "move") {
    secondsRemaining = prefs.secondsPerMovement;
    resetProgressBarInstant();
    requestAnimationFrame(() => {
      animateProgressBarForMovement(prefs.secondsPerMovement);
    });
  } else {
    secondsRemaining = prefs.restBetween;
    if (bar) bar.style.transition = "none";
  }

  updateMovementUI();

  if (movementTimerId) clearInterval(movementTimerId);
  if (!isRunning) return;
  if (secondsRemaining <= 0) {
    handlePhaseComplete();
    return;
  }

  movementTimerId = setInterval(() => {
    if (!isRunning) return;
    secondsRemaining--;
    if (secondsRemaining <= 0) {
      clearInterval(movementTimerId);
      movementTimerId = null;
      handlePhaseComplete();
    } else {
      updatePhaseLabel();
    }
  }, 1000);
}

function handlePhaseComplete() {
  playDing();
  if (currentPhase === "move" && prefs.restBetween > 0) {
    startPhase("rest");
  } else {
    advanceMovement();
  }
}

function advanceMovement() {
  currentMovementIndex++;
  if (currentMovementIndex >= selectedRoutineMovements.length) {
    currentRound++;
    if (currentRound > prefs.rounds) {
      finishRoutine();
      return;
    }
    currentMovementIndex = 0;
  }
  startPhase("move");
}

function finishRoutine() {
  isRunning = false;
  stopRoutineTimers();
  qs("#btn-play-pause").textContent = "Restart";
  qs("#phase-label").textContent = "Complete";
  qs("#status-message").textContent =
    "Routine complete. Notice how your head, jaw and face feel.";
  playDing();
}

// UI UPDATES
function updateMovementUI() {
  const move = selectedRoutineMovements[currentMovementIndex];
  if (!move) return;

  const label = movementLabelFromFile(selectedRoutineKey, move.file);
  qs("#current-movement-label").textContent = label;

  const img = qs("#current-movement-image");
  img.src = IMAGE_BASE_PATH + move.file;
  img.alt = label;

  qs("#movement-count").textContent =
    `Movement ${currentMovementIndex + 1} of ${selectedRoutineMovements.length}`;
  qs("#round-count").textContent =
    `Round ${currentRound} of ${prefs.rounds}`;

  updatePhaseLabel();
}

function updatePhaseLabel() {
  let txt = "Ready";
  if (currentPhase === "move") {
    txt = `Move · ${secondsRemaining}s`;
  } else if (currentPhase === "rest") {
    txt = `Rest · ${secondsRemaining}s`;
  }
  qs("#phase-label").textContent = txt;
}

// CONTROLS
function togglePlayPause() {
  if (!selectedRoutineMovements.length) return;

  if (!isRunning && currentPhase === "idle") {
    startRoutine();
    return;
  }

  if (isRunning) {
    isRunning = false;
    if (movementTimerId) {
      clearInterval(movementTimerId);
      movementTimerId = null;
    }
    qs("#btn-play-pause").textContent = "Resume";
    if (bar) bar.style.transition = "none";
  } else {
    isRunning = true;
    qs("#btn-play-pause").textContent = "Pause";
    if (currentPhase === "move") {
      animateProgressBarForMovement(secondsRemaining);
    }
    startPhase(currentPhase || "move");
  }
}

function restartRoutine() {
  if (!selectedRoutineMovements.length) return;
  startRoutine();
}

// BACK BUTTONS
function initBackButtons() {
  qsa(".back-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.back;
      if (!target) return;
      if (btn.closest("#screen-player")) {
        stopRoutineTimers();
        isRunning = false;
        qs("#btn-play-pause").textContent = "Start";
        currentPhase = "idle";
        qs("#phase-label").textContent = "Ready";
      }
      switchScreen(target);
    });
  });
}

// INIT
document.addEventListener("DOMContentLoaded", () => {
  renderRoutineCards();
  initBackButtons();

  qs("#btn-random").addEventListener("click", pickRandomRoutine);
  qs("#btn-start-routine").addEventListener("click", collectPrefsAndStart);
  qs("#btn-play-pause").addEventListener("click", togglePlayPause);
  qs("#btn-restart").addEventListener("click", restartRoutine);

  audioEl = document.getElementById("audio-ding");
  const audioToggle = qs("#head-audio-toggle");
  if (audioToggle) {
    audioToggle.addEventListener("click", () => {
      audioEnabled = !audioEnabled;
      audioToggle.dataset.on = audioEnabled ? "1" : "0";
      const labelSpan = audioToggle.querySelector(".pill-label");
      if (labelSpan) labelSpan.textContent = audioEnabled ? "On" : "Off";
    });
  }

  // Optional deep link: head.html?routine=lion, etc.
  const params = new URLSearchParams(window.location.search);
  const r = params.get("routine");
  if (r) {
    const key = r.toUpperCase();
    if (ROUTINES[key]) {
      handleRoutineSelected(key);
    }
  }
});


// Neuro‑Ocular Activation app script for Neocities
// This script powers the eyes page by loading the ocular SVGs, organising them into
// specific gaze sequences, handling user preferences for duration, rest and rounds,
// and animating a progress bar that fills and empties on alternating gazes.  Do not
// rename any files in InnervationSVGs; simply ensure they exist as listed here.

// Base path to the ocular SVGs.  The files live in the InnervationSVGs directory
// alongside the lower/upper/head region assets.  No trailing slash needed.
const IMAGE_BASE_PATH = "InnervationSVGs/";

// Define the gaze sequences.  Each routine key lists the SVG filename and an
// order value.  The order ensures gazes are presented in the intended sequence.
// Do not change the filenames or their order assignments.
const ROUTINES = {
  FULL: [
    { file: "9_HEIGHT_C_D_IMG.svg", order: 1 },  // Up
    { file: "9_WEST_C_D_IMG.svg",  order: 2 },  // Left
    { file: "9_DEPTH_C_D_IMG.svg", order: 3 },  // Down
    { file: "9_EAST_C_D_IMG.svg",  order: 4 },  // Right
    { file: "9_HEIGHTWEST_C_D_IMG.svg", order: 5 }, // Up‑Left
    { file: "9_HEIGHTEAST_C_D_IMG.svg", order: 6 }, // Up‑Right
    { file: "9_DEPTHWEST_C_D_IMG.svg", order: 7 }, // Down‑Left
    { file: "9_DEPTHEAST_C_D_IMG.svg", order: 8 }, // Down‑Right
    { file: "9_INWARD_C_D_IMG.svg", order: 9 }   // Inward / Circular
  ],
  CORE: [
    { file: "9_HEIGHT_C_D_IMG.svg", order: 1 }, // Up
    { file: "9_DEPTH_C_D_IMG.svg", order: 2 },  // Down
    { file: "9_WEST_C_D_IMG.svg",  order: 3 },  // Left
    { file: "9_EAST_C_D_IMG.svg",  order: 4 }   // Right
  ],
  DIAGONAL: [
    { file: "9_HEIGHTWEST_C_D_IMG.svg", order: 1 }, // Up‑Left
    { file: "9_HEIGHTEAST_C_D_IMG.svg", order: 2 }, // Up‑Right
    { file: "9_DEPTHWEST_C_D_IMG.svg", order: 3 }, // Down‑Left
    { file: "9_DEPTHEAST_C_D_IMG.svg", order: 4 }  // Down‑Right
  ],

  // Alertness flow: energises the system with vertical and lateral gazes
  ALERT: [
    { file: "9_HEIGHT_C_D_IMG.svg", order: 1 },      // Up
    { file: "9_WEST_C_D_IMG.svg",  order: 2 },      // Left
    { file: "9_EAST_C_D_IMG.svg",  order: 3 },      // Right
    { file: "9_HEIGHTEAST_C_D_IMG.svg", order: 4 }, // Up‑Right
    { file: "9_INWARD_C_D_IMG.svg", order: 5 }       // Circular/inward
  ],

  // Grounding flow: settles the nervous system with downward and lateral gazes
  GROUND: [
    { file: "9_DEPTHWEST_C_D_IMG.svg", order: 1 }, // Down‑Left
    { file: "9_DEPTH_C_D_IMG.svg",      order: 2 }, // Down
    { file: "9_DEPTHEAST_C_D_IMG.svg", order: 3 }, // Down‑Right
    { file: "9_WEST_C_D_IMG.svg",       order: 4 }, // Left
    { file: "9_INWARD_C_D_IMG.svg",     order: 5 }  // Circular/inward
  ],

  // Restoring flow: encourages release with downward and circular gazes
  RESTORE: [
    { file: "9_DEPTHWEST_C_D_IMG.svg", order: 1 }, // Down‑Left
    { file: "9_DEPTHEAST_C_D_IMG.svg", order: 2 }, // Down‑Right
    { file: "9_INWARD_C_D_IMG.svg",     order: 3 }, // Circular/inward
    { file: "9_INWARD_C_D_IMG.svg",     order: 4 }  // Repeat circular for extended unwinding
  ]
};

// Previously each routine card showed an icon in the ocular page.  The user has
// requested that these icons live on the home/landing page only, so the
// ocular page no longer uses ICON_MAP.  We leave this constant empty to
// avoid undefined references in future code.  See index.html for the icons
// displayed in the menu.
const ICON_MAP = {};

// Generate a custom random gaze sequence.  Prompts the user for a number
// between 3 and 9, shuffles all available gaze files and creates a new
// sequence.  This does not overwrite the built‑in routines; instead it
// presents a one‑off sequence under the "Custom Random" label.
function handleCustomSequence() {
  // Collect all unique gaze filenames from the defined routines
  const allFiles = Array.from(new Set([].concat(...Object.values(ROUTINES).map(arr => arr.map(m => m.file)))));
  // Determine the maximum number of gazes (cap at 9 since there are only 9 unique positions)
  const maxAllowed = Math.min(9, allFiles.length);
  let num = parseInt(prompt(`Enter number of gazes for a custom random sequence (3–${maxAllowed})`, "5"), 10);
  if (isNaN(num) || num < 3) num = 3;
  if (num > maxAllowed) num = maxAllowed;
  // Shuffle and pick the requested number of gazes
  const shuffled = allFiles.sort(() => Math.random() - 0.5);
  const selectedFiles = shuffled.slice(0, num);
  // Build movement objects with sequential order
  selectedRoutineKey = "CUSTOM";
  selectedRoutineMovements = selectedFiles.map((file, idx) => ({ file: file, order: idx + 1 }));
  // Update preference labels and preview
  qs("#prefs-title").textContent = "Custom Random";
  qs("#prefs-tagline").textContent = "Set your gaze duration and rest.";
  qs("#prefs-preview-label").textContent = "Custom Random";
  const strip = qs("#prefs-preview-strip");
  strip.innerHTML = "";
  selectedRoutineMovements.forEach(m => {
    const d = document.createElement("div");
    d.className = "preview-thumb";
    const img = document.createElement("img");
    img.src = IMAGE_BASE_PATH + m.file;
    img.alt = movementLabelFromFile("CUSTOM", m.file);
    d.appendChild(img);
    strip.appendChild(d);
  });
  // Show preferences screen for this custom sequence
  switchScreen("screen-prefs");
}

// Map filenames to human‑friendly labels with emojis.  This allows the app to
// display clear gaze directions on the player screen.
const FILE_TO_LABEL = {
  // Height (vertical): subject looks up → Height
  "9_HEIGHT_C_D_IMG.svg":     "Height (Up) ⬆️",
  // Depth: subject looks down
  "9_DEPTH_C_D_IMG.svg":      "Depth (Down) ⬇️",
  // West: subject's right (viewer sees left)
  "9_WEST_C_D_IMG.svg":       "West (Right) ➡️",
  // East: subject's left (viewer sees right)
  "9_EAST_C_D_IMG.svg":       "East (Left) ⬅️",
  // Diagonals: combine height/depth with west/east
  "9_HEIGHTWEST_C_D_IMG.svg": "Height‑West (Up‑Right) ↗️",
  "9_HEIGHTEAST_C_D_IMG.svg": "Height‑East (Up‑Left) ↖️",
  "9_DEPTHWEST_C_D_IMG.svg":  "Depth‑West (Down‑Right) ↘️",
  "9_DEPTHEAST_C_D_IMG.svg":  "Depth‑East (Down‑Left) ↙️",
  // Circular/inward tracking
  "9_INWARD_C_D_IMG.svg":     "Inward (Circular) 🎯"
};

// State variables for managing the sequence and timers
let selectedRoutineKey = null;
let selectedRoutineMovements = [];
let prefs = {
  secondsPerMovement: 45,
  restBetween: 3,
  rounds: 2
};
let isRunning = false;
let movementTimerId = null;
let currentMovementIndex = 0;
let currentRound = 1;
let currentPhase = "idle"; // "move", "rest" or "idle"
let secondsRemaining = 0;

// Audio settings
let audioEnabled = true;
let audioEl; // will be assigned on DOMContentLoaded

// Play the ding sound if enabled
function playDing() {
  if (!audioEnabled || !audioEl) return;
  try {
    audioEl.currentTime = 0;
    audioEl.play();
  } catch (e) {
    // Ignore playback errors (e.g. autoplay restrictions)
  }
}

// Helper functions for DOM access
function qs(sel) { return document.querySelector(sel); }
function qsa(sel) { return Array.from(document.querySelectorAll(sel)); }

// Switch visible screen
function switchScreen(screenId) {
  qsa(".screen").forEach(s => {
    if (s.id === screenId) s.classList.add("screen-active");
    else s.classList.remove("screen-active");
  });
}

// Pretty names for sequences
function prettyRoutineName(key) {
  if (key === "FULL") return "All 9 Points";
  if (key === "CORE") return "Main 4 Directions";
  if (key === "DIAGONAL") return "Supplemental 4 Angles";
  if (key === "ALERT") return "Alertness Flow";
  if (key === "GROUND") return "Grounding Flow";
  if (key === "RESTORE") return "Restoring Flow";
  return key;
}

// Derive label from filename using the map
function movementLabelFromFile(key, file) {
  return FILE_TO_LABEL[file] || file.replace(/_/g, " ");
}

// Sort movements by order for a routine
function sortedMovementsFor(key) {
  const arr = ROUTINES[key] || [];
  return [...arr].sort((a, b) => a.order - b.order);
}

// Render sequence cards on picker screen
function renderRoutineCards() {
  const container = qs("#routine-list");
  container.innerHTML = "";
  Object.keys(ROUTINES).forEach(key => {
    const moves = sortedMovementsFor(key);
    const card = document.createElement("div");
    card.className = "routine-card";
    card.dataset.key = key;
    // No icons are inserted on the ocular routine picker.  Icons live on the
    // landing page menu instead.  Previously an icon was prepended here if
    // defined in ICON_MAP, but ICON_MAP is now empty per user request.

    // Header
    const header = document.createElement("div");
    header.className = "routine-header-row";
    const title = document.createElement("div");
    title.className = "routine-name";
    title.textContent = prettyRoutineName(key);
    const count = document.createElement("div");
    count.className = "routine-count";
    count.textContent = moves.length + " gazes";
    header.appendChild(title);
    header.appendChild(count);
    card.appendChild(header);
    // Thumbnail strip
    const strip = document.createElement("div");
    strip.className = "thumb-strip";
    moves.forEach(m => {
      const t = document.createElement("div");
      t.className = "thumb";
      const img = document.createElement("img");
      img.src = IMAGE_BASE_PATH + m.file;
      img.alt = movementLabelFromFile(key, m.file);
      t.appendChild(img);
      strip.appendChild(t);
    });
    card.appendChild(strip);
    // Click handler
    card.addEventListener("click", () => {
      handleRoutineSelected(key);
    });
    container.appendChild(card);
  });

  // Add a dedicated card for creating a custom random gaze sequence.  This card
  // allows the user to choose any number of gazes from the full library and
  // generates a one‑off sequence.  It does not replace the built‑in routines.
  const customCard = document.createElement("div");
  customCard.className = "routine-card";
  customCard.dataset.key = "CUSTOM";
  const header = document.createElement("div");
  header.className = "routine-header-row";
  const title = document.createElement("div");
  title.className = "routine-name";
  title.textContent = "Custom Random";
  const countLabel = document.createElement("div");
  countLabel.className = "routine-count";
  countLabel.textContent = "3–9 gazes";
  header.appendChild(title);
  header.appendChild(countLabel);
  customCard.appendChild(header);
  const strip = document.createElement("div");
  strip.className = "thumb-strip";
  // Use a few preview images from the unique file set for visuals
  const previewFiles = Array.from(new Set([].concat(...Object.values(ROUTINES).map(arr => arr.map(m => m.file))))).slice(0, 3);
  previewFiles.forEach(file => {
    const t = document.createElement("div");
    t.className = "thumb";
    const img = document.createElement("img");
    img.src = IMAGE_BASE_PATH + file;
    img.alt = movementLabelFromFile("CUSTOM", file);
    t.appendChild(img);
    strip.appendChild(t);
  });
  customCard.appendChild(strip);
  customCard.addEventListener("click", handleCustomSequence);
  container.appendChild(customCard);
}

// When a user picks a sequence
function handleRoutineSelected(key) {
  selectedRoutineKey = key;
  selectedRoutineMovements = sortedMovementsFor(key);
  // Update preferences preview
  qs("#prefs-title").textContent = prettyRoutineName(key);
  qs("#prefs-tagline").textContent = "Set your gaze duration and rest.";
  qs("#prefs-preview-label").textContent = prettyRoutineName(key);
  const strip = qs("#prefs-preview-strip");
  strip.innerHTML = "";
  selectedRoutineMovements.forEach(m => {
    const d = document.createElement("div");
    d.className = "preview-thumb";
    const img = document.createElement("img");
    img.src = IMAGE_BASE_PATH + m.file;
    img.alt = movementLabelFromFile(key, m.file);
    d.appendChild(img);
    strip.appendChild(d);
  });
  switchScreen("screen-prefs");
}

// Randomly choose a routine
function pickRandomRoutine() {
  // Choose a random defined routine key (FULL, CORE, DIAGONAL, ALERT, GROUND, RESTORE)
  const keys = Object.keys(ROUTINES);
  if (!keys.length) return;
  const key = keys[Math.floor(Math.random() * keys.length)];
  handleRoutineSelected(key);
}

// Collect user preferences and start sequence
function collectPrefsAndStart() {
  const sec = parseInt(qs("#input-seconds").value, 10) || 45;
  const rest = parseInt(qs("#input-rest").value, 10) || 3;
  const rounds = parseInt(qs("#input-rounds").value, 10) || 2;
  prefs.secondsPerMovement = Math.max(5, sec);
  prefs.restBetween = Math.max(0, rest);
  prefs.rounds = Math.max(1, rounds);
  startRoutine();
}

// Set up the player UI
function setupPlayerUI() {
  if (!selectedRoutineKey || !selectedRoutineMovements.length) return;
  qs("#player-title").textContent = prettyRoutineName(selectedRoutineKey);
  qs("#player-tagline").textContent = "Stay curious about what you feel in your eyes, brain and body.";
  qs("#player-preview-label").textContent = prettyRoutineName(selectedRoutineKey);
  const strip = qs("#player-preview-strip");
  strip.innerHTML = "";
  selectedRoutineMovements.forEach(m => {
    const d = document.createElement("div");
    d.className = "preview-thumb";
    const img = document.createElement("img");
    img.src = IMAGE_BASE_PATH + m.file;
    img.alt = movementLabelFromFile(selectedRoutineKey, m.file);
    d.appendChild(img);
    strip.appendChild(d);
  });
  switchScreen("screen-player");
}

// Progress bar elements
const bar = document.getElementById("prog");
let barDirectionForward = true;

// Animate the bar for a gaze
function animateProgressBarForMovement(seconds) {
  if (!bar) return;
  bar.style.transition = `width ${seconds}s linear`;
  if (barDirectionForward) {
    bar.style.width = "100%";
  } else {
    bar.style.width = "0%";
  }
  barDirectionForward = !barDirectionForward;
}

// Instantly reset the bar to the correct starting position
function resetProgressBarInstant() {
  if (!bar) return;
  bar.style.transition = "none";
  bar.style.width = barDirectionForward ? "0%" : "100%";
}

// Begin the sequence
function startRoutine() {
  stopRoutineTimers();
  setupPlayerUI();
  currentMovementIndex = 0;
  currentRound = 1;
  isRunning = true;
  qs("#btn-play-pause").textContent = "Pause";
  qs("#status-message").textContent = "";
  barDirectionForward = true;
  resetProgressBarInstant();
  startPhase("move");
}

// Clear existing timers
function stopRoutineTimers() {
  if (movementTimerId) {
    clearInterval(movementTimerId);
    movementTimerId = null;
  }
}

// Start a phase: move or rest
function startPhase(phase) {
  currentPhase = phase;
  if (phase === "move") {
    secondsRemaining = prefs.secondsPerMovement;
    resetProgressBarInstant();
    requestAnimationFrame(() => {
      animateProgressBarForMovement(prefs.secondsPerMovement);
    });
  } else {
    secondsRemaining = prefs.restBetween;
    if (bar) {
      bar.style.transition = "none";
    }
  }
  updateMovementUI();
  if (movementTimerId) clearInterval(movementTimerId);
  if (!isRunning) return;
  if (secondsRemaining <= 0) {
    handlePhaseComplete();
    return;
  }
  movementTimerId = setInterval(() => {
    if (!isRunning) return;
    secondsRemaining--;
    if (secondsRemaining <= 0) {
      clearInterval(movementTimerId);
      movementTimerId = null;
      handlePhaseComplete();
    } else {
      updatePhaseLabel();
    }
  }, 1000);
}

// When a phase completes
function handlePhaseComplete() {
  // Play ding at phase completion
  playDing();
  if (currentPhase === "move" && prefs.restBetween > 0) {
    startPhase("rest");
  } else {
    advanceMovement();
  }
}

// Advance to next gaze or next round
function advanceMovement() {
  currentMovementIndex++;
  if (currentMovementIndex >= selectedRoutineMovements.length) {
    currentRound++;
    if (currentRound > prefs.rounds) {
      finishRoutine();
      return;
    }
    currentMovementIndex = 0;
  }
  startPhase("move");
}

// Finish the entire sequence
function finishRoutine() {
  isRunning = false;
  stopRoutineTimers();
  qs("#btn-play-pause").textContent = "Restart";
  qs("#phase-label").textContent = "Complete";
  qs("#status-message").textContent = "Sequence complete. Notice how your vision and mind feel.";
  // Final ding when routine ends
  playDing();
}

// Update the UI for the current gaze and phase
function updateMovementUI() {
  const move = selectedRoutineMovements[currentMovementIndex];
  if (!move) return;
  const label = movementLabelFromFile(selectedRoutineKey, move.file);
  qs("#current-movement-label").textContent = label;
  const img = qs("#current-movement-image");
  img.src = IMAGE_BASE_PATH + move.file;
  img.alt = label;
  qs("#movement-count").textContent = `Gaze ${currentMovementIndex + 1} of ${selectedRoutineMovements.length}`;
  qs("#round-count").textContent = `Round ${currentRound} of ${prefs.rounds}`;
  updatePhaseLabel();
}

// Update the phase label (move/rest/ready)
function updatePhaseLabel() {
  let txt = "";
  if (currentPhase === "move") {
    txt = `Gaze • ${secondsRemaining}s`;
  } else if (currentPhase === "rest") {
    txt = `Rest • ${secondsRemaining}s`;
  } else {
    txt = "Ready";
  }
  qs("#phase-label").textContent = txt;
}

// Play/pause control
function togglePlayPause() {
  if (!selectedRoutineMovements.length) return;
  if (!isRunning && currentPhase === "idle") {
    startRoutine();
    return;
  }
  if (isRunning) {
    isRunning = false;
    if (movementTimerId) {
      clearInterval(movementTimerId);
      movementTimerId = null;
    }
    qs("#btn-play-pause").textContent = "Resume";
    if (bar) {
      bar.style.transition = "none";
    }
  } else {
    isRunning = true;
    qs("#btn-play-pause").textContent = "Pause";
    // Continue the bar animation if we are in a move phase
    if (currentPhase === "move") {
      animateProgressBarForMovement(secondsRemaining);
    }
    startPhase(currentPhase || "move");
  }
}

// Restart control
function restartRoutine() {
  if (!selectedRoutineMovements.length) return;
  startRoutine();
}

// Initialise back button behaviour
function initBackButtons() {
  qsa(".back-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.back;
      if (!target) return;
      if (btn.closest("#screen-player")) {
        stopRoutineTimers();
        isRunning = false;
        qs("#btn-play-pause").textContent = "Start";
        currentPhase = "idle";
        qs("#phase-label").textContent = "Ready";
      }
      switchScreen(target);
    });
  });
}

// DOM ready initialisation
document.addEventListener("DOMContentLoaded", () => {
  renderRoutineCards();
  initBackButtons();
  qs("#btn-random").addEventListener("click", pickRandomRoutine);
  qs("#btn-start-routine").addEventListener("click", collectPrefsAndStart);
  qs("#btn-play-pause").addEventListener("click", togglePlayPause);
  qs("#btn-restart").addEventListener("click", restartRoutine);

  // Audio control setup: assign the audio element and toggle
  audioEl = document.getElementById("audio-ding");
  const audioToggle = document.getElementById("ocular-audio-toggle");
  if (audioToggle) {
    audioToggle.addEventListener("click", () => {
      // Toggle on/off
      audioEnabled = !audioEnabled;
      // Update dataset and label
      audioToggle.dataset.on = audioEnabled ? "1" : "0";
      const labelSpan = audioToggle.querySelector(".pill-label");
      if (labelSpan) labelSpan.textContent = audioEnabled ? "On" : "Off";
    });
  }

  // If a routine is specified in the query string, automatically select and
  // display it.  The parameter name is "routine" and should correspond to a
  // key in the ROUTINES object (case‑insensitive).  For example,
  // eyes.html?routine=alert will select the Alert sequence.  This does not
  // trigger start immediately; it simply preselects the sequence and shows
  // the preferences screen.
  const params = new URLSearchParams(window.location.search);
  if (params.has("routine")) {
    const r = params.get("routine");
    if (r) {
      const key = r.toUpperCase();
      if (ROUTINES[key]) {
        handleRoutineSelected(key);
      }
    }
  }
});

// Breathwork Toolkit logic
// - Brand pill bar (Solar / Lunar / Alternate / Cyclical) is the ONLY nav
// - Solar / Lunar / Alternate -> Nostril module
// - Cyclical -> Hyperventilation module

document.addEventListener("DOMContentLoaded", () => {
  /* --------------------------------------------------------
   * ELEMENT HOOKS
   * ------------------------------------------------------ */

  // Brand bar
  const brandItems = document.querySelectorAll(".brand-item");

  // Screens
  const nostrilScreen = document.getElementById("nostrilScreen");
  const hyperScreen = document.getElementById("hyperScreen");

  /* ---------- NOSTRIL MODULE ELEMENTS ---------- */

  const phaseDurationInput = document.getElementById("phaseDuration");
  const startAltBtn = document.getElementById("startAltBtn");
  const stopAltBtn = document.getElementById("stopAltBtn");

  const leftNostrilCol = document.getElementById("leftNostril");
  const rightNostrilCol = document.getElementById("rightNostril");
  // classify for CSS
  if (leftNostrilCol) leftNostrilCol.classList.add("left");
  if (rightNostrilCol) rightNostrilCol.classList.add("right");

  const phaseTitleEl = document.getElementById("phaseTitle");
  const phaseSubtitleEl = document.getElementById("phaseSubtitle");
  const altProgressBar = document.getElementById("altProgressBar");
  const elapsedTimeEl = document.getElementById("elapsedTime");
  const totalTimeEl = document.getElementById("totalTime");
  const cycleCountEl = document.getElementById("cycleCount");
  const cycleDefinitionTextEl = document.getElementById("cycleDefinitionText");

  const infoAlternate = document.getElementById("nostrilInfoAlternate");
  const infoRight = document.getElementById("nostrilInfoRight");
  const infoLeft = document.getElementById("nostrilInfoLeft");

  /* ---------- HV MODULE ELEMENTS ---------- */

  const hvSpeedEl = document.getElementById("hvSpeed");
  const hvRoundsEl = document.getElementById("hvRounds");
  const hvBreathsSelectEl = document.getElementById("hvBreathsSelect");
  const hvBreathsCustomEl = document.getElementById("hvBreathsCustom");

  const startHvBtn = document.getElementById("startHvBtn");
  const stopHvBtn = document.getElementById("stopHvBtn");

  const hvPhaseTitleEl = document.getElementById("hvPhaseTitle");
  const hvPhaseSubtitleEl = document.getElementById("hvPhaseSubtitle");
  const hvProgressBar = document.getElementById("hvProgressBar");
  const hvRoundLabelEl = document.getElementById("hvRoundLabel");
  const hvBreathLabelEl = document.getElementById("hvBreathLabel");
  const hvDirectionLabelEl = document.getElementById("hvDirectionLabel");
  const hvTimerDisplayEl = document.getElementById("hvTimerDisplay");
  const hvTimerLabelEl = document.getElementById("hvTimerLabel");
  const hvEndRetentionBtn = document.getElementById("hvEndRetentionBtn");
  const hvHoldsContainer = document.getElementById("hvHoldsContainer");
  const hvHoldsList = document.getElementById("hvHoldsList");

  /* --------------------------------------------------------
   * NOSTRIL MODULE STATE
   * ------------------------------------------------------ */

  let altMode = "alternate"; // "right", "left", "alternate"
  let altDurationMs = 4000;
  let altRunning = false;
  let altPhaseIndex = 0;
  let altCycleCount = 0;
  let altPhaseStart = null;
  let altRafId = null;

  const ALT_SEQUENCES = {
    alternate: [
      { nostril: "Left", direction: "In" },
      { nostril: "Right", direction: "Out" },
      { nostril: "Right", direction: "In" },
      { nostril: "Left", direction: "Out" }
    ],
    right: [
      { nostril: "Right", direction: "In" },
      { nostril: "Right", direction: "Out" }
    ],
    left: [
      { nostril: "Left", direction: "In" },
      { nostril: "Left", direction: "Out" }
    ]
  };

  const CYCLE_DEFS = {
    alternate: "(Alternate mode: 1 cycle = IN L → OUT R → IN R → OUT L)",
    right: "(Right mode: 1 cycle = IN Right → OUT Right)",
    left: "(Left mode: 1 cycle = IN Left → OUT Left)"
  };

  function setAltMode(mode) {
    altMode = mode;
    altPhaseIndex = 0;
    altCycleCount = 0;
    cycleCountEl.textContent = "0";
    cycleDefinitionTextEl.textContent = CYCLE_DEFS[mode];

    // Info cards
    infoAlternate.classList.remove("active");
    infoRight.classList.remove("active");
    infoLeft.classList.remove("active");

    if (mode === "alternate") infoAlternate.classList.add("active");
    if (mode === "right") infoRight.classList.add("active");
    if (mode === "left") infoLeft.classList.add("active");

    updateAltPhaseUIReady();
  }

  function updateAltPhaseUIReady() {
    phaseTitleEl.textContent = "Ready";
    phaseSubtitleEl.innerHTML =
      'Set your phase time, choose a pattern from the icons above, then press <strong>Start</strong>.';
    elapsedTimeEl.textContent = "0.0s";
    totalTimeEl.textContent = (altDurationMs / 1000).toFixed(1) + "s";
    altProgressBar.style.width = "0%";
    altProgressBar.classList.remove("exhale");
    leftNostrilCol.classList.remove("active");
    rightNostrilCol.classList.remove("active");
  }

  function altStart() {
    if (altRunning) return;
    const seconds = parseFloat(phaseDurationInput.value);
    if (!isFinite(seconds) || seconds <= 0) {
      phaseDurationInput.value = "4";
      altDurationMs = 4000;
    } else {
      altDurationMs = seconds * 1000;
    }
    totalTimeEl.textContent = (altDurationMs / 1000).toFixed(1) + "s";

    altRunning = true;
    altPhaseStart = null;
    altPhaseIndex = 0;
    altCycleCount = 0;
    cycleCountEl.textContent = "0";

    if (altRafId) cancelAnimationFrame(altRafId);
    altRafId = requestAnimationFrame(altTick);
  }

  function altStop(resetInfo = true) {
    altRunning = false;
    if (altRafId) {
      cancelAnimationFrame(altRafId);
      altRafId = null;
    }
    altPhaseStart = null;
    altPhaseIndex = 0;
    altCycleCount = 0;
    cycleCountEl.textContent = "0";
    altProgressBar.style.width = "0%";
    altProgressBar.classList.remove("exhale");
    leftNostrilCol.classList.remove("active");
    rightNostrilCol.classList.remove("active");
    elapsedTimeEl.textContent = "0.0s";
    if (resetInfo) updateAltPhaseUIReady();
  }

  function altTick(timestamp) {
    if (!altRunning) return;

    if (altPhaseStart == null) {
      altPhaseStart = timestamp;
    }

    const seq = ALT_SEQUENCES[altMode];
    const phase = seq[altPhaseIndex];
    const elapsed = timestamp - altPhaseStart;
    let progress = elapsed / altDurationMs;
    if (progress > 1) progress = 1;

    const isInhale = phase.direction === "In";
    const shownProgress = isInhale ? progress : 1 - progress;

    altProgressBar.style.width = (shownProgress * 100).toFixed(1) + "%";
    altProgressBar.classList.toggle("exhale", !isInhale);

    elapsedTimeEl.textContent = (elapsed / 1000).toFixed(1) + "s";

    // Nostril highlight
    leftNostrilCol.classList.remove("active");
    rightNostrilCol.classList.remove("active");
    if (phase.nostril === "Left") leftNostrilCol.classList.add("active");
    if (phase.nostril === "Right") rightNostrilCol.classList.add("active");

    // Phase titles
    const modeLabel =
      altMode === "alternate"
        ? "Alternate"
        : altMode === "right"
        ? "Right-only"
        : "Left-only";
    phaseTitleEl.textContent = `${modeLabel} — ${phase.direction.toUpperCase()} ${phase.nostril.toUpperCase()}`;

    const tagHtml =
      '<span class="tag ' +
      (isInhale ? "tag-inhale" : "tag-exhale") +
      '">' +
      (isInhale ? "Inhale" : "Exhale") +
      "</span>";

    const action =
      (isInhale ? "Inhale through the " : "Exhale through the ") +
      phase.nostril.toLowerCase() +
      " nostril.";

    phaseSubtitleEl.innerHTML = `${tagHtml}${action}`;

    if (elapsed >= altDurationMs) {
      // next phase
      altPhaseIndex++;
      altPhaseStart = timestamp;

      if (altPhaseIndex >= seq.length) {
        altPhaseIndex = 0;
        altCycleCount++;
        cycleCountEl.textContent = String(altCycleCount);
      }
    }

    altRafId = requestAnimationFrame(altTick);
  }

  phaseDurationInput.addEventListener("change", () => {
    if (altRunning) return;
    const seconds = parseFloat(phaseDurationInput.value);
    if (!isFinite(seconds) || seconds <= 0) {
      phaseDurationInput.value = "4";
      altDurationMs = 4000;
    } else {
      altDurationMs = seconds * 1000;
    }
    totalTimeEl.textContent = (altDurationMs / 1000).toFixed(1) + "s";
  });

  startAltBtn.addEventListener("click", altStart);
  stopAltBtn.addEventListener("click", () => altStop(true));

  /* --------------------------------------------------------
   * HYPERVENTILATION MODULE STATE
   * ------------------------------------------------------ */

  let hvState = "idle"; // "idle" | "breathing" | "retention" | "inhale_hold" | "exhale_release"
  let hvRunning = false;
  let hvRoundTotal = 0;
  let hvRoundCurrent = 0;
  let hvBreathsPerRound = 0;
  let hvBreathCount = 0;
  let hvPhaseDirection = "In";
  let hvPhaseDurationMs = 1200;
  let hvPhaseStart = null;
  let hvBreathingRafId = null;
  let hvTimerIntervalId = null;
  let hvRetentionStartTime = null;
  let hvTimerRemaining = 0;

  function getHvPhaseDurationMs() {
    const val = hvSpeedEl.value;
    if (val === "slow") return 2200;
    if (val === "fast") return 700;
    return 1200; // standard
  }

  function showHvBreathCount() {
    hvBreathLabelEl.textContent =
      hvState === "breathing" ? `Breath: ${hvBreathCount}/${hvBreathsPerRound}` : "Breath: —";
  }

  function resetHvUI() {
    hvRunning = false;
    hvState = "idle";
    hvRoundTotal = 0;
    hvRoundCurrent = 0;
    hvBreathsPerRound = 0;
    hvBreathCount = 0;
    hvPhaseDirection = "In";
    hvPhaseDurationMs = getHvPhaseDurationMs();
    hvPhaseStart = null;

    if (hvBreathingRafId) cancelAnimationFrame(hvBreathingRafId);
    hvBreathingRafId = null;

    if (hvTimerIntervalId) clearInterval(hvTimerIntervalId);
    hvTimerIntervalId = null;

    hvEndRetentionBtn.disabled = true;

    hvProgressBar.style.width = "0%";
    hvRoundLabelEl.textContent = "Round: —";
    hvBreathLabelEl.textContent = "Breath: —";
    hvDirectionLabelEl.textContent = "Phase: —";
    hvTimerDisplayEl.textContent = "0.0";
    hvTimerLabelEl.textContent = "Timer";

    hvPhaseTitleEl.textContent = "Ready";
    hvPhaseSubtitleEl.textContent =
      "Choose your breath speed, rounds, and breaths per round, then press Start Rounds.";

    hvHoldsList.innerHTML = "";
    hvHoldsContainer.classList.add("hidden");
  }

  function hvStart() {
    if (hvRunning) return;

    hvPhaseDurationMs = getHvPhaseDurationMs();

    let rounds = parseInt(hvRoundsEl.value, 10);
    if (!Number.isFinite(rounds) || rounds < 2) rounds = 2;
    if (rounds > 12) rounds = 12;
    hvRoundsEl.value = String(rounds);
    hvRoundTotal = rounds;

    let breaths = 20;
    const selectVal = hvBreathsSelectEl.value;
    if (selectVal === "custom") {
      const custom = parseInt(hvBreathsCustomEl.value, 10);
      if (Number.isFinite(custom) && custom > 0 && custom <= 200) {
        breaths = custom;
      }
    } else {
      const n = parseInt(selectVal, 10);
      if (Number.isFinite(n)) breaths = n;
    }
    hvBreathsPerRound = breaths;

    hvRunning = true;
    hvRoundCurrent = 1;
    hvHoldsList.innerHTML = "";
    hvHoldsContainer.classList.add("hidden");

    startHvBreathingRound();
  }

  function startHvBreathingRound() {
    hvState = "breathing";
    hvPhaseDurationMs = getHvPhaseDurationMs();
    hvPhaseDirection = "In";
    hvPhaseStart = null;
    hvBreathCount = 0;

    if (hvBreathingRafId) cancelAnimationFrame(hvBreathingRafId);
    hvBreathingRafId = requestAnimationFrame(hvBreathingTick);

    hvPhaseTitleEl.textContent = `Round ${hvRoundCurrent} — Hyperventilation`;
    hvPhaseSubtitleEl.textContent =
      "Full inhale, relaxed exhale. Let the rhythm carry you. When the breaths finish, you’ll move into empty-hold retention.";
    hvRoundLabelEl.textContent = `Round: ${hvRoundCurrent}/${hvRoundTotal}`;
    hvDirectionLabelEl.textContent = "Phase: IN";
    showHvBreathCount();
    hvTimerLabelEl.textContent = "Phase timer";
  }

  function hvBreathingTick(timestamp) {
    if (!hvRunning || hvState !== "breathing") return;

    if (hvPhaseStart == null) hvPhaseStart = timestamp;
    const elapsed = timestamp - hvPhaseStart;
    let progress = elapsed / hvPhaseDurationMs;
    if (progress > 1) progress = 1;

    const isIn = hvPhaseDirection === "In";
    const shownProg = isIn ? progress : 1 - progress;
    hvProgressBar.style.width = (shownProg * 100).toFixed(1) + "%";

    hvTimerDisplayEl.textContent = (elapsed / 1000).toFixed(1);
    hvDirectionLabelEl.textContent = `Phase: ${hvPhaseDirection.toUpperCase()}`;

    if (elapsed >= hvPhaseDurationMs) {
      // phase finished
      if (hvPhaseDirection === "In") {
        hvPhaseDirection = "Out";
        hvPhaseStart = timestamp;
      } else {
        hvBreathCount++;
        if (hvBreathCount >= hvBreathsPerRound) {
          // move to retention
          hvProgressBar.style.width = "0%";
          startRetentionPhase();
          return;
        } else {
          hvPhaseDirection = "In";
          hvPhaseStart = timestamp;
        }
      }
      showHvBreathCount();
    }

    hvBreathingRafId = requestAnimationFrame(hvBreathingTick);
  }

  function startRetentionPhase() {
    hvState = "retention";
    if (hvBreathingRafId) {
      cancelAnimationFrame(hvBreathingRafId);
      hvBreathingRafId = null;
    }

    hvPhaseTitleEl.textContent = `Round ${hvRoundCurrent} — Retention`;
    hvPhaseSubtitleEl.textContent =
      "Exhale fully and hold on empty lungs. Stay relaxed. When you’re ready to breathe in again, tap End Retention.";
    hvDirectionLabelEl.textContent = "Phase: Retention";
    hvTimerLabelEl.textContent = "Retention (empty hold)";
    hvTimerDisplayEl.textContent = "0.0";
    hvProgressBar.style.width = "0%";

    hvRetentionStartTime = performance.now();
    if (hvTimerIntervalId) clearInterval(hvTimerIntervalId);
    hvTimerIntervalId = setInterval(() => {
      const now = performance.now();
      const seconds = (now - hvRetentionStartTime) / 1000;
      hvTimerDisplayEl.textContent = seconds.toFixed(1);
    }, 100);

    hvEndRetentionBtn.disabled = false;
  }

  function endRetentionPhase() {
    if (hvState !== "retention") return;
    hvEndRetentionBtn.disabled = true;

    if (hvTimerIntervalId) {
      clearInterval(hvTimerIntervalId);
      hvTimerIntervalId = null;
    }

    const now = performance.now();
    const seconds = ((now - hvRetentionStartTime) / 1000).toFixed(1);
    const li = document.createElement("li");
    li.textContent = `Round ${hvRoundCurrent}: ${seconds}s`;
    hvHoldsList.appendChild(li);
    hvHoldsContainer.classList.remove("hidden");

    startInhaleHoldPhase();
  }

  function startInhaleHoldPhase() {
    hvState = "inhale_hold";
    hvTimerRemaining = 20;
    hvTimerDisplayEl.textContent = "20";
    hvTimerLabelEl.textContent = "Big inhale — hold it in";
    hvPhaseTitleEl.textContent = `Round ${hvRoundCurrent} — Inhale Hold`;
    hvPhaseSubtitleEl.textContent =
      "Take one deep inhale, fill your lungs comfortably, and hold for about 20 seconds.";
    hvDirectionLabelEl.textContent = "Phase: Inhale hold";

    if (hvTimerIntervalId) clearInterval(hvTimerIntervalId);
    hvTimerIntervalId = setInterval(() => {
      hvTimerRemaining--;
      if (hvTimerRemaining <= 0) {
        hvTimerDisplayEl.textContent = "0";
        clearInterval(hvTimerIntervalId);
        hvTimerIntervalId = null;
        startExhaleReleasePhase();
      } else {
        hvTimerDisplayEl.textContent = hvTimerRemaining.toString().padStart(2, "0");
      }
    }, 1000);
  }

  function startExhaleReleasePhase() {
    hvState = "exhale_release";
    hvTimerRemaining = 5;
    hvTimerDisplayEl.textContent = "5";
    hvTimerLabelEl.textContent = "Release";
    hvPhaseTitleEl.textContent = `Round ${hvRoundCurrent} — Release`;
    hvPhaseSubtitleEl.textContent =
      "Exhale fully and let your whole body soften. When the countdown ends, the next round will start automatically or the session will finish.";
    hvDirectionLabelEl.textContent = "Phase: Release";

    if (hvTimerIntervalId) clearInterval(hvTimerIntervalId);
    hvTimerIntervalId = setInterval(() => {
      hvTimerRemaining--;
      if (hvTimerRemaining <= 0) {
        hvTimerDisplayEl.textContent = "0";
        clearInterval(hvTimerIntervalId);
        hvTimerIntervalId = null;
        advanceHvRoundOrFinish();
      } else {
        hvTimerDisplayEl.textContent = hvTimerRemaining.toString().padStart(2, "0");
      }
    }, 1000);
  }

  function advanceHvRoundOrFinish() {
    if (!hvRunning) return;
    if (hvRoundCurrent < hvRoundTotal) {
      hvRoundCurrent++;
      startHvBreathingRound();
    } else {
      finishHvSession();
    }
  }

  function finishHvSession() {
    hvRunning = false;
    hvState = "idle";
    if (hvBreathingRafId) cancelAnimationFrame(hvBreathingRafId);
    hvBreathingRafId = null;
    if (hvTimerIntervalId) clearInterval(hvTimerIntervalId);
    hvTimerIntervalId = null;

    hvPhaseTitleEl.textContent = "Session complete";
    hvPhaseSubtitleEl.textContent =
      "Take a moment to notice how you feel. Review your retention times below if you like, then rest.";
    hvDirectionLabelEl.textContent = "Phase: Done";
    hvRoundLabelEl.textContent = `Round: ${hvRoundTotal}/${hvRoundTotal}`;
    hvBreathLabelEl.textContent = "Breath: —";
    hvTimerLabelEl.textContent = "Session";
    hvProgressBar.style.width = "0%";
  }

  startHvBtn.addEventListener("click", hvStart);
  stopHvBtn.addEventListener("click", resetHvUI);
  hvEndRetentionBtn.addEventListener("click", endRetentionPhase);

  hvBreathsSelectEl.addEventListener("change", () => {
    hvBreathsCustomEl.classList.toggle(
      "hidden-input",
      hvBreathsSelectEl.value !== "custom"
    );
  });

  /* --------------------------------------------------------
   * BRAND BAR NAVIGATION
   * ------------------------------------------------------ */

  function showNostrilScreenFor(mode) {
    // stop HV
    resetHvUI();
    hyperScreen.classList.remove("active");
    nostrilScreen.classList.add("active");
    altStop(false);
    setAltMode(mode);
  }

  function showHyperScreen() {
    // stop nostril
    altStop(true);
    nostrilScreen.classList.remove("active");
    hyperScreen.classList.add("active");
    resetHvUI();
  }

  brandItems.forEach((item) => {
    item.addEventListener("click", () => {
      brandItems.forEach((b) => b.classList.remove("active"));
      item.classList.add("active");

      const pattern = item.dataset.pattern;
      if (pattern === "cyclical") {
        showHyperScreen();
      } else if (pattern === "solar") {
        showNostrilScreenFor("right");
      } else if (pattern === "lunar") {
        showNostrilScreenFor("left");
      } else {
        // alternate by default
        showNostrilScreenFor("alternate");
      }
    });
  });

  /* --------------------------------------------------------
   * INITIAL STATE
   * ------------------------------------------------------ */

  setAltMode("alternate");
  resetHvUI();
  nostrilScreen.classList.add("active");
  hyperScreen.classList.remove("active");
});