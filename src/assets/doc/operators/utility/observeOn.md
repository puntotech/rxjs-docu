# observeOn

<h2 class="subtitle"> Reemite todas las notificaciones del Observable fuente con el planificador especificado
</h2>

<details>
<summary>Signatura</summary>

### Firma

`observeOn<T>(scheduler: SchedulerLike, delay: number = 0): MonoTypeOperatorFunction<T>`

### Parámetros

<table>
<tr><td>scheduler</td>El planificador que se utilizará para replanificar las notificaciones del Observable fuente.<td></td></tr>
<tr><td>delay</td><td>Opcional. El valor por defecto es 0.
El número de milisegundos de retraso que se aplicará a la replanificación de cada notificación.</td></tr>
</table>

### Retorna

`MonoTypeOperatorFunction<T>`: Un Observable que emite las mismas notificaciones que el Observable fuente, pero con el planificador especificado.

</details>

## Descripción

Utiliza el planificador especificado, desde fuera del Observable.

`observeOn` es un operador que acepta un planificador como primer parámetro, que se utiliza para replanificar las notificaciones emitidas por el Observable fuente. Puede resultar especialmente útil si no se tiene control sobre el planificador interno de un Observable, pero se quiere controlar cuándo se emiten sus valores.

El Observable retornado emite las mismas notificaciones (valores `next`, y eventos de tipo `error` y `complete`) que el Observable fuente, pero replanificadas con el planificador proporcionado. Se debe tener en cuenta que esto no implica que el planificador interno del Observable fuente vaya a ser reemplazado. Se utilizará el planificador original, pero en el momento en el que el Observable fuente emita un valor, este será replanificado inmediatamente utilizando el planificador que se le haya proporcionado a `observeOn`. Un ejemplo de antipatrón sería utilizar `observeOn` sobre un Observable que emita muchos valores de forma síncrona, para emitirlos de forma asíncrona. Para ello, el planificador se le debería pasar por parámetros directamente al Observable fuente (normalmente al operador que crea el Observable.) `observeOn` se limita a retrasar las notificaciones para asegurarse de que se emiten en el momento indicado.

De hecho, el operador `observeOn` acepta un segundo parámetro, que especifica en milisegundos el retraso con el que se emitirán las notificaciones. La diferencia principal entre `delay` y `observeOn` es que este último retrasará todas las notificaciones - incluidas las notificaciones de error - mientras que `delay` emitirá las notificaciones de error emitidas por el Observable fuente de manera inmediata. En general, se recomienda utilizar el operador `delay` cuando se quiera aplicar un retraso a los valores del flujo, mientras que `observeOn` debe utilizarse para especificar qué planificador utilizar con las emisiones de notificaciones en general.

### Ejemplos

**Utilizar el planificador animationFrameScheduler para que la animación sea más fluida**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-observeon-1?file=index.ts">StackBlitz</a>

```javascript
import { interval, animationFrameScheduler } from "rxjs";
import { observeOn, tap } from "rxjs/operators";

const rxjs = document.getElementById("rxjs");

const interval$ = interval(0);

interval$
  .pipe(
    tap((val) => (rxjs.style.transform = `rotate(${val}deg)`)),
    observeOn(animationFrameScheduler)
  )
  .subscribe();
```

### Ejemplo de la documentación oficial

**Asegurar que los valores del subscribe se llaman justo antes del repintado del navegador**

```javascript
import { interval } from "rxjs";
import { observeOn } from "rxjs/operators";

const intervals = interval(10); // Los intervalos se planifican con el asyncScheduler por defecto...
intervals
  .pipe(
    observeOn(animationFrameScheduler) // ...pero se observará con el animationFrameScheduler para asegurar una animación fluida
  .subscribe((val) => {
    someDiv.style.height = val + "px";
  });
```

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/observeOn.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/observeOn">Documentación oficial en inglés</a>
