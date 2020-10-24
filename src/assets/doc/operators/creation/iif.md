# iif

<h2 class="subtitle"> Decide qué Observable será suscrito en tiempo de suscripción
</h2>

<details>
<summary>Signatura</summary>

### Firma

`iif<T = never, F = never>(condition: () => boolean, trueResult: SubscribableOrPromise<T> = EMPTY, falseResult: SubscribableOrPromise<F> = EMPTY): Observable<T | F>`

### Parámetros

<table>
<tr><td>condition</td>Condition which Observable should be chosen.<td></td></tr>
<tr><td>trueResult</td><td>Opcional. El valor por defecto es <code>EMPTY</code>.
Tipo: <code>SubscribableOrPromise</code>.</td></tr>
<tr><td>falseResult</td><td>Opcional. El valor por defecto es <code>EMPTY</code>.
Tipo: <code>SubscribableOrPromise</code>.</td></tr>
</table>

### Retorna

`Observable<T | F>`: Según la condición, devuelve el primer o el segundo Observable.

</details>

## Descripción

Es una sentencia if para Observables.

`iif` acepta una función `condition` y dos Observables. Cuando se realiza la suscripción a un Observable retornado por el operador, se llama a la función `condition`. Según el valor booleano que devuelva la función, el consumidor se suscribirá al primer Observable (si la condición es cierta) o al segundo Observable (si la condición es falsa.) Es posible que la función `condition` no retorna nada - en cuyo caso la condición será evaluada como falsa y se realizará la suscripción al segundo Observable.

Los Observables para ambos casos (_true_ y _false_) son opcionales. Si la condición indica la suscripción a un Observable que sea `undefined`, el flujo resultante se completará inmediatamente. Esto permite que, en lugar de controlar a qué Observable se realizará la suscripción, se decida en tiempo de ejecución si un Observable tiene o no acceso a un determinado Observable.

En el caso de tener lógica más compleja que requiera decidir entre más de dos Observables, el operador `defer` probablemente sea una opción mejor. De hecho, el comportamiento del operador `iif` se puede implementar fácilmente con el operador `defer`, y existe únicamente por razones de conveniencia y legibilidad.

## Ejemplos

<!-- TODO change example -->

<!-- Realizar una u otra petición en función de si el número emitido por el Observable fuente es par o impar

<a target="_blank" href="https://stackblitz.com/edit/rxjs-iif-1?file=index.ts">StackBlitz</a>

```javascript
import { iif, range } from "rxjs";
import { mergeMap, map } from "rxjs/operators";
import { ajax } from "rxjs/ajax";

function getPokemonName(id: number) {
  return ajax
    .getJSON(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .pipe(map(({ name }) => name));
}

function getRickMortyCharacterName(id: number) {
  return ajax
    .getJSON(`https://rickandmortyapi.com/api/character/${id}`)
    .pipe(map(({ name }) => name));
}

range(1, 4)
  .pipe(
    mergeMap((n) =>
      iif(() => n % 2 === 0, getPokemonName(n), getRickMortyCharacterName(n))
    )
  )
  .subscribe(console.log, console.error);
// Salida: Rick Sanchez, ivysaur, Summer Smith, charmander
``` -->

## Ejemplos de la documentación oficial

**Cambia en tiempo de ejecución qué Observable será suscrito**

```javascript
import { iif, of } from "rxjs";

let subscribeToFirst;
const firstOrSecond = iif(() => subscribeToFirst, of("first"), of("second"));

subscribeToFirst = true;
firstOrSecond.subscribe((value) => console.log(value));

// Logs:
// "first"

subscribeToFirst = false;
firstOrSecond.subscribe((value) => console.log(value));

// Logs:
// "second"
```

**Controlar el acceso a un Observable**

```javascript
let accessGranted;
const observableIfYouHaveAccess = iif(
  () => accessGranted,
  of("It seems you have an access...") // Note that only one Observable is passed to the operator.
);

accessGranted = true;
observableIfYouHaveAccess.subscribe(
  (value) => console.log(value),
  (err) => {},
  () => console.log("The end")
);

// Logs:
// "It seems you have an access..."
// "The end"

accessGranted = false;
observableIfYouHaveAccess.subscribe(
  (value) => console.log(value),
  (err) => {},
  () => console.log("The end")
);

// Logs:
// "The end"
```

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/iif.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/index/function/iif">Documentación oficial en inglés</a>
