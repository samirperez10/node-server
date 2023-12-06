
const readline = require('readline');

class Task {
    constructor(indicator, description, state = false) {
        this.indicator = indicator;
        this.description = description;
        this.state = state;
    }
}

let tasks = [];

function addTask(indicator, description) {
    const task = new Task(indicator, description);
    tasks.push(task);
}

function removeTask(indicator) {
    tasks = tasks.filter(task => task.indicator !== indicator);
}

function completeTask(indicator) {
    tasks.forEach(task => {
        if (task.indicator === indicator) {
            task.state = true;
        }
    });
}

function listTasks() {
    console.log('Lista de tareas:');
    tasks.forEach(task => {
        console.log(`[${task.indicator}] ${task.description} - ${task.state ? 'Completada' : 'No completada'}`);
    });
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function menu() {
    rl.question('Seleccione una opción:\n1. Añadir tarea\n2. Eliminar tarea\n3. Completar tarea\n4. Listar tareas\n5. Salir\n', option => {
        switch (option) {
            case '1':
                rl.question('Indicador de la tarea: ', indicator => {
                    rl.question('Descripción de la tarea: ', description => {
                        addTask(indicator, description);
                        console.log('Tarea añadida.');
                        menu();
                    });
                });
                break;
            case '2':
                rl.question('Indicador de la tarea a eliminar: ', indicator => {
                    removeTask(indicator);
                    console.log('Tarea eliminada.');
                    menu();
                });
                break;
            case '3':
                rl.question('Indicador de la tarea a completar: ', indicator => {
                    completeTask(indicator);
                    console.log('Tarea completada.');
                    menu();
                });
                break;
            case '4':
                listTasks();
                menu();
                break;
            case '5':
                rl.close();
                break;
            default:
                console.log('Opción no válida.');
                menu();
                break;
        }
    });
}

menu();