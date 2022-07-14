# mergeMapTo

## Proyecta cada valor emitido por la fuente al mismo Observable, que se fusiona con el Observable resultante

<details>

<summary>Signatura</summary>

#### Firma

`mergeMapTo<T, R, O extends ObservableInput<any>>(innerObservable: O, resultSelector?: number | ((outerValue: T, innerValue: ObservedValueOf<O>, outerIndex: number, innerIndex: number) => R), concurrent: number = Number.POSITIVE_INFINITY): OperatorFunction<T, ObservedValueOf<O> | R>`

#### Parámetros

Opcional. El valor por defecto es `Number.POSITIVE_INFINITY`. El máximo número de Observables internos a los que se suscribe de forma concurrente.

#### Retorna

`OperatorFunction<T, ObservedValueOf<O> | R>`: Un Observable que emite elementos del Observable `innerObservable` proporcionado.

</details>

## Descripción

Es como `mergeMap`, pero siempre proyecta los valores al mismo Observable interno.

![Diagrama de canicas del operador mergeMapTo](assets/images/marble-diagrams/transformation/mergeMapTo.png)

Proyecta cada emisión de la fuente al Observable `innerObservable` dado, independientemente del valor de dicha emisión, y fusiona los Observables internos resultantes en un solo Observable: el Observable resultante.

## Ejemplos

**Proyectar cada click al mismo Observable interno, que emite un mensaje**

[StackBlitz](https://stackblitz.com/edit/rxjs-mergemapto-1?file=index.ts)

```typescript
import { fromEvent, of } from "rxjs";
import { mergeMapTo } from "rxjs/operators";

const click$ = fromEvent<MouseEvent>(document, "click");

click$.pipe(mergeMapTo(of("Hola, has hecho click :D"))).subscribe(console.log);
// Salida: (click) 'Hola, has hecho click :D' (click) 'Hola, has hecho click :D'...
```

**Cada 3 segundos, obtener los títulos de las 3 primeras películas de Ghibli**

[StackBlitz](https://stackblitz.com/edit/rxjs-mergemapto-2?file=index.ts)

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

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/mergeMapTo.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/operators/mergeMapTo)
