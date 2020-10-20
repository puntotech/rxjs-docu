# exhaustMap

<h2 class="subtitle"> Proyecta cada emisión de la fuente a un Observable interno que se fusiona con el Observable resultante únicamente si el Observable interno anterior se ha completado</h2>

💡 Se debe utilizar `exhaustMap` si se quiere ignorar los Observables internos mientras no se haya completado el Observable interno anterior

<details>
<summary>Signatura</summary>

### Firma

`exhaustMap<T, R, O extends ObservableInput<any>>(project: (value: T, index: number) => O, resultSelector?: (outerValue: T, innerValue: ObservedValueOf<O>, outerIndex: number, innerIndex: number) => R): OperatorFunction<T, ObservedValueOf<O> | R>`

### Parámetros

<table>
<tr><td>project</td><td>Una función que, al aplicarse a un elemento emitido por el Observable fuente, retorna un Observable.</td></tr>
<tr><td>resultSelector</td><td>Opcional. El valor por defecto es <code>undefined</code>.

Tipo: <code>(outerValue: T, innerValue: ObservedValueOf, outerIndex: number, innerIndex: number) => R</code>.</td></tr>

</table>

### Retorna

`OperatorFunction<T, ObservedValueOf<O> | R>`: Un Observable que contiene Observables proyectados de cada elemento de la fuente. Ignora los Observables proyectados que comiencen antes de que el Observable proyectado actual se haya completado.

</details>

## Descripción

Proyecta cada valor a un Observable interno, y 'aplasta' todos estos Observables internos mediante el operador `exhaust`.

<img src="assets/images/marble-diagrams/transformation/exhaustMap.png" alt="Diagrama de canicas del operador exhaustMap">

Retorna un Observable que aplica una función a cada uno de los elementos emitidos por el Observable fuente, donde dicha función retorna un Observable interno. Cuando se proyecta cada elemento de la fuente a un Observable, el Observable resultante comienza a emitir los elementos emitidos por el Observable interno. Sin embargo, `exhaustMap` ignora todos los Observables internos nuevos si el Observable interno anterior no se ha completado. Una vez se complete, `exhaustMap` se suscribirá y 'aplastará' el siguiente Observable interno y repetirá el proceso.

## Ejemplos

**Obtener 3 películas de Studio Ghibli al hacer click en el botón**

Si hay alguna petición en curso, los clicks serán ignorados (cada petición tiene un retraso de 5s para poder observar este efecto.)

<a target="_blank" href="https://stackblitz.com/edit/rxjs-exhaustmap-1?file=index.ts">StackBlitz</a>

```typescript
import { delay, exhaustMap, map, mergeAll, take } from "rxjs/operators";
import { fromEvent } from "rxjs";
import { ajax } from "rxjs/ajax";

const click$ = fromEvent(document.getElementById("ghibliButton"), "click");

function getGhibliFilms() {
  return ajax.getJSON("https://ghibliapi.herokuapp.com/films").pipe(
    delay(5000),
    mergeAll(),
    map(({ title }) => title),
    take(3)
  );
}

// Obtener 3 películas de Studio Ghibli al hacer click en el botón. Si hay alguna petición en curso, los clicks serán ignorados (cada petición tiene un retraso de 5s para poder observar este efecto.)
click$.pipe(exhaustMap((_) => getGhibliFilms())).subscribe(console.log);
// Salida: (Primer click) (click ignorado) (click ignorado) (5s) Castle in the Sky, Grave of the Fireflies, My Neighbor Totoro
```

### Ejemplo de la documentación oficial

**Ejecuta un temporizador con cada click, únicamente si no hay ningún temporizador activo**

```javascript
import { fromEvent, interval } from "rxjs";
import { exhaustMap, take } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const result = clicks.pipe(exhaustMap((ev) => interval(1000).pipe(take(5))));
result.subscribe((x) => console.log(x));
```

<details>
<summary>Sobrecargas</summary>
<div class="overload-container">

<div class="overload-section">

### Firma

`exhaustMap(project: (value: T, index: number) => O): OperatorFunction<T, ObservedValueOf<O>>`

### Parámetros

<table>
<tr><td>project</td><td>Tipo: <code>(value: T, index: number) => O</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, ObservedValueOf<O>>`

</div>

<div class="overload-section">

### Firma

`exhaustMap(project: (value: T, index: number) => O, resultSelector: undefined): OperatorFunction<T, ObservedValueOf<O>>`

### Parámetros

<table>
<tr><td>project</td><td>Tipo: <code>(value: T, index: number) => O</code>.</td></tr>
<tr><td>resultSelector</td><td>Tipo: <code>undefined</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, ObservedValueOf<O>>`

</div>

<div class="overload-section">

### Firma

`exhaustMap(project: (value: T, index: number) => any, resultSelector: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R): OperatorFunction<T, R>`

### Parámetros

<table>
<tr><td>project</td><td>Tipo: <code>(value: T, index: number) => any</code>.</td></tr>
<tr><td>resultSelector</td><td>Tipo: <code>(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, R>`

</div>

</div>
</details>

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/exhaustMap.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/exhaustMap">Documentación oficial en inglés</a>
