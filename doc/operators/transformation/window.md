---
description: >-
  Acumula valores del Observable fuente en un Observable anidado (ventana),
  abriendo una ventana nueva cada vez que un segundo Observable emita
---

# window

<details>

<summary>Signatura</summary>

#### Firma

`window<T>(windowBoundaries: Observable<any>): OperatorFunction<T, Observable<T>>`

#### Parámetros

#### Retorna

`OperatorFunction<T, Observable<T>>`: Un Observable de ventanas, que son Observables que emiten valores del Observable fuente.

</details>

## Descripción

Es como `buffer`, pero emite un Observable anidado en lugar de un array.

![Diagrama de canicas del operador window](assets/images/marble-diagrams/transformation/window.png)

Retorna un Observable que emite ventanas de elementos que recoge del Observable fuente. El Observable resultante emite ventanas conectadas, sin superposición entre ellas. Emite la ventana actual, y abre una nueva cuando el Observable `windowBoundaries` emite un valor. Dado que cada ventana es un Observable, el Observable resultante es un Observable de orden superior.

## Ejemplos

**Acumular el código de las teclas pulsadas en una ventana de 5s**

[StackBlitz](https://stackblitz.com/edit/rxjs-window-1?file=index.ts)

```typescript
import { fromEvent, interval } from "rxjs";
import { window, tap, mergeAll, map } from "rxjs/operators";

const key$ = fromEvent<KeyboardEvent>(document, "keydown");

key$
  .pipe(
    map(({ code }) => code),
    window(interval(5000).pipe(tap((_) => console.log("Nueva Ventana")))),
    // Transformando el Observable de orden superior en uno de primer orden
    mergeAll()
  )
  .subscribe(console.log);
// Salida: Nueva Ventana, KeyR, KeyX, KeyJ, KeyS (5s) Nueva Ventana, KeyO...
```

### Ejemplo de la documentación oficial

**En una ventana de 1s, emitir como mucho 2 eventos click**

```javascript
import { fromEvent, interval } from "rxjs";
import { window, mergeAll, map, take } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const sec = interval(1000);
const result = clicks.pipe(
  window(sec),
  map((win) => win.pipe(take(2))), // Cada ventana contiene como mucho 2 emisiones
  mergeAll() // 'Aplasta' el Observable de orden superior
);
result.subscribe((x) => console.log(x));
```

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/window.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/operators/window)
