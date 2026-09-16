

const video = document.querySelector("#backgroundVideo");
const soundToggle = document.querySelector("#soundToggle");
const playToggle = document.querySelector("#playToggle");
const shuffleToggle = document.querySelector("#shuffleToggle");

const year = document.querySelector("#year");

const avatar = document.querySelector("#discordAvatar");
const profileCard = document.querySelector("#profileCard");
const profilePage = document.querySelector(".profile-page");

const profileName = document.querySelector("#profileName");
const discordUsername = document.querySelector("#discordUsername");


// ==========================================
// CLIENT DISCORD DETAILS
// ==========================================

const DISCORD_USER_ID = "502469831346487305";

const DISCORD_USERNAME = "saravananpal931";


// ==========================================
// YEAR
// ==========================================

if (year) {
  year.textContent = new Date().getFullYear();
}


// ==========================================
// VIDEO AUTOPLAY
// ==========================================

if (video) {

  video.muted = true;

  video.autoplay = true;

  video.loop = true;

  video.playsInline = true;

  video.play().catch(() => {});

}


// ==========================================
// VOLUME CONTROL
// ==========================================

if (soundToggle && video) {

  soundToggle.addEventListener("click", async () => {

    video.muted = !video.muted;

    if (!video.muted) {

      try {
        await video.play();
      } catch (_) {}

    }

    updateSoundButton();

  });

}


function updateSoundButton() {

  if (!soundToggle || !video) return;

  soundToggle.innerHTML = video.muted
    ? '<i class="fa-solid fa-volume-xmark"></i>'
    : '<i class="fa-solid fa-volume-high"></i>';

  soundToggle.setAttribute(
    "aria-label",
    video.muted
      ? "Turn video sound on"
      : "Turn video sound off"
  );

}


// ==========================================
// PLAY / PAUSE
// ==========================================

if (playToggle && video) {

  playToggle.addEventListener("click", () => {

    if (video.paused) {

      video.play().catch(() => {});

      playToggle.innerHTML =
        '<i class="fa-solid fa-pause"></i>';

      playToggle.setAttribute(
        "aria-label",
        "Pause video"
      );

    } else {

      video.pause();

      playToggle.innerHTML =
        '<i class="fa-solid fa-play"></i>';

      playToggle.setAttribute(
        "aria-label",
        "Play video"
      );

    }

  });

}


// Keep button synchronized if video is controlled elsewhere.

if (video) {

  video.addEventListener("play", () => {

    if (!playToggle) return;

    playToggle.innerHTML =
      '<i class="fa-solid fa-pause"></i>';

    playToggle.setAttribute(
      "aria-label",
      "Pause video"
    );

  });


  video.addEventListener("pause", () => {

    if (!playToggle) return;

    playToggle.innerHTML =
      '<i class="fa-solid fa-play"></i>';

    playToggle.setAttribute(
      "aria-label",
      "Play video"
    );

  });

}


// ==========================================
// MOUSE FOLLOW 3D EFFECT
// ==========================================

let targetX = 0;
let targetY = 0;

let currentX = 0;
let currentY = 0;

const isTouchDevice =
  window.matchMedia("(pointer: coarse)").matches;


if (
  profilePage &&
  profileCard &&
  !isTouchDevice &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {

  profilePage.addEventListener("mousemove", (event) => {

    const x =
      event.clientX / window.innerWidth;

    const y =
      event.clientY / window.innerHeight;


    /*
      Convert mouse position into
      -1 to +1
    */

    targetX = (x - 0.5) * 2;

    targetY = (y - 0.5) * 2;


    /*
      Card shine position
    */

    const rect =
      profileCard.getBoundingClientRect();

    const mouseX =
      event.clientX - rect.left;

    const mouseY =
      event.clientY - rect.top;

    profileCard.style.setProperty(
      "--mouse-x",
      `${mouseX}px`
    );

    profileCard.style.setProperty(
      "--mouse-y",
      `${mouseY}px`
    );

  });


  profilePage.addEventListener("mouseleave", () => {

    targetX = 0;
    targetY = 0;

    profileCard.style.setProperty(
      "--mouse-x",
      "50%"
    );

    profileCard.style.setProperty(
      "--mouse-y",
      "30%"
    );

  });


  function animateCard() {

    currentX +=
      (targetX - currentX) * 0.08;

    currentY +=
      (targetY - currentY) * 0.08;


    /*
      Maximum rotation:
      X = up/down
      Y = left/right
    */

    const rotateY =
      currentX * 7;

    const rotateX =
      currentY * -7;


    const moveX =
      currentX * 3;

    const moveY =
      currentY * 3;


    profileCard.style.transform = `
      translate3d(${moveX}px, ${moveY}px, 0)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
    `;


    requestAnimationFrame(animateCard);

  }


  animateCard();

}


// ==========================================
// MOBILE TOUCH EFFECT
// ==========================================

if (
  profileCard &&
  isTouchDevice &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {

  let touchStartX = 0;
  let touchStartY = 0;

  profilePage.addEventListener(
    "touchstart",
    (event) => {

      const touch =
        event.touches[0];

      touchStartX =
        touch.clientX;

      touchStartY =
        touch.clientY;

    },
    { passive: true }
  );


  profilePage.addEventListener(
    "touchmove",
    (event) => {

      const touch =
        event.touches[0];

      const deltaX =
        touch.clientX - touchStartX;

      const deltaY =
        touch.clientY - touchStartY;


      const rotateY =
        Math.max(
          -5,
          Math.min(5, deltaX * 0.05)
        );

      const rotateX =
        Math.max(
          -5,
          Math.min(5, deltaY * -0.05)
        );


      profileCard.style.transform = `
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
      `;

    },
    { passive: true }
  );


  profilePage.addEventListener(
    "touchend",
    () => {

      profileCard.style.transform =
        "rotateX(0deg) rotateY(0deg)";

    }
  );

}


// ==========================================
// RESHUFFLE EFFECT
// ==========================================

if (shuffleToggle) {

  shuffleToggle.addEventListener("click", () => {

    /*
      Random visual rotation
    */

    const randomRotation =
      Math.floor(Math.random() * 360);

    /*
      Change glow position
    */

    const randomX =
      Math.floor(Math.random() * 100);

    const randomY =
      Math.floor(Math.random() * 100);


    profileCard.style.setProperty(
      "--mouse-x",
      `${randomX}%`
    );

    profileCard.style.setProperty(
      "--mouse-y",
      `${randomY}%`
    );


    /*
      Temporary shuffle animation
    */

    profileCard.animate(
      [
        {
          transform:
            "scale(1) rotateZ(0deg)"
        },

        {
          transform:
            `scale(1.025) rotateZ(${randomRotation / 25}deg)`
        },

        {
          transform:
            "scale(1) rotateZ(0deg)"
        }
      ],
      {
        duration: 500,
        easing: "cubic-bezier(.2,.8,.2,1)"
      }
    );


    /*
      Change background video position
      slightly for a different visual feel.
    */

    if (video) {

      video.style.transition =
        "transform 0.8s ease";

      video.style.transform =
        `scale(1.04) translate(
          ${(Math.random() - 0.5) * 2}%,
          ${(Math.random() - 0.5) * 2}%
        )`;

    }

  });

}


// ==========================================
// DISCORD PROFILE
// ==========================================

async function loadDiscordProfile() {

  try {

    const response =
      await fetch(
        `/api/discord-user/${DISCORD_USER_ID}`,
        {
          headers: {
            Accept: "application/json"
          }
        }
      );


    if (!response.ok) {

      /*
        Static preview fallback.
      */

      if (discordUsername) {
        discordUsername.textContent =
          DISCORD_USERNAME;
      }

      return;
    }


    const data =
      await response.json();


    /*
      Avatar
    */

    if (data.avatar_url && avatar) {

      avatar.src =
        data.avatar_url;

    }


    /*
      Discord display name
    */

    if (
      profileName &&
      (data.global_name || data.username)
    ) {

      profileName.textContent =
        data.global_name ||
        data.username;

    }


    /*
      Discord username
    */

    if (
      discordUsername &&
      data.username
    ) {

      discordUsername.textContent =
        data.username;

    }

  } catch (error) {

    /*
      The page still works without
      the Discord backend.
    */

    console.info(
      "Discord profile endpoint is not available in static preview."
    );

    if (discordUsername) {

      discordUsername.textContent =
        DISCORD_USERNAME;

    }

  }

}


loadDiscordProfile();


// ==========================================
// KEYBOARD CONTROLS
// ==========================================

document.addEventListener("keydown", (event) => {

  /*
    Space = play/pause
  */

  if (
    event.code === "Space" &&
    document.activeElement.tagName !== "INPUT" &&
    document.activeElement.tagName !== "TEXTAREA"
  ) {

    event.preventDefault();

    if (playToggle) {
      playToggle.click();
    }

  }


  /*
    M = mute/unmute
  */

  if (
    event.key.toLowerCase() === "m"
  ) {

    if (soundToggle) {
      soundToggle.click();
    }

  }

});