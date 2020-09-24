<div class="page-heading">

# expand

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/expand.ts">
<svg>
  <use xlink:href="/assets/icons/github.svg#github"></use>
</svg>
</a>
</div>

### Proyecta recursivamente cada valor de la fuente a un Observable que se fusiona con el Observable resultante

### Firma

`expand<T, R>(project: (value: T, index: number) => any, concurrent: number = Number.POSITIVE_INFINITY, scheduler: SchedulerLike = undefined): OperatorFunction<T, R>`

### Parámetros

<table>
<tr><td>project</td><td>Una función que, al aplicarse a un elemento emitido por la fuente, retorna un Observable.</td></tr>
<tr><td>concurrent</td><td>Opcional. El valor por defecto es <code>Number.POSITIVE_INFINITY</code>.
El máximo número de Observables de entrada a los que se suscribe de forma concurrente.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
El <code>SchedulerLike</code> que se utiliza para suscribirse a cada Observable interno proyectado.</td></tr>
</table>

### Retorna

`OperatorFunction<T, R>`: Un Observable que emite los valores de la fuente y

that emits the source values and also result of applying the projection function to each value emitted on the output Observable and and merging the results of the Observables obtained from this transformation.

## Descripción

Es similar a `mergeMap`, pero aplica la función de proyección a cada valor de la fuente además de a cada valor de salida. Es recursivo.

<img src="assets/images/marble-diagrams/transformation/expand.png" alt="Diagrama de canicas del operador expand">

Retorna un Observable que aplica una función a cada elemento emitido por el Observable fuente, donde dicha función retorna un Observable, y fusiona los Observables resultantes, emitiendo el resultado de esta fusión. `expand` reemitirá cada valor de la fuente en el Observable resultante. Entonces, cada .
Así es como `expand` se comporta de forma recursiva.

// TODO

Returns an Observable that emits items based on applying a function that you supply to each item emitted by the source Observable, where that function returns an Observable, and then merging those resulting Observables and emitting the results of this merger. Expand will re-emit on the output Observable every source value. Then, each output value is given to the project function which returns an inner Observable to be merged on the output Observable. Those output values resulting from the projection are also given to the project function to produce new output values. This is how expand behaves recursively.

## Ejemplos

Obtener los 3 números consecutivos a un número

[StackBlitz](https://stackblitz.com/edit/rxjs-expand-1?file=index.ts)

```javascript
import { of } from "rxjs";
import { expand, take } from "rxjs/operators";

const number$ = of(1);

number$
  .pipe(
    expand((val) => of(val + 1)),
    take(4)
  )
  .subscribe(console.log);
// Salida: 1, 2, 3, 4
```

Obtener una secuencia geométrica multiplicando el número introducido por dos

[StackBlitz](https://stackblitz.com/edit/rxjs-expand-2?file=index.ts)

```typescript
import { fromEvent, of } from "rxjs";
import { debounceTime, expand, map, take, repeat } from "rxjs/operators";

const numberInput = document.getElementById("number");

const number$ = fromEvent(numberInput, "keyup").pipe(
  map((event) => +(<HTMLInputElement>event.target).value)
);

number$
  .pipe(
    debounceTime(300),
    expand((val) => of(val * 2)),
    take(4),
    repeat()
  )
  .subscribe(console.log);
// Salida: (introducir nº 2) 2, 4, 8, 16
```

### Ejemplo de la documentación oficial

Comienza a emitir como mucho diez potencias de dos, por cada click

```javascript
import { fromEvent, of } from "rxjs";
import { expand, mapTo, delay, take } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const powersOfTwo = clicks.pipe(
  mapTo(1),
  expand((x) => of(2 * x).pipe(delay(1000))),
  take(10)
);
powersOfTwo.subscribe((x) => console.log(x));
```

## Recursos adicionales

- [Documentación oficial en inglés](https://rxjs-dev.firebaseapp.com/api/operators/expand)
