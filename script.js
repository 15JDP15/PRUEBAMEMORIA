function f_pruebamemoria() 
{
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
    var thirdImageQuestions = document.getElementById('thirdImageQuestions');
    var formData = {};
    var uniqueId = new Date().getTime();

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
        }, 5000);
    
    });
    
    secondImageQuestions.addEventListener('submit', function(event) {
        event.preventDefault();
        new FormData(secondImageQuestions).forEach((value, key) => {
            formData[key] = value;
        });
        formData["step"] = "secondImageQuestions";
        sendFormDataToGoogleSheet(formData);
        secondImageQuestions.style.display = 'none';
        document.getElementById('secondImageQuestions').style.display = 'none';
        document.getElementById('prepForThirdImage').style.display = 'block';
    });

    
    document.getElementById('beginThirdMemorization').addEventListener('click', function() {
        document.getElementById('prepForThirdImage').style.display = 'none';
        document.getElementById('thirdImageContainer').style.display = 'block';
        setTimeout(function() {
            document.getElementById('thirdImageContainer').style.display = 'none';
            document.getElementById('thirdImageQuestions').style.display = 'block';
        }, 3000); // Ajusta este tiempo según sea necesario
    });
    
    thirdImageQuestions.addEventListener('submit', function(event) {
        event.preventDefault();
        new FormData(thirdImageQuestions).forEach((value, key) => {
            formData[key] = value;
        });
        formData["step"] = "thirdImageQuestions";
        sendFormDataToGoogleSheet(formData);
        thirdImageQuestions.style.display = 'none';       
        document.getElementById('prepForThirdImage').style.display = 'none';
        document.getElementById('thirdImageContainer').style.display = 'none';
        document.getElementById('thirdImageQuestions').style.display = 'none';
        document.getElementById('prepForFourthImage').style.display = 'block';
    });
    
    document.getElementById('beginFourthMemorization').addEventListener('click', function() {
        document.getElementById('prepForFourthImage').style.display = 'none'; // Oculta el texto de preparación
        document.getElementById('fourthImageContainer').style.display = 'block'; // Muestra la imagen
        setTimeout(function() {
            document.getElementById('fourthImageContainer').style.display = 'none'; 
            document.getElementById('fourthImageQuestions').style.display = 'block'; 
        }, 5000); // Ajustar tiempo
    });

    document.getElementById('fourthImageQuestions').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevenir el comportamiento de envío por defecto del formulario
    
        // Recolectar los datos ingresados por el usuario en el ejercicio 4.
        var ejercicio4Value = document.getElementById('ejercicio4').value;
        
        console.log("Enviando ejercicio 4", ejercicio4Value); // Esto debería mostrarse en la consola del navegador
        // Agregar los datos del ejercicio 4 al objeto formData.
        formData['ejercicio4'] = ejercicio4Value;
        formData["step"] = "fourthExercise"; // Identificar este paso.
    
        // Enviar los datos a Google Sheets.
        sendFormDataToGoogleSheet(formData);
        
        // Pasar al siguiente paso en el proceso, que sería el inicio del ejercicio 5.
        // Ocultamos el contenedor del cuarto ejercicio y mostramos el del quinto.
        document.getElementById('fourthImageQuestions').style.display = 'none'; // Asegúrate de tener un elemento con esta ID
        document.getElementById('fifthExerciseContainer').style.display = 'block'; // Mostrar el contenedor para el ejercicio 5
    });
    
    document.getElementById('fifthExerciseQuestions').addEventListener('submit', function(event) {
        event.preventDefault(); 
        var ejercicio5Value = document.getElementById('ejercicio5').value;

        formData['ejercicio5'] = ejercicio5Value;
        formData["step"] = "fifthExercise"; 

        sendFormDataToGoogleSheet(formData);
        
        document.getElementById('fifthExerciseQuestions').style.display = 'none'; // O usa la ID del contenedor si estás ocultando el contenedor entero
        document.getElementById('sixthExerciseContainer').style.display = 'block';

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
        event.preventDefault();
        document.getElementById('fourthImageQuestions').style.display = 'none'; // Ocultar formulario del ejercicio 4
        document.getElementById('fifthExerciseContainer').style.display = 'block'; // Mostrar contenedor del ejercicio 5
        setupAudio();
    });

    document.getElementById('submitSixthExercise').addEventListener('click', function() {
    document.getElementById('sixthExerciseContainer').style.display = 'none';
    document.getElementById('gratitudeMessage').style.display = 'block';
});

document.getElementById('submitSixthExercise').addEventListener('click', function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto, en este caso, la recarga de página

    // Recolectar los datos ingresados por el usuario en el sexto ejercicio.
    var ejercicio6Value = document.getElementById('ejercicio6').value;
    
    // Agregar los datos del sexto ejercicio al objeto formData.
    formData['ejercicio6'] = ejercicio6Value;
    formData["step"] = "sixthExercise"; // Identificar este paso.

    // Enviar los datos a Google Sheets.
    sendFormDataToGoogleSheet(formData);
    
    // Suponiendo que quieres mostrar un mensaje de agradecimiento o pasar a otro paso después del sexto ejercicio,
    // necesitas ajustar el display de los elementos correspondientes aquí.
    // Por ejemplo, si quieres mostrar un mensaje de agradecimiento después del sexto ejercicio:
    document.getElementById('sixthExerciseContainer').style.display = 'none'; // Ocultar el contenedor del sexto ejercicio
    document.getElementById('gratitudeMessage').style.display = 'block'; // Mostrar el mensaje de agradecimiento
});


    // --- Enviament de dades al Backend ---
    // Funció que envia les dades a Google Sheets
    function sendFormDataToGoogleSheet(data) {
        fetch('https://script.google.com/macros/s/AKfycbzQTATu1rAFXWrDYEy_L_pOtXrH2W-u4_UOAeStedaJTlf9UoR13XOIS4oCrhyRWqBG/exec', {
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
