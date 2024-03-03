function f_pruebamemoria() 
{
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
    var prepForSecondImage = document.getElementById('prepForSecondImage');
    var beginSecondMemorizationButton = document.getElementById('beginSecondMemorization');
    var newImageContainer = document.getElementById('newImageContainer');
    var formData = {};
    var uniqueId = new Date().getTime();

    // Ocultar inicialmente la sección de preparación y el área de imagen
    prepForMemoryTest.style.display = 'none';
    imageArea.style.display = 'none';
    confirmationMessage.style.display = 'none';
    
    // --- FORMULARI initialQuestionForm ---

    initialQuestionForm.addEventListener('submit', function(event) {
        event.preventDefault();
        new FormData(initialQuestionForm).forEach((value, key) => {
            formData[key] = value;
        });
        formData["step"] = "initialQuestionForm";
        formData["uniqueId"] = uniqueId;
        sendFormDataToGoogleSheet(formData);
        initialQuestionForm.style.display = 'none';
        prepForMemoryTest.style.display = 'block';
    });

    startTestButton.addEventListener('click', function() {
        introElement.style.display = 'none';
        startTestButton.style.display = 'none';
        initialQuestionForm.style.display = 'block';
    });

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

    beginMemorizationButton.addEventListener('click', function() {
        prepForMemoryTest.style.display = 'none';
        imageArea.style.display = 'block';
        timerElement.style.display = 'block';
        imageArea.innerHTML = '<img src="pruebamemoria.jpg" alt="Memory Test Image" class="responsive-image" />';
        startMemoryTest();
    });

    // --- FORMULARI imageQuestionForm ---
    imageQuestionForm.addEventListener('submit', function(event) {
        event.preventDefault();
        new FormData(imageQuestionForm).forEach((value, key) => {
            formData[key] = value;
        });
        formData["step"] = "imageQuestionForm";
        sendFormDataToGoogleSheet(formData);
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
    
    // --- FORMULARI secondImageQuestions ---
    secondImageQuestions.addEventListener('submit', function(event) {
        event.preventDefault();
        new FormData(secondImageQuestions).forEach((value, key) => {
            formData[key] = value;
        });
        formData["step"] = "secondImageQuestions";
        sendFormDataToGoogleSheet(formData);
        confirmationMessage.style.display = 'block';
        secondImageQuestions.style.display = 'none';
    });


    // --- Enviament de dades al Backend ---
    // Funció que envia les dades a Google Sheets
    function sendFormDataToGoogleSheet(data) {
        loadingMessage.style.display = 'block';
        fetch('https://script.google.com/macros/s/AKfycbyFJCqxqZGEvorTMObzJ4LYm6TwjTjaLUwBoFhm2d1CxfPba6UTf4XhM7Xg6f0ColZa/exec', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            console.log('Data sent to Google Sheet');            
        }).catch(error => {
            console.error('Error:', error);
        }).finally(() => {
            loadingMessage.style.display = 'none';
        });
    }
    
    // Altres funcions
    // Manejo de la navegación
    const navbarLinks = document.querySelectorAll('#navbar a');
    navbarLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const section = document.querySelector(this.getAttribute('href'));
            section.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

document.addEventListener('DOMContentLoaded', f_pruebamemoria);
