
(function () {

    var episodeIsPlaying = false;

    var canvas = $('.episode-1 .drawing canvas');

    if (!canvas || !canvas.getContext) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var context = canvas.getContext('2d'),
        width = canvas.width,
        height = canvas.height;

    var frequency = 100,
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
    var audioUrl = 'audio/episode1.mp3';
    var middleWidth = ~~(width / 2);
    var middleHeight = ~~(height / 2);
    var lastDraw = 0;
    var energyInterval = -1;
    var averageVolume = 0;
    var sinOffset = 0;

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
        sourceNode.start(0, 38);
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

    context.strokeStyle = 'white';
    context.shadowBlur = 100;
    context.shadowColor = 'rgb(220, 20, 220)';

    var drawEnergy = function () {
        // RANDOM ELECTRIC ARC

        // clearCanvas();
        // context.lineWidth = 3;

        // var k, i, value = 0;
        // var amplitudeLength = amplitudeArray.length;
        // var amplitudeOffset = ~~(amplitudeLength / amplitudeCount);
        // var amplitudeDraw = ~~(width / amplitudeCount);
        // var size = 150;

        // context.beginPath();
        // context.moveTo(0, middleHeight);
        // k = 0;
        // for (i = amplitudeOffset; i < amplitudeLength - amplitudeOffset; i += amplitudeOffset) {
        //     k++;
        //     context.lineTo(k * amplitudeDraw, (Math.random() * size - size/2) * averageVolume + middleHeight);

        // }
        // context.lineTo(width, middleHeight);
        // context.stroke();

    };

    var drawSound = function () {
        if (episodeIsPlaying) {
            clearCanvas();

            var k, i, value = 0;

            // FREQUENCY VARIABLE

            var frenquencyLength = frequencyArray.length - 300;
            var frenquencyOffset = ~~(frenquencyLength / frequencyCount);
            var frequencyDraw = ~~(middleWidth / frequencyCount);

            // DOUBLE FREQUENCY ARC - SYMMETRIC

            context.lineWidth = ~~(3 + Math.random() * 6);
            context.beginPath();
            context.moveTo(0, middleHeight);

            k = 0;
            for (i = frenquencyLength - frenquencyOffset; i >= 0; i -= frenquencyOffset) {
                k++;
                value = frequencyArray[i + 5] / 256;
                context.lineTo(k * frequencyDraw, height - middleHeight - (value * middleHeight) * Math.sin(sinOffset + k / 5));
            }

            k = 0;
            for (i = 0; i < frenquencyLength - frenquencyOffset * 2; i += frenquencyOffset) {
                k++;
                value = frequencyArray[i + 5] / 256;
                context.lineTo(middleWidth + k * frequencyDraw, height - middleHeight - (value * middleHeight) * Math.cos(sinOffset + k / 5));
            }

            context.lineTo(width, middleHeight);
            context.stroke();

            sinOffset -= 0.9;

            // episodeIsPlaying = false;


            // context.lineWidth = ~~(2 + Math.random() * 4);

            // var amplitudeLength = amplitudeArray.length;
            // var amplitudeOffset = ~~(amplitudeLength / amplitudeCount);
            // var amplitudeDraw = ~~(width / amplitudeCount);

            // context.beginPath();
            // context.moveTo(0, middleHeight);
            // k = 0;
            // for (i = amplitudeOffset; i < amplitudeLength - amplitudeOffset; i += amplitudeOffset) {
            //     k++;
            //     value = height - (height * amplitudeArray[i] / 256) - 1;
            //     context.lineTo(k * amplitudeDraw, value);

            // }
            // context.lineTo(width, middleHeight);
            // context.stroke();


            // context.beginPath();
            // context.moveTo(0, middleHeight);
            // k = 0;
            // for (i = amplitudeLength - amplitudeOffset; i >= amplitudeOffset; i -= amplitudeOffset) {
            //     k++;
            //     value = height - (height * amplitudeArray[i] / 256) - 1;
            //     context.lineTo(k * amplitudeDraw, value);
            // }
            // context.lineTo(width, middleHeight);
            // context.stroke();

            // context.beginPath();
            // context.moveTo(0, middleHeight);
            // k = 0;
            // for (i = amplitudeLength - amplitudeOffset; i >= amplitudeOffset; i -= amplitudeOffset) {
            //     k++;
            //     context.lineTo(k * amplitudeDraw, Math.random() * 50 - 25 + middleHeight);
            // }
            // context.lineTo(width, middleHeight);
            // context.stroke();
        }
    };

    var clearCanvas = function () {
        context.clearRect(0, 0, width, height);
    };

    try {
        audioContext = new AudioContext();
    } catch (ex) {
        console.warn('Web Audio API is not supported in this browser');
    }


    App.bind('episode-1', 'loaded', function (e) {
        episodeIsPlaying = true;

        setupAudioNodes();

        // setup the event handler that is triggered every time enough samples have been collected
        // trigger the audio analysis and draw the results
        javascriptNode.addEventListener('audioprocess', function (e) {
            var now = new Date().getTime();
            if (lastDraw > now - frequency) return;
            lastDraw = now;
            // get the Time Domain data for this sample
            averageVolume = getAverageVolume(frequencyArray) / 100;
            analyserNode.getByteTimeDomainData(amplitudeArray);
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

        energyInterval = setInterval(drawEnergy, 62);

    });

    App.bind('episode-1', 'unloading', function () {
        clearInterval(energyInterval);
        episodeIsPlaying = false;
        sourceNode.stop(0);
        clearCanvas();
        audioPlaying = false;
    });

})();
