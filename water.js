document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const playButton = document.getElementById('play');
    const levelSelect = document.getElementById('level-select');

    const tubes = [];
    let levelCount = 1;

    levelSelect.addEventListener('change', (event) => {
        const selectLevel = parseInt(event.target.value)
        levelCount
    });

    playButton.addEventListener('click', () => {
        tubes.length = 0;
        createTubes();
    });

    function createTubes() {
        gameBoard.innerHTML = "";
        for (let i = 1; i < levelCount + 1; i++) {
            const tube = document.createElement('div');
            tube.classList.add('tube');
            gameBoard.appendChild(tube);
            tubes.push(tube);
        }
    }
});