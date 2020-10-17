<div class="page-heading">

# publishReplay

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/publishReplay.ts">
<svg>
  <use xlink:href="/assets/icons/github.svg#github"></use>
</svg>
</a>
</div>

<h2 class="subtitle">Comparte el Observable fuente, permitiendo que los observadores que se suscriban tarde puedan recibir los valores que se hayan emitido anteriormente</h2>

💡 publishReplay es equivalente a `multicast(() => new ReplaySubject())`

<details>
<summary>Signatura</summary>

### Firma

`publishReplay<T, R>(bufferSize?: number, windowTime?: number, selectorOrScheduler?: SchedulerLike | OperatorFunction<T, R>, scheduler?: SchedulerLike): UnaryFunction<Observable<T>, ConnectableObservable<R>>`

### Parámetros

<table>
<tr><td>bufferSize</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>number</code>.</td></tr>
<tr><td>windowTime</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>number</code>.</td></tr>
<tr><td>selectorOrScheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike | OperatorFunction</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`UnaryFunction<Observable<T>, ConnectableObservable<R>>`

</div>

</details>

## Descripción

Comparte el Observable fuente, permitiendo que los observadores que se suscriban tarde puedan recibir los valores que se hayan emitido anteriormente.

Retorna un ConnectableObservable, que es un Observable que espera a que se haga una llamada a su método `connect` antes de empezar a emitir valores a sus Observadores. En el caso de que no se llame a `connect`, el Observable fuente no emitirá ningún valor.

💡 Para evitar tener que llamar a connect manualmente, se puede utilizar el [operador refCount](/operators/multicasting/refCount).

## Ejemplos

**Compartir el Observable fuente**

Los observadores que se suscriban más tarde recibirán los valores emitidos anteriormente en el momento en el que se suscriban.

<a target="_blank" href="https://stackblitz.com/edit/docu-rxjs-publishreplay?file=index.ts">StackBlitz</a>

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

## Recursos adicionales

- <a target="_blank" href="https://rxjs.dev/api/operators/publishReplay">Documentación oficial en inglés</a>
