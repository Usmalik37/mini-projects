// ── selectors ──
const cells = document.querySelectorAll('.cell');
const statusEl = document.getElementById('status');
const pScoreEl = document.getElementById('p-score');
const aScoreEl = document.getElementById('a-score');
const roundEl = document.getElementById('round');
const toggleBtn = document.getElementById('toggle');
const endBtn = document.getElementById('end-btn');
const nextBtn = document.getElementById('next-btn');
const overlay = document.getElementById('overlay');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');

// ── state ──
const WINS = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

let board, playerTurn, locked, score;

function initScore() {
  score = { player: 0, algo: 0, round: 1 };
}

function initBoard() {
  board = Array(9).fill('');
  playerTurn = true;
  locked = false;
  cells.forEach(c => {
    c.textContent = '';
    c.className = 'cell';
  });
  updateStatus('YOUR TURN');
}

// ── rendering ──
function updateStatus(msg) { statusEl.textContent = msg; }

function updateScoreboard() {
  pScoreEl.textContent = score.player;
  aScoreEl.textContent = score.algo;
  roundEl.textContent = score.round;
}

function renderCell(i, mark) {
  board[i] = mark;
  cells[i].textContent = mark.toUpperCase();
  cells[i].classList.add('taken', mark);
}

function highlightWin(combo) {
  combo.forEach(i => cells[i].classList.add('win'));
}

// ── win check ──
function checkWinner(b, mark) {
  return WINS.find(combo => combo.every(i => b[i] === mark)) || null;
}

function isDraw(b) { return b.every(v => v !== ''); }

// ── minimax ──
function minimax(b, isMax) {
  if (checkWinner(b, 'o')) return 10;
  if (checkWinner(b, 'x')) return -10;
  if (isDraw(b)) return 0;

  let best = isMax ? -Infinity : Infinity;

  for (let i = 0; i < 9; i++) {
    if (b[i] !== '') continue;
    b[i] = isMax ? 'o' : 'x';
    const val = minimax(b, !isMax);
    b[i] = '';
    best = isMax ? Math.max(best, val) : Math.min(best, val);
  }
  return best;
}

function bestMove(b) {
  let best = -Infinity, move = -1;
  for (let i = 0; i < 9; i++) {
    if (b[i] !== '') continue;
    b[i] = 'o';
    const val = minimax(b, false);
    b[i] = '';
    if (val > best) { best = val; move = i; }
  }
  return move;
}

// ── round end ──
function endRound(result) {
  locked = true;

  if (result === 'player') {
    score.player++;
    updateStatus('YOU WIN THIS ROUND');
  } else if (result === 'algo') {
    score.algo++;
    updateStatus('ALGO WINS THIS ROUND');
  } else {
    updateStatus('DRAW');
  }

  score.round++;
  updateScoreboard();
}

// ── algo turn ──
function algoTurn() {
  if (locked) return;
  updateStatus('ALGO THINKING...');

  setTimeout(() => {
    const move = bestMove([...board]);
    renderCell(move, 'o');

    const win = checkWinner(board, 'o');
    if (win) { highlightWin(win); endRound('algo'); return; }
    if (isDraw(board)) { endRound('draw'); return; }

    playerTurn = true;
    updateStatus('YOUR TURN');
  }, 350);
}

// ── player turn ──
function handleCell(e) {
  const i = +e.target.dataset.i;
  if (!playerTurn || locked || board[i] !== '') return;

  renderCell(i, 'x');

  const win = checkWinner(board, 'x');
  if (win) { highlightWin(win); endRound('player'); return; }
  if (isDraw(board)) { endRound('draw'); return; }

  playerTurn = false;
  algoTurn();
}

// ── end game modal ──
function showEndModal() {
  locked = true;
  const rounds = score.round - 1;
  let result;
  if (score.player > score.algo) result = 'YOU WIN 🎉';
  else if (score.algo > score.player) result = 'ALGO WINS';
  else result = "IT'S A DRAW";

  modalTitle.textContent = result;
  modalBody.textContent =
    `You: ${score.player} - Algo: ${score.algo}  -  Rounds: ${rounds}`;
  overlay.classList.add('show');
}

// ── dark mode ──
const storedTheme = localStorage.getItem('theme');
if (storedTheme) {
  document.body.classList.add(storedTheme);
  toggleBtn.textContent = 'LIGHT';
}

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const dark = document.body.classList.contains('dark-mode');
  localStorage.setItem('theme', dark ? 'dark-mode' : '');
  toggleBtn.textContent = dark ? 'LIGHT' : 'DARK';
});

// ── events ──
cells.forEach(c => c.addEventListener('click', handleCell));

nextBtn.addEventListener('click', initBoard);

endBtn.addEventListener('click', showEndModal);

modalClose.addEventListener('click', () => {
  overlay.classList.remove('show');
  initScore();
  initBoard();
  updateScoreboard();
});

// ── start ──
initScore();
initBoard();
updateScoreboard();