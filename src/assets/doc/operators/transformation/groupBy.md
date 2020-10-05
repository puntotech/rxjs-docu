<div class="page-heading">

# groupBy

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/groupBy.ts">
<svg>
  <use xlink:href="/assets/icons/github.svg#github"></use>
</svg>
</a>
</div>

<h2 class="subtitle">Agrupa los elementos emitidos por un Observable según un criterio especificado, y emite estas agrupaciones como GroupedObservables, con un GroupedObservable por cada grupo </h2>

<details>
<summary>Signatura</summary>

### Firma

`groupBy<T, K, R>(keySelector: (value: T) => K, elementSelector?: void | ((value: T) => R), durationSelector?: (grouped: GroupedObservable<K, R>) => Observable<any>, subjectSelector?: () => Subject<R>): OperatorFunction<T, GroupedObservable<K, R>>`

### Parámetros

<table>
<tr><td>keySelector</td><td>Una función que extrae la clave de cada elemento.</td></tr>
<tr><td>elementSelector</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Una función que extrae el elemento a retornar de cada elemento emitido.</td></tr>
<tr><td>durationSelector</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Una función que retorna un Observable que determina durante cuánto tiempo debe existir cada grupo.</td></tr>
<tr><td>subjectSelector</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>() => Subject</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, GroupedObservable<K, R>>`: Un Observable que emite `GroupedObservables`, cada uno de los cuales pertenece a un único valor clave. Cada grupo emite los elementos del Observable que comparten el mismo valor clave.

</details>

## Descripción

<img src="assets/images/marble-diagrams/transformation/groupBy.png" alt="Diagrama de canicas del operador groupBy">

Cuando el Observable emite un elemento, se computa una clave para dicho elemento mediante la función `keySelector`.

Si existe un GroupedObservable para la clave, el GroupedObservable emite.

If a GroupedObservable for this key exists, this GroupedObservable emits. Elsewhere, a new GroupedObservable for this key is created and emits.

Un GroupedObservable representa valores que pertenecen al mismo grupo, representado por una clave. La clave está disponible como el campo key de una instancia GroupedObservable.

Los elementos emitidos por GroupedObservables son, por defecto, los elementos emitidos por el Observable, o los elementos retornados por la función elementSelector.

## Ejemplos

**Agrupar Pokémon según su tipo, y emitir el GroupedObservable resultante en forma de array**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-groupby-1?file=index.ts">StackBlitz</a>

```javascript
import { groupBy, mergeMap, toArray } from "rxjs/operators";
import { from } from "rxjs";

const pokemon$ = from([
  { name: "Charmander", type: "Fire" },
  { name: "Squirtle", type: "Water" },
  { name: "Bulbasaur", type: "Grass" },
  { name: "Cyndaquil", type: "Fire" },
  { name: "Totodile", type: "Water" },
  { name: "Chikorita", type: "Grass" },
]);

pokemon$
  .pipe(
    groupBy(({ type }) => type),
    mergeMap((group$) => group$.pipe(toArray()))
  )
  .subscribe(console.log);
/* Salida: 
[{ name: "Charmander", type: "Fire" }, { name: "Cyndaquil", type: "Fire" }],
[{ name: "Squirtle", type: "Water" }, { name: "Totodile", type: "Water" }],
[{ name: "Bulbasaur", type: "Grass" }, { name: "Chikorita", type: "Grass" }]
*/
```

**Agrupar Pokémon según su tipo, seleccionar únicamente el nombre y emitir el GroupedObservable resultante en forma de array**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-groupby-2?file=index.ts">StackBlitz</a>

```javascript
import { groupBy, mergeMap, toArray } from "rxjs/operators";
import { from } from "rxjs";

const pokemon$ = from([
  { name: "Charmander", type: "Fire" },
  { name: "Squirtle", type: "Water" },
  { name: "Bulbasaur", type: "Grass" },
  { name: "Cyndaquil", type: "Fire" },
  { name: "Totodile", type: "Water" },
  { name: "Chikorita", type: "Grass" },
]);

pokemon$
  .pipe(
    groupBy(
      ({ type }) => type,
      ({ name }) => name
    ),
    mergeMap((group$) => group$.pipe(toArray()))
  )
  .subscribe(console.log);
/* Salida:
  ["Charmander", "Cyndaquil"],
  ["Squirtle", "Totodile"],,
  ["Bulbasaur", "Chikorita"]
   */
