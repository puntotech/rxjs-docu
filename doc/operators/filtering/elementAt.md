---
description: >-
  Emite el valor que esté en la índice especificado en la secuencia de emisiones
  del Observable fuente
---

# elementAt

<details>

<summary>Signatura</summary>

#### Firma

`elementAt<T>(index: number, defaultValue?: T): MonoTypeOperatorFunction<T>`

#### Parámetros

#### Retorna

`MonoTypeOperatorFunction<T>`: Un Observable que emite un solo elemento, si lo encuentra. Si no, emite el valor por defecto en el caso de que se haya proporcionado uno. En caso contrario, se emite une error.

#### Lanza

`ArgumentOutOfRangeError` Al usar `elementAt(i)`, se lanza un `ArgumentOutOrRangeError` si `i < 0` o si el Observable se completa antes de emitir la i-ésima notificación.

</details>

## Descripción

Emite únicamente el valor i-ésimo, y se completa.

![Diagrama de canicas del operador elementAt](assets/images/marble-diagrams/filtering/elementAt.png)

`elementAt` retorna un Observable que emite el elemento en la posición indicada por el índice, o un valor por defecto si el índice proporcionado está fuera de rango y se proporciona dicho valor por defecto. En el caso de que no se proporcione, el Observable resultante emitirá un error `ArgumentOutOfRangeError`. s

## Ejemplos

**Emitir la segunda emisión del Observable fuente**

[StackBlitz](https://stackblitz.com/edit/rxjs-elementat-1?file=index.ts)

```javascript
import { of } from "rxjs";
import { elementAt } from "rxjs/operators";

const fruit$ = of("Cereza", "Fresa", "Arándano");

fruit$.pipe(elementAt(1)).subscribe(console.log);
// Salida: Fresa
```

**Si no se encuentra el índice y no se proporciona un valor por defecto, se lanza un error**

[StackBlitz](https://stackblitz.com/edit/rxjs-elementat-2?file=index.ts)

```javascript
import { of } from "rxjs";
import { elementAt } from "rxjs/operators";

const fruit$ = of("Cereza", "Fresa", "Arándano");

// Si no se encuentra el índice y no se proporciona un valor por defecto, se lanza un error
fruit$.pipe(elementAt(5)).subscribe(console.log, console.error);
// Salida: (error) Error: argument out of range
```

**Proporcionar un valor por defecto para que, si no se encuentra el índice especificado, no se lance un error**

[StackBlitz](https://stackblitz.com/edit/rxjs-elementat-3?file=index.ts)

```javascript
import { of } from "rxjs";
import { elementAt } from "rxjs/operators";

const defaultFruit = "Mora";

const fruit$ = of("Cereza", "Fresa", "Arándano");

// Proporcionar un valor por defecto para que, si no se encuentra el índice especificado, no se lance un error
fruit$.pipe(elementAt(5, defaultFruit)).subscribe(console.log, console.error);
// Salida: Mora
```

### Ejemplo de la documentación oficial

**Emitir solo el tercer evento click**

```javascript
import { fromEvent } from "rxjs";
import { elementAt } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const result = clicks.pipe(elementAt(2));
result.subscribe((x) => console.log(x));

// Salida:
// click 1 = nada
// click 2 = nada
// click 3 = objeto MouseEvent
```

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/elementAt.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/operators/elementAt)
