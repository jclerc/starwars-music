window.TOGGLE_SELECTION_LISTENER = function(event) {
    var offset = 150,
        percent = (event.screenX - offset) / (window.screen.width - offset * 2) * 100;
    percent = Math.max(Math.min(percent, 100), 0);

    var scaled = percent * (100 - 100 / 1.75) / 100;
    $('.select .cards').style.transform = 'translateZ(0) translateX(-' + scaled + '%)';
};

App.toggleSelection = function(state) {
    if (state) {
        document.addEventListener('mousemove', window.TOGGLE_SELECTION_LISTENER);
    } else {
        document.removeEventListener('mousemove', window.TOGGLE_SELECTION_LISTENER);
    }
};
