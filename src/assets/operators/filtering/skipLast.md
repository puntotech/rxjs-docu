# skipLast

### Saltar las últimas x emisiones del Observable fuente

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

### Descripción

Se salta las últimas `count` emisiones del Observable fuente.

<img src="assets/images/marble-diagrams/filtering/skipLast.png" alt="Diagrama de canicas del operador skipLast">

`skipLast` retorna un Observable que acumula una cola de tamaño suficiente para almacenar los primeros `count` valores. Al recibirse más emisiones, se obtienen los valores del principio de la cola y se emiten en el Observable resultante. Esto hace que las emisiones se retrasen.

## Ejemplos

Saltar los últimos 5 números

[StackBlitz](https://stackblitz.com/edit/rxjs-skiplast-1?file=index.ts)

```javascript
import { skipLast } from "rxjs/operators";
import { range } from "rxjs";

const number$ = range(1, 10);

number$.pipe(skipLast(5)).subscribe(console.log);
// Salida: 1, 2, 3, 4, 5
```

Saltar el último valor

[StackBlitz](https://stackblitz.com/edit/rxjs-skiplast-2?file=index.ts)

```javascript
import { skipLast } from "rxjs/operators";
import { from } from "rxjs";

const pokemon$ = from([
  { name: "Bulbasaur", type: "Grass" },
  { name: "Charmander", type: "Fire" },
  { name: "Squirtle", type: "Water" },
]);

pokemon$.pipe(skipLast(1)).subscribe(console.log);
// Salida: { name: "Bulbasaur", type: "Grass" }, { name: "Charmander", type: "Fire" }
```

### Ejemplo de la documentación oficial

Saltar los 2 últimos valores de un Observable

```javascript
import { range } from "rxjs";
import { skipLast } from "rxjs/operators";

const many = range(1, 5);
const skipLastTwo = many.pipe(skipLast(2));
skipLastTwo.subscribe((x) => console.log(x));

// Salida:
// 1 2 3
```

- [Documentación oficial en inglés](https://rxjs-dev.firebaseapp.com/api/operators/skipLast)
- [Código fuente](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/skipLast.ts)
