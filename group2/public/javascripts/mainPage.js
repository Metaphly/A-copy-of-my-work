function get_events(){

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var event_list = JSON.parse(this.responseText);

            var actorArea = document.getElementById('allevents');
            for (let event of event_list) {

                let anevent = document.createElement('div');
                anevent.className='event';

                let eventcontent = document.createElement('td');
                eventcontent.className= 'eventcontent';

                ventname.innerText = event.description;

                let details = document.createElement('ul');
                let eventname = document.createElement('li');
                let location = document.createElement('li');
                let time = document.createElement('li');

                eventname.innerText = event.event_name;
                location.innerText = event.location;
                location.innerText = event.time;

                wname.appendChild(fname);
                wname.appendChild(lname);
                actorArea.appendChild(wname);
            }
        }
    };
    xhttp.open("GET", "/events");
    xhttp.send();
}