# skipLast

<h2 class="subtitle"> Saltar las últimas x emisiones del Observable fuente
</h2>

<details>
<summary>Signatura</summary>

### Firma

`skipLast<T>(count: number): MonoTypeOperatorFunction<T>`

### Parámetros

<table>
<tr><td>count</td><td>El número de elementos que saltarse del final del Observable fuente.</td></tr>
</table>

### Retornar

`MonoTypeOperatorFunction<T>`: Un Observable que se salta los últimos `count` valores emitidos por el Observable fuente.

### Lanza

`ArgumentOutOfRangeError` Al usar `skipLast(i)`, se lanza un error `ArgumentOutOrRangeError` si `i < 0`.

</details>

## Descripción

Se salta las últimas `count` emisiones del Observable fuente.

<img src="assets/images/marble-diagrams/filtering/skipLast.png" alt="Diagrama de canicas del operador skipLast">

`skipLast` retorna un Observable que acumula una cola de tamaño suficiente para almacenar los primeros `count` valores. Al recibirse más emisiones, se obtienen los valores del principio de la cola y se emiten en el Observable resultante. Esto hace que las emisiones se retrasen.

## Ejemplos

**Saltar los últimos 5 números**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-skiplast-1?file=index.ts">StackBlitz</a>

```javascript
import { skipLast } from "rxjs/operators";
import { range } from "rxjs";

const number$ = range(1, 10);

number$.pipe(skipLast(5)).subscribe(console.log);
// Salida: 1, 2, 3, 4, 5
```

**Saltar el último valor**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-skiplast-2?file=index.ts">StackBlitz</a>

```javascript
import { skipLast } from "rxjs/operators";
import { from } from "rxjs";

const language$ = from([
  { name: "Java", type: "Orientado a objetos" },
  { name: "Ruby", type: "Multiparadigma" },
  { name: "Haskell", type: "Funcional" },
]);

language$.pipe(skip(1)).subscribe(console.log);
// Salida: { name: "Ruby", type: "Multiparadigma" }, { name: "Haskell", type: "Funcional" }
```

### Ejemplo de la documentación oficial

**Saltar los 2 últimos valores de un Observable**

```javascript
import { range } from "rxjs";
import { skipLast } from "rxjs/operators";

const many = range(1, 5);
const skipLastTwo = many.pipe(skipLast(2));
skipLastTwo.subscribe((x) => console.log(x));

// Salida:
// 1 2 3
```

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/skipLast.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/skipLast">Documentación oficial en inglés</a>
