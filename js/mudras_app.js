

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