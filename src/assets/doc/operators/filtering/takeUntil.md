# takeUntil

<h2 class="subtitle"> Emite los valores emitidos por el Observable fuente hasta que un segundo Observable emita un valor
</h2>

<details>
<summary>Signatura</summary>

### Firma

`takeUntil<T>(notifier: Observable<any>): MonoTypeOperatorFunction<T>`

### Parámetros

<table>
<tr><td>notifier</td><td>El Observable cuya primera emisión hará que el Observable resultante deje de emitir los valores del Observable fuente.</td></tr>
</table>

### Retorna

`MonoTypeOperatorFunction<T>`: Un Observable que emite los valores del Observable fuente hasta que el Observable notificador emita un valor.

</details>

## Descripción

Emite valores hasta que un segundo Observable, el notificador, emita un valor. Entonces, se completa.

<img src="assets/images/marble-diagrams/filtering/takeUntil.png" alt="Diagrama de canicas del operador takeUntil">

`takeUntil` se suscribe y comienza a reflejar el Observable fuente. También se encarga de monitorizar un segundo Observable, el notificador que se haya proporcionado. Si el notificador emite un valor, el Observable resultante deja de emitir los valores del Observable fuente y se completa.

Si el notificador no emite ningún valor y se completa, `takeUntil` emitirá todos los valores.

## Ejemplos

**Emitir valores hasta que timer\$ emita a los 4 segundos**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-takeuntil-1?file=index.ts">StackBlitz</a>

```javascript
import { takeUntil } from "rxjs/operators";
import { interval, timer } from "rxjs";

const number$ = interval(1000);
const timer$ = timer(4000);

number$.pipe(takeUntil(timer$)).subscribe(console.log);
// Salida: 0, 1, 2
```

**Emitir valores hasta que se pulse una tecla**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-takeuntil-2?file=index.ts">StackBlitz</a>

```javascript
import { takeUntil } from "rxjs/operators";
import { interval, fromEvent } from "rxjs";

const number$ = interval(1000);
const key$ = fromEvent(document, "keydown");

number$.pipe(takeUntil(key$)).subscribe(console.log);
// Salida: O, 1, 2, 3, 4 (Pulsar tecla)
```

**Cancelar la ejecución de un Observable con un Sujeto y takeUntil**

Una técnica muy útil para poder cancelar la ejecución de uno o varios Observables es utilizar un Sujeto junto al operador `takeUntil`. De esta manera, no hay que cancelar la suscripción manualmente a todos los Observables que se crean. A continuación, una demostración de esta técnica:

Para cancelar la suscripción a un Observable, se debe almacenar la suscripción a dicho Observable, y llamar al método `unsubscribe`. Esto implica que por cada Observable que se cree, se debe almacenar una Suscripción. Esta forma de cancelar suscripciones es tediosa e imposible de mantener a medida que una aplicación escala.

<a target="_blank" href="https://stackblitz.com/edit/rxjs-unsubscribe-1?file=index.ts">StackBlitz</a>

```javascript
import { interval, timer } from "rxjs";
import { tap } from "rxjs/operators";

const number$ = interval(1000);

const number$Subscription = number$.subscribe(console.log);

number$Subscription.unsubscribe();
```

Sin embargo, al utilizar el operador `takeUntil`, ya no es necesario almacenar ninguna suscripción. Lo único que hay que hacer es crear un Sujeto, y utilizar `takeUntil` con dicho Sujeto, de tal forma que cuando `stop$` emita un valor, todo Observable que utilice el operador se cancelará.

<a target="_blank" href="https://stackblitz.com/edit/rxjs-takeuntil-3?file=index.ts">StackBlitz</a>

```javascript
import { takeUntil, tap } from "rxjs/operators";
import { interval, timer, Subject } from "rxjs";

const stop$ = new Subject<void>();

function stop() {
  stop$.next();
  stop$.complete();
}

// Al cabo de 5s, se llamará a la función stop
timer(5000).pipe(tap(_ => stop())).subscribe();

// Will emit numbers until we call the stop function
interval(1000)
  .pipe(takeUntil(stop$))
  .subscribe(console.log);
// Salida: 0, 1, 2, 3, 4 (llamada a stop())
```

### Ejemplo de la documentación oficial

**Emitir una secuencia de números cada segundo, hasta que se haga click**

```javascript
import { fromEvent, interval } from "rxjs";
import { takeUntil } from "rxjs/operators";

const source = interval(1000);
const clicks = fromEvent(document, "click");
const result = source.pipe(takeUntil(clicks));
result.subscribe((x) => console.log(x));
```

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/takeUntil.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/takeUntil">Documentación oficial en inglés</a>
