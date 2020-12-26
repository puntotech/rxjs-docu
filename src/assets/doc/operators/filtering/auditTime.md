# auditTime

<h2 class="subtitle"> Ignora los valores de la fuente durante un periodo de tiempo, tras el cual emite el valor más reciente del Observable fuente.
</h2>

<details>
<summary>Signatura</summary>

### Firma

`auditTime<T>(duration: number, scheduler: SchedulerLike = async): MonoTypeOperatorFunction<T>`

### Parámetros

<table>
<tr><td>duration</td><td>El tiempo que se debe esperar antes de emitir el valor más reciente de la fuente, medido en milisegundos o en la unidad de tiempo determinada por el planificador opcional.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>async</code>.
El <code>SchedulerLike</code> que utilizar para gestionar los temporizadores que se encargan del comportamiento de limitación de emisiones.</td></tr>
</table>

### Retorna

`MonoTypeOperatorFunction<T>`: Un Observable que limita las emisiones del Observable fuente.

</details>

## Descripción

Cuando recibe un valor de la fuente, lo ignora, además de todos los valores posteriores durante un periodo de tiempo. Una vez finalizado el periodo de tiempo, emite el valor más reciente del Observable fuente.

<img src="assets/images/marble-diagrams/filtering/auditTime.png" alt="Diagrama de canicas del operador auditTime">

auditTime es similar a throttleTime, pero emite el último valor del periodo de silenciamiento, en lugar del primero. auditTime emite el valor más reciente del Observable fuente en cuanto su temporizador interno se deshabilita, e ignora los valores de la fuente mientras el temporizador está habilitado. Inicialmente, el temporizador está deshabilitado. En cuanto llega el primer valor de la fuente, se habilita el temporizador. Tras un periodo de tiempo, determinado por `duration`, se deshabilita el temporizador y se emite el valor más reciente que haya emitido la fuente, en el Observable resultante. Este proceso se repite con cada valor de la fuente.
auditTime puede recibir un SchedulerLike opcional para gestionar los temporizadores.

## Ejemplos

**Ignorar las teclas pulsadas durante un periodo de 2s, tras el cual emitir la última tecla pulsada. Repetir.**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-audittime-1?file=index.ts">StackBlitz</a>

```typescript
import { auditTime } from "rxjs/operators";
import { fromEvent } from "rxjs";

const key$ = fromEvent<KeyboardEvent>(document, "keydown");

key$.pipe(auditTime(2000)).subscribe(({ code }) => console.log(code));
// Salida: (2s) KeyX (2s) KeyO...
```

### Ejemplo de la documentación oficial

**Emite como mucho un click por segundo**

```javascript
import { fromEvent } from "rxjs";
import { auditTime } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const result = clicks.pipe(auditTime(1000));
result.subscribe((x) => console.log(x));
```

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/auditTime.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/auditTime">Documentación oficial en inglés</a>
