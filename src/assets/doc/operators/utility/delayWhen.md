# delayWhen

<h2 class="subtitle"> Retrasa la emisión de los elementos del Observable fuente en función de las emisiones de un segundo Observable
</h2>

<details>
<summary>Signatura</summary>

### Firma

`delayWhen<T>(delayDurationSelector: (value: T, index: number) => Observable<any>, subscriptionDelay?: Observable<any>): MonoTypeOperatorFunction<T>`

## Parámetros

<table>
<tr><td>delayDurationSelector</td><td>Una función que retorna un Observable por cada elemento emitido por el Observable fuente, que se utiliza para retrasar la emisión de dicho elemento: cuando el Observable retornado por esta función emite, también se emite el valor del Observable fuente.</td></tr>

<tr><td>subscriptionDelay</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Un Observable que disapra la suscripción al Observable fuente en cuanto emita algún valor.</td></tr>
</table>

## Retorna

`MonoTypeOperatorFunction<T>`: Un Observable que retrasa las emisiones del Observable fuente durante una cantidad de tiempo determinada por el Observable que retorna la función `delayDurationSelector`.

</details>

## Descripción

Es como `delay`, pero la duración del retraso de cada emisión se determina por un segundo Observable.

<img src="assets/images/marble-diagrams/utility/delayWhen.png" alt="Diagrama de cancicas del operador delayWhen">

`delayWhen` retrasa la emisión de cada valor emitido por el Observable fuente, según las emisiones de un segundo Observable. Cuando la fuente emite un valor, se llama a la función `delayDurationSelector` con dicho valor como argumento. Esta función retorna un Observable, llamado Observable de duración. Cuando el Observable de duración emite un valor o se completa, el valor emitido por la fuente se emite en el Observable resultante.

De forma opcional, `delayWhen` recibe un segundo argumento, `subscriptionDelay`, que es un Observable. Cuando `subscriptionDelay` emite su primer valor o se completa, `delayWhen` se suscribe al Observable fuente, que comienza a comportarse según lo descrito en el párrafo anterior. Si no se proporciona un `subscriptionDelay`, `delayWhen` se suscribirá al Observable fuente en cuanto se realice la suscripción al Observable resultante.

## Ejemplos

**Retrasa la emisión de cada tecla pulsada durante 2 segundos**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-delaywhen-1?file=index.ts">StackBlitz</a>

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

**Retrasa cada click durante una cantidad de tiempo aleatoria, entre 0 y 5 segundos**

```javascript
import { fromEvent, interval } from 'rxjs';
import { delayWhen } from 'rxjs/operators';

const clicks = fromEvent(document, 'click');
const delayedClicks = clicks.pipe(
delayWhen(event => interval(Math.random() \* 5000)),
);
delayedClicks.subscribe(x => console.log(x));
```

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/delayWhen.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/delayWhen">Documentación oficial en inglés</a>
