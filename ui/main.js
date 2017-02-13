//Counter code
var button = document.getElementById("counter");

button.onclick = function () {
    
    var request = new XMLHttpRequest();
    
    //capture the response and store it in a variable
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            //take some action
            if (request.status === 200) {
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
            }
        }
        //not done yet
    };
    //make the request
    request.open('GET', 'http://ssthil.imad.hasura-app.io/counter', true);
    request.send(null);
};

//Submit name
var submit = document.getElementById('submit_btn');
submit.onclick = function () {
    
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                
                var names = request.responseText;
                names = JSON.parse(names);
                var list = '';
                
                for (var i=0; i < names.length; i++) {
                    list += '<li>'+names[i]+'</li>';
                }
                var ul = document.getElementById('namelist');
                ul.innerHTML = list; 
            }
        }
    };
    var nameInput = document.getElementById('name');
    var listname = nameInput.value;
    //make the request
    request.open('GET', 'http://ssthil.imad.hasura-app.io/submit-name?name='+listname, true);
    request.send(null);
};