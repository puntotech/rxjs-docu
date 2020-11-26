# bindCallback

<h2 class="subtitle"> Convierte una API de una <em>callback</em> a una función que retorna un Observable</h2>

💡 Si la _callback_ sigue la convención de Node.js, es mejor utilizar [bindNodeCallback](/operators/creation/bindNodeCallback)

<details>
<summary>Signatura</summary>

### Firma

`bindCallback<T>(callbackFunc: Function, resultSelector?: Function | SchedulerLike, scheduler?: SchedulerLike): (...args: any[]) => Observable<T>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>Function</code>.</td></tr>
<tr><td>resultSelector</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>Function | SchedulerLike</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
El planificador con el que planificar las <em>callbacks</em>.</td></tr>
</table>

### Retorna

`(...args: any[]) => Observable<T>`: Una función que returna un Observable que emite los mismos valores que devolvería la _callback_.

</details>

## Descripción

Dada una función `f` de tipo `f(x, callback)` retornará una función `g`, que al ser llamada como `g(x)`, retornará un Observable.

`bindCallback` no es un operador, dado que ni su entrada ni su salida son Observables. De entrada recibe una función `func` que recibe algunos parámetros. El último parámetro debe ser una función _callback_, a la que `func` hará una llamada cuando haya terminado.

La salida de `bindCallback` es una función que recibe los mismos parámetros que `func`, exceptuando el último (la _callback_.) Cuando se llama a la función de salida con argumentos, esta retorna un Observable. Si la función `func` hace una llamada a su _callback_ con un solo argumento, el Observable resultante emitirá ese valor. Por el contrario, si se hace una llamada a la _callback_ con más de un valor, el Observable resultante emitirá un array con dichos valores como argumentos.

Es muy importante tener en cuenta que la llamada a la función de entrada `func` no se realiza a la vez que la llamada a la función de salida, sino cuando el Observable retornado por la función de salida es suscrito. Esto implica que si `func` hace una petición AJAX, dicha petición se hará cada vez que se hace una suscripción al Observable resultante, pero no antes.

El último parámetro opcional, `scheduler`, se puede utilizar para controlar en qué momento, a partir de la suscripción al Observable resultante, se hace la llamada a la función `func`. Por defecto, con la suscripción al Observable resultante se hace una llamada síncrona a la función `func`, pero si se utilizase `async` como último parámetro, la llamada a `func` se aplazaría. Si se utilizase el planificador `asyncScheduler` y se llamase a `subscribe` en el Observable resultante, todas las llamadas a funciones que se estuviesen ejecutando acabarían antes de que `func` se invocase.

Por defecto, los resultados que se le pasan a la _callback_ se emiten inmediatamente después de que `func` invoque a dicha _callback_. En particular, si la llamada a la _callback_ se hace de forma síncrona, entonces, con la suscripción al Observable resultante también se hará una llamada síncrona a la función `next`. Si se quiere aplazar esa llamada, se puede utilizar el `asyncScheduler`, como antes. Al utilizar `asyncScheduler`, se puede asegurar que `func` siempre haga la llamada a su _callback_ de forma asíncrona. Así, se puede evitar a Zalgo...

Nota: El Observable creado por la función de salida siempre emitirá un solo valor y se completará inmediatamente. Si `func` hace varias llamadas a la _callback_, los valores de llamadas subsecuentes no aparecerán en el flujo. Si se necesita escuchar a varias llamadas, probablemente sea mejor utilizar `fromEvent` o `fromEventPattern` en lugar que `bindCallback`.

Si `func`depende de algún contexto (`this`) que no esté ya vinculado, el contexto de `func` será el contexto que tenga la función de salida en el momento en el que se llame. En particular, si `func` se llama como un método de algún objeto, sin estar previamente vinculado a un contexto, se recomienda que el contexto de la función de salida se vincule a dicho objeto, para poder preservar el contexto de `func`.

Si la función de entrada hace una llamada a su _callback_ al 'estilo Node.js' (ej: el primer argumento de la _callback_ es un parámetro de error opcional señalando si la llamada ha fallado o no), `bindNodeCallback` proporciona una gestión de errores más adecuada y probablemente sea una mejor elección que `bindCallback`. `bindNodeCallback` trata a funciones de este tipo igual que a todas las demás, y los parámetros de error (independientemente de que se proporcionen o no) siempre se interpretarán como un argumento normal de _callback_.

## Ejemplos

### Ejemplos de la documentación oficial

Convertir la función `getJSON` de jQuery a una API Observable

```javascript
import { bindCallback } from 'rxjs';
import \* as jQuery from 'jquery';

