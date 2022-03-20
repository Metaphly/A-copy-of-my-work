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
    post.appendChild(time);
    post.appendChild(content);
    document.getElementById("posts").appendChild(post);
}