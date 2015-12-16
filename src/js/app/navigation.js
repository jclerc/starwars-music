/**
 * Navigation between pages
 *
 */

App.goto = function (identifier, gotoUp) {
    var current = $('section.visible'),
        next = $('.page.' + identifier),
        direction = gotoUp ? 'up' : 'down';

    if (!next || typeof gotoUp !== 'boolean') {
        throw new Error('Wrong arguments: ' + next + ', ' + gotoUp);
    } else if (current == next) {
        throw new Error('Moving to the same page..');
    } else {
        App.toggleSelection(identifier === 'select');
        if (current) {
            current.classList.remove('visible');
            current.classList.add('exit-' + direction);
            current.addEventListener('animationend', function animationend(e) {
                current.removeEventListener('animationend', animationend);
                current.classList.remove('exit-' + direction);
            });
        }
        next.classList.add('visible');
        next.classList.add('enter-' + direction);
        next.addEventListener('animationend', function animationend(e) {
            next.removeEventListener('animationend', animationend);
            next.classList.remove('enter-' + direction);
            App.setLocation(identifier);
        });
    }
};

App.home = function () {
    // Rerun the page to restart the canvas
    window.location.href = window.location.href;
};

App.gotoHash = function (homeFallback) {
    if (window.location.hash && window.location.hash.length > 2) {
        var page = $('.page.' + window.location.hash.substring(2));
        if (page && page.classList.contains('page')) {
            var current = $('section.visible');
            if (current) current.classList.remove('visible');
            page.classList.add('visible');
            App.toggleSelection(page.classList.contains('select'));
            window.HYPERSPACE = false;
            return;
        }
    }
    if (homeFallback) {
        App.home();
    }
};

App.setLocation = function (hash) {
    window.location.hash = '#/' + hash;
};

// Bind begin button to hyperspace animation
$('.begin').addEventListener('click', function (e) {
    TOGGLE_SELECTION_LISTENER(e);
    var interval = setInterval(function () {
        window.GLOBAL_SPEED = (window.GLOBAL_SPEED + 0.1) * 1.3;
        if (window.GLOBAL_SPEED > 70) {
            clearInterval(interval);
        }
    }, 100);
    var home = $('.page.home'),
        select = $('.page.select');
    select.addEventListener('animationend', function begin(e) { 
        select.removeEventListener('animationend', begin);
        window.HYPERSPACE = false;
        home.classList.remove('visible');
        home.classList.remove('exit-hyperspace');
        select.classList.add('visible');
        select.classList.remove('enter-hyperspace');
        App.setLocation('select');
    });
    home.classList.add('exit-hyperspace');
    select.classList.add('enter-hyperspace');
    App.toggleSelection(true);
});

// Bind navigation elements to animations
var bindNavigation = function (element) {
    element.addEventListener('click', function (e) {
        App.goto(this.getAttribute('data-target'), this.getAttribute('data-direction') === 'up');
        e.preventDefault();
    });
};

var elements = $$('.navigation');
for (var i = elements.length - 1; i >= 0; i--) {
    bindNavigation(elements[i]);
}

// Change page if hash change
window.addEventListener('hashchange', App.gotoHash);

// If a hash is already set
App.gotoHash(false);

