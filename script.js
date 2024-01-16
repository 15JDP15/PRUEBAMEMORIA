document.addEventListener('DOMContentLoaded', function() {
    var startTestButton = document.getElementById('startTest');
    var introElement = document.getElementById('intro');
    var timerElement = document.getElementById('timer');
    var imageArea = document.getElementById('imageArea');
    var questionForm = document.getElementById('questionForm');
    var confirmationMessage = document.getElementById('confirmationMessage');

    startTestButton.addEventListener('click', function() {
        introElement.style.display = 'none';
        startTestButton.style.display = 'none';
        imageArea.style.display = 'block';
        imageArea.innerHTML = '<img src="images/pruebamemoria.jpg" alt="Imagen de Memoria" class="responsive-image" />';
        timerElement.style.display = 'block';

        var timeLeft = 5;
        var timerInterval = setInterval(function() {
            timerElement.innerText = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                timerElement.style.display = 'none';
                imageArea.style.display = 'none';
                questionForm.style.display = 'block';
                questionForm.style.opacity = 1;
                questionForm.style.transform = 'translateY(0)';
            }

            timeLeft -= 1;
        }, 1000);
    });

    questionForm.addEventListener('submit', function(event) {
        event.preventDefault();
        confirmationMessage.style.display = 'block';
        questionForm.style.display = 'none';
    });
});
