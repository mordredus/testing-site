/* =====================================================
   AEROMED // SYSTEM JAVASCRIPT
===================================================== */


/* ================================
   LIVE CLOCK
================================ */

const clock = document.getElementById("clock");

function updateClock() {

    const now = new Date();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    clock.textContent = `${hours}:${minutes}:${seconds}`;
}

updateClock();

setInterval(updateClock, 1000);


/* ================================
   SYSTEM STATUS
================================ */

const systemStatus = document.getElementById("systemStatus");

let systemOK = true;

systemStatus.addEventListener("click", () => {

    systemOK = !systemOK;

    if (systemOK) {

        systemStatus.innerHTML = `
            <span class="status-light"></span>
            SYSTEM NOMINAL
        `;

    } else {

        systemStatus.innerHTML = `
            <span class="status-light"></span>
            DIAGNOSTIC MODE
        `;
    }
});


/* ================================
   ANALOG GAUGE
================================ */

const needle = document.getElementById("needle");
const altitude = document.getElementById("altitude");

let currentAltitude = 8742;

function randomAltitude() {

    const change =
        Math.floor(Math.random() * 500) - 250;

    currentAltitude += change;

    if (currentAltitude < 0) {
        currentAltitude = 0;
    }

    if (currentAltitude > 12000) {
        currentAltitude = 12000;
    }

    altitude.textContent =
        currentAltitude.toLocaleString("en-US");

    const percentage =
        currentAltitude / 12000;

    const rotation =
        -110 + percentage * 220;

    needle.style.transform =
        `translate(-50%, -100%) rotate(${rotation}deg)`;
}

randomAltitude();

setInterval(randomAltitude, 3500);


/* ================================
   LIVE MEDICAL DATA
================================ */

const pressure = document.getElementById("pressure");
const oxygen = document.getElementById("oxygen");
const pulse = document.getElementById("pulse");

function updateVitals() {

    const newPressure =
        Math.floor(735 + Math.random() * 18);

    const newOxygen =
        (97.8 + Math.random() * 1.1).toFixed(1);

    const newPulse =
        Math.floor(68 + Math.random() * 9);

    pressure.textContent =
        `${newPressure} MMHG`;

    oxygen.textContent =
        `${newOxygen}%`;

    pulse.textContent =
        `${String(newPulse).padStart(3, "0")} BPM`;
}

setInterval(updateVitals, 4000);


/* ================================
   MODAL SYSTEM
================================ */

const modal = document.getElementById("modal");
const modalClose = document.getElementById("modalClose");

const recordButton =
    document.getElementById("recordButton");

const flightButton =
    document.getElementById("flightButton");

const modalTitle =
    document.getElementById("modalTitle");

const modalLabel =
    document.getElementById("modalLabel");

const modalText =
    document.getElementById("modalText");


function openModal(title, label, text) {

    modalTitle.textContent = title;

    modalLabel.textContent = label;

    modalText.textContent = text;

    modal.classList.add("active");

    document.body.style.overflow = "hidden";
}


function closeModal() {

    modal.classList.remove("active");

    document.body.style.overflow = "";
}


recordButton.addEventListener("click", () => {

    openModal(
        "CASE FILE 00481",
        "MEDICAL ARCHIVE // CLASSIFIED",
        "Patient telemetry indicates stable physiological conditions throughout the recorded flight interval. Atmospheric pressure remained within the expected operational range. Further observation recommended."
    );

});


flightButton.addEventListener("click", () => {

    openModal(
        "FLIGHT TELEMETRY",
        "AERONAUTICAL DATA // MED-04",
        "Current flight profile indicates an altitude of approximately 8,742 feet. Cabin pressure remains nominal. Oxygen saturation is within the recorded operational parameters."
    );

});


modalClose.addEventListener("click", closeModal);


/* Click outside modal */

modal.addEventListener("click", (event) => {

    if (event.target === modal) {
        closeModal();
    }

});


/* Escape key */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        closeModal();
    }

    if (
        event.key.toLowerCase() === "r" &&
        !modal.classList.contains("active")
    ) {
        recordButton.click();
    }

    if (
        event.key.toLowerCase() === "f" &&
        !modal.classList.contains("active")
    ) {
        flightButton.click();
    }

});


/* ================================
   ARCHIVE NOTES
================================ */

const notes =
    document.querySelectorAll(".note");

notes.forEach(note => {

    note.addEventListener("click", () => {

        const title =
            note.dataset.note;

        openModal(
            title,
            "ARCHIVAL FIELD NOTE",
            `Archive entry ${title} has been retrieved from the AEROMEDICAL database. This document contains historical observations, technical annotations, and supplementary flight research data.`
        );

    });

});


/* ================================
   CRT TERMINAL
================================ */

const terminal =
    document.getElementById("terminal");

const terminalLines = [
    "> BOOTING AEROMED OS...",
    "> CONNECTING TO FLIGHT ARRAY...",
    "> CALIBRATING MEDICAL SENSORS...",
    "> CHECKING AIR PRESSURE........ OK",
    "> CHECKING OXYGEN.............. OK",
    "> CHECKING CARDIAC ARRAY....... OK",
    "> CHECKING TELEMETRY........... OK",
    ">",
    "> ALL SYSTEMS OPERATIONAL",
    ">",
    "> AWAITING INPUT_"
];

function runTerminal() {

    terminal.innerHTML = "";

    let lineIndex = 0;

    function nextLine() {

        if (lineIndex >= terminalLines.length) {
            return;
        }

        const line =
            document.createElement("span");

        line.textContent =
            terminalLines[lineIndex];

        if (
            terminalLines[lineIndex]
                .includes("ALL SYSTEMS")
        ) {
            line.classList.add("terminal-highlight");
        }

        terminal.appendChild(line);

        lineIndex++;

        setTimeout(nextLine, 300);
    }

    nextLine();
}

runTerminal();


/* Re-run terminal when clicked */

terminal.addEventListener("click", runTerminal);
