/**
 * Navigation between pages
 *
 */

(function () {

    // Bind begin button to hyperspace animation
    $('.begin').addEventListener('click', function (e) {
        App.call('home', 'unloading');
        App.call('select', 'loading');
        var select = $('.page.select');
        select.addEventListener('animationend', function begin(e) { 
            select.removeEventListener('animationend', begin);
            App.call('home', 'unloaded');
            App.call('select', 'loaded');
            $('.page.select').classList.add('visible');
            App.setLocation('select');
        });
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

})();
