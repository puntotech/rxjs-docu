# debounce

<h2 class="subtitle"> Emite un valor del Observable fuente si, y solo si, pasa un periodo de tiempo determinado por otro Observable sin que el Observable fuente emita ningún valor
</h2>

<details>
<summary>Signatura</summary>

### Firma

`debounce<T>(durationSelector: (value: T) => SubscribableOrPromise<any>): MonoTypeOperatorFunction<T>`

### Parámetros

<table>
<tr><td>durationSelector</td><td>Una función que recibe un valor del Observable fuente para calcular la duración del <i>timeout</i> para cada valor de la fuente, retornado en forma de Observable o Promesa.</td></tr>
</table>

### Retorna

`MonoTypeOperatorFunction<T>`: Un Observable que retrasa las emisiones del Observable fuente durante un periodo de tiempo determinado por el Observable retornado por `durationSelector`. Es posible que algunos valores se pierdan si se producen demasiado frecuentemente.

</details>

## Descripción

Es como `debounceTime`, pero el periodo de silenciamiento de emisiones está determinado por un segundo Observable.

<img src="assets/images/marble-diagrams/filtering/debounce.png" alt="Diagrama de canicas del operador debounce">

<!-- TODO Revise translation -->

`debounce` retrasa los valores emitidos por el Observable fuente, eliminando las emisiones almacenadas que estén pendientes de ser emitidas si el Observable fuente emite algún valor. Este operador almacena el valor más reciente emitido por el Observable fuente, y genera un Observable 'de duración' mediante una llamada a la función `durationSelector`. El valor almacenado se emite una vez que el Observable de duración emite un valor o se completa, y si el Observable fuente no ha emitido ningún valor desde la creación del Observable de duración. Si el Observable fuente emite un valor antes de que el Observable de duración emita o se complete, el valor almacenado será eliminado, y nunca se emitirá en el Observable resultante.

Al igual que `debouncetime`, este es un operador de limitación de emisiones, y también un operador similar a `delay`, ya que las emisiones del Observable resultante no tienen por qué ocurrir en el mismo momento en el que ocurrieron en el Observable fuente.

## Ejemplos

**Emitir la tecla pulsada más reciente, tras una sucesión rápida de teclas. Por ejemplo, si escribimos 'RxJS mola' muy rápidamente (con menos de 500ms entre pulsaciones), solo se emitirá la última letra (a)**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-debounce-1?file=index.ts">StackBlitz</a>

```typescript
import { debounce } from "rxjs/operators";
import { interval, fromEvent } from "rxjs";

const key$ = fromEvent<KeyboardEvent>(document, "keydown");

key$
  .pipe(debounce(() => interval(500)))
  .subscribe(({ code }) => console.log(code));
// Salida: KeyA
```

**Emitir la posición del último click tras una sucesión rápida de clicks**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-debounce-2?file=index.ts">StackBlitz</a>

```typescript
import { debounce } from "rxjs/operators";
import { interval, fromEvent } from "rxjs";

const click$ = fromEvent<MouseEvent>(document, "click");

click$
  .pipe(debounce(() => interval(1000)))
  .subscribe(({ screenX, screenY }) =>
    console.log(
      `Tu último click ha sido en la posición x: ${screenX}, y: ${screenY}`
    )
  );
// Salida: Tu último click ha sido en la posición x: 1278 , y: 265
```

### Ejemplo de la documentación oficial

**Emitir el click más reciente tras una sucesión rápida de clicks**

```javascript
import { fromEvent, interval } from "rxjs";
import { debounce } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const result = clicks.pipe(debounce(() => interval(1000)));
result.subscribe((x) => console.log(x));
```

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/debounce.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/debounce">Documentación oficial en inglés</a>
