export function getCommentsController() {
  return new Promise((resolve, reject) => {
    fetch('../src/model/comments.php', {
      method: 'GET',
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        resolve(data.comments);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
