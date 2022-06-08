function get_userInfo(){

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var userinfo = JSON.parse(this.responseText);
            var infoArea = document.getElementById('userInfo');

            let infotable = document.createElement('table');
            infotable.id = "infotable";
            let infotitles = document.createElement('tr');
            infotitles.innerHTML = "<th>User Id</th> <th>User Name</th> <th>User Email</th>";
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
        } else if (this.readyState == 4 && this.status >= 400){
            alert("Failed");
        }
    };

    xhttp.open("POST", "/users/addevent");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(event));

}

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

function set_freetime() {

    console.log();
    let event_id = document.getElementsByTagName("select")[0];
    console.log(event_id.value);
    let user_event = {
        free_time: document.getElementById('freetime').value,
        event_id: document.getElementsByTagName("select")[0].value
    };

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("free time changed");
        } else if (this.readyState == 4 && this.status >= 400) {
            alert("failed");
        }
    };

    xhttp.open("POST", "/users/freetime");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(user_event));

}