# mergeMapTo

<h2 class="subtitle"> Proyecta cada valor emitido por la fuente al mismo Observable, que se fusiona con el Observable resultante
</h2>

<details>
<summary>Signatura</summary>

### Firma

`mergeMapTo<T, R, O extends ObservableInput<any>>(innerObservable: O, resultSelector?: number | ((outerValue: T, innerValue: ObservedValueOf<O>, outerIndex: number, innerIndex: number) => R), concurrent: number = Number.POSITIVE_INFINITY): OperatorFunction<T, ObservedValueOf<O> | R>`

### Parámetros

<table>
<tr><td>innerObservable</td><td>Un Observable que reemplaza cada valor del Observable fuente.</td></tr>
<tr><td>resultSelector</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>number | ((outerValue: T, innerValue: ObservedValueOf, outerIndex: number, innerIndex: number) => R)</code>.</td></tr>
<tr><td>concurrent</td>Opcional. El valor por defecto es <code>Number.POSITIVE_INFINITY</code>.
El máximo número de Observables internos a los que se suscribe de forma concurrente.<td></td></tr>
</table>

### Retorna

`OperatorFunction<T, ObservedValueOf<O> | R>`: Un Observable que emite elementos del Observable `innerObservable` proporcionado.

</details>

## Descripción

Es como `mergeMap`, pero siempre proyecta los valores al mismo Observable interno.

<img src="assets/images/marble-diagrams/transformation/mergeMapTo.png" alt="Diagrama de canicas del operador mergeMapTo">

Proyecta cada emisión de la fuente al Observable `innerObservable` dado, independientemente del valor de dicha emisión, y fusiona los Observables internos resultantes en un solo Observable: el Observable resultante.

## Ejemplos

**Proyectar cada click al mismo Observable interno, que emite un mensaje**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-mergemapto-1?file=index.ts">StackBlitz</a>

```typescript
import { fromEvent, of } from "rxjs";
import { mergeMapTo } from "rxjs/operators";

const click$ = fromEvent<MouseEvent>(document, "click");

click$.pipe(mergeMapTo(of("Hola, has hecho click :D"))).subscribe(console.log);
// Salida: (click) 'Hola, has hecho click :D' (click) 'Hola, has hecho click :D'...
```

**Cada 3 segundos, obtener los títulos de las 3 primeras películas de Ghibli**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-mergemapto-2?file=index.ts">StackBlitz</a>

```javascript
import { mergeMapTo, map, mergeAll, take } from "rxjs/operators";
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

second$.pipe(mergeMapTo(getGhibliFilmTitles())).subscribe(console.log);
// Salida: (3s) Castle in the Sky, Grave of the Fireflies, My Neighbor Totoro (3s) Castle in the Sky, Grave of the Fireflies, My Neighbor Totoro...
```

### Ejemplo de la documentación oficial

**Por cada evento click, empezar un intervalo Observable de 1 segundo**

```javascript
import { fromEvent, interval } from "rxjs";
import { mergeMapTo } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const result = clicks.pipe(mergeMapTo(interval(1000)));
result.subscribe((x) => console.log(x));
```

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/mergeMapTo.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/mergeMapTo">Documentación oficial en inglés</a>
