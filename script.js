document.addEventListener('DOMContentLoaded', function() {
    // 1. Inicialización de variables y elementos del DOM
    var startTestButton = document.getElementById('startTest');
    var introElement = document.getElementById('intro');
    var initialQuestionForm = document.getElementById('initialQuestionForm');
    var prepForMemoryTest = document.getElementById('prepForMemoryTest');
    var beginMemorizationButton = document.getElementById('beginMemorization');
    var imageArea = document.getElementById('imageArea');
    var timerElement = document.getElementById('timer');
    var imageQuestionForm = document.getElementById('imageQuestionForm');
    var confirmationMessage = document.getElementById('confirmationMessage');
    var loadingMessage = document.getElementById('loadingMessage');
    var siguienteButton = document.getElementById('siguiente');
    var prepForSecondImage = document.getElementById('prepForSecondImage');
    var beginSecondMemorizationButton = document.getElementById('beginSecondMemorization');
    var newImageContainer = document.getElementById('newImageContainer');
    var formData = {};
    var uniqueId = new Date().getTime();

    // Supongamos que tienes varios formularios: formulario1, formulario2, etc.
    // Asegúrate de tener un manejador de evento 'submit' para cada uno que acumule datos en `formData`
    
    document.querySelectorAll('form').forEach(function(form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            new FormData(form).forEach((value, key) => {
                formData[key] = (formData[key] || []).concat(value); // Acumula valores, permite múltiples respuestas para una misma clave
            });
            // Opcional: ocultar el formulario actual y mostrar el siguiente
        });
    });

    // Botón para enviar todos los datos acumulados
    document.getElementById('submitAll').addEventListener('click', function(event) {
        event.preventDefault();
        sendFormDataToGoogleSheet(formData);
    });

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

    // 2. Definición de funciones
    function startMemoryTest() {
        var timeLeft = 5; // Ajusta este valor al tiempo deseado
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
    }

 

    // 3. Configuración de eventos y lógica de interacción
    // Ocultar inicialmente la sección de preparación y el área de imagen
    prepForMemoryTest.style.display = 'none';
    imageArea.style.display = 'none';

    startTestButton.addEventListener('click', function() {
        introElement.style.display = 'none';
        startTestButton.style.display = 'none';
        initialQuestionForm.style.display = 'block';
    });

    initialQuestionForm.addEventListener('submit', function(event) {
        event.preventDefault();
        new FormData(initialQuestionForm).forEach((value, key) => {
            formData[key] = value;
        });
        formData["uniqueId"] = uniqueId;
        initialQuestionForm.style.display = 'none';
        prepForMemoryTest.style.display = 'block';
    });

    beginMemorizationButton.addEventListener('click', function() {
        prepForMemoryTest.style.display = 'none';
        imageArea.style.display = 'block';
        timerElement.style.display = 'block';
        imageArea.innerHTML = '<img src="pruebamemoria.jpg" alt="Memory Test Image" class="responsive-image" />';
        startMemoryTest();
    });

    imageQuestionForm.addEventListener('submit', function(event) {
        event.preventDefault();
        new FormData(imageQuestionForm).forEach((value, key) => {
            formData[key] = value;
        });
        sendFormDataToGoogleSheet(formData);
    });

    siguienteButton.addEventListener('click', function(event) {
        event.preventDefault();
        imageQuestionForm.style.display = 'none';
        prepForSecondImage.style.display = 'block';
    });

    beginSecondMemorizationButton.addEventListener('click', function() {
        prepForSecondImage.style.display = 'none'; // Oculta el mensaje de preparación
        newImageContainer.style.display = 'block'; // Muestra la nueva imagen
    
        setTimeout(function() {
            newImageContainer.style.display = 'none'; // Oculta la imagen después del tiempo especificado
            document.getElementById('secondImageQuestions').style.display = 'block'; // Muestra el formulario de preguntas
        }, 3000);
    
    });
    


    // Manejo de la navegación
    const navbarLinks = document.querySelectorAll('#navbar a');
    navbarLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const section = document.querySelector(this.getAttribute('href'));
            section.scrollIntoView({ behavior: 'smooth' });
        });
    });
});
