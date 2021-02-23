/**
 * 清除留言板&波譜留言板 DOM 元素
 */
export function cleanDOM() {
  const reviewBlocks = document.querySelectorAll('.review-block');
  const waveformBlocks = document.querySelectorAll('.waveform-comment');
  const domArray = [reviewBlocks, waveformBlocks];
  domArray.forEach((array) => {
    array.forEach((el) => {
      el.remove();
    });
  });
}
