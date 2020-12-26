# windowTime

<h2 class="subtitle"> Acumula valores del Observable fuente en un Observable anidado (ventana) periódicamente
</h2>

<details>
<summary>Signatura</summary>

### Firma

`windowTime(windowTimeSpan: number, scheduler?: SchedulerLike): OperatorFunction<T, Observable<T>>`

### Parámetros

<table>
<tr><td>windowTimeSpan</td><td>La cantidad de tiempo que cada ventana se mantiene abierta.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
El planificador con el que planificar los intervalos que determinan los límites de cada ventana.</td></tr>
</table>

### Retorna

`OperatorFunction<T, Observable<T>>`: Un Observable de ventanas, que son Observables de valores.

</details>

## Descripción

Es como `bufferTime`, pero emite un Observable anidado en lugar de un array.

<img src="assets/images/marble-diagrams/transformation/windowTime.png" alt="Diagrama de canicas del operador windowTime">

Retorna un Observable que emite ventanas de elementos que recoge del Observable fuente. Cada ventana se emite tras un periodo de tiempo determinado por el argumento `windowTimeSpan`. Cuando el Observable fuente se complete o lance un error, el Observable resultante emitirá la ventana actual y propagará la notificación del Observable fuente.
Si no se proporciona el argumento `windowCreationInterval`, el Observable resultante abrirá una nueva ventana en cuanto la ventana anterior esté completa.
Con el argumento `maxWindowCount`, cada ventana emitirá, como mucho, el número de valores indicado.
Con el argumento `windowCreationInterval` se puede determinar cuándo abrir nuevas ventanas de forma periódica.

## Ejemplos

**Recoge teclas pulsadas en una nueva ventana cada 5s**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-windowtime-1?file=index.ts">StackBlitz</a>

```typescript
import { fromEvent } from "rxjs";
import { mergeAll, map, tap, windowTime } from "rxjs/operators";

const key$ = fromEvent<KeyboardEvent>(document, "keydown");

key$
  .pipe(
    map(({ code }) => code),
    windowTime(5000),
    tap((_) => console.log("Nueva Ventana")),
    // Transformando el Observable de orden superior en uno de primer orden
    mergeAll()
  )
  .subscribe(console.log);
// Salida: Nueva Ventana, KeyR, KeyX, KeyJ, KeyS (5s) Nueva Ventana, KeyO...
```

### Ejemplos de la documentación oficial

**Emitir como mucho 2 eventos click en ventanas de 1s**

```javascript
import { fromEvent } from "rxjs";
import { windowTime, map, mergeAll, take } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const result = clicks.pipe(
  windowTime(1000),
  map((win) => win.pipe(take(2))), // Cada ventana contiene como mucho 2 emisiones
  mergeAll() // 'Aplastar' el Observable de Observables
);
result.subscribe((x) => console.log(x));
```

**Emitir como mucho 2 eventos click en ventanas de 1s, abriendo una ventana nueva cada 5s**

```javascript
import { fromEvent } from "rxjs";
import { windowTime, map, mergeAll, take } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const result = clicks.pipe(
  windowTime(1000, 5000),
  map((win) => win.pipe(take(2))), // Cada ventana contiene como mucho 2 emisiones
  mergeAll() // 'Aplastar' el Observable de Observables
);
result.subscribe((x) => console.log(x));
```

**Igual que el ejemplo anterior, pero con maxWindowCount en lugar del operador take**

```javascript
import { fromEvent } from "rxjs";
import { windowTime, mergeAll } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const result = clicks.pipe(
  windowTime(1000, 5000, 2), // Cada ventana contiene como mucho 2 emisiones
  mergeAll() // 'Aplastar' el Observable de Observables
);
result.subscribe((x) => console.log(x));
```

<details>

<summary>Sobrecargas</summary>
<div class="overload-container">

<div class="overload-section">

### Firma

`windowTime(windowTimeSpan: number, windowCreationInterval: number, scheduler?: SchedulerLike): OperatorFunction<T, Observable<T>>`

### Parámetros

<table>
<tr><td>windowTimeSpan</td><td>Tipo: <code>number</code>.</td></tr>
<tr><td>windowCreationInterval</td><td>Tipo: <code>number</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, Observable<T>>`

</div>

<div class="overload-section">

### Firma

`windowTime(windowTimeSpan: number, windowCreationInterval: number, maxWindowSize: number, scheduler?: SchedulerLike): OperatorFunction<T, Observable<T>>`

### Parámetros

<table>
<tr><td>windowTimeSpan</td><td>Tipo: <code>number</code>.</td></tr>
<tr><td>windowCreationInterval</td><td>Tipo: <code>number</code>.</td></tr>
<tr><td>maxWindowSize</td><td>Tipo: <code>number</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, Observable<T>>`

</div>

</div>
</details>

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/windowTime.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/windowTime">Documentación oficial en inglés</a>
