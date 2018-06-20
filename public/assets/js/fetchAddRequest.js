document.getElementById('request-form').addEventListener('submit', addRequest);

const baseUrl = 'https://mtrack-app.herokuapp.com';

const htmlElementDisplay = (htmlId, displayStyle) => {
  document.getElementById(htmlId).style.display = displayStyle;
}

const innerHtmlDisplay = (htmlId, display) => {
  return document.getElementById(htmlId).innerHTML = display;
}

htmlElementDisplay('show-request-create', 'none');
htmlElementDisplay('show-request-success', 'none');
htmlElementDisplay('show-request-fail', 'none');
htmlElementDisplay('error', 'none');

function addRequest(event) {

  innerHtmlDisplay('show-request-create', '<div class="approve-category-panel" id="request-create">Creating request....</div>');
  htmlElementDisplay('show-request-create', 'block');
  htmlElementDisplay('request-details-box', 'none');
  htmlElementDisplay('show-request-fail', 'none');
  htmlElementDisplay('show-request-success', 'none');
  htmlElementDisplay('error', 'none');

  event.preventDefault();

  let requestTitle = document.getElementById('title').value;
  let requestDescription = document.getElementById('description').value;
  let requestPriority = document.getElementById('priority').value;

  fetch(baseUrl + '/api/v1/users/requests', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ title: requestTitle, description: requestDescription, priority: requestPriority })
  }).then((response) => { return response.json() })
    .then((data) => {

      if (data.status == 'success') {

        innerHtmlDisplay('show-request-success', '<div class="approve-category-panel" id="request-success">Request Created Succesfully!</div>');
        htmlElementDisplay('show-request-success', 'block');
        htmlElementDisplay('request-details-box', 'block');
        htmlElementDisplay('show-request-create', 'none');


      } else {

        innerHtmlDisplay('show-request-fail', '<div class="decline-category-panel" id="request-fail">Creating Request failed!</div>');
        htmlElementDisplay('show-request-create', 'none');
        htmlElementDisplay('show-request-fail', 'block');
        htmlElementDisplay('request-details-box', 'block');
        htmlElementDisplay('error', 'block');
        document.getElementById('error').innerHTML = data.message;
      }
    }
    )
    .catch((err) => console.log(err))
}
