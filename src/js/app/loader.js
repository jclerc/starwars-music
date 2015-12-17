
(function () {

    var preloadImage = function (url) {
        var img = new Image();
        img.src = url;
    };

    App.init = function () {

        var images = $$('img');
        for (var i = images.length - 1; i >= 0; i--) {
            preloadImage(images[i].src);
        }

        window.addEventListener('load', function () {
            App.goto('home', false);
        });

    };

})();
