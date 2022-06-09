// get all events in database, render them into page
function get_events(){

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var event_list = JSON.parse(this.responseText);

            var selection = document.getElementsByTagName("select")[0];
            var eventArea = document.getElementById('allevents');
            for (let event of event_list) {

                // add event id to the selector
                let newop = make_choice(event);
                selection.appendChild(newop);

                // add an event to page
                let anevent = create_single_event(event);
                eventArea.appendChild(anevent);
            }
        }
    };
    xhttp.open("GET", "/events");
    xhttp.send();
}


// events are listed as rectangles in main page
// this function creates the template of an event rectangle
function create_single_event(event){

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

    return anevent;
}

// add an event id to the selector
function make_choice(event){
    let newchoice = document.createElement('option');
    newchoice.innerText = event.event_id;
    return newchoice;
}


// send login info to server
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

// send sign up info to server
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

// send the selected event to server
// add this event as enroled
function take_event() {

    let user_event = {
        event_id: document.getElementsByTagName("select")[0].value
    };

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("added sucessfully, check it in user center");
        } else if (this.readyState == 4 && this.status >= 400) {
            alert("unauthorized");
        }
    };

    xhttp.open("POST", "/users/takeevent");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(user_event));

}


// google login
function onSignIn(googleUser) {

    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    let googleuser = {
        token: googleUser.getAuthResponse().id_token
    };

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("Success");
        } else if (this.readyState == 4 && this.status >= 400) {
            alert("Failed");
        }
    };

    xhttp.open("POST", "/googleuser");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(googleuser));
}

// google sign out
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}

// sign out google if no user session
/*
function signOut_google(){

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //signOut();
        }
    };
    xhttp.open("GET", "/google_logout");
    xhttp.send();
}
*/


function signOut_google(){

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {


        }
    };
    xhttp.open("GET", "/google_logout");
    xhttp.send();
}

