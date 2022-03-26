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
        var chead = document.createElement("h1");
        chead.innerText = xhttp.responseText;
        chead.style.color = xhttp.responseText;
        document.body.appendChild(chead);
        }
    };
    xhttp.open("GET", "/colour.txt");
    xhttp.send();
    }

last_time()