---
description: >-
  Acumula valores del Observable fuente en un Observable anidado (ventana), que
  contiene como mucho un número determinado de valores
---

# windowCount

<details>

<summary>Signatura</summary>

#### Firma

`windowCount<T>(windowSize: number, startWindowEvery: number = 0): OperatorFunction<T, Observable<T>>`

#### Parámetros

#### Retorna

`OperatorFunction<T, Observable<T>>`: Un Observable de ventanas, que son Observables de valores.

</details>

## Descripción

Es como `bufferCount`, pero emite un Observable anidado en lugar de un array.

![Diagrama de canicas del operador windowCount](assets/images/marble-diagrams/transformation/windowCount.png)

Retorna un Observable que emite ventanas de elementos que recoge del Observable fuente. El Observable resultante emite ventanas cada `startWindowEvery` número de elementos, que contengan no más de `windowSize` elementos. Cuando el Observable fuente se complete o lance un error, el Observable resultante emitirá la ventana actual y propagará la notificación del Observable fuente. Si no se proporciona el parámetro `startWindowEvery`, se abrirá una nueva inmediatamente después de emitir la ventana anterior.

## Ejemplos

**Recoge un máximo de cuatro teclas pulsadas en una ventana**

Cada ventana se emite cuando haya recogido cuatro valores.

[StackBlitz](https://stackblitz.com/edit/rxjs-windowcount-1?file=index.ts)

```typescript
import { fromEvent } from "rxjs";
import { windowCount, tap, mergeAll, map } from "rxjs/operators";

const key$ = fromEvent<KeyboardEvent>(document, "keydown");

key$
  .pipe(
    map(({ code }) => code),
    windowCount(4),
    tap((_) => console.log("Nueva Ventana")),
    // Transformando el Observable de orden superior en uno de primer orden
    mergeAll()
  )
  .subscribe(console.log);
// Salida: Nueva Ventana, KeyR, KeyX, KeyJ, KeyS, Nueva Ventana, KeyO...
```

### Ejemplo de la documentación oficial

**Ignorar cada 3er evento click, comenzando a partir del primero**

```javascript
import { fromEvent } from "rxjs";
import { windowCount, map, mergeAll, skip } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const result = clicks.pipe(
  windowCount(3),
  map((win) => win.pipe(skip(1))), // saltar el primero de cada 3 clicks
  mergeAll() // 'Aplastar' el Observable de Observables
);
result.subscribe((x) => console.log(x));
```

**Ignorar cada 3er evento click, comenzando a partir del tercero**

```javascript
import { fromEvent } from "rxjs";
import { windowCount, mergeAll } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const result = clicks.pipe(
  windowCount(2, 3),
  mergeAll() // 'Aplastar' el Observable de Observables
);
result.subscribe((x) => console.log(x));
```

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/windowCount.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/operators/windowCount)
