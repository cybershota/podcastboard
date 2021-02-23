/**
 * 註冊表單送進資料庫
 * @param {object} 註冊資料物件
 */
export function signupController(data) {
  return new Promise((resolve, reject) => {
    fetch('../src/model/signup.php', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        resolve(response);
        console.log('Success!: ', response);
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
  });
}

/**
 * 註冊表單驗證
 * @param {HTMLElement} 註冊表單
 * @returns {boolean} 驗證通過或失敗
 */
export function signupValidation(formValue) {
  if (
    !formValue.nickname.value ||
    formValue.nickname.value.match(/[\<\>\\\/\#\$\%\^\&\`\+\=\{\}]/g)
  ) {
    console.log('暱稱空白或包含不核可字元');
    return 'invalid-nickname';
  }
  if (
    !formValue.username.value ||
    formValue.username.value.match(/[\<\>\\\/\#\$\%\^\&\`\+\=\{\}\W]/g)
  ) {
    console.log('帳號空白或包含不核可字元');
    return 'invalid-username';
  }
  if (formValue.nickname.value === formValue.username.value) {
    console.log('暱稱不可與帳號一致');
    return 'invalid-names';
  }
  if (
    !formValue.password1.value ||
    !formValue.password2.value ||
    formValue.password1.value !== formValue.password2.value
  ) {
    console.log('密碼空白或密碼不一致');
    return 'invalid-password';
  }
  return 'all-pass';
}
