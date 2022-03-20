function count_incre()
{
    document.getElementById("mcount").innerHTML++;
}

function make_post()
{
    document.getElementById("posts").innerText = document.getElementsByTagName("textarea")[0].innerHTML;
}