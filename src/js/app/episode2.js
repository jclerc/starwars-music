
(function () {

    // Variables
    var canvas = $('.episode-2 .drawing canvas');
    var video = $('.episode-2 .video');
    var ambientLight = new AmbientLight(video, $('.episode-2 .ambient'));



    App.bind('episode-2', 'loaded', function () {
        // Begin canvas
        // video.currentTime = 0;
        video.play();
        ambientLight.play();



    });

    App.bind('episode-2', 'unloading', function () {
        // Stop the music
        ambientLight.stop();



    });

    App.bind('episode-2', 'unloaded', function () {
        // Clear canvas
        // video.currentTime = 0;
        video.pause();

    });

})();
