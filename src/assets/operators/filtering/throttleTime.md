# throttleTime

### Emite un valor del Observable fuente e ignora las emisiones siguientes durante un periodo de tiempo determinado. Después, repite el proceso

### Firma

`throttleTime<T>(duration: number, scheduler: SchedulerLike = async, config: ThrottleConfig = defaultThrottleConfig): MonoTypeOperatorFunction<T>`

### Parámetros

<table>
<tr><td>duration</td><td>El periodo de tiempo que debe pasar antes de emitir el siguiente valor, a partir de la última emisión, en milisegundos o en la unidad de tiempo determinada por el planificador opcional.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>async</code>.
El <code>SchedulerLike</code> que utilizar para gestionar los temporizadores que se encargan de regular las emisiones.</td></tr>
<tr><td>config</td><td>Opcional. El valor por defecto es <code>defaultThrottleConfig</code>.
Un objeto de configuración para definir el comportamiento de los parámetros <code>leading</code> y <code>trailing</code>. Por defecto es <code>{ leading: true, trailing: false}</code>.</td></tr>
</table>

### Retorna

`MonoTypeOperatorFunction<T>`: Un Observable that performs the throttle operation to limit the rate of emissions from the source.

### Descripción

Emite un valor, ignorando las siguientes emisiones durante `duration` milisegundos.

<img src="assets/images/marble-diagrams/filtering/throttleTime.png" alt="Diagrama de canicas del operador throttleTime">

throttleTime emits the source Observable values on the output Observable when its internal timer is disabled, and ignores source values when the timer is enabled. Initially, the timer is disabled. As soon as the first source value arrives, it is forwarded to the output Observable, and then the timer is enabled. After duration milliseconds (or the time unit determined internally by the optional scheduler) has passed, the timer is disabled, and this process repeats for the next source value. Optionally takes a SchedulerLike for managing timers.

## Ejemplos

Emitir la tecla pulsada, ignorar todos los valores siguientes durante 2 segundos, y repetir

[StackBlitz](https://stackblitz.com/edit/rxjs-throttletime-1?file=index.ts)

```typescript
import { throttleTime } from "rxjs/operators";
import { fromEvent } from "rxjs";

const key$ = fromEvent<KeyboardEvent>(document, "keydown");

key$.pipe(throttleTime(2000)).subscribe(({ code }) => console.log(code));
// Salida: KeyX (2s) KeyO...
```

Emitir un valor, ignorar todos los valores durante 2 segundos, y repetir

[StackBlitz](https://stackblitz.com/edit/rxjs-throttletime-2?file=index.ts)

```javascript
import { map, throttleTime } from "rxjs/operators";
import { interval, zip, from } from "rxjs";

// El Observable pokemon$ emite un Pokémon cada segundo
const pokemon$ = zip(
  from([
    "Charmander",
    "Squirtle",
    "Bulbasaur",
    "Cyndaquil",
    "Totodile",
    "Chikorita",
  ]),
  interval(1000)
).pipe(map(([pokemon]) => pokemon));

pokemon$.pipe(throttleTime(2000)).subscribe(console.log);
// Salida: Charmander, Cyndaquil
```

### Ejemplos de la documentación oficial

Emite como mucho un click por segundo

```javascript
import { fromEvent } from "rxjs";
import { throttleTime } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const result = clicks.pipe(throttleTime(1000));
result.subscribe((x) => console.log(x));
```

Doble Click

Emitir clicks que ocurran en los 400ms siguientes al click previo. De esta manera, se detecta el doble click. Hace uso del parámetro de configuración `trailing`.

```javascript
import { fromEvent, asyncScheduler } from "rxjs";
import { throttleTime, withLatestFrom } from "rxjs/operators";

// defaultThottleConfig = { leading: true, trailing: false }
const throttleConfig = {
  leading: false,
  trailing: true,
};

const click = fromEvent(document, "click");
const doubleClick = click.pipe(
  throttleTime(400, asyncScheduler, throttleConfig)
);

doubleClick.subscribe((throttleValue: Event) => {
  console.log(`Doble-click! Timestamp: ${throttleValue.timeStamp}`);
});
```

Si se habilita el parámetro `leading` en est ejemplo, la salida sería el primer click y el doble click, pero se restringiría cualquier click adicional en un periodo de 400ms.

- [Documentación oficial en inglés](https://rxjs-dev.firebaseapp.com/api/operators/throttleTime)
- [Código fuente](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/throttleTime.ts)