// Suponiendo que se tenga jQuery.getJSON('/my/url', callback)
const getJSONAsObservable = bindCallback(jQuery.getJSON);
const result = getJSONAsObservable('/my/url');
result.subscribe(x => console.log(x), e => console.error(e));
```

Recibir un array de argumentos pasados a una callback

```javascript
import { bindCallback } from "rxjs";

const someFunction = (a, b, c) => {
  console.log(a); // 5
  console.log(b); // 'algún string'
  console.log(c); // {someProperty: 'algúnValor'}
};

const boundSomeFunction = bindCallback(someFunction);
boundSomeFunction().subscribe((values) => {
  console.log(values); // [5, 'algún string', {someProperty: 'algúnValor'}]
});
```

Comparar el comportamiento con y sin `asyncScheduler`

```javascript
import { bindCallback } from "rxjs";

function iCallMyCallbackSynchronously(cb) {
  cb();
}

const boundSyncFn = bindCallback(iCallMyCallbackSynchronously);
const boundAsyncFn = bindCallback(
  iCallMyCallbackSynchronously,
  null,
  Rx.Scheduler.async
);

boundSyncFn().subscribe(() => console.log("Soy sync!"));
boundAsyncFn().subscribe(() => console.log("Soy async!"));
console.log("Ha ocurrido esto...");

// Salida:
// Soy sync!
// Ha ocurrido esto...
// Soy async!
```

Usar `bindCallback` con un método de un objeto

```javascript
import { bindCallback } from "rxjs";

const boundMethod = bindCallback(someObject.methodWithCallback);
boundMethod
  .call(someObject) // make sure methodWithCallback has access to someObject
  .subscribe(subscriber);
