---
description: >-
  Agrupa los elementos emitidos por un Observable según un criterio
  especificado, y emite estas agrupaciones como GroupedObservables, con un
  GroupedObservable por cada grupo
---

# groupBy

<details>

<summary>Signatura</summary>

#### Firma

`groupBy<T, K, R>(keySelector: (value: T) => K, elementSelector?: void | ((value: T) => R), durationSelector?: (grouped: GroupedObservable<K, R>) => Observable<any>, subjectSelector?: () => Subject<R>): OperatorFunction<T, GroupedObservable<K, R>>`

#### Parámetros

#### Retorna

`OperatorFunction<T, GroupedObservable<K, R>>`: Un Observable que emite `GroupedObservables`, cada uno de los cuales pertenece a un único valor clave. Cada grupo emite los elementos del Observable que comparten el mismo valor clave.

</details>

## Descripción

![Diagrama de canicas del operador groupBy](assets/images/marble-diagrams/transformation/groupBy.png)

Cuando el Observable emite un elemento, se computa una clave para dicho elemento mediante la función `keySelector`.

Si existe un GroupedObservable para dicha clave, el GroupedObservable emite. Si no existe, se crea un GroupedObservable para dicha clave y emite.

Un GroupedObservable representa valores que pertenecen al mismo grupo, representado por una clave. La clave está disponible como el campo key de una instancia GroupedObservable.

Los elementos emitidos por GroupedObservables son, por defecto, los elementos emitidos por el Observable, o los elementos retornados por la función elementSelector.

## Ejemplos

**Agrupar lenguajes de programación según su tipo, y emitir el GroupedObservable resultante en forma de array**

[StackBlitz](https://stackblitz.com/edit/rxjs-groupby-1?file=index.ts)

```javascript
import { groupBy, mergeMap, toArray } from "rxjs/operators";
import { from } from "rxjs";

const language$ = from([
  { name: "Rust", type: "Multiparadigma" },
  { name: "Java", type: "Orientado a objetos" },
  { name: "Scala", type: "Multiparadigma" },
  { name: "Simula", type: "Orientado a objetos" },
  { name: "Haskell", type: "Funcional" },
]);

language$
  .pipe(
    groupBy(({ type }) => type),
    mergeMap((group$) => group$.pipe(toArray()))
  )
  .subscribe(console.log);
/* Salida: 
[{ name: "Rust", type: "Multiparadigma" }, { name: "Scala", type: "Multiparadigma" }],
[{ name: "Java", type: "Orientado a objetos" }, { name: "Simula", type: "Orientado a objetos" }],
[{ name: "Haskell", type: "Funcional" }]
*/
```

**Agrupar lenguajes de programación según su tipo, seleccionar únicamente el nombre y emitir el GroupedObservable resultante en forma de array**

[StackBlitz](https://stackblitz.com/edit/rxjs-groupby-2?file=index.ts)

```javascript
import { groupBy, mergeMap, toArray } from "rxjs/operators";
import { from } from "rxjs";

const language$ = from([
  { name: "Rust", type: "Multiparadigma" },
  { name: "Java", type: "Orientado a objetos" },
  { name: "Scala", type: "Multiparadigma" },
  { name: "Simula", type: "Orientado a objetos" },
  { name: "Haskell", type: "Funcional" },
]);

language$
  .pipe(
    groupBy(
      ({ type }) => type,
      ({ name }) => name
    ),
    mergeMap((group$) => group$.pipe(toArray()))
  )
  .subscribe(console.log);
/* Salida:
  ["Rust", "Scala"],
  ["Java", "Simula"],,
  ["Haskell"]
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

#### Firma

`groupBy(keySelector: (value: T) => K): OperatorFunction<T, GroupedObservable<K, T>>`

#### Parámetros

#### Retorna

`OperatorFunction<T, GroupedObservable<K, T>>`

#### Firma

`groupBy(keySelector: (value: T) => K, elementSelector: void, durationSelector: (grouped: GroupedObservable<K, T>) => Observable<any>): OperatorFunction<T, GroupedObservable<K, T>>`

#### Parámetros

#### Retorna

`OperatorFunction<T, GroupedObservable<K, T>>`

#### Firma

`groupBy(keySelector: (value: T) => K, elementSelector?: (value: T) => R, durationSelector?: (grouped: GroupedObservable<K, R>) => Observable<any>): OperatorFunction<T, GroupedObservable<K, R>>`

#### Parámetros

#### Retorna

`OperatorFunction<T, GroupedObservable<K, R>>`

#### Firma

`groupBy(keySelector: (value: T) => K, elementSelector?: (value: T) => R, durationSelector?: (grouped: GroupedObservable<K, R>) => Observable<any>, subjectSelector?: () => Subject<R>): OperatorFunction<T, GroupedObservable<K, R>>`

#### Parámetros

#### Retorna

`OperatorFunction<T, GroupedObservable<K, R>>`

</details>

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/groupBy.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/operators/groupBy)
