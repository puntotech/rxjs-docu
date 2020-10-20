# defer

<h2 class="subtitle"> Crea un Observable que, al ser suscrito, llama a una factoría Observable para crear otro Observable nuevo por cada suscriptor

<details> 
<summary>Signatura</summary>

### Firma

`defer<R extends ObservableInput<any> | void>(observableFactory: () => R): Observable<ObservedValueOf<R>>`

### Parámetros

<table>
<tr><td>observableFactory</td><td>La función de factoría Observable que se invoca cada vez que un Observador se suscribe al Observable fuente.
Puede retornar una Promesa, que se convertirá en Observable sobre la marcha.</td></tr>
</table>

### Retorna

`Observable<ObservedValueOf<R>>`: Un Observable cuyos Observadores disparan la invocación de la función factoría Observable proporcionada al suscribirse.

</details>

## Descripción

El Observable se crea de forma diferida, es decir, solamente se crea cuando un Observador se suscribe a él.

<img class="marble-diagram" src="assets/images/marble-diagrams/creation/defer.png" alt="Diagrama de canicas de defer">

`defer` nos permite crear Observables únicamente cuando un Observador se suscribe, y crear un Observable nuevo para cada Observador.

Espera a que un Observador se suscriba a él, y entonces genera un Observable nuevo, normalmente mediante una función factoría Observable.

Este proceso se lleva a cabo para cada suscriptor, por lo que, aunque cada suscriptor crea que se está suscribiendo al mismo Observable, en realidad cada suscriptor recibe su propio Observable.

## Ejemplos

**Emitir la fecha/hora en el momento de la suscripción**

<a target="_blank" href="https://stackblitz.com/edit/docu-rxjs-defer?file=index.ts">StackBlitz</a>

```javascript
import { defer, of } from "rxjs";

const deferredTime$ = defer(() => of(new Date()));

deferredTime$.subscribe(console.log);
// Salida: La fecha en el momento de la suscripción
```

**Crear un Observable que emita una fruta distinta cada vez que un observador se suscribe a él**

<a target="_blank" href="https://stackblitz.com/edit/docu-rxjs-defer-2?file=index.ts">StackBlitz</a>

```javascript
import { defer, of } from "rxjs";

const fruits = ["Cereza", "Fresa", "Mora", "Arándano"];

function getRandomFruit() {
  return fruits[Math.floor(Math.random() * 3)];
}

// Cada suscriptor a este Observable recibirá SIEMPRE la misma fruta, ya que la función getRandomFruit se ejecuta solo una vez, en el momento en el que se crea el Observable
const randomFruit$ = of(getRandomFruit());

// Cada suscriptor a este Observable recibirá una fruta DISTINTA cada vez, ya que la función getRandomFruit se ejecuta cada vez que nos suscribimos
const randomFruitForReal$ = defer(() => of(getRandomFruit()));

randomFruit$.subscribe(console.log);
// Salida: Cereza
randomFruit$.subscribe(console.log);
// Salida: Cereza

randomFruitForReal$.subscribe(console.log);
// Salida: Fresa
randomFruitForReal$.subscribe(console.log);
// Salida: Mora
```

### Ejemplo de la documentación oficial

**Suscribirse a un Observable de clicks o a un Observable intervalo, de forma aleatoria**

```javascript
import { defer, fromEvent, interval } from "rxjs";

const clicksOrInterval = defer(function () {
  return Math.random() > 0.5 ? fromEvent(document, "click") : interval(1000);
});
clicksOrInterval.subscribe((x) => console.log(x));

// Salida:
// Si el resultado de Math.random() es mayor que 0.5 se suscribirá al Observable de clicks. Si el resultado es menor que 0.5 se suscribirá al Observable intervalo
```

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/defer.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/index/function/defer">Documentación oficial en inglés</a>
