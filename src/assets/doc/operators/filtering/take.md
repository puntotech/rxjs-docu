# take

<h2 class="subtitle"> Emite las primeras x emisiones del Observable fuente
</h2>

<details>
<summary>Signatura</summary>

### Firma

`take<T>(count: number): MonoTypeOperatorFunction<T>`

### Parámetros

<table>
<tr><td>count</td><td>El máximo número de valores que se emitirán.</td></tr>
</table>

### Retorna

`MonoTypeOperatorFunction<T>`: Un Observable que emite o las primeras `count` emisiones del Observable fuente, o todas las emisiones si el Observable fuente emite menos de `count` valores.

### Lanza

`ArgumentOutOfRangeError` Cuando se usa `take(i)`, se lanza un Error `ArgumentOutOrRangeError` si `i < 0`.

</details>

## Descripción

Obtiene los primeros `count` valores de la fuente, y se completa.

<img src="assets/images/marble-diagrams/filtering/take.png" alt="Diagrama de canicas del operador take">

`take` retorna un Observable que emite únicamente los primeros `count` valores emitidos por el Observable fuente. Si la fuente emite menos de n valores, entonces se emiten todos los valores. Después, se completa el Observable, independientemente de si la fuente se completa o no.

## Ejemplos

**Emitir las primeras 5 teclas pulsadas**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-take-1?file=index.ts">StackBlitz</a>

```typescript
import { map, take } from "rxjs/operators";
import { fromEvent } from "rxjs";

const key$ = fromEvent<KeyboardEvent>(document, "keydown");

key$
  .pipe(
    map(({ code }) => code),
    take(5)
  )
  .subscribe(console.log);
// Salida: KeyR, KeyX, KeyJ, KeyS, Space
```

**Emitir los primeros 3 títulos de películas de Studio Ghibli**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-take-2?file=index.ts">StackBlitz</a>

```javascript
import { ajax } from "rxjs/ajax";
import { map, mergeAll, take } from "rxjs/operators";

const ghibliFilm$ = ajax.getJSON("https://ghibliapi.herokuapp.com/films").pipe(
  mergeAll(),
  map(({ title }) => title)
);

ghibliFilm$.pipe(take(5)).subscribe(console.log);
// Salida: Castle in the Sky, Grave of the Fireflies, My Neighbor Totoro
```

### Ejemplo de la documentación oficial

**Obtener los 5 primeros segundos de un Observable infinito de un intervalo de 1 segundo.**

```javascript
import { interval } from "rxjs";
import { take } from "rxjs/operators";

const intervalCount = interval(1000);
const takeFive = intervalCount.pipe(take(5));
takeFive.subscribe((x) => console.log(x));

// Salida: 0, 1, 2, 3, 4
```

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/take.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/take">Documentación oficial en inglés</a>