```

<details>
<summary>Sobrecargas</summary>
<div class="overload-container">

<div class="overload-section">

### Firma

`bindCallback(callbackFunc: Function, resultSelector: Function, scheduler?: SchedulerLike): (...args: any[]) => Observable<any>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>Function</code>.</td></tr>
<tr><td>resultSelector</td><td>Tipo: <code>Function</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(...args: any[]) => Observable<any>`

</div>

<div class="overload-section">

### Firma

`bindCallback(callbackFunc: (callback: (res1: R1, res2: R2, res3: R3, res4: R4, ...args: any[]) => any) => any, scheduler?: SchedulerLike): () => Observable<any[]>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(callback: (res1: R1, res2: R2, res3: R3, res4: R4, ...args: any[]) => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`() => Observable<any[]>`

</div>

<div class="overload-section">

### Firma

`bindCallback(callbackFunc: (callback: (res1: R1, res2: R2, res3: R3) => any) => any, scheduler?: SchedulerLike): () => Observable<[R1, R2, R3]>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(callback: (res1: R1, res2: R2, res3: R3) => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`() => Observable<[R1, R2, R3]>`

</div>

<div class="overload-section">

### Firma

`bindCallback(callbackFunc: (callback: (res1: R1, res2: R2) => any) => any, scheduler?: SchedulerLike): () => Observable<[R1, R2]>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(callback: (res1: R1, res2: R2) => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`() => Observable<[R1, R2]>`

</div>

<div class="overload-section">

### Firma

`bindCallback(callbackFunc: (callback: (res1: R1) => any) => any, scheduler?: SchedulerLike): () => Observable<R1>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(callback: (res1: R1) => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`() => Observable<R1>`

</div>

<div class="overload-section">

### Firma

`bindCallback(callbackFunc: (callback: () => any) => any, scheduler?: SchedulerLike): () => Observable<void>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(callback: () => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`() => Observable<void>`

</div>

<div class="overload-section">

### Firma

`bindCallback(callbackFunc: (arg1: A1, callback: (res1: R1, res2: R2, res3: R3, res4: R4, ...args: any[]) => any) => any, scheduler?: SchedulerLike): (arg1: A1) => Observable<any[]>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, callback: (res1: R1, res2: R2, res3: R3, res4: R4, ...args: any[]) => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(arg1: A1) => Observable<any[]>`

</div>

<div class="overload-section">

### Firma

`bindCallback(callbackFunc: (arg1: A1, callback: (res1: R1, res2: R2, res3: R3) => any) => any, scheduler?: SchedulerLike): (arg1: A1) => Observable<[R1, R2, R3]>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, callback: (res1: R1, res2: R2, res3: R3) => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(arg1: A1) => Observable<[R1, R2, R3]>`

</div>

<div class="overload-section">

### Firma

`bindCallback(callbackFunc: (arg1: A1, callback: (res1: R1, res2: R2) => any) => any, scheduler?: SchedulerLike): (arg1: A1) => Observable<[R1, R2]>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, callback: (res1: R1, res2: R2) => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(arg1: A1) => Observable<[R1, R2]>`

</div>

<div class="overload-section">

### Firma

`bindCallback(callbackFunc: (arg1: A1, callback: (res1: R1) => any) => any, scheduler?: SchedulerLike): (arg1: A1) => Observable<R1>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, callback: (res1: R1) => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(arg1: A1) => Observable<R1>`

</div>

<div class="overload-section">

### Firma

`bindCallback(callbackFunc: (arg1: A1, callback: () => any) => any, scheduler?: SchedulerLike): (arg1: A1) => Observable<void>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, callback: () => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(arg1: A1) => Observable<void>`

</div>

<div class="overload-section">

### Firma

`bindCallback(callbackFunc: (arg1: A1, arg2: A2, callback: (res1: R1, res2: R2, res3: R3, res4: R4, ...args: any[]) => any) => any, scheduler?: SchedulerLike): (arg1: A1, arg2: A2) => Observable<any[]>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, arg2: A2, callback: (res1: R1, res2: R2, res3: R3, res4: R4, ...args: any[]) => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(arg1: A1, arg2: A2) => Observable<any[]>`

</div>

<div class="overload-section">

### Firma

`bindCallback(callbackFunc: (arg1: A1, arg2: A2, callback: (res1: R1, res2: R2, res3: R3) => any) => any, scheduler?: SchedulerLike): (arg1: A1, arg2: A2) => Observable<[R1, R2, R3]>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, arg2: A2, callback: (res1: R1, res2: R2, res3: R3) => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(arg1: A1, arg2: A2) => Observable<[R1, R2, R3]>`

</div>

<div class="overload-section">

### Firma

`bindCallback(callbackFunc: (arg1: A1, arg2: A2, callback: (res1: R1, res2: R2) => any) => any, scheduler?: SchedulerLike): (arg1: A1, arg2: A2) => Observable<[R1, R2]>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, arg2: A2, callback: (res1: R1, res2: R2) => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(arg1: A1, arg2: A2) => Observable<[R1, R2]>`

</div>

<div class="overload-section">

### Firma

`bindCallback(callbackFunc: (arg1: A1, arg2: A2, callback: (res1: R1) => any) => any, scheduler?: SchedulerLike): (arg1: A1, arg2: A2) => Observable<R1>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, arg2: A2, callback: (res1: R1) => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(arg1: A1, arg2: A2) => Observable<R1>`

</div>

<div class="overload-section">

### Firma

`bindCallback(callbackFunc: (arg1: A1, arg2: A2, callback: () => any) => any, scheduler?: SchedulerLike): (arg1: A1, arg2: A2) => Observable<void>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, arg2: A2, callback: () => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(arg1: A1, arg2: A2) => Observable<void>`

</div>

<div class="overload-section">

### Firma

`bindCallback(callbackFunc: (arg1: A1, arg2: A2, arg3: A3, callback: (res1: R1, res2: R2, res3: R3, res4: R4, ...args: any[]) => any) => any, scheduler?: SchedulerLike): (arg1: A1, arg2: A2, arg3: A3) => Observable<any[]>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, arg2: A2, arg3: A3, callback: (res1: R1, res2: R2, res3: R3, res4: R4, ...args: any[]) => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(arg1: A1, arg2: A2, arg3: A3) => Observable<any[]>`

</div>

<div class="overload-section">

### Firma

`bindCallback(callbackFunc: (arg1: A1, arg2: A2, arg3: A3, callback: (res1: R1, res2: R2, res3: R3) => any) => any, scheduler?: SchedulerLike): (arg1: A1, arg2: A2, arg3: A3) => Observable<[R1, R2, R3]>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, arg2: A2, arg3: A3, callback: (res1: R1, res2: R2, res3: R3) => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(arg1: A1, arg2: A2, arg3: A3) => Observable<[R1, R2, R3]>`

</div>

<div class="overload-section">

### Firma

`bindCallback(callbackFunc: (arg1: A1, arg2: A2, arg3: A3, callback: (res1: R1, res2: R2) => any) => any, scheduler?: SchedulerLike): (arg1: A1, arg2: A2, arg3: A3) => Observable<[R1, R2]>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, arg2: A2, arg3: A3, callback: (res1: R1, res2: R2) => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(arg1: A1, arg2: A2, arg3: A3) => Observable<[R1, R2]>`

</div>

<div class="overload-section">

### Firma

`bindCallback(callbackFunc: (arg1: A1, arg2: A2, arg3: A3, callback: (res1: R1) => any) => any, scheduler?: SchedulerLike): (arg1: A1, arg2: A2, arg3: A3) => Observable<R1>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, arg2: A2, arg3: A3, callback: (res1: R1) => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(arg1: A1, arg2: A2, arg3: A3) => Observable<R1>`

</div>

<div class="overload-section">

### Firma

`bindCallback(callbackFunc: (arg1: A1, arg2: A2, arg3: A3, callback: () => any) => any, scheduler?: SchedulerLike): (arg1: A1, arg2: A2, arg3: A3) => Observable<void>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, arg2: A2, arg3: A3, callback: () => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(arg1: A1, arg2: A2, arg3: A3) => Observable<void>`

</div>

<div class="overload-section">

### Firma

`bindCallback(callbackFunc: (arg1: A1, arg2: A2, arg3: A3, arg4: A4, callback: (res1: R1, res2: R2, res3: R3, res4: R4, ...args: any[]) => any) => any, scheduler?: SchedulerLike): (arg1: A1, arg2: A2, arg3: A3, arg4: A4) => Observable<any[]>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, arg2: A2, arg3: A3, arg4: A4, callback: (res1: R1, res2: R2, res3: R3, res4: R4, ...args: any[]) =></code> any) => any.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(arg1: A1, arg2: A2, arg3: A3, arg4: A4) => Observable<any[]>`

</div>

<div class="overload-section">

### Firma

`bindCallback(callbackFunc: (arg1: A1, arg2: A2, arg3: A3, arg4: A4, callback: (res1: R1, res2: R2, res3: R3) => any) => any, scheduler?: SchedulerLike): (arg1: A1, arg2: A2, arg3: A3, arg4: A4) => Observable<[R1, R2, R3]>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, arg2: A2, arg3: A3, arg4: A4, callback: (res1: R1, res2: R2, res3: R3) => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(arg1: A1, arg2: A2, arg3: A3, arg4: A4) => Observable<[R1, R2, R3]>`

</div>

<div class="overload-section">

### Firma

`bindCallback(callbackFunc: (arg1: A1, arg2: A2, arg3: A3, arg4: A4, callback: (res1: R1, res2: R2) => any) => any, scheduler?: SchedulerLike): (arg1: A1, arg2: A2, arg3: A3, arg4: A4) => Observable<[R1, R2]>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, arg2: A2, arg3: A3, arg4: A4, callback: (res1: R1, res2: R2) => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(arg1: A1, arg2: A2, arg3: A3, arg4: A4) => Observable<[R1, R2]>`

</div>

<div class="overload-section">

### Firma

`bindCallback(callbackFunc: (arg1: A1, arg2: A2, arg3: A3, arg4: A4, callback: (res1: R1) => any) => any, scheduler?: SchedulerLike): (arg1: A1, arg2: A2, arg3: A3, arg4: A4) => Observable<R1>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, arg2: A2, arg3: A3, arg4: A4, callback: (res1: R1) => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(arg1: A1, arg2: A2, arg3: A3, arg4: A4) => Observable<R1>`

</div>

<div class="overload-section">

### Firma

`bindCallback(callbackFunc: (arg1: A1, arg2: A2, arg3: A3, arg4: A4, callback: () => any) => any, scheduler?: SchedulerLike): (arg1: A1, arg2: A2, arg3: A3, arg4: A4) => Observable<void>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, arg2: A2, arg3: A3, arg4: A4, callback: () => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(arg1: A1, arg2: A2, arg3: A3, arg4: A4) => Observable<void>`

</div>

<div class="overload-section">

### Firma

`bindCallback(callbackFunc: (arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5, callback: (res1: R1, res2: R2, res3: R3, res4: R4, ...args: any[]) => any) => any, scheduler?: SchedulerLike): (arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5) => Observable<any[]>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5, callback: (res1: R1, res2: R2, res3: R3, res4: R4, ...args: an</code>y[]) => any) => any.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5) => Observable<any[]>`

</div>

<div class="overload-section">

### Firma

`bindCallback(callbackFunc: (arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5, callback: (res1: R1, res2: R2, res3: R3) => any) => any, scheduler?: SchedulerLike): (arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5) => Observable<[R1, R2, R3]>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5, callback: (res1: R1, res2: R2, res3: R3) => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5) => Observable<[R1, R2, R3]>`

</div>

<div class="overload-section">

### Firma

`bindCallback(callbackFunc: (arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5, callback: (res1: R1, res2: R2) => any) => any, scheduler?: SchedulerLike): (arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5) => Observable<[R1, R2]>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5, callback: (res1: R1, res2: R2) => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5) => Observable<[R1, R2]>`

</div>

<div class="overload-section">

### Firma

`bindCallback(callbackFunc: (arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5, callback: (res1: R1) => any) => any, scheduler?: SchedulerLike): (arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5) => Observable<R1>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5, callback: (res1: R1) => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5) => Observable<R1>`

</div>

<div class="overload-section">

### Firma

`bindCallback(callbackFunc: (arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5, callback: () => any) => any, scheduler?: SchedulerLike): (arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5) => Observable<void>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5, callback: () => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5) => Observable<void>`

</div>

<div class="overload-section">

### Firma

`bindCallback(callbackFunc: (...args: (A | ((result: R) => any))[]) => any, scheduler?: SchedulerLike): (...args: A[]) => Observable<R>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(...args: (A | ((result: R) => any))[]) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(...args: A[]) => Observable<R>`

</div>

<div class="overload-section">

### Firma

`bindCallback(callbackFunc: (...args: (A | ((...results: R[]) => any))[]) => any, scheduler?: SchedulerLike): (...args: A[]) => Observable<R[]>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(...args: (A | ((...results: R[]) => any))[]) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(...args: A[]) => Observable<R[]>`

</div>

<div class="overload-section">

### Firma

`bindCallback(callbackFunc: Function, scheduler?: SchedulerLike): (...args: any[]) => Observable<any>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>Function</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(...args: any[]) => Observable<any>`

</div>

</div>
</details>

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/bindCallback.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/index/function/bindCallback">Documentación oficial en inglés</a>
