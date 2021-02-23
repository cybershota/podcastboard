export function formatAudioTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  window.audio_play_minutes = `${minutes}`;
  window.audio_play_seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
}
