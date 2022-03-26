function last_time()
{
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
              timp = document.getElementById("time");
              timp.innerText = "This page was last viewed " + xhttp.responseText;
          }
       };
    xhttp.open("GET", "/last.txt");
    xhttp.send();
}

function change_color()
{
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var headc = document.getElementById("colorHead");
        headc.innerText = xhttp.responseText;
        headc.style.color = xhttp.responseText;
        }
    };
    xhttp.open("GET", "/color.txt");
    xhttp.send();
}

function show_times()
{
    let xhttp = new XMLHttpRequest();
    var tlist = document.getElementById("timel");
    console.log(tlist.innerText);
    tlist.innerHTML="";
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var times = JSON.parse(xhttp.responseText);
        for (let i = 0; i < times.length; i++) {
            var liste = document.createElement("li");
            liste.innerText = times[i];
            console.log(liste.innerText);
            //tlist.appendChild(liste);
            }
        }
    };
    xhttp.open("GET", "/log.json");
    xhttp.send();
}