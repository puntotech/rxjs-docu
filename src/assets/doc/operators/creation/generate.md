<div class="page-heading">

# generate

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/generate.ts">
<svg>
  <use xlink:href="/assets/icons/github.svg#github"></use>
</svg>
</a>
</div>

<h2 class="subtitle"> Genera un Observable ejecutando un bucle impulsado por el estado que emite un elemento en cada iteración
</h2>

### Firma

`generate(initialState: S, condition: ConditionFunc<S>, iterate: IterateFunc<S>, scheduler?: SchedulerLike): Observable<S>`

### Parámetros

<table>
<tr><td>initialState</td><td>Estado inicial.</td></tr>
<tr><td>condition</td><td>Condición para finalizar la generación (al retornar falso).</td></tr>
<tr><td>iterate</td><td>Función de los pasos de la iteración.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Un Scheduler para planificar el bucle de generación. Si no se proporciona, por defecto se emitirá inmediatamente.</td></tr>
</table>

### Retorna

`Observable<S>`: La secuencia generada.

## Descripción

Se utiliza en lugar de hacer llamadas a `next` dentro de un bucle for.

<img src="assets/images/marble-diagrams/creation/generate.png" alt="Diagrama de canicas de generate">

generate allows you to create stream of values generated with a loop very similar to traditional for loop. First argument of generate is a beginning value. Second argument is a function that accepts this value and tests if some condition still holds. If it does, loop continues, if not, it stops. Third value is a function which takes previously defined value and modifies it in some way on each iteration. Note how these three parameters are direct equivalents of three expressions in regular for loop: first expression initializes some state (for example numeric index), second tests if loop can make next iteration (for example if index is lower than 10) and third states how defined value will be modified on every step (index will be incremented by one).

Return value of a generate operator is an Observable that on each loop iteration emits a value. First, condition function is ran. If it returned true, Observable emits currently stored value (initial value at the first iteration) and then updates that value with iterate function. If at some point condition returned false, Observable completes at that moment.

Optionally you can pass fourth parameter to generate - a result selector function which allows you to immediately map value that would normally be emitted by an Observable.

If you find three anonymous functions in generate call hard to read, you can provide single object to the operator instead. That object has properties: initialState, condition, iterate and resultSelector, which should have respective values that you would normally pass to generate. resultSelector is still optional, but that form of calling generate allows you to omit condition as well. If you omit it, that means condition always holds, so output Observable will never complete.

Both forms of generate can optionally accept a scheduler. In case of multi-parameter call, scheduler simply comes as a last argument (no matter if there is resultSelector function or not). In case of single-parameter call, you can provide it as a scheduler property on object passed to the operator. In both cases scheduler decides when next iteration of the loop will happen and therefore when next value will be emitted by the Observable. For example to ensure that each value is pushed to the observer on separate task in event loop, you could use async scheduler. Note that by default (when no scheduler is passed) values are simply emitted synchronously.

## Ejemplos

**Emitir los números del 1 al 10**

<a target="_blank" href="https://stackblitz.com/edit/docu-rxjs-generate?file=index.ts">StackBlitz</a>

```javascript
import { generate } from "rxjs";

const number$ = generate(
  1,
  (x) => x < 10,
  (x) => x + 1
);

number$.subscribe(console.log);
// Salida: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
```

**Emitir los números pares del 2 al 10, utilizando un objeto como parámetro**

<a target="_blank" href="https://stackblitz.com/edit/docu-rxjs-generate-2?file=index.ts">StackBlitz</a>

```javascript
import { generate } from "rxjs";

const evenNumber$ = generate({
  initialState: 2,
  condition: (x) => x <= 10,
  iterate: (x) => x + 2,
});

evenNumber$.subscribe((number) => console.log(number));
// Salida: 2, 4, 6, 8, 10
```

<details>
<summary>Sobrecargas</summary>
<div class="overload-container">

<div class="overload-section">

### Firma

`generate<T, S>(initialStateOrOptions: S | GenerateOptions<T, S>, condition?: ConditionFunc<S>, iterate?: IterateFunc<S>, resultSelectorOrObservable?: SchedulerLike | ResultFunc<S, T>, scheduler?: SchedulerLike): Observable<T>`

### Parámetros

<table>
<tr><td>initialStateOrOptions</td><td>Tipo: <code>S | GenerateOptions</code>.</td></tr>
<tr><td>condition</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>ConditionFunc</code>.</td></tr>
<tr><td>iterate</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>IterateFunc</code>.</td></tr>
<tr><td>resultSelectorOrObservable</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike | ResultFunc</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`Observable<T>`

</div>

<div class="overload-section">

### Firma

`generate(initialState: S, condition: ConditionFunc<S>, iterate: IterateFunc<S>, resultSelector: ResultFunc<S, T>, scheduler?: SchedulerLike): Observable<T>`

Genera una secuencia observable ejecutando un bucle impulsado por el estado para producir los elementos de la secuencia, utilizando el planificador especificado para enviar los mensajes.

### Parámetros

<table>
<tr><td>initialState</td><td>Estado inicial.</td></tr>
<tr><td>condition</td><td>Condición para finalizar la generación (al retornar falso).</td></tr>
<tr><td>iterate</td><td>Función de los pasos de la iteración.</td></tr>
<tr><td>resultSelector</td><td>Función de selección de los resultados producidos en la secuencia. (Obsoleta)</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Un Scheduler para planificar el bucle de generación. Si no se proporciona, por defecto se emitirá inmediatamente.</td></tr>
</table>

### Retorna

`Observable<T>`: La secuencia generada.

</div>

<div class="overload-section">

### Firma

`generate(options: GenerateBaseOptions<S>): Observable<S>`

Genera una secuencia observable ejecutando un bucle impulsado por el estado para producir los elementos de la secuencia, utilizando el planificador especificado para enviar los mensajes. Esta sobrecarga acepta un objeto `options` que puede contener `initialState`, `iterate`, `condition` y `scheduler`.

### Parámetros

<table>
<tr><td>options</td><td>Un objeto que debe contener <code>initialState</code> y <code>iterate</code>, y que puede contener <code>condition</code> y <code>scheduler</code> de manera opcional.</td></tr>
</table>

### Retorna

`Observable<S>`: La secuencia generada.

</div>

<div class="overload-section">

### Firma

`generate(options: GenerateOptions<T, S>): Observable<T>`

Genera una secuencia observable ejecutando un bucle impulsado por el estado para producir los elementos de la secuencia, utilizando el planificador especificado para enviar los mensajes. Esta sobrecarga acepta un objeto `options` que puede contener `initialState`, `iterate`, `condition`, `resultSelector` y `scheduler`.

### Parámetros

<table>
<tr><td>options</td><td>Un objeto que debe contener <code>initialState</code> y <code>iterate</code> y <code>resultSelector</code> y que puede contener <code>condition</code> y <code>scheduler</code> de manera opcional.</td></tr>
</table>

### Retorna

`Observable<T>`: La secuencia generada.

</div>

</div>
</details>

## Recursos adicionales

- [Documentación oficial en inglés](https://rxjs-dev.firebaseapp.com/api/index/function/generate)
