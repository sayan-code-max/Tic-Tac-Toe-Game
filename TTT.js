console.log("Welcome to Tic Tac Toe Game");

let backgroundMusic = new Audio("GTA.mp3");
let audioTurn = new Audio("mixkit-sci-fi-click-900.wav");
let gameover = new Audio("aaha-tamatar-bade-mazedaar.mp3");
let drawMusic = new Audio("gta-v-death-sound-effect-102.mp3");
let turn = "X";
let isgameover = false;

// Function to change the turn.
const changeTurn = () => {
    return turn === "X" ? "0" : "X";
};

// Function to check for a Win.
const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ];
    wins.forEach(e => {
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== "")) {
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won";
            isgameover = true;
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
            document.querySelector(".line").style.width = "20vw";
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw)rotate(${e[5]}deg)`
        }
    });
};

// Function to check for a Draw.
const checkDraw = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    for (let i = 0; i < boxtext.length; i++) {
        if (boxtext[i].innerText === "") {
            return false;
        }
    }
    return true;
};

// Start background music on button click
document.getElementById("startMusic").addEventListener("click", () => {
    backgroundMusic.play().catch(error => {
        console.log("Error playing background music:", error);
    });
});

// Stop background music on button click
document.getElementById("stopMusic").addEventListener("click", () => {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0; // Reset to the beginning
});

// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (boxtext.innerText === '' && !isgameover) {
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            checkWin();
            if (!isgameover) {
                if (checkDraw()) {
                    document.querySelector('.info').innerText = "Draw";
                    drawMusic.play();
                    isgameover = true;
                    backgroundMusic.pause();
                    backgroundMusic.currentTime = 0;
                } else {
                    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
                }
            } else {
                gameover.play();
                backgroundMusic.pause();
                backgroundMusic.currentTime = 0;
            }
        }
    });
});

// Add onclick listener to reset button
reset.addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = ""
    });
    turn = "X";
    isgameover = false;
    gameover.pause();
    drawMusic.pause();
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px";
    document.querySelector(".line").style.width = "0vw";
});
