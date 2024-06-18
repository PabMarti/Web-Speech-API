document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('login-btn');

    // Inicializa el reconocimiento de voz
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.continuous = false;

    let currentField = '';

    // Función para iniciar el reconocimiento de voz
    const startRecognition = () => {
        try {
            recognition.start();
        } catch (e) {
            console.error("Error al iniciar el reconocimiento de voz: ", e);
        }
    };

    // Función para procesar el resultado del reconocimiento de voz
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.trim().toLowerCase();
        console.log("Resultado de reconocimiento: ", transcript);
        if (currentField === 'username') {
            usernameInput.value = transcript;
            currentField = 'password';
            promptForPassword();
        } else if (currentField === 'password') {
            passwordInput.value = transcript;
            currentField = 'login';
            loginButton.disabled = false;
            promptForLogin();
        } else if (currentField === 'login' && transcript === 'iniciar sesión') {
            handleLogin();
        }
    };

    // Función para manejar errores de reconocimiento de voz
    recognition.onerror = (event) => {
        console.error("Error de reconocimiento de voz: ", event.error);
    };

    // Función para solicitar usuario
    const promptForUsername = () => {
        currentField = 'username';
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance('Por favor, diga su nombre de usuario.');
        synth.speak(utterance);
        utterance.onend = () => {
            startRecognition();
        };
    };

    // Función para solicitar contraseña
    const promptForPassword = () => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance('Por favor, diga su contraseña.');
        synth.speak(utterance);
        utterance.onend = () => {
            startRecognition();
        };
    };

    // Función para iniciar sesión
    const promptForLogin = () => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance('Diga iniciar sesión para entrar.');
        synth.speak(utterance);
        utterance.onend = () => {
            startRecognition();
        };
    };

    // Función para manejar el login
    const handleLogin = () => {
        const username = usernameInput.value;
        const password = passwordInput.value;

        // Aquí puedes agregar la lógica para verificar las credenciales
        if (username === 'leonel' && password === '3187') {
            alert('Inicio de sesión exitoso');
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    };

    // Solicitar permisos de micrófono y empezar el proceso de login por voz
    const initializeMicrophone = () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(stream => {
                    console.log('Permiso para el micrófono concedido');
                    promptForUsername();
                })
                .catch(error => {
                    console.error('Permiso para el micrófono denegado: ', error);
                    alert('Se requiere acceso al micrófono para usar esta aplicación.');
                });
        } else {
            alert('Tu navegador no soporta acceso al micrófono.');
        }
    };

    // Inicializar el micrófono
    initializeMicrophone();
});
