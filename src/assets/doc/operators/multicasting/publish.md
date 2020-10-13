<div class="page-heading">

# publish

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/publish.ts">
<svg>
  <use xlink:href="/assets/icons/github.svg#github"></use>
</svg>
</a>
</div>

### Retorna un ConnectableObservable, que es un Observable que espera a que se haga una llamada a su método `connect` antes de empezar a emitir valores a sus Observadores

### Firma

`publish<T, R>(selector?: OperatorFunction<T, R>): MonoTypeOperatorFunction<T> | OperatorFunction<T, R>`

### Parámetros

<table>
<tr><td>selector</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Función de selección opcional que puede utilizar la secuencia fuente multidifundida tantas veces como sean necesarias, sin provocar múltiples suscripciones a la secuencia fuente. Los suscriptores al flujo recibirán todas las notificaciones de la fuente a partir del momento de la suscripción.
</td></tr>
</table>

### Retorna

`MonoTypeOperatorFunction<T> | OperatorFunction<T, R>`: Un `ConnectableObservable` que, cuando se hace una llamada a su método `connect`, hace que el Observable fuente emita valores a sus Observadores.

## Descripción

Convierte un Observable frío en un Observable caliente.

<img src="assets/images/marble-diagrams/multicasting/publish.png" alt="Diagrama de canicas del operador publish">

## Ejemplos

<!-- [StackBlitz]()

```javascript

``` -->

### Ejemplos de la documentación oficial

Convertir al Observable fuente en caliente, unir cada Observable interno en uno solo y suscribirse al Observable resultante

```javascript
import { of, zip, interval, merge } from "rxjs";
import { map, publish, tap } from "rxjs/operators";

const source$ = zip(interval(2000), of(1, 2, 3, 4, 5, 6, 7, 8, 9)).pipe(
  map((values) => values[1])
);

source$
  .pipe(
    publish((multicasted$) =>
      merge(
        multicasted$.pipe(tap((x) => console.log("Flujo 1:", x))),
        multicasted$.pipe(tap((x) => console.log("Flujo 2:", x))),
        multicasted$.pipe(tap((x) => console.log("Flujo 3:", x)))
      )
    )
  )
  .subscribe();

// Cada 2 segundos:
// 'Flujo 1: 1'
// 'Flujo 2: 1'
// 'Flujo 3: 1'
// ...
// 'Flujo 1: 9'
// 'Flujo 2: 9'
// 'Flujo 3: 9'
```

## Sobrecargas

`publish(): UnaryFunction<Observable<T>, ConnectableObservable<T>>`

### Parámetros

No recibe ningún parámetro.

### Retorna

`UnaryFunction<Observable<T>, ConnectableObservable<T>>`

`publish(selector: (shared: Observable<T>) => O): OperatorFunction<T, ObservedValueOf<O>>`

### Parámetros

<table>
<tr><td>selector</td><td>Tipo: <code>(shared: Observable) => O</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, ObservedValueOf<O>>`

`publish(selector: MonoTypeOperatorFunction<T>): MonoTypeOperatorFunction<T>`

### Parámetros

<table>
<tr><td>selector</td><td>Tipo: <code>MonoTypeOperatorFunction</code>.</td></tr>
</table>

### Retorna

`MonoTypeOperatorFunction<T>`

## Recursos adicionales -

- <a target="_blank" href="https://rxjs.dev/api/operators/publish">Documentación oficial en inglés</a>
