# audit

<h2 class="subtitle"> Ignora los valores emitidos por el Observable fuente durante un periodo de tiempo cuya duración está determinada por un segundo Observable. Una vez terminado el periodo, emite el valor más reciente y repite el proceso
</h2>

<details>
<summary>Signatura</summary>

### Firma

`audit<T>(durationSelector: (value: T) => SubscribableOrPromise<any>): MonoTypeOperatorFunction<T>`

### Parámetros

<table>
<tr><td>durationSelector</td><td>Una función que recibe un valor del Observable fuente, para calcular la duración del silenciamiento, retornado en forma de Observable o de Promesa.</td></tr>

</table>

### Retorna

`MonoTypeOperatorFunction<T>`: Un Observable que limita las emisiones del Observable fuente.

</details>

## Descripción

Es como `auditTime`, pero la duración del silenciamiento está determinada por un segundo Observable.

<img src="assets/images/marble-diagrams/filtering/audit.png" alt="Diagrama de canicas del operador audit">

`audit` es similar a `throttle`, pero emite el último valor del periodo de silenciamiento, en lugar del primero. `audit` emite el valor más reciente del Observable fuente en cuanto su temporizador interno se deshabilita, e ignora los valores de la fuente mientras el temporizador está habilitado. Inicialmente, el temporizador está deshabilitado. En cuanto llega el primer valor de la fuente, se habilita el temporizador mediante una llamada a la función `durationSelector` con dicho valor, que retorna el Observable de 'duración'. Cuando el Observable de duración emita un valor o se complete, el temporizador se deshabilitará, y el valor más reciente emitido por el Observable fuente se emitirá en el Observable resultante. Este proceso se repite con cada valor de la fuente.

## Ejemplos

**Ignorar las teclas pulsadas durante 2s, y emitir la última tecla pulsada. Repetir el proceso.**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-audit-1?file=index.ts">StackBlitz</a>

```typescript
import { audit } from "rxjs/operators";
import { fromEvent, interval } from "rxjs";

const key$ = fromEvent<KeyboardEvent>(document, "keydown");

// Ignorar las teclas pulsadas durante 2s, y emitir la última tecla pulsada. Repetir el proceso.
key$
  .pipe(audit(() => interval(2000)))
  .subscribe(({ code }) => console.log(code));
// Salida: (Pulsar tecla y) (Pulsar tecla x) (2s) KeyX (Pulsar tecla o) (2s) KeyO...
```

### Ejemplo de la documentación oficial

**Emite clicks a un ritmo de, como mucho, un click por segundo**

```javascript
import { fromEvent, interval } from "rxjs";
import { audit } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const result = clicks.pipe(audit((ev) => interval(1000)));
result.subscribe((x) => console.log(x));
```

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/audit.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/audit">Documentación oficial en inglés</a>
