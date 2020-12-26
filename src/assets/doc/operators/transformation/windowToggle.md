# windowToggle

<h2 class="subtitle"> Acumula valores del Observable fuente en un Observable anidado (ventana). Cada ventana se abre cuando un segundo Observable emite, y se cierra cuando un tercer Observable retornado por una función emite
</h2>

<details>
<summary>Signatura</summary>

### Firma

`windowToggle<T, O>(openings: Observable<O>, closingSelector: (openValue: O) => Observable<any>): OperatorFunction<T, Observable<T>>`

### Parámetros

<table>
<tr><td>openings</td><td>Un observable de notificaciones para abrir nuevas ventanas.</td></tr>
<tr><td>closingSelector</td><td>Una función que recibe el valor emitido por el Observable <code>openings</code> y retorna un Observable que, cuando emite (ya sea una notificación <code>next</code> o <code>complete</code>), señala que la ventana asociado debe cerrarse.</td></tr>
</table>

### Retorna

`OperatorFunction<T, Observable<T>>`: Un Observable de ventanas, que son Observables de valores.

</details>

## Descripción

Es como `bufferToggle`, pero emite un Observable anidado en lugar de un array.

<img src="assets/images/marble-diagrams/transformation/windowToggle.png" alt="Diagrama de canicas del operador windowToggle">

Retorna un Observable que emite ventanas de elementos que recoge del Observable fuente. El Observable resultante emite ventanas que contienen estos elementos emitidos por el Observable fuente durante el periodo entre la emisión del Observable `openings` y la emisión del Observable retornado por la función `closingSelector`.

## Ejemplos

**Abrir una nueva ventana cada vez que se pulse una tecla numérica, cuya duración esté determinada por el valor de la tecla que se pulse.**

Ejemplo: Si se pulsa la tecla 6, la duración de la ventana será de 6 segundos.

<a target="_blank" href="https://stackblitz.com/edit/rxjs-windowtoggle-1?file=index.ts">StackBlitz</a>

```typescript
import { fromEvent, interval } from "rxjs";
import { windowToggle, mergeAll, map, filter, tap } from "rxjs/operators";

const number$ = interval(1000);

// Emitirá cuando se presione una tecla numérica (0, 1, 2, 3, 4, 5, 6, 7, 8 o 9)
const numericKey$ = fromEvent<KeyboardEvent>(document, "keydown").pipe(
  map(({ key }) => +key),
  filter((key) => !isNaN(key))
);

number$
  .pipe(
    windowToggle(numericKey$, (n) => interval(n * 1000)),
    tap((_) => console.log("Nueva ventana")),
    mergeAll()
  )
  .subscribe(console.log);
// Salida: (pulsar 5) Nueva ventana, 0, 1, 2, 3, 4 (pulsar 2) Nueva ventana, 5, 6
```

### Ejemplo de la documentación oficial

**Cada 2 segundos, emitir los eventos clicks de los siguientes 500ms**

```javascript
import { fromEvent, interval, EMPTY } from "rxjs";
import { windowToggle, mergeAll } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const openings = interval(1000);
const result = clicks.pipe(
  windowToggle(openings, (i) => (i % 2 ? interval(500) : EMPTY)),
  mergeAll()
);
result.subscribe((x) => console.log(x));
```

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/windowToggle.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/windowToggle">Documentación oficial en inglés</a>
