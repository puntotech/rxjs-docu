---
description: >-
  Almacena los valores del Observable en un búfer hasta que otro Observable
  emita
---

# buffer

<details>

<summary>Signatura</summary>

#### Firma

`buffer<T>(closingNotifier: Observable<any>): OperatorFunction<T, T[]>`

#### Parámetros

#### Retorna

`OperatorFunction<T, T[]>`: Un Observable de búferes, que son arrays de valores.

</details>

## Descripción

Acumula valores en un array, y emite dicho array cuando un segundo Observable emita.

![Diagrama de canicas del operador buffer](assets/images/marble-diagrams/transformation/buffer.png)

Almacena los valores del Observable fuente en un búfer hasta que el Observable `closingNotifier` emita un valor, en cuyo momento se emite el búfer en el Observable resultante, y se abre un búfer nuevo internamente, esperando a la próxima emisión de `closingNotifier`.

## Ejemplos

**Con cada tecla pulsada, emitir el array de los números emitidos desde la última tecla pulsada**

[StackBlitz](https://stackblitz.com/edit/rxjs-buffer-1?file=index.ts)

```typescript
import { buffer } from "rxjs/operators";
import { interval, fromEvent } from "rxjs";

const number$ = interval(1000);
const key$ = fromEvent(document, "keydown");

number$.pipe(buffer(key$)).subscribe(console.log);
// Salida: (tecla pulsada) [0, 1, 2, 3] (tecla pulsada) [4, 5]
```

**Emitir los clicks hechos en un intervalo de 5 segundos**

Si no se hace ningún click en el intervalo, no se emitirá nada.

[StackBlitz](https://stackblitz.com/edit/rxjs-buffer-2?file=index.ts)

```javascript
import { buffer, filter } from "rxjs/operators";
import { interval, fromEvent } from "rxjs";

const click$ = fromEvent(document, "click");
const clickInterval$ = interval(5000);

click$
  .pipe(
    buffer(clickInterval$),
    filter(({ length }) => length > 0)
  )
  .subscribe(console.log);
// Output: (5s) [MouseEvent, MouseEvent] (5s) [MouseEvent]
```

### Ejemplos de la documentación oficial

**Emite el array de eventos almacenados en cada click**

```javascript
import { fromEvent, interval } from "rxjs";
import { buffer } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const intervalEvents = interval(1000);
const buffered = intervalEvents.pipe(buffer(clicks));
buffered.subscribe((x) => console.log(x));
```

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/buffer.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/operators/buffer)
