# queue

<h2 class="subtitle">Planificador de Cola</h2>

### Firma

`const queue: any;`

## Descripción

Coloca cada tarea en una cola, en lugar de ejecutarla inmediatamene.

Cuando se utiliza el Planificador `queue` con un <em>delay</em>, este se comporta igual que el [Planificador async](api/schedulers/async).

Si se utiliza sin un <em>delay</em>, planifica cada tarea proporcionada síncronamente - la ejecuta justo en el momento en el que es planificado. Sin embargo, al ser llamado recursivamente, es decir, desde el interior de la tarea planificada, se planifica otra tarea con el Planificador `queue`. En lugar de ejecutar dicha tarea inmediatamente, será colocada en una cola y esperará a que la tarea actual se termine.

Esto quiere decir que cuando se planifica una determinada tarea con el Planificador `queue`, se puede asegurar que dicha tarea terminará antes de que comience cualquier otra tarea planificada con dicho Planificador.

## Ejemplos

### Ejemplos de la documentación oficial

Primero, planificar recursivamente. Después, hacer algo

```javascript
import { queueScheduler } from "rxjs";

queueScheduler.schedule(() => {
  queueScheduler.schedule(() => console.log("Segundo")); // No ocurrirá ahora, será colocado en una cola

  console.log("Primero");
});

// Salida:
// "Primero"
// "Segundo"
```

Replanificarse a sí mismo recursivamente

```javascript
import { queueScheduler } from "rxjs";

queueScheduler.schedule(
  function (state) {
    if (state !== 0) {
      console.log("Antes", state);
      this.schedule(state - 1); // this` referencia a la Action que se esté ejecutando en el momento,
      // que se replanifica con un nuevo estado y delay
      console.log("Después", state);
    }
  },
  0,
  3
);

// En un Planificador que se ejecuta recursivamente, cabe esperar:
// "Antes", 3
// "Antes", 2
// "Antes", 1
// "Después", 1
// "Después", 2
// "Después", 3

// Pero con queue se recibe la siguiente salida:
// "Antes", 3
// "Después", 3
// "Antes", 2
// "Después", 2
// "Antes", 1
// "Después", 1
```

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/6.5.5/src/internal/scheduler/queue.ts#L72-L71">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/index/const/queueScheduler">Documentación oficial en inglés</a>
