<div class="page-heading">

# refCount

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/refCount.ts">
<svg>
  <use xlink:href="/assets/icons/github.svg#github"></use>
</svg>
</a>
</div>

<h2 class="subtitle"> Hace que un ConnectableObservable se comporte como un Obesrvable normal, y automatiza la forma de conectarse a él</h2>

💡 Utilizar el operador <a href="/operators/multicasting/share">share</a> es equivalente a utilizar el operador <a href="/operators/multicasting/publish">publish</a> (convirtiendo el Observable en uno caliente) junto al operador refCount.

<details>
<summary>Signatura</summary>

### Firma

`refCount<T>(): MonoTypeOperatorFunction<T>`

### Parámetros

No recibe ningún parámetro.

## Retorna

`MonoTypeOperatorFunction<T>`

</details>

## Descripción

Al utilizar alguna de las variantes del operador <a href="/operators/multicasting/publish">publish</a>, o el operador <a href="/operators/multicasting/multicast">multicast</a>, era necesario llamar manualmente al método connect() para suscribirse a la fuente y, posteriormente, gestionar la cancelación de la suscripción para evitar posibles pérdidas de memoria.

Para que automatizar el proceso y evitar errores, se creó el operador refCount, que hace ambas cosas automáticamente.

<img src="/assets/images/marble-diagrams/multicasting/refCount.png" alt="Diagrama de canicas del operador refCount">

Internamente, cuenta las suscripciones al Observable y se suscribe (una sola vez) a la fuente si el número de suscripciones es mayor que 0. Si el número de suscripciones es menor que 1, se cancela la suscripción a la fuente. De esta manera se puede garantizar que cualquier operador anterior a `refCount` se ejecuta una única vez por cada evento, independientemente del número de suscripciones al Observable objetivo.

## Ejemplos

**Compartir el Observable fuente de forma automática con multicast + refCount**

<a target="_blank" href="https://stackblitz.com/edit/docu-rxjs-refcount-multicast?file=index.ts">StackBlitz</a>

```javascript
import { interval, Subject, timer } from "rxjs";
import { take, takeUntil, tap, multicast, refCount } from "rxjs/operators";

const number$ = interval(1000).pipe(take(10));

// En lugar de cancelar la suscripción manualmente, se va a utilizar la técnica takeUntil + Subject
const stop$ = new Subject();

const multicasted$ = number$.pipe(
  tap(() =>
    console.log("Fuente compartida, efecto secundario se ejecuta una sola vez")
  ),
  multicast(() => new Subject()),
  // Al usar refCount, ya no es necesario llamar a connect() manualmente
  refCount(),
  takeUntil(stop$)
);

// refCount === 1, se hace la suscripción a number$
multicasted$.subscribe((val) => console.log(`Observador 1: ${val}`));
// refCount === 2
multicasted$.subscribe((val) => console.log(`Observador 2: ${val}`));

// refCount === 0, se cancela la suscripción a number$
timer(2000)
  .pipe(
    tap(() => stop$.next()),
    tap(() => console.log("Fin"))
  )
  .subscribe();

/* Salida:
  Fuente compartida, efecto secundario se ejecuta una sola vez,
  Observador 1: 0,
  Observador 2: 0,
  (1s)
  Fuente compartida, efecto secundario se ejecuta una sola vez,
  Observador 1: 1,
  Observador 2: 1,
  (1s) 
  Fin
 */
```

**Compartir el Observable fuente de forma automática con publish + refCount**

💡 El operador publish es equivalente a `multicast(() => new Subject())`

<a target="_blank" href="">StackBlitz</a>

