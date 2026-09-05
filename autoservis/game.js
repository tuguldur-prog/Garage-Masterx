const shopBtn = document.getElementById("shopBtn");
const shopPopup = document.getElementById("shopPopup");
const closeBtn = document.getElementById("closeBtn");

const messagePopup = document.getElementById("messagePopup");
const messageText = document.getElementById("messageText");
const messageClose = document.getElementById("messageClose");

function showMessage(message) {
    messageText.textContent = message;
    messagePopup.style.display = "block";
}

messageClose.addEventListener("click", () => {
    messagePopup.style.display = "none";
});

if (shopBtn && shopPopup && closeBtn) {
    shopBtn.addEventListener("click", () => {
        shopPopup.style.display = "block";
    });

    closeBtn.addEventListener("click", () => {
        shopPopup.style.display = "none";
    });
}

const car = document.getElementById("car");
const emptyText = document.getElementById("emptyText");
const jobText = document.getElementById("jobText");

setTimeout(() => {
    emptyText.style.display = "none";
    car.classList.add("arrive");
}, 2000);

function carArrive() {
    emptyText.style.display = "none";
    car.classList.add("arrive");

    fixBtn.style.display = "inline-block";

    currentProblem = randomProblem();

    jobText.textContent = currentProblem.name;
} 

let money = 500;
let oil = 0;
let tire = 0;
let battery = 0;
const moneyText = document.getElementById("money");

const fixBtn = document.getElementById("fixBtn");

function carLeave() {
    car.classList.remove("arrive");
    fixBtn.style.display = "none";

    jobText.textContent = "";

    setTimeout(() => {
        emptyText.style.display = "block";
    }, 2000);
}

setTimeout(carArrive, 2000);

fixBtn.addEventListener("click", () => {

    carLeave();
    setTimeout(carArrive, 4000);


    if (!currentProblem) {
        return;
    }

    // OLEJ
    if (currentProblem.type === "oil") {

        if (oil <= 0) {
            showMessage("🛢️ You don't have a oil!");
            return;
        }

        oil--;
        oilCount.textContent = oil;
    }

    // PNEUMATIKA
    else if (currentProblem.type === "tire") {

        if (tire <= 0) {
            showMessage("🛞 You don't have a tire!");
            return;
        }

        tire--;
        tireCount.textContent = tire;
    }

    // BATERIE
    else if (currentProblem.type === "battery") {

        if (battery <= 0) {
            showMessage("🔋 You don't have a battery!");
            return;
        }

        battery--;
        batteryCount.textContent = battery;
    }

    // OPRAVA SE PODAŘILA
    money += currentProblem.reward;

    moneyText.textContent = `💰 Money: ${money}$`;

    showMessage("✅ Car repaired!");

    carLeave();

    setTimeout(carArrive, 4000);
});

const problem = document.getElementById("problem");

const problems = [
    {
        type: "oil",
        name: "🛢️ Oil Change",
        reward: 200
    },
    {
        type: "tire",
        name: "🛞 Flat Tire",
        reward: 250
    },
    {
        type: "battery",
        name: "🔋 Battery Problem",
        reward: 450
    }
];

function randomProblem() {
    const random = Math.floor(Math.random() * problems.length);

    return problems[random];
}

const oilCount = document.getElementById("oilCount");
const buyOil = document.getElementById("buyOil");

const tireCount = document.getElementById("tireCount");
const buyTire = document.getElementById("buyTire");

const batteryCount = document.getElementById("batteryCount");
const buyBattery = document.getElementById("buyBattery");



buyOil.addEventListener("click", () => {
    if (money >= 150) {
        money -= 150;
        oil++;

        moneyText.textContent = `💰 Money: ${money}$`;
        oilCount.textContent = oil;
     }  else {
        showMessage("Not enough money!");
    }
});


buyTire.addEventListener("click", () => {
    if (money >= 200) {
        money -= 200;
        tire++;

        moneyText.textContent = `💰 Money: ${money}$`;
        tireCount.textContent = tire;
    } else {
        showMessage("Not enough money!");
    }
});


buyBattery.addEventListener("click", () => {
    if (money >= 400) {
        money -= 400;
        battery++;

        moneyText.textContent = `💰 Money: ${money}$`;
        batteryCount.textContent = battery;
    } else {
        showMessage("Not enough money!");
    }
});

const player = document.getElementById("player");

let playerX = 350;
let playerY = 350;

const playerSpeed = 5;

const keys = {};

document.addEventListener("keydown", (event) => {
    keys[event.key.toLowerCase()] = true;
});

document.addEventListener("keyup", (event) => {
    keys[event.key.toLowerCase()] = false;
});

function movePlayer(){

    if (keys["w"] || keys["arrowup"]) {
        playerY -= playerSpeed;
    }

    if (keys["s"] || keys["arrowdown"]) {
        playerY += playerSpeed;
    }

    if (keys["a"] || keys["arrowleft"]) {
        playerX -= playerSpeed;
    }

    if (keys["d"] || keys["arrowright"]) {
        playerX += playerSpeed;
    }

    player.style.left = playerX + "px";
    player.style.top = playerY + "px";

    requestAnimationFrame(movePlayer);
}
 
movePlayer();