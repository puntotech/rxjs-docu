---
description: >-
  Retorna un Observable que se resuscribe count veces al flujo fuente cuando el
  Observable fuente se completa
---

# repeat

<details>

<summary>Signatura</summary>

#### Firma

`repeat<T>(count: number = -1): MonoTypeOperatorFunction<T>`

#### Parámetros

#### Retorna

`MonoTypeOperatorFunction<T>`: Un Observable que se resuscribirá `count` veces al flujo fuente cuando el flujo fuente se complete.

</details>

## Descripción

Repite todos los valores emitidos por la fuente. Es como el operador `retry`, para casos que no sean de error.

![Diagrama de canicas del operador repeat](assets/images/marble-diagrams/utility/repeat.png)

De forma similar a `retry`, este operador repite el flujo de elementos emitidos por la fuente, para casos que no sean de error. `repeat` puede ser útil para crear Observables que deban tener alguna clase de patrón repetido.

Nota: `repeat(0)` retorna un Observable vacío y `repeat()` se repetirá para siempre.

## Ejemplos

**Repetir una petición AJAX**

[StackBlitz](https://stackblitz.com/edit/rxjs-repeat-1?file=index.ts)

```javascript
import { repeat } from "rxjs/operators";
import { of } from "rxjs";

const ghibliFilm$ = ajax.getJSON(
  "https://ghibliapi.herokuapp.com/films/58611129-2dbc-4a81-a72f-77ddfc1b1b49"
);

ghibliFilm$
  .pipe(
    map(({ title }) => title),
    repeat(3)
  )
  .subscribe(console.log);
// Output: My Neighbor Totoro, My Neighbor Totoro, My Neighbor Totoro
```

**Retornar un Observable vacío**

[StackBlitz](https://stackblitz.com/edit/rxjs-repeat-2?file=index.ts)

```javascript
import { repeat } from "rxjs/operators";
import { of } from "rxjs";

const language$ = of("JavaScript", "TypeScript", "Go");

language$.pipe(repeat(0)).subscribe({
  next: console.log,
  complete: () => console.log("Flujo completado"),
});
// Salida: Flujo completado
```

**Repetir un flujo de mensajes de forma infinita**

[StackBlitz](https://stackblitz.com/edit/rxjs-repeat-3?file=index.ts)

```javascript
import { repeat } from "rxjs/operators";
import { of } from "rxjs";

const answer$ = of("La respuesta es 42");

answer$.pipe(repeat()).subscribe(console.log);
// Salida: La respuesta es 42, La respuesta es 42, La respuesta es 42, La respuesta es 42...
```

#### Ejemplos de la documentación oficial

**Repetir un flujo de mensajes**

```javascript
import { of } from "rxjs";
import { repeat, delay } from "rxjs/operators";

const source = of("Repetir mensaje");
const example = source.pipe(repeat(3));
example.subscribe((x) => console.log(x));

// Salida:
// Repetir mensaje
// Repetir mensaje
// Repetir mensaje
```

**Repetir 3 valores, 2 veces**

```javascript
import { interval } from "rxjs";
import { repeat, take } from "rxjs/operators";

const source = interval(1000);
const example = source.pipe(take(3), repeat(2));
example.subscribe((x) => console.log(x));

// Salida: (cada segundo)
// 0
// 1
// 2
// 0
// 1
// 2
```

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/repeat.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/operators/repeat)
