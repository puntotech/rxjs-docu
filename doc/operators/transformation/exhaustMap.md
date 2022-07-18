# exhaustMap

## Proyecta cada emisión de la fuente a un Observable interno que se fusiona con el Observable resultante únicamente si el Observable interno anterior se ha completado

💡 Se debe utilizar `exhaustMap` si se quiere ignorar los Observables internos mientras no se haya completado el Observable interno anterior

<details>

<summary>Signatura</summary>

#### Firma

`exhaustMap<T, R, O extends ObservableInput<any>>(project: (value: T, index: number) => O, resultSelector?: (outerValue: T, innerValue: ObservedValueOf<O>, outerIndex: number, innerIndex: number) => R): OperatorFunction<T, ObservedValueOf<O> | R>`

#### Parámetros

#### Retorna

`OperatorFunction<T, ObservedValueOf<O> | R>`: Un Observable que contiene Observables proyectados de cada elemento de la fuente. Ignora los Observables proyectados que comiencen antes de que el Observable proyectado actual se haya completado.

</details>

## Descripción

Proyecta cada valor a un Observable interno, y 'aplasta' todos estos Observables internos mediante el operador `exhaust`.

![Diagrama de canicas del operador exhaustMap](assets/images/marble-diagrams/transformation/exhaustMap.png)

Retorna un Observable que aplica una función a cada uno de los elementos emitidos por el Observable fuente, donde dicha función retorna un Observable interno. Cuando se proyecta cada elemento de la fuente a un Observable, el Observable resultante comienza a emitir los elementos emitidos por el Observable interno. Sin embargo, `exhaustMap` ignora todos los Observables internos nuevos si el Observable interno anterior no se ha completado. Una vez se complete, `exhaustMap` se suscribirá y 'aplastará' el siguiente Observable interno y repetirá el proceso.

## Ejemplos

**Obtener 3 películas de Studio Ghibli al hacer click en el botón**

Si hay alguna petición en curso, los clicks serán ignorados (cada petición tiene un retraso de 5s para poder observar este efecto.)

[StackBlitz](https://stackblitz.com/edit/rxjs-exhaustmap-1?file=index.ts)

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

#### Firma

`exhaustMap(project: (value: T, index: number) => O): OperatorFunction<T, ObservedValueOf<O>>`

#### Parámetros

#### Retorna

`OperatorFunction<T, ObservedValueOf<O>>`

#### Firma

`exhaustMap(project: (value: T, index: number) => O, resultSelector: undefined): OperatorFunction<T, ObservedValueOf<O>>`

#### Parámetros

#### Retorna

`OperatorFunction<T, ObservedValueOf<O>>`

#### Firma

`exhaustMap(project: (value: T, index: number) => any, resultSelector: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R): OperatorFunction<T, R>`

#### Parámetros

#### Retorna

`OperatorFunction<T, R>`

</details>

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/exhaustMap.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/operators/exhaustMap)
