
(function (canvas) {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var w = canvas.width;
        var h = canvas.height;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';

        var spawnRadius = 300;
        var speed = spawnRadius / 50;

        var init = [];
        var maxParts = 500;
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
            ctx.clearRect(0, 0, w, h);
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

        setInterval(draw, 30);

    }

})($('.hyperspace'));
