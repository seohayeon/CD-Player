import React,{ useState,useEffect } from "react";
import ReactDOM from "react-dom";
import jsmediatags from 'jsmediatags/dist/jsmediatags.min';
import "./App.css";
import ColorThief from 'color-thief-standalone';
import { Util } from './util/util'


function App(){
    const [tagcover, setTagCover] = useState(null);
    
                    
    const handleAudio = (e)=>{
        let files = e.target.files
        let file = e.target.files[0]
        const urlObj = URL.createObjectURL(file);
        let src = urlObj
        
        jsmediatags.read(file, {
            onSuccess: function(tag) {
                let title = tag.tags.title;
                let artist = tag.tags.artist;
                let album = tag.tags.album;
                let tagCover = tag.tags.picture;
                
                if (tagCover) {
                    let base64String = '';
                    tagCover.data.forEach((data) => { base64String += String.fromCharCode(data); });
                    setTagCover(`data:${tagCover.format};base64,${window.btoa(base64String)}`)
                    const coverImage = new Image();
                    coverImage.src = `data:${tagCover.format};base64,${window.btoa(base64String)}`;
                    let blobUrl = Util.b64toBlob(coverImage.src)
                    
                coverImage.onload = () => {
                    const colorThief = new ColorThief();
                    const colorArray = colorThief.getColor(coverImage);
                    document.body.style.backgroundColor = 'rgb(' + colorArray + ')';
                
                var audio  = document.getElementById('audio') as HTMLAudioElement;
                
                var source = document.getElementById('audioSource') as HTMLAudioElement;
                source.src = src;
                audio.load();
                audio.play();
                Util.listener(audio)
                
                if ("mediaSession" in navigator) {
                    navigator.mediaSession.metadata = new MediaMetadata({
                    title: title,
                    artist: artist,
                    album: album,
                    artwork: [
                        { src: blobUrl, sizes: '128x128', type: 'image/png' }
                        ]
                    });
                }
  
        }
    }
  },
  onError: function(error) {
    
  }
});
        
    }
  return (
      <div>
      
        <label for="input-file">
        <div className='cd-molecule'>
            <div className='cd-atom'>
                <div className='nucleus'>
                    <img src={tagcover} id='cdCover'/>
                    <div className='axis'></div>
                </div>
                
            </div>
        </div>
        </label>
        <div className='wire'/>
        
        <input type="file" id="input-file" onChange={handleAudio}/>
        
        <audio id="audio">
            <source id="audioSource" src=""></source>
        </audio>
      </div>
    )
};

export default App