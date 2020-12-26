# subscribeOn

<h2 class="subtitle"> Suscribe a los Observadores asíncronamente al Observable fuente en función del <code>SchedulerLike</code> especificado
</h2>

<details>
<summary>Signatura</summary>

### Firma

`subscribeOn<T>(scheduler: SchedulerLike, delay: number = 0): MonoTypeOperatorFunction<T>`

### Parámetros

<table>
<tr><td>scheduler</td><td>El <code>SchedulerLike</code> sobre el que llevar a cabo las acciones de suscripción.</td></tr>
<tr><td>delay</td><td>Opcional. El valor por defecto es 0.
Tipo: <code>number</code>.</td></tr>
</table>

### Retorna

`MonoTypeOperatorFunction<T>`: El Observable fuente modificado para que sus suscripciones ocurran en función del `SchedulerLike` especificado.

</details>

## Descripción

Con `subscribeOn` se puede decidir qué tipo de planificador utilizará un Observable cuando sea suscrito.

Los planificadores controlan la velocidad y el orden en el que se emiten los valores a los observadores desde un flujo Observable.

<img src="assets/images/marble-diagrams/utility/subscribeOn.png" alt="Diagrama de canicas del operador subscribeOn">

### Ejemplos

**Comparación entre los distintos planificadores**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-subscribeon-1?file=index.ts">StackBlitz</a>

```javascript
import { subscribeOn } from "rxjs/operators";
import { of, asyncScheduler, asapScheduler } from "rxjs";

const async$ = of("asyncScheduler");
const asap$ = of("asapScheduler");
const immediate$ = of("Sin planificador");

// Sin utilizar subscribeOn
asap$.subscribe(console.log);
async$.subscribe(console.log);
immediate$.subscribe(console.log);
// Salida: asapScheduler, asyncScheduler, Sin planificador

// Utilizando subscribeOn
asap$.pipe(subscribeOn(asapScheduler)).subscribe(console.log);
async$.pipe(subscribeOn(asyncScheduler)).subscribe(console.log);
immediate$.subscribe(console.log);
// Salida: Sin planificador, asapScheduler, asyncScheduler
```

#### Ejemplo de la documentación oficial

Dado el siguiente código:

```javascript
import { of, merge } from "rxjs";

const a = of(1, 2, 3, 4);
const b = of(5, 6, 7, 8, 9);
merge(a, b).subscribe(console.log);
```

Tanto el Observable a como el Observable b emitirán sus valores de forma directa y síncrona cuando se realice alguna suscripción sobre ellos. Esto resultará en la siguiente salida: 1, 2, 3, 4, 5, 6, 7, 8, 9

Sin embargo, si se utiliza el operador subscribeOn para indicar que se quiere utilizar el asyncScheduler para los valores emitidos por el Observable a:

```javascript
import { of, merge, asyncScheduler } from "rxjs";
import { subscribeOn } from "rxjs/operators";

const a = of(1, 2, 3, 4).pipe(subscribeOn(asyncScheduler));
const b = of(5, 6, 7, 8, 9);
merge(a, b).subscribe(console.log);
```

La salida será 5, 6, 7, 8, 9, 1, 2, 3, 4. Esto es debido a que el Observable b emite sus valores de forma síncrona y directa, pero las emisiones del Observable a se planifican en el bucle de eventos, dado que se está utilizando el asyncScheduler.

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/subscribeOn.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/subscribeOn">Documentación oficial en inglés</a>
