const { dayjs } = window;

import { escapeText } from './html_escape.js';

function formatAudioTime(time) {
  if (time === undefined) {
    return '0:00';
  }
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  if (seconds < 10) {
    const zeroseconds = `0${seconds}`;
    return `${minutes}:${zeroseconds}`;
  }
  return `${minutes}:${seconds}`;
}

function formatRole(role) {
  switch (role) {
    case 'user':
      return '聽眾';
      break;
    case 'admin':
      return '管理';
      break;
    case 'block':
      return '禁言';
      break;
    default:
      return '未知';
      break;
  }
}

const reviewArea = document.querySelector('.review-area');

const template = {
  reviewBlock(data, order) {
    const {
      nickName,
      avatar,
      content,
      audioTime,
      createdTime,
      currentUser,
      uuid,
      role,
      activeRole,
      newPost,
    } = data;

    const el = document.createElement('div');

    el.className = 'review-block';
    el.id = `${uuid}`;

    if (nickName === currentUser && role === 'block' && !newPost) {
      el.innerHTML = `
      <div class="avatar">
        <img src="${avatar}" alt="${nickName}_avatar">
      </div>
      <div class="review-detail">
        <div class="review-info">
          <h4>${escapeText(nickName)}</h4>
          <p>${formatRole(role)}</p>
          <p>${formatAudioTime(audioTime)}</p>
        </div>
      <div class="review-content">
        
          <h2 style="color:red;text-align:center;margin-top:10px;">您已遭禁言，請修正或刪除觸犯版歸之言論。</h2>
          <h3 style="color:red;text-align:center;">請檢查以下言論是否違反版規：</h3>
          <h3 style="color:red;text-align:center;">一、禁止人身攻擊</h3>
          <h3 style="color:red;text-align:center;">二、禁止攻擊 SCRUM 和戰南北粽</h3>
          <h3 style="color:red;text-align:center;">三、禁止鄙視鍊</h3>
        
        <p>${escapeText(content)}</p>
      </div>
      <div class="review-modify">
        <div class="review-modify-btn" data-uuid=${uuid}>編輯</div>
        <div class="review-modify-btn" data-uuid=${uuid}>刪除</div>
      </div>
      <div class="review-time">
        <p>${dayjs(createdTime).format('YYYY-MM-DD HH:mm')}</p>
      </div>
      </div>
      `;
      reviewArea.appendChild(el);
    } else if (newPost && role === 'block') {
      el.innerHTML = `
      <div class="avatar">
        <img src="${avatar}" alt="${nickName}_avatar">
      </div>
      <div class="review-detail">
        <div class="review-info">
          <h4>${escapeText(nickName)}</h4>
          <p>${formatRole(role)}</p>
          <p>${formatAudioTime(audioTime)}</p>
        </div>
      <div class="review-content">
        
          <h2 style="color:red;text-align:center;margin-top:10px;">您已遭禁言，請修正或刪除觸犯版歸之言論。</h2>
          <h3 style="color:red;text-align:center;">你的新留言不會儲存。</h3>

      </div>

      <div class="review-time">
        <p>${dayjs(createdTime).format('YYYY-MM-DD HH:mm')}</p>
      </div>
      </div>
      `;
      if (order) {
        el.style.borderRadius = '0px';
        el.style.order = order;
      }
      reviewArea.appendChild(el);
    } else if (activeRole === 'user' && role === 'block') {
      el.innerHTML = `
      <div class="avatar">
        <img src="${avatar}" alt="${nickName}_avatar">
      </div>
      <div class="review-detail">
        <div class="review-info">
          <h4>${escapeText(nickName)}</h4>
          <p>${formatRole(role)}</p>
          <p>${formatAudioTime(audioTime)}</p>
        </div>
      <div class="review-content">
        <p style="background:black;color:gray;text-align:center;">使用者已禁言，內文自動屏蔽</p>
      </div>
      <div class="review-modify">
      </div>
      <div class="review-time">
        <p>${dayjs(createdTime).format('YYYY-MM-DD HH:mm')}</p>
      </div>
      </div>
      `;
      reviewArea.appendChild(el);
    } else if (nickName === currentUser || activeRole == 'admin') {
      el.innerHTML = `
      <div class="avatar">
        <img src="${avatar}" alt="${nickName}_avatar">
      </div>
      <div class="review-detail">
        <div class="review-info">
          <h4>${escapeText(nickName)}</h4>
          <p>${formatRole(role)}</p>
          <p>${formatAudioTime(audioTime)}</p>
        </div>
      <div class="review-content">
        <p>${escapeText(content)}</p>
      </div>
      <div class="review-modify">
        <div class="review-modify-btn" data-uuid=${uuid}>編輯</div>
        <div class="review-modify-btn" data-uuid=${uuid}>刪除</div>
      </div>
      <div class="review-time">
        <p>${dayjs(createdTime).format('YYYY-MM-DD HH:mm')}</p>
      </div>
      </div>
      `;
      if (order) {
        el.style.borderRadius = '0px';
        el.style.order = order;
      }
      reviewArea.appendChild(el);
    } else if (role === 'block') {
      el.innerHTML = `
      <div class="avatar">
        <img src="${avatar}" alt="${nickName}_avatar">
      </div>
      <div class="review-detail">
        <div class="review-info">
          <h4>${escapeText(nickName)}</h4>
          <p>${formatRole(role)}</p>
          <p>${formatAudioTime(audioTime)}</p>
        </div>
      <div class="review-content">
        <p style="background:black;color:gray;text-align:center;">使用者已禁言，內文自動屏蔽</p>
      </div>
      <div class="review-time">
        <p>${dayjs(createdTime).format('YYYY-MM-DD HH:mm')}</p>
      </div>
      </div>
      `;
      reviewArea.appendChild(el);
    } else {
      el.innerHTML = `
      <div class="avatar">
        <img src="${avatar}" alt="${nickName}_avatar">
      </div>
      <div class="review-detail">
        <div class="review-info">
          <h4>${escapeText(nickName)}</h4>
          <p>${formatRole(role)}</p>
          <p>${formatAudioTime(audioTime)}</p>
        </div>
      <div class="review-content">
        <p>${escapeText(content)}</p>
      </div>
      <div class="review-time">
        <p>${dayjs(createdTime).format('YYYY-MM-DD HH:mm')}</p>
      </div>
      </div>
      `;
      reviewArea.appendChild(el);
    }
  },
};

export default template;
