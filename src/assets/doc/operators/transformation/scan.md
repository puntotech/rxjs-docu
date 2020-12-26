# scan

<h2 class="subtitle"> Aplica una función acumuladora a los valores del Observable fuente y retorna cada resultado inmediato</h2>

💡 Si solo se necesita emitir el valor acumulado una vez que el Observable se haya completado, se puede utilizar [reduce](/operators/mathematical-aggregate/reduce)

<details>
<summary>Signatura</summary>

### Firma

`scan<T, R>(accumulator: (acc: R, value: T, index: number) => R, seed?: T | R): OperatorFunction<T, R>`

### Parámetros

<table>
<tr><td>accumulator</td><td>La función de acumulación que se aplica a cada valor emitido.</td></tr>
<tr><td>seed</td><td>Opcional. El valor por defecto es <code>undefined</code>.
El valor de acumulación inicial.</td></tr>
</table>

### Retorna

`OperatorFunction<T, R>`: Un Observable de valores acumulados.

</details>

## Descripción

Es como `reduce`, pero emite el valor acumulado cada vez que la fuente emite un valor.

<img src="assets/images/marble-diagrams/transformation/scan.png" alt="Diagrama de canicas del operador scan">

Combina todos los valores emitidos por la fuente, mediante una función de acumulación. Es similar al operador `reduce`, pero emite cada valor acumulado.

Retorna un Observable que aplica una función de acumulación a cada elemento emitido por el Observable fuente. Si se proporciona un valor `seed`, ese valor se utilizará como el valor inicial del acumulador. Si no se proporciona ningún valor inicial, se utilizará el primer elemento emitido por la fuente en su lugar.

## Ejemplos

**Sumar una secuencia de números**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-scan-1?file=index.ts">StackBlitz</a>

```javascript
import { scan } from "rxjs/operators";
import { range } from "rxjs";

const number$ = range(1, 10);

number$.pipe(scan((acc, val) => acc + val)).subscribe(console.log);
// Salida: 1, 3, 6, 10, 15, 21, 28, 36, 45, 55
```

**Sumar una secuencia de números proporcionando un valor inicial**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-scan-2?file=index.ts">StackBlitz</a>

```javascript
import { scan } from "rxjs/operators";
import { range } from "rxjs";

const number$ = range(1, 10);

number$.pipe(scan((acc, val) => acc + val, 10)).subscribe(console.log);
// Salida: 11, 13, 16, 20, 25, 31, 38, 46, 55, 65
```

**Concatenar una secuencia de cadenas**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-scan-3?file=index.ts">StackBlitz</a>

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
<div class="overload-container">

<div class="overload-section">

### Firma

`scan(accumulator: (acc: R, value: T, index: number) => R, seed: R): OperatorFunction<T, R>`

### Parámetros

<table>
<tr><td>accumulator</td><td>Tipo: <code>(acc: R, value: T, index: number) => R</code>.</td></tr>
<tr><td>seed</td><td>Tipo: <code>R</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, R>`

</div>

<div class="overload-section">

### Firma

`scan(accumulator: (acc: T, value: T, index: number) => T, seed?: T): MonoTypeOperatorFunction<T>`

### Parámetros

<table>
<tr><td>accumulator</td><td>Tipo: <code>(acc: T, value: T, index: number) => T</code>.</td></tr>
<tr><td>seed</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>T</code>.</td></tr>
</table>

### Retorna

`MonoTypeOperatorFunction<T>`

</div>

<div class="overload-section">

### Firma

`scan(accumulator: (acc: R, value: T, index: number) => R): OperatorFunction<T, R>`

### Parámetros

<table>
<tr><td>accumulator</td><td>Tipo: <code>(acc: R, value: T, index: number) => R</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, R>`

</div>

</div>
</details>

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/scan.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/scan">Documentación oficial en inglés</a>
