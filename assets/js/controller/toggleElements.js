const $dom = document.querySelector.bind(document);

const logInArea = $dom('#login-area');
const signupAreaBtn = $dom('.sign-up');
const loginAreaBtn = $dom('.log-in');
const signUpArea = $dom('#signup-area');
const logoutAreaBtn = $dom('.log-out');
const commentArea = $dom('.comment-area');

const mode = {
  signupform: {
    show: [signUpArea],
    hide: [logInArea],
  },
  loginform: {
    show: [logInArea, signupAreaBtn, loginAreaBtn, signUpArea],
    hide: [signUpArea, logoutAreaBtn, commentArea],
  },
  login: {
    show: [commentArea, logoutAreaBtn],
    hide: [signupAreaBtn, loginAreaBtn, signUpArea, logInArea],
  },
  logout: {
    show: [signupAreaBtn, loginAreaBtn],
    hide: [logoutAreaBtn, commentArea],
  },
};

function showElements(el) {
  el.forEach((e) => {
    e.classList.remove('hide');
  });
}

function hideElements(el) {
  el.forEach((e) => {
    e.classList.add('hide');
  });
}

/**
 * 撥動隱藏/顯示元素
 * @param {string} 切換UI模式 signupform | loginform | login | logout
 */
export function toggleElements(toggle) {
  switch (toggle) {
    case 'signupform':
      showElements(mode.signupform.show);
      hideElements(mode.signupform.hide);
      break;

    case 'loginform':
      showElements(mode.loginform.show);
      hideElements(mode.loginform.hide);
      break;

    case 'login':
      showElements(mode.login.show);
      hideElements(mode.login.hide);
      break;

    case 'logout':
      showElements(mode.logout.show);
      hideElements(mode.logout.hide);
      break;

    default:
      console.log('預設');
      break;
  }
}
