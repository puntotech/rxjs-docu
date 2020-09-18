# Introducción

<hr>
<br>
RxJS es una biblioteca para componer programas asíncronos y basados en eventos, mediante secuencias observables. Proporciona un tipo _core_, el Observable, varios tipos satélite (Observer, Schedulers, Subjects) y operadores inspirados por [Array#extras](https://developer.mozilla.org/en-US/docs/Archive/Web/JavaScript/New_in_JavaScript/1.6) (map, filter, reduce, every etc.) para manejar eventos asíncronos como si fuesen colecciones.

> Podemos considerar a RxJS como el Lodash para eventos.

ReactiveX combina el [patrón Observador](<https://es.wikipedia.org/wiki/Observer_(patr%C3%B3n_de_dise%C3%B1o)>) con el [patrón Iterador](<https://es.wikipedia.org/wiki/Iterador_(patr%C3%B3n_de_dise%C3%B1o)>) y la [programación funcional con colecciones](https://martinfowler.com/articles/collection-pipeline/#NestedOperatorExpressions), constituyendo así la solución ideal para manejar secuencias de eventos.

Los conceptos esenciales de RxJS que resuelven el manejo asíncrono de eventos son los siguientes:

- Observable: representa la idea de una colección invocable de valores futuros o eventos.
- Observer: es una colleción de _callbacks_ que sabe cómo escuchar a los valores proporcionados por el Observable.
- Suscripción: representa la ejecución de un Observable, es muy útil a la hora de cancelar la ejecución.
- Operadores: son funciones puras que permiten enfocar el manejo de las colecciones desde un estilo de programación funcional, con operaciones como `map`, `filter`, `concat`, `reduce` etc.
- Subject: es el equivalente a un EventEmitter, y la única manera de _multicastear_ un valor o un evento a múltiples Observers.
- Schedulers: son despachadores centralizados para controlar la concurrencia, permitiéndonos coordinar cuándo ocurre la computación. Ej: `setTimeout`, `requestAnimationFrame` u otros.

## Primeros Ejemplos

Normalmente, tenemos que registrar _event listeners_.

```javascript
document.addEventListener("click", () => console.log("Clicked!"));
```

En lugar de hacerlo así, RxJS nos permite crear un Observable:

```javascript
import { fromEvent } from "rxjs";

fromEvent(document, "click").subscribe(() => console.log("Clicked!"));
```

## Pureza

Lo que hace que RxJS sea tan potente es su habilidad para producir valores mediante funciones puras. Esto equivale a un código menos propenso a errores.

Normalmente, tendríamos que crear una función impura, planteando la posibilidad de que otros fragmentos de nuestro código puedan interferir con nuestro estado.

```javascript
let count = 0;
document.addEventListener("click", () =>
  console.log(`Clicked ${++count} times`)
);
```

Usando RxJS, podemos aislar el estado.

```javascript
import { fromEvent } from "rxjs";
import { scan } from "rxjs/operators";

fromEvent(document, "click")
  .pipe(scan((count) => count + 1, 0))
  .subscribe((count) => console.log(`Clicked ${count} times`));
```

El operador scan funciona justo igual que el reduce para arrays. Toma un valor expuesto a una callback. El valor retornado por la callback se convierte en el siguiente valor expuesto la siguiente vez que la callback sea ejecutada.

## Flow

RxJS tiene un rango completo de operadores que nos permiten controlar cómo los eventos fluyen a través de nuestros Observables.

Así es como permitiríamos únicamente un click por segundo, en JavaScript vainilla:

```javascript
let count = 0;
let rate = 1000;
let lastClick = Date.now() - rate;
document.addEventListener("click", () => {
  if (Date.now() - lastClick >= rate) {
    console.log(`Clicked ${++count} times`);
    lastClick = Date.now();
  }
});
```

Con RxJS:

```javascript
import { fromEvent } from "rxjs";
import { throttleTime, scan } from "rxjs/operators";

fromEvent(document, "click")
  .pipe(
    throttleTime(1000),
    scan((count) => count + 1, 0)
  )
  .subscribe((count) => console.log(`Clicked ${count} times`));
```

Otros operadores para el control del flujo son filter, delay, debouncetime, take, takeUntil, distinct, distinctUntilChanged etc.

## Valores

Podemos transformar los valores pasadores a través de nuestros Observables.

Aquí tenemos un ejemplo de cómo añadir la posición x del ratón en cada click, en JavaScript vainilla:

```javascript
let count = 0;
const rate = 1000;
let lastClick = Date.now() - rate;
document.addEventListener("click", (event) => {
  if (Date.now() - lastClick >= rate) {
    count += event.clientX;
    console.log(count);
    lastClick = Date.now();
  }
});
```

Con RxJS:

```javascript
import { fromEvent } from "rxjs";
import { throttleTime, map, scan } from "rxjs/operators";

fromEvent(document, "click")
  .pipe(
    throttleTime(1000),
    map((event) => event.clientX),
    scan((count, clientX) => count + clientX, 0)
  )
  .subscribe((count) => console.log(count));
```

Otros operadores productores de valores son pluck, pairwise, sample etc.
