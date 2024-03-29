---
description: Reintenta una secuencia Observable cuando ocurre un error
---

# retryWhen

<details>

<summary>Signatura</summary>

#### Firma

`retryWhen<T>(notifier: (errors: Observable<any>) => Observable<any>): MonoTypeOperatorFunction<T>`

#### Parámetros

#### Retorna

`MonoTypeOperatorFunction<T>`: El Observable fuente modificado con la lógica de reintento.

</details>

## Descripción

Retorna un Observable que refleja el Observable fuente con la excepción de un error. Si el Observable fuente lanza un error, `retryWhen` emitirá el `Throwable` que provocó el error al Observable retornado por `notifier`. Si ese Observable hace una llamada a `complete` o a `error`, entonces este operador llamará a `complete` o a `error` en la suscripción hija. En caso contrario, `retryWhen` se resuscribirá al Observable fuente.

![Diagrama de canicas del operador retryWhen](assets/images/marble-diagrams/error-handling/retryWhen.png)

## Ejemplos

**Reintentar una secuencia Observable tras esperar un tiempo determinado, sin un número limitado de intentos**

[StackBlitz](https://stackblitz.com/edit/docu-rxjs-retrywhen?file=index.ts)

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

[StackBlitz](https://stackblitz.com/edit/docu-rxjs-retrywhen-2?file=index.ts)

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

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/retryWhen.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/operators/retryWhen)
