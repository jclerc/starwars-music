/**
 * Navigation between pages
 *
 */

App.goto = function (identifier, gotoUp) {
    var current = $('section.visible'),
        next = $('.' + identifier),
        direction = gotoUp ? 'up' : 'down';

    if (!next || typeof gotoUp !== 'boolean') {
        throw new Error('Wrong arguments: ' + next + ', ' + gotoUp);
    } else if (current == next) {
        throw new Error('Moving to the same page..');
    } else {
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

App.setLocation = function (hash) {
    window.location.hash = '#/' + hash;
};

$('.begin').addEventListener('click', function (e) {
    var interval = setInterval(function () {
        window.GLOBAL_SPEED = (window.GLOBAL_SPEED + 0.1) * 1.3;
        if (window.GLOBAL_SPEED > 70) {
            clearInterval(interval);
        }
    }, 100);
    var home = $('.home'),
        select = $('.select');
    home.classList.add('exit-hyperspace');
    select.classList.add('enter-hyperspace');
    home.addEventListener('animationend', function begin(e) { 
        home.removeEventListener('animationend', begin);
        window.HYPERSPACE = false;
        home.classList.remove('visible');
        select.classList.add('visible');
        App.setLocation('select');
    });
});

window.addEventListener('hashchange', function (e) {
    e.preventDefault();
});

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

if (window.location.hash && window.location.hash.length > 2) {
    var hash = '.' + window.location.hash.substring(2),
        page = $(hash);
    if (page && page.classList.contains('page')) {
        var current = $('section.visible');
        if (current) current.classList.remove('visible');
        page.classList.add('visible');
    }
}

