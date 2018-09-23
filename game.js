'use strict'
var gNum = 1;
var gSecond = 0;
var changeText;
var isGameOn = true;
var gEnemies = createEnemies(gNum)

var hero = {
    top: 500,
    left: 190
};

var misiiles = [];

function counterSecondes() {
    var elChange = document.querySelector('.change');
    elChange.textContent = 'Two missiles each!'
    if (gSecond === 4) {
        elChange.textContent = ''
        clearInterval(changeText)
    }
    console.log(gSecond++);
}



function createEnemies(num) {
    var left = 100;
    var top = 100;
    var power = 100;
    var enmies = [];
    for (var i = 0; i < num; i++) {
        if (i % 4 === 0 && i !== 0) {
            top += 100
            left = 100
        }
        enmies.push({
            left: left,
            top: top,
            power: power
        });
        left += 50;
    }
    return enmies
}

function moveLeft() {
    if (isGameOn) {
        var canMove = true;
        if (hero.left < 20) {
            canMove = false
        }
        if (canMove) {
            var elHero = document.getElementById('hero');
            hero.left = hero.left - 10;
            elHero.style.left = hero.left + 'px'
        }
    }
}

function moveRight() {
    if (isGameOn) {
        var canMove = true;
        if (hero.left >= 385) {
            canMove = false
        }
        if (canMove) {
            var elHero = document.getElementById('hero');
            hero.left = hero.left + 10;
            elHero.style.left = hero.left + 'px'
        }
    }
}

function move(e) {
    if (e.keyCode === 37) {
        moveLeft()
    } else if (e.keyCode === 39) {
        moveRight()
    } else if (e.keyCode === 32) {
        if (isGameOn) {
            createMisiiles()
        }
    }
}

function createMisiiles() {
    misiiles.push({
        left: hero.left,
        top: hero.top - 10
    })
}

function drawMissiles() {
    var elMissile = document.querySelector('#missiles');
    elMissile.innerHTML = "";
    for (var i = 0; i < misiiles.length; i++) {
        elMissile.innerHTML += "<div class = 'missile' style='left:" + misiiles[i].left +
            "px; top:" + misiiles[i].top + "px'></div>"
    }
}

function drawEnemies() {
    var elMissile = document.querySelector('#enemies');
    elMissile.innerHTML = "";
    for (var i = 0; i < gEnemies.length; i++) {
        elMissile.innerHTML += "<div class = 'enemy' style='left:" + gEnemies[i].left +
            "px; top:" + gEnemies[i].top + "px'></div>"
    }
}

function moveEnemies() {
    for (var i = 0; i < gEnemies.length; i++) {
        gEnemies[i].top = gEnemies[i].top + 5;
    }
}

function moveMissiles() {
    for (var i = 0; i < misiiles.length; i++) {
        misiiles[i].top = misiiles[i].top - 5;
    }
}


function collisionDetection() {
    var elEnemie = document.querySelectorAll('.enemy');
    var elScore = document.querySelector('.current-score')
    if (isGameOn) {
        for (var i = 0; i < gEnemies.length; i++) {
            for (var j = 0; j < misiiles.length; j++) {
                if (
                    (misiiles[j].top <= gEnemies[i].top + 30) && //the top of the misiiles need to get to bottom of enimies
                    (misiiles[j].top >= gEnemies[i].top) &&  //at smae time the top of the missile need to be below of top enemies
                    (misiiles[j].left >= gEnemies[i].left) &&
                    (misiiles[j].left <= gEnemies[i].left + 30)
                ) {
                    if (gNum > 4) {
                        gEnemies[i].power = gEnemies[i].power - 50;
                        misiiles.splice(j, 1);
                        if (gEnemies[i].power === 0) {
                            elScore.innerHTML++
                            gEnemies.splice(i, 1)
                        }
                    } else {
                        elScore.innerHTML++
                        gEnemies.splice(i, 1)
                        misiiles.splice(j, 1)
                    }

                    if (+elScore.innerHTML === 9) {
                        // appearTextChangeGame()
                        changeText = setInterval(counterSecondes, 1000)
                    }
                    else {
                        // disappearText()
                    }

                    console.log('hit');
                    if (gEnemies.length === 0) {
                        misiiles = []
                        gNum++
                        gEnemies = createEnemies(gNum)
                        console.log(gEnemies);
                    }

                    break;
                }
            }
        }
    }
}



function appearTextChangeGame() {
    var elChange = document.querySelector('.change');
    elChange.textContent = 'Two missiles each!'
    console.log(gNum);
}

function disappearText() {
    var elChange = document.querySelector('.change');
    elChange.textContent = ''

}

function increaseWidth() {
    var elEnemie = document.querySelectorAll('.enemy');
    if (gNum > 1) {
        for (var i = 0; i < gEnemies.length; i++) {
            elEnemie[i].style.height = 10 + 'px'
        }
    }
    for (var i = 0; i < gEnemies.length; i++) {
        for (var j = 0; j < misiiles.length; j++) {
            if (
                (misiiles[j].top <= gEnemies[i].top + 300) && //the top of the misiiles need to get to bottom of enimies
                (misiiles[j].top >= gEnemies[i].top) &&  //at smae time the top of the missile need to be below of top enemies
                (misiiles[j].left >= gEnemies[i].left) &&
                (misiiles[j].left <= gEnemies[i].left + 30)
            ) {

            }
        }
    }
}


function checkGameOver() {
    var elRes = document.querySelector('.res');
    var elScore = document.querySelector('.current-score')
    for (var i = 0; i < gEnemies.length; i++) {
        if (gEnemies[i].top >= 470) {
            isGameOn = false;
        }
    }
    if (+elScore.innerHTML === 80) {
        isGameOn = false;
        elRes.textContent = 'Well done!'
        gEnemies = createEnemies(0);
        misiiles = []
    }
}

console.log(gEnemies);

function gameLoop() {
    if (isGameOn) {
        setTimeout(gameLoop, 10);
        moveMissiles()
        drawMissiles()
        collisionDetection()
    }
}

function moveLoop() {
    if (isGameOn) {
        setTimeout(moveLoop, 150);
        checkGameOver()
        moveEnemies()
        drawEnemies()
    }
}
gameLoop()
moveLoop()



