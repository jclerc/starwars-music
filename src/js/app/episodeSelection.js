
window.EPISODE_SELECTION = {
    lastMove: 0,
    leftOffset: window.screen.width / 2 - 100,
    rightOffset: 0,
    screenScale: (100 - 100 / 1.75),
    selectCards: $('.select .cards')
};

window.EPISODE_SELECTION.percentDivisor = window.screen.width - window.EPISODE_SELECTION.rightOffset - window.EPISODE_SELECTION.leftOffset;

window.TOGGLE_SELECTION_LISTENER = function(event) {
    var now = new Date().getTime();
    if (window.EPISODE_SELECTION.lastMove < now - 20) {

        window.EPISODE_SELECTION.lastMove = now;
        var percent = (event.screenX - window.EPISODE_SELECTION.leftOffset) / window.EPISODE_SELECTION.percentDivisor;
        
        if (percent < 0) {
            percent = 0;
        } else if (percent > 1) {
            percent = 1;
        }

        window.EPISODE_SELECTION.selectCards.style.transform = 'translateZ(0) translateX(-' + percent * window.EPISODE_SELECTION.screenScale + '%)';
    }
};

App.toggleSelection = function(state) {
    if (state) {
        document.addEventListener('mousemove', window.TOGGLE_SELECTION_LISTENER);
    } else {
        document.removeEventListener('mousemove', window.TOGGLE_SELECTION_LISTENER);
    }
};
