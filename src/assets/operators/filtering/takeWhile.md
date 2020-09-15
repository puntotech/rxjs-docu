# takeWhile

### Emite las emisiones del Observable fuente siempre y hasta cuando cumplan la condición especificada. Se completa en cuanto haya un valor que no cumpla la condición

### Firma

`takeWhile<T>(predicate: (value: T, index: number) => boolean, inclusive: boolean = false): MonoTypeOperatorFunction<T>`

### Parámetros

<table>
<tr><td>predicate</td><td>Una función que evalúa cada valor emitido por el Observable fuente y retorna un booleano. Recibe un índice (de base cero) como segundo argumento.</td></tr>
<tr><td>inclusive</td><td>Opcional. El valor por defecto es <code>false</code>.
Cuando valga <code>true</code>, el primer valor que incumpla la condición también se emitirá.</td></tr>
</table>

### Retorna

`MonoTypeOperatorFunction<T>`: Un Observable que emite los valores del Observable fuente siempre y cuando cada valor cumpla la condición especificada.

## Descripción

Emite los valores del Observable fuente mientras cumplan la condición especificada. En cuanto un valor no la cumpla, se completa.

<img src="assets/images/marble-diagrams/filtering/takeWhile.png" alt="Diagrama de canicas del operador takeWhile">

`takeWhile` se suscribe al Observable fuente y comienza a reflejarlo. Cada valor que se emita en la fuente, se proporciona a la función `predicate`, que retorna un valor booleano. Este valor indica si el valor cumple o no la condición especificada. El Observable resultante emite los valores del Observable fuente hasta que la condición deje de cumplirse. En ese momento, `takeWhile` deja de emitir los valores del Observable fuente y hace que el Observable resultante se complete.

## Ejemplos

Emitir números mientras sean menores que 10

[StackBlitz](https://stackblitz.com/edit/rxjs-takewhile-1?file=index.ts)

```javascript
import { takeWhile } from "rxjs/operators";
import { interval } from "rxjs";

const number$ = interval(1000);

number$
  .pipe(takeWhile((number) => number < 10))
  .subscribe(console.log, console.error, () => console.log("Completado"));
// Salida: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, Completado
```

Emitir las teclas pulsadas mientras no se pulse la tecla x

[StackBlitz](https://stackblitz.com/edit/rxjs-takewhile-2?file=index.ts)

```typescript
import { map, takeWhile } from "rxjs/operators";
import { fromEvent } from "rxjs";

const key$ = fromEvent<KeyboardEvent>(document, "keydown");

key$
  .pipe(
    takeWhile(({ code }) => code !== "KeyX"),
    map(({ code }) => code)
  )
  .subscribe(console.log, console.error, () => console.log("Completado"));
// Salida: KeyP, KeyC, KeyM (Pulsar KeyX), Completado
```

Emitir objetos Pokémon mientras sean de tipo `Grass`

[StackBlitz](https://stackblitz.com/edit/rxjs-takewhile-3?file=index.ts)

```javascript
import { from } from "rxjs";
import { takeWhile } from "rxjs/operators";

const pokemon$ = from([
  { name: "Bulbasaur", type: "Grass" },
  { name: "Chikorita", type: "Grass" },
  { name: "Charmander", type: "Fire" },
  { name: "Treecko", type: "Grass" },
  { name: "Squirtle", type: "Water" },
]);

pokemon$.pipe(takeWhile(({ type }) => type === "Grass")).subscribe(console.log);
// Salida: { name: "Bulbasaur", type: "Grass" }, { name: "Chikorita", type: "Grass" }
```

Si se proporciona el valor `true` como segundo argumento (parámetro `inclusive`), el primer elemento que no cumpla la condición también se emite

[StackBlitz](https://stackblitz.com/edit/rxjs-takewhile-4?file=index.ts)

```javascript
import { from } from "rxjs";
import { takeWhile } from "rxjs/operators";

const pokemon$ = from([
  { name: "Bulbasaur", type: "Grass" },
  { name: "Chikorita", type: "Grass" },
  { name: "Charmander", type: "Fire" },
  { name: "Treecko", type: "Grass" },
  { name: "Squirtle", type: "Water" },
]);

pokemon$
  .pipe(takeWhile(({ type }) => type === "Grass", true))
  .subscribe(console.log);
// Salida: { name: "Bulbasaur", type: "Grass" }, { name: "Chikorita", type: "Grass" }, { name: "Charmander", type: "Fire" }
```

### Ejemplo de la documentación oficial

Emite los eventos click mientras su propiedad `clientX` sea mayor a 200

```javascript
import { fromEvent } from "rxjs";
import { takeWhile } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const result = clicks.pipe(takeWhile((ev) => ev.clientX > 200));
result.subscribe((x) => console.log(x));
```

## Sobrecargas

`takeWhile(predicate: (value: T, index: number) => value is S): OperatorFunction<T, S>`

### Parámetros

<table>
<tr><td>predicate</td><td>Tipo: <code>(value: T, index: number) => value is S</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, S>`

`takeWhile(predicate: (value: T, index: number) => value is S, inclusive: false): OperatorFunction<T, S>`

### Parámetros

<table>
<tr><td>predicate</td><td>Tipo: <code>(value: T, index: number) => value is S</code>.</td></tr>
<tr><td>inclusive</td><td>Tipo: <code>false</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, S>`

`takeWhile(predicate: (value: T, index: number) => boolean, inclusive?: boolean): MonoTypeOperatorFunction<T>`

### Parámetros

<table>
<tr><td>predicate</td><td>Tipo: <code>(value: T, index: number) => boolean</code>.</td></tr>
<tr><td>inclusive</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>boolean</code>.</td></tr>
</table>

### Retorna

`MonoTypeOperatorFunction<T>`

- [Documentación oficial en inglés](https://rxjs-dev.firebaseapp.com/api/operators/takeWhile)
- [Código fuente](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/takeWhile.ts)