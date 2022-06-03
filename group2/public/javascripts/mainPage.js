function get_events(){

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var event_list = JSON.parse(this.responseText);

            var eventArea = document.getElementById('allevents');
            for (let event of event_list) {

                let anevent = document.createElement('div');
                anevent.className='event';

                let eventcontent = document.createElement('td');
                eventcontent.className= 'eventcontent';

                eventname.innerText = event.description;

                let details = document.createElement('ul');
                let eventname = document.createElement('li');
                let location = document.createElement('li');
                let time = document.createElement('li');

                eventname.innerText = event.event_name;
                location.innerText = event.location;
                time.innerText = event.start_time;

                details.appendChild( eventname);
                details.appendChild(location);
                details.appendChild(time);
                eventArea.appendChild(eventcontent);
                eventArea.appendChild(details);
            }
        }
    };
    xhttp.open("GET", "/events");
    xhttp.send();
}

get_events();