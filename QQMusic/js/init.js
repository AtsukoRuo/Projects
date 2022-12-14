let searchInputDOM = document.querySelector('.search-input');
let searchPanelDOM = document.querySelector('.search-panel');
let headerTimeDOM = document.querySelector('.header-time');

//定时器组件
setInterval(() => {
    let date = new Date();
    let second = date.getSeconds();
    let hour = date.getHours();
    headerTimeDOM.textContent = `${hour}:${date.getMinutes()}:` +
        (second < 10 ? `0${second}` : `${second}`) + ` ` +
        (hour >= 12 ? `下午` : `上午`);
}, 1000);

//搜索框组件
searchInputDOM.addEventListener('focus', (e) => {
    searchPanelDOM.classList.remove('search-panel-removed');
});
searchInputDOM.addEventListener('blur', (e) => {
    searchPanelDOM.classList.add('search-panel-removed');
});

//消息组件
function sendMessageToTip(msg, type) {
    document.body.insertAdjacentHTML('beforeend',
        `<div class="widget-tip widget-tip-removed"></div>`);
    let tipDOM = document.querySelector('.widget-tip');
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



//音乐类
class Music {
    title; src; image; songer;
    constructor(title, src, image, songer) {
        this.title = title;
        this.src = src;
        this.image = image;
        this.songer = songer;
    }
};



music_set = [new Music('I Really Want to Stay At Your House', 'I Really Want to Stay At Your House.mp3', 'I Really Want to Stay At Your House.jpg', 'Rosa Walton'),
new Music('Sincerely', 'Sincerely.mp3', 'Sincerely.jpg', '唐沢美帆'),
new Music('Cruel Summer', 'Cruel Summer.mp3', '2.jpg', 'Taylor Swift'),
new Music('Here', 'Here.mp3', 'Here.jpg', 'Adventure Club'),
new Music('花の塔', '花の塔.mp3', '花の塔.jpg', 'さユり'),
new Music('Fairy Tale', 'Fairy Tale.mp3', 'Fairy Tale.jpg', 'NLSN'),
new Music('Power', 'Power.mp3', 'a.jpg', 'Little Mix'),
new Music("Please Don't Go", "Please Don't Go.mp3", 'b.jpg', 'Afterfab'),
new Music("Don't Let Me Down", "Don't Let Me Down.mp3", 'c.jpg', 'ILLENIUM'),
new Music("I Don't Wanna Live Forever", "I Don't Wanna Live Forever.mp3", 'd.jpg', 'Kayla Diamond'),
];

var songsheetIndex = 0;
let songsheetWrapperDOM = document.querySelector('.main-page-songsheets-wrapper');
document.querySelector('.main-page-songsheets-right-btn').addEventListener('click', (e) => {
    if (songsheetIndex === 2) songsheetIndex = 0;
    else songsheetIndex++;
    songsheetWrapperDOM.style.transform = `translate(-${songsheetIndex * 33.3}%, 0)`;
});

document.querySelector('.main-page-songsheets-left-btn').addEventListener('click', (e) => {
    if (songsheetIndex === 0) songsheetIndex = 2;
    else songsheetIndex--;
    songsheetWrapperDOM.style.transform = `translate(-${songsheetIndex * 33.3}%, 0)`;
});

document.querySelectorAll('.main-page-recommendation-itemBox').forEach((element) => {
    element.addEventListener('click', (e) => {
        audioPlayer.init(element.dataset.music);
    });
});

document.querySelectorAll('.song-panel').forEach((element) => {
    element.addEventListener('click', (e) => {
        audioPlayer.init(element.dataset.music);
    });
});

var isDark = true;
let elementRoot = document.querySelector(':root');
function changeTheme() {
    if (isDark) {
        elementRoot.style.setProperty('--overflow-color', '#F5F5F5');
        elementRoot.style.setProperty('--base-color', '#F0F0F0');
        elementRoot.style.setProperty('--surface-color', '#EEE');
        elementRoot.style.setProperty('--overlay-dark-color', '#e6e6e6');
        elementRoot.style.setProperty('--overlay-light-color', '#C7C4BF');
        elementRoot.style.setProperty('--active-color', '#63C7A6');
        elementRoot.style.setProperty('--text-shadow-color', 'none');
        elementRoot.style.setProperty('--font-color', 'black');
        elementRoot.style.setProperty('--shadow-value', 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px');
    } else {
        elementRoot.style.setProperty('--overflow-color', '#010101');
        elementRoot.style.setProperty('--base-color', '#1f2023');
        elementRoot.style.setProperty('--surface-color', '#27292D');
        elementRoot.style.setProperty('--overlay-dark-color', '#2d2f34');
        elementRoot.style.setProperty('--overlay-light-color', '#383b40');
        elementRoot.style.setProperty('--active-color', '#9d3030');
        elementRoot.style.setProperty('--text-shadow-color', 'rgba(0, 0, 0, .75)');
        elementRoot.style.setProperty('--font-color', 'white');
    }
    isDark = !isDark;
}

document.querySelector('.header-logo').addEventListener('click', changeTheme);
