---
description: >-
  Retorna un ConnectableObservable, que es un Observable que espera a que se
  haga una llamada a su método `connect` antes de empezar a emitir valores a sus
  Observadores
---

# publish

💡 publish es equivalente a `multicast(() => new Subject())`

<details>

<summary>Signatura</summary>

#### Firma

`publish<T, R>(selector?: OperatorFunction<T, R>): MonoTypeOperatorFunction<T> | OperatorFunction<T, R>`

#### Parámetros

#### Retorna

`MonoTypeOperatorFunction<T> | OperatorFunction<T, R>`: Un `ConnectableObservable` que, cuando se hace una llamada a su método `connect`, hace que el Observable fuente emita valores a sus Observadores.

</details>

## Descripción

Convierte un Observable frío en un Observable caliente, utilizando el operador [multicast](../../../operators/multicasting/multicast/) junto a un Sujeto internamente.

![Diagrama de canicas del operador publish](assets/images/marble-diagrams/multicasting/publish.png)

Retorna un ConnectableObservable, que es un Observable que espera a que se haga una llamada a su método `connect` antes de empezar a emitir valores a sus Observadores. En el caso de que no se llame a `connect`, el Observable fuente no emitirá ningún valor.

💡 Para evitar tener que llamar a connect manualmente, se puede utilizar el [operador refCount](../../../operators/multicasting/refCount/).

## Ejemplos

**Compartir el Observable fuente con publish**

[StackBlitz](https://stackblitz.com/edit/docu-rxjs-publish?file=index.ts)

```typescript
import { ConnectableObservable, interval, timer } from "rxjs";
import { publish, tap, take } from "rxjs/operators";

// number$ no empezará a emitir valores hasta que se haga una llamada a connect
const number$ = interval(1000).pipe(take(4));

const multicasted$ = number$.pipe(
  tap(() =>
    console.log("Fuente compartida, efecto secundario se ejecuta una sola vez")
  ),
  publish()
) as ConnectableObservable<number>;

// Llamando a connect tras 3 seconds
timer(3000)
  .pipe(tap(() => multicasted$.connect()))
  .subscribe();

multicasted$.subscribe((val) => console.log(`Observador 1: ${val}`));
multicasted$.subscribe((val) => console.log(`Observador 2: ${val}`));

/* Salida:
Fuente compartida, efecto secundario se ejecuta una sola vez,
Observador 1: 0,
Observador 2: 0,
(1s)
Fuente compartida, efecto secundario se ejecuta una sola vez,
Observador 1: 1,
Observador 2: 1,
...
*/
```

### Ejemplos de la documentación oficial

Convertir al Observable fuente en caliente, unir cada Observable interno en uno solo y suscribirse al Observable resultante

```javascript
import { of, zip, interval, merge } from "rxjs";
import { map, publish, tap } from "rxjs/operators";

const source$ = zip(interval(2000), of(1, 2, 3, 4, 5, 6, 7, 8, 9)).pipe(
  map((values) => values[1])
);

source$
  .pipe(
    publish((multicasted$) =>
      merge(
        multicasted$.pipe(tap((x) => console.log("Flujo 1:", x))),
        multicasted$.pipe(tap((x) => console.log("Flujo 2:", x))),
        multicasted$.pipe(tap((x) => console.log("Flujo 3:", x)))
      )
    )
  )
  .subscribe();

// Cada 2 segundos:
// 'Flujo 1: 1'
// 'Flujo 2: 1'
// 'Flujo 3: 1'
// ...
// 'Flujo 1: 9'
// 'Flujo 2: 9'
// 'Flujo 3: 9'
```

<details>

<summary>Sobrecargas</summary>

#### Firma

`publish(): UnaryFunction<Observable<T>, ConnectableObservable<T>>`

#### Parámetros

No recibe ningún parámetro.

#### Retorna

`UnaryFunction<Observable<T>, ConnectableObservable<T>>`

#### Firma

`publish(selector: (shared: Observable<T>) => O): OperatorFunction<T, ObservedValueOf<O>>`

#### Parámetros

#### Retorna

`OperatorFunction<T, ObservedValueOf<O>>`

#### Firma

`publish(selector: MonoTypeOperatorFunction<T>): MonoTypeOperatorFunction<T>`

#### Parámetros

#### Retorna

`MonoTypeOperatorFunction<T>`

</details>

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/publish.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/operators/publish)
