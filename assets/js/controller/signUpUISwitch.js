const $dom = document.querySelector.bind(document);

const inputNicknameField = $dom('#signup-nickname');
const inputUsernameField = $dom('#signup-username');
const inputPasswordField = document.querySelectorAll('#signup-password input');
const warning = $dom('.warning');

function toggleWarningUI(text, toggleObj) {
  const { nickname, username, password } = toggleObj;
  inputNicknameField.classList.toggle('invalid', nickname);
  inputUsernameField.classList.toggle('invalid', username);
  if (password === true) {
    inputPasswordField.forEach((e) => {
      e.classList.toggle('invalid');
    });
  }
  warning.textContent = text;
  warning.classList.toggle('warning-show', text);
}

/**
 * 切換表單驗證提醒視窗
 * @param {string} 正規式驗證後回傳字串
 * @return {boolean} true if no warning
 */
export function signUpUISwitch(validation) {
  let toggleUI = {
    nickname: false,
    username: false,
    password: false,
  };

  switch (validation) {
    case 'invalid-nickname':
      toggleUI.nickname = true;
      toggleWarningUI('暱稱空白或包含不核可字元', toggleUI);
      break;
    case 'invalid-username':
      toggleUI.username = true;
      toggleWarningUI('帳號空白或包含不核可字元', toggleUI);
      break;
    case 'invalid-names':
      toggleUI = { nickname: true, username: true };
      toggleWarningUI('暱稱不可與帳號一致', toggleUI);
      break;
    case 'invalid-password':
      toggleUI.password = true;
      toggleWarningUI('密碼空白或密碼不一致', toggleUI);
      break;
    case 'all-pass':
      return true;
      break;
    default:
      warning.textContent = '系統錯誤，請聯絡開發者';
      warning.classList.toggle('warning-show', text);
      break;
  }
}
