
(function () {

    var buttons = $$('.button-vote');
    var bindVote = function (elt) {
        elt.addEventListener('click', function (e) {
            for (var i = buttons.length - 1; i >= 0; i--) {
                buttons[i].innerHTML = "Je vote";
            }
            elt.innerHTML = "Vote validé !";
        });
    };

    for (var i = buttons.length - 1; i >= 0; i--) {
        bindVote(buttons[i]);
    }

})();