```javascript
import { interval, Subject, timer } from "rxjs";
import { take, takeUntil, tap, multicast, refCount } from "rxjs/operators";

const number$ = interval(1000).pipe(take(10));

// En lugar de cancelar la suscripción manualmente, se va a utilizar la técnica takeUntil + Subject
const stop$ = new Subject();

const multicasted$ = number$.pipe(
  tap(() =>
    console.log("Fuente compartida, efecto secundario se ejecuta una sola vez")
  ),
  multicast(() => new Subject()),
  // Al usar refCount, ya no es necesario llamar a connect() manualmente
  refCount(),
  takeUntil(stop$)
);

// refCount === 1, se hace la suscripción a number$
multicasted$.subscribe((val) => console.log(`Observador 1: ${val}`));
// refCount === 2
multicasted$.subscribe((val) => console.log(`Observador 2: ${val}`));

// refCount === 0, se cancela la suscripción a number$
timer(2000)
  .pipe(
    tap(() => stop$.next()),
    tap(() => console.log("Fin"))
  )
  .subscribe();

/* Salida:
  Fuente compartida, efecto secundario se ejecuta una sola vez,
  Observador 1: 0,
  Observador 2: 0,
  (1s)
  Fuente compartida, efecto secundario se ejecuta una sola vez,
  Observador 1: 1,
  Observador 2: 1,
  (1s) 
  Fin
 */
```

**Compartir el Observable fuente de forma automática con publishReplay + refCount**

💡 El operador publish es equivalente a `multicast(() => new ReplaySubject())`.

Para que los observadores que se suscriban tarde puedan recibir los valores que se hayan emitido anterioremente, se puede utilizar publishReplay:

<a target="_blank" href="https://stackblitz.com/edit/docu-rxjs-refcount-publishreplay?file=index.ts">StackBlitz</a>

```javascript
import { interval, Subject, timer } from "rxjs";
import { publishReplay, take, takeUntil, tap, refCount } from "rxjs/operators";

const number$ = interval(1000).pipe(take(10));

const stop$ = new Subject();

const multicasted$ = number$.pipe(
  tap(() =>
    console.log("Fuente compartida, efecto secundario se ejecuta una sola vez")
  ),
  publishReplay(),
  refCount(),
  takeUntil(stop$)
);

// refCount === 1, se hace la suscripción a number$
multicasted$.subscribe((val) => console.log(`Observador 1: ${val}`));

// refCount === 2
timer(3000)
  .pipe(
    tap(() =>
      multicasted$.subscribe((val) => console.log(`Observador tardío: ${val}`))
    )
  )
  .subscribe();

// refCount === 0, se cancela la suscripción a number$
timer(4000)
  .pipe(
    tap(() => stop$.next()),
    tap(() => console.log("Fin"))
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
  Observador tardío: 3,
  Fin
*/
```

### Ejemplo de la documentación oficial

En el siguiente ejemplo hay dos Observables intervalo transformados en Observables conectables mediante el operador `publish`. El primero utiliza el operador `refCount`, mientras que el segundo no.
Se debe tener en cuenta que un Observable conectable no hace nada hasta que no se haga una llamada a su función `connect`.

```javascript
import { interval } from "rxjs";
import { tap, publish, refCount } from "rxjs/operators";

// Transformar el Observable interval en un ConnectableObservable (caliente)
const refCountInterval = interval(400).pipe(
  tap((num) => console.log(`refCount ${num}`)),
  publish(),
  refCount()
);

const publishedInterval = interval(400).pipe(
  tap((num) => console.log(`publish ${num}`)),
  publish()
);

refCountInterval.subscribe();
refCountInterval.subscribe();
/* 'refCount 0' -----> 'refCount 1' -----> etc.
 Todas las subscripciones recibirán el mismo valor y tanto tap como cualquier otro operador
 que esté antes del operador publish se ejecutará una vez por cada evento, independientemente del número de suscripciones
*/

publishedInterval.subscribe();
// No ocurre nada hasta que no se llame a la función connect() del Observable
```

## Recursos adicionales -

- <a target="_blank" href="https://rxjs.dev/api/operators/refCount">Documentación oficial en inglés</a>
