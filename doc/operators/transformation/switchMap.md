# switchMap

## Proyecta cada emisión de la fuente a un Observable que se une al Observable resultante, emitiendo únicamente los valores de Observable proyectado más reciente

<details>

<summary>Signatura</summary>

#### Firma

`switchMap<T, R, O extends ObservableInput<any>>(project: (value: T, index: number) => O, resultSelector?: (outerValue: T, innerValue: ObservedValueOf<O>, outerIndex: number, innerIndex: number) => R): OperatorFunction<T, ObservedValueOf<O> | R>`

#### Parámetros

\`

#### Retorna

`OperatorFunction<T, ObservedValueOf<O> | R>`: Un Observable que emite el resultado de aplicar la función de proyección (y el ya obsoleto `resultSelector` opcional) a cada elemento emitido por el Observable fuente, obteniendo únicamente los valores del Observable interno más reciente.

</details>

## Descripción

Proyecta cada valor a un Observable interno, y 'aplasta' estos Observables internos.

![Diagrama de canicas del operador switchMap](assets/images/marble-diagrams/transformation/switchMap.png)

Retorna un Observable que emite elementos tras aplicar una función a cada elemento emitido por el Observable fuente. Dicha función retorna un Observable interno. Cada vez que `switchMap` observa uno de estos Observables internos, el Observable resultante comienza a emitir los elementos de ese Observable interno. Cuando se emite un Observable interno nuevo, `switchMap` inmediatamente deja de emitir los elementos del Observable interno anterior, y comienza a emitir los elementos del nuevo. Este comportamiento se mantiene para todos los Observables internos posteriores.

## Ejemplos

**Cada vez que se pulsa el botón, se hace una nueva petición, cancelando la petición anterior**

[StackBlitz](https://stackblitz.com/edit/docu-rxjs-switchmap-1?file=index.ts)

```javascript
import { fromEvent } from "rxjs";
import { delay, mergeAll, switchMap } from "rxjs/operators";
import { ajax } from "rxjs/ajax";

const click$ =
  fromEvent < MouseEvent > (document.getElementById("ghibliButton"), "click");

function getGhibliFilms() {
  return ajax
    .getJSON("https://ghibliapi.herokuapp.com/films")
    .pipe(mergeAll(), delay(2000));
}

click$.pipe(switchMap((_) => getGhibliFilms())).subscribe(console.log);
// Salida: (Click) (Se hace nueva petición) (Click) (Se hace nueva petición)...
```

[StackBlitz](https://stackblitz.com/edit/docu-rxjs-switchmap-2?file=index.ts)

```typescript
import {
  catchError,
  switchMap,
  map,
  debounceTime,
  distinctUntilChanged,
  mergeAll,
  filter,
  tap,
  delay,
  take,
} from "rxjs/operators";
import { fromEvent, of } from "rxjs";
import { ajax } from "rxjs/ajax";

const searchFilm$ = fromEvent<KeyboardEvent>(
  document.getElementById("githubSearch"),
  "keyup"
);

function getGithubUsers(user) {
  return ajax.getJSON(`https://api.github.com/search/users?q=${user}`).pipe(
    tap(() => console.log("Nueva petición")),
    map(({ items }) => items),
    mergeAll(),
    take(5),
    // Se añade un retardo de 3s para poder observar mejor el efecto de switchMap:
    delay(3000),
    catchError((err) => of(err))
  );
}

// TODO

// If searchFilm$ emits (giving us a new username) before the Observable returned by getGithubUsers() has emitted, switchMap will unsubscribe from the old Observable and switch to a new inner Observable, which will make a new request with the new username
searchFilm$
  .pipe(
    // Emite cuando pase un intervalo de 200ms sin teclear nada:
    debounceTime(200),
    map(({ target }) => (<HTMLInputElement>target).value),
    // Solo emite si se han escrito más de dos letras:
    filter(({ length }) => length > 2),
    // Solo emite si el valor ha cambiado:
    distinctUntilChanged(),
    // ¡A por los usuarios!
    switchMap(getGithubUsers)
  )
  .subscribe(console.log);
// If we type really fast, we'll see 'New request' printed on our console several times, but no results. This is because switchMap is unsubscribing from the Observable before it has had a chance to emit the list of Github users, and is making a new request. If more than 3 seconds pass (the delay operator we added) since the request was made, we will see our list of Github users printed in the console!

// Salida: (Escribiendo NyaGarcia) 'New Request', 'New Request' (3s) {login: 'NyaGarcia' id: 37....}
```

### Ejemplo de la documentación oficial

**Generar un Observable nuevo según los valores del Observable fuente**

```javascript
import { of } from "rxjs";
import { switchMap } from "rxjs/operators";

const switched = of(1, 2, 3).pipe(
  switchMap((x: number) => of(x, x ** 2, x ** 3))
);
switched.subscribe((x) => console.log(x));
// Salida:
// 1
// 1
// 1
// 2
// 4
// 8
// ... y así hasta completar la secuencia
```

**Reiniciar un Observable intervalo con cada click**

```javascript
import { fromEvent, interval } from "rxjs";
import { switchMap } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const result = clicks.pipe(switchMap((ev) => interval(1000)));
result.subscribe((x) => console.log(x));
```

<details>

<summary>Sobrecargas</summary>

#### Firma

`switchMap(project: (value: T, index: number) => O): OperatorFunction<T, ObservedValueOf<O>>`

#### Parámetros

#### Retorna

`OperatorFunction<T, ObservedValueOf<O>>`

#### Firma

`switchMap(project: (value: T, index: number) => O, resultSelector: undefined): OperatorFunction<T, ObservedValueOf<O>>`

#### Parámetros

#### Retorna

`OperatorFunction<T, ObservedValueOf<O>>`

#### Firma

`switchMap(project: (value: T, index: number) => O, resultSelector: (outerValue: T, innerValue: ObservedValueOf<O>, outerIndex: number, innerIndex: number) => R): OperatorFunction<T, R>`

#### Parámetros

#### Retorna

`OperatorFunction<T, R>`

</details>

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/switchMap.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/operators/switchMap)
