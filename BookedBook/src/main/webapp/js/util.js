//消息组件
let index = 0;
function sendMessageToTip(msg, type) {
    document.body.insertAdjacentHTML('beforeend',
        `<div class="widget-tip widget-tip-removed" id="tip${index}"></div>`);
    let tipDOM = document.getElementById(`tip${index}`);
    index++;
    tipDOM.classList.remove('widget-tip-removed');
    tipDOM.innerHTML = `<span>${msg}</span>`;
    switch (type) {
        case 'error':
            tipDOM.classList.add('widget-tip-error');
            break;
        case 'warning':
            tipDOM.classList.add('widget-tip-warning');
            break;
        case 'success':
            tipDOM.classList.add('widget-tip-success');
            break;
    }
    setTimeout(() => {
        tipDOM.classList.add('widget-tip-removed');
        
    }, 4000);
    setTimeout(() => {
        tipDOM.remove();
    }, 4500);
    
}
