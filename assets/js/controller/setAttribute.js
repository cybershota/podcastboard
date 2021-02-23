const $dom = document.querySelector.bind(document);

const commentForm = $dom('#comment-form');

/**
 * 留言表單自動填入使用者資料
 * @param {object} 使用者暱稱大頭照
 */
export function setAttribute(data) {
  commentForm.querySelector('#comment-nickname').setAttribute('value', `${data.nickname}`);
  commentForm.querySelector('img').setAttribute('src', `${data.avatar}`);
  commentForm.querySelector('#user-nickname').textContent = data.nickname;
  commentForm.querySelector('#comment-role').setAttribute('value', data.role);
}
