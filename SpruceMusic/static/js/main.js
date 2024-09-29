class Player{
    constructor(){
        this.audio = document.getElementById("audio");
        this.playBtn = document.getElementById("play");
        this.pauseBtn = document.getElementById("pause");
        this.nextBtn = document.getElementById("next");
        this.prevBtn = document.getElementById("prev");
        this.playList = document.getElementById("playlist");
        this.currentSong = 0;
        this.currentSongName = document.getElementById("current-song");
        this.songs = [] ;//load song data from audio.json file
        this.playBtn.addEventListener("click", () => this.play());
        this.pauseBtn.addEventListener("click", () => this.pause());
        this.nextBtn.addEventListener("click", () => this.next());
        this.prevBtn.addEventListener("click", () => this.prev());
        this.audio.addEventListener("ended", () => this.next());
        this.progressBar = document.getElementById("audio-progress");
        this.audio.addEventListener("timeupdate", () => {
            this.progressBar.value = this.audio.currentTime;
            this.progressBar.max = this.audio.duration;
        });
        this.progressBar.addEventListener("change", () => {
            this.audio.currentTime = this.progressBar.value;
        });
    }
    loadSongs(){
        let songs= [];
        fetch("audio.json")
            .then(response => response.json())
            .then(data => {
                this.songs = data;
            });
        return songs;
    }

    render(){
        // this.playList.innerHTML = "";
        fetch("./static/js/audio.json")
        .then(response => response.json())
        .then(data => {
            this.songs = data;
            console.log(this.songs);
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
            this.currentSongName.innerHTML = this.songs[this.currentSong].name;
            this.audio.src = this.songs[this.currentSong].src;
        });
    }
    play(){
        if(this.audio.paused){this.audio.play();this.playBtn.classList.replace("bx-play", "bx-pause");}
        else{this.audio.pause();this.playBtn.classList.replace("bx-pause", "bx-play");}

    }
    pause(){
        this.audio.pause();
        this.playBtn.style.display = "inline-block";
        this.pauseBtn.style.display = "none";
    }
    next(){
        this.currentSong++;
        if(this.currentSong >= this.songs.length){
            this.currentSong = 0;
        }
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

