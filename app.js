require("colors");

const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist,
} = require("./helpers/inquirer");

const Tareas = require("./models/tareas");

const main = async () => {
  let opt = "";
  const tareas = new Tareas();

  const tareasDB = leerDB();

  if (tareasDB) {
    // carga la info de la base de datos
    tareas.cargarTareasFromArray(tareasDB);
  }

  // await pausa();

  do {
    opt = await inquirerMenu(); //imprime menu y retorna una opcion

    switch (opt) {
      case "1": // crear opcion
        const desc = await leerInput("Descripcion:");
        tareas.crearTarea(desc);
        break;

      case "2": // muestra las tareas
        tareas.listadoCompleto();
        break;

      case "3": // listar completadas
        tareas.listarPendientesCompletadas(true);
        break;

      case "4": // listar pendientes
        tareas.listarPendientesCompletadas(false);
        break;

      case "5": // completado o pendiente
        const ids = await mostrarListadoChecklist(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        break;

      case "6": // borrar
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if (id !== "0") {
          const ok = await confirmar("Esta seguro?");
          if (ok) {
            tareas.borrarTarea(id);
            console.log("Tarea borrada");
          }
        }

        break;
    }

    guardarDB(tareas.listadoArr);

    await pausa();
    //
  } while (opt !== "0");
};

main();
