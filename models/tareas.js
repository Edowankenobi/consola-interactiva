const Tarea = require('./tarea');

class Tareas {


    _listado = {};

    get listadoArr() {

        const listado = [];

        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado;

    }

    constructor() {
        this._listado = {};
    }

    borrarTarea(id =''){
        if (this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []) {

        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;

        });
    }


    crearTarea(desc = '') {
        const tarea = new Tarea(desc);

        this._listado[tarea.id] = tarea

    }

    listadoCompleto() {

        console.log(); //para dar espacio entre título y detalle
        if (Object.keys(this._listado).length === 0) {
            console.log(`No existen ${'tareas'.red} para listar`);
            return;
        }

        this.listadoArr.forEach((tarea, indice) => {
            const idx = `${indice + 1}.-`.yellow;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) ? 'Completada'.blue : 'Pendiente'.red;

            console.log(`${idx} ${desc} :: ${estado}`);


        })
    }

    listarPendientesCompletadas(completadas = true) {
        console.log(); //para dar espacio entre título y detalle

        let contador = 0;

        if (Object.keys(this._listado).length === 0) {
            console.log(`No existen ${'tareas'.red} para listar`);
            return;
        }

        // const filtro = (completadas) ? this.listadoArr.filter(tarea => tarea.completadoEn !== null) : this.listadoArr.filter(tarea => tarea.completadoEn === null);


        this.listadoArr.forEach(tarea => {

            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) ? 'Completada'.blue : 'Pendiente'.red;

            if (completadas) {
                //mostrar completadas
                if (completadoEn) {
                    contador += 1;
                    console.log(`${(contador + '.-').yellow} ${desc} :: ${completadoEn}`);
                }
            } else {
                //mostrar pendientes
                if (!completadoEn) {
                    contador += 1;
                    console.log(`${(contador + '.-').yellow} ${desc} :: ${estado}`);
                }
            }



        })


    }

}

module.exports = Tareas