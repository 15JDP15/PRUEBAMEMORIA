function f_pruebamemoria() {
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
    var currentStage = 0;
    const totalStages = 7;
    var formData = {};
    var uniqueId = new Date().getTime();

    prepForMemoryTest.style.display = 'none';
    imageArea.style.display = 'none';

    function updateProgress() {
        currentStage++;
        let progressPercentage = (currentStage / totalStages) * 100;
        document.getElementById("progressBar").style.width = progressPercentage + "%";
    }

    initialQuestionForm.addEventListener('submit', function(event) {
        event.preventDefault();
        new FormData(initialQuestionForm).forEach((value, key) => {
            formData[key] = value;
        });
        formData["step"] = "initialQuestionForm";
        formData["uniqueId"] = uniqueId;
        sendFormDataToGoogleSheet(formData);
        updateProgress();
        initialQuestionForm.style.display = 'none';
        prepForMemoryTest.style.display = 'block';
    });

    startTestButton.addEventListener('click', function() {
        introElement.style.display = 'none';
        startTestButton.style.display = 'none';
        initialQuestionForm.style.display = 'block';
        window.scrollTo(0, 0);
    });

    function startMemoryTest(duration) {
        var timeLeft = duration;
        var timerElement = document.getElementById('timer');
        timerElement.style.display = 'block';
        timerElement.innerText = timeLeft + " segundos restantes";

        var timerInterval = setInterval(function() {
            timeLeft -= 1;
            timerElement.innerText = timeLeft + " segundos restantes";
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                timerElement.style.display = 'none';

                imageArea.style.display = 'none';
                imageQuestionForm.style.display = 'block';
            }
        }, 1000);
    }

    beginMemorizationButton.addEventListener('click', function() {
        prepForMemoryTest.style.display = 'none';
        imageArea.style.display = 'block';
        timerElement.style.display = 'block';
        imageArea.innerHTML = '<img src="ejercicio1.jpg" alt="Memory Test Image" id="ejercicio1" class="responsive-image" />';
        startMemoryTest(5);
    });

    imageQuestionForm.addEventListener('submit', function(event) {
        event.preventDefault();
        new FormData(imageQuestionForm).forEach((value, key) => {
            formData[key] = value;
        });
        formData["step"] = "imageQuestionForm";
        sendFormDataToGoogleSheet(formData);
        updateProgress();
        imageQuestionForm.style.display = 'none';
        prepForSecondImage.style.display = 'block';

    });

    document.addEventListener('DOMContentLoaded', function() {
        var ejercicio1 = document.getElementById('ejercicio1');
        if (ejercicio1) {
            var imageTop = ejercicio1.getBoundingClientRect().top + window.scrollY - 60;
            window.scrollTo({top: imageTop, behavior: 'smooth'});
        }
    });

    beginSecondMemorizationButton.addEventListener('click', function() {
        prepForSecondImage.style.display = 'none';
        newImageContainer.style.display = 'block';

        startTimer(5, function() {
            newImageContainer.style.display = 'none';
            document.getElementById('secondImageQuestions').style.display = 'block';
        });
    });

    secondImageQuestions.addEventListener('submit', function(event) {
        event.preventDefault();
        new FormData(secondImageQuestions).forEach((value, key) => {
            formData[key] = value;
        });
        formData["step"] = "secondImageQuestions";
        sendFormDataToGoogleSheet(formData);
        updateProgress();
        secondImageQuestions.style.display = 'none';
        document.getElementById('secondImageQuestions').style.display = 'none';
        document.getElementById('prepForThirdImage').style.display = 'block';
    });

    document.getElementById('beginThirdMemorization').addEventListener('click', function() {
        document.getElementById('prepForThirdImage').style.display = 'none';
        document.getElementById('thirdImageContainer').style.display = 'block';
        startTimer(5, function() {
            newImageContainer.style.display = 'none';
            document.getElementById('thirdImageContainer').style.display = 'none';
            document.getElementById('thirdImageQuestions').style.display = 'block';
        });
    });

    thirdImageQuestions.addEventListener('submit', function(event) {
        event.preventDefault();
        new FormData(thirdImageQuestions).forEach((value, key) => {
            formData[key] = value;
        });
        formData["step"] = "thirdImageQuestions";
        updateProgress();
        sendFormDataToGoogleSheet(formData);
        thirdImageQuestions.style.display = 'none';
        document.getElementById('prepForThirdImage').style.display = 'none';
        document.getElementById('thirdImageContainer').style.display = 'none';
        document.getElementById('thirdImageQuestions').style.display = 'none';
        document.getElementById('prepForFourthImage').style.display = 'block';
    });

    document.getElementById('beginFourthMemorization').addEventListener('click', function() {
        document.getElementById('prepForFourthImage').style.display = 'none';
        document.getElementById('fourthImageContainer').style.display = 'block';

        startTimer(5, function() {
            newImageContainer.style.display = 'none';
            document.getElementById('fourthImageContainer').style.display = 'none';
            document.getElementById('fourthImageQuestions').style.display = 'block';
        });
    });

    document.getElementById('fourthImageQuestions').addEventListener('submit', function(event) {
        event.preventDefault();

        document.getElementById('fourthImageQuestions').style.display = 'none';
        document.getElementById('fifthExerciseContainer').style.display = 'block';
    });



    document.getElementById('fifthExerciseQuestions').addEventListener('submit', function(event) {
        event.preventDefault();
        var ejercicio5Value = document.getElementById('ejercicio5').value;

        formData['ejercicio5'] = ejercicio5Value;
        formData["step"] = "fifthExercise";
        updateProgress();
        sendFormDataToGoogleSheet(formData);

        document.getElementById('fifthExerciseQuestions').style.display = 'none';
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

        document.getElementById('skipAudio').addEventListener('click', function() {
            audio.pause();
            audio.currentTime = 0;

            showQuestionnaire();
        });
    }

    function showQuestionnaire() {
        document.getElementById('fifthExerciseContainer').style.display = 'none';
        document.getElementById('fifthExerciseQuestions').style.display = 'block';
    }


    fourthImageQuestions.addEventListener('submit', function(event) {
        event.preventDefault();
        new FormData(fourthImageQuestions).forEach((value, key) => {
            formData[key] = value;
        });
        formData["step"] = "fourthImageQuestions";
        updateProgress();
        sendFormDataToGoogleSheet(formData);
        fourthImageQuestions.style.display = 'none';
        document.getElementById('fourthImageQuestions').style.display = 'none';
        document.getElementById('fifthExerciseContainer').style.display = 'block';
        setupAudio();
    });

 

    document.getElementById('submitSixthExercise').addEventListener('click', function(event) {
        event.preventDefault();
        var ejercicio6Value = document.getElementById('ejercicio6').value;
    
        formData['ejercicio6'] = ejercicio6Value;
        formData["step"] = "sixthExercise";
    
        sendFormDataToGoogleSheet(formData);
    
        document.getElementById("progressBar").style.width = "100%";
    
        document.getElementById('sixthExerciseContainer').style.display = 'none';
        document.getElementById('gratitudeMessage').style.display = 'block';
    });
    

    function sendFormDataToGoogleSheet(data) {
        fetch('https://script.google.com/macros/s/AKfycbzJ3bmlAc4xzhQu_vxqHjCBLxLY2RvlfZOZ0Kl4OmOrpxdQci_3JceoQVyu6ZMd--li/exec', {
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

    const navbarLinks = document.querySelectorAll('#navbar a');
    navbarLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const section = document.querySelector(this.getAttribute('href'));
            section.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

document.getElementById('skipAudio').addEventListener('click', function() {
    var confirmSkip = confirm("¿Estás seguro de que quieres saltar el audio?");
    if (confirmSkip) {
        var audio = document.getElementById('memoryAudio');
        audio.pause();
        audio.currentTime = 0;
        
        showQuestionnaire();
    }
});

function startTimer(duration, onComplete) {
    var timeLeft = duration;
    var timerElement = document.getElementById('timer');
    timerElement.style.display = 'block';
    timerElement.innerText = timeLeft + " segundos restantes";

    var timerInterval = setInterval(function() {
        timeLeft -= 1;
        timerElement.innerText = timeLeft + " segundos restantes";
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerElement.style.display = 'none';

            if(typeof onComplete === 'function'){
                onComplete();
            }
        }
    }, 1000);
}

document.addEventListener('DOMContentLoaded', f_pruebamemoria);
