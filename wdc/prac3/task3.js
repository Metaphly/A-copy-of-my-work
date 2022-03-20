function count_incre()
{
    document.getElementById("mcount").innerHTML++;
}

function make_post()
{
    let post = document.createElement("div");
    let time = document.createElement("p");
    let content = document.createElement("p");
    let muls = document.getElementById("multi").value;
    post.classList.add("single-post");
    time.classList.add("post-time");
    content.classList.add("post-content");
    time.innerText = new Date();
    content.innerText = document.getElementById("post_content").value;

    if(document.getElementById('c_b').checked) {
        content.style.color = "blue";
    }else if(document.getElementById('c_r').checked) {
        content.style.color = "red";
    }

    if(document.getElementById("bol").checked){
        content.style.fontWeight = "bold";
    }

    if(document.getElementById("ita").checked){
        content.style.fontStyle = "italic";
    }

    post.appendChild(time);
    post.appendChild(content);

    for(var i=0; i<muls; i++)
    {
        document.getElementById("posts").appendChild(post.cloneNode(true));
    }
}

function hide_main()
{
    document.getElementById("main").style.display = "none";
    document.getElementById("menu").style.display = "";
    // document.getElementById("main").style.visibility = "hidden";
    //document.getElementById("menu").style.visibility = "visible";
}

function hide_menu()
{
    document.getElementById("main").style.display = "";
    document.getElementById("menu").style.display = "none";
    //document.getElementById("main").style.visibility = "visible";
    //document.getElementById("menu").style.visibility = "hidden";
}

function show_posts()
{
    var therange =document.getElementById("slib").value;
    var posts = document.getElementsByClassName("single-post");
    for(let i=0; i<posts.length;i++)
    {
        posts[i].style.display = "";
        if(i>=therange)
        {
            posts[i].style.display = "none";
        }
    }
}

function change_background()
{
    let cor =document.getElementById("baclor").value;
    document.body.style.backgroundColor = cor;
}