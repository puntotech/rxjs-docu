<div class="page-heading">

# multicast

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/multicast.ts">
<svg>
  <use xlink:href="/assets/icons/github.svg#github"></use>
</svg>
</a>
</div>

<h2 class="subtitle">Retorna un Observable que emite el resultado de invocar el selector especificado sobre los elementos emitidos por un ConnectableObservable, que comparte una sola suscripción al flujo subyacente</h2>

<details>
<summary>Signatura</summary>

### Firma

`multicast<T, R>(subjectOrSubjectFactory: Subject<T> | (() => Subject<T>), selector?: (source: Observable<T>) => Observable<R>): OperatorFunction<T, R>`

### Parámetros

<table>
<tr><td>subjectOrSubjectFactory</td><td>Función factoría para crear un Sujeto intermedio a partir del cual se multidifunden (comparten) las emisiones del Observable fuente a la función de selección, o un Sujeto al que proporcionarle las emisiones del Observable fuente.</td></tr>
<tr><td>selector</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Función de selección opcional que puede utilizar el flujo fuente multidifundido tantas veces como sean necesarias, sin provocar múltiples suscripciones al flujo fuente. Los suscriptores al flujo recibirán todas las notificaciones de la fuente a partir del momento de la suscripción.</td></tr>
</table>

### Retorna

`OperatorFunction<T, R>`: Un Observable que emite el resultado de invocar el selector sobre las emisiones de un `ConnectableObservable`, que comparte una sola suscripción al flujo subyacente.

</details>

## Descripción

<img src="assets/images/marble-diagrams/multicasting/multicast.png" alt="Diagrama de canicas del operador multicast">

## Ejemplos

<!-- [StackBlitz]()

```javascript

```

[StackBlitz]()

```javascript

``` -->

<details>
<summary>Sobrecargas</summary>
<div class="overload-container">

<div class="overload-section">

### Firma

`multicast(subject: Subject<T>): UnaryFunction<Observable<T>, ConnectableObservable<T>>`

### Parámetros

<table>
<tr><td>subject</td><td>Tipo: <code>Subject</code>.</td></tr>
</table>

### Retorna

`UnaryFunction<Observable<T>, ConnectableObservable<T>>`

</div>

<div class="overload-section">

### Firma

`multicast(subject: Subject<T>, selector: (shared: Observable<T>) => O): UnaryFunction<Observable<T>, ConnectableObservable<ObservedValueOf<O>>>`

### Parámetros

<table>
<tr><td>subject</td><td>Tipo: <code>Subject</code>.</td></tr>
<tr><td>selector</td><td>Tipo: <code>(shared: Observable) => O</code>.</td></tr>
</table>

### Retorna

`UnaryFunction<Observable<T>, ConnectableObservable<ObservedValueOf<O>>>`

</div>

<div class="overload-section">

### Firma

`multicast(subjectFactory: (this: Observable<T>) => Subject<T>): UnaryFunction<Observable<T>, ConnectableObservable<T>>`

### Parámetros

<table>
<tr><td>subjectFactory</td><td>Tipo: <code>(this: Observable) => Subject</code>.</td></tr>
</table>

### Retorna

`UnaryFunction<Observable<T>, ConnectableObservable<T>>`

</div>

<div class="overload-section">

### Firma

`multicast(SubjectFactory: (this: Observable<T>) => Subject<T>, selector: (shared: Observable<T>) => O): OperatorFunction<T, ObservedValueOf<O>>`

### Parámetros

<table>
<tr><td>SubjectFactory</td><td>Tipo: <code>(this: Observable) => Subject</code>.</td></tr>
<tr><td>selector</td><td>Tipo: <code>(shared: Observable) => O</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, ObservedValueOf<O>>`

</div>

</details>

## Recursos adicionales

- [Documentación oficial en inglés](https://rxjs.dev/api/operators/multicast)
