var chatBox = document.getElementById('chat-box');
var state = 'initial';

// Arrays para almacenar la información
var salones = [
    { nombre: '101', info: 'Salón en el edificio bicentenario, primer piso.' },
    { nombre: '102', info: 'Salón en el edificio bicentenario, primer  piso.' },
    { nombre: '201', info: 'Salón en el edificio bicentenario, segundo  piso.' },
    { nombre: '202', info: 'Salón en el edificio bicentenario, segundo  piso.' },
    { nombre: '301', info: 'Salón en el edificio bicentenario, tercer  piso.' },
    { nombre: '302', info: 'Salón en el edificio bicentenario, tercer  piso.' },
    { nombre: '303', info: 'Salón en el edificio bicentenario, tercer  piso.' },
    { nombre: '304', info: 'Salón en el edificio bicentenario, tercer  piso.' },
    { nombre: '305', info: 'Salón en el edificio bicentenario, tercer  piso.' }
];

var profesores = [
    { nombre: 'Martha Camacho', info: '<br><br>LUNES:<br> 08:00am-10:00am salon 102 bicentenario<br><br>MARTES:<br>08:30am-10:00am salon 201 bicentenerio<br><br>MIERCOLES:<br> 08:30am-10:00am salon 303 bicentenario<br>10:15am-12:45am 303 Bicentenario<br><br>07:30am-09:00am salon 301 Bicentenario<br>10:15am-11:45am salon 201 Bicentenario<br><br>VIERNES: <br> 14:30pm- 18:00pm comite de investigaciones.' },
    { nombre: 'Maria Isabell', info: '<br><br>LUNES:<br>07:00am-10:00am salon 301 bicentenario<br>10:00am-13:00pm salon 101 bicentenario<br><br>MARTES: <br>07:00am-08:30am salon 301 bicentenario<br> 10:00am- 13:00pm salon 102 bicentenario<br><br>MIERCOLES: <br> 07:00am-10:00am salon 301 bicentenario<br><br> JUEVES:<br> 10:00am-13:00pm salon 101 bicentenario<br><br> VIERNES: <br> 7:00am-10:00am salon 302 bicentenario<br> 10:15am-11:45am salon 101 bicentenario.'},
    { nombre: 'Pedro Alvarez', info: '<br><br>LUNES:<br> Sala profesores<br><br>MARTES: <br> 10:15am-13:15pm sala 2 Casa Obando<br><br>MIERCOLES:<br>sala profesores<br><br>JUEVES<br>sala profesores<br><br>VIERNES<br>sala prpfeoress.'},
    { nombre: 'Monica Piamba', info: '<br><br>LUNES: <br> 07:00am-10:00am  salón 109 casa obando <br> 10:15am-01:00pm salón 103 Casa Obando <br><br> MARTES:<br> 03:00pm-06:00pm salón 302 Bicentenario <br><br> MIERCOLES:<br> 07:00am-10:00am salón 302 Bicentenario <br> 10:00am-01:00pm salón 201 Bicentenario <br><br> JUEVES:<br> 03:00pm-06:00pm salón 302 Bicentenario <br><br> VIERNES:<br>07:00am-10:00am laboratorio Casa Obando <br> 10:00am-01:00 pm salón 107 Casa Obando'},
    { nombre: 'Holmes Valdez', info: '<br><br>LUNES:<br>.'},
    { nombre: 'Stivens Solarte', info: '<br><br>LUNES:<br> 07:00am-10:00am laboratorio Bicentenario<br> 10:15am-12:00pm salon 202 Bicentenario<br><br>MARTES: <br> 07:00am-10:00am salon 310 Bicentenario<br>10:15am-12:00pm salon 101 Bicentenario<br><br>MIERCOLES: <br> 10:00am-12:45pm<br><br> JUEVES:<br> 08:00am-10:00am 202 Casa Obando<br> 07:00pm-10:00pm Laboratorio fisica<br><br>VIERNES:<br>07:00am-08:30am salon 202 Bicentenario<br>08:30am-10:00am salon 202 Bicetenario.'}
];

var materias = [
    { nombre: 'calculo integral', info: '<br>Martes: 07:00am-08:30 am <br> Viernes: 10:15am-11:45am' },
    { nombre: 'física electro magnética', info: '<br> Miércoles: 10:15am-12:45pm <br> Viernes: 08:30am-10:00am' },
    { nombre: 'introducción a la ingeniería de software', info: '<br> Miércoles: 08:30-10:00 am <br>Jueves 07:30am-09:00am' },
    { nombre: 'inglés 3', info: '<br>Lunes: 10:00am-01:15pm' },
    { nombre: 'formación ciudadana', info: '<br> Jueves: 10:00am-13:00pm' },
    { nombre: 'programación orientada a objetos', info: '<br> Martes: 10:15am-01:15pm' }
];  

function normalizeText(text) {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, ""); // me ignora las maysculas minusculas y tildes 
}

