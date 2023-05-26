/*window.onload = function() {
    
    getLocation();
    getTimeAndDate();
    getUrl();
    getOS();
    getInfoBrowser();
  //  schimbaContinut(resursa);
 
}
*/
//import { showTable } from './cumparaturi.js';
// Stop the interval after 10 seconds
var intervalID = setInterval(getTimeAndDate, 1000);

setTimeout(function() {
    clearInterval(intervalID);
    intervalID = setInterval(getTimeAndDate, 1000)
}, 10000);


function getTimeAndDate() {
    var luni = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'];
    const d = new Date();
    var element=document.getElementById("current_date");
    if(element)
        element.innerHTML ="Data si ora : "+d.getDay()+" "+ luni[d.getMonth()]+" "+d.getFullYear() +" "+ d.toLocaleTimeString();
}

function getUrl(){
  var currentURL = window.location.href;
  let element=document.getElementById("URL");
  if(element)
    element.innerHTML="Adresa URL : "+currentURL
}


function showPosition(position) {
    let element=document.getElementById("loc");
    if(element)
      element.innerHTML = "Locatie : <br>Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    let element=document.getElementById("loc");
    if(element)
      element.getElementById("loc").innerHTML = "Geolocation is not supported by this browser.";
  }
}


function getOS(){
  let os = navigator.userAgent;
    let NameOS="";
    if (os.search('Windows')!==-1){
        NameOS="Windows";
    }
    else if (os.search('Mac')!==-1){
        NameOS="MacOS";
    }
    else if (os.search('X11')!==-1 && !(os.search('Linux')!==-1)){
        NameOS="UNIX";
    }
    else if (os.search('Linux')!==-1 && os.search('X11')!==-1){
        NameOS="Linux"
    }
    
    let element=document.getElementById("OS");
    if(element)
      element.innerHTML = "Sistem de operare : "+NameOS;}

function getInfoBrowser(){

    var browserName = (function (agent) {       
      switch (true) {
                case agent.indexOf("edge") > -1: return "MS Edge";
                case agent.indexOf("edg/") > -1: return "Edge ( chromium based)";
                case agent.indexOf("opr") > -1 && !!window.opr: return "Opera";
                case agent.indexOf("chrome") > -1 && !!window.chrome: return "Chrome";
                case agent.indexOf("trident") > -1: return "MS IE";
                case agent.indexOf("firefox") > -1: return "Mozilla Firefox";
                case agent.indexOf("safari") > -1: return "Safari";
                default: return "other";
            }
        })(window.navigator.userAgent.toLowerCase());
    var browserVersion = navigator.appVersion;

    let element=document.getElementById("browser");
    if(element)
      element.innerHTML="Informatii browser: <br>"+"Browser: "+browserName+"<br>Versiune : "+browserVersion;

}

function getMousePos(event){
  return{
    x:event.offsetX,
    y:event.offsetY
  };
}
function clearMyCanvas(){
  var canvas = document.getElementById("myCanvas");
  var context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
}

var isFirst=true;
var pct=null;

function drawCanvas(event) {
    var canvas = document.getElementById("myCanvas");
    var pos = getMousePos(event);
    var posx = pos.x;
    var posy = pos.y;
    console.log("pos: " + posx + ":" + posy);

    if (isFirst == true) {
        isFirst = false;
        pct = pos;
        console.log("pct: " + pct.x + ":" + pct.y);

    } else {
        isFirst = true;
        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        if (pct.x < pos.x && pct.y < pos.y) {
            ctx.rect(pct.x, pct.y, Math.abs(posx - pct.x), Math.abs(posy - pct.y));
        }
        else if (pct.x > pos.x && pct.y > pos.y) {
            ctx.rect(posx, posy, Math.abs(pct.x - posx), Math.abs(pct.y - posy));
        }
        else if (pct.x < posx && pct.y > posy) {
            ctx.rect(pct.x, Math.min(pct.y, posy), Math.abs(posx - pct.x), Math.abs(posy - pct.y));
        }
        else {
            ctx.rect(Math.min(pct.x, posx), Math.min(pct.y, posy), Math.abs(pct.x - posx), Math.abs(posy - pct.y));

        }

        ctx.lineWidth = 5;
        ctx.strokeStyle = document.getElementById("colorStroke").value;
        ctx.stroke();
        ctx.fillStyle = document.getElementById("colorFill").value;
        ctx.fill();
    }

}
function addColumn() {
  let array=["DO","re","mi","fa","sol","la","si","do"];
  var random = Math.floor(Math.random() * array.length);
  var table = document.getElementById("myTable");
  var position = document.getElementById("position").value;
  var color = document.getElementById("colorPicker").value;
  if(position>=0){
    for (var i = 0; i < table.rows.length; i++) {
      var row = table.rows[i];
      var cell = row.insertCell(position); 
      if(i==0)
      {
      cell.innerHTML = "<b>Nota</b>"
      } 
      else  
      {
        random = Math.floor(Math.random() * array.length);
        cell.innerHTML = array[random];
      }
      cell.style.backgroundColor = color;
    }
  }
}

