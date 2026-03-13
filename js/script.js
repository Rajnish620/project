// Button alert functionality
document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('.button');
    if (button) {
        button.addEventListener('click', function() {
            alert('Welcome to our site! 👋');
        });
    }
});
