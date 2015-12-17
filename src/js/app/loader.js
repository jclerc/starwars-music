
(function () {

    var preloadImages = function (urls) {
        for (var i = urls.length - 1; i >= 0; i--) {
            var img = new Image();
            img.src = urls[i];
        }
    };

    App.init = function () {

        preloadImages([
            'img/film-1.jpg',
            'img/film-2.jpg',
            'img/film-3.jpg',
            'img/film-4.jpg',
            'img/film-5.jpg',
            'img/film-6.jpg',
            'img/film-7.jpg',
            'img/lock.svg',
            'img/star-wars-logo.svg',
            'img/starship-left.png',
            'img/starship-right.png',
            'img/vote-left.jpg',
            'img/vote-right.jpg',
        ]);

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
