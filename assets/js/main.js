import {
  signupController,
  signupValidation,
  loginController,
  cookieController,
  addCommentController,
  logoutController,
  changeNickNameController,
  editPostController,
  deletePostController,
  getCommentCount,
  getPageContentController,
} from '../../src/controller/index.js';

import { signUpUISwitch } from './controller/signUpUISwitch.js';
import { toggleElements } from './controller/toggleElements.js';
import { toggleChangeNicknameUI } from './controller/toggleChangeNicknameUI.js';
import { setAttribute } from './controller/setAttribute.js';
import { commentUIData } from './controller/postCommentUIData.js';

import { uuid } from './utils/uuid.js';

// 編輯留言模組
import {
  distinguishPost,
  createTextareaUI,
  toggleEditCancelUI,
  cancelEditedPost,
} from './controller/editCommentUI.js';

// 分頁模組
import { toggleArrowUI, togglePaginationUI } from './controller/paginationUI.js';

// DOM 魔術師
import { cleanDOM } from './controller/cleanDOM.js';

import template from '../../src/view/templates.js';
import { waveformComment } from '../../src/view/waveformComment.js';
import { pagination_template } from '../../src/view/pagination_template.js';

/**
 * DOM 元素選擇器
 * @const $dom
 * @link https://dev.to/mrahmadawais/use-instead-of-document-queryselector-all-in-javascript-without-jquery-3ef1
 */
const $dom = document.querySelector.bind(document);

const btnGroup = $dom('.button-group');
const logoutAreaBtn = $dom('.log-out');
const reviewArea = $dom('.review-area');
const pagination = $dom('.pagination');
const signUpForm = $dom('#signup-form');
const signUpBtn = $dom('#signup-btn');
const loginForm = $dom('#login-form');
const loginBtn = $dom('#login-btn');
const commentForm = $dom('#comment-form');
const commentSubBtn = $dom('#submit-comment');

console.log('感謝 min 同意使用封面照！');

/**
 * 首頁「註冊」、「登入」按鈕監聽
 * @fires 顯示註冊表單區塊或登入表單區塊
 */
btnGroup.addEventListener('click', (e) => {
  if (e.target.textContent === '註冊') {
    toggleElements('signupform');
  }
  if (e.target.textContent === '登入') {
    toggleElements('loginform');
  }
});

/* ---------------------------------- */
/*                 註冊                */
/* ---------------------------------- */

signUpBtn.addEventListener('click', (e) => {
  e.preventDefault();

  /**
   * 正規式驗證資料格式
   * @func signupValidation
   * @return {string} invalid-nickname | invalid-username | invalid-names | all-pass
   * @module src/controller/signupController.js
   */
  const validation = signupValidation(signUpForm);

  if (signUpUISwitch(validation)) {
    const signupData = {
      nickname: signUpForm.nickname.value,
      username: signUpForm.username.value,
      password: signUpForm.password2.value,
      avatar: `https://avatars.dicebear.com/api/initials/${signUpForm.nickname.value}.svg`,
    };

    signupController(signupData).then(() => {
      checkCookie();
    });
  }
});

/* ---------------------------------- */
/*                 登入                */
/* ---------------------------------- */

/**
 * 資料庫查找登入資訊
 * @async
 * @function loginController
 * @param {object} 登入資訊物件
 */
async function loginSubmit(data) {
  try {
    await loginController(data);
    cleanDOM();
    checkCookie();
  } catch (err) {
    console.log('main.js Error', err);
  }
}

loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (!loginForm.username.value || !loginForm.password.value) {
    console.log('帳號或密碼為空');
  } else {
    const loginData = {
      username: loginForm.username.value,
      password: loginForm.password.value,
    };
    loginSubmit(loginData);
  }
});

/* ---------------------------------- */
/*               Cookie               */
/* ---------------------------------- */

function getAdmin() {
  if (!btnGroup.querySelector('div')) {
    fetch('../src/admin/adminBtnTemplate.php', { method: 'GET' })
      .then((res) => {
        return res.text();
      })
      .then((response) => {
        const theBtn = document.createElement('div');
        theBtn.classList.add('the-btn');
        theBtn.innerHTML = response;
        btnGroup.appendChild(theBtn);
      });
  }
}

/**
 * 檢查 Cookie 紀錄
 * @param {number} page pagination 更新重新驗證使用者以顯示貼文可否編輯
 */
