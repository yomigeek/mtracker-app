document.getElementById('postForm').addEventListener('submit', userLogin);
const baseUrl = 'https://mtrack-app.herokuapp.com';

function userLogin(event) {

  document.querySelector('.working-msg').style.display = 'block';
  document.querySelector('#postForm').style.display = 'none';



  event.preventDefault();

  let userEmail = document.getElementById('emailtext').value;
  let userPassword = document.getElementById('passwordtext').value;


  fetch(baseUrl + '/api/v1/auth/login', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: userEmail, password: userPassword })
  }).then((response) => { return response.json() })
    .then((data) => {
      if (data.status == 'success') {


        document.querySelector('.working-msg').style.display = 'none';
        document.querySelector('.success-msg').style.display = 'block';
        document.querySelector('#postForm').style.display = 'none';

        const url = document.getElementById('url').value;

        localStorage.setItem("token", data.data.mytoken);
        localStorage.setItem("name", data.data.username);

        window.location.href = url;

      } else {

        document.querySelector('#postForm').style.display = 'block';
        document.querySelector('.error').style.display = 'block';
        document.querySelector('.working-msg').style.display = 'none';

      }
    }
    )
    .catch((err) => console.log(err))
}
