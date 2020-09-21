# delayWhen

###

Delays the emission of items from the source Observable by a given time span determined by the emissions of another Observable.

### Firma

`delayWhen<T>(delayDurationSelector: (value: T, index: number) => Observable<any>, subscriptionDelay?: Observable<any>): MonoTypeOperatorFunction<T>`

## Parámetros

<table>
<tr><td>delayDurationSelector</td><td>A function that returns an Observable for each value emitted by the source Observable, which is then used to delay the emission of that item on the output Observable until the Observable returned from this function emits a value.</td></tr>
<tr><td>subscriptionDelay</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Un Observable que disapra la suscripción al Observable fuente en cuanto emita algún valor.</td></tr>
</table>

## Retorna

`MonoTypeOperatorFunction<T>`: Un Observable que retrasa las emisiones del Observable fuente durante una cantidad de tiempo determinada por el Observable que retorna la función `delayDurationSelector`.

## Descripción

Es como `delay`, pero la duración del retraso de cada emisión se determina por un segundo Observable.

<img src="assets/images/marble-diagrams/utility/delayWhen.png" alt="Diagrama de cancicas del operador delayWhen">

`delayWhen` desplaza cada valor emitido por el Observable fuente en el tiempo, en

time shifts each emitted value from the source Observable by a time span determined by another Observable. When the source emits a value, the delayDurationSelector function is called with the source value as argument, and should return an Observable, called the "duration" Observable. The source value is emitted on the output Observable only when the duration Observable emits a value or completes. The completion of the notifier triggering the emission of the source value is deprecated behavior and will be removed in future versions.

Optionally, delayWhen takes a second argument, subscriptionDelay, which is an Observable. When subscriptionDelay emits its first value or completes, the source Observable is subscribed to and starts behaving like described in the previous paragraph. If subscriptionDelay is not provided, delayWhen will subscribe to the source Observable as soon as the output Observable is subscribed.

## Ejemplos

Retrasa la emisión de cada tecla pulsada durante 2 segundos

[StackBlitz](https://stackblitz.com/edit/rxjs-delaywhen-1?file=index.ts)

```typescript
import { delayWhen, map } from "rxjs/operators";
import { fromEvent, interval } from "rxjs";

const key$ = fromEvent<KeyboardEvent>(document, "keydown").pipe(
  map(({ code }) => code)
);

key$.pipe(delayWhen(() => interval(2000))).subscribe(console.log);
// Salida: (2s) KeyP (2s) KeyX
```

### Ejemplo de la documentación oficial

Retrasa cada click durante una cantidad de tiempo aleatoria, entre 0 y 5 segundos

```javascript
import { fromEvent, interval } from 'rxjs';
import { delayWhen } from 'rxjs/operators';

const clicks = fromEvent(document, 'click');
const delayedClicks = clicks.pipe(
delayWhen(event => interval(Math.random() \* 5000)),
);
delayedClicks.subscribe(x => console.log(x));
```

- [Documentación oficial en inglés](https://rxjs-dev.firebaseapp.com/api/operators/delayWhen)
- [Código fuente](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/delayWhen.ts)