async function checkCookie(page) {
  const cookieStore = cookieController.getCookie();
  // 檢查 Cookie 完整性
  if ('PHPSESSID' in cookieStore) {
    const userdata = await cookieController.validateCookie(cookieStore);
    const setData = {
      nickname: userdata.nickname,
      avatar: userdata.avatar,
      role: userdata.role,
    };
    toggleElements('login');
    setAttribute(setData);
    const currentUser = commentForm.querySelector('#comment-nickname').getAttribute('value');
    getComments(currentUser, page, userdata.role);
    sessionStorage.setItem('sessionPostCount', 0);
    if (userdata.role === 'admin') {
      getAdmin();
    }
    console.log('使用者已認證登入');
  } else {
    getComments(null, page);
    console.log('使用者尚未認證');
  }
}

/* ---------------------------------- */
/*                發佈留言              */
/* ---------------------------------- */

/**
 * 發佈留言
 * @summary 先更新 DOM 元素，再發送後端請求。
 * @param {object} 留言表單內容
 * @function commentUIData 是為即時顯示的 DOM 元素準備。如頁面重整，資料庫撈取內容是以關連形式取出，會直接在 template 排版。
 * @function reviewBlock 留言板UI
 * @function waveformComment 波譜留言UI
 * @function addCommentController 發送後端請求
 * @todo 如後端失敗，應將原始留言內容重新塞入 textarea，請使用者嘗試再次發佈。
 */
async function postComment(data) {
  const order = Number(sessionStorage.getItem('sessionPostCount')) + 1;
  template.reviewBlock(commentUIData(data), `-${order}`);
  sessionStorage.setItem('sessionPostCount', order);
  waveformComment(commentUIData(data));
  try {
    // 身份認證
    const cookieStore = cookieController.getCookie();
    const userdata = await cookieController.validateCookie(cookieStore);
    data.activeRole = userdata.role;
    await addCommentController(data);
    commentForm.comment.value = '';
  } catch (error) {
    console.log(error);
  }
}

commentSubBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (!commentForm.comment.value) {
    alert('留言不能為空');
  } else {
    let data = {
      userName: commentForm.user.value,
      content: commentForm.comment.value,
      audioTime: commentForm.audioTime.value,
      role: commentForm.role.value,
      uuid: uuid(),
    };
    postComment(data);
  }
});

/* ---------------------------------- */
/*               修改暱稱              */
/* ---------------------------------- */

const changeNickNBtn = $dom('.change-nickname-btn');
const changeNickNInput = $dom('.change-nickname-input');
const confirmNickBtn = $dom('.confirm-nickname-btn');
const cancelNickNBtn = $dom('.cancel-nickname-btn');

async function putNickname(data) {
  try {
    await changeNickNameController(data);
  } catch (error) {
    console.log(error);
  }
  location.reload();
}

changeNickNBtn.addEventListener('click', () => {
  toggleChangeNicknameUI('none', '確認', '取消');
});

cancelNickNBtn.addEventListener('click', () => {
  toggleChangeNicknameUI('block', '', '');
  changeNickNInput.value = '';
});

