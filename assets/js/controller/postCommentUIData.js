const { dayjs } = window;

const $dom = document.querySelector.bind(document);

const commentForm = $dom('#comment-form');

export function commentUIData(formData) {
  let data = formData;
  Object.assign(data, {
    nickName: commentForm.querySelector('#comment-nickname').value,
    avatar: commentForm.querySelector('img').getAttribute('src'),
    createdTime: dayjs(Date.now()),
    audioTime: window.audio_play_time_float ? window.audio_play_time_float : 0,
    currentUser: commentForm.querySelector('#comment-nickname').getAttribute('value'),
    uuid: formData.uuid,
    newPost: true,
  });
  return data;
}
