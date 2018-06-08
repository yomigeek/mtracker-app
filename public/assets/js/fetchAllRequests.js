
const BASE_URL = 'https://mtrack-app.herokuapp.com';

const token = localStorage.getItem("token");


const innerHtmlDisplay = (htmlId, display) => {
  return document.getElementById(htmlId).innerHTML = display;
}

const htmlElementDisplay = (htmlId, displayStyle) => {
  return document.getElementById(htmlId).style.display = displayStyle;
}

innerHtmlDisplay('loader-img', '<img src="./assets/images/loader.gif" class="loader-img" />');
innerHtmlDisplay('loader', '...Loading Requests...');
htmlElementDisplay('error', 'none');
innerHtmlDisplay('welcome-msg', 'Welcome' + ' ' + localStorage.getItem("name"));


// document.getElementById('welcome-msg').innerHTML = 'Welcome' + ' ' + localStorage.getItem("name");

setInterval(loadRequests(), 4000);

function loadRequests(event) {

  fetch(BASE_URL + '/api/v1/users/requests', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  }).then((response) => { return response.json() })
    .then((data) => {
      if (data.status == 'fail' && data.message == 'User does not have a reqeuest yet!') {
        
        htmlElementDisplay('request-table', 'none');
        htmlElementDisplay('error', 'block');
        htmlElementDisplay('loader-img', 'none');
        htmlElementDisplay('loader', 'none');        
        innerHtmlDisplay('error', 'You are yet to add a request!');
      }
      else {
        for (i = 0; i < data.data.requests.length; i++) {

          let serialNumber = i + 1;
          const requests = data.data.requests[i];
          const table = document.getElementById("request-table");
          const row = table.insertRow(serialNumber);
          const serialNumberCell = row.insertCell(0)
          const requestIdCell = row.insertCell(1);
          const titleCell = row.insertCell(2);
          const descriptionCell = row.insertCell(3);
          const priorityCell = row.insertCell(4);
          const actionCell = row.insertCell(5);

          let actionValue;
          if (requests.status == 1) {
            actionValue = '<a href= "edit_request_user.html?requestId=' + requests.id + ' ">' + '<button class="edit-button" onclick=" ">View / Edit</button></a>';
          } else if (requests.status == 2) {
            actionValue = requests.values;
          } else if (requests.status == 3) {
            actionValue = requests.values;
          } else if (requests.status == 4) {
            actionValue = requests.values;
          }
          else {
            actionValue = '';
          }

          serialNumberCell.innerHTML = i + 1;
          requestIdCell.innerHTML = requests.id;
          titleCell.innerHTML = requests.title;
          descriptionCell.innerHTML = requests.description;
          priorityCell.innerHTML = requests.priority;
          actionCell.innerHTML = actionValue;

        }
        htmlElementDisplay('loader-img', 'none');        
        htmlElementDisplay('loader', 'none');        
        htmlElementDisplay('error', 'none'); 
      }
    }
    )
    .catch((err) => console.log(err))
}
