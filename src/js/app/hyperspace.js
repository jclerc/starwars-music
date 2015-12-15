
window.globalSpeed = 0.1;

$('.begin').addEventListener('click', function (e) {
    var interval = setInterval(function () {
        window.globalSpeed = (window.globalSpeed + 0.1) * 1.3;
        if (window.globalSpeed > 70) {
            clearInterval(interval);
        }
    }, 100);
    setTimeout(function () {
        $('.home').classList.add('exit-hyperspace');
        $('.select').classList.add('enter-hyperspace');
    }, 2000);
});

(function (canvas) {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d'),
            w = canvas.width,
            h = canvas.height,
            starsCount = 100,
            globalSpeed = 0.1,
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

        window.stars = stars;
        window.globalSpeed = globalSpeed;
        window.createStar = createStar;

        for (var i = 0; i < starsCount; i++) {
            stars.push(createStar(false));
        }

        (function loop() {
            window.requestAnimationFrame(loop);
            // window.loop = loop;

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
                ctx.lineTo(s.x + 0.1 + s.length * s.xs * window.globalSpeed, s.y + s.length * s.ys * window.globalSpeed);
                ctx.stroke();
                s.x += s.xs * window.globalSpeed;
                s.y += s.ys * window.globalSpeed;
            }

        })();
    }

})($('.hyperspace'));






(function (canvas) {
    if (1) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.PARTICLE_SPEED = 25;

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var w = canvas.width;
        var h = canvas.height;
        var particles = [];
            window.particles = particles;

        (function loop() {
            window.requestAnimationFrame(loop);
            // window.loop = loop;

            ctx.clearRect(0, 0, w, h);

            ctx.lineCap = 'round';

            var spawnRadius = 300,
                speed = window.PARTICLE_SPEED,
                length = 500,
                maxParticules = 100;

            window.createParticle = function createParticle() {
                var randomX = Math.random() * spawnRadius - spawnRadius / 2,
                    randomY = Math.random() * spawnRadius - spawnRadius / 2,
                    x = w/2 + randomX,
                    y = h/2 + randomY,
                    color = ~~(Math.random() * 80 + 20);

                return {
                    x: x,
                    y: y,
                    xs: randomX / 500,
                    ys: randomY / 500,
                    size: ~~(color / 20),
                    length: Math.random() * length,
                    color: 'rgb(' + color + ', ' + color + ', ' + color + ')'
                };
            };

            if (particles.length < 300) {
                particles.push(createParticle());
            }

            for (var i = particles.length - 1; i >= 0; i--) {
                var p = particles[i];
                if (p.x < 0 || p.y < 0 || p.x > w || p.y > h) {
                    p = particles[i] = createParticle();
                }
                ctx.strokeStyle = p.color;
                ctx.lineWidth = p.size;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p.x + p.length * p.xs, p.y + p.length * p.ys);
                ctx.stroke();
                p.x += p.xs * speed;
                p.y += p.ys * speed;
            }

/*
            var spawnRadius = 300;
            var speed = spawnRadius / 50;

            var init = [];
            var maxParts = 100;
            for (var a = 0; a < maxParts; a++) {
                var initX = w / 2 + Math.random() * spawnRadius - spawnRadius / 2;
                var initY = h / 2 + Math.random() * spawnRadius - spawnRadius / 2;

                var r = Math.round(Math.random() * 255);
                var g = Math.round(Math.random() * 255);
                var b = Math.round(Math.random() * 255);

                init.push({
                    x: initX,
                    y: initY,
                    xs: (initX - w / 2) / speed,
                    ys: (initY - h / 2) / speed,
                    l: Math.random() * 10,
                    color: 'rgb(' + r + ',' + g + ',' + b + ')'
                });
            }

            var particles = [];
            for (var i = 0; i < maxParts; i++) {
                particles[i] = init[i];
            }

            var draw = function () {
                for (var c = 0; c < particles.length; c++) {
                    var p = particles[c];
                    ctx.strokeStyle = 'rgba(255,255,255,' + p.l / 20 + ')';
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
                    ctx.stroke();
                }
                move();
            };

            var move = function () {
                for (var j = 0; j < particles.length; j++) {
                    var p = particles[j];
                    p.x += p.xs;
                    p.y += p.ys;

                    // if particle position exceeds the canvas
                    if (p.x < 0 || p.y < 0 || p.x > w || p.y > h) {
                        p.x = w / 2 + Math.random() * spawnRadius - spawnRadius / 2;
                        p.y = h / 2 + Math.random() * spawnRadius - spawnRadius / 2;
                        p.xs = (p.x - w / 2) / speed;
                        p.ys = (p.y - h / 2) / speed;
                    }
                }
            };

            draw();
*/

        })();

    }

})($('.hyperspace'));