function sendMessage() {
    var userInput = normalizeText(document.getElementById('user-input').value.trim());

    // Crear el contenedor del mensaje del usuario
    var userMessageContainer = document.createElement('div');
    userMessageContainer.classList.add('message-container', 'user-message');
    userMessageContainer.innerHTML = `<div class="message">${userInput}</div>`;
    chatBox.appendChild(userMessageContainer);

    var botMessageContainer = document.createElement('div');
    botMessageContainer.classList.add('message-container', 'bot-message');

    // Verificar expresiones de agradecimiento
    if (userInput.includes('gracias') || userInput.includes('todo bien') || userInput.includes('muy amable')) {
        botMessageContainer.innerHTML = `<div class="message">Un gusto poderte ayudar.... !Vuelve pronto!</div>`;
        chatBox.appendChild(botMessageContainer);
        document.getElementById('user-input').value = ''; // Limpiar el campo de entrada
        chatBox.scrollTop = chatBox.scrollHeight; // Desplazamiento automático hacia abajo
        state = 'initial'; // Resetear estado
        return; // Salir de la función para evitar más procesamiento
    }

    if (state === 'initial') {
        if (userInput.includes('hola') || userInput.includes('buenos dias') || userInput.includes('buenas tardes') || userInput.includes('buenas noches')|| userInput.includes('hol')|| userInput.includes('como estas')|| userInput.includes('hello')|| userInput.includes('hola chatbox')|| userInput.includes('menu')){
            botMessageContainer.innerHTML = `<div class="message">¡Hola! Soy Chat GPT UniMayor. ¿En qué puedo ayudarte hoy?<br>Por favor, elige una opción:<br>1. Buscar Salones<br>2. Buscar Profesores<br>3. Buscar Materias</div>`;
            state = 'waiting_option';
        } else {
            botMessageContainer.innerHTML = `<div class="message">Lo siento, no entendí tu respuesta<br>Por favor ingrese "0" para volver al menu.</div>`;
            state = 'volver_menu';
        }
    } else if (state === 'waiting_option') {
        if (userInput === '1') {
            botMessageContainer.innerHTML = `<div class="message">¿ Qué salón deseas buscar ?</div>`;
            state = 'buscar_salones';
        } else if (userInput === '2') {
            botMessageContainer.innerHTML = `<div class="message"> Por favor, escribe el nombre del profesor que deseas buscar: </div>`;
            state = 'buscar_profesor';
        } else if (userInput === '3') {
            botMessageContainer.innerHTML = `<div class="message">¿ Qué materia deseas buscar ?</div>`;
            state = 'buscar_materia';
        } else {
            botMessageContainer.innerHTML = `<div class="message"> Lo siento, no entendí tu respuesta<br> por favor ingrece "0" para volver al menu principal .... </div>`;
            state = 'volver_menu';
        }
    } else if (state === 'buscar_salones') {
        var salon = salones.find(s => normalizeText(s.nombre) === userInput);
        if (salon) {
            botMessageContainer.innerHTML = `<div class="message">Información del salón ${salon.nombre}: ${salon.info}</div>`;
            state = 'initial';
        } else {
            botMessageContainer.innerHTML = `<div class="message">No se encontró información del salón<br> ${userInput}. Por favor, escribe "0" para volver al menú principal.</div>`;
            state = 'volver_menu';
        }
    } else if (state === 'buscar_profesor') {
        var profesor = profesores.find(p => normalizeText(p.nombre) === userInput);
        if (profesor) {
            botMessageContainer.innerHTML = `<div class="message">Información del profesor ${profesor.nombre}: ${profesor.info}</div>`;
            state = 'initial';
        } else {
            botMessageContainer.innerHTML = `<div class="message">No se encontró información del profesor<br> ${userInput}. Por favor, escribe "0" para volver al menú principal.</div>`;
            state = 'volver_menu';
        }
    } else if (state === 'buscar_materia') {
        var materia = materias.find(m => normalizeText(m.nombre) === userInput);
        if (materia) {
            botMessageContainer.innerHTML = `<div class="message">Información de la materia ${materia.nombre}: ${materia.info}</div>`;
            state = 'initial';
        } else {
            botMessageContainer.innerHTML = `<div class="message">No se encontró información de la materia<br> ${userInput}. Por favor, escribe "0" para volver al menú principal.</div>`;
            state = 'volver_menu';
        }
    } else if (state === 'volver_menu') {
        if (userInput === '0','menu') {
            botMessageContainer.innerHTML = `<div class="message"> elige una opción correcta :<br>1. Buscar Salones<br>2. Buscar Profesores<br>3. Buscar Materias</div>`;
            state = 'waiting_option';
        } else {
            botMessageContainer.innerHTML = `<div class="message">Lo siento, no entendí tu respuesta.<br> Por favor, escribe "0" para volver al menú principal.</div>`;
            state = 'volver_menu';
        }
    }

    chatBox.appendChild(botMessageContainer);
    document.getElementById('user-input').value = ''; // Limpiar el campo de entrada
    chatBox.scrollTop = chatBox.scrollHeight; // Desplazamiento automático hacia abajo
}

// Capturar el evento de pulsación de tecla "Enter"
document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
