const password = document.getElementById('password');
function showPassword() {

    const icon = document.getElementById('icon');
    if (password.type === 'password') {
       password.type = 'text';
       icon.style.color = 'blue';
    } 
    else {
        password.type = 'password';
        icon.style.color = 'rgb(166, 78, 169)';
    }
}





