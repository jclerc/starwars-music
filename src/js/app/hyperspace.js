
(function (canvas) {

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
