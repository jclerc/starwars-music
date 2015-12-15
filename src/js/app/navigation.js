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
            current.addEventListener('animationend', function (e) {
                current.classList.remove('exit-' + direction);
            });
        }
        next.classList.add('visible');
        next.classList.add('enter-' + direction);
        next.addEventListener('animationend', function (e) {
            next.classList.remove('enter-' + direction);
        });
    }
};

var bindNavigation = function (element) {
    element.addEventListener('click', function (e) {
        App.goto(this.getAttribute('data-target'), this.getAttribute('data-direction') === 'up');
    });
};

var elements = $$('.begin');
for (var i = elements.length - 1; i >= 0; i--) {
    bindNavigation(elements[i]);
}
