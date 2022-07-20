---
description: Decide qué Observable será suscrito en tiempo de suscripción
---

# iif

<details>

<summary>Signatura</summary>

#### Firma

`iif<T = never, F = never>(condition: () => boolean, trueResult: SubscribableOrPromise<T> = EMPTY, falseResult: SubscribableOrPromise<F> = EMPTY): Observable<T | F>`

#### Parámetros

Condition which Observable should be chosen.

#### Retorna

`Observable<T | F>`: Según la condición, devuelve el primer o el segundo Observable.

</details>

## Descripción

Es una sentencia if para Observables.

`iif` acepta una función `condition` y dos Observables. Cuando se realiza la suscripción a un Observable retornado por el operador, se llama a la función `condition`. Según el valor booleano que devuelva la función, el consumidor se suscribirá al primer Observable (si la condición es cierta) o al segundo Observable (si la condición es falsa.) Es posible que la función `condition` no retorna nada - en cuyo caso la condición será evaluada como falsa y se realizará la suscripción al segundo Observable.

Los Observables para ambos casos (_true_ y _false_) son opcionales. Si la condición indica la suscripción a un Observable que sea `undefined`, el flujo resultante se completará inmediatamente. Esto permite que, en lugar de controlar a qué Observable se realizará la suscripción, se decida en tiempo de ejecución si un Observable tiene o no acceso a un determinado Observable.

En el caso de tener lógica más compleja que requiera decidir entre más de dos Observables, el operador `defer` probablemente sea una opción mejor. De hecho, el comportamiento del operador `iif` se puede implementar fácilmente con el operador `defer`, y existe únicamente por razones de conveniencia y legibilidad.

## Ejemplos

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

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/iif.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/index/function/iif)
