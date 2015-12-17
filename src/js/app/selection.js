/**
 * Episode selection
 *
 */

(function () {

    var select = {
        lastMove: 0,
        leftOffset: window.screen.width / 2 - 100,
        rightOffset: 0,
        screenScale: (100 - 100 / 1.75),
        selectCards: $('.select .cards')
    };

    select.percentDivisor = window.screen.width - select.rightOffset - select.leftOffset;

    var selectionListener = function(event) {
        var now = new Date().getTime();
        if (select.lastMove < now - 20) {

            select.lastMove = now;
            var percent = (event.screenX - select.leftOffset) / select.percentDivisor;
            
            if (percent < 0) {
                percent = 0;
            } else if (percent > 1) {
                percent = 1;
            }

            select.selectCards.style.transform = 'translateZ(0) translateX(-' + percent * select.screenScale + '%)';
        }
    };

    App.bind('select', 'loading', function () {
        document.addEventListener('mousemove', selectionListener);
    });

    App.bind('select', 'unloading', function () {
        document.removeEventListener('mousemove', selectionListener);
    });

})();
