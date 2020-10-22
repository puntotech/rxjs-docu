# toArray

<h2 class="subtitle">Recoge todas las emisiones del Observable fuente y las emite en un array cuando este se complete</h2>

<details>
<summary>Signatura</summary>

### Firma

`toArray<T>(): OperatorFunction<T, T[]>`

### Parámetros

No recibe ningún parámetro.

### Retorna

`OperatorFunction<T, T[]>`: Un array formado a partir de la secuencia observable.

</details>

## Descripción

Emite todos los valores del Observable fuente en un array cuando este se completa.

<img src="assets/images/marble-diagrams/utility/toArray.png" alt="Diagrama de canicas del operador toArray">

toArray espera a que el Observable fuente se complete para emitir un array que contiene todas sus emisiones. Si el Observable fuente emite un error, no se emitirá ningún array.

## Ejemplos

**Emitir un array que contenga los números del 1 al 5**

<a target="_blank" src="">StackBlitz</a>

```javascript
import { toArray } from "rxjs/operators";
import { range } from "rxjs";

const number$ = range(1, 5);

number$.pipe(toArray()).subscribe(console.log);
// Salida: [ 1, 2, 3, 4, 5]
```

**Emitir un array que contenga las primeras 4 teclas pulsadas**

<a target="_blank" src="https://stackblitz.com/edit/rxjs-toarray-2?file=index.ts">StackBlitz</a>

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

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/timestamp.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/toArray">Documentación oficial en inglés</a>
