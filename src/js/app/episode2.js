
(function () {

    var episodeIsPlaying = false;

    var canvas = $('.episode-2 .canvas');
    var canvasEnergy = $('.episode-2 .drawing canvas');
    var video = $('.episode-2 .video');
    var ambientLight = new AmbientLight(video, $('.episode-2 .ambient'));

    if (!canvas || !canvas.getContext) return;

    canvas.width = 500;
    canvas.height = 500;
    canvasEnergy.width = window.innerWidth;
    canvasEnergy.height = window.innerHeight;
    var context = canvas.getContext('2d'),
        energyCtx = canvasEnergy.getContext('2d'),
        width = canvas.width,
        height = canvas.height,
        energyWidth = canvasEnergy.width,
        energyHeight = canvasEnergy.height;

    var frequency = 30,
        amplitudeCount = 30,
        frequencyCount = 40;

    // Tutorial from: http://apprentice.craic.com/tutorials/30

    var audioContext;
    var audioBuffer;
    var sourceNode;
    var analyserNode;
    var javascriptNode;
    var audioData = null;
    var audioPlaying = false;
    var sampleSize = 1024;
    var amplitudeArray;
    var frequencyArray;
    var audioUrl = 'media/episode2.mp3';
    var middleWidth = ~~(energyWidth / 2);
    var middleHeight = ~~(energyHeight / 2);
    var lastDraw = 0;
    var averageVolume = 0;
    var particles = [];

    var render = (function() {

        var circles = [];
        var initialized = false;
        var height = 0;
        var width = 0;
        var init = function(config) {
            var count = config.count;
            width = config.width;
            height = config.height;
            var circleMaxWidth = (width * 0.106) >> 0;
            var circlesEl = document.getElementById('circles');
            for (var i = 0; i < count; i++) {
                var node = document.createElement('div');
                node.style.width = node.style.height = (i / count * circleMaxWidth) + 'px'; // increase the with and height of the circles
                node.classList.add('circle'); // show circle
                circles.push(node); // adds new circles
                circlesEl.appendChild(node);
               }
            initialized = true;
        };

        var max = 256;

        // make circles until he can't display another circle in the div
        var renderFrame = function(frequencyData) {

          /* Var for change gradient and opacity */
          var color_gradient = 0;
          var increment_value = 16;
          var opacity = 0;
          var opacity_value = 0.05;

            for (var i = 0; i < circles.length; i++) {
                var circle = circles[i];
                // Scale dynamicaly permit to change the height/width with the FrequancyData of the song
                //and divided by max to control the radius
                circle.style.cssText = '-webkit-transform:scale(' + ((frequencyData[i] / max)) + ')';
                //setTimeout(function(){ atom.style.display = 'block'; }, 9900);


                /* Condition who change dynamicaly the value of the rgba */
                  if(i < circles.length / 2 )
                  {
                    color_gradient += increment_value;
                    if(i < 1/ 1.5) {
                      opacity += opacity_value;
                    } else {
                        opacity += opacity_value;
                    }
                  }
                  else
                  {
                    color_gradient -= increment_value;
                  }

                  // change the color of the circles
                  circle.style.backgroundColor = 'rgba(0,0,'  + color_gradient + ',' + opacity_value + ')';
           }
        };
        return {
            init: init,
            isInitialized: function() {
                return initialized;
            },
            renderFrame: renderFrame
        };
        
    })();

    var setupAudioNodes = function () {
        sourceNode     = audioContext.createBufferSource();
        analyserNode   = audioContext.createAnalyser();
        javascriptNode = audioContext.createScriptProcessor(sampleSize, 1, 1);

        // Create the array for the data values
        amplitudeArray = new Uint8Array(analyserNode.frequencyBinCount);
        frequencyArray = new Uint8Array(analyserNode.frequencyBinCount);
        // Now connect the nodes together
        sourceNode.connect(audioContext.destination);
        sourceNode.connect(analyserNode);
        analyserNode.connect(javascriptNode);
        // analyserNode.fftSize = 64;
        javascriptNode.connect(audioContext.destination);
    };

    // Load the audio from the URL via Ajax and store it in global variable audioData
    // Note that the audio load is asynchronous
    var loadSound = function (url) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';
        // When loaded, decode the data and play the sound
        request.onload = function () {
            audioContext.decodeAudioData(request.response, function (buffer) {
                audioData = buffer;
                playSound(audioData);
            }, onError);
        };
        request.send();
    };

    // Play the audio and loop until stopped
    var playSound = function (buffer) {
        sourceNode.buffer = buffer;
        // sourceNode.start();    // Play the sound now
        sourceNode.start(0);
        sourceNode.loop = true;
        audioPlaying = true;
    };

    var onError = function (e) {
        console.warn(e);
    };

    var getAverageVolume = function (array) {
        var values = 0;
        var average;
 
        var length = array.length;
 
        // get all the frequency amplitudes
        for (var i = 0; i < length; i++) {
            values += array[i];
        }
 
        average = values / length;
        return average;
    };

    var create_particle = function () {
        var particle = {};
        // position where the particle come
        particle.x = 250;
        particle.y = 250;
        particle.speed = {};
        particle.speed.x = Math.random() * 10 - 5;
        particle.speed.y = Math.random() * 10 - 5;

        particle.style = 'white'; // color gradient
        particle.radius = 1; // made round particle
        return particle;
    };

    var draw = function () {
        for(var i = 0; i < particles.length; i++) {
            var particle = particles [ i ];

            if (particle.x < 0 || particle.x > canvas.width || particle.y < 0 || particle.y > canvas.height) {
                particle = particles[i] = create_particle();
            }

            particle.x += particle.speed.x;
            particle.y += particle.speed.y;

            context.beginPath();
            context.fillStyle = particle.style;
            context.arc( particle.x, particle.y, particle.radius, 0, Math.PI * 2); // send particle at 360 degree
            context.fill();
        }
    };

    var drawSound = function () {
        if (episodeIsPlaying) {
            clearCanvas();
            draw();

            render.renderFrame(frequencyArray);

            var k, i, value = 0;
            energyCtx.strokeStyle = 'white';
            energyCtx.shadowBlur = 100;
            energyCtx.shadowColor = 'rgb(20, 20, 220)';

            // FREQUENCY VARIABLE

            var frenquencyLength = frequencyArray.length - 300;
            var frenquencyOffset = ~~(frenquencyLength / frequencyCount);
            var frequencyDraw = ~~(middleWidth / frequencyCount);

            // DOUBLE FREQUENCY ARC - SYMMETRIC

            energyCtx.lineWidth = ~~(3 + Math.random() * 6);
            energyCtx.beginPath();
            energyCtx.moveTo(0, middleHeight);

            k = 0;
            for (i = frenquencyLength - frenquencyOffset; i >= 0; i -= frenquencyOffset) {
                k++;
                value = frequencyArray[i + 5] / 256;
                energyCtx.lineTo(k * frequencyDraw, energyHeight - middleHeight - (value * middleHeight));
            }

            k = 0;
            for (i = 0; i < frenquencyLength - frenquencyOffset * 2; i += frenquencyOffset) {
                k++;
                value = frequencyArray[i + 5] / 256;
                energyCtx.lineTo(middleWidth + k * frequencyDraw, energyHeight - middleHeight - (value * middleHeight));
            }
            energyCtx.lineTo(energyWidth, middleHeight);
            energyCtx.stroke();

            energyCtx.lineWidth = ~~(3 + Math.random() * 6);
            energyCtx.beginPath();
            energyCtx.moveTo(0, middleHeight);

            k = 0;
            for (i = frenquencyLength - frenquencyOffset; i >= 0; i -= frenquencyOffset) {
                k++;
                value = frequencyArray[i + 5] / 256;
                energyCtx.lineTo(k * frequencyDraw, energyHeight - middleHeight + (value * middleHeight));
            }

            k = 0;
            for (i = 0; i < frenquencyLength - frenquencyOffset * 2; i += frenquencyOffset) {
                k++;
                value = frequencyArray[i + 5] / 256;
                energyCtx.lineTo(middleWidth + k * frequencyDraw, energyHeight - middleHeight + (value * middleHeight));
            }

            energyCtx.lineTo(energyWidth, middleHeight);
            energyCtx.stroke();

        }
    };

    var clearCanvas = function () {
        context.clearRect(0, 0, width, height);
        energyCtx.clearRect(0, 0, energyWidth, energyHeight);
    };

    try {
        audioContext = new AudioContext();
    } catch (ex) {
        console.warn('Web Audio API is not supported in this browser');
    }

    for (var i = 0; i < 100; i++) {
        particles.push(create_particle());
    }


    App.bind('episode-2', 'loaded', function () {
        episodeIsPlaying = true;

        setupAudioNodes();
        video.currentTime = 0;
        video.play();
        ambientLight.play();

        if (!render.isInitialized()) {
            render.init({
                // count: analyserNode.frequencyBinCount,
                count: 10,
                width: 360,
                height: 360
            });
        }

        // setup the event handler that is triggered every time enough samples have been collected
        // trigger the audio analysis and draw the results
        javascriptNode.addEventListener('audioprocess', function (e) {
            var now = new Date().getTime();
            if (lastDraw > now - frequency) return;
            lastDraw = now;
            // get the Time Domain data for this sample
            // averageVolume = getAverageVolume(frequencyArray) / 100;
            // analyserNode.getByteTimeDomainData(amplitudeArray);
            analyserNode.getByteFrequencyData(frequencyArray);

            // draw the display if the audio is playing
            if (audioPlaying === true) {
                window.requestAnimationFrame(drawSound);
            }
        });

        // Load the Audio the first time through, otherwise play it from the buffer
        if (audioData === null) {
            loadSound(audioUrl);
        } else {
            playSound(audioData);
        }

    });

    App.bind('episode-2', 'unloading', function () {
        ambientLight.stop();
        episodeIsPlaying = false;
        sourceNode.stop(0);
        audioPlaying = false;
    });

    App.bind('episode-2', 'unloaded', function () {
        clearCanvas();
        video.currentTime = 0;
        video.pause();
    });

})();
