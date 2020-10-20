# timeout

<h2 class="subtitle"> Lanza un error si el Observable no emite ningún valor antes de que transcurra un intervalo de tiempo
</h2>

<details>
<summary>Signatura</summary>

### Firma

`timeout<T>(due: number | Date, scheduler: SchedulerLike = async): MonoTypeOperatorFunction<T>`

### Parámetros

<table>
<tr><td>due</td><td>Un número especificando el periodo en el que el Observable tiene que emitir un valor, o una fecha especificando antes de cuándo debe completarse el Observable.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>async</code>.
El planificador que controla cuándo ocurren las comprobaciones de *timeout*.</td></tr>
</table>

### Retorna

`MonoTypeOperatorFunction<T>`: Un Observable que refleja el comportamiento de la fuente, a no ser que la comprobación del _timeout_ falle.

</details>

## Descripción

Lanza un error si el Observable no emite valores suficientemente rápido.

<img src="assets/images/marble-diagrams/utility/timeout.png" alt="Diagrama de canicas del operador timeout">

El operador timeout puede recibir un número o una fecha como argumentos.

Si se proporciona un número, devuelve un Observable que se comporta como el Observable fuente, a no ser que transcurra un periodo de tiempo en el que no se emita ningún valor. Si por ejemplo se proporciona el número 100 como argumento y el primer valor del Observable se emite tras 50ms a partir del momento de la suscripción, dicho valor se reemitirá por el Observable resultante. Sin embargo, si transcurren 100ms sin que se emita un segundo valor, el flujo terminará con un error y se cancelará la suscripcón al Observable fuente. Estas comprobaciones se llevan a cabo durante el ciclo completo de vida del Observable - desde el momento en el que se realiza la suscripcón, hasta que se complete o se produzca un error. Por tanto, cada valor debe emitirse antes de que transcurra el intervalo de tiempo establecido desde la emisión del valor anterior.

Si el argumento proporcionado es una fecha, el Observable retornado se comporta de forma distinta. Lanzará un error si el Observable no se completa antes de la fecha establecida. Esto quiere decir que, en este caso, los intervalos de tiempo entre la emisión de valores son irrelevantes. Si el Observable no se completa antes de la fecha establecida, se cancelará la suscripción al Observable fuente. A excepción de esto, el flujo resultante se comporta exactamente igual que el Observable fuente.

`timeout` puede recibir un Planificador como segundo parámetro. Se utiliza para planificar en qué momento llevará a cabo el Observable retornado las comprobaciones de si el Observable fuente ha emitido algún valor o se ha completado.

## Ejemplos

**Lanzar un error si no se presiona ninguna tecla en 5 segundos**

<a target="_blank" href="https://stackblitz.com/edit/docu-rxjs-timeout?file=index.ts">StackBlitz</a>

```typescript
import { fromEvent } from "rxjs";
import { timeout, map } from "rxjs/operators";

const key$ = fromEvent<KeyboardEvent>(document, "keydown");

key$
  .pipe(
    map(({ code }) => code),
    timeout(5000)
  )
  .subscribe(console.log, console.error);
// Salida: (5s) (Error) Error: Timeout has occurred
```

**Lanzar un error si una petición tarda más de x tiempo**

<a target="_blank" href="https://stackblitz.com/edit/docu-rxjs-timeout-2?file=index.ts">StackBlitz</a>

```typescript
import { of } from "rxjs";
import { concatMap, timeout, catchError, delay, map } from "rxjs/operators";
import { ajax } from "rxjs/ajax";

function getPokemonName(time: number) {
  return ajax.getJSON("https://pokeapi.co/api/v2/pokemon/4").pipe(
    map(({ name }) => name),
    // Se retrasa la emisión a propósito, para ver el efecto de timeout
    delay(time)
  );
}

const delay$ = of(5000, 4000, 2000);

delay$
  .pipe(
    concatMap((delay) =>
      getPokemonName(delay).pipe(
        // El Observable lanzará un error si no se emite un valor en 3s
        timeout(3000),
        // Se atrapa el error para que el flujo continúe
        catchError((err) => of(`${err} after ${delay}ms`))
      )
    )
  )
  .subscribe(console.log);
// Salida: 'TimeoutError: Timeout has occurred after 5000ms', 'TimeoutError: Timeout has occurred after 4000ms', 'charmander'
```

### Ejemplos de la documentación oficial

**Comprobar si los valores se emiten antes de que transcurra cierto intervalo de tiempo**

```javascript
import { interval } from "rxjs";
import { timeout } from "rxjs/operators";

const seconds = interval(1000);

seconds
  .pipe(timeout(1100)) // Se utilizará un intervalo algo mayor, por si `interval` emitiese algo más tarde de lo previsto
  .subscribe(
    (value) => console.log(value), // Emitirá números, justo como haría`interval`
    (err) => console.log(err) // Nunca se llamará
  );

seconds.pipe(timeout(900)).subscribe(
  (value) => console.log(value), // Nunca se llamará
  (err) => console.log(err) // Emitirá un error incluso antes de que se emita el primer valor, ya que esto ocurre después del intervalo de 900ms
);
```

**Utilizar una fecha para comprobar si el Observable se ha completado**

```javascript
import { interval } from "rxjs";
import { timeout } from "rxjs/operators";

const seconds = interval(1000);

seconds.pipe(timeout(new Date("December 17, 2020 03:24:00"))).subscribe(
  (value) => console.log(value), // Will emit values as regular `interval` would
  // until December 17, 2020 at 03:24:00.
  (err) => console.log(err) // Emitirá un error el día December 17, 2020 a las 03:24:00,
  // ya que el Observable no se habrá completado
);
```

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/timeout.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/timeout">Documentación oficial en inglés</a>
