export function changeNickNameController(data) {
  return new Promise((resolve, reject) => {
    fetch('../src/model/change_nickname.php', {
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
