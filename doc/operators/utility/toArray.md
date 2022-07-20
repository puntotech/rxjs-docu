---
description: >-
  Recoge todas las emisiones del Observable fuente y las emite en un array
  cuando este se complete
---

# toArray

<details>

<summary>Signatura</summary>

#### Firma

`toArray<T>(): OperatorFunction<T, T[]>`

#### Parámetros

No recibe ningún parámetro.

#### Retorna

`OperatorFunction<T, T[]>`: Un array formado a partir de la secuencia observable.

</details>

## Descripción

Emite todos los valores del Observable fuente en un array cuando este se completa.

![Diagrama de canicas del operador toArray](assets/images/marble-diagrams/utility/toArray.png)

toArray espera a que el Observable fuente se complete para emitir un array que contiene todas sus emisiones. Si el Observable fuente emite un error, no se emitirá ningún array.

## Ejemplos

**Emitir un array que contenga los números del 1 al 5**

StackBlitz

```javascript
import { toArray } from "rxjs/operators";
import { range } from "rxjs";

const number$ = range(1, 5);

number$.pipe(toArray()).subscribe(console.log);
// Salida: [ 1, 2, 3, 4, 5]
```

**Emitir un array que contenga las primeras 4 teclas pulsadas**

StackBlitz

```typescript
import { fromEvent } from "rxjs";
import { map, take, toArray } from "rxjs/operators";

const key$ = fromEvent<KeyboardEvent>(document, "keydown");

key$
  .pipe(
    take(4),
    map(({ code }) => code),
    toArray()
  )
  .subscribe(console.log);
// Salida: [ 'KeyR', 'KeyX', 'KeyJ', 'KeyS' ]
```

### Ejemplo de la documentación oficial

```javascript
import { interval } from "rxjs";
import { toArray, take } from "rxjs/operators";

const source = interval(1000);
const example = source.pipe(take(10), toArray());

const subscribe = example.subscribe((val) => console.log(val));

// Salida: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/timestamp.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/operators/toArray)
