const BASE_URL = 'https://mtrack-app.herokuapp.com';

const token = localStorage.getItem("token");

const pageUrl = window.location.href;
const getRequestId = pageUrl.charAt(pageUrl.length - 1);

const innerHtmlDisplay = (htmlId, display) => {
  return document.getElementById(htmlId).innerHTML = display;
}

const htmlElementDisplay = (htmlId, displayStyle) => {
  return document.getElementById(htmlId).style.display = displayStyle;
}

htmlElementDisplay('error', 'none');
htmlElementDisplay('request-details-box', 'none');
htmlElementDisplay('approve-button', 'none');
htmlElementDisplay('decline-button', 'none')
htmlElementDisplay('resolve-button', 'none');
innerHtmlDisplay('request-id', getRequestId);

loadRequests();

function loadRequests(event) {

  fetch(BASE_URL + '/api/v1/requests/'+ getRequestId, {
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

        innerHtmlDisplay('requester-name', requests.username);
        innerHtmlDisplay('request-title', requests.title);
        innerHtmlDisplay('request-description', requests.description);
        innerHtmlDisplay('request-status', requests.values.toUpperCase());
        innerHtmlDisplay('request-priority', requests.priority);

        switch (requests.status) {
            case 1:
                htmlElementDisplay('approve-button', 'block');
                htmlElementDisplay('decline-button', 'block');                
                break;
            case 2:
                htmlElementDisplay('decline-button', 'block');
                htmlElementDisplay('resolve-button', 'block');                
                break;
            case 3:
                htmlElementDisplay('approve-button', 'block');
                break;
            case 4:
                innerHtmlDisplay('resolve-message', 'Request Already Resolved!');
        }

      }
    }
    )
    .catch((err) => console.log(err))
}
