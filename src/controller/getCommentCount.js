export function getCommentCount() {
  return new Promise((resolve, reject) => {
    fetch('../src/model/get_comments_count.php', {
      method: 'GET',
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}
