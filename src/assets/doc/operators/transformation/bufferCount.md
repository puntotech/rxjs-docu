# bufferCount

<h2 class="subtitle"> Almacena los valores del Observable en un búfer hasta que este alcanza el tamaño máximo indicado
</h2>

<details>
<summary>Signatura</summary>

### Firma

`bufferCount<T>(bufferSize: number, startBufferEvery: number = null): OperatorFunction<T, T[]>`

### Parámetros

<table>
<tr><td>bufferSize</td><td>El tamaño máximo del búfer.</td></tr>
<tr><td>startBufferEvery</td><td>Opcional. El valor por defecto es <code>null</code>.
El intervalo a partir del cual abrir un nuevo búfer. Por ejemplo, si el valor de <code>startBufferEvery</code> es 2, entonces se abrirá un nuevo búfer cada dos emisiones de la fuente. Por defecto, se abre un búfer al comienzo de la fuente.</td></tr>
</table>

### Retorna

`OperatorFunction<T, T[]>`: Un Observable de arrays de valores almacenados.

</details>

## Descripción

Almacena valores en un array, y emite dicho array cuando su tamaño sea el especificado por `bufferSize`.

<img src="assets/images/marble-diagrams/transformation/bufferCount.png" alt="Diagrama de canicas del operador bufferCount">

Almacena valores del Observable fuente y emite el búfer cuando este llega al tamaño de `bufferSize`, y abre un nuevo búfer cada `startBufferEvery` emisiones. Si no se proporciona `startBufferEvery` o su valor es `null`, entonces se abre un nuevo búfer inmediatamente después de que se cierre y se emita el búfer anterior.

## Ejemplos

**Almacenar cada 5 valores en un array y emitirlo**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-buffercount-1?file=index.ts">StackBlitz</a>

```javascript
import { bufferCount } from "rxjs/operators";
import { interval } from "rxjs";

const number$ = interval(1000);

number$.pipe(bufferCount(5)).subscribe(console.log);
// Output: [0, 1, 2, 3, 4], [5, 6, 7, 8, 9]...
```

### Ejemplos de la documentación oficial

**Emitir los últimos dos eventos click en un array**

```javascript
import { fromEvent } from "rxjs";
import { bufferCount } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const buffered = clicks.pipe(bufferCount(2));
buffered.subscribe((x) => console.log(x));
```

**En cada click, emitir los dos últimos eventos click en un array**

```javascript
import { fromEvent } from "rxjs";
import { bufferCount } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const buffered = clicks.pipe(bufferCount(2, 1));
buffered.subscribe((x) => console.log(x));
```

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/bufferCount.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/bufferCount">Documentación oficial en inglés</a>
