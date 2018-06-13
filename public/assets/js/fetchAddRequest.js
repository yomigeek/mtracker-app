document.getElementById('request-form').addEventListener('submit', addRequest);

const baseUrl = 'https://mtrack-app.herokuapp.com';

const htmlElementDisplay = (htmlId, displayStyle) => {
  document.getElementById(htmlId).style.display = displayStyle;
}

htmlElementDisplay('request-create', 'none');
htmlElementDisplay('request-success', 'none');
htmlElementDisplay('request-fail', 'none');
htmlElementDisplay('error', 'none');



function addRequest(event) {

  htmlElementDisplay('request-create', 'block');
  htmlElementDisplay('request-details-box', 'none');
  htmlElementDisplay('request-fail', 'none');
  htmlElementDisplay('request-success', 'none');

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

        htmlElementDisplay('request-success', 'block');
        htmlElementDisplay('request-details-box', 'block');
        htmlElementDisplay('request-create', 'none');


      } else {

        htmlElementDisplay('request-create', 'none');
        htmlElementDisplay('request-fail', 'block');
        htmlElementDisplay('request-details-box', 'block');
        htmlElementDisplay('error', 'block');
        document.getElementById('error').innerHTML = data.message;
      }
    }
    )
    .catch((err) => console.log(err))
}
