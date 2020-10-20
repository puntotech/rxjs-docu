# concatMapTo

<h2 class="subtitle"> Proyecta cada valor emitido por la fuente al mismo Observable interno, que se une al Observable resultante de forma secuencial</h2>

💡 `concatMapTo` siempre utiliza el mismo Observable interno, sin tener en cuenta el valor emitido por la fuente. Si se quiere tener en cuenta el valor emitido, se debe utilizar `concatMap`

<details>
<summary>Signatura</summary>

### Firma

`concatMapTo<T, R, O extends ObservableInput<any>>(innerObservable: O, resultSelector?: (outerValue: T, innerValue: ObservedValueOf<O>, outerIndex: number, innerIndex: number) => R): OperatorFunction<T, ObservedValueOf<O> | R>`

### Parámetros

<table>
<tr><td>innerObservable</td><td>Un Observable para reemplazar cada valor del Observable fuente.</td></tr>
<tr><td>resultSelector</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>(outerValue: T, innerValue: ObservedValueOf, outerIndex: number, innerIndex: number) => R</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, ObservedValueOf<O> | R>`: Un Observable de valores obtenido a partir de fusionar el Observable consigo mismo, una vez por cada valor emitido por la fuente.

</details>

## Descripción

Es como `concatMap`, pero siempre proyecta cada valor al mismo Observable interno.

<img src="assets/images/marble-diagrams/transformation/concatMapTo.png" alt="Diagrama de canicas del operador concatMapTo">

Proyecta cada elemento emitido por la fuente al Observable `innerObservable` proporcionado, independientemente del valor del elemento, y después 'aplana' los Observables internos resultantes en un solo Observable. Cada instancia de Observable interno emitida en el Observable resultante se concatena con la instancia del Observable interno previa.

Advertencia: Si los valores de la fuente se emiten de forma ilimitada, y más rápidamente de lo que sus Observable internos correspondientes pueden completarse, habrá problemas de memoria, ya que los Observables internos se acumularán en un búfer ilimitado esperando que llegue se turno de ser suscritos.

💡 `concatMapTo` es equivalente a `mergeMapTo` con un parámetro de concurrencia de valor 1.

## Ejemplos

**Proyectar cada click al mismo Observable interno, que emite un mensaje**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-concatmapto-1?file=index.ts">StackBlitz</a>

```javascript
import { fromEvent, of } from "rxjs";
import { concatMapTo } from "rxjs/operators";

const click$ = fromEvent < MouseEvent > (document, "click");

click$.pipe(concatMapTo(of("Hola, has hecho click :D"))).subscribe(console.log);
// Salida: (click) 'Hola, has hecho click :D' (click) 'Hola, has hecho click :D'...
```

**Cada 3 segundos, obtener los títulos de las 3 primeras películas de Ghibli**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-concatmapto-2?file=index.ts">StackBlitz</a>

```javascript
import { concatMapTo, map, mergeAll, take } from "rxjs/operators";
import { interval } from "rxjs";
import { ajax } from "rxjs/ajax";

const second$ = interval(3000).pipe(take(5));

function getGhibliFilmTitles() {
  return ajax.getJSON(`https://ghibliapi.herokuapp.com/films/`).pipe(
    mergeAll(),
    map(({ title }) => title),
    take(3)
  );
}

second$.pipe(concatMapTo(getGhibliFilmTitles())).subscribe(console.log);
// Salida: Castle in the Sky, Grave of the Fireflies, My Neighbor Totoro
```

### Ejemplo de la documentación oficial

Para cada evento click, emitir los valores de 0 a 3 a intervalos de 1 segundo, sin concurrencia

```javascript
import { fromEvent, interval } from "rxjs";
import { concatMapTo, take } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const result = clicks.pipe(concatMapTo(interval(1000).pipe(take(4))));
result.subscribe((x) => console.log(x));

// Resulta en:
// (los resultados no son concurrentes)
// Por cada click en el documento, se emitirán los valores del 0 al 3 a intervales de 1000ms
// (click) = 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3
```

<details>
<summary>Sobrecargas</summary>
<div class="overload-container">

<div class="overload-section">

### Firma

`concatMapTo(observable: O): OperatorFunction<T, ObservedValueOf<O>>`

### Parámetros

<table>
<tr><td>observable</td><td>Tipo:<code>O</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, ObservedValueOf<O>>`

</div>

<div class="overload-section">

### Firma

`concatMapTo(observable: O, resultSelector: undefined): OperatorFunction<T, ObservedValueOf<O>>`

### Parámetros

<table>
<tr><td>observable</td><td>Tipo:<code>O</code>.</td></tr>
<tr><td>resultSelector</td><td>Tipo:<code>undefined</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, ObservedValueOf<O>>`

</div>

<div class="overload-section">

### Firma

`concatMapTo(observable: O, resultSelector: (outerValue: T, innerValue: ObservedValueOf<O>, outerIndex: number, innerIndex: number) => R): OperatorFunction<T, R>`

### Parámetros

<table>
<tr><td>observable</td><td>Tipo:<code>O</code>.</td></tr>
<tr><td>resultSelector</td><td>Tipo:<code>(outerValue: T, innerValue: ObservedValueOf, outerIndex: number, innerIndex: number) => R</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, R>`

</div>

</div>
</details>

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/concatMapTo.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/concatMapTo">Documentación oficial en inglés</a>
