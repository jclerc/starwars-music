
window.GLOBAL_SPEED = 0.1;
window.HYPERSPACE = true;

$('.begin').addEventListener('click', function (e) {
    var interval = setInterval(function () {
        window.GLOBAL_SPEED = (window.GLOBAL_SPEED + 0.1) * 1.3;
        if (window.GLOBAL_SPEED > 70) {
            clearInterval(interval);
        }
    }, 100);
    setTimeout(function () {
        $('.home').classList.add('exit-hyperspace');
        $('.select').classList.add('enter-hyperspace');
    }, 2000);
    setTimeout(function () {
        window.HYPERSPACE = false;
    }, 3000);
});

(function (canvas) {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d'),
            w = canvas.width,
            h = canvas.height,
            starsCount = 100,
            GLOBAL_SPEED = 0.1,
            length = 10,
            stars = [];

        ctx.lineCap = 'round';

        var createStar = function (atCenter) {
            var randomX, randomY;

            if (atCenter) {
                randomX = Math.random() * 100 - 100 / 2;
                randomY = Math.random() * 100 - 100 / 2;
            } else {
                randomX = Math.random() * w;
                randomY = Math.random() * h;
            }

            var x = atCenter ? w/2 : 0 + randomX,
                y = atCenter ? h/2 : 0 + randomY,
                color = ~~(Math.random() * 80 + 20);

            return {
                x: x,
                y: y,
                xs: (randomX - w/2) / 500,
                ys: (randomY - h/2) / 500,
                size: ~~(color / 20),
                length: Math.random() * length,
                color: 'rgb(' + color + ', ' + color + ', ' + ~~(color + Math.random() * 20) + ')'
            };
        };

        for (var i = 0; i < starsCount; i++) {
            stars.push(createStar(false));
        }

        (function loop() {
            if (window.HYPERSPACE) {    
                window.requestAnimationFrame(loop);
            }

            ctx.clearRect(0, 0, w, h);

            for (var i = 0; i < starsCount; i++) {
                var s = stars[i];
                if (s.x < 0 || s.y < 0 || s.x > w || s.y > h) {
                    s = stars[i] = createStar(false);
                }
                ctx.strokeStyle = s.color;
                ctx.lineWidth = s.size;
                ctx.shadowBlur = 5;
                ctx.shadowColor = "#555";
                ctx.beginPath();
                ctx.moveTo(s.x, s.y);
                ctx.lineTo(s.x + 0.1 + s.length * s.xs * window.GLOBAL_SPEED, s.y + s.length * s.ys * window.GLOBAL_SPEED);
                ctx.stroke();
                s.x += s.xs * window.GLOBAL_SPEED;
                s.y += s.ys * window.GLOBAL_SPEED;
            }

        })();
    }

})($('.hyperspace'));
