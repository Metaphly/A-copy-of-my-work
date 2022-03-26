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
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

        for (var element of times) {
            var liste = document.createElement("li");
            liste.innerText = element;
            thelist.appendChild(liste);
            }
        }
    };
    xhttp.open("GET", "/log.json");
    xhttp.send();
}