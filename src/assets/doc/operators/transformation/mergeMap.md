# mergeMap

<h2 class="subtitle"> Proyecta cada valor emitido por la fuente a un Observable que se fusiona en el Observable resultante</h2>

💡 Se debe utilizar `mergeMap` si se quieren tener varios Observables internos suscritos de forma concurrente

<details>
<summary>Signatura</summary>

### Firma

`mergeMap<T, R, O extends ObservableInput<any>>(project: (value: T, index: number) => O, resultSelector?: number | ((outerValue: T, innerValue: ObservedValueOf<O>, outerIndex: number, innerIndex: number) => R), concurrent: number = Number.POSITIVE_INFINITY): OperatorFunction<T, ObservedValueOf<O> | R>`

### Parámetros

<table>
<tr><td>project</td><td>Una función que, al aplicarse a un elemento emitido por el Observable fuente, retorna un Observable.</td></tr>
<tr><td>resultSelector</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>number | ((outerValue: T, innerValue: ObservedValueOf, outerIndex: number, innerIndex: number) => R)</code>.</td></tr>
<tr><td>concurrent</td><td>Opcional. El valor por defecto es <code>Number.POSITIVE_INFINITY</code>.
El máximo número de Observables de entrada suscritos de forma concurrente.</td></tr>
</table>

### Retorna

`OperatorFunction<T, ObservedValueOf<O> | R>`: Un Observable que emite el resultado de aplicar la función de proyección ( y el ya obsoleto `resultSelector` opcional) a cada elemento emitido por el Observable fuente y fusionando los resultados de los Observables obtenidos a partir de esta transformación.

</details>

## Descripción

Proyecta cada valor a un Observable interno, y 'aplasta' cada uno de estos Observables internos mediante el operador `mergeAll`.

<img src="assets/images/marble-diagrams/transformation/mergeMap.png" alt="Diagrama de canicas del operador mergeMap">

Retorna un Observable que, después de aplicar una función a cada elemento emitido por el Observable fuente, donde dicha función retorna un Observable, fusiona los Observables internos resultantes y emite el resultado de la fusión.

## Ejemplos

Como mergeMap se suscribe a los Observables internos de forma concurrente, y se le ha añadido un retardo aleatorio a las peticiones AJAX, se puede observar que // TODO

<a target="_blank" href="https://stackblitz.com/edit/rxjs-mergemap-1?file=index.ts">StackBlitz</a>

```javascript
import { mergeMap, map, tap, delayWhen } from "rxjs/operators";
import { interval, of } from "rxjs";
import { ajax } from "rxjs/ajax";

function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 20;
}

const pokemonId$ = of(1, 4, 7);

function getPokemonName(id: number) {
  return ajax.getJSON(`https://pokeapi.co/api/v2/pokemon/${id}`).pipe(
    map(({ name, id }) => ({ name, id })),
    // Añadimos un retardo aleatorio a cada petición, para poder observar el efecto de mergeMap
    delayWhen((_) => interval(getRandomNumber() * 100))
  );
}

pokemonId$
  .pipe(
    tap((number) => console.log(`Obteniendo Pokémon con id: ${number}`)),
    mergeMap((number) => getPokemonName(number))
  )
  .subscribe(console.log);
/* Output: 
    Obteniendo Pokémon con id: 1, 
    Obteniendo Pokémon con id: 4, 
    Obteniendo Pokémon con id: 7,
    { name: "Squirtle", id: 7 },
    { name: "Bulbasaur", id: 1 },
    { name: "Charmander", id: 4 }
*/
```

### Ejemplo de la documentación oficial

**Proyectar y 'aplastar' cada letra a un Observable que emite cada segundo**

```javascript
import { of, interval } from "rxjs";
import { mergeMap, map } from "rxjs/operators";

const letters = of("a", "b", "c");
const result = letters.pipe(
  mergeMap((x) => interval(1000).pipe(map((i) => x + i)))
);
result.subscribe((x) => console.log(x));

// Salida:
// a0
// b0
// c0
// a1
// b1
// c1
// continúa listando a,b,c con un el número ascendiente que corresponda
```

<details>
<summary>Sobrecargas</summary>
<div class="overload-container">

<div class="overload-section">

### Firma

`mergeMap(project: (value: T, index: number) => O, concurrent?: number): OperatorFunction<T, ObservedValueOf<O>>`

### Parámetros

<table>
<tr><td>project</td><td>Tipo: <code>(value: T, index: number) => O</code>.</td></tr>
<tr><td>concurrent</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>number.</td></tr>
</table>

### Retorna

`OperatorFunction<T, ObservedValueOf<O>>`

</div>

<div class="overload-section">

### Firma

`mergeMap(project: (value: T, index: number) => O, resultSelector: undefined, concurrent?: number): OperatorFunction<T, ObservedValueOf<O>>`

### Parámetros

<table>
<tr><td>project</td><td>Tipo: <code>(value: T, index: number) => O</code>.</td></tr>
<tr><td>resultSelector</td><td>Tipo: <code>undefined.</td></tr>
<tr><td>concurrent</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>number.</td></tr>

</table>

### Retorna

`OperatorFunction<T, ObservedValueOf<O>>`

</div>

<div class="overload-section">

### Firma

`mergeMap(project: (value: T, index: number) => O, resultSelector: (outerValue: T, innerValue: ObservedValueOf<O>, outerIndex: number, innerIndex: number) => R, concurrent?: number): OperatorFunction<T, R>`

### Parámetros

<table>
<tr><td>project</td><td>Tipo: <code>(value: T, index: number) => O</code>.</td></tr>
<tr><td>resultSelector</td><td>Tipo: <code>(outerValue: T, innerValue: ObservedValueOf, outerIndex: number, innerIndex: number) => R.</td></tr>
<tr><td>concurrent</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>number.</td></tr>
</table>

### Retorna

`OperatorFunction<T, R>`

</div>

</div>
</details>

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/mergeMap.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/mergeMap">Documentación oficial en inglés</a>
