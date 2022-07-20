---
description: >-
  Almacena los valores del Observable en un búfer hasta que este alcanza el
  tamaño máximo indicado
---

# bufferCount

<details>

<summary>Signatura</summary>

#### Firma

`bufferCount<T>(bufferSize: number, startBufferEvery: number = null): OperatorFunction<T, T[]>`

#### Parámetros

#### Retorna

`OperatorFunction<T, T[]>`: Un Observable de arrays de valores almacenados.

</details>

## Descripción

Almacena valores en un array, y emite dicho array cuando su tamaño sea el especificado por `bufferSize`.

![Diagrama de canicas del operador bufferCount](assets/images/marble-diagrams/transformation/bufferCount.png)

Almacena valores del Observable fuente y emite el búfer cuando este llega al tamaño de `bufferSize`, y abre un nuevo búfer cada `startBufferEvery` emisiones. Si no se proporciona `startBufferEvery` o su valor es `null`, entonces se abre un nuevo búfer inmediatamente después de que se cierre y se emita el búfer anterior.

## Ejemplos

**Almacenar cada 5 valores en un array y emitirlo**

[StackBlitz](https://stackblitz.com/edit/rxjs-buffercount-1?file=index.ts)

```javascript
import { bufferCount } from "rxjs/operators";
import { interval } from "rxjs";

const number$ = interval(1000);

number$.pipe(bufferCount(5)).subscribe(console.log);
// Output: [0, 1, 2, 3, 4], [5, 6, 7, 8, 9]...
```

### Ejemplos de la documentación oficial

**Emitir los últimos dos eventos click en un array**

```javascript
import { fromEvent } from "rxjs";
import { bufferCount } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const buffered = clicks.pipe(bufferCount(2));
buffered.subscribe((x) => console.log(x));
```

**En cada click, emitir los dos últimos eventos click en un array**

```javascript
import { fromEvent } from "rxjs";
import { bufferCount } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const buffered = clicks.pipe(bufferCount(2, 1));
buffered.subscribe((x) => console.log(x));
```

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/bufferCount.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/operators/bufferCount)
