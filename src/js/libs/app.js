/**
 * Create App object
 *
 */

var App = {},
    $ = document.querySelector.bind(document),
    $$ = document.querySelectorAll.bind(document);

(function () {

    App.goto = function (identifier, gotoUp) {
        var current = $('section.visible'),
            next = $('.page.' + identifier),
            direction = gotoUp ? 'up' : 'down';

        if (!next || typeof gotoUp !== 'boolean') {
            throw new Error('Wrong arguments: ' + next + ', ' + gotoUp);
        } else if (current == next) {
            throw new Error('Moving to the same page..');
        } else {
            if (current) {
                var currentName = current.getAttribute('data-page');
                App.call(currentName, 'unloading');
                current.classList.remove('visible');
                current.classList.add('exit-' + direction);
                current.addEventListener('animationend', function animationend(e) {
                    App.call(currentName, 'unloaded');
                    current.removeEventListener('animationend', animationend);
                    current.classList.remove('exit-' + direction);
                });
            }
            App.call(identifier, 'loading');
            next.classList.add('visible');
            next.classList.add('enter-' + direction);
            next.addEventListener('animationend', function animationend(e) {
                App.call(identifier, 'loaded');
                next.removeEventListener('animationend', animationend);
                next.classList.remove('enter-' + direction);
                if (identifier !== 'home') {
                    App.setLocation(identifier);
                }
            });
        }
    };

    App.home = function () {
        // Rerun the page to restart the canvas
        if (window.location.href) {
             window.location.href = window.location.href.substring(0, window.location.href.indexOf('#') - 1);
        } else {
            window.location.reload();
        }
    };

    var isChangingHash = false;

    App.setLocation = function (hash) {
        isChangingHash = true;
        window.location.hash = '#/' + hash;
        setTimeout(function () {
            isChangingHash = false;
        }, 1);
    };

    App.gotoHash = function (homeFallback) {
        if (isChangingHash) return;
        if (window.location.hash && window.location.hash.length > 2) {
            var hash = window.location.hash.substring(2),
                page = $('.page.' + hash);

            if (hash === 'home') {
                App.home();
                return;
            } else if (page && page.classList.contains('page')) {
                var current = $('section.visible');
                if (current) {
                    current.classList.remove('visible');
                    var currentName = current.getAttribute('data-page');
                    App.call(currentName, 'unloading');
                    App.call(currentName, 'unloaded');
                }
                page.classList.add('visible');
                App.call(hash, 'loading');
                App.call(hash, 'loaded');
                window.HYPERSPACE = false;
                return;
            }
        }
        if (homeFallback) {
            App.home();
        }
    };

    var callbacks = {};
    
    App.call = function (page, state) {
        if (callbacks[page] && callbacks[page][state]) {
            for (var i = callbacks[page][state].length - 1; i >= 0; i--) {
                callbacks[page][state][i]();
            }
        }
    };

    App.bind = function (page, state, callback) {
        if (!callbacks[page]) {
            callbacks[page] = {};
        }
        if (!callbacks[page][state]) {
            callbacks[page][state] = [];
        }
        callbacks[page][state].push(callback);
    };

})();

