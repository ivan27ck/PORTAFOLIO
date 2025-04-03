class Tarea {
    constructor(id, title, descripcion, prioridad, estado, creada) {
      this.creada = new Date(creada).toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit' 
      });
      this.id = id;
      this.title = title;
      this.descripcion = descripcion;
      this.prioridad = prioridad;
      this.estado = estado || 'Pendiente'; // Estado por defecto: Pendiente
    }
  
    cambiarEstado(nuevoEstado) {
      this.estado = nuevoEstado;
      if (nuevoEstado === 'Completada') {
        this.fechaCompletada = new Date().toLocaleDateString('es-ES', { 
          year: 'numeric', 
          month: '2-digit', 
          day: '2-digit' 
        });
      } else if (nuevoEstado === 'Pendiente') {
        delete this.fechaCompletada;
      }
    }
  }

class GestorDeTareas {
    constructor() {
        this.colaTareas = [];
        this.tareaEnEjecucion = null;
        this.tiempoEjecucion = 10000; // 10 segundos
      }
  
    agregarTarea(tarea) {
        this.colaTareas.push(tarea);
        console.log(`Tarea ${tarea.title} agregada a la cola.`);
    }
    ordenarTareasPorPrioridad() {
        this.colaTareas.sort((b, a) => {
            const prioridades = ['Baja', 'Media', 'Alta'];
            return prioridades.indexOf(a.prioridad) - prioridades.indexOf(b.prioridad);
        });
        console.log('Tareas ordenadas por prioridad:', this.colaTareas);
    }
    iniciarEjecucion() {
        this.ordenarTareasPorPrioridad();
        if (this.colaTareas.length > 0) {
            this.tareaEnEjecucion = this.colaTareas.shift();
            console.log(`Ejecutando tarea: ${this.tareaEnEjecucion.title}`);
            setTimeout(() => {
                this.finalizarTarea(this.tareaEnEjecucion);
                this.iniciarEjecucion();
            }, this.tiempoEjecucion);
        } else {
            console.log('No hay tareas en la cola.');
            this.tareaEnEjecucion = null;
        }
    }
    finalizarTarea(tarea) {
        tarea.cambiarEstado('Completada');
        console.log(`Tarea ${tarea.title} completada.`);
        console.log(`Fecha de finalización: ${tarea.fechaCompletada}`);
    }

  }

const gestor = new GestorDeTareas();
let tarea1 = new Tarea(1, 'Ir al super', 'Descripcion 1', 'Media', 'En progreso', '2023-10-01');
let tarea2 = new Tarea(2, 'Pasear al perro', 'Descripcion 2', 'Alta', 'En progreso', '2023-10-02');

gestor.agregarTarea(tarea1);
gestor.agregarTarea(tarea2);

// Ver estado inicial
console.log('Estado inicial:');
console.log(tarea1);
console.log(tarea2);

// Iniciar la ejecución de tareas
gestor.iniciarEjecucion();