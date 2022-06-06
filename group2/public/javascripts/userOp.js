function get_userInfo(){

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var userinfo = JSON.parse(this.responseText);
            var infoArea = document.getElementById('userInfo');

            let infotable = document.createElement('table');
            let infotitles = document.createElement('tr');
            infotitles.innerHTML = "<th>User Id</th> <th>User Name</th>";
            infotable.appendChild(infotitles);

            let detailrow = document.createElement('tr');
            let user_id = document.createElement('th');
            let user_name = document.createElement('th');
            user_id.innerText = userinfo.user_id;
            user_name.innerText = userinfo.user_name;

            detailrow.appendChild(user_id);
            detailrow.appendChild(user_name);
            infotable.appendChild(detailrow);
            infoArea.appendChild(infotable);
        }
    };
    xhttp.open("GET", "/users/userInfo");
    xhttp.send();
}