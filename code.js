    
var canvas = document.createElement('canvas');
    
var context = canvas.getContext && canvas.getContext('2d');
    
document.body.appendChild(canvas);

var imgEl = document.getElementById('i');

var forCopy = document.getElementById('forCopy');

forCopy.style.visibility = 'hidden';
    
function copyToClipboard(text){

forCopy.style.visibility = 'visible';

forCopy.value = text;

forCopy.select();
document.execCommand("copy");

forCopy.value = '';

forCopy.style.visibility = 'hidden';
}

var arrayCC = document.getElementById('arrayCC');

var closeAlert = document.getElementById('closeAlert');
var closePrompt = document.getElementById('closePrompt');

var alertEl = closeAlert.parentElement;
var promptEl = closePrompt.parentElement;

alertEl.style.visibility = 'hidden';

promptEl.style.visibility = 'hidden';

Alert = {};

Alert.createAlert = function(name){
    var textAlert = alertEl.getElementsByTagName('p')[0];
    
    textAlert.innerText = name;
    
    alertEl.style.visibility = 'visible';
}

Alert.createPrompt = function(name,input){
    var textPrompt = promptEl.getElementsByTagName('p')[0];
    var inputPrompt = promptEl.getElementsByTagName('input')[0];
    
    textPrompt.innerText = name;
    inputPrompt.value = input;
    
    promptEl.style.visibility = 'visible';
}

closeAlert.onclick = function(){
    alertEl.style.visibility = 'hidden';
}
closePrompt.onclick = function(){
    promptEl.style.visibility = 'hidden';
    Alert.valuePrompt = promptEl.getElementsByTagName('input')[0].value;
}
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
    Alert.createAlert('Copied to Clipboard');
    copyToClipboard(i);
    //prompt('Use Ctrl+C for copy', i);
    /*document.getElementById('raw').innerHTML = i;
    var copyText = document.getElementById("raw");
    copyText.select();
    document.execCommand("copy");
    alert("HEX codes are copied")*/
}

function getImage(){
    
    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;
    
    h = height;
    w = width;
    
    //context.clearRect(0, 0, canvas.width, canvas.height);
    
    context.drawImage(imgEl, 0, 0);
    
getColor(0,0);
var x, y;
var imagehex = '';
if(arrayCC.checked){
    imagehex = 'const uint8_t img[] = {';
}
    x = 0;
    y = 0;
        while(y != h){
                while(x != w){
                    if(arrayCC.checked){
                    imagehex = imagehex
                    + '0x' + decToHex(getAverageRGB(x,y).r)
                    + ',' +
                    '0x' + decToHex(getAverageRGB(x,y).g)
                    + ',' +
                    '0x' + decToHex(getAverageRGB(x,y).b)
                    + ',';
                    }else{
                    imagehex = imagehex + getColor(x,y);
                    }
                    x = x + 1;
                    }
                x = 0;
                y = y + 1;
                }
if(arrayCC.checked){
imagehex = imagehex.substring(0,imagehex.length-1);
imagehex = imagehex + '};'
}

Alert.createAlert('End');
//saveFile(imagehex,'code');
return(imagehex);
}

function decToHex(dc){
var hexString = dc.toString(16);
    
if (hexString.length % 2) {
  hexString = '0' + hexString;
}
return String(hexString);
}

function getColor(x,y){
 var rgb = getAverageRGB(x, y);
 var color = decToHex(rgb.r) + decToHex(rgb.g) + decToHex(rgb.b);
 return color;
}

function getAverageRGB(x, y) {
    
    var rgb = {},
        defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
        data, width, height;
        
    if (!context) {
        return defaultRGB;
    }

    try {
        data = context.getImageData(x, y, 1, 1).data;
    } catch(e) {
        /* security error, img on diff domain */alert('x');
        return defaultRGB;
    }
    
        rgb.r = Number(data[0]);
        rgb.g = Number(data[1]);
        rgb.b = Number(data[2]);
    
    return rgb;
    
}