```

### Ejemplo de la documentación oficial

**Agrupar objetos por id y retornar las agrupaciones como arrays**

```javascript
import { of } from "rxjs";
import { mergeMap, groupBy, reduce } from "rxjs/operators";

of(
  { id: 1, name: "JavaScript" },
  { id: 2, name: "Parcel" },
  { id: 2, name: "webpack" },
  { id: 1, name: "TypeScript" },
  { id: 3, name: "TSLint" }
)
  .pipe(
    groupBy((p) => p.id),
    mergeMap((group$) => group$.pipe(reduce((acc, cur) => [...acc, cur], [])))
  )
  .subscribe((p) => console.log(p));

// Salida:
// [ { id: 1, name: 'JavaScript'},
//   { id: 1, name: 'TypeScript'} ]
//
// [ { id: 2, name: 'Parcel'},
//   { id: 2, name: 'webpack'} ]
//
// [ { id: 3, name: 'TSLint'} ]
```

**Pivotar los datos por el campo id**

```javascript
import { of } from "rxjs";
import { groupBy, map, mergeMap, reduce } from "rxjs/operators";

of(
  { id: 1, name: "JavaScript" },
  { id: 2, name: "Parcel" },
  { id: 2, name: "webpack" },
  { id: 1, name: "TypeScript" },
  { id: 3, name: "TSLint" }
)
  .pipe(
    groupBy(
      (p) => p.id,
      (p) => p.name
    ),
    mergeMap((group$) =>
      group$.pipe(reduce((acc, cur) => [...acc, cur], [`${group$.key}`]))
    ),
    map((arr) => ({ id: parseInt(arr[0], 10), values: arr.slice(1) }))
  )
  .subscribe((p) => console.log(p));

// Salida:
// { id: 1, values: [ 'JavaScript', 'TypeScript' ] }
// { id: 2, values: [ 'Parcel', 'webpack' ] }
// { id: 3, values: [ 'TSLint' ] }
```

<details>
<summary>Sobrecargas</summary>
<div class="overload-container">

<div class="overload-section">

### Firma

`groupBy(keySelector: (value: T) => K): OperatorFunction<T, GroupedObservable<K, T>>`

### Parámetros

<table>
<tr><td>keySelector</td><td>Tipo: <code>(value: T) => K</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, GroupedObservable<K, T>>`

</div>

<div class="overload-section">

### Firma

`groupBy(keySelector: (value: T) => K, elementSelector: void, durationSelector: (grouped: GroupedObservable<K, T>) => Observable<any>): OperatorFunction<T, GroupedObservable<K, T>>`

### Parámetros

<table>
<tr><td>keySelector</td><td>Tipo: <code>(value: T) => K</code>.</td></tr>
<tr><td>elementSelector</td><td>Tipo: <code>void</code>.</td></tr>
<tr><td>durationSelector</td><td>Tipo: <code>(grouped: GroupedObservable) => Observable</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, GroupedObservable<K, T>>`

</div>

<div class="overload-section">

### Firma

`groupBy(keySelector: (value: T) => K, elementSelector?: (value: T) => R, durationSelector?: (grouped: GroupedObservable<K, R>) => Observable<any>): OperatorFunction<T, GroupedObservable<K, R>>`

### Parámetros

<table>
<tr><td>keySelector</td><td>Tipo: <code>(value: T) => K</code>.</td></tr>
<tr><td>elementSelector</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>(value: T) => R</code>.</td></tr>
<tr><td>durationSelector</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>(grouped: GroupedObservable) => Observable</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, GroupedObservable<K, R>>`

</div>

<div class="overload-section">

### Firma

`groupBy(keySelector: (value: T) => K, elementSelector?: (value: T) => R, durationSelector?: (grouped: GroupedObservable<K, R>) => Observable<any>, subjectSelector?: () => Subject<R>): OperatorFunction<T, GroupedObservable<K, R>>`

### Parámetros

<table>
<tr><td>keySelector</td><td>Tipo: <code>(value: T) => K</code>.</td></tr>
<tr><td>elementSelector</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>(value: T) => R</code>.</td></tr>
<tr><td>durationSelector</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>(grouped: GroupedObservable) => Observable</code>.</td></tr>
<tr><td>subjectSelector</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>() => Subject</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, GroupedObservable<K, R>>`

</div>

</div>
</details>

## Recursos adicionales

- [Documentación oficial en inglés](https://rxjs-dev.firebaseapp.com/api/operators/groupBy)
