function sel(query){return document.querySelector(query);}


class Track extends Audio{
    constructor(name, author, src, thumbnail){
        super(src);
        this.name = name;
        this.author = author;
        this.thumbnail = thumbnail;
        this.isPlaying = this.paused? false : true;
    }
    update(name, author, src, thumbnail){
        this.name = name;
        this.author = author;
        this.src = src;
        this.thumbnail = thumbnail;
    }
}



class Player{
    constructor(){
        this.currentSong = localStorage.getItem("currentSong") || 0;
        this.songs = JSON.parse(localStorage.getItem("songs")) || [];
        this.audio = new Audio();
        this.playBtn = document.getElementById("play");
        this.nextBtn = document.getElementById("next");
        this.prevBtn = document.getElementById("prev");
        this.playList = document.getElementById("playlist");
        this.playBtn.addEventListener("click", () => this.playPause());
        this.nextBtn.addEventListener("click", () => this.next());
        this.prevBtn.addEventListener("click", () => this.prev());
        this.audio.addEventListener("ended", () => this.next());
        this.current_time = document.getElementById("current-time");
        this.current_duration = document.getElementById("current-duration");
        this.player_banner = document.getElementById("player-banner");
        this.progressBar = document.getElementById("audio-progress");
        this.playerTrack = {
            banner : document.getElementById("player-banner"),
            currentSong : document.getElementById("current-song"),
            currentTime : document.getElementById("current-time"),
            currentDuration : document.getElementById("current_duration"),
        }
        this.progressBar.value = this.audio.currentTime;

        this.audio.onplaying = ()=>{this.playBtn.classList.replace("bx-play", "bx-pause");}
        this.audio.onpause = ()=>{this.playBtn.classList.replace("bx-pause", "bx-play");}

        this.audio.addEventListener("timeupdate", () => {
            localStorage.setItem("currentTime", this.audio.currentTime);
            this.current_time.innerText = this.formatedTime(this.audio.currentTime);
            this.progressBar.value = this.audio.currentTime;
        });
        this.progressBar.addEventListener("change", () => {
            this.audio.currentTime = this.progressBar.value;
        });
        this.audio.onloadedmetadata = () => {
            this.progressBar.max = this.audio.duration;
        }
    }

    changePlayerTrack(audioObj){
        this.playBtn.classList.replace("bx-pause", "bx-play");
        localStorage.setItem("currentSong", this.currentSong);
        this.audio.src = audioObj.src;
        this.playerTrack.banner.src = audioObj.thumbnail;
        this.playerTrack.currentSong.innerText = audioObj.name.slice(0, 20) + (audioObj.name.length>20?"...":"");
        this.playerTrack.currentTime.innerText = audioObj.duration;

        // this.playerTrack.currentDuration.innerText = audioObj.duration;
    }
    

    playPause(){
        localStorage.setItem("currentSong", this.currentSong);
        document.title=this.songs[this.currentSong].name;
        if(this.audio.paused){
            this.audio.play()
            .then(this.playBtn.classList.replace("bx-play", "bx-pause"))
            .then(console.log("Playing: " + this.songs[this.currentSong].name));
        }
        else if(!this.audio.paused){
            this.audio.pause();
            this.playBtn.classList.replace("bx-pause", "bx-play");}
    }
    next(){
        this.currentSong++;
        if(this.currentSong >= this.songs.length){this.currentSong = 0;}
        this.progressBar.max = this.songs[this.currentSong].duration;
        this.changePlayerTrack(this.songs[this.currentSong]);
        setTimeout(()=>{this.playPause()}, 500);
    }
    prev(){
        this.currentSong--;
        if(this.currentSong < 0){this.currentSong = this.songs.length - 1;}
        this.playPause();
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
        fetch("./static/js/audio.json")
        .then(response => response.json())
        .then(data => {
            this.songs = data;
            localStorage.setItem("songs", JSON.stringify(this.songs));
            this.songs.forEach((song, index) => {
                let el = document.createElement("li");
                el.className = "audio-li  cursor-pointer font-mono text-white font-bold p-2 my-2 align-middle flex-row flex items-center";
                el.innerHTML = `
                    <img src="${song.thumbnail}" class="rounded mr-2 aspect-square" alt="">
                    <div class="track-info">
                        <span class="">${song.name.slice(0,20)}${song.name.length>20?"...":""}</span><br>
                        <span class="text-gray-400">${song.author}</span>
                    </div>
                    <span class="float-right ml-auto">${song.duration}</span>
                    `
                el.addEventListener("click", () => {
                    this.currentSong = index;
                    this.changePlayerTrack(this.songs[index]);
                });
                this.playList.appendChild(el);
            });
            this.changePlayerTrack(this.songs[this.currentSong]);
        });
    }
}

let player = new Player();
player.render();
window.onload = () => {
    player.audio.currentTime = localStorage.getItem("currentTime") || 0;
    player.current_time.innerText = player.formatedTime();
    player.progressBar.value = player.audio.currentTime;
    player.progressBar.max = player.audio.duration;
};