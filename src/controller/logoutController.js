export function logoutController() {
  return new Promise((resolve, reject) => {
    fetch('../src/utils/logout.php', {
      method: 'POST',
    })
      .then((res) => {
        return res.json();
      })
      .then((body) => {
        resolve(body);
      })
      .catch((error) => {
        console.log(error);
      });
  });
}
