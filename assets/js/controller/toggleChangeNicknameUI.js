const $dom = document.querySelector.bind(document);

const changeNickNBtn = $dom('.change-nickname-btn');
const changeNickNInput = $dom('.change-nickname-input');
const userNicknameBlock = $dom('#user-nickname');
const confirmNickBtn = $dom('.confirm-nickname-btn');
const cancelNickNBtn = $dom('.cancel-nickname-btn');

export function toggleChangeNicknameUI(display, confirmText, cancelText) {
  changeNickNBtn.style.display = display;
  confirmNickBtn.textContent = confirmText;
  cancelNickNBtn.textContent = cancelText;
  userNicknameBlock.classList.toggle('nickname-block-move');
  confirmNickBtn.classList.toggle('btn-show');
  cancelNickNBtn.classList.toggle('btn-show');
  changeNickNInput.classList.toggle('input-show');
  changeNickNBtn.classList.toggle('change-confirm');
}
