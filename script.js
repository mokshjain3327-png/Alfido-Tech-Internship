// ── QUESTIONS ──
const questions = [
  {
    cat: "Web Development",
    q: "Which HTML tag is used to link an external CSS file?",
    opts: ["<style>", "<link>", "<script>", "<css>"],
    ans: "<link>"
  },
  {
    cat: "JavaScript",
    q: "Which method adds an element to the END of an array?",
    opts: ["push()", "pop()", "shift()", "append()"],
    ans: "push()"
  },
  {
    cat: "Java",
    q: "Which keyword is used to inherit a class in Java?",
    opts: ["implements", "inherits", "extends", "super"],
    ans: "extends"
  },
  {
    cat: "Databases",
    q: "Which SQL clause is used to filter rows in a query?",
    opts: ["ORDER BY", "GROUP BY", "WHERE", "HAVING"],
    ans: "WHERE"
  },
  {
    cat: "Networking",
    q: "What does VLAN stand for?",
    opts: ["Virtual Local Area Network", "Virtual Long Area Node", "Verified LAN Access", "Variable Link Area Network"],
    ans: "Virtual Local Area Network"
  },
  {
    cat: "Web Development",
    q: "Which CSS property creates space OUTSIDE an element's border?",
    opts: ["padding", "border-spacing", "margin", "gap"],
    ans: "margin"
  },
  {
    cat: "JavaScript",
    q: "What does DOM stand for?",
    opts: ["Document Object Model", "Data Object Management", "Dynamic Object Module", "Document Oriented Method"],
    ans: "Document Object Model"
  },
  {
    cat: "General IT",
    q: "Which of these is a markup language, NOT a programming language?",
    opts: ["Python", "Java", "HTML", "C++"],
    ans: "HTML"
  },
  {
    cat: "Databases",
    q: "Which SQL command retrieves data from a table?",
    opts: ["GET", "FETCH", "SELECT", "PULL"],
    ans: "SELECT"
  },
  {
    cat: "General IT",
    q: "What does CPU stand for?",
    opts: ["Central Processing Unit", "Core Program Utility", "Computer Processing Unit", "Central Program Unit"],
    ans: "Central Processing Unit"
  }
];

const LABELS = ["A", "B", "C", "D"];
const TOTAL_TIME = 15;
const CIRCUMFERENCE = 2 * Math.PI * 20; // r=20 → 125.66

// ── STATE ──
let qIndex    = 0;
let score     = 0;
let correct   = 0;
let wrong     = 0;
let answered  = false;
let timer     = null;
let timeLeft  = TOTAL_TIME;

// ── ELEMENTS ──
const startScreen  = document.getElementById("startScreen");
const quizScreen   = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

const startBtn  = document.getElementById("startBtn");
const nextBtn   = document.getElementById("nextBtn");
const retryBtn  = document.getElementById("retryBtn");

const qNum        = document.getElementById("qNum");
const qCat        = document.getElementById("qCat");
const qText       = document.getElementById("qText");
const optionsGrid = document.getElementById("optionsGrid");
const liveScore   = document.getElementById("liveScore");
const timerNum    = document.getElementById("timerNum");
const timerArc    = document.getElementById("timerArc");
const progressFill= document.getElementById("progressFill");
const feedbackBox = document.getElementById("feedbackBox");
const feedbackMsg = document.getElementById("feedbackMsg");

const finalScore  = document.getElementById("finalScore");
const rEmoji      = document.getElementById("rEmoji");
const rTitle      = document.getElementById("rTitle");
const rMsg        = document.getElementById("rMsg");
const sCorrect    = document.getElementById("sCorrect");
const sWrong      = document.getElementById("sWrong");
const sPct        = document.getElementById("sPct");

// ── HELPERS ──
function showScreen(el) {
  [startScreen, quizScreen, resultScreen].forEach(s => s.classList.remove("active"));
  el.classList.add("active");
}

// ── START ──
startBtn.addEventListener("click", function() {
  qIndex   = 0;
  score    = 0;
  correct  = 0;
  wrong    = 0;
  liveScore.textContent = "0";
  showScreen(quizScreen);
  loadQuestion();
});

// ── LOAD QUESTION ──
function loadQuestion() {
  answered = false;

  var data = questions[qIndex];

  // reset UI
  feedbackBox.style.display = "none";
  feedbackBox.className = "feedback-box";
  nextBtn.style.display = "none";
  optionsGrid.innerHTML = "";

  // fill header
  qNum.textContent  = qIndex + 1;
  qCat.textContent  = data.cat;
  qText.textContent = data.q;

  // progress bar
  progressFill.style.width = (qIndex / questions.length * 100) + "%";

  // build option buttons
  data.opts.forEach(function(opt, i) {
    var btn = document.createElement("button");
    btn.className = "opt";
    btn.innerHTML = '<span class="opt-lbl">' + LABELS[i] + '</span>' + opt;
    btn.addEventListener("click", function() {
      handleAnswer(btn, opt, data.ans);
    });
    optionsGrid.appendChild(btn);
  });

  // start countdown
  startTimer();
}

