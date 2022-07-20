---
description: Comparte el Observable fuente utilizando un Sujeto
---

# multicast

<details>

<summary>Signatura</summary>

#### Firma

`multicast<T, R>(subjectOrSubjectFactory: Subject<T> | (() => Subject<T>), selector?: (source: Observable<T>) => Observable<R>): OperatorFunction<T, R>`

#### Parámetros

#### Retorna

`OperatorFunction<T, R>`: Un Observable que emite el resultado de invocar el selector sobre las emisiones de un ConnectableObservable, que comparte una sola suscripción al flujo subyacente.

</details>

## Descripción

Retorna un Observable que emite el resultado de invocar el selector especificado sobre los elementos emitidos por un ConnectableObservable, que comparte una sola suscripción al flujo subyacente

![Diagrama de canicas del operador multicast](assets/images/marble-diagrams/multicasting/multicast.png)

## Ejemplos

**Compartir el Observable fuente utilizando un Sujeto normal**

Dado que la fuente es compartida, aunque haya varios observadores (suscriptores), el efecto colateral se ejecuta una sola vez.

[StackBlitz](https://stackblitz.com/edit/docu-rxjs-multicast?file=index.ts)

```javascript
import { ConnectableObservable, interval, Subject, timer } from "rxjs";
import { take, tap, multicast } from "rxjs/operators";

const number$ = interval(1000).pipe(take(2));

// Al usar multicast, estamos convirtiendo el Observable number$ en un Observable caliente
const multicasted$ = number$.pipe(
  tap(() =>
    console.log(
      "Observable caliente, efecto secundario se ejecuta una sola vez"
    )
  ),
  multicast(() => new Subject())
) as ConnectableObservable<number>;

// number$ no comenzará a emitir valores hasta que no llamemos al método connect()
timer(3000)
  .pipe(tap(() => console.log("Conectado")))
  .subscribe(() => multicasted$.connect());

multicasted$.subscribe(val => console.log(`Observador 1: ${val}`));
multicasted$.subscribe(val => console.log(`Observador 2: ${val}`));

/* Salida:
(3s)
Conectado
(1s)
Observable caliente, efecto secundario se ejecuta una sola vez,
Observador 1: 0,
Observador 2: 0,
(1s)
Observable caliente, efecto secundario se ejecuta una sola vez,
Observador 1: 1,
Observador 2: 1,
*/
```

**Compartir el Observable fuente utilizando un Sujeto normal, con observadores tardíos**

Si se utiliza un Sujeto normal, los observadores que se suscriban más tarde no recibirán los valores que ya se hayan emitido.

[StackBlitz](https://stackblitz.com/edit/docu-rxjs-multicast-2?file=index.ts)

```javascript
import { ConnectableObservable, interval, Subject, timer } from 'rxjs';
import { take, tap, multicast } from 'rxjs/operators';

const number$ = interval(1000).pipe(take(2));

const multicasted$ = number$.pipe(
  tap(() =>
    console.log(
      'Observable caliente, efecto secundario se ejecuta una sola vez'
    )
  ),
  multicast(() => new Subject())
) as ConnectableObservable<number>;

timer(3000)
  .pipe(tap(() => console.log('Conectado')))
  .subscribe(() => multicasted$.connect());

multicasted$.subscribe((val) => console.log(`Observador 1: ${val}`));

// Si el observador se suscribe más tarde, no recibirá los valores que ya se hayan emitido
timer(5000)
  .pipe(
    tap(() =>
      multicasted$.subscribe((val) => console.log(`Observador tardío: ${val}`))
    )
  )
  .subscribe();

/* Salida:
(3s)
Conectado
(1s)
Observable caliente, efecto secundario se ejecuta una sola vez,
Observador 1: 0,
(1s)
Observable caliente, efecto secundario se ejecuta una sola vez,
Observador 1: 1,
Observador tardío: 1,
*/
```

**Compartir el Observable fuente utilizando un ReplaySubject**

Al utilizar un ReplaySubject en lugar de un Sujeto normal, los observadores que se suscriban más tarde sí que recibirán los valores que se hayan emitido anteriormente.

[StackBlitz](https://stackblitz.com/edit/docu-rxjs-multicast-3?file=index.ts)

```javascript
import { ConnectableObservable, interval, ReplaySubject, timer } from "rxjs";
import { take, tap, multicast } from "rxjs/operators";

const number$ = interval(1000).pipe(take(2));

const multicasted$ = number$.pipe(
  tap(() =>
    console.log(
      "Observable caliente, efecto secundario se ejecuta una sola vez"
    )
  ),
  // Se utiliza un ReplaySubject en lugar de un Subject
  multicast(() => new ReplaySubject())
) as ConnectableObservable<number>;

timer(3000)
  .pipe(tap(() => console.log("Conectado")))
  .subscribe(() => multicasted$.connect());

multicasted$.subscribe(val => console.log(`Observador 1: ${val}`));

// Aunque el observador se suscriba más tarde, recibirá los valores que ya se hayan emitido, gracias al ReplaySubject
timer(5000)
  .pipe(
    tap(() =>
      multicasted$.subscribe(val => console.log(`Observador tardío: ${val}`))
    )
  )
  .subscribe();

/* Salida:
(3s)
Conectado
(1s)
Observable caliente, efecto secundario se ejecuta una sola vez,
Observador 1: 0,
Observador tardío: 0
(1s)
Observable caliente, efecto secundario se ejecuta una sola vez,
Observador 1: 1,
Observador tardío: 1
*/
```

<details>

<summary>Sobrecargas</summary>

#### Firma

`multicast(subject: Subject<T>): UnaryFunction<Observable<T>, ConnectableObservable<T>>`

#### Parámetros

#### Retorna

`UnaryFunction<Observable<T>, ConnectableObservable<T>>`

#### Firma

`multicast(subject: Subject<T>, selector: (shared: Observable<T>) => O): UnaryFunction<Observable<T>, ConnectableObservable<ObservedValueOf<O>>>`

#### Parámetros

#### Retorna

`UnaryFunction<Observable<T>, ConnectableObservable<ObservedValueOf<O>>>`

#### Firma

`multicast(subjectFactory: (this: Observable<T>) => Subject<T>): UnaryFunction<Observable<T>, ConnectableObservable<T>>`

#### Parámetros

#### Retorna

`UnaryFunction<Observable<T>, ConnectableObservable<T>>`

#### Firma

`multicast(SubjectFactory: (this: Observable<T>) => Subject<T>, selector: (shared: Observable<T>) => O): OperatorFunction<T, ObservedValueOf<O>>`

#### Parámetros

#### Retorna

`OperatorFunction<T, ObservedValueOf<O>>`

</details>

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/multicast.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/operators/multicast)
