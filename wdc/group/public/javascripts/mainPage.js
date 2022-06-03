function get_events(){

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var actor_list = JSON.parse(this.responseText);

            var actorArea = document.getElementById('actorlist');
            for (let actor of actor_list) {
                let fname = document.createElement('td');
                let lname = document.createElement('td');
                let wname = document.createElement('tr');
                fname.innerText = actor.first_name;
                lname.innerText = actor.last_name;
                wname.appendChild(fname);
                wname.appendChild(lname);
                actorArea.appendChild(wname);
            }
        }
    };
    xhttp.open("GET", "/events");
    xhttp.send();
}

function send_actor()
{
    let fname = document.getElementById('actor-first-name').value;
    let lname = document.getElementById('actor-last-name').value;
    let newActor = {fname: fname, lname: lname};

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

        }
    };

    xhttp.open("POST", "/newActor");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(newActor));
}