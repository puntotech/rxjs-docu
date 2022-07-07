# async

Async Scheduler

### Firma

`const async: any;`

## Descripción

Planifica tareas de la misma forma que usando `setTimeout(task, duration)`.

El Planificador `async` planifica tareas asíncronamente, colocándolas en la cola del bucle de eventos de JavaScript. Se utiliza para retrasar tareas en el tiempo o para planificar tareas que se repitan en intervalos.

Si únicamente se quiere postergar la tarea, es decir, ejecutarla justo después de que finalice la ejecución actual síncrona de código (comportamiento comúnmente logrado mediante `setTimeout(tareaPostergada, 0)`), el Planificador [asap.](/api/schedulers/asap)

## Ejemplos

### Ejemplos de la documentación oficial

Usar el Planificador async para retrasar una tarea

```javascript
import { asyncScheduler } from "rxjs";

const task = () => console.log("¡Funciona!");

asyncScheduler.schedule(task, 2000);

// Salida tras 2 segundos:
// "¡Funciona"
```

Usar el Planificador async para repetir una tarea en intervalos

```javascript
import { asyncScheduler } from "rxjs";

function task(state) {
  console.log(state);
  this.schedule(state + 1, 1000); // `this` referencia a la Action que se esté ejecutando en el momento,
  // que se replanifica con un nuevo estado y delay
}

asyncScheduler.schedule(task, 3000, 0);

/* Salida:
   0 tras 3s
   1 tras 4s
   2 tras 5s
   3 tras 6s
*/
```
