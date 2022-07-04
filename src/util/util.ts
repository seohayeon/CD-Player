export class Util{
    static b64toBlob(dataURI) {
        var byteString = atob(dataURI.split(',')[1]);
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
    
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        let blob = new Blob([ab], { type: 'image/png' })
        return URL.createObjectURL(blob);
    }
    static listener(audio){
        document.getElementById('cdCover').classList.add('playAnimation');
                
        audio.addEventListener("pause", function(){ 
                document.getElementById('cdCover').style.webkitAnimationPlayState = "paused";
        }, false);
                
        audio.addEventListener("play", function(){
                document.getElementById('cdCover').style.webkitAnimationPlayState = "running";
        }, false);
        
        audio.addEventListener("ended", function(){
                document.getElementById('cdCover').style.webkitAnimationPlayState = "paused";
        }, false);
    }
}