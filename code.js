function saveFile(data, name){
  var a=document.createElement("a")
  a.setAttribute("download", name||"file.txt")
  a.setAttribute("href", "data:application/octet-stream;base64,"+btoa(data||"undefined"))
  a.click()
}
function read(){
  var file = document.getElementById("file").files[0]
  var oFReader = new FileReader();
  oFReader.readAsDataURL(file);
  oFReader.onload = function (oFREvent) {
    var sizef = file.size;
    i = oFREvent.target.result;
    document.getElementById('i').src = i;
}
};

function run(){
    var i = 0;
    i = getImage();
    prompt('Use Ctrl+C for copy', i);
    /*document.getElementById('raw').innerHTML = i;
    var copyText = document.getElementById("raw");
    copyText.select();
    document.execCommand("copy");
    alert("HEX codes are copied")*/
}

function getImage(){
getColor(0,0);
var x, y;
var hi, wi;
var imagehex;
    x = 0;
    y = 0;
    hi = h;
    wi = w;
    imagehex = '';
        while(y != h){
                while(x != w){
                    imagehex = imagehex + getColor(x,y);
                    x = x + 1;
                    }
                x = 0;
                y = y + 1;
                }
alert('End');
return(imagehex);
}

function getColor(x,y){
 rgb = getAverageRGB(document.getElementById('i'), x, y);
    color = rgb.r.toString(16)+rgb.b.toString(16)+rgb.g.toString(16);
    return color;
}

function getAverageRGB(imgEl, x, y) {
    
    var blockSize = 5, // only visit every 5 pixels
        defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
        canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data, width, height,
        i = -4,
        length,
        rgb = {r:0,g:0,b:0},
        count = 0;
        
    if (!context) {
        return defaultRGB;
    }
    
    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;
    context.drawImage(imgEl, 0, 0);
    h = height;
    w = width;
    try {
        data = context.getImageData(x, y, width, height);
    } catch(e) {
        /* security error, img on diff domain */alert('x');
        return defaultRGB;
    }
    
    length = data.data.length;
    
    while ( (i += blockSize * 4) < length ) {
        ++count;
        rgb.r += data.data[i+1];
        rgb.g += data.data[i+2];
        rgb.b += data.data[i+3];
    }
    
    // ~~ used to floor values
    rgb.r = ~~(rgb.r/count);
    rgb.g = ~~(rgb.g/count);
    rgb.b = ~~(rgb.b/count);
    
    return rgb;
    
}
