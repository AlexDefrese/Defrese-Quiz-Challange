const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalscore');
// gets score from local storage
const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScores = JSON.parse(localStorage.getItem("highScores",)) || [];
finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () =>{
    // disable save button if empty
saveScoreBtn.disabled = !username.value;
});


saveHighScore = (e) => {
    // prevents default form behavior
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    };
    // adds high score to array
    highScores.push(score);
    console.log(highScores);
}