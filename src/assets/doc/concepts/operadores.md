Aunque los Observables son sus cimientos, RxJS es mayormente útil debido a sus Operadores. Los Operadores son las piezas esenciales que permiten la composición de código complejo y asíncrono, de manera declarativa.

# Qué son los Operadores

Los Operadores son funciones. Hay dos tipos de operadores:

Los Operadores _Pipeables_ se pueden utilizar mediante la sintaxis `observableInstance.pipe(operator())`. Entre ellos se incluyen **filter(...)** y **mergeMap(...)**. Cuando son llamados, _no modifican_ la instancia del Observable existente. En su lugar, devuelven un Observable nuevo, cuya lógica de suscripción está basada en la del primer Observable.

> Un Operador _Pipeable_ es una función que recibe un Observable y devuelve otro Observable. Es una operación pura: el Observable anterior no se modifica.

Un Operador _Pipeable_ es esencialmente una función pura que recibe un Observable como _input_ y genera otro Observable como _output_. Una suscripción al Observable de salida supone también una suscripción al Observable de entrada.

El otro tipo de operador son los Operadores de Creación, que pueden llamarse como si fuesen funciones independientes para crear un nuevo Observable. Por ejemplo: `of(1, 2, 3)` crea un Observable que emitirá los valores `1`, `2` y `3`, de forma consecutiva. Entraremos en más detalle sobre de los Operadores de Creación en una sección posterior.

Por ejemplo, el operador `map` es análogo al método de Array que lleva el mismo nombre. Al igual que `[1, 2, 3].map(x => x \* x)` produce `[1, 4, 9]`, el Observable creado así:

```javascript
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

map(x => x \* x)(of(1, 2, 3)).subscribe((v) => console.log(`valor: ${v}`));

// Logs:
// valor: 1
// valor: 4
// valor: 9
```

Emitirá `1`, `4`, `9`. Otro operador bastante útil es **first**:

```javascript
import { of } from "rxjs";
import { first } from "rxjs/operators";

first()(of(1, 2, 3)).subscribe(v => console.log(`valor: ${v}`));

// Logs:
// valor: 1
```

Hay que tener en cuenta que `map` tiene que ser construido en el momento, ya que tiene que recibir la función de mapeo. Por el contrario, `first` podría ser una constante, aunque se construye en el momento igualmente. Como norma general, todos los operadores se construyen, independientemente de que necesiten recibir argumentos o no.

# Piping

Los Operadores _Pipeable_ son funciones, por lo que pueden utilizarse como funciones normales:`op()(obs)`. Sin embargo, en la práctica, tienden a utilizarse muchos operadores al mismo tiempo, por lo que hacer esto hará que nuestro código sea ilegible: `op4()(op3()(op2()(op1()(obs))))`. Por esta razón, los Observables tienen un método llamado `.pipe()` que cumple esta misma función, de una forma mucho más legible:

```javascript
obs.pipe(op1(), op2(), op3(), op3());
```

Por motivos estilísticos, `op()(obs)` nunca se utiliza, aunque solo se utilice un operador. `obs.pipe(op())` es universalmente preferible.

# Operadores de Creación

¿Qué son los Operadores de Creación? Diferentes a los Operadores _Pipeable_, los Operadores de Creación son funciones que se pueden utilizar para crear un Observable con un comportamiento predeterminado común, o mediante la unión de otros Observables.

Un ejemplo clásico de un Operador de Creación es la función `interval`. Recibe un número (no un Observable) como argumento de entrada, y produce un Observable como salida:

```javascript
import { interval } from "rxjs";

const observable = interval(1000 /* número de milisegundos */);
```

Podemos ver la [lista completa de Operadores estáticos de Creación aquí.]()

Higher-order Observables

Observables most commonly emit ordinary values like strings and numbers, but surprisingly often, it is necessary to handle Observables of Observables, so-called higher-order Observables. For example, imagine you had an Observable emitting strings that were the URLs of files you wanted to see. The code might look like this:

const fileObservable = urlObservable.pipe(
map(url => http.get(url)),
);

http.get() returns an Observable (of string or string arrays probably) for each individual URL. Now you have an Observables of Observables, a higher-order Observable.

But how do you work with a higher-order Observable? Typically, by flattening: by (somehow) converting a higher-order Observable into an ordinary Observable. For example:

const fileObservable = urlObservable.pipe(
map(url => http.get(url)),
concatAll(),
);

The concatAll() operator subscribes to each "inner" Observable that comes out of the "outer" Observable, and copies all the emitted values until that Observable completes, and goes on to the next one. All of the values are in that way concatenated. Other useful flattening operators (called join operators) are

    mergeAll() — subscribes to each inner Observable as it arrives, then emits each value as it arrives
    switchAll() — subscribes to the first inner Observable when it arrives, and emits each value as it arrives, but when the next inner Observable arrives, unsubscribes to the previous one, and subscribes to the new one.
    exhaust() — subscribes to the first inner Observable when it arrives, and emits each value as it arrives, discarding all newly arriving inner Observables until that first one completes, then waits for the next inner Observable.

Just as many array library combine map() and flat() (or flatten()) into a single flatMap(), there are mapping equivalents of all the RxJS flattening operators concatMap(), mergeMap(), switchMap(), and exhaustMap().
Marble diagrams

To explain how operators work, textual descriptions are often not enough. Many operators are related to time, they may for instance delay, sample, throttle, or debounce value emissions in different ways. Diagrams are often a better tool for that. Marble Diagrams are visual representations of how operators work, and include the input Observable(s), the operator and its parameters, and the output Observable.

In a marble diagram, time flows to the right, and the diagram describes how values ("marbles") are emitted on the Observable execution.

Below you can see the anatomy of a marble diagram.

Throughout this documentation site, we extensively use marble diagrams to explain how operators work. They may be really useful in other contexts too, like on a whiteboard or even in our unit tests (as ASCII diagrams).
Categories of operators

There are operators for different purposes, and they may be categorized as: creation, transformation, filtering, joining, multicasting, error handling, utility, etc. In the following list you will find all the operators organized in categories.

For a complete overview, see the references page.
Creation Operators

    ajax
    bindCallback
    bindNodeCallback
    defer
    empty
    from
    fromEvent
    fromEventPattern
    generate
    interval
    of
    range
    throwError
    timer
    iif

Join Creation Operators

These are Observable creation operators that also have join functionality -- emitting values of multiple source Observables.

    combineLatest
    concat
    forkJoin
    merge
    race
    zip

Transformation Operators

    buffer
    bufferCount
    bufferTime
    bufferToggle
    bufferWhen
    concatMap
    concatMapTo
    exhaust
    exhaustMap
    expand
    groupBy
    map
    mapTo
    mergeMap
    mergeMapTo
    mergeScan
    pairwise
    partition
    pluck
    scan
    switchMap
    switchMapTo
    window
    windowCount
    windowTime
    windowToggle
    windowWhen

Filtering Operators

    audit
    auditTime
    debounce
    debounceTime
    distinct
    distinctKey
    distinctUntilChanged
    distinctUntilKeyChanged
    elementAt
    filter
    first
    ignoreElements
    last
    sample
    sampleTime
    single
    skip
    skipLast
    skipUntil
    skipWhile
    take
    takeLast
    takeUntil
    takeWhile
    throttle
    throttleTime

Join Operators

Also see the Join Creation Operators section above.

    combineAll
    concatAll
    exhaust
    mergeAll
    startWith
    withLatestFrom

Multicasting Operators

    multicast
    publish
    publishBehavior
    publishLast
    publishReplay
    share

Error Handling Operators

    catchError
    retry
    retryWhen

Utility Operators

    tap
    delay
    delayWhen
    dematerialize
    materialize
    observeOn
    subscribeOn
    timeInterval
    timestamp
    timeout
    timeoutWith
    toArray

Conditional and Boolean Operators

    defaultIfEmpty
    every
    find
    findIndex
    isEmpty

Mathematical and Aggregate Operators

    count
    max
    min
    reduce

Creating custom observables
Use the pipe() function to make new operators

If there is a commonly used sequence of operators in your code, use the pipe() function to extract the sequence into a new operator. Even if a sequence is not that common, breaking it out into a single operator can improve readability.

For example, you could make a function that discarded odd values and doubled even values like this:

import { pipe } from 'rxjs';
import { filter, map } from 'rxjs';

function discardOddDoubleEven() {
return pipe(
filter(v => ! (v % 2)),
map(v => v + v),
);
}

(The pipe() function is analogous to, but not the same thing as, the .pipe() method on an Observable.)
Creating new operators from scratch

It is more complicated, but if you have to write an operator that cannot be made from a combination of existing operators (a rare occurrance), you can write an operator from scratch using the Observable constructor, like this:

    import { Observable } from 'rxjs';

    function delay(delayInMillis) {
      return (observable) => new Observable(observer => {
        // this function will called each time this
        // Observable is subscribed to.
        const allTimerIDs = new Set();
        const subscription = observable.subscribe({
          next(value) {
            const timerID = setTimeout(() => {
              observer.next(value);
              allTimerIDs.delete(timerID);
            }, delayInMillis);
            allTimerIDs.add(timerID);
          },
          error(err) {
            observer.error(err);
          },
          complete() {
            observer.complete();
          }
        });
        // the return value is the teardown function,
        // which will be invoked when the new
        // Observable is unsubscribed from.
        return () => {
          subscription.unsubscribe();
          allTimerIDs.forEach(timerID => {
            clearTimeout(timerID);
          });
        }
      });
    }

Note that you must

    implement all three Observer functions, next(), error(), and complete() when subscribing to the input Observable.
    implement a "teardown" function that cleans up when the Observable completes (in this case by unsubscribing and clearing any pending timeouts).
    return that teardown function from the function passed to the Observable constructor.

Of course, this is only an example; the delay() operator already exists.

```

```
