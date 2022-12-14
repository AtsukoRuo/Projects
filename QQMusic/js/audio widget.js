class AudioPlayer {
    isClosed = false;
    isPlaying = true;
    audioPrePath = "resource/audio/";
    figurePrePath = "resource/figure/";
    init(index) {
        this.isPlaying = true;
        audioPlayImgDOM.src = "resource/figure/暂停.png";
        audioBallDOM.style.transform = "translateX(0px)";
        audioProcessDOM.style.transform = "translateX(-100%)";
        customAudio.src = this.audioPrePath + music_set[index].src;
        audioHoverBallImg.src = audioImgDOM.src = this.figurePrePath + music_set[index].image;
        audioTitleDOM.textContent = music_set[index].title;
        setInterval(this.#calcPositionDOM, 1000);
    }


    changePlaying() {
        if (this.isPlaying) {
            customAudio.pause();
            audioPlayImgDOM.src = "resource/figure/24gf-playCircle.png";

        } else {
            customAudio.play();
            audioPlayImgDOM.src = "resource/figure/暂停.png";
        }
        this.isPlaying = !this.isPlaying;
    }
    setTime(factor) {
        customAudio.currentTime = customAudio.duration * factor;
        this.#calcPositionDOM();
    }
    #calcPositionDOM() {
        let factor = customAudio.currentTime / customAudio.duration;
        let ballOffset = 234 * factor;
        let processOffset = -100 + factor * 100;
        audioBallDOM.style.transform = `translateX(${ballOffset}px)`;
        audioProcessDOM.style.transform = `translateX(${processOffset}%)`;
    }
}


var audioPlayer = new AudioPlayer();
var audioDOM = document.querySelector('.audio-player');
var audioImgDOM = document.querySelector('.audio-player-img img');
var audioTitleDOM = document.querySelector('.audio-player-title');
var audioBallDOM = document.querySelector('.audio-player-process-bar-ball');
var audioProcessDOM = document.querySelector('.audio-player-process-bar-played');
var aduioProcessBarDOM = document.querySelector('.audio-player-process-bar-wrapper');
var audioPlayImgDOM = document.querySelector('.audio-player-play img');
var audioProcessTimeDOM = document.querySelector('.audio-player-process-bar-time');
var audioCloseDOM = document.querySelector('.audio-player-close');
var audioHoverBall = document.querySelector('.audio-hover-ball');
var audioHoverBallImg = document.querySelector('.audio-hover-ball img');


audioPlayImgDOM.addEventListener('click', (e) => {
    audioPlayer.changePlaying();
});
aduioProcessBarDOM.addEventListener('click', (e) => {
    audioPlayer.setTime((e.clientX - aduioProcessBarDOM.getBoundingClientRect().left) / 234);
});

aduioProcessBarDOM.addEventListener('mousemove', (e) => {
    let offset = e.clientX - aduioProcessBarDOM.getBoundingClientRect().left;
    let factor = offset / 234;
    let currentTime = customAudio.duration * factor;
    let min = Math.floor(currentTime / 60);
    let sec = Math.floor(currentTime) % 60;
    if (sec < 10) sec = '0' + sec;
    audioProcessTimeDOM.textContent = `${min}:${sec}`;
    audioProcessTimeDOM.style.left = `${offset}px`;
});

audioCloseDOM.addEventListener('click', (e) => {
    audioDOM.classList.add('audio-player-removed');
    setTimeout(() => {
        audioDOM.style.visibility = "hidden";
        audioHoverBall.classList.remove('audio-hover-ball-removed');
    }, 300);
});

audioHoverBall.addEventListener('click', (e) => {
    audioDOM.style.visibility = 'visible';
    audioDOM.classList.remove('audio-player-removed');
    audioHoverBall.classList.add('audio-hover-ball-removed');
});
document.querySelectorAll('.actionBtn-following').forEach((element) => {
    element.addEventListener('click', (e) => {
        if (element.textContent === "已关注") return;
        element.style.filter = "brightness(70%)";
        element.textContent = "已关注";
        sendMessageToTip('关注成功', 'success');
    });
});