document.addEventListener('DOMContentLoaded', function() {
    var startTestButton = document.getElementById('startTest');
    var timerElement = document.getElementById('timer'); // Obtener el elemento del temporizador

    if(startTestButton) {
        startTestButton.addEventListener('click', function() {
            startTestButton.style.display = 'none'; // Ocultar el botón de inicio
            timerElement.style.display = 'block'; // Mostrar el temporizador

            var timeLeft = 5; // Duración del temporizador en segundos
            var timerInterval = setInterval(function() {
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    hideImageAndShowQuestions();
                } else {
                    timerElement.innerText = timeLeft; // Actualizar el temporizador
                }
                timeLeft -= 1;
            }, 1000);

            showImage();
        });
    }

    function showImage() {
        var imageArea = document.getElementById('imageArea');
        if(imageArea) {
            imageArea.style.display = 'block';
            imageArea.innerHTML = '<img src="images/pruebamemoria.jpg" alt="Imagen de Memoria" class="responsive-image" />';
        }
    }
    

    function hideImageAndShowQuestions() {
        var imageArea = document.getElementById('imageArea');
        var questionForm = document.getElementById('questionForm');
        if(imageArea && questionForm) {
            imageArea.style.display = 'none';
            questionForm.style.display = 'block';
            timerElement.style.display = 'none'; // Ocultar el temporizador
        }
    }

    var questionForm = document.getElementById('questionForm');
    if(questionForm) {
        questionForm.addEventListener('submit', function(event) {
            event.preventDefault();
            var openQuestionAnswer = document.getElementById('openQuestion').value;
            

            // Mostrar mensaje de confirmación
            document.getElementById('confirmationMessage').style.display = 'block';

            // Opcionalmente, ocultar el formulario
            questionForm.style.display = 'none';
        });
    }
});
