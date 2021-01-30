# asap

### Firma

`const asap: any;`

Asap Scheduler

## Descripción

Ejecuta una tarea lo más rápido que se pueda ejecutar asíncronamente.

El Planificador `asap` se comporta de la misma manera que el Planificador [async](/api/schedulers/async) cuando se utiliza para retrasar una tarea en el tiempo. Sin embargo, si a delay se le proporciona un valor de `0`, `asap` espera a que termine la ejecución síncrona del código, y solo entonces intenta ejecutar la tarea dada lo más rápidamente posible.

El Planificador `asap` trata de minimizar el intervalo tiempo desde la finalización de la ejecución del código hasta el comienzo de la tarea planificada. Esto lo convierte en el mejor candidato para llevar a cabo cualquier postergamiento. Tradicionalmente, este comportamiento se lograba mediante `setTimeout(tareaPostergada, 0)`, aunque el uso de dicha técnica provoca un retardo (aunque mínimo) no deseado.

Se debe tener en cuenta que el utilizar el Planificador `asap` no implica necesariamente que la tarea planificada sea la primera en ser procesada tras la finalización de la ejecución actual de código. Si otra tarea se planifica anteriormente con `asap`, dicha tarea será ejecutada primero. Dicho esto, si se necesita planificar una tarea de forma asíncrona, pero lo antes posible, el Planificador `asap` es la mejor opción.

<!-- asap scheduler behaves the same as async scheduler when you use it to delay task in time. If however you set delay to 0, asap will wait for current synchronously executing code to end and then it will try to execute given task as fast as possible.

asap scheduler will do its best to minimize time between end of currently executing code and start of scheduled task. This makes it best candidate for performing so called "deferring". Traditionally this was achieved by calling setTimeout(deferredTask, 0), but that technique involves some (although minimal) unwanted delay.

Note that using asap scheduler does not necessarily mean that your task will be first to process after currently executing code. In particular, if some task was also scheduled with asap before, that task will execute first. That being said, if you need to schedule task asynchronously, but as soon as possible, asap scheduler is your best bet. -->

## Ejemplos

### Ejemplo de la documentación oficial

Comparación de los Planificadores async y asap

```javascript
import { asapScheduler, asyncScheduler } from "rxjs";

asyncScheduler.schedule(() => console.log("async")); // planificando 'async' primero...
asapScheduler.schedule(() => console.log("asap"));

/* Salida:
     "asap"
     "async"
     ... !Pero 'asap' aparece antes!
*/
```
