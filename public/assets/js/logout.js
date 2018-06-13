function logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    document.getElementById('success-msg').style.display = 'block';
    window.location.href = '/login.html';
}

logOut();
