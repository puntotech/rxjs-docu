# bufferToggle

<h2 class="subtitle"> Acumula valores del Observable fuente a partir de una emisión de <code>openings</code> en un búfer, que se cierra cuando el Observable retornado por la función <code>closingSelector</code> emite</h2>

<details>
<summary>Signatura</summary>

### Firma

`bufferToggle<T, O>(openings: SubscribableOrPromise<O>, closingSelector: (value: O) => SubscribableOrPromise<any>): OperatorFunction<T, T[]>`

### Parámetros

<table>
<tr><td>openings</td><td>Un <code>Subscribable</code> o <code>Promise</code> de notificaciones para abrir nuevos búferes.</td></tr>
<tr><td>closingSelector</td><td>Una función que recibe el valor emitido por el Observable <code>openings</code> y retorna un <code>Subscribable</code> o <code>Promise</code>, que señala, mediante emisiones, que el búfer asociado debe ser emitido y cerrado.</td></tr>
</table>

### Retorna

`OperatorFunction<T, T[]>`: Un Observable de arrays de valores almacenados.

</details>

## Descripción

Almacena valores en un array. Abre el búfer cuando `openings` emite, y llama a la función `closingSelector` para obtener el Observable que indica cuándo cerrar el búfer.

<img src="assets/images/marble-diagrams/transformation/bufferToggle.png" alt="Diagrama de canicas del operador bufferToggle">

Almacena valores del Observable fuente abriendo el búfer cuando el Observable `openings` lo indica, cerrando dicho búfer y emitiéndolo cuando el `Subscribable` o la `Promise` retornados por la función `closingSelector` emiten.

## Ejemplos

**Abrir el búfer cada cuatro segundos, durante dos segundos**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-buffertoggle-1?file=index.ts">StackBlitz</a>

```javascript
import { fromEvent, interval } from "rxjs";
import { bufferToggle } from "rxjs/operators";

const number$ = interval(1000);

number$
  .pipe(bufferToggle(interval(4000), (_) => interval(2000)))
  .subscribe(console.log);
// Salida: [3, 4], [7, 8], [11, 12]...
```

**Emitir eventos MouseEvent mientras esté pulsado el botón del mouse, hasta que dejemos de pulsarlo**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-buffertoggle-2?file=index.ts">StackBlitz</a>

```typescript
import { fromEvent } from "rxjs";
import { bufferToggle } from "rxjs/operators";

const mouse$ = fromEvent<MouseEvent>(document, "mousemove");

mouse$
  .pipe(
    bufferToggle(fromEvent(document, "mousedown"), (_) =>
      fromEvent(document, "mouseup")
    )
  )
  .subscribe(console.log);
// Salida: [MouseEvent, MouseEvent, MouseEvent, MouseEvent]...
```

### Ejemplo de la documentación oficial

**Cada dos segundos, emite los eventos click de los siguientes 500 milisegundos**

```javascript
import { fromEvent, interval, EMPTY } from "rxjs";
import { bufferToggle } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const openings = interval(1000);
const buffered = clicks.pipe(
  bufferToggle(openings, (i) => (i % 2 ? interval(500) : EMPTY))
);
buffered.subscribe((x) => console.log(x));
```

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/bufferToggle.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/bufferToggle">Documentación oficial en inglés</a>
