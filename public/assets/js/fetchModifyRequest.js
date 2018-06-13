document.getElementById('edit-form').addEventListener('submit', modifyRequest);

const baseUrl = 'https://mtrack-app.herokuapp.com';

const pageUrl = window.location.href;
const getRequestId = pageUrl.charAt(pageUrl.length - 1);

const htmlElementDisplay = (htmlId, displayStyle) => {
  document.getElementById(htmlId).style.display = displayStyle;
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

  fetch(baseUrl + '/api/v1/users/requests/'+ getRequestId, {
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
