const pig = document.getElementById("pig");
const scoretxt = document.getElementById("score");
let score
function click() {
  score++
  scoretxt.textContent = score;
}
