<div class="page-heading">

# sampleTime

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/sampleTime.ts">
<svg>
  <use xlink:href="/assets/icons/github.svg#github"></use>
</svg>
</a>
</div>

### Emite la emisión más reciente del Observable fuente en cada periodo de tiempo determinado

### Firma

`sampleTime<T>(period: number, scheduler: SchedulerLike = async): MonoTypeOperatorFunction<T>`

### Parámetros

<table>
<tr><td>period</td><td>El periodo de muestreo expresado en milisegundos o en la unidad de tiempo determinada por el planificador opcional</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>async</code>.
El <code>SchedulerLike</code> que utilizar para gestionar los temporizadores que se encargan del muestreo.</td></tr>

</table>

### Retorna

`MonoTypeOperatorFunction<T>`: Un Observable que emite la emisión más reciente del Observable fuente en el intervalo de tiempo especificado.

## Descripción

Toma una muestra del Observable fuente a intervalos periódicos de tiempo, emitiendo la emisión más reciente en dicho periodo de tiempo.

<img src="assets/images/marble-diagrams/filtering/sampleTime.png" alt="Diagrama de canicas del operador sampleTime">

`sampleTime` emite la emisión más reciente del Observable fuente, desde el último muestreo, a no ser que la fuente no haya emitido nada desde el último muestreo. El muestreo ocurre de forma periódica, cada `period` milisegundos (o la unidad de tiempo definida por el argumento opcional `scheduler`.) El muestreo comienza en cuando se realice la suscripción al Observable resultante.

## Ejemplos

Emitir el valor más reciente desde el último muestreo, realizado cada 2 segundos

[StackBlitz](https://stackblitz.com/edit/rxjs-sampletime-1?file=index.ts)

```javascript
import { fromEvent, interval } from "rxjs";
import { sampleTime } from "rxjs/operators";

const number$ = interval(1000);

number$.pipe(sampleTime(2000)).subscribe(console.log);
// Salida: 0, 2, 4, 6, 8...
```

Emitir la tecla pulsada más reciente desde el último muestreo, realizado cada 2 segundos

[StackBlitz](https://stackblitz.com/edit/rxjs-sampletime-2?file=index.ts)

```typescript
import { fromEvent } from "rxjs";
import { map, sampleTime } from "rxjs/operators";

const key$ = fromEvent<KeyboardEvent>(document, "keydown");

key$
  .pipe(
    sampleTime(2000),
    map(({ code }) => code)
  )
  .subscribe((code) =>
    console.log(`La tecla pulsada más reciente es: ${code}`)
  );
// Salida: (Pulsar tecla y) (Pulsar tecla x) La tecla pulsada más reciente es: KeyX
```

### Ejemplo de la documentación oficial

Cada segundo, emitir el click más reciente

```javascript
import { fromEvent } from "rxjs";
import { sampleTime } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const result = clicks.pipe(sampleTime(1000));
result.subscribe((x) => console.log(x));
```

## Recursos adicionales

- [Documentación oficial en inglés](https://rxjs-dev.firebaseapp.com/api/operators/sampleTime)
