
(function () {

    var episodeIsPlaying = false;

    var canvas = $('.episode-1 .drawing canvas');

    if (!canvas || !canvas.getContext) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var context = canvas.getContext('2d'),
        width = canvas.width,
        height = canvas.height;

    var frequency = 40,
        angleCount = 30;

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
    var audioUrl = 'audio/episode1.mp3';
    var middleWidth = ~~(width / 2);
    var middleHeight = ~~(height / 2);
    var lastDraw = 0;

    var setupAudioNodes = function () {
        sourceNode     = audioContext.createBufferSource();
        analyserNode   = audioContext.createAnalyser();
        javascriptNode = audioContext.createScriptProcessor(sampleSize, 1, 1);
        // Create the array for the data values
        amplitudeArray = new Uint8Array(analyserNode.frequencyBinCount);
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

    context.strokeStyle = 'white';
    context.shadowBlur = 100;
    context.shadowColor = 'rgb(220, 20, 220)';
    // context.shadowColor = 'blue';

    var drawSoung = function() {
        if (episodeIsPlaying) {
            clearCanvas();
            context.lineWidth = ~~(4 + Math.random() * 8);

            var k, i, value = 0;
            var amplitudeLength = amplitudeArray.length;
            var countOffset = ~~(amplitudeLength / angleCount);
            var drawOffset = ~~(width / angleCount);

            context.beginPath();
            context.moveTo(0, middleHeight);
            k = 0;
            for (i = countOffset; i < amplitudeLength - countOffset; i += countOffset) {
                k++;
                value = height - (height * amplitudeArray[i] / 256) - 1;
                context.lineTo(k * drawOffset, value);

            }
            context.lineTo(width, middleHeight);
            context.stroke();

            context.beginPath();
            context.moveTo(0, middleHeight);
            k = 0;
            for (i = amplitudeLength - countOffset; i >= countOffset; i -= countOffset) {
                k++;
                value = height - (height * amplitudeArray[i] / 256) - 1;
                context.lineTo(k * drawOffset, value);

            }
            context.lineTo(width, middleHeight);
            context.stroke();

            context.beginPath();
            context.moveTo(0, middleHeight);
            k = 0;
            for (i = amplitudeLength - countOffset; i >= countOffset; i -= countOffset) {
                k++;
                context.lineTo(k * drawOffset, Math.random() * 50 - 25 + middleHeight);

            }
            context.lineTo(width, middleHeight);
            context.stroke();
            
            // episodeIsPlaying = false;
            
            // var length = amplitudeArray.length * 0.95,
                // start = ~~(length * 0.05);
            // context.beginPath();
            // var value, i, y;
            // context.moveTo(0, middleHeight);
            // for (i = start; i < length; i += 60) {
                // i = ~~i;
                // value = amplitudeArray[i] / 256;
                // y = height - (height * value) - 1;
                // context.lineTo(i - start, y);
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
            analyserNode.getByteTimeDomainData(amplitudeArray);
            // analyserNode.getByteFrequencyData(amplitudeArray);

            // draw the display if the audio is playing
            if (audioPlaying === true) {
                window.requestAnimationFrame(drawSoung);
            }
        });

        // Load the Audio the first time through, otherwise play it from the buffer
        if (audioData === null) {
            loadSound(audioUrl);
        } else {
            playSound(audioData);
        }

    });

    App.bind('episode-1', 'unloading', function () {
        episodeIsPlaying = false;
        sourceNode.stop(0);
        clearCanvas();
        audioPlaying = false;
    });

})();