// ── TIMER ──
function startTimer() {
  clearInterval(timer);
  timeLeft = TOTAL_TIME;
  timerNum.textContent = timeLeft;
  timerArc.style.strokeDashoffset = "0";
  timerArc.classList.remove("danger");

  timer = setInterval(function() {
    timeLeft--;
    timerNum.textContent = timeLeft;

    // shrink arc
    var offset = CIRCUMFERENCE * (1 - timeLeft / TOTAL_TIME);
    timerArc.style.strokeDashoffset = offset;

    if (timeLeft <= 5) {
      timerArc.classList.add("danger");
    }

    if (timeLeft <= 0) {
      clearInterval(timer);
      onTimeUp();
    }
  }, 1000);
}

// ── TIME UP ──
function onTimeUp() {
  if (answered) return;
  answered = true;
  wrong++;
  disableAll();
  markCorrect(questions[qIndex].ans);
  showFeedback(false, "⏰ Time's up! Correct answer highlighted above.");
  nextBtn.style.display = "block";
}

// ── HANDLE ANSWER ──
function handleAnswer(btn, selected, correct_ans) {
  if (answered) return;
  answered = true;
  clearInterval(timer);

  if (selected === correct_ans) {
    score++;
    correct++;
    btn.classList.add("correct");
    liveScore.textContent = score;
    showFeedback(true, "✅ Correct! Great job.");
  } else {
    wrong++;
    btn.classList.add("wrong");
    markCorrect(correct_ans);
    showFeedback(false, "❌ Wrong! The correct answer is highlighted.");
  }

  disableAll();
  nextBtn.style.display = "block";
}

// ── MARK CORRECT ──
function markCorrect(ans) {
  var btns = optionsGrid.querySelectorAll(".opt");
  btns.forEach(function(b) {
    // get text content minus the label letter
    var txt = b.querySelector(".opt-lbl").nextSibling;
    var optText = txt ? txt.textContent.trim() : b.textContent.slice(1).trim();
    if (optText === ans) {
      b.classList.add("correct");
    }
  });
}

// ── DISABLE ALL OPTIONS ──
function disableAll() {
  optionsGrid.querySelectorAll(".opt").forEach(function(b) {
    b.disabled = true;
  });
}

// ── SHOW FEEDBACK ──
function showFeedback(isOk, msg) {
  feedbackBox.style.display = "block";
  feedbackBox.className = "feedback-box " + (isOk ? "ok" : "bad");
  feedbackMsg.textContent = msg;
}

// ── NEXT QUESTION ──
nextBtn.addEventListener("click", function() {
  qIndex++;
  if (qIndex >= questions.length) {
    showResults();
  } else {
    loadQuestion();
  }
});

// ── RESULTS ──
function showResults() {
  clearInterval(timer);
  var pct = Math.round((score / questions.length) * 100);

  finalScore.textContent = score;
  sCorrect.textContent   = correct;
  sWrong.textContent     = wrong;
  sPct.textContent       = pct + "%";

  if (score >= 9) {
    rEmoji.textContent = "🏆"; rTitle.textContent = "Genius!";
    rMsg.textContent = "Nearly perfect! You're a true knowledge powerhouse.";
  } else if (score >= 7) {
    rEmoji.textContent = "🎯"; rTitle.textContent = "Excellent!";
    rMsg.textContent = "Great performance! You really know your IT stuff.";
  } else if (score >= 5) {
    rEmoji.textContent = "👍"; rTitle.textContent = "Good Job!";
    rMsg.textContent = "Solid attempt! A bit more practice and you'll ace it.";
  } else if (score >= 3) {
    rEmoji.textContent = "📚"; rTitle.textContent = "Keep Going!";
    rMsg.textContent = "Not bad for a start. Review the topics and try again!";
  } else {
    rEmoji.textContent = "💪"; rTitle.textContent = "Try Again!";
    rMsg.textContent = "Everyone starts somewhere. Keep learning and go again!";
  }

  showScreen(resultScreen);
}

// ── RETRY ──
retryBtn.addEventListener("click", function() {
  qIndex   = 0;
  score    = 0;
  correct  = 0;
  wrong    = 0;
  liveScore.textContent = "0";
  showScreen(quizScreen);
  loadQuestion();
});
