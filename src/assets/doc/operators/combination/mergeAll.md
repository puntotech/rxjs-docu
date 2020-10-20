# mergeAll

<h2 class="subtitle"> Convierte un Observable de orden superior en uno de primer orden que emite las emisiones de los Observables internos de forma concurrente
</h2>

<details>
<summary>Signatura</summary>

### Firma

`mergeAll<T>(concurrent: number = Number.POSITIVE_INFINITY): OperatorFunction<ObservableInput<T>, T>`

### Parámetros

<table>
<tr><td>concurrent</td><td>Opcional. El valor por defecto es <code>Number.POSITIVE_INFINITY</code>.
El máximo número de Observables internos suscritos concurrentemente.</td></tr>
</table>

### Retorna

`OperatorFunction<ObservableInput<T>, T>`: Un Observable que emite los valores de todos los Observables internos que emita el Observable fuente.

</details>

## Descripción

Convierte un Observable de orden superior en uno de primer orden.

<img src="assets/images/marble-diagrams/join-creation/mergeAll.png" alt="Diagrama de canicas del operador mergeAll">

`mergeAll` se suscribe a un Observable que emite Observables, también conocido como Observable de orden superior. Cada vez que observa la emisión de uno de los Observables internos, se suscribe a él y emite todos los valores del Observable interno en el Observable resultante. El Observable resultante se completa cuando todos los Observables internos se hayan completado.

Cualquier error que se produzca en uno de los Observables internos se emite de forma inmediata en el Observable resultante.

## Ejemplos

**Realizar todas las peticiones AJAX de forma concurrente (en paralelo)**

<a target="_blank" href="https://stackblitz.com/edit/docu-rxjs-mergeall?file=index.ts">StackBlitz</a>

```javascript
import { mergeAll, map, delay } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import { of } from "rxjs";

const pokemonId$ = of(1, 5, 6);

function getPokemonName(id: number) {
  return ajax.getJSON(`https://pokeapi.co/api/v2/pokemon/${id}`).pipe(
    map(({ name }) => name),
    delay(2000)
  );
}

pokemonId$
  .pipe(
    map((id) => getPokemonName(id)),
    mergeAll()
  )
  .subscribe(console.log);
// Salida: (2s) bulbasaur, charmeleon, charizard
```

**Realizar como mucho dos peticiones AJAX de forma concurrente**

<a target="_blank" href="https://stackblitz.com/edit/docu-rxjs-mergeall-2?file=index.ts">StackBlitz</a>

```javascript
import { mergeAll, map, delay } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import { of } from "rxjs";

const pokemonId$ = of(1, 5, 6);

function getPokemonName(id: number) {
  return ajax.getJSON(`https://pokeapi.co/api/v2/pokemon/${id}`).pipe(
    map(({ name }) => name),
    delay(2000)
  );
}

const maxConcurrent = 2;

pokemonId$
  .pipe(
    map((id) => getPokemonName(id)),
    mergeAll(maxConcurrent)
  )
  .subscribe(console.log);
// Salida: (2s) bulbasaur, charmeleon (2s) charizard
```

### Ejemplos de la documentación oficial

**Generar un Observable intervalo por cada evento click, y unir sus emisiones en un solo Observable**

```javascript
import { fromEvent, interval } from "rxjs";
import { map, mergeAll } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const higherOrder = clicks.pipe(map((ev) => interval(1000)));
const firstOrder = higherOrder.pipe(mergeAll());
firstOrder.subscribe((x) => console.log(x));
```

**Emitir los números del 0 al 9 a intervalos de un segundo por cada click, permitiendo únicamente 2 temporizadores concurrentes**

```javascript
import { fromEvent, interval } from "rxjs";
import { take, map, mergeAll } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const higherOrder = clicks.pipe(map((ev) => interval(1000).pipe(take(10))));
const firstOrder = higherOrder.pipe(mergeAll(2));
firstOrder.subscribe((x) => console.log(x));
```

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/mergeAll.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/mergeAll">Documentación oficial en inglés</a>
