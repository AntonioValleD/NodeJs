const readline = require('readline');

// Funcion utilizada pera introducir texto mediante stdins
function textInput(){
    let userOption;
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve, reject) => {
        rl.question('', (input) => {
            rl.close();
            resolve(input)
        });
    });
}

// Tarea: indice, descripcion de la tarea y valor booleano (done)
let taskList = [
    {index: 0, description: 'Comprar fruta', done: false},
    {index: 1, description: 'Ir al gym', done: true},
    {index: 2, description: 'Cocinar', done: true},
    {index: 3, description: 'Trabajar', done: false},
    {index: 4, description: 'Leer', done: true},
];

// Actualizar indice de tareas
const updateTaskIndex = () => {
    for (let i = 0; i < taskList.length; i++){
        taskList[i].index = i;
    }
}

// Añadir tareas a la lista de tareas
const addTask = (taskIndex, taskDescription) => {
    if (!taskIndex){
        console.log('\nNo se especificó un indice para la tarea');
        taskIndex = taskList.length;
    } else {
        if (taskIndex < taskList.length){
            let realIndex = taskIndex - 1;
            let task = {index: realIndex, description: taskDescription, done: false};
            taskList.splice(realIndex, 0, task);
            updateTaskIndex();
            console.log('\nLa tarea se agregó correctamente en el indice especificado');
            return;

        } else if (taskIndex >= taskList.length + 1){
            console.log('\nEl indice ingresado es mayor que el último indice');
            taskIndex = taskList.length;
        }
    }
    let task = {index: taskIndex, description: taskDescription, done: false};
    taskList.push(task);
    console.log('\nLa tarea se agregó correctamente al final de la lista');
}

// Lectura de tareas
const taskListConstructor = (taskListArray) => {
    if (taskListArray.length != 0){
        console.log('\nNo. Status     Tarea');
        for (let task of taskListArray){
            let taskStatus = '';
            if (task.done){
                taskStatus = '[✔]';
            } else {
                taskStatus = '[ ]';
            }
            console.log('', task.index + 1, ' ', taskStatus, '   ', task.description);
        }
        return true;
    } else {
        return false;
    }
}

const getTaskByIndex = (taskIndex) => {
    let task = taskList[taskIndex];
    return task;
}

const getTaskByTaskDescription = (taskDescription) => {
    for (let task of taskList) {
        if (task.description == taskDescription) {
            return task;
        }
    }
}

const getDoneTasks = () => {
    let doneTasks = [];
    for (let task of taskList){
        if (task.done){
            doneTasks.push(task);
        }
    }
    return doneTasks;
}

const getUndoneTasks = () => {
    let undoneTasks = [];
    for (let task of taskList){
        if (task.done == false){
            undoneTasks.push(task);
        }
    }
    return undoneTasks;
}

// Eliminar tareas de la lista de tareas
const deleteTask = (taskIndex) => {
    let task = getTaskByIndex(taskIndex);
    if (task){
        taskList.splice(task.index, 1);
        console.log('\nLa tarea "', task.description, '" ha sido eliminada correctamente');
        updateTaskIndex();
    } else {
        console.log('\nLa tarea especificada no existe');
    }
}

// Marcar tarea como realizada
const markAsDone = (taskIndex) => {
    let task = getTaskByIndex(taskIndex);
    if (task){
        taskList[task.index].done = true;
        console.log('\nLa tarea "', task.description, '" ha sido marcada como realizada');
    } else {
        console.log('\nLa tarea especificada no existe');
    }
}

// Selector de metodo a utilizar para modificar o eliminar una tarea
const actionMethodSelector = (action, taskMethod, taskItem) => {
    // Eliminar tarea
    if (action == 'delete'){
        // Eliminar tarea mediante indice
        if (taskMethod == 'taskIndex') {
            let realIndex = taskItem - 1;
            deleteTask(realIndex);
        }
        // Eliminar tarea mediante descripcion
        if (taskMethod == 'taskDescription') {
            let task = getTaskByTaskDescription(taskItem);
            deleteTask(task.index);
        }
    }
    
    // Marcar tarea como realizada
    if (action == 'done'){
        // Eliminar tarea mediante indice
        if (taskMethod == 'taskIndex') {
            let realIndex = taskItem - 1;
            markAsDone(realIndex);
        }
        // Eliminar tarea mediante descripcion
        if (taskMethod == 'taskDescription') {
            let task = getTaskByTaskDescription(taskItem);
            markAsDone(task.index);
        }
    }
}

