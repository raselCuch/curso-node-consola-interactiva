const Tarea = require("./tarea");
/*
_listado: {uuid-ddd: {id:1, asd, completadoEn}}
*/

class Tareas {
  _listado = {
    abc: 123,
  };

  get listadoArr() {
    const listado = [];

    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];

      listado.push(tarea);
    });

    return listado;
  }

  constructor() {
    this._listado = {};
  }

  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    console.log();
    this.listadoArr.forEach((tarea, i) => {
      const idx = `${i + 1 + "."}`.green;
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? "Completado".green : "Pendiente".red;

      console.log(`${idx} ${desc} ${"::".blue} ${estado}`);
    });
  }

  listarPendientesCompletadas(completadas = true) {
    console.log();
    let contador = 0;
    this.listadoArr.forEach((tarea) => {
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? "Completado".green : "Pendiente".red;

      if (completadas) {
        if (completadoEn) {
          contador += 1;
          console.log(
            `${(contador + ".").green} ${desc} ${"::".blue} ${
              completadoEn.green
            }`
          );
        }
      } else {
        if (!completadoEn) {
          contador += 1;
          console.log(
            `${(contador + ".").green} ${desc} ${"::".blue} ${estado}`
          );
        }
      }
    });
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        // si no existe
        // const tarea = this._listado[tarea.id];
        // tarea.completadoEn = null;
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}

module.exports = Tareas;
