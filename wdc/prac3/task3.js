function count_incre()
{
    document.getElementById("mcount").innerHTML++;
}

function make_post()
{
    let time = document.createElement("p");
    time.innerText = "This is a paragraph";
    document.getElementById("posts").appendChild(time);
}