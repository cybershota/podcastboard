export function getAudioController() {
  return new Promise((resolve, reject) => {
    fetch('../src/utils/audio_waveform.php', {
      method: 'GET',
    })
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        console.log('Successfully Load Audio Source');
        resolve(blob);
      })
      .catch((error) => {
        console.log('Error Loading Audio Source');
        reject(error);
      });
  });
}
