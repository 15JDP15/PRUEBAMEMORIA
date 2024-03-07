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
    var prepForSecondImage = document.getElementById('prepForSecondImage');
    var beginSecondMemorizationButton = document.getElementById('beginSecondMemorization');
    var newImageContainer = document.getElementById('newImageContainer');
    var formData = {};
    var uniqueId = new Date().getTime();

    // Ocultar inicialmente la sección de preparación y el área de imagen
    prepForMemoryTest.style.display = 'none';
    imageArea.style.display = 'none';
    
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
        var timeLeft = 1; // Ajusta este valor al tiempo deseado
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
        imageArea.innerHTML = '<img src="ejercicio1.jpg" alt="Memory Test Image" id="ejercicio1" class="responsive-image" />';
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

    document.addEventListener('DOMContentLoaded', function() {
        var ejercicio1 = document.getElementById('ejercicio1');
        if (ejercicio1) {
            var imageTop = ejercicio1.getBoundingClientRect().top + window.scrollY - 60; // -60 es para ajustar un poco hacia arriba si es necesario
            window.scrollTo({top: imageTop, behavior: 'smooth'});
        }
    });
    

    beginSecondMemorizationButton.addEventListener('click', function() {
        prepForSecondImage.style.display = 'none'; // Oculta el mensaje de preparación
        newImageContainer.style.display = 'block'; // Muestra la nueva imagen
    
        setTimeout(function() {
            newImageContainer.style.display = 'none'; // Oculta la imagen después del tiempo especificado
            document.getElementById('secondImageQuestions').style.display = 'block'; // Muestra el formulario de preguntas
        }, 1000);
    
    });
    
    // --- FORMULARI secondImageQuestions ---
    secondImageQuestions.addEventListener('submit', function(event) {
        event.preventDefault();
        new FormData(secondImageQuestions).forEach((value, key) => {
            formData[key] = value;
        });
        formData["step"] = "secondImageQuestions";
        sendFormDataToGoogleSheet(formData);
        secondImageQuestions.style.display = 'none';
    });

    document.getElementById('toThirdExercise').addEventListener('click', function() {
        document.getElementById('secondImageQuestions').style.display = 'none';
        document.getElementById('prepForThirdImage').style.display = 'block';
    });
    
    document.getElementById('beginThirdMemorization').addEventListener('click', function() {
        // Aquí puedes replicar la lógica de temporizador o visualización de imágenes
        // que usaste en los ejercicios anteriores, adaptándola para el tercer ejercicio.
        document.getElementById('prepForThirdImage').style.display = 'none';
        document.getElementById('thirdImageContainer').style.display = 'block';
        // Suponiendo un tiempo de memorización similar al ejercicio anterior
        setTimeout(function() {
            document.getElementById('thirdImageContainer').style.display = 'none';
            document.getElementById('thirdImageQuestions').style.display = 'block';
        }, 3000); // Ajusta este tiempo según sea necesario
    });
    
    document.getElementById('toFourthExercise').addEventListener('click', function() {
        document.getElementById('prepForThirdImage').style.display = 'none';
        document.getElementById('thirdImageContainer').style.display = 'none';
        document.getElementById('thirdImageQuestions').style.display = 'none';
        document.getElementById('prepForFourthImage').style.display = 'block';
    });
    
    document.getElementById('beginFourthMemorization').addEventListener('click', function() {
        document.getElementById('prepForFourthImage').style.display = 'none'; // Oculta el texto de preparación
        document.getElementById('fourthImageContainer').style.display = 'block'; // Muestra la imagen
    
        setTimeout(function() {
            document.getElementById('fourthImageContainer').style.display = 'none'; // Oculta la imagen después de 1 segundo
            document.getElementById('fourthImageQuestions').style.display = 'block'; // Muestra las preguntas
        }, 1000); // Ajusta este tiempo si quieres que la imagen se muestre más o menos tiempo
    });


    function setupAudio() {
        var audio = document.getElementById('memoryAudio');
        audio.controls = true;
    
        audio.onplay = function() {
            this.controls = false;
            this.removeAttribute('controls');
        };
    
        audio.onended = function() {
            showQuestionnaire();
        };
    
        // Manejador para el botón de Saltar
        document.getElementById('skipAudio').addEventListener('click', function() {
            // Detener el audio si está siendo reproducido
            audio.pause();
            audio.currentTime = 0; // Opcional, resetea el audio a su inicio
    
            // Mostrar el cuestionario
            showQuestionnaire();
        });
    }
    
    // Función para mostrar el cuestionario
    function showQuestionnaire() {
        document.getElementById('fifthExerciseContainer').style.display = 'none';
        document.getElementById('fifthExerciseQuestions').style.display = 'block';
    }
    
    document.getElementById('toFifthExercise').addEventListener('click', function() {
        document.getElementById('fourthImageQuestions').style.display = 'none'; // Ocultar formulario del ejercicio 4
        document.getElementById('fifthExerciseContainer').style.display = 'block'; // Mostrar contenedor del ejercicio 5
        setupAudio();
    });
    
    document.getElementById('toSixthExercise').addEventListener('click', function() {
        // Ocultar formulario del ejercicio 5
        document.getElementById('fifthExerciseQuestions').style.display = 'none';
        document.getElementById('sixthExerciseContainer').style.display = 'block';
    });

    document.getElementById('submitSixthExercise').addEventListener('click', function() {
    document.getElementById('sixthExerciseContainer').style.display = 'none';
    document.getElementById('gratitudeMessage').style.display = 'block';
});

    

    // --- Enviament de dades al Backend ---
    // Funció que envia les dades a Google Sheets
    function sendFormDataToGoogleSheet(data) {
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
