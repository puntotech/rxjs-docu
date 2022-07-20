---
description: >-
  Proyecta recursivamente cada valor de la fuente a un Observable que se fusiona
  con el Observable resultante
---

# expand

<details>

<summary>Signatura</summary>

#### Firma

`expand<T, R>(project: (value: T, index: number) => any, concurrent: number = Number.POSITIVE_INFINITY, scheduler: SchedulerLike = undefined): OperatorFunction<T, R>`

#### Parámetros

#### Retorna

`OperatorFunction<T, R>`: Un Observable que emite los valores de la fuente. También emite el resultado de aplicar la función de proyeccón a cada valor emitido en el Observable de salida, fusionando los Observables obtenidos de esta transformación.

</details>

## Descripción

Es similar a `mergeMap`, pero aplica la función de proyección a cada valor de la fuente además de a cada valor de salida. Es recursivo.

![Diagrama de canicas del operador expand](assets/images/marble-diagrams/transformation/expand.png)

Retorna un Observable que aplica una función a cada elemento emitido por el Observable fuente, donde dicha función retorna otro Observable, y fusiona los Observables resultantes, emitiendo el resultado de esta fusión. expand reemitirá cada valor de la fuente en el Observable resultante.

Entonces, cada valor de salida se le proporciona a la función de proyección, que retorna un Observable interno que se fusiona en el Observable resultante. Esos valores de salida resultantes de la proyección también se le proporcionan a la función project para producir nuevos valores de salida. Así es como expand se comporta de forma recursiva.

## Ejemplos

**Obtener los 3 números consecutivos a un número**

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

**Obtener una secuencia geométrica multiplicando el número introducido por dos**

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

**Comienza a emitir como mucho diez potencias de dos, por cada click**

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

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/expand.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/operators/expand)