confirmNickBtn.addEventListener('click', () => {
  const newNickName = changeNickNInput.value;
  if (newNickName.match(/[\<\>\\\/\#\$\%\^\&\`\+\=\{\}]/g)) {
    alert('暱稱空白或包含不核可字元');
  } else {
    const data = {
      nickname: newNickName,
      avatar: `https://avatars.dicebear.com/api/initials/${newNickName}.svg`,
    };
    putNickname(data);
  }
});

/* ---------------------------------- */
/*               編輯留言              */
/* ---------------------------------- */

async function storeEditedPost(dom) {
  const pTag = dom.editPost.querySelector('.review-content p');
  const editedContent = dom.editPost.querySelector('textarea');
  if (editedContent.value.length === 0) {
    alert('無法更新空白留言，請選擇取消！');
    return;
  }
  // 身份認證
  const cookieStore = cookieController.getCookie();
  const userdata = await cookieController.validateCookie(cookieStore);
  // 資料更新
  const data = {
    uuid: dom.targetPost_uuid,
    content: editedContent.value,
    activeRole: userdata.role,
  };
  try {
    const status = await editPostController(data);
    if (status.ok === true) {
      // DOM 更新
      pTag.textContent = editedContent.value;
      pTag.style.display = 'block';
      editedContent.remove();
      toggleEditCancelUI(dom, { view: true, edit: false });
    }
  } catch (error) {
    console.log(error);
  }
}

async function deletePost(dom) {
  // 身份認證
  const cookieStore = cookieController.getCookie();
  const userdata = await cookieController.validateCookie(cookieStore);

  const data = {
    uuid: dom.targetPost_uuid,
    activeRole: userdata.role,
  };

  try {
    const status = await deletePostController(data);
    if (status.ok === true) {
      dom.editPost.remove();
    }
  } catch (error) {
    console.log(error);
  }
}

reviewArea.addEventListener('click', (e) => {
  if (e.target.textContent === '編輯') {
    const domData = distinguishPost(e.target);
    const pTag = domData.editPost.querySelector('.review-content p');
    const originContent = pTag.textContent;

    // 設定 session storage
    const postData = {
      uuid: domData.targetPost_uuid,
      originContent: originContent,
    };

    sessionStorage.setItem(domData.targetPost_uuid, JSON.stringify(postData));

    createTextareaUI(domData.editPost, pTag, originContent, domData.targetPost_uuid);
    toggleEditCancelUI(domData, { edit: true, view: false });
  } else if (e.target.textContent === '儲存') {
    const domData = distinguishPost(e.target);
    storeEditedPost(domData);
  } else if (e.target.textContent === '取消') {
    const domData = distinguishPost(e.target);
    cancelEditedPost(domData);
  } else if (e.target.textContent === '刪除') {
    const domData = distinguishPost(e.target);
    deletePost(domData);
  }
});

/* ---------------------------------- */
/*                歷史留言             */
/* ---------------------------------- */

async function getComments(currentUser, page, activeRole) {
  try {
    const data = await getPageContentController({ page: page ? page : 1 });
    data.forEach((d) => {
      template.reviewBlock({
        nickName: d.nickname,
        avatar: d.avatar,
        content: d.content,
        audioTime: d.audio_time,
        createdTime: d.created_time,
        currentUser: currentUser,
        uuid: d.uuid,
        role: d.role,
        activeRole: activeRole,
      });
      waveformComment({
        nickName: d.nickname,
        avatar: d.avatar,
        content: d.content,
        audioTime: d.audio_time,
        createdTime: d.created_time,
        uuid: d.uuid,
        role: d.role,
      });
    });
  } catch (error) {
    console.log(error);
  }
}

/* ---------------------------------- */
/*                 分頁                */
/* ---------------------------------- */

function requestNewPageData(requestPage) {
  history.pushState({ page: requestPage }, null, `?page=${requestPage}`);
  sessionStorage.setItem('currentPage', requestPage);
  cleanDOM();
  checkCookie(requestPage);
}

// 先得知資料多少
async function renderPagination() {
  const rowCount = await getCommentCount();
  const page = Math.ceil(rowCount.count / 15);
  // 新增 Session Storage 紀錄
  sessionStorage.setItem('totalPage', `${page}`);
  sessionStorage.setItem('currentPage', 1);
  // 新增歷史紀錄
  history.pushState({ page: 1 }, null, '?page=1');
  // 繪圖
  pagination_template(page);
  // 介面優化
  toggleArrowUI();
}

pagination.addEventListener('click', (e) => {
  const targetType = e.target.dataset.type;
  if (targetType) {
    let requestPage;
    let targetPage = e.target.dataset.type;
    const currentPage = history.state.page;
    if (targetType === 'back') {
      requestPage = currentPage - 1;
    }
    if (targetType === 'forward') {
      requestPage = currentPage + 1;
    }
    if (targetType === 'page') {
      targetPage = Number(e.target.dataset.page);
      requestPage = Number(targetPage);
    }

    requestNewPageData(requestPage);
    togglePaginationUI(currentPage, targetPage);
    toggleArrowUI();
  }
});

/* ---------------------------------- */
/*                 登出                */
/* ---------------------------------- */
async function logOutClean() {
  await logoutController();
  const cookieName = ['PHPSESSID'];
  cookieName.forEach((c) => {
    document.cookie = `${c}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });
}

logoutAreaBtn.addEventListener('click', (e) => {
  e.preventDefault();
  logOutClean();
  cleanDOM();
  if (commentForm.role.value === 'admin') {
    btnGroup.querySelector('.the-btn').remove();
  }
  toggleElements('logout');
  getComments();
});
/* ---------------------------------- */
/*               網站監聽              */
/* ---------------------------------- */

window.addEventListener('load', () => {
  checkCookie();
  renderPagination();
});

window.addEventListener(
  'popstate',
  (e) => {
    const requestPage = Number(e.state.page);
    const currentPage = Number(sessionStorage.getItem('currentPage'));
    requestNewPageData(requestPage);
    togglePaginationUI(currentPage, requestPage);
    toggleArrowUI();
  },
  false,
);
