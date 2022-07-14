# skipWhile

## Se salta las emisiones del Observable fuente hasta que una condición deje de cumplirse

<details>

<summary>Signatura</summary>

#### Firma

`skipWhile<T>(predicate: (value: T, index: number) => boolean): MonoTypeOperatorFunction<T>`

#### Parámetros

#### Retorna

`MonoTypeOperatorFunction<T>`: Un Observable que comienza a emitir las emisiones del Observable fuente cuando la condición especificada en la función `predicate` retorne `false`.

</details>

## Descripción

Retorna un Observable que se salta los elementos emitidos por el Observable fuente mientras la condición especificada retorne `true`, y que empieza a emitirlos en cuanto la condición deje de cumplirse.

![Diagrama de canicas del operador skipWhile](assets/images/marble-diagrams/filtering/skipWhile.png)

Advertencia: Una vez que la condición no se cumpla, no se volverá a revaluar. Esto quiere decir que si la condición comienza siendo falsa, aunque más adelante sí se cumpla, no tendrá ningún efecto. Este comportamiento se puede apreciar en el segundo ejemplo:

## Ejemplos

**Saltar la secuencia de números mientras sean menores que 3**

[StackBlitz](https://stackblitz.com/edit/rxjs-skipwhile-1?file=index.ts)

```javascript
import { skipWhile } from "rxjs/operators";
import { interval } from "rxjs";

const number$ = interval(1000);

number$.pipe(skipWhile((num) => num < 3)).subscribe(console.log);
// Salida: 3, 4, 5, 6, 7...
```

**Si la condición comienza siendo falsa, no se saltará ningún valor**

La condición no se cumple cuando el Observable comienza a emitir (los números emitidos no son mayores que 3), por lo que, aunque más adelante sí que se cumpla (cuando los números emitidos sean mayores que 3), no se saltará ningún valor. Esto es debido a que la condición nunca vuelve a evaluarse tras devolver `false`.

[StackBlitz](https://stackblitz.com/edit/rxjs-skipwhile-2?file=index.ts)

```javascript
import { skipWhile } from "rxjs/operators";
import { interval } from "rxjs";

const number$ = interval(1000);

number$.pipe(skipWhile((num) => num > 3)).subscribe(console.log);
// Salida: 0, 1, 2, 3, 4, 5, 6, 7...
```

**Saltar los lenguajes mientras sean de tipo Multiparadigma**

[StackBlitz](https://stackblitz.com/edit/rxjs-skipwhile-3?file=index.ts)

```javascript
import { skipWhile } from "rxjs/operators";
import { from } from "rxjs";

const language$ = from([
  { name: "Ruby", type: "Multiparadigma" },
  { name: "Rust", type: "Multiparadigma" },
  { name: "Java", type: "Orientado a objetos" },
  { name: "Scala", type: "Multiparadigma" },
  { name: "Haskell", type: "Funcional" },
]);

language$
  .pipe(skipWhile(({ type }) => type === "Multiparadigma"))
  .subscribe(console.log);
/* Salida:
  { name: "Java", type: "Orientado a objetos" },
  { name: "Scala", type: "Multiparadigma" },
  { name: "Haskell", type: "Funcional" },
*/
```

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/skipWhile.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/operators/skipWhile)
