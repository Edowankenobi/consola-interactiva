require('colors');
const { inquirerMenu,
        pausa,
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoCkecklist } = require('./helpers/inquirer');
const { saveFile, readDb } = require('./helpers/savefile');

const Tareas = require('./models/tareas');


const main = async() => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = readDb();
   

    if (tareasDB) {
        //cargar tareas
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1':
                //crear opción
                const desc = await leerInput('Descripción de la tarea:');
                tareas.crearTarea(desc);
                break;

            case '2':
                tareas.listadoCompleto();
                break;

            case '3':
                tareas.listarPendientesCompletadas(true);
                break;

            case '4':
                tareas.listarPendientesCompletadas(false);
                break;
            
            case '5':
                const ids = await mostrarListadoCkecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;

            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                const respuesta = await confirmar('¿Estás seguro?');

                if(id !== '0'){
                    if(respuesta){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada'.yellow);
                    }
                }
                break;
        
        }

        saveFile(tareas.listadoArr);

        await pausa();
        
    } while (opt !== '0');

}


main();