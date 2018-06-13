document.getElementById('edit-form').addEventListener('submit', modifyRequest);

const BASE_URL = 'https://mtrack-app.herokuapp.com';

const pageUrl = window.location.href;
const getRequestId = pageUrl.charAt(pageUrl.length - 1);

const innerHtmlDisplay = (htmlId, display) => {
  return document.getElementById(htmlId).innerHTML = display;
}

const htmlElementDisplay = (htmlId, displayStyle) => {
  return document.getElementById(htmlId).style.display = displayStyle;
}

htmlElementDisplay('error', 'none');
htmlElementDisplay('edit-process', 'none');
htmlElementDisplay('edit-success', 'none');
htmlElementDisplay('edit-fail', 'none');
innerHtmlDisplay('request-id', 'Request ID: '+ getRequestId);

loadRequests();

function loadRequests(event) {

  fetch(BASE_URL + '/api/v1/users/requests/'+ getRequestId, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  }).then((response) => { return response.json() })
    .then((data) => {
      if (data.status == 'fail') {
        
        htmlElementDisplay('request-details-box', 'none');
        htmlElementDisplay('error', 'block');
        innerHtmlDisplay('error', data.message);
      }
      else {
        
        const requests = data.data.requests;
        htmlElementDisplay('request-details-box', 'block');
        htmlElementDisplay('error', 'none');

        document.getElementById('title').value = requests.title;
        document.getElementById('description').value = requests.description;
        document.getElementById('priority').value = requests.priority;
      }
    }
    )
    .catch((err) => console.log(err))
}


function modifyRequest(event) {

  htmlElementDisplay('edit-process', 'block');
  htmlElementDisplay('request-details-box', 'none');
  htmlElementDisplay('edit-fail', 'none');
  htmlElementDisplay('edit-success', 'none');

  event.preventDefault();

  let requestTitle = document.getElementById('title').value;
  let requestDescription = document.getElementById('description').value;
  let requestPriority = document.getElementById('priority').value;

  fetch(BASE_URL + '/api/v1/users/requests/'+ getRequestId, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ title: requestTitle, description: requestDescription, priority: requestPriority })
  }).then((response) => { return response.json() })
    .then((data) => {

      if (data.status == 'success') {

        htmlElementDisplay('edit-success', 'block');
        htmlElementDisplay('request-details-box', 'block');
        htmlElementDisplay('edit-process', 'none');


      } else {

        htmlElementDisplay('edit-process', 'none');
        htmlElementDisplay('edit-fail', 'block');
        htmlElementDisplay('request-details-box', 'block');
        htmlElementDisplay('error', 'block');
        document.getElementById('error').innerHTML = data.message;
      }
    }
    )
    .catch((err) => console.log(err))
}