// Interfaz de control de usuario
var firstRunTime = true;
async function main(){
    while(true){
        var option = null;
        if (!firstRunTime){
            while (!firstRunTime){
                // Menu para reiniciar el programa o salir
                console.log('\nElija una opción:');
                console.log('1. Volver al menú principal');
                console.log('2. Salir');
                option = await textInput();
                if (option == '1'){
                    firstRunTime = true;
                } else if (option == '2') {
                    return;
                } else {
                    console.log('\nLa opción ingresada es incorrecta');
                }
            }
        }
        if (firstRunTime){
            // Menu principal
            console.log('\n--- Bienvenido a su gestror de tareas! ---');
            console.log('\nElija una opción:\n');
            console.log('1. Ver todas las tareas');
            console.log('2. Ver tareas realizadas');
            console.log('3. Ver tareas sin realizar');
            console.log('4. Añadir tarea');
            console.log('5. Marcar tarea como realizada');
            console.log('6. Eliminar tarea\n');
            option = await textInput();
        }
        firstRunTime = false;
        
        // Inicializacion de variables globales
        let taskIndex = null;
        let taskDescription = null;
        let action = null;
        let taskMethod = null;
        let execution = null;
        
        // Selector de opciones
        switch (option){
            case '1':
                // Mostrar la lista completa de tareas
                console.log('\nUsted tiene', taskList.length, 'tareas registradas');
                execution = taskListConstructor(taskList);
                if (!execution){
                    console.log('\nAún no ha registrado ninguna tarea');
                }
                break;
            case '2':
                // Mostrar solo las tareas comletadas
                let doneTasks = getDoneTasks();
                execution = taskListConstructor(doneTasks);
                if (!execution){
                    console.log('\nAún no se ha realizado ninguna tarea');
                }
                break;
            case '3':
                // Mostrar las tareas no completadas
                let undoneTasks = getUndoneTasks();
                execution = taskListConstructor(undoneTasks);
                if (!execution){
                    console.log('\nTodas las tareas han sido realizadas');
                }
                break;
            case '4':
                // Añadir una nueva tarea
                console.log('\nIngrese el indice de la tarea (opcional)');
                taskIndex = await textInput();
                console.log('\nIngrese una descripcion para la tarea');
                taskDescription = await textInput();
                if (taskIndex == ''){
                    taskIndex = false;
                }
                addTask(taskIndex, taskDescription);
                taskListConstructor(taskList);
                break;
            case '5':
                // Marcar una tarea como terminada
                action = 'done';
                console.log('\nSelecione uno de los atributos de la tarea que desea marcar como realizada:');
                console.log('1. Indice');
                console.log('2. Descripción');
                option = await textInput();
                if (option == '1'){
                    taskMethod = 'taskIndex';
                    console.log('\nEspecifique el indice de la tarea que desea marcar como realizada:');
                    taskIndex = await textInput();
                    actionMethodSelector(action, taskMethod, taskIndex);
                    taskListConstructor(taskList);
                } else if (option == '2'){
                    taskMethod = 'taskDescription';
                    console.log('\nEspecifique la descripción de la tarea que desea marcar como realizada:');
                    taskDescription = await textInput();
                    actionMethodSelector(action, taskMethod, taskDescription);
                    taskListConstructor(taskList);
                } else {
                    console.log('\nEl atributo especificado es incorrecto');
                }
                break;
            case '6':
                // Eliminar una tarea
                action = 'delete';
                console.log('\nSelecione uno de los atributos de la tarea que desea eliminar:');
                console.log('1. Indice');
                console.log('2. Descripción');
                option = await textInput();
                if (option == '1'){
                    taskMethod = 'taskIndex';
                    console.log('\nEspecifique el indice de la tarea que desea eliminar:');
                    taskIndex = await textInput();
                    actionMethodSelector(action, taskMethod, taskIndex);
                    taskListConstructor(taskList);
                } else if (option == '2'){
                    taskMethod = 'taskDescription';
                    console.log('\nEspecifique la descripción de la tarea que desea eliminar:');
                    taskDescription = await textInput();
                    actionMethodSelector(action, taskMethod, taskDescription);
                    taskListConstructor(taskList);
                } else {
                    console.log('\nEl atributo especificado es incorrecto');
                }
                break;
            default:
                console.log('\nLa opcion ingresada es incorrecta');
        }
    }
}
main();