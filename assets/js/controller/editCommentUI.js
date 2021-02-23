/**
 * 建立即時編輯 textarea 視窗
 * @param HTMLElement 留言 container DOM 元素
 * @param HTMLElement textEl 原始<p>標籤 DOM 元素
 * @param string text 原始留言內容
 * @param string uuid 留言 uuid
 */
export function createTextareaUI(dom, textEl, text, uuid) {
  const contentHeight = textEl.offsetHeight;
  textEl.style.display = 'none';
  const el = document.createElement('textarea');
  el.style.height = `${contentHeight + 50}px`;
  el.dataset.uuid = uuid;
  el.value = text;
  const editBlock = dom.querySelector('.review-content');
  editBlock.appendChild(el);
}
/**
 * 編輯貼文按鈕 UI 切換
 * @summary 預設 view 模式顯示編輯、刪除按鈕。編輯 edit 模式顯示儲存、取消按鈕
 * @param HTMLElement dom
 * @param Object mode edit | view
 */
export function toggleEditCancelUI(dom, mode) {
  const editBtn = dom.editPost.querySelector('.review-modify .review-modify-btn:first-child');
  const deleteBtn = dom.editPost.querySelector('.review-modify .review-modify-btn:last-child ');
  if (mode.edit) {
    editBtn.textContent = '儲存';
    deleteBtn.textContent = '取消';
  }
  if (mode.view) {
    editBtn.textContent = '編輯';
    deleteBtn.textContent = '刪除';
  }
}
/**
 * 取消編輯貼文
 * @param HTMLElement 取消編輯的 DOM 元素
 */
export function cancelEditedPost(dom) {
  const pTag = dom.editPost.querySelector('.review-content p');
  const editedContent = dom.editPost.querySelector('textarea');
  pTag.textContent = JSON.parse(sessionStorage.getItem(dom.targetPost_uuid)).originContent;
  pTag.style.display = 'block';
  editedContent.remove();
  toggleEditCancelUI(dom, { view: true, edit: false });
}

/**
 * 判斷使用者欲編輯的留言 DOM 元素
 * @param {HTMLElement} target
 * @returns {Object} uuid | 貼文DOM元素
 */
export function distinguishPost(target) {
  const targetPost_uuid = target.dataset.uuid;
  const editPost = document.getElementById(targetPost_uuid);
  return { targetPost_uuid, editPost };
}
