const $dom = document.querySelector.bind(document);

const pagination = $dom('.pagination');

export function toggleArrowUI() {
  const urlParams = new URLSearchParams(window.location.search);
  // UI
  const backBtn = pagination.querySelector('li:first-child');
  const forwardBtn = pagination.querySelector('li:last-child');
  const currentPage = Number(urlParams.get('page'));
  // get Session Storage value
  const totalPage = Number(sessionStorage.getItem('totalPage'));
  if (currentPage === 1 && totalPage === 1) {
    backBtn.classList.add('arrow-hide');
    forwardBtn.classList.add('arrow-hide');
  } else if (currentPage === 1 && totalPage > 1) {
    backBtn.classList.add('arrow-hide');
    forwardBtn.classList.remove('arrow-hide');
  }
}

export function togglePaginationUI(currentPage, target) {
  let targetPage = target;
  if (targetPage === 'back') {
    targetPage = currentPage - 1;
  }
  if (targetPage === 'forward') {
    targetPage = currentPage + 1;
  }
  const lastLiElement = $dom(`.pagination li:nth-of-type(${currentPage + 1})`);
  const targetLiElement = $dom(`.pagination li:nth-of-type(${targetPage + 1})`);
  lastLiElement.classList.toggle('page-location');
  targetLiElement.classList.toggle('page-location');
}
