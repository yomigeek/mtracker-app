document.getElementById('signup-form').addEventListener('submit', userSignup);

const baseUrl = 'https://mtrack-app.herokuapp.com';

const token = localStorage.getItem("token");


const htmlElementDisplay = (htmlId, displayStyle) => {
  document.getElementById(htmlId).style.display = displayStyle;
}

function addRequest(event) {

  htmlElementDisplay('request-create', 'block');
  htmlElementDisplay('request-form', 'none');

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
        htmlElementDisplay('request-form', 'block');

      } else {

        htmlElementDisplay('request-fail', 'block');
        htmlElementDisplay('request-form', 'block');
        htmlElementDisplay('error', 'block');
        document.getElementById('error').innerHTML = data.message;
      }
    }
    )
    .catch((err) => console.log(err))
}
