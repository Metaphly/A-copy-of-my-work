function count_incre()
{
    document.getElementById("mcount").innerHTML++;
}

function make_post()
{
    let post = document.createElement("div");
    let time = document.createElement("p");
    let content = document.createElement("p");
    time.innerText = "This is a paragraph";
    post.appendChild(time);
    post.appendChild(content);
    document.getElementById("posts").appendChild(post);
}