// get the user information and render it into page
function get_userInfo(){

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var userinfo = JSON.parse(this.responseText);
            var infoArea = document.getElementById('userInfo');

            let infotable = document.createElement('table');
            infotable.id = "infotable";
            let infotitles = document.createElement('thead');
            infotitles.innerHTML = "<tr><th>User Id</th> <th>User Name</th> <th>User Email</th></tr>";
            infotable.appendChild(infotitles);

            let detailrow = document.createElement('tr');
            let user_id = document.createElement('td');
            let user_name = document.createElement('td');
            let user_email = document.createElement('td');
            user_id.innerText = userinfo.user_id;
            user_name.innerText = userinfo.user_name;
            user_email.innerText = userinfo.email;

            detailrow.appendChild(user_id);
            detailrow.appendChild(user_name);
            detailrow.appendChild(user_email);
            infotable.appendChild(detailrow);
            infoArea.appendChild(infotable);
        }
    };
    xhttp.open("GET", "/users/userInfo");
    xhttp.send();
}

// change user email
function change_email(){

    let new_email = {
        new_email: document.getElementById('new_email').value
    };

    if(!email_format(new_email.new_email))
    {
        alert("Invalid Email");
        return;
    }

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("email changed");
            location.reload();
        } else if (this.readyState == 4 && this.status >= 400){
            alert("Failed");
        }
    };

    xhttp.open("POST", "/users/changeEmail");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(new_email));
}


// check format (anything@anything.anything) for sign up email input
function email_format(email)
{
    var simplemodel = /\S+@\S+\.\S+/;
    return simplemodel.test(email);
}

function change_name(){

    let new_name = {
        new_name: document.getElementById('new_name').value
    };


    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("name changed");
            location.reload();
        } else if (this.readyState == 4 && this.status >= 400){
            alert("Failed");
        }
    };

    xhttp.open("POST", "/users/changeName");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(new_name));
}

// send event info to server to create event
function create_event(){

    let event = {
        event_name: document.getElementById('event_name').value,
        location: document.getElementById('location').value,
        start_date: document.getElementById('start_date').value,
        description: document.getElementById('description').value,
    };

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("Event created");
            location.reload();
        } else if (this.readyState == 4 && this.status >= 400){
            alert("Failed");
        }
    };

    xhttp.open("POST", "/users/addevent");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(event));

}


// get all events a user enaged in
function get_myevents(){

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            var event_list = JSON.parse(this.responseText);
            element = document.getElementsByTagName("select");

            for (let event of event_list) {

                let choice = document.createElement('option');
                choice.innerText = event.event_id;
                element[0].appendChild(choice);

            }
        }
    };
    xhttp.open("GET", "/users/myevents");
    xhttp.send();
}

// set availability
function set_freetime() {

    let event_id = document.getElementsByTagName("select")[0];
    if(event_id.value==[])
    {
        alert("Please choose an event!");
        return;
    }

    let user_event = {
        free_time: document.getElementById('freetime').value,
        event_id: document.getElementsByTagName("select")[0].value
    };

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("free time changed");
            show_selected_event();
        } else if (this.readyState == 4 && this.status >= 400) {
            alert("failed");
        }
    };

    xhttp.open("POST", "/users/freetime");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(user_event));

}

// show event details and all participants of a selected event
function show_selected_event() {

    let my_event = {
        event_id: document.getElementsByTagName("select")[0].value
    };

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            var event = JSON.parse(this.responseText);
            let headlist = create_event_detail(event);
            let eventdetail = document.getElementById('eventdetail');
            reset_details(eventdetail);
            eventdetail.appendChild(headlist);
            get_members();

        }
    };

    xhttp.open("POST", "/single_event");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(my_event));

}

// get all participants of an event
function get_members() {

    let my_event = {
        event_id: document.getElementsByTagName("select")[0].value
    };

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            var everyone = JSON.parse(this.responseText);
            let memberlist = create_member_list(everyone);
            let eventdetail = document.getElementById('eventdetail');
            eventdetail.appendChild(memberlist);

        }
    };

    xhttp.open("POST", "/users/everyone");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(my_event));

}

// create an name list
function create_member_list(everyone)
{
    let table = document.createElement('table');
    let head = document.createElement('thead');
    head.innerHTML = "<tr><th>User Id</th> <th>User Name</th> <th>User Email</th> <th>Availability</th></tr>";
    table.appendChild(head);

    for (let user of everyone) {
        let newrow = document.createElement('tr');
        let id = document.createElement('td');
        let name = document.createElement('td');
        let email = document.createElement('td');
        let freetime = document.createElement('td');

        id.innerText = user.user_id;
        name.innerText = user.user_name;
        email.innerText = user.email;
        freetime.innerText = user.free_time;

        newrow.appendChild(id);
        newrow.appendChild(name);
        newrow.appendChild(email);
        newrow.appendChild(freetime);
        table.appendChild(newrow);
    }

    return table;
}

function reset_details(part){

    while(part.children.length >= 1){
        part.children[0].remove();
    }

}

// show event details in user center
function create_event_detail(event)
{
    let headlist = document.createElement('ul');
    headlist.className = "detailist";
    let name = document.createElement('li');
    let location = document.createElement('li');
    let date = document.createElement('li');
    let final_time = document.createElement('li');

    name.innerText = event.event_name;
    location.innerText = event.location;
    date.innerText = event.start_date;
    final_time.innerText = "Finalised Time: " + event.final_time;

    headlist.appendChild(name);
    headlist.appendChild(location);
    headlist.appendChild(date);
    headlist.appendChild(final_time);

    return headlist;

}

// get all events created by user, then put them as options in select tag
function get_created_events(){

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            var event_list = JSON.parse(this.responseText);
            element = document.getElementsByTagName("select");

            for (let event of event_list) {

                let choice = document.createElement('option');
                choice.innerText = event.event_id;
                element[0].appendChild(choice);

            }
        }
    };
    xhttp.open("GET", "/users/createdevents");
    xhttp.send();
}

// to finalised time
function set_finaltime() {

    let event_id = document.getElementsByTagName("select")[0];
    if(event_id.value==[])
    {
        alert("Please choose an event!");
        return;
    }

    let user_event = {
        final_time: document.getElementById('finaltime').value,
        event_id: document.getElementsByTagName("select")[0].value
    };

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("final time changed");
            show_selected_event();
        } else if (this.readyState == 4 && this.status >= 400) {
            alert("failed");
        }
    };

    xhttp.open("POST", "/users/finaltime");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(user_event));

}

// get the user information and render it into page
function get_all_userInfo(){

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var list = JSON.parse(this.responseText);
            var infoArea = document.getElementById('userInfo');
            infoArea.appendChild(create_admin_table(list));
        }
    };
    xhttp.open("GET", "/users/admin/userlist");
    xhttp.send();
}

// create table
function create_admin_table(list)
{
    let infotable = document.createElement('table');
    infotable.id = "infotable";
    let infotitles = document.createElement('thead');
    infotitles.innerHTML = "<tr><th>User Id</th> <th>User Name</th> <th>User Email</th> <th>Is Admin</th></tr>";
    infotable.appendChild(infotitles);

    console.log(list);
    for (let user of list){
        console.log(list);
        let detailrow = document.createElement('tr');
        let user_id = document.createElement('td');
        let user_name = document.createElement('td');
        let user_email = document.createElement('td');
        let is_admin = document.createElement('td');
        user_id.innerText = user.user_id;
        user_name.innerText = user.user_name;
        user_email.innerText = user.email;
        is_admin.innerText = user.is_admin;

        detailrow.appendChild(user_id);
        detailrow.appendChild(user_name);
        detailrow.appendChild(user_email);
        detailrow.appendChild(is_admin);
        infotable.appendChild(detailrow);
        return infotable;
    }
}