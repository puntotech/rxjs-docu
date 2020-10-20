# retry

<h2 class="subtitle"> Reintenta una secuencia Observable un número determinado de veces en el caso de que ocurra un error</h2>

💡 retry es muy útil para reintentar peticiones HTTP

<details>
<summary>Signatura</summary>

### Firma

`retry<T>(count: number = -1): MonoTypeOperatorFunction<T>`

### Parámetros

<table>
<tr><td>count</td><td>Opcional. El valor por defecto es <code>-1</code>.
El número de reintentos que se harán antes de fallar.</td></tr>
</table>

### Retorna

`MonoTypeOperatorFunction<T>`: El Observable fuente modificado con la lógica de reintento.

</details>

## Descripción

Retorna un Observable que refleja el Observable fuente con la excepción de un error. Si el Observable fuente lanza un error, este operador se resuscribirá al Observable fuente durante un máximo de `count` veces, antes de propagar el error.

<img src="assets/images/marble-diagrams/error-handling/retry.png" alt="Diagrama de canicas del operador retry">

Todos los valores emitidos por el Observable fuente se emitirán en el Observable resultante, incluso aquellos que se emitan durante suscripciones fallidas. Por ejemplo, si un Observable emite los valores `[1, 2]` y falla, y al segundo intento consigue completarse, emitiendo los valores `[1, 2, 3, 4, 5]`, las notificaciones del Observable resultante serían: `[1, 2, 1, 2, 3, 4, 5, complete]`.

## Ejemplos

**Reintentar una petición Ajax 3 veces en el caso de que haya algún error**

<a target="_blank" href="https://stackblitz.com/edit/docu-rxjs-retry?file=index.ts">StackBlitz</a>

```javascript
import { retry } from "rxjs/operators";
import { ajax } from "rxjs/ajax";

const ghibliFilm$ = ajax.getJSON(`https://ghibliapi.herokuapp.com/fi`);

ghibliFilm$.pipe(retry(3)).subscribe(console.log, console.error);
// Salida: (error) Error: ajax error 404
```

**Utilizar `retry` junto a `catchError` para que, en el caso de que los tres reintentos de la petición Ajax fallen, el flujo continúe en lugar de acabar en error.**

<a target="_blank" href="https://stackblitz.com/edit/docu-rxjs-retry-2?file=index.ts">StackBlitz</a>

```javascript
import { catchError, concatMap, map, retry } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import { of } from "rxjs";

const pokemonId$ = of(-3, 5, 6);

function getPokemonName(id: number) {
  return ajax.getJSON(`https://pokeapi.co/api/v2/pokemon/${id}`).pipe(
    map(({ name }) => name),
    // Se reintentará 3 veces si ocurre un error
    retry(3),
    // En el caso de que los 3 reintentos fallen, se usa catchError para que el flujo continúe
    catchError((error) =>
      of(`Reintentado 3 veces, pero ha ocurrido un error: ${error.message}`)
    )
  );
}

pokemonId$
  .pipe(concatMap((id) => getPokemonName(id)))
  .subscribe(console.log, console.error, () => console.log("¡Completado!"));
/* Salida:
'Reintentado 3 veces, pero ha ocurrido un error: ajax error 404',
'charmeleon', 
'charizard', 
'¡Completado!' 
*/
```

### Ejemplo de la documentación oficial en inglés

```javascript
import { interval, of, throwError } from "rxjs";
import { mergeMap, retry } from "rxjs/operators";

const source = interval(1000);
const example = source.pipe(
  mergeMap((val) => {
    if (val > 5) {
      return throwError("Error!");
    }
    return of(val);
  }),
  // Reintentar 2 veces cuando se lance un error
  retry(2)
);

const subscribe = example.subscribe({
  next: (val) => console.log(val),
  error: (val) => console.log(`${val}: Retried 2 times then quit!`),
});

// Salida:
// 0..1..2..3..4..5..
// 0..1..2..3..4..5..
// 0..1..2..3..4..5..
// "Error!: Retried 2 times then quit!"
```

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/retry.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/retry">Documentación oficial en inglés</a>
