document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const playButton = document.getElementById('play');
    const levelSelect = document.getElementById('level-select');
    const returnt = document.getElementById('return');
    const history = [];

    const colors = [
      "red",
      "blue",
      "green",
      "yellow",
      "orange",
      "purple",
      "pink",
      "brown",
      "cyan",
      "magenta",
      "lime",
      "teal",
      "indigo",
      "violet",
      "gold",
      "silver",
      "maroon",
      "navy",
      "olive",
      "coral",
    ];
    const tubes = [];
    let selectedTube = null;
    let levelCount = 1;

    function saveState() {
        history.push(
            tubes.map(tube=>Array.from(tube.children).map(w => w.style.backgroundColor))
        );
    }
    /*/history.push(
        tubes.map(tube=>Array.from(tube.children).map(w => w.style.backgroundColor))
    );/*/

    function chooseLevel(level){
        levelCount = level;
        document.getElementById("level-count").textContent = levelCount;
    }

    levelSelect.addEventListener('change', (event) => {
        const selectedLevel = parseInt(event.target.value, 10);
        chooseLevel(selectedLevel);
    });

    function checkGameState() {
        const allSameColor = (tube) =>{
            const waters = Array.from(tube.children);
            return(
                waters.length === 4 &&
                waters.every(
                    (water) =>
                    water.style.backgroundColor === waters[0].style.backgroundColor
                )
            );
        };

        let completedTubes = 0;
        tubes.forEach((tube) => {
            if (allSameColor(tube)){
                completedTubes++;
            }
        });

        document.getElementById("completed-tubes-count").textContent =
        completedTubes;

        if (
            tubes.every((tube) => tube.childElementCount === 0 || allSameColor(tube))
        ) {
            if (levelCount === 10){
                alert("EFN!");
            } else {
                alert("EFN>ERN");
                levelCount++;
                document.getElementById("level-count").textContent = levelCount;
                document.getElementById("completed-tubes-count").textContent = 0;
                chooseLevel(levelCount);
                createTubes();
                fillTubes();
            }
        }
    }

    function pourWater(fromTube, toTube) {
        saveState();
        let fromWater = fromTube.querySelector(".water:last-child");
        let toWater = toTube.querySelector(".water:last-child");

        if (!toWater) {
            const color = fromWater ? fromWater.style.backgroundColor : null;
            while (
                fromWater &&
                fromWater.style.backgroundColor === color &&
                toTube.childElementCount < 4
            ) {
                toTube.appendChild(fromWater);
                fromWater = fromTube.querySelector(".water:last-child");
            }
        } else {
            while (
                fromWater &&
                fromWater.style.backgroundColor === toWater.style.backgroundColor&&
                toTube.childElementCount < 4
            ) {
                toTube.appendChild(fromWater);
                fromWater = fromTube.querySelector(".water:last-child");
                toWater = toTube.querySelector(".water:last-child");
            }
            
        }
        checkGameState();
    }

    function selectTube(tube) {
        if (selectedTube) {
            if (selectedTube !== tube) {
                pourWater(selectedTube, tube);
            }
            selectedTube.classList.remove("selected");
            selectedTube = null;
        } else {
            selectedTube = tube;
            tube.classList.add("selected");
        }
    }

    function createTubes(){
        history.length = 0;
        gameBoard.innerHTML = "";
        tubes.length = 0;

        for(let i = 0; i < levelCount + 1; i++) {
            const tube = document.createElement("div");
            tube.classList.add ("tube");
            tube.addEventListener("click", () => selectTube(tube));
            gameBoard.appendChild(tube);
            tubes.push(tube);
        }

        for (let i = 0; i < 2; i++){
            const emptyTube = document.createElement("div")
            emptyTube.classList.add ("tube");
            emptyTube.addEventListener("click", () => selectTube(emptyTube));
            gameBoard.appendChild(emptyTube);
            tubes.push(emptyTube);
        }
    }

    function fillTubes() {
        const gameColors = colors.slice (0,Math.min(levelCount+1, colors.length));
        const waterBlocks = [];

        gameColors.forEach((color)=>{
            for (let i = 0; i < 4; i++){
                waterBlocks.push(color);
            }
        });

        waterBlocks.sort(() => 0.5 - Math.random());

        let blockIndex = 0;
        tubes.slice(0, levelCount + 1).forEach((tube)=>{
            for (let i = 0; i < 4; i++) {
                if (blockIndex < waterBlocks.length){
                    const water = document.createElement("div");
                    water.classList.add("water");
                    water.style.backgroundColor = waterBlocks[blockIndex];
                    water.style.height = "20%";
                    tube.appendChild(water);
                    blockIndex++;
                }
            }
        });
    }
    
    playButton.addEventListener('click', () => {
        tubes.length = 0;
        createTubes();
        fillTubes();
    });

    returnt.addEventListener('click', () => {
        if (history.length === 0) return;

        const prevState = history.pop();

        tubes.forEach(tube => tube.innerHTML = '');

        prevState.forEach((tubeState,index)=>{
            tubeState.forEach(color=>{
                const water = document.createElement('div');
                water.classList.add('water')
                water.style.backgroundColor = color;
                water.style.height = '20%';
                tubes[index].appendChild(water)
            })
        });    
    });
});