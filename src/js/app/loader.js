
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
            var loader = $('section.loader');
            if (loader) {
                loader.addEventListener('transitionend', function () {
                    loader.classList.remove('visible', 'fade-out');
                });
                loader.classList.add('fade-out');
            }
            if (window.location.hash && window.location.hash.length > 2) {
                var hash = window.location.hash.substring(2),
                    page = $('.page.' + hash);

                if (page && page.classList.contains('page')) {
                    page.classList.add('visible');
                    App.call(hash, 'loading');
                    App.call(hash, 'loaded');
                    return;
                }
            }
            $('.page.home').classList.add('visible');
            App.call('home', 'loading');
            App.call('home', 'loaded');
        });

    };

})();
