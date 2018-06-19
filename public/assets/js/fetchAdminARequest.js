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
htmlElementDisplay('request-details-box', 'none');
htmlElementDisplay('approve-button', 'none');
htmlElementDisplay('decline-button', 'none')
htmlElementDisplay('resolve-button', 'none');
htmlElementDisplay('loader', 'none');
htmlElementDisplay('loader-img', 'none');
htmlElementDisplay('resolve-success', 'none');
htmlElementDisplay('approve-success', 'none');
htmlElementDisplay('approve-fail', 'none');

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



function requestAction(actionType) {

  let fetchActionUrl;
  let notification;

  if (actionType == 1) {
      fetchActionUrl = BASE_URL + '/api/v1/requests/'+ getRequestId + '/approve';
      notification = htmlElementDisplay('approve-success', 'block');

  }
  if (actionType == 2) {
    fetchActionUrl = BASE_URL + '/api/v1/requests/'+ getRequestId + '/disapprove';
    notification = htmlElementDisplay('approve-fail', 'block');

  }
  if (actionType == 3) {
    fetchActionUrl = BASE_URL + '/api/v1/requests/'+ getRequestId + '/resolve';
    notification = htmlElementDisplay('resolve-success', 'block');
  }

  innerHtmlDisplay('loader-img', '<img src="./assets/images/loader2.gif" class="loader-img" />');
  innerHtmlDisplay('loader', '...Approving Request...');
  htmlElementDisplay('request-details-box', 'none');

  fetch(fetchActionUrl, {
      method: 'PUT',
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
          
          htmlElementDisplay('request-details-box', 'none');
          htmlElementDisplay('error', 'none');
          htmlElementDisplay('loader', 'none');
          htmlElementDisplay('loader-img', 'none');
          notification;

          setTimeout('window.location.href = "/view_request_admin.html?requestId='+ getRequestId +'"',3000); // milliseconds
        }
      }
      )
      .catch((err) => console.log(err))
}
