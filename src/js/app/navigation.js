/**
 * Navigation between pages
 *
 */

App.goto = function (identifier, isUp) {
    var current = $('section.visible'),
        next = $('.' + identifier),
        direction = isUp ? 'up' : 'down';

    if (!next || typeof isUp !== 'boolean') {
        throw new Error('Wrong arguments');
    } else {
        if (current) {
            current.classList.remove('visible');
            current.classList.add('exit-' + direction);
        }
        next.classList.add('visible');
        next.classList.add('enter-' + direction);        
    }
};
