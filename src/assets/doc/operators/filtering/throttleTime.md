# throttleTime

<h2 class="subtitle"> Emite un valor del Observable fuente e ignora las emisiones siguientes durante un periodo de tiempo determinado. Después, repite el proceso
</h2>

<details>
<summary>Signatura</summary>

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

</details>

## Descripción

Emite un valor, ignorando las siguientes emisiones durante `duration` milisegundos.

<img src="assets/images/marble-diagrams/filtering/throttleTime.png" alt="Diagrama de canicas del operador throttleTime">

throttleTime emite los valores del Observable fuente mientras su temporizador interno está deshabilitado, y los ignora mientras su temporizador está habilitado. Inicialmente, el temporizador está deshablitado. En cuanto se recibe el primer valor de la fuente, este se emite en el Observable resultante y se habilita e temporizador. Tras `duration` milisegundos (o la unidad temporal determinada internamente por el planificador opcional) se deshabilita el temporizador y se repite el proceso para el siguiente valor de la fuente. Opcionalmente, recibe un SchedulerLike para gestionar los temporizadores.

## Ejemplos

**Emitir la tecla pulsada, ignorar todos los valores siguientes durante 2 segundos, y repetir**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-throttletime-1?file=index.ts">StackBlitz</a>

```typescript
import { throttleTime } from "rxjs/operators";
import { fromEvent } from "rxjs";

const key$ = fromEvent<KeyboardEvent>(document, "keydown");

key$.pipe(throttleTime(2000)).subscribe(({ code }) => console.log(code));
// Salida: KeyX (2s) KeyO...
```

**Emitir un valor, ignorar todos los valores durante 2 segundos, y repetir**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-throttletime-2?file=index.ts">StackBlitz</a>

```javascript
import { map, throttleTime } from "rxjs/operators";
import { interval, zip, from } from "rxjs";

// El Observable fruit$ emite una fruta cada segundo
const fruit$ = zip(
  from(["Fresa", "Cereza", "Arándano", "Mora", "Frambuesa", "Grosella"]),
  interval(1000)
).pipe(map(([fruit]) => fruit));

fruit$.pipe(throttleTime(2000)).subscribe(console.log);
// Salida: Fresa, Mora
```

### Ejemplos de la documentación oficial

**Emite como mucho un click por segundo**

```javascript
import { fromEvent } from "rxjs";
import { throttleTime } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const result = clicks.pipe(throttleTime(1000));
result.subscribe((x) => console.log(x));
```

**Doble Click**

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

Si se habilita el parámetro `leading` en este ejemplo, la salida sería el primer click y el doble click, pero se restringiría cualquier click adicional en un periodo de 400ms.

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/throttleTime.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/throttleTime">Documentación oficial en inglés</a>
