
const BASE_URL = 'https://mtrack-app.herokuapp.com';

const token = localStorage.getItem("token");

document.getElementById('loader-img').innerHTML = '<img src="./assets/images/loader.gif" class="loader-img" />';
document.getElementById('loader').innerHTML = '...Loading Requests...';
document.getElementById('error').style.display = 'none';

document.getElementById('welcome-msg').innerHTML = 'Welcome' + ' ' + localStorage.getItem("name");

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

        document.getElementById('request-table').style.display = 'none';
        document.getElementById('error').style.display = 'block';
        document.getElementById('error').innerHTML = 'You are yet to add a request!';
        document.getElementById('loader-img').style.display = 'none';
        document.getElementById('loader').style.display = 'none';

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
          if (requests.values == 'pending') {
            actionValue = '<a href= "edit_request_user.html?requestId=' + requests.priority + ' ">' + '<button class="edit-button" onclick=" ">View / Edit</button></a>';
          } else if (requests.values == 'approve') {
            actionValue = 'APPROVED';
          } else if (requests.values == 'declined') {
            actionValue = 'DECLINED';
          } else if (requests.values == 'resolve') {
            actionValue = 'RESOLVED';
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


          // demoP.innerHTML = demoP.innerHTML + "index[" + index + "]: " + item + "<br>";
        }
        document.getElementById('loader-img').style.display = 'none';
        document.getElementById('loader').style.display = 'none';
        document.getElementById('error').style.display = 'none';

      }
    }
    )
    .catch((err) => console.log(err))
}
