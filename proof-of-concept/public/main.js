let socket = io();

function onYouTubeIframeAPIReady() {
    let player = new YT.Player('player', {
        videoId: '-cmslETlOPE',
        events: {
            onStateChange: onPlayerStateChange
        }
    });


    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PAUSED) {
            socket.emit('pause-video');
        }

        if (event.data == YT.PlayerState.PLAYING) {
            let currentTime = player.getCurrentTime();
            socket.emit('play-video', { currentTime });
        }
    }

    socket.on('pause-video', () => {
        let state = player.getPlayerState();
        if (state != YT.PlayerState.PAUSED) {
            player.pauseVideo();
        }
    });

    socket.on('play-video', command => {
        let state = player.getPlayerState();
        if (state != YT.PlayerState.PLAYING) {
            player.seekTo(command.currentTime);
            player.playVideo();
        }
    });
}