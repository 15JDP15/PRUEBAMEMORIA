document.addEventListener('DOMContentLoaded', function() {
    var startTestButton = document.getElementById('startTest');
    var introElement = document.getElementById('intro');
    var timerElement = document.getElementById('timer');
    var imageArea = document.getElementById('imageArea');
    var initialQuestionForm = document.getElementById('initialQuestionForm');
    var imageQuestionForm = document.getElementById('imageQuestionForm');
    var confirmationMessage = document.getElementById('confirmationMessage');
    var loadingMessage = document.getElementById('loadingMessage');

    var formData = {}; // Objeto para almacenar los datos
    var uniqueId = new Date().getTime(); // Identificador único

    // Manejo de la navegación
    const navbarLinks = document.querySelectorAll('#navbar a');
    navbarLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const section = document.querySelector(this.getAttribute('href'));
            section.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Inicia el test
    if (startTestButton) {
        startTestButton.addEventListener('click', function() {
            introElement.style.display = 'none';
            startTestButton.style.display = 'none';
            initialQuestionForm.style.display = 'block';
        });
    }

    // Manejo del envío del formulario inicial
    if (initialQuestionForm) {
        initialQuestionForm.addEventListener('submit', function(event) {
            event.preventDefault();
            new FormData(initialQuestionForm).forEach((value, key) => {
                formData[key] = value;
            });
            formData["uniqueId"] = uniqueId;

            // sendInitialDataToGoogleSheet(initialFormData); // Removido

            initialQuestionForm.style.display = 'none';
            imageArea.style.display = 'block';
            timerElement.style.display = 'block';
            imageArea.innerHTML = '<img src="images/pruebamemoria.jpg" alt="Memory Test Image" class="responsive-image" />';

            var timeLeft = 5;
            var timerInterval = setInterval(function() {
                timerElement.innerText = timeLeft;
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    timerElement.style.display = 'none';
                    imageArea.style.display = 'none';
                    imageQuestionForm.style.display = 'block';
                }
                timeLeft -= 1;
            }, 1000);
        });
    }

    // Manejo del envío del formulario de la imagen
    if (imageQuestionForm) {
        imageQuestionForm.addEventListener('submit', function(event) {
            event.preventDefault();
            new FormData(imageQuestionForm).forEach((value, key) => {
                formData[key] = value;
            });

            sendFormDataToGoogleSheet(formData);
        });
    }

    function sendFormDataToGoogleSheet(data) {
        loadingMessage.style.display = 'block';
        fetch('https://script.google.com/macros/s/AKfycby8uZhweB25w1S8sr8oQJSySMxBItKA9evnbaXpohFVDaCXIsEmQNoRy_DOWULMNLiJ/exec', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            console.log('Data sent to Google Sheet');
            confirmationMessage.style.display = 'block';
            imageQuestionForm.style.display = 'none';
        }).catch(error => {
            console.error('Error:', error);
        }).finally(() => {
            loadingMessage.style.display = 'none';
        });
    }
});