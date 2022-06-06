function get_userInfo(){

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var userinfo = JSON.parse(this.responseText);
            var infoArea = document.getElementById('userInfo');

            let user_id = document.createElement('p');
            let user_email = document.createElement('p');

            user_id.innerText = userinfo.user_id;
            user_email.innerText = userinfo.email;
            infoArea.appendChild(user_id);
            infoArea.appendChild(user_email);
        }
    };
    xhttp.open("GET", "/users/userInfo");
    xhttp.send();
}