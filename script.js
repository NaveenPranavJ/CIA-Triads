/* ==========================================
   PART C1.1
   LOGIN • LOGOUT • NAVIGATION
========================================== */

/* ==========================================
   DEMO LOGIN DATA
========================================== */

const a_data = {

    username: "admin+123",

    password: "CIA@2026"

};

/* ==========================================
   DOM ELEMENTS
========================================== */

const loginPage = document.getElementById("loginPage");
const dashboard = document.getElementById("dashboard");

const loginForm = document.getElementById("loginForm");

const username = document.getElementById("username");
const password = document.getElementById("password");

const togglePassword = document.getElementById("togglePassword");

const userDisplay = document.getElementById("userDisplay");

const logout = document.getElementById("logout");

const menuItems = document.querySelectorAll(".menu");

const pages = document.querySelectorAll(".page");

/* ==========================================
   PASSWORD SHOW / HIDE
========================================== */

togglePassword.addEventListener("click", () => {

    if (password.type === "password") {

        password.type = "text";

        togglePassword.classList.remove("fa-eye");
        togglePassword.classList.add("fa-eye-slash");

    } else {

        password.type = "password";

        togglePassword.classList.remove("fa-eye-slash");
        togglePassword.classList.add("fa-eye");

    }

});

/* ==========================================
   LOGIN
========================================== */

loginForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const user = username.value.trim();
    const pass = password.value;

    if (user === "" || pass === "") {

        alert("Please enter username and password.");

        return;

    }

    if (user !== a_data.username || pass !== a_data.password) {

        alert("Invalid Username or Password.");

        return;

    }

    const button = document.querySelector(".login-btn");

    button.disabled = true;

    button.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Logging in...';

    setTimeout(() => {

        userDisplay.textContent = user;

        loginPage.style.opacity = "0";

        loginPage.style.transform = "scale(.95)";

        setTimeout(() => {

            loginPage.style.display = "none";

            dashboard.classList.remove("hidden");

            dashboard.classList.add("fade-in");

        }, 500);

    }, 1200);

});

/* ==========================================
   LOGOUT
========================================== */

logout.addEventListener("click", () => {

    dashboard.classList.add("hidden");

    loginPage.style.display = "flex";

    setTimeout(() => {

        loginPage.style.opacity = "1";

        loginPage.style.transform = "scale(1)";

    }, 100);

    username.value = "";

    password.value = "";

    password.type = "password";

    togglePassword.classList.remove("fa-eye-slash");
    togglePassword.classList.add("fa-eye");

    const button = document.querySelector(".login-btn");

    button.disabled = false;

    button.innerHTML = "LOGIN";

});

/* ==========================================
   SIDEBAR NAVIGATION
========================================== */

menuItems.forEach(item => {

    item.addEventListener("click", () => {

        menuItems.forEach(menu => {

            menu.classList.remove("active");

        });

        item.classList.add("active");

        pages.forEach(page => {

            page.classList.add("hidden");

        });

        const target = item.dataset.page;

        document.getElementById(target).classList.remove("hidden");

        document
            .getElementById(target)
            .classList.add("fade-up");

    });

});

/* ==========================================
   ENTER KEY LOGIN
========================================== */

document.addEventListener("keydown", (e) => {

    if (
        e.key === "Enter" &&
        loginPage.style.display !== "none"
    ) {

        loginForm.requestSubmit();

    }

});
/* ==========================================
   PART C1.2
   CIA TRIAD FUNCTIONALITY
   Confidentiality
   Integrity
   Availability
========================================== */

/* ==========================================
   DOM ELEMENTS
========================================== */

const encryptBtn = document.getElementById("encrypt");
const decryptBtn = document.getElementById("decrypt");

const cipherOutput = document.getElementById("cipherOutput");

const hashInput = document.getElementById("hashInput");
const hashOutput = document.getElementById("hashOutput");

const restartServer = document.getElementById("restartServer");
const serverStatus = document.getElementById("serverStatus");
const serverMessage = document.getElementById("serverMessage");

const analyticsThreats =
document.getElementById("analyticsThreats");

const threatCount =
document.getElementById("threatCount");

const serverCount =
document.getElementById("serverCount");

/* ==========================================
   CONFIDENTIALITY
   BASE64 ENCRYPTION DEMO
========================================== */

let encryptedText = "";

encryptBtn.addEventListener("click", () => {

    const text = hashInput.value.trim();

    if(text === ""){

        alert("Please enter some text first.");

        return;

    }

    encryptedText = btoa(text);

    cipherOutput.textContent = encryptedText;

});

decryptBtn.addEventListener("click", () => {

    if(encryptedText === ""){

        alert("Nothing to decrypt.");

        return;

    }

    try{

        cipherOutput.textContent =
        atob(encryptedText);

    }

    catch(error){

        alert("Unable to decrypt.");

    }

});

/* ==========================================
   INTEGRITY
   SHA-256 HASH
========================================== */

async function generateHash(){

    const message = hashInput.value;

    const encoder = new TextEncoder();

    const data = encoder.encode(message);

    const buffer =
    await crypto.subtle.digest(
        "SHA-256",
        data
    );

    const hashArray =
    Array.from(
        new Uint8Array(buffer)
    );

    const hashHex =
    hashArray
    .map(byte =>
        byte.toString(16)
        .padStart(2,"0")
    )
    .join("");

    hashOutput.textContent = hashHex;

}

hashInput.addEventListener(
    "input",
    generateHash
);

generateHash();

/* ==========================================
   AVAILABILITY
   SERVER RESTART DEMO
========================================== */

restartServer.addEventListener("click", () => {

    serverStatus.innerHTML =
    "🟡 Restarting...";

    serverMessage.innerHTML =
    "Restart in progress...";

    restartServer.disabled = true;

    setTimeout(() => {

        serverStatus.innerHTML =
        "✅ Online";

        serverMessage.innerHTML =
        "Server C successfully restarted.";

        serverCount.textContent = "3";

        restartServer.disabled = false;

    },2000);

});

/* ==========================================
   LIVE THREAT COUNTER
========================================== */

let threats = 1254;

function updateThreatCounter(){

    threats++;

    threatCount.textContent =
    threats.toLocaleString();

    analyticsThreats.textContent =
    threats.toLocaleString();

}

setInterval(
    updateThreatCounter,
    3000
);

/* ==========================================
   DASHBOARD COUNTER ANIMATION
========================================== */

function animateCounter(
    element,
    target,
    duration = 1500
){

    let current = 0;

    const increment =
    target / (duration / 16);

    function update(){

        current += increment;

        if(current >= target){

            element.textContent =
            target.toLocaleString();

            return;

        }

        element.textContent =
        Math.floor(current)
        .toLocaleString();

        requestAnimationFrame(update);

    }

    update();

}

/* ==========================================
   START COUNTERS AFTER LOGIN
========================================== */

loginForm.addEventListener("submit", () => {

    setTimeout(() => {

        animateCounter(
            threatCount,
            threats
        );

        animateCounter(
            analyticsThreats,
            threats
        );

    },1300);

});
/* ==========================================
   PART C2
   UI ENHANCEMENTS & ANIMATIONS
========================================== */

/* ==========================================
   LIVE CLOCK
========================================== */

const header = document.querySelector("header");

if (header) {

    const clock = document.createElement("div");

    clock.id = "liveClock";

    clock.style.color = "#cfd8e3";
    clock.style.fontWeight = "600";
    clock.style.fontSize = "15px";

    header.appendChild(clock);

    function updateClock() {

        const now = new Date();

        clock.textContent =
            now.toLocaleTimeString();

    }

    updateClock();

    setInterval(updateClock,1000);

}

/* ==========================================
   BUTTON RIPPLE EFFECT
========================================== */

document.querySelectorAll("button").forEach(button=>{

    button.addEventListener("click",function(e){

        const ripple=document.createElement("span");

        const size=Math.max(
            this.offsetWidth,
            this.offsetHeight
        );

        ripple.style.position="absolute";
        ripple.style.width=size+"px";
        ripple.style.height=size+"px";
        ripple.style.borderRadius="50%";
        ripple.style.background="rgba(255,255,255,.35)";
        ripple.style.left=
            (e.offsetX-size/2)+"px";
        ripple.style.top=
            (e.offsetY-size/2)+"px";

        ripple.style.transform="scale(0)";
        ripple.style.pointerEvents="none";

        ripple.style.animation=
            "buttonRipple .6s linear";

        this.appendChild(ripple);

        setTimeout(()=>{

            ripple.remove();

        },600);

    });

});

/* ==========================================
   RIPPLE STYLE
========================================== */

const rippleStyle=document.createElement("style");

rippleStyle.innerHTML=`

@keyframes buttonRipple{

0%{

transform:scale(0);

opacity:.8;

}

100%{

transform:scale(4);

opacity:0;

}

}

`;

document.head.appendChild(rippleStyle);

/* ==========================================
   CARD HOVER EFFECT
========================================== */

document.querySelectorAll(".card").forEach(card=>{

    card.addEventListener("mousemove",(e)=>{

        const rect=card.getBoundingClientRect();

        const x=e.clientX-rect.left;
        const y=e.clientY-rect.top;

        const rotateY=
        ((x-rect.width/2)/20);

        const rotateX=
        (-(y-rect.height/2)/20);

        card.style.transform=

        `perspective(900px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-8px)`;

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="";

    });

});

/* ==========================================
   FLOATING BACKGROUND PARALLAX
========================================== */

const blobs=
document.querySelectorAll(".background span");

document.addEventListener("mousemove",(e)=>{

    const x=
    (window.innerWidth/2-e.clientX)/50;

    const y=
    (window.innerHeight/2-e.clientY)/50;

    blobs.forEach((blob,index)=>{

        blob.style.transform=

        `translate(
            ${x*(index+1)}px,
            ${y*(index+1)}px
        )`;

    });

});

/* ==========================================
   CIA INFORMATION
========================================== */

const messages={

Confidentiality:
"Confidentiality protects sensitive information by using authentication, authorization and encryption.",

Integrity:
"Integrity ensures information remains accurate, complete and unaltered using hashing and validation.",

Availability:
"Availability ensures systems and data remain accessible through redundancy, monitoring and recovery."

};

document.querySelectorAll(".card button")

.forEach(button=>{

button.addEventListener("click",()=>{

const title=

button.parentElement
.querySelector("h2")
.textContent;

alert(messages[title]);

});

});

/* ==========================================
   PAGE TRANSITION
========================================== */

document.querySelectorAll(".menu")

.forEach(menu=>{

menu.addEventListener("click",()=>{

const visible=

document.querySelector(".page:not(.hidden)");

if(visible){

visible.classList.remove("fade-up");

void visible.offsetWidth;

visible.classList.add("fade-up");

}

});

});

/* ==========================================
   PROFILE ANIMATION
========================================== */

const profile=document.querySelector(".profile");

if(profile){

profile.addEventListener("mouseenter",()=>{

profile.style.boxShadow=

"0 0 30px rgba(0,212,255,.5)";

});

profile.addEventListener("mouseleave",()=>{

profile.style.boxShadow="";

});

}

/* ==========================================
   LOGIN INPUT FOCUS EFFECT
========================================== */

document
.querySelectorAll("input,textarea")

.forEach(input=>{

input.addEventListener("focus",()=>{

input.style.transform="scale(1.02)";

});

input.addEventListener("blur",()=>{

input.style.transform="scale(1)";

});

});

/* ==========================================
   RANDOM ANALYTICS UPDATE
========================================== */

const uptime=document.querySelectorAll(".stat h1");

setInterval(()=>{

if(uptime.length>1){

const value=

(99.8+Math.random()*0.2)

.toFixed(2);

uptime[1].textContent=value+"%";

}

},5000);

/* ==========================================
   STARTUP MESSAGE
========================================== */

window.addEventListener("load",()=>{

console.log(

"CIA Triad Demo Loaded Successfully."

);

});