# publishLast

<h2 class="subtitle">Comparte el Observable fuente, emitiendo únicamente el último valor emitido a los observadores</h2>

💡 publishLast es equivalente a `multicast(() => new AsyncSubject())`

<details>
<summary>Signatura</summary>

### Firma

`publishLast<T>(): UnaryFunction<Observable<T>, ConnectableObservable<T>>`

### Parámetros

No recibe ningún parámetro.

## Retorna

`UnaryFunction<Observable<T>, ConnectableObservable<T>>`: Una secuencia observable que contiene los elementos de una secuencia producida al multidifundir la secuencia fuente.

</details>

## Descripción

Retorna una secuencia Observable conectable que comparte una sola suscripción a la secuencia subyacente, que contiene solo la última notificación. Para ello utiliza el operador <a href="/operators/multicasting/multicast">multicast</a> junto a un AsyncSubject internamente.

<img src="assets/images/marble-diagrams/multicasting/publishLast.png" alt="Diagrama de canicas del operador publishLast">

Es similar a <a href="/operators/multicasting/publish">publish</a>, pero espera a que el Observable fuente se complete, para almacenar su último valor emitido. Al igual que <a href="/operators/multicasting/publishReplay">publishReplay</a> y <a href="/operators/multicasting/publishBehavior">publishBehavior</a>, almacena este último valor emitido aunque no tenga ningún suscriptor. Si llega un suscriptor nuevo, este recibirá el valor almacenado y se completará.

## Ejemplos

**Compartir el Observable fuente, emitiendo únicamente su último valor**

<a target="_blank" href="https://stackblitz.com/edit/docu-rxjs-publishlast?file=index.html">StackBlitz</a>

```typescript
import { ConnectableObservable, interval, timer } from "rxjs";
import { publishLast, tap, take } from "rxjs/operators";

// number$ no empezará a emitir valores hasta que se haga una llamada a connect
const number$ = interval(1000).pipe(take(4));

const multicasted$ = number$.pipe(publishLast()) as ConnectableObservable<
  number
>;

// Llamando a connect
multicasted$.connect();

multicasted$.subscribe((val) => console.log(`Observador 1: ${val}`));
multicasted$.subscribe((val) => console.log(`Observador 2: ${val}`));

/* Salida:
(4s)
Observador 1: 3,
Observador 2: 3
*/
```

**Si el Observable fuente no llega a completarse, nunca se emitirá ningún valor**

<a target="_blank" href="https://stackblitz.com/edit/docu-rxjs-publishlast-2?file=index.ts">StackBlitz</a>

```javascript
import { ConnectableObservable, interval } from "rxjs";
import { publishLast } from "rxjs/operators";

// El Observable fuente nunca se completa
const number$ = interval(1000);

const multicasted$ = number$.pipe(publishLast()) as ConnectableObservable<
  number
>;

// Llamando a connect
multicasted$.connect();

multicasted$.subscribe(val => console.log(`Observador 1: ${val}`));
multicasted$.subscribe(val => console.log(`Observador 2: ${val}`));
// Salida:
```

### Ejemplo de la documentación oficial

```javascript
import { interval } from "rxjs";
import { publishLast, tap, take } from "rxjs/operators";

const connectable = interval(1000).pipe(
  tap((x) => console.log("side effect", x)),
  take(3),
  publishLast()
);

connectable.subscribe(
  (x) => console.log("Sub. A", x),
  (err) => console.log("Sub. A Error", err),
  () => console.log("Sub. A Complete")
);

connectable.subscribe(
  (x) => console.log("Sub. B", x),
  (err) => console.log("Sub. B Error", err),
  () => console.log("Sub. B Complete")
);

connectable.connect();

// Salida:
//    "side effect 0"
//    "side effect 1"
//    "side effect 2"
//    "Sub. A 2"
//    "Sub. B 2"
//    "Sub. A Complete"
//    "Sub. B Complete"
```

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/publishLast.ts">
<img src="assets/icons/source-code.png" alt="Source code">
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/publishLast">Documentación oficial en inglés</a>