function addRow() {
  let array = ["DO", "re", "mi", "fa", "sol", "la", "si", "do"];
  var random = Math.floor(Math.random() * array.length);
  var table = document.getElementById("myTable");
  var position = document.getElementById("position").value;
  var color = document.getElementById("colorPicker").value;
  if(position>0){
    var newRow = table.insertRow(parseInt(position));
    for (var i = 0; i <table.rows[0].cells.length; i++) {
      var cell = newRow.insertCell(i); 
      if (i == position - 1) {
        cell.innerHTML = array[random];
      } else {
        random = Math.floor(Math.random() * array.length);
        cell.innerHTML = array[random];
      }
      cell.style.backgroundColor = color;
    }
  }
}

function loadInfo(){
  
    getLocation();
    getTimeAndDate();
    getUrl();
    getOS();
    getInfoBrowser();
    showTable();
}

function schimbaContinut(resursa,jsFisier,jsFunctie)
{
    var xhttp;
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange =
        function() {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
            document.getElementById("continut").innerHTML = xhttp.responseText;
            loadInfo();
            if (jsFisier) {
              var elementScript = document.createElement('script');
              elementScript.onload = function () {
                console.log("hello");
                if (jsFunctie) {
                  window[jsFunctie]();
                }
              };
              elementScript.src = jsFisier;
              document.head.appendChild(elementScript);
            } else {
              if (jsFunctie) {
              window[jsFunctie]();
              }
            }
          }
        }
        console.log(resursa + ".html");
        xhttp.open("GET", resursa + ".html", true);
        xhttp.send();
    }

}
function incarcaUtilizatori(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
          var res = this.response;
        //  console.log(res);
          verify(res);
        }
    };
    
    xhttp.open("GET", "utilizatori.json", true);
    xhttp.send();
    event.preventDefault();
  
}
function verify(text)
{
    obj = JSON.parse(text);
    let found=0;
    let nume=document.getElementById('name1').value;
    let parola=document.getElementById('pass1').value;
    for(var i=0;i<obj.length;i++)
    {
      // console.log(i+ " "+ obj[i].utilizator)
      // console.log(i+ " "+ obj[i].parola)
      if(nume== obj[i].utilizator && parola==obj[i].parola)
      {
          found=1;
      }
    }
    if(found==1)
    {
        document.getElementById("response").innerHTML ="Utilizator corect"
        document.getElementById("response").style.color="green"
    }
    else
    {
        document.getElementById("response").innerHTML ="Utilizator sau parola gresita"
        document.getElementById("response").style.color="red"
    }


} 
function register()
{

  //version 2
const form = document.querySelector('.flex-container');

form.addEventListener('submit', (event) => {

  event.preventDefault();


  const formData = new FormData(form);
  const requestData = {};
  for (let [key, value] of formData.entries()) {
    requestData[key] = value;
  }

  fetch('/api/utilizatori', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response;
  })
  .then(data => {
    console.log('Response data:', data);
    alert('Înregistrare realizată cu succes!');
    form.reset();
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Eroare la înregistrare!');
  });
});

//version 1
/*
const form = document.querySelector('.flex-container');
form.addEventListener('submit', (event) => {

  event.preventDefault();


const xhttp = new XMLHttpRequest();
xhttp.open('POST', '/api/utilizatori');
xhttp.setRequestHeader('Content-Type', 'application/json');
xhttp.onreadystatechange = function() {
  if (xhttp.readyState === XMLHttpRequest.DONE) {
    if (xhttp.status === 200) {
      const response = xhttp.response;
      console.log(response);
    } else {
      console.error(xhttp.status);
      alert('Error: ' + xhttp.statusText);
    }
  }
};

const formData = new FormData(form);
const requestData = {};
for (let [key, value] of formData.entries()) {
  requestData[key] = value;
}
xhttp.send(JSON.stringify(requestData));
});
*/
}