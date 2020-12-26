# timer

<h2 class="subtitle"> Crea un Observable que comienza a emitir una secuencia ascendente de números consecutivos a intervalos, tras un periodo inicial de tiempo
</h2>

<details>
<summary>Signatura</summary>

### Firma

`timer(dueTime: number | Date = 0, periodOrScheduler?: number | SchedulerLike, scheduler?: SchedulerLike): Observable<number>`

### Parámetros

<table>
<tr><td>dueTime</td><td>Opcional. El valor por defecto es <code>0</code>.
El valor del retraso inicial que esperar antes de emitir el primer valor, especificado como objeto <code>Date</code> o como <code>Integer</code>, en milisegundos.</td></tr>
<tr><td>periodOrScheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
El periodo de tiempo entre emisiones.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
EL <code>SchedulerLike</code> que utilizar para planificar las emisiones, proporcionando la noción de 'tiempo'.</td></tr>
</table>

### Retorna

`Observable<number>`: Un Observable que emite una secuencia ascendente de números consecutivos, comenzando por el valor 0, tras un periodo de tiempo inicial especificado por `dueTime`.

</details>

## Descripción

Es como `interval`, pero se puede especificar cuándo deben comenzar las emisiones.

<img src="assets/images/marble-diagrams/creation/timer.png" alt="Diagrama de canicas de timer">

`timer` retorna un Observable que emite una secuencia de números ascendentes infinita. Los valores se emiten a intervalos constantes de tiempo, según se especifique. La primera emisión ocurre tras el periodo de tiempo especificado por `dueTime`. Este periodo inicial de espera también se puede proporcionar en formato `Date`.

Por defecto, este operador utiliza el `SchedulerLike` `asyncScheduler` para proporcionar la noción del tiempo, pero se le puede proporcionar cualquier otro `SchedulerLike`.

Si no se proporciona el valor `period`, el Observable resultante emite un único valor, 0. Si se proporciona un valor `period`, se emite una secuencia infinita.

## Ejemplos

**Emitir un único valor, 0, tras 2 segundos de espera**

<a target="_blank" href="https://stackblitz.com/edit/docu-rxjs-timer?file=index.ts">StackBlitz</a>

```javascript
import { timer } from "rxjs";

const zero$ = timer(2000);

zero$.subscribe(console.log);
// Salida: 0
```

**Emitir una secuencia ascendente de números a intervalos de 1 segundo, tras 5 segundos de espera**

<a target="_blank" href="https://stackblitz.com/edit/docu-rxjs-timer-2?file=index.ts">StackBlitz</a>

```javascript
import { timer } from "rxjs";

const number$ = timer(5000, 1000);

number$.subscribe((number) => console.log(number));
// Output: 0, 1, 2, 3...
```

### Ejemplos de la documentación oficial

**Emitir una secuencia ascendente de números, uno cada segundo (1000ms), comenzando tras 3 segundos**

```javascript
import { timer } from "rxjs";

const numbers = timer(3000, 1000);
numbers.subscribe((x) => console.log(x));
```

Emitir el número 0 tras 5 segundos de espera

```javascript
import { timer } from "rxjs";

const numbers = timer(5000);
numbers.subscribe((x) => console.log(x));
```

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/timer.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/index/function/timer">Documentación oficial en inglés</a>
