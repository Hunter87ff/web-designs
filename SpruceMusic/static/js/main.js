class Player{
    constructor(){
        this.audio = new Audio(); // document.getElementById("audio");
        this.playBtn = document.getElementById("play");
        this.pauseBtn = document.getElementById("pause");
        this.nextBtn = document.getElementById("next");
        this.prevBtn = document.getElementById("prev");
        this.playList = document.getElementById("playlist");
        this.currentSong = 0;
        this.nextAudio = new Audio();
        this.currentSongName = document.getElementById("current-song");
        this.songs = [] ;//load song data from audio.json file
        this.currentAudio = {};
        this.playBtn.addEventListener("click", () => this.play());
        this.pauseBtn.addEventListener("click", () => this.pause());
        this.nextBtn.addEventListener("click", () => this.next());
        this.prevBtn.addEventListener("click", () => this.prev());
        this.audio.addEventListener("ended", () => this.next());
        this.progressBar = document.getElementById("audio-progress");
        this.progressBar.value = 0;
        this.current_time = document.getElementById("current-time");
        this.current_duration = document.getElementById("current-duration");
        this.player_banner = document.getElementById("player-banner");

        this.audio.addEventListener("timeupdate", () => {
            this.progressBar.value = this.audio.currentTime;
            this.progressBar.max = this.audio.duration;
            this.current_time.innerHTML = this.formatedTime(this.audio.currentTime) + " / " + this.formatedTime(this.audio.duration);
        });
        this.progressBar.addEventListener("change", () => {
            this.audio.currentTime = this.progressBar.value;
            this.current_time.innerHTML = this.formatedTime(this.audio.currentTime) + " / " + this.formatedTime(this.audio.duration);
        });
        this.audio.onloadedmetadata = () => {
            this.progressBar.max = this.audio.duration;
            this.current_time.innerHTML = this.formatedTime(this.audio.currentTime) + " / " + this.formatedTime(this.audio.duration);
            console.log("Loaded metadata: " + this.songs[this.currentSong].name);
        }
        this.audio.onloadeddata = () => {
            console.log("Loding next song");
            if(this.currentSong >= this.songs.length){this.currentSong = 0;}
            this.nextAudio.src = this.songs[this.currentSong].src;
            this.nextAudio.load();
        }
    }

    formatedTime(Seconds=null) {
        let totalSeconds = Seconds || this.audio.duration;
        if (isNaN(totalSeconds)) {return "00:00";}
        let hours = Math.floor(totalSeconds / 3600);
        let minutes = Math.floor((totalSeconds % 3600) / 60);
        let seconds = Math.floor(totalSeconds % 60);
        if (hours > 0) {return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;} 
        else {return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;}
    }
    
    render(){
        // this.playList.innerHTML = "";
        fetch("./static/js/audio.json")
        .then(response => response.json())
        .then(data => {
            this.songs = data;
            this.songs.forEach((song, index) => {
                let el = document.createElement("li");
                el.className = "audio-li cursor-pointer font-mono text-white font-bold p-2 my-2 align-middle flex-row flex items-center";
                el.innerHTML = `
                    <img src="${song.thumbnail}" class="rounded mr-2 aspect-square" alt="">
                    <div class="track-info">
                        <span class="">${song.name}</span><br>
                        <span class="text-gray-400">${song.author}</span>
                    </div>
                    <span class="float-right ml-auto">${song.duration}</span>
                    `
                el.addEventListener("click", () => this.playSong(index));
                this.playList.appendChild(el);
            });
            this.currentAudio = this.songs[this.currentSong];
            this.currentSongName.innerHTML = this.songs[this.currentSong].name;
            this.audio.src = this.songs[this.currentSong].src;
        });
    }
    play(){
        if(this.audio.paused){
            this.audio.play()
            .then(this.playBtn.classList.replace("bx-play", "bx-pause"))
            .then(this.current_time.innerHTML = this.formatedTime(this.audio.currentTime) + " / " + this.formatedTime(this.audio.duration))
            .then(console.log("Playing: " + this.songs[this.currentSong].name));
        }
        else{this.audio.pause();this.playBtn.classList.replace("bx-pause", "bx-play");}
    }
    next(){
        this.currentSong++;
        if(this.currentSong >= this.songs.length){this.currentSong = 0;}
        this.audio = this.nextAudio;
        this.player_banner.src = this.songs[this.currentSong].thumbnail;
        this.currentSongName.innerHTML = this.songs[this.currentSong].name;
        this.current_time.innerHTML = this.formatedTime(this.audio.currentTime) + " / " + this.formatedTime(this.audio.duration);
        this.play();
    }
    prev(){
        this.currentSong--;
        if(this.currentSong < 0){
            this.currentSong = this.songs.length - 1;
        }
        this.play();
    }
    playSong(index){
        this.currentSong = index;
        this.play();
    }
}

let player = new Player();
player.render();