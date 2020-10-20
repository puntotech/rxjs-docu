# delay

<h2 class="subtitle"> Retrasa la emisión de los elementos del Observable fuente en un tiempo determinado o hasta una fecha determinada
</h2>

<details>
<summary>Signatura</summary>

### Firma

`delay<T>(delay: number | Date, scheduler: SchedulerLike = async): MonoTypeOperatorFunction<T>`

### Parámetros

<table>
<tr><td>delay</td><td>La duración del retraso en milisegundos (un número) o la fecha hasta la que se retrasa la emisión de los elementos.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>async</code>.
El <code>SchedulerLike</code> que se utiliza para gestionar los temporizadores que se encargan de retrasar cada elemento.</td></tr>
</table>

### Retorna

`MonoTypeOperatorFunction<T>`: Un Observable que retrasa las emisiones del Observable fuente por el `timeout` o `Date` especificado.

</details>

## Descripción

Retrasa las emisiones del Observable durante un tiempo o hasta una fecha determinados.

<img src="assets/images/marble-diagrams/utility/delay.png" alt="Diagrama de canicas del operador delay">

Si el argumento `delay` es de tipo `Number`, el operador retrasa el Observable fuente durante esa cantidad de tiempo, expresada en milisegundos. Los intervalos de tiempo relativos entre valores se mantienen.

Si el argumento `delay` es de tipo `Date`, el oeprador retrasa el comienzo de la ejecución Observable hasta que no llegue la fecha proporcionada.

## Ejemplos

**Retrasa la emisión de cada tecla pulsada durante dos segundos**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-delay-1?file=index.ts">StackBlitz</a>

```typescript
import { delay, map } from "rxjs/operators";
import { fromEvent } from "rxjs";

const key$ = fromEvent<KeyboardEvent>(document, "keydown").pipe(
  map(({ code }) => code)
);

key$.pipe(delay(2000)).subscribe(console.log);
// Salida: (2s) KeyR (2s) KeyX (2s) KeyJ (2s) (KeyS)
```

**Retrasa la emisión de cada tecla pulsada hasta una fecha determinada**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-delay-2?file=index.ts">StackBlitz</a>

```typescript
import { delay, map } from "rxjs/operators";
import { fromEvent } from "rxjs";

const key$ = fromEvent<KeyboardEvent>(document, "keydown").pipe(
  map(({ code }) => code)
);

key$.pipe(delay(new Date("February 10, 2025")));
// Salida: Tendremos que esperar unos años para ver el resultado
```

### Ejemplos de la documentación oficial

**Retrasa la emisión de cada click durante un segundo**

```javascript
import { fromEvent } from "rxjs";
import { delay } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const delayedClicks = clicks.pipe(delay(1000)); // each click emitted after 1 second
delayedClicks.subscribe((x) => console.log(x));
```

**Retrasa todos los clicks hasta que sea una fecha determinada**

```javascript
import { fromEvent } from "rxjs";
import { delay } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const date = new Date("March 15, 2050 12:00:00"); // in the future
const delayedClicks = clicks.pipe(delay(date)); // click emitted only after that date
delayedClicks.subscribe((x) => console.log(x));
```

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/delay.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/delay">Documentación oficial en inglés</a>
