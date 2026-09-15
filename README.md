# Saravanan Palani — Profile Website

A lightweight, responsive, video-first personal profile page inspired by the supplied reference site.

## Files
- index.html
- styles.css
- script.js
- assets/profile-video.mp4  <-- add client's final video here
- assets/video-poster.jpg   <-- optional poster image

## Social links
- Steam: https://steamcommunity.com/profiles/76561198224063524
- Instagram: https://www.instagram.com/saravanan_palani._/?hl=en
- Facebook: https://www.facebook.com/saravanan.palani.188550
- Discord: https://discord.com/users/502469831346487305

## Discord
The frontend intentionally does NOT contain a Discord token or secret.
For live Discord data/avatar, add a secure backend endpoint:

GET /api/discord-user/502469831346487305

Expected JSON:
{
  "username": "example",
  "global_name": "Saravanan Palani",
  "avatar_url": "https://cdn.discordapp.com/..."
}

The current static page works without this endpoint and shows Discord's default avatar.

## Video
Download the final/high-quality video supplied by the client from Google Drive and save it as:
assets/profile-video.mp4

For best performance, use an H.264 MP4 suitable for web playback. Keep the video reasonably compressed so the first load is fast.

## Netlify preview
The static part can be deployed directly to Netlify. If live Discord API data is required, use a secure serverless function/backend and keep credentials in environment variables.
