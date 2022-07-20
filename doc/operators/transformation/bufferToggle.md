---
description: >-
  Acumula valores del Observable fuente a partir de una emisión de openings en
  un búfer, que se cierra cuando el Observable retornado por la función
  closingSelector emite
---

# bufferToggle

<details>

<summary>Signatura</summary>

#### Firma

`bufferToggle<T, O>(openings: SubscribableOrPromise<O>, closingSelector: (value: O) => SubscribableOrPromise<any>): OperatorFunction<T, T[]>`

#### Parámetros

#### Retorna

`OperatorFunction<T, T[]>`: Un Observable de arrays de valores almacenados.

</details>

## Descripción

Almacena valores en un array. Abre el búfer cuando `openings` emite, y llama a la función `closingSelector` para obtener el Observable que indica cuándo cerrar el búfer.

![Diagrama de canicas del operador bufferToggle](assets/images/marble-diagrams/transformation/bufferToggle.png)

Almacena valores del Observable fuente abriendo el búfer cuando el Observable `openings` lo indica, cerrando dicho búfer y emitiéndolo cuando el `Subscribable` o la `Promise` retornados por la función `closingSelector` emiten.

## Ejemplos

**Abrir el búfer cada cuatro segundos, durante dos segundos**

[StackBlitz](https://stackblitz.com/edit/rxjs-buffertoggle-1?file=index.ts)

```javascript
import { fromEvent, interval } from "rxjs";
import { bufferToggle } from "rxjs/operators";

const number$ = interval(1000);

number$
  .pipe(bufferToggle(interval(4000), (_) => interval(2000)))
  .subscribe(console.log);
// Salida: [3, 4], [7, 8], [11, 12]...
```

**Emitir eventos MouseEvent mientras esté pulsado el botón del mouse, hasta que dejemos de pulsarlo**

[StackBlitz](https://stackblitz.com/edit/rxjs-buffertoggle-2?file=index.ts)

```typescript
import { fromEvent } from "rxjs";
import { bufferToggle } from "rxjs/operators";

const mouse$ = fromEvent<MouseEvent>(document, "mousemove");

mouse$
  .pipe(
    bufferToggle(fromEvent(document, "mousedown"), (_) =>
      fromEvent(document, "mouseup")
    )
  )
  .subscribe(console.log);
// Salida: [MouseEvent, MouseEvent, MouseEvent, MouseEvent]...
```

### Ejemplo de la documentación oficial

**Cada dos segundos, emite los eventos click de los siguientes 500 milisegundos**

```javascript
import { fromEvent, interval, EMPTY } from "rxjs";
import { bufferToggle } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const openings = interval(1000);
const buffered = clicks.pipe(
  bufferToggle(openings, (i) => (i % 2 ? interval(500) : EMPTY))
);
buffered.subscribe((x) => console.log(x));
```

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/bufferToggle.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/operators/bufferToggle)
