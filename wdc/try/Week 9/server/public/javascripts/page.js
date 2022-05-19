
let post_list = [];

function new_post() {

    let title = document.getElementById('post-title').value;
    let desc = document.getElementById('post-content').value;
    let tags = document.getElementById('post-tags').value.split(" ");

    let new_p = {title: title, desc: desc, tags: tags};

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            get_posts();
        }
    };

    xhttp.open("POST", "/post/new");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(new_p));

}


function get_posts(){

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            post_list = JSON.parse(this.responseText);
            update_posts();
        }
    };

    xhttp.open("GET", "/posts");
    xhttp.send();

}

function update_posts(){

    reset_posts();

    for (let post of post_list) {
        add_post(post.title,post.content,post.tags);
    }

}

function reset_posts(){

    let container = document.getElementsByTagName('main')[0];
    while(container.children.length > 1){
        container.children[1].remove();
    }

}

function add_post(title,desc,tags) {

    let post = document.createElement('DIV');
    post.classList.add("post");


    let votes = document.createElement('DIV');
    votes.classList.add("votes");

    let votes_plus = document.createElement('BUTTON');
    votes_plus.innerText = '+';

    let votes_minus = document.createElement('BUTTON');
    votes_minus.innerText = '-';

    let votes_p = document.createElement('P');
    votes_p.innerHTML = '<span class="count">0</span><br />votes';

    votes.appendChild(votes_plus);
    votes.appendChild(votes_p);
    votes.appendChild(votes_minus);


    let content = document.createElement('DIV');
    content.classList.add("content");

    content.innerHTML = `<h3><a href="post">${title}</a></h3>
    <p>${desc}</p>`;

    // for(let tag of tags){
    //     let t = document.createElement('span');
    //     t.classList.add('tag');
    //     t.innerText = tag;
    //     content.appendChild(t);
    // }

    let d = document.createElement('span');
    d.classList.add('date');
    d.innerText = new Date().toLocaleString();
    content.appendChild(d);

    post.appendChild(votes);
    post.appendChild(content);

    document.getElementsByTagName('main')[0].appendChild(post);

}


function login() {

    let user = {
        username: document.getElementsByName('username')[0].value,
        password: document.getElementsByName('password')[0].value
    };

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("Login Successful");
        } else if (this.readyState == 4 && this.status >= 400) {
            alert("Login Failed");
        }
    };

    xhttp.open("POST", "/login");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(user));

}


function signup() {

    let user = {
        name: document.getElementsByName('name')[0].value,
        username: document.getElementsByName('username')[0].value,
        password: document.getElementsByName('password')[0].value
    };

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("Signup Successful");
        } else if (this.readyState == 4 && this.status >= 400) {
            alert("Signup Failed");
        }
    };

    xhttp.open("POST", "/signup");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(user));

}


setInterval(get_posts,10000);


function onSignIn(googleUser) {
    console.log('test');
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}
