
function AmbientLight(video, ambient) {
    this.video = video;
    this.ambient = ambient;
    this.light1 = ambient.querySelector('.light-1');
    this.light2 = ambient.querySelector('.light-2');
    this.interval = -1;
}

AmbientLight.prototype.play = function() {
    this.ambient.classList.add('active');
    var self = this;

    this.interval = setInterval(function () {

        var applyTo = self.light1.classList.contains('active') ? self.light2 : self.light1;

        // We show a 1x1 canvas in 100% width/height

        if (!applyTo.children[0]) {
            // If canvas doesn't exist, we create it
            var canvas = document.createElement('canvas'),
                context = canvas.getContext('2d');

            canvas.width = 1;
            canvas.height = 1;
            canvas.classList.add('background');

            applyTo.appendChild(canvas);
        }

        applyTo.children[0].getContext('2d').drawImage(self.video, 0, 0, 1, 1);

        // As we can't do transition on gradient, we use 2 layers
        // And we apply gradient to one, and do a transition on opacity
        // Then next time we apply gradient to other one, etc...
        self.light1.classList.toggle('active');
        self.light2.classList.toggle('active');

    }, 1000);
};

AmbientLight.prototype.stop = function() {
    this.ambient.classList.remove('active');
    clearInterval(this.interval);
};
