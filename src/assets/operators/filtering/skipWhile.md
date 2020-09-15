# skipWhile

### Se salta las emisiones del Observable fuente hasta que una condición deje de cumplirse

### Firma

`skipWhile<T>(predicate: (value: T, index: number) => boolean): MonoTypeOperatorFunction<T>`

### Parámetros

<table>
<tr><td>predicate</td><td>Una función para comprobar cada elemento emitido por el Observable fuente.</td></tr>
</table>

### Retorna

`MonoTypeOperatorFunction<T>`: Un Observable que comienza a emitir las emisiones del Observable fuente cuando la condición especificada en la función `predicate` retorne `false`.

## Descripción

Retorna un Observable que se salta los elementos emitidos por el Observable fuente mientras la condición especificada retorne `true`, y que empieza a emitirlos en cuanto la condición deje de cumplirse.

<img src="assets/images/marble-diagrams/filtering/skipWhile.png" alt="Diagrama de canicas del operador skipWhile">

Advertencia: Una vez que la condición no se cumpla, no se volverá a revaluar. Esto quiere decir que si la condición comienza siendo falsa, aunque más adelante sí se cumpla, no tendrá ningún efecto. Este comportamiento se puede apreciar en el segundo ejemplo:

## Ejemplos

Saltar la secuencia de números mientras sean menores que 3

[StackBlitz](https://stackblitz.com/edit/rxjs-skipwhile-1?file=index.ts)

```javascript
import { skipWhile } from "rxjs/operators";
import { interval } from "rxjs";

const number$ = interval(1000);

number$.pipe(skipWhile((num) => num < 3)).subscribe(console.log);
// Salida: 3, 4, 5, 6, 7...
```

La condición no se cumple cuando el Observable comienza a emitir (los números emitidos no son mayores que 3), por lo que, aunque más adelante sí que se cumpla (cuando los números emitidos sean mayores que 3), ningún valor se saltará. Esto es debido a que la condición nunca vuelve a evaluarse tras devolver `false`.

[StackBlitz](https://stackblitz.com/edit/rxjs-skipwhile-2?file=index.ts)

```javascript
import { skipWhile } from "rxjs/operators";
import { interval } from "rxjs";

const number$ = interval(1000);

number$.pipe(skipWhile((num) => num > 3)).subscribe(console.log);
// Salida: 0, 1, 2, 3, 4, 5, 6, 7...
```

Saltar los objetos Pokémon que dejen de ser de tipo `Grass`

[StackBlitz](https://stackblitz.com/edit/rxjs-skipwhile-3?file=index.ts)

```javascript
import { skipWhile } from "rxjs/operators";
import { interval, from } from "rxjs";

const pokemon$ = from([
  { name: "Bulbasaur", type: "Grass" },
  { name: "Chikorita", type: "Grass" },
  { name: "Charmander", type: "Fire" },
  { name: "Treecko", type: "Grass" },
  { name: "Squirtle", type: "Water" },
]);

pokemon$.pipe(skipWhile(({ type }) => type === "Grass")).subscribe(console.log);
// Salida: { name: "Charmander", type: "Fire" }, { name: "Treecko", type: "Grass" }, { name: "Squirtle", type: "Water" }
```

- [Documentación oficial en inglés](https://rxjs-dev.firebaseapp.com/api/operators/skipWhile)
- [Código fuente](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/skipWhile.ts)
