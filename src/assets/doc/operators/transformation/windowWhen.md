# windowWhen

<h2 class="subtitle"> Acumula valores del Observable fuente en un Observable anidado (ventana), utilizando una función factoría de Observables para determinar cuándo abrir una nueva ventana
</h2>

<details>
<summary>Signatura</summary>

### Firma

`windowWhen<T>(closingSelector: () => Observable<any>): OperatorFunction<T, Observable<T>>`

### Parámetros

<table>
<tr><td>closingSelector</td><td>Una función que no recibe ningún argumento y retorna un Observable que indica (con una notificación <code>next</code> o <code>complete</code>) cuándo cerrar la ventana actual y abrir una nueva.</td></tr>
</table>

### Retorna

`OperatorFunction<T, Observable<T>>`: Un Observable de ventanas, que son Observables de valores.

</details>

## Descripción

Es como `bufferWhen`, pero emite un Observable anidado en lugar de un array.

<img src="assets/images/marble-diagrams/transformation/windowWhen.png" alt="Diagrama de canicas del operador windowWhen">

Retorna un Observable que emite ventanas de elementos que recoge del Observable fuente. El Observable resultante emite ventanas conectas, sin superposición. Emite la ventana actual y abre una ventana nueva cuando el Observable retornado por la función `closingSelector` emita un valor. La primera ventana se abre inmediatamente después de llevar a cabo la suscripción al Observable resultante.

## Ejemplos

**Recoger una secuencia ascendente de números en una ventana. Cada vez que se haga click, abrir una nueva ventana**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-windowwhen-1?file=index.ts">StackBlitz</a>

```typescript
import { fromEvent, interval } from "rxjs";
import { windowWhen, mergeAll, tap } from "rxjs/operators";

const number$ = interval(2000);

number$
  .pipe(
    windowWhen(() => fromEvent<KeyboardEvent>(document, "click")),
    tap((_) => console.log("Nueva ventana")),
    mergeAll()
  )
  .subscribe(console.log);
// Salida: Nueva ventana, 0, 1, 2, 3 (click) Nueva ventana, 4, 5, 6...
```

**Recoger teclas pulsadas en una ventana de duración aleatoria de entre 1 y 4 segundos**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-windowwhen-2?file=index.ts">StackBlitz</a>

```typescript
import { fromEvent, interval } from "rxjs";
import { windowWhen, mergeAll, tap, map } from "rxjs/operators";

const key$ = fromEvent<KeyboardEvent>(document, "keydown");

key$
  .pipe(
    map(({ code }) => code),
    windowWhen(() => interval(1000 + Math.random() * 3000)),
    tap((_) => console.log("Nueva ventana")),
    // Transformando el Observable de orden superior en uno de primer orden
    mergeAll()
  )
  .subscribe(console.log);
// Salida: Nueva ventana, KeyR, KeyX (x segundos aleatorios después) Nueva ventana, KeyJ, KeyS...
```

### Ejemplo de la documentación oficial

**Emitir únicamente los dos primeros eventos click en cada ventana de una duración aleatoria de entre 1 y 5 segundos**

```javascript
import { fromEvent, interval } from 'rxjs';
import { windowWhen, map, mergeAll, take } from 'rxjs/operators';

const clicks = fromEvent(document, 'click');
const result = clicks.pipe(
windowWhen(() => interval(1000 + Math.random() \* 4000)),
map(win => win.pipe(take(2))), // Cada ventana contiene como mucho 2 emisiones
mergeAll() // 'Aplastar' el Observable de Observables
);
result.subscribe(x => console.log(x));
```

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/windowWhen.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/windowWhen">Documentación oficial en inglés</a>
