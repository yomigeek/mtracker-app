
const BASE_URL = 'https://mtrack-app.herokuapp.com';

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

setInterval(loadRequests(), 4000);

function loadRequests(event) {

  fetch(BASE_URL + '/api/v1/requests', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  }).then((response) => { return response.json() })
    .then((data) => {
      if (data.status == 'fail') {
        
        htmlElementDisplay('request-table', 'none');
        htmlElementDisplay('error', 'block');
        htmlElementDisplay('loader-img', 'none');
        htmlElementDisplay('loader', 'none');        
        innerHtmlDisplay('error', data.message);
      }
      else {
        for (i = 0; i < data.data.requests.length; i++) {

          let serialNumber = i + 1;
          const requests = data.data.requests[i];
          const table = document.getElementById("request-table");
          const row = table.insertRow(serialNumber);
          const serialNumberCell = row.insertCell(0)
          const requestIdCell = row.insertCell(1);
          const requestNameCell = row.insertCell(2);
          const titleCell = row.insertCell(3);
          const descriptionCell = row.insertCell(4);
          const priorityCell = row.insertCell(5);
          const statusCell = row.insertCell(6);
          const actionCell = row.insertCell(7);

          let actionValue = '<a href= "view_request_admin.html?requestId=' + requests.id + ' ">' + '<button class="edit-button" onclick=" ">View</button></a>';
          if (requests.status == 1) {
            status = requests.values.toUpperCase();
        } else if (requests.status == 2) {
            status = requests.values.toUpperCase();
          } else if (requests.status == 3) {
            status = requests.values.toUpperCase();
          } else if (requests.status == 4) {
            status = requests.values.toUpperCase();
          }
          else {
            actionValue = '';
          }

          serialNumberCell.innerHTML = i + 1;
          requestIdCell.innerHTML = requests.id;
          requestNameCell.innerHTML = requests.username;
          titleCell.innerHTML = requests.title;
          descriptionCell.innerHTML = requests.description;
          priorityCell.innerHTML = requests.priority;
          statusCell.innerHTML = status;
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
