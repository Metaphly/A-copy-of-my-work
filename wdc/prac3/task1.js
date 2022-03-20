function modify_time()
{
    let d = new Date();
    document.getElementById("current_time").innerHTML = d.toLocaleTimeString();
}
