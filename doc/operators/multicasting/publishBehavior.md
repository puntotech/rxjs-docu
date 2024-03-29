---
description: Comparte el Observable fuente, permitiendo proporcionar un valor por defecto
---

# publishBehavior

💡 publishBehavior es equivalente a `multicast(() => new BehaviorSubject())`

<details>

<summary>Signatura</summary>

#### Firma

`publishBehavior<T>(value: T): UnaryFunction<Observable<T>, ConnectableObservable<T>>`

#### Parámetros

#### Retorna

`UnaryFunction<Observable<T>, ConnectableObservable<T>>`

</details>

## Descripción

Comparte el Observable fuente, permitiendo proporcionar un valor por defecto, ya que utiliza un BehaviorSubject internamente.

Retorna un ConnectableObservable, que es un Observable que espera a que se haga una llamada a su método `connect` antes de empezar a emitir valores a sus Observadores. En el caso de que no se llame a `connect`, el Observable fuente no emitirá ningún valor.

💡 Para evitar tener que llamar a connect manualmente, se puede utilizar el [operador refCount](../../../operators/multicasting/refCount/).

## Ejemplos

**Compartir el Observable fuente, proporcionando un valor inicial de -1**

[StackBlitz](https://stackblitz.com/edit/docu-rxjs-publish?file=index.ts)

```typescript
import { ConnectableObservable, interval, timer } from "rxjs";
import { publishBehavior, tap, take } from "rxjs/operators";

// number$ no empezará a emitir valores hasta que se haga una llamada a connect
const number$ = interval(1000).pipe(take(4));

const multicasted$ = number$.pipe(
  tap(() =>
    console.log("Fuente compartida, efecto secundario se ejecuta una sola vez")
  ),
  publishBehavior(-1)
) as ConnectableObservable<number>;

// Llamando a connect tras 3 segundos
timer(3000)
  .pipe(tap(() => multicasted$.connect()))
  .subscribe();

multicasted$.subscribe((val) => console.log(`Observador 1: ${val}`));
multicasted$.subscribe((val) => console.log(`Observador 2: ${val}`));

/* Salida:
Observador 1: -1, 
Observador 2: -1,
(3s)
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

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/publishBehavior.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/operators/publishBehavior)
