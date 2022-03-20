function get_time()
{
    let d = new Date();
    document.getElementById("current_time").innerHTML = d.toLocaleTimeString();
}

get_time();