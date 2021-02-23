export function deletePostController(data) {
  return new Promise((resolve, reject) => {
    fetch('../src/model/delete_comment.php', {
      method: 'PUT',
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        console.log(response);
        resolve(response);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}
