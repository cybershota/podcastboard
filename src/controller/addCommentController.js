export function addCommentController(data) {
  return new Promise((resolve, reject) => {
    fetch('../src/model/add_comment.php', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.ok === true) {
          console.log('Success: ', response);
          resolve(true);
          return;
        }
        reject(response);
      })
      .catch((error) => {
        console.log('Error: ', error);
        reject(error);
      });
  });
}
