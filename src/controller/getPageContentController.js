export function getPageContentController(data) {
  return new Promise((resolve, reject) => {
    fetch('../src/model/get_page_content.php', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        resolve(response.comments);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}
