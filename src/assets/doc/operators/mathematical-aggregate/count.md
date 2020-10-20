# count

<h2 class="subtitle"> Cuenta el número de emisiones de la fuente y emite el resultado cuando la fuente se completa
</h2>

<details>
<summary>Signatura</summary>

### Firma

`count<T>(predicate?: (value: T, index: number, source: Observable<T>) => boolean): OperatorFunction<T, number>`

### Parámetros

<table>
<tr><td>predicate</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Una función booleana para seleccionar qué valores se cuenta. Consta de los siguiente argumentos:

    value: el valor del Observable fuente.
    index: el 'índice' (de base cero) del valor del Observable fuente.
    source: la instancia del Observable fuente.

</td></tr>
</table>

### Retorna

`OperatorFunction<T, number>`: Un Observable de un solo valor que representa el número de elementos contados.

</details>

## Descripción

Indica cuántos valores se han emitido cuando la fuente se completa.

<img src="assets/images/marble-diagrams/mathematical-aggregate/count.png" alt="Diagrma de cancias del operador count">

`count` transforma un Observable que emite valores en un Observable que emite un solo valor que representa el número de valores emitidos por el Observable fuente. Si el Observable fuente finaliza con un error, `count` enviará la notificación de error sin emitir un valor. Si el Observable fuente no llega a finalizar en ningún momento, `count` no emitirá ningún valor ni finalizará.

Este operador recibe una función opcional `predicate` como argumento, en cuyo caso la emisión representará el número de emisiones que cumplan la función booleana.

## Ejemplos

**Contar el número de emisiones**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-count-1?file=index.ts">StackBlitz</a>

```javascript
import { range } from "rxjs";
import { count } from "rxjs/operators";

const number$ = range(1, 4);

// Contar el número de emisiones
number$.pipe(count()).subscribe(console.log);
// Salida: 4
```

**Contar el número de teclas pulsadas en 5 segundos**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-count-2?file=index.ts">StackBlitz</a>

```typescript
import { fromEvent, interval } from "rxjs";
import { count, takeUntil } from "rxjs/operators";

const key$ = fromEvent<KeyboardEvent>(document, "keydown").pipe(
  takeUntil(interval(5000))
);

key$.pipe(count()).subscribe(console.log);
// Salida: (pulsar 5 teclas) 5
```

**Si la fuente no finaliza, count nunca emitirá ni se completará**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-count-3?file=index.ts">StackBlitz</a>

```javascript
const infiniteNumber$ = interval(1000);

infiniteNumber$.pipe(count()).subscribe(console.log);
// Salida:
```

**Contar las peticiones realizadas con éxito**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-count-4?file=index.ts">StackBlitz</a>

```javascript
import { of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { concatMap, count } from "rxjs/operators";

const pokemonId$ = of(1, 5, 3);

function getPokemon(id: number) {
  return ajax(`https://pokeapi.co/api/v2/pokemon/${id}`);
}

// Contar las peticiones realizadas con éxito
pokemonId$
  .pipe(
    concatMap((id) => getPokemon(id)),
    count(({ status }) => status === 200)
  )
  .subscribe(console.log);
// Salida: 3
```

**Si ocurre un error, `count` no emitirá nada**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-count-5?file=index.ts">StackBlitz</a>

```javascript
import { of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { concatMap, count } from "rxjs/operators";

// Al no existir el Pokémon con id -3, hacer la petición provocará un error
const pokemonId$ = of(1, 5, -3);

function getPokemon(id: number) {
  return ajax(`https://pokeapi.co/api/v2/pokemon/${id}`);
}

pokemonId$
  .pipe(
    concatMap((id) => getPokemon(id)),
    count(({ status }) => status === 200)
  )
  .subscribe(console.log, console.error);
// Salida:
```

**Gestionar el error para que count cuente el número de peticiones realizadas con éxito**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-count-6?file=index.ts">StackBlitz</a>

```javascript
import { of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { catchError, concatMap, count } from "rxjs/operators";

// Al no existir el Pokémon con id -3, hacer la petición provocará un error
const pokemonId$ = of(1, 5, -3);

function getPokemon(id: number) {
  return ajax(`https://pokeapi.co/api/v2/pokemon/${id}`).pipe(
    catchError((err) => of(err))
  );
}

pokemonId$
  .pipe(
    concatMap((id) => getPokemon(id)),
    count(({ status }) => status === 200)
  )
  .subscribe(console.log, console.error);
// Salida: 2
```

### Ejemplos de la documentación oficial

**Contar cuántos segundos pasan desde el primer click**

```javascript
import { fromEvent, interval } from "rxjs";
import { count, takeUntil } from "rxjs/operators";

const seconds = interval(1000);
const clicks = fromEvent(document, "click");
const secondsBeforeClick = seconds.pipe(takeUntil(clicks));
const result = secondsBeforeClick.pipe(count());
result.subscribe((x) => console.log(x));
```

**Contar cuántos números impares hay entre 1 y 7**

```javascript
import { range } from "rxjs";
import { count } from "rxjs/operators";

const numbers = range(1, 7);
const result = numbers.pipe(count((i) => i % 2 === 1));
result.subscribe((x) => console.log(x));
// Resulta en:
// 4
```

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/count.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/count">Documentación oficial en inglés</a>
