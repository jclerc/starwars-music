
(function () {

    var GLOBAL_SPEED = 0.1,
        HYPERSPACE_RUN = true;

    App.bind('home', 'unloading', function () {
        var interval = setInterval(function () {
            GLOBAL_SPEED = (GLOBAL_SPEED + 0.1) * 1.3;
            if (GLOBAL_SPEED > 70) {
                clearInterval(interval);
            }
        }, 100);

        var home = $('.page.home'),
            select = $('.page.select');

        // select.addEventListener('animationend', function begin(e) {
        //     select.removeEventListener('animationend', begin);
        // });

        home.classList.add('exit-hyperspace');
        select.classList.add('enter-hyperspace');
    });

    App.bind('home', 'unloaded', function () {
        HYPERSPACE_RUN = false;

        var home = $('.page.home'),
            select = $('.page.select');

        home.classList.remove('visible');
        home.classList.remove('exit-hyperspace');
        select.classList.remove('enter-hyperspace');
    });

    (function (canvas) {

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        if (canvas.getContext) {
            var context = canvas.getContext('2d'),
                width = canvas.width,
                height = canvas.height,
                starsCount = 100,
                centerRadius = 100,
                length = 10,
                stars = [];

            var createStar = function () {
                var randomX = Math.random(),
                    randomY = Math.random(),
                    color = ~~(Math.random() * 80 + 20);

                return {
                    x: randomX * width,
                    y: randomY * height,
                    xs: (randomX * width - width/2) / 500,
                    ys: (randomY * height - height/2) / 500,
                    size: ~~(color / 20),
                    length: Math.random() * length,
                    color: 'rgb(' + color + ', ' + color + ', ' + ~~(color + Math.random() * 20) + ')'
                };
            };

            for (var i = 0; i < starsCount; i++) {
                stars.push(createStar());
            }

            (function loop() {
                if (HYPERSPACE_RUN) {

                    window.requestAnimationFrame(loop);
                    context.clearRect(0, 0, width, height);

                    for (var i = 0; i < starsCount; i++) {
                        var s = stars[i];
                        if (s.x < 0 || s.y < 0 || s.x > width || s.y > height) {
                            s = stars[i] = createStar();
                        }
                        context.strokeStyle = s.color;
                        context.lineWidth = s.size;
                        context.shadowBlur = 5;
                        context.lineCap = 'round';
                        context.shadowColor = '#555';
                        context.beginPath();
                        context.moveTo(s.x, s.y);
                        context.lineTo(s.x + 0.1 + s.length * s.xs * GLOBAL_SPEED, s.y + s.length * s.ys * GLOBAL_SPEED);
                        context.stroke();
                        s.x += s.xs * GLOBAL_SPEED;
                        s.y += s.ys * GLOBAL_SPEED;
                    }
                }
            })();
        }

    })($('.hyperspace'));

})();