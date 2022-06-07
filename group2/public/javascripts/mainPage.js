function get_events(){

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var event_list = JSON.parse(this.responseText);

            var eventArea = document.getElementById('allevents');
            for (let event of event_list) {

                let anevent = document.createElement('div');
                anevent.className='event';

                let eventcontent = document.createElement('div');
                eventcontent.className= 'eventcontent';

                eventcontent.innerText = event.description;

                let details = document.createElement('ul');
                let eventname = document.createElement('li');
                let location = document.createElement('li');
                let time = document.createElement('li');
                let event_id = document.createElement('li');

                eventname.innerText = event.event_name;
                location.innerText = event.location;
                time.innerText = event.start_date;
                event_id.innerText = "Event Id: " + event.event_id;

                details.appendChild(eventname);
                details.appendChild(location);
                details.appendChild(time);
                details.appendChild(event_id);
                anevent.appendChild(eventcontent);
                anevent.appendChild(details);
                eventArea.appendChild(anevent);
            }
        }
    };
    xhttp.open("GET", "/events");
    xhttp.send();
}

function create_single_event(){

}

function login() {

    let user = {
        user_name: document.getElementById('user_name').value,
        password: document.getElementById('password').value
    };

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("Valid Login");
            location.href = '/';
        } else if (this.readyState == 4 && this.status >= 400) {
            alert("Invalid Login");
        }
    };

    xhttp.open("POST", "/login");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(user));

}

function signup() {

    let user = {
        user_name: document.getElementById('user_name').value,
        password: document.getElementById('password').value,
        password2: document.getElementById('password2').value
    };

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("Valid Signup");
            location.href = '/';
        } else if (this.readyState == 4 && this.status >= 400) {
            alert("Invalid Signup");
        }
    };

    xhttp.open("POST", "/signup");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(user));

}
