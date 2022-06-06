function get_userInfo(){

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var userinfo = JSON.parse(this.responseText);
            var infoArea = document.getElementById('userInfo');

            let user_id = document.createElement('p');
            let user_email = document.createElement('p');

            user_id.innerText = "User Id: " + userinfo.user_id;
            user_email.innerText = "User Name: " + userinfo.email;
            infoArea.appendChild(user_id);
            infoArea.appendChild(user_email);

            let infotable = document.createElement('table');
            let infotitles = document.createElement('tr');
            infotitles.innerHTML = "<th>User Id</th> <th>User Name</th>";
            infotable.appendChild(infotitles);

            infoArea.appendChild(infotable);
        }
    };
    xhttp.open("GET", "/users/userInfo");
    xhttp.send();
}