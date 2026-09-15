const video = document.querySelector(".background-video");
const soundToggle = document.querySelector("#soundToggle");
const year = document.querySelector("#year");
const avatar = document.querySelector("#discordAvatar");

// Client Discord ID
const DISCORD_USER_ID = "502469831346487305";

year.textContent = new Date().getFullYear();

// Keep autoplay reliable on mobile/desktop.
// The video starts muted; the user can enable audio with the button.
video.muted = true;
video.play().catch(() => {});

// Toggle video sound.
soundToggle.addEventListener("click", async () => {
  video.muted = !video.muted;

  if (!video.muted) {
    try { await video.play(); } catch (_) {}
  }

  soundToggle.innerHTML = video.muted
    ? '<i class="fa-solid fa-volume-xmark"></i>'
    : '<i class="fa-solid fa-volume-high"></i>';
  soundToggle.setAttribute(
    "aria-label",
    video.muted ? "Turn video sound on" : "Turn video sound off"
  );
});

/*
  Discord integration:
  A Discord user ID by itself is not enough to build the avatar URL because
  Discord avatar URLs require the user's current avatar hash.

  Recommended production setup:
    GET /api/discord-user/502469831346487305
  -> backend securely calls Discord
  -> backend returns { username, global_name, avatar_url }

  Never put a Discord bot token/client secret in this browser file.

  For now the page uses Discord's default avatar as a safe fallback.
*/
async function loadDiscordProfile() {
  try {
    const response = await fetch(`/api/discord-user/${DISCORD_USER_ID}`, {
      headers: { "Accept": "application/json" }
    });

    if (!response.ok) return;

    const data = await response.json();

    if (data.avatar_url) {
      avatar.src = data.avatar_url;
    }

    if (data.global_name || data.username) {
      document.querySelector("#profileName").textContent =
        data.global_name || data.username;
    }
  } catch (error) {
    // Preview can work without the backend; fallback avatar remains visible.
    console.info("Discord profile endpoint not available in static preview.");
  }
}

loadDiscordProfile();
