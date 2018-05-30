document.getElementById('postForm').addEventListener('submit', userLogin);

function userLogin(event) {

    event.preventDefault();

            let userEmail = document.getElementById('emailtext').value;
            let userPassword = document.getElementById('passwordtext').value;

            fetch('https://mtrack-app.herokuapp.com/api/v1/auth/login', {
                method: 'POST',
                headers : {
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({email: userEmail, password: userPassword})
            }).then((response) => {return response.json()})
            .then((data) =>  console.log(data))
            .catch((err)=> console.log(err))
}
