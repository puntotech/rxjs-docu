# publishReplay

## Comparte el Observable fuente, permitiendo que los observadores que se suscriban tarde puedan recibir los valores que se hayan emitido anteriormente

💡 publishReplay es equivalente a `multicast(() => new ReplaySubject())`

<details>

<summary>Signatura</summary>

#### Firma

`publishReplay<T, R>(bufferSize?: number, windowTime?: number, selectorOrScheduler?: SchedulerLike | OperatorFunction<T, R>, scheduler?: SchedulerLike): UnaryFunction<Observable<T>, ConnectableObservable<R>>`

#### Parámetros

#### Retorna

`UnaryFunction<Observable<T>, ConnectableObservable<R>>`

</details>

## Descripción

Comparte el Observable fuente, permitiendo que los observadores que se suscriban tarde puedan recibir los valores que se hayan emitido anteriormente.

Retorna un ConnectableObservable, que es un Observable que espera a que se haga una llamada a su método `connect` antes de empezar a emitir valores a sus Observadores. En el caso de que no se llame a `connect`, el Observable fuente no emitirá ningún valor.

💡 Para evitar tener que llamar a connect manualmente, se puede utilizar el [operador refCount](../../../operators/multicasting/refCount/).

## Ejemplos

**Compartir el Observable fuente**

Los observadores que se suscriban más tarde recibirán los valores emitidos anteriormente en el momento en el que se suscriban.

[StackBlitz](https://stackblitz.com/edit/docu-rxjs-publishreplay?file=index.ts)

```javascript
import { ConnectableObservable, interval, Subject, timer } from "rxjs";
import { publishReplay, take, tap } from "rxjs/operators";

const number$ = interval(1000).pipe(take(4));

const multicasted$ = number$.pipe(
  tap(() =>
    console.log("Fuente compartida, efecto secundario se ejecuta una sola vez")
  ),
  publishReplay()
) as ConnectableObservable<number>;

multicasted$.connect();

multicasted$.subscribe(val => console.log(`Observador 1: ${val}`));

timer(3000)
  .pipe(
    tap(() =>
      multicasted$.subscribe(val => console.log(`Observador tardío: ${val}`))
    )
  )
  .subscribe();

/* Salida:
  Fuente compartida, efecto secundario se ejecuta una sola vez,
  Observador 1: 0,
  (1s)
  Fuente compartida, efecto secundario se ejecuta una sola vez,
  Observador 1: 1,
  (1s)
  Fuente compartida, efecto secundario se ejecuta una sola vez,
  Observador 1: 2,
  Observador tardío: 0,
  Observador tardío: 1,
  Observador tardío: 2,
  (1s)
  Fuente compartida, efecto secundario se ejecuta una sola vez,
  Observador 1: 3,
  Observador tardío: 3
*/
```

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/publishReplay.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/operators/publishReplay)
