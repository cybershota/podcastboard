export function pagination_template(pageCount) {
  const pagination = document.querySelector('.pagination');
  for (let i = 0; i <= pageCount + 1; i += 1) {
    const el = document.createElement('li');
    if (i === 0) {
      el.textContent = '⬅️';
      el.setAttribute('data-type', 'back');
      pagination.appendChild(el);
    } else if (i === pageCount + 1) {
      el.textContent = '➡️';
      el.setAttribute('data-type', 'forward');
      pagination.appendChild(el);
    } else if (i === 1) {
      el.textContent = i;
      el.classList.add('page-location');
      el.setAttribute('data-type', 'page');
      el.setAttribute('data-page', i);
      pagination.appendChild(el);
    } else {
      el.textContent = i;
      el.setAttribute('data-type', 'page');
      el.setAttribute('data-page', i);
      pagination.appendChild(el);
    }
  }
}
