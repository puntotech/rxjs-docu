---
description: >-
  Aplica una función acumuladora a los valores del Observable fuente y retorna
  cada resultado inmediato
---

# scan

💡 Si solo se necesita emitir el valor acumulado una vez que el Observable se haya completado, se puede utilizar [reduce](../../../operators/mathematical-aggregate/reduce/)

<details>

<summary>Signatura</summary>

#### Firma

`scan<T, R>(accumulator: (acc: R, value: T, index: number) => R, seed?: T | R): OperatorFunction<T, R>`

#### Parámetros

#### Retorna

`OperatorFunction<T, R>`: Un Observable de valores acumulados.

</details>

## Descripción

Es como `reduce`, pero emite el valor acumulado cada vez que la fuente emite un valor.

![Diagrama de canicas del operador scan](assets/images/marble-diagrams/transformation/scan.png)

Combina todos los valores emitidos por la fuente, mediante una función de acumulación. Es similar al operador `reduce`, pero emite cada valor acumulado.

Retorna un Observable que aplica una función de acumulación a cada elemento emitido por el Observable fuente. Si se proporciona un valor `seed`, ese valor se utilizará como el valor inicial del acumulador. Si no se proporciona ningún valor inicial, se utilizará el primer elemento emitido por la fuente en su lugar.

## Ejemplos

**Sumar una secuencia de números**

[StackBlitz](https://stackblitz.com/edit/rxjs-scan-1?file=index.ts)

```javascript
import { scan } from "rxjs/operators";
import { range } from "rxjs";

const number$ = range(1, 10);

number$.pipe(scan((acc, val) => acc + val)).subscribe(console.log);
// Salida: 1, 3, 6, 10, 15, 21, 28, 36, 45, 55
```

**Sumar una secuencia de números proporcionando un valor inicial**

[StackBlitz](https://stackblitz.com/edit/rxjs-scan-2?file=index.ts)

```javascript
import { scan } from "rxjs/operators";
import { range } from "rxjs";

const number$ = range(1, 10);

number$.pipe(scan((acc, val) => acc + val, 10)).subscribe(console.log);
// Salida: 11, 13, 16, 20, 25, 31, 38, 46, 55, 65
```

**Concatenar una secuencia de cadenas**

[StackBlitz](https://stackblitz.com/edit/rxjs-scan-3?file=index.ts)

```javascript
import { scan } from "rxjs/operators";
import { from } from "rxjs";

const letter$ = from(["R", "x", "J", "S", " ", "m", "o", "l", "a"]);

letter$.pipe(scan((acc, val) => acc + val)).subscribe(console.log);
/*Salida: R
          Rx
          RxJ
          RxJS
          RxJS 
          RxJS m
          RxJS mo
          RxJS mol 
          RxJS mola
*/
```

### Ejemplo de la documentación oficial

**Contar el número de eventos click**

```javascript
import { fromEvent } from "rxjs";
import { scan, mapTo } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const ones = clicks.pipe(mapTo(1));
const seed = 0;
const count = ones.pipe(scan((acc, one) => acc + one, seed));
count.subscribe((x) => console.log(x));
```

<details>

<summary>Sobrecargas</summary>

#### Firma

`scan(accumulator: (acc: R, value: T, index: number) => R, seed: R): OperatorFunction<T, R>`

#### Parámetros

#### Retorna

`OperatorFunction<T, R>`

#### Firma

`scan(accumulator: (acc: T, value: T, index: number) => T, seed?: T): MonoTypeOperatorFunction<T>`

#### Parámetros

#### Retorna

`MonoTypeOperatorFunction<T>`

#### Firma

`scan(accumulator: (acc: R, value: T, index: number) => R): OperatorFunction<T, R>`

#### Parámetros

#### Retorna

`OperatorFunction<T, R>`

</details>

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/scan.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/operators/scan)
