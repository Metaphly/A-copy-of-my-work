function count_incre()
{
    document.getElementById("mcount").innerHTML++;
}

function make_post()
{
    let post = document.createElement("div");
    let time = document.createElement("p");
    let content = document.createElement("p");
    time.classList.add("post-time");
    content.classList.add("post-content");
    time.innerText = new Date();
    content.innerText = document.getElementById("post_content").value;
    post.appendChild(time);
    post.appendChild(content);
    document.getElementById("posts").appendChild(post);
}

function hide_main()
{
    document.getElementById("main").style.display = "none";
    document.getElementById("menu").style.display = "block";
}

function hide_menu
{
    document.getElementById("main").style.display = "block";
    document.getElementById("menu").style.display = "none";
}