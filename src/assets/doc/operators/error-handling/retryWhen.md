# retryWhen

<h2 class="subtitle"> Reintenta una secuencia Observable cuando ocurre un error
</h2>

<details>
<summary>Signatura</summary>

### Firma

`retryWhen<T>(notifier: (errors: Observable<any>) => Observable<any>): MonoTypeOperatorFunction<T>`

### Parámetros

<table>
<tr><td>notifier</td><td>Recibe un Observable de notificaciones con las que el usuario puede hacer una llamada a <code>complete</code> o a <code>error</code>, abortando el reintento.</td></tr>
</table>

### Retorna

`MonoTypeOperatorFunction<T>`: El Observable fuente modificado con la lógica de reintento.

</details>

## Descripción

Retorna un Observable que refleja el Observable fuente con la excepción de un error. Si el Observable fuente lanza un error, `retryWhen` emitirá el `Throwable` que provocó el error al Observable retornado por `notifier`. Si ese Observable hace una llamada a `complete` o a `error`, entonces este operador llamará a `complete` o a `error` en la suscripción hija. En caso contrario, `retryWhen` se resuscribirá al Observable fuente.

<img src="assets/images/marble-diagrams/error-handling/retryWhen.png" alt="Diagrama de canicas del operador retryWhen">

## Ejemplos

**Reintentar una secuencia Observable tras esperar un tiempo determinado, sin un número limitado de intentos**

<a target="_blank" href="https://stackblitz.com/edit/docu-rxjs-retrywhen?file=index.ts">StackBlitz</a>

```javascript
import { interval, timer, throwError } from "rxjs";
import { map, tap, retryWhen, delay } from "rxjs/operators";

const number$ = interval(1000);
const delayMilliseconds = 3000;

number$
  .pipe(
    map((n) => {
      if (n > 5) {
        throw "Número demasiado alto";
      }
      return n;
    }),
    retryWhen((error$) =>
      error$.pipe(
        tap((err) => console.log(`Ha ocurrido un error: ${err}`)),
        // Reintentar después de 3s
        delay(delayMilliseconds)
      )
    )
  )
  .subscribe(console.log);
// Salida: 0, 1, 2, 3, 4, 5, Ha ocurrido un error: Número demasiado alto (3s después se repite el proceso) 0, 1...
```

**Reintentar una secuencia Observable tras esperar un tiempo determinado, con un número limitado de intentos**

<a target="_blank" href="https://stackblitz.com/edit/docu-rxjs-retrywhen-2?file=index.ts">StackBlitz</a>

```javascript
import {
  catchError,
  concatMap,
  map,
  mergeMap,
  retryWhen,
} from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import { of, throwError, timer } from "rxjs";

const pokemonId$ = of(-3, 5, 6);

const maxTries = 2;
const delayMilliseconds = 3000;

function getPokemonName(id: number) {
  return ajax.getJSON(`https://pokeapi.co/api/v2/pokemon/${id}`).pipe(
    map(({ name }) => name),
    retryWhen((error$) =>
      error$.pipe(
        mergeMap((error, tries) =>
          // Si no se han gastado todos los intentos, se volverá a reintentar. En caso contrario, se lanzará un error
          tries < maxTries ? timer(delayMilliseconds) : throwError(error)
        )
      )
    ),
    // Capturando el error
    catchError((error) =>
      of(
        `Reintentado ${maxTries} veces, con un retraso de ${delayMilliseconds}ms, pero ha ocurrido un error: ${error.message}`
      )
    )
  );
}

pokemonId$
  .pipe(concatMap((id) => getPokemonName(id)))
  .subscribe(console.log, console.error, () => console.log("¡Completado!"));
// Salida: 'Reintentado 2 veces, con un retraso de 3000ms, pero ha ocurrido un error: ajax error 404', 'charmeleon', 'charizard', '¡Completado!'
```

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/retryWhen.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/retryWhen">Documentación oficial en inglés</a>
