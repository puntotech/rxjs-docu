# refCount

<h2> Hace que un ConnectableObservable se comporte como un Observable normal, y automatiza la forma de conectarse a él</h2>

💡 Utilizar el operador <a href="/operators/multicasting/share">share</a> es exactamente igual que utilizar el operador <a href="/operators/multicasting/publish">publish</a> (convirtiendo el Observable en uno caliente) en conjunto con el operador refCount.

<details>
<summary>Signatura</summary>

### Firma

`refCount<T>(): MonoTypeOperatorFunction<T>`

### Parámetros

No recibe ningún parámetro.

## Retorna

`MonoTypeOperatorFunction<T>`

</details>

## Descripción

Internamente, cuenta las suscripciones al Observable y se suscribe (una sola vez) a la fuente si el número de suscripciones es mayor que 0. Si el número de suscripciones es menor que 1, se cancela la suscripción a la fuente. De esta manera se puede garantizar que cualquier operador anterior al `refCount` publicado se ejecuta una única vez por cada evento, independientemente del número de suscriptores del Observable objetivo.

<img src="/assets/images/marble-diagrams/multicasting/refCount.png" alt="Diagrama de canicas del operador refCount">

## Ejemplos

### Ejemplo de la documentación oficial

En el siguiente ejemplo hay dos Observables intervalo transformados en Observables conectables mediante el operador `publish`. El primero utiliza el operador `refCount`, mientras que el segundo no.
Se debe tener en cuenta que un Observable conectable no hace nada hasta que no se haga una llamada a su función `connect`.

```javascript
import { interval } from "rxjs";
import { tap, publish, refCount } from "rxjs/operators";

// Transformar el Observable interval en un ConnectableObservable (caliente)
const refCountInterval = interval(400).pipe(
  tap((num) => console.log(`refCount ${num}`)),
  publish(),
  refCount()
);

const publishedInterval = interval(400).pipe(
  tap((num) => console.log(`publish ${num}`)),
  publish()
);

refCountInterval.subscribe();
refCountInterval.subscribe();
/* 'refCount 0' -----> 'refCount 1' -----> etc.
 Todas las subscripciones recibirán el mismo valor y tanto tap como cualquier otro operador
 que esté antes del operador publish se ejecutará una vez por cada evento, independientemente del número de suscripciones
*/

publishedInterval.subscribe();
// No ocurre nada hasta que no se llame a la función connect() del Observable
```

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/refCount.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/refCount">Documentación oficial en inglés</a>
