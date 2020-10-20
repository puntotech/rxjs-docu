# timeoutWith

<h2 class="subtitle"> Ocurre un error si el Observable no emite ningún valor antes de que transcurra un intervalo de tiempo, en cuyo caso se suscribe al segundo Observable.
</h2>

<details>
<summary>Signatura</summary>

### Firma

`timeoutWith<T, R>(due: number | Date, withObservable: any, scheduler: SchedulerLike = async): OperatorFunction<T, T | R>`

### Parámetros

<table>
<tr><td>due</td><td>Un número especificando el periodo en el que el Observable tiene que emitir un valor, o una fecha especificando antes de cuándo debe completarse el Observable</td></tr>
<tr><td>withObservable</td><td>Un Observable que será suscrito si el Observable fuente no pasa la comprobación del *timeout*.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>async</code>.
El planificador que controla cuándo ocurren las comprobaciones de *timeout*.</td></tr>
</table>

### Retorna

`OperatorFunction<T, T | R>`: Un Observable que refleja el comportamiento de la fuente o, cuando no supera la comprobación del _timeout_, de un segundo Observable proporcionado por parámetros.

</details>

## Descripción

Es una versión del operador `timeout` que permite especificar un Observable comodín.

<img src="assets/images/marble-diagrams/utility/timeoutWith.png" alt="Diagrama de canicas del operador timeoutWith">

`timeoutWith` es una variante del operador `timeout`. Se comporta exactamente igual, recibe como primer argumento un número o una fecha, que controlan cuándo se deben emitir los valores del Observable fuente o cuando debe completarse, respectivamente.

La única diferencia es que recibe un segundo parámetro obligatorio. Este parámetro debe ser un Observable que será suscrito cuando el Observable fuente no supere cualquiera de las comprobaciones de _timeout_. Por tanto, donde el operador `timeout` emite un error, `timeoutWith` empieza a emitir valores de un segundo Observable. Se debe tener en cuenta que no se realizan comprobaciones de _timeout_ al Observable comodín, por lo que este puede emitir valores y completarse en cualquier momento. Desde el momento en el que ocurre la segunda suscripción, el Observable retornado por `timeoutWith` se limita a reflejar el Observable comodín. Cuando el flujo comodín se complete, también lo hará el Observable retornado por `timeoutWith`.

También se puede proporcionar un Planificador como tercer argumento opcional, que en el caso del operador `timeout` se proporciona como segundo argumento. Se utiliza para planificar las comprobaciones de _timeout_, y en consecuencia, cuándo se realizará la suscripción al segundo Observable, ya que la suscripción ocurre inmediatamente después de una comprobación no superada.

## Ejemplos

**Emitir una secuencia de números si no se presiona ninguna tecla en 5s**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-tpkuum?file=index.ts">StackBlitz</a>

```typescript
import { interval, fromEvent } from "rxjs";
import { timeoutWith, map, tap } from "rxjs/operators";

const key$ = fromEvent<KeyboardEvent>(document, "keydown");

const number = interval(1000);

key$
  .pipe(
    map(({ code }) => code),
    timeoutWith(5000, number)
  )
  .subscribe(console.log, console.error);
// Salida: (Presionar tecla) KeyX (5s) 0, 1, 2, 3, 4...
```

**Emitir un mensaje en caso de que ocurra el _timeout_ de una petición**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-timeoutwith-2?file=index.ts">StackBlitz</a>

```javascript
import { of } from "rxjs";
import { concatMap, timeoutWith, delay, map } from "rxjs/operators";
import { ajax } from "rxjs/ajax";

function getPokemonName(time: number) {
  return ajax.getJSON("https://pokeapi.co/api/v2/pokemon/4").pipe(
    map(({ name }) => name),
    delay(time)
  );
}

const delay$ = of(5000, 4000, 2000);

delay$
  .pipe(
    concatMap((delay) =>
      getPokemonName(delay).pipe(
        timeoutWith(3000, of("Ha ocurrido un timeout"))
      )
    )
  )
  .subscribe(console.log);
// Salida: 'Ha ocurrido un timeout', 'Ha ocurrido un timeout', 'charmander'
```

### Ejemplo de la documentación oficial

**Proporcionar un Observable comodín**

```javascript
import { interval } from "rxjs";
import { timeoutWith } from "rxjs/operators";

const seconds = interval(1000);
const minutes = interval(60 * 1000);

seconds.pipe(timeoutWith(900, minutes)).subscribe(
  (value) => console.log(value), // After 900ms, will start emitting `minutes`,
  // since first value of `seconds` will not arrive fast enough.
  (err) => console.log(err) // Would be called after 900ms in case of `timeout`,
  // but here will never be called.
);
```

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/timeoutWith.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/timeoutWith">Documentación oficial en inglés</a>
