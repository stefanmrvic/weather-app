// Helper functions for handling errors
export function showError(msg) {
    const errorMsgEle = document.querySelector('.error__msg');

    errorMsgEle.style.display = 'block';
    errorMsgEle.textContent = msg;
}

export function hideError() {
    const errorMsgEle = document.querySelector('.error__msg');
    errorMsgEle.textContent = '';
    errorMsgEle.style.display = 'none';
}
