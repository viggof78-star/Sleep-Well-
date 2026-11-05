const sounds = {
    rain: {
        name: "เสียงฝนตก",
        file: "assets/sounds/rain.mp3"
    },
    ocean: {
        name: "เสียงคลื่นทะเล",
        file: "assets/sounds/ocean.mp3"
    },
    forest: {
        name: "เสียงป่า",
        file: "assets/sounds/forest.mp3"
    },
    fireplace: {
        name: "เสียงเตาผิง",
        file: "assets/sounds/fireplace.mp3"
    }
};

let audio = new Audio();
let selectedSound = null;
let timer = null;

audio.loop = true;

const currentSound = document.getElementById("currentSound");
const timerDisplay = document.getElementById("timerDisplay");
const playBtn = document.getElementById("playBtn");
const stopBtn = document.getElementById("stopBtn");
const startBtn = document.getElementById("startBtn");

function selectSound(type) {
    if (!sounds[type]) return;

    selectedSound = type;

    audio.pause();
    audio.currentTime = 0;

    audio.src = sounds[type].file;

    currentSound.textContent = sounds[type].name;

    document.querySelectorAll(".sound-card").forEach(card => {
        card.style.borderColor =
            card.dataset.sound === type ? "#8daeff" : "#293e60";
    });

    playSound();
}

function playSound() {
    if (!selectedSound) {
        currentSound.textContent = "กรุณาเลือกเสียงก่อน";
        return;
    }

    audio.play()
        .then(() => {
            playBtn.textContent = "Ⅱ";
        })
        .catch(() => {
            currentSound.textContent =
                "ไม่พบไฟล์เสียง กรุณาเพิ่มไฟล์เสียงก่อน";
        });
}

function pauseSound() {
    audio.pause();
    playBtn.textContent = "▶";
}

function stopSound() {
    audio.pause();
    audio.currentTime = 0;

    playBtn.textContent = "▶";

    if (timer) {
        clearTimeout(timer);
        timer = null;
    }

    timerDisplay.textContent = "หยุดเล่นแล้ว";
}

function setTimer(minutes) {
    if (timer) {
        clearTimeout(timer);
    }

    const milliseconds = minutes * 60 * 1000;

    timerDisplay.textContent =
        `ตั้งเวลาปิดเสียง ${minutes} นาทีแล้ว`;

    timer = setTimeout(() => {
        stopSound();
        timerDisplay.textContent = "หมดเวลาแล้ว ฝันดีนะ 🌙";
    }, milliseconds);
}

document.querySelectorAll(".sound-card").forEach(card => {
    card.addEventListener("click", () => {
        selectSound(card.dataset.sound);
    });
});

playBtn.addEventListener("click", () => {
    if (audio.paused) {
        playSound();
    } else {
        pauseSound();
    }
});

stopBtn.addEventListener("click", stopSound);

startBtn.addEventListener("click", () => {
    if (!selectedSound) {
        selectSound("rain");
    } else {
        playSound();
    }
});

document.querySelectorAll(".timer-btn").forEach(button => {
    button.addEventListener("click", () => {
        setTimer(Number(button.dataset.time));
    });
});
