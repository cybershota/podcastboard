const $dom = document.querySelector.bind(document);

const waveformProgressMinutes = $dom('.waveform-progress .minutes');
const waveformProgressSeconds = $dom('.waveform-progress .seconds');
const waveformLengthMinutes = $dom('.waveform-length .minutes');
const waveformLengthSeconds = $dom('.waveform-length .seconds');
const inputAudioTime = $dom('#audio-time');
const audioTimeLabel = $dom('#audio-time-label');
const waveLoadingSvg = $dom('.waveform-loading');
const playBtn = $dom('.podcast-cover');
const playPauseSVG = $dom('.audio-control-btn img');

import { getAudioController } from '../../src/controller/getAudioController.js';
import { formatAudioTime } from './utils/audio_time.js';

// Fetch 音訊來源
const { WaveSurfer } = window;

const wavesurfer = WaveSurfer.create({
  container: '#waveform',
  waveColor: '#D9DCFF',
  progressColor: '#4353FF',
  cursorColor: '#4353FF',
  barWidth: 3,
  barRadius: 5,
  cursorWidth: 3,
  height: 150,
  barGap: 3,
  responsive: true,
});

function updateInputAudioTime() {
  audioTimeLabel.textContent = `${window.audio_play_minutes}:${window.audio_play_seconds}`;
  inputAudioTime.value = window.audio_play_time_float;
}

function getTime(time, labelMinutes, labelSeconds) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  labelMinutes.textContent = minutes;
  labelSeconds.textContent = seconds < 10 ? `0${seconds}` : seconds;
}

async function renderWaveform() {
  try {
    wavesurfer.loadBlob(await getAudioController());
  } catch (error) {
    console.log(error);
  }
}

wavesurfer.on('ready', function () {
  getTime(wavesurfer.getDuration(), waveformLengthMinutes, waveformLengthSeconds);
  window.audio_duration = wavesurfer.getDuration();
  waveLoadingSvg.classList.add('audio-loaded');
  playPauseSVG.dataset.state = 'pause';
  playPauseSVG.setAttribute('src', '../assets/img/pause-button.svg');
  wavesurfer.play();
});

wavesurfer.on('audioprocess', (time) => {
  window.audio_play_time_float = time;
  getTime(time, waveformProgressMinutes, waveformProgressSeconds);
  updateInputAudioTime();
  formatAudioTime(time);
});

wavesurfer.on('finish', () => {
  playPauseSVG.dataset.state = 'play';
  playPauseSVG.setAttribute('src', '../assets/img/play-button.svg');
});

playBtn.addEventListener('click', () => {
  const state = playPauseSVG.dataset.state;
  if (state === 'play') {
    playPauseSVG.dataset.state = 'pause';
    playPauseSVG.setAttribute('src', '../assets/img/pause-button.svg');
  } else {
    playPauseSVG.dataset.state = 'play';
    playPauseSVG.setAttribute('src', '../assets/img/play-button.svg');
  }
  wavesurfer.playPause();
});

renderWaveform();
