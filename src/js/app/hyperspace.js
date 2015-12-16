
window.GLOBAL_SPEED = 0.1;
window.HYPERSPACE = true;

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
            if (window.HYPERSPACE) {    
                window.requestAnimationFrame(loop);
            }

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
                context.shadowColor = "#555";
                context.beginPath();
                context.moveTo(s.x, s.y);
                context.lineTo(s.x + 0.1 + s.length * s.xs * window.GLOBAL_SPEED, s.y + s.length * s.ys * window.GLOBAL_SPEED);
                context.stroke();
                s.x += s.xs * window.GLOBAL_SPEED;
                s.y += s.ys * window.GLOBAL_SPEED;
            }

        })();
    }

})($('.hyperspace'));
