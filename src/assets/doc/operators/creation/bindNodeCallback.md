# bindNodeCallback

<h2 class="subtitle"> Convierte una callback API del estilo de Node.js a una función que retorna un Observable
</h2>

<details>
<summary>Signatura</summary>

### Firma

`bindNodeCallback<T>(callbackFunc: Function, resultSelector: Function | SchedulerLike, scheduler?: SchedulerLike): (...args: any[]) => Observable<T>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>Function</code>.</td></tr>
<tr><td>resultSelector</td><td>Tipo: <code>Function | SchedulerLike</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
El planificador con el que planificar las <i>callbacks</i>.</td></tr>
</table>

### Retorna

`(...args: any[]) => Observable<T>`: Una función que returna un Observable que emite los mismo valores que la _callback_ de Node.js devolvería.

</details>

## Descripción

Es igual que `bindCallback`, pero la _callback_ debe ser de tipo `callback(error, result)`.

`bindNodeCallback` no es un operador, dado que ni su entrada ni su salida son Observables.

De entrada recibe una función `func` que recibe algunos parámetros, pero el último parámetro debe ser una función _callback_, a la que `func` llama cuando ha terminado. La función _callback_ debe seguir las convenciones de Node.js, donde el primer argumento de la _callback_ es un objeto error, que señala si la llamada ha sido realizada o no con éxito. Si dicho objeto se le pasa a la _callback_, significa que algo ha ido mal.

La salida de `bindNodeCallback` es una función que recibe los mismo parámetros que `func`, excepto el último (la callback.) Cuando se hace una llamada a la función de salida con argumentos, retornará un Observable. Si `func` hace una llamada a su callback con el parámetro de error presente, el Observable lanzará un error con ese valor. Si no se proporciona el parámetro de error, el Observable emitirá el segundo parámetro. Si hay más parámetros (tercero, cuarto etc.), el Observable emitirá un array con todos los argumentos, excepto el primer argumento de error.

Nota: la llamada a `func` no se realizará en el mismo momento en el que se haga la llamada a la función de salida, sino en el momento en el que el Observable resultante sea suscrito. Por defecto, la llamada a `func` se hará de forma síncrona tras la suscripción, pero este comportamiento se puede cambiar proporcionando un planificador como tercer parámetro (opcional). `SchedulerLike` también puede controlar cuándo se emiten los valores de la _callback_ en el Observable resultante. Para saber más, leer la sección de [bindCallback](/operators/creation/bindCallback), ya que el comportamiento de `SchedulerLike` en ambos operadores es exactamente igual.

Al igual que con `bindCallback`, el contexto (`this`) de la función de entrada será que tenga la función de salida en el momento en el que se llame.

Una vez que el Observable resultante emita un valor, se completará inmediatamente. Esto implica que si la función `func` vuelve a llamar a la _callback_, los valores de la segunda y demás llamadas nunca aparecerán en el flujo. Si se necesita manejar funciones que llaman a la _callback_ varias veces, se debe utilizar [fromEvent](/operators/creation/fromEvent) o [fromEventPattern](/operators/creation/fromEventPattern).

Nota: `bindNodeCallback` se puede utilizar en entornos distintos a Node.js. Las _callbacks_ del 'estilo de Node.js' son una convención, por lo que si la API que se quiera utilizar implementa este tipo de _callback_, ya sea en el navegador o cualquier otro entorno, `bindNodeCallback` se puede utilizar de forma segura con las funciones de dicha API.

El objeto Error que se le pasa a la _callback_ no tiene por qué ser una instancia del objeto Error nativo de JavaScript. De hecho, ni siquiera tiene que ser un objeto. El parámetro Error de la función _callback_ se interpreta como 'presente', cuando el valor del parámetro es `truthy` (verdadero). El parámetro podría ser, por ejemplo, un número distinto de cero, una cadena que no esté vacía o el valor booleano `true`. En todos estos casos, el Observable resultante lanzaría un error con ese valor. Esto implica que, normalmente, las _callbacks_ tradicionales fallarán muy a menudo cuando se utiliza `bindNodeCallback`. Si un Observable falla mucho más a menudo de lo que cabría esperar, se aconseja comprobar si la _callback_ realmente se está llamando al estilo de Node.js, y si no, se debería utilizar el operador `bindCallback` en lugar de `bindNodeCallback`.

Nota: aunque el parámetro de error esté presente en la _callback_, si su valor es `falsy` (falso), no aparecerá en el array emitido por el Observable resultante.

## Ejemplos

### Ejemplos de la documentación oficial

Leer un fichero del sistema de ficheros y obtener los datos en forma de Observable

```javascript
import \* as fs from 'fs';
const readFileAsObservable = bindNodeCallback(fs.readFile);
const result = readFileAsObservable('./roadNames.txt', 'utf8');
result.subscribe(x => console.log(x), e => console.error(e));
```

Usar `bindNodeCallback` en una función llamando a una _callback_ con varios argumentos

```javascript
someFunction((err, a, b) => {
  console.log(err); // null
  console.log(a); // 5
  console.log(b); // "algún string"
});
const boundSomeFunction = bindNodeCallback(someFunction);
boundSomeFunction().subscribe((value) => {
  console.log(value); // [5, "algún string"]
});
```

Usar `bindNodeCallback` con una función llamando a una _callback_ al estilo normal

```javascript
someFunction(a => {
console.log(a); // 5
});
const boundSomeFunction = bindNodeCallback(someFunction);
boundSomeFunction()
.subscribe(
value => {} // Nunca se llama
err => console.log(err) // 5
);
```

<details>
<summary>Sobrecargas</summary>
<div class="overload-container">

<div class="overload-section">

### Firma

`bindNodeCallback(callbackFunc: Function, resultSelector: Function, scheduler?: SchedulerLike): (...args: any[]) => Observable<any>`

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

`bindNodeCallback(callbackFunc: (callback: (err: any, res1: R1, res2: R2, res3: R3, res4: R4, ...args: any[]) => any) => any, scheduler?: SchedulerLike): (...args: any[]) => Observable<any[]>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(callback: (err: any, res1: R1, res2: R2, res3: R3, res4: R4, ...args: any[]) => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(...args: any[]) => Observable<any[]>`

</div>

<div class="overload-section">

### Firma

`bindNodeCallback(callbackFunc: (callback: (err: any, res1: R1, res2: R2, res3: R3) => any) => any, scheduler?: SchedulerLike): () => Observable<[R1, R2, R3]>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(callback: (err: any, res1: R1, res2: R2, res3: R3) => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`() => Observable<[R1, R2, R3]>`

</div>

<div class="overload-section">

### Firma

`bindNodeCallback(callbackFunc: (callback: (err: any, res1: R1, res2: R2) => any) => any, scheduler?: SchedulerLike): () => Observable<[R1, R2]>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(callback: (err: any, res1: R1, res2: R2) => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`() => Observable<[R1, R2]>`

</div>

<div class="overload-section">

### Firma

`bindNodeCallback(callbackFunc: (callback: (err: any, res1: R1) => any) => any, scheduler?: SchedulerLike): () => Observable<R1>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(callback: (err: any, res1: R1) => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`() => Observable<R1>`

</div>

<div class="overload-section">

### Firma

`bindNodeCallback(callbackFunc: (callback: (err: any) => any) => any, scheduler?: SchedulerLike): () => Observable<void>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(callback: (err: any) => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`() => Observable<void>`

</div>

<div class="overload-section">

### Firma

`bindNodeCallback(callbackFunc: (arg1: A1, callback: (err: any, res1: R1, res2: R2, res3: R3, res4: R4, ...args: any[]) => any) => any, scheduler?: SchedulerLike): (...args: any[]) => Observable<any[]>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, callback: (err: any, res1: R1, res2: R2, res3: R3, res4: R4, ...args: any[]) => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(...args: any[]) => Observable<any[]>`

</div>

<div class="overload-section">

### Firma

`bindNodeCallback(callbackFunc: (arg1: A1, callback: (err: any, res1: R1, res2: R2, res3: R3) => any) => any, scheduler?: SchedulerLike): (arg1: A1) => Observable<[R1, R2, R3]>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, callback: (err: any, res1: R1, res2: R2, res3: R3) => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(arg1: A1) => Observable<[R1, R2, R3]>`

</div>

<div class="overload-section">

### Firma

`bindNodeCallback(callbackFunc: (arg1: A1, callback: (err: any, res1: R1, res2: R2) => any) => any, scheduler?: SchedulerLike): (arg1: A1) => Observable<[R1, R2]>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, callback: (err: any, res1: R1, res2: R2) => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(arg1: A1) => Observable<[R1, R2]>`

</div>

<div class="overload-section">

### Firma

`bindNodeCallback(callbackFunc: (arg1: A1, callback: (err: any, res1: R1) => any) => any, scheduler?: SchedulerLike): (arg1: A1) => Observable<R1>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, callback: (err: any, res1: R1) => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(arg1: A1) => Observable<R1>`

</div>

<div class="overload-section">

### Firma

`bindNodeCallback(callbackFunc: (arg1: A1, callback: (err: any) => any) => any, scheduler?: SchedulerLike): (arg1: A1) => Observable<void>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, callback: (err: any) => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(arg1: A1) => Observable<void>`

</div>

<div class="overload-section">

### Firma

`bindNodeCallback(callbackFunc: (arg1: A1, arg2: A2, callback: (err: any, res1: R1, res2: R2, res3: R3, res4: R4, ...args: any[]) => any) => any, scheduler?: SchedulerLike): (...args: any[]) => Observable<any[]>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, arg2: A2, callback: (err: any, res1: R1, res2: R2, res3: R3, res4: R4, ...args: any[]) => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(...args: any[]) => Observable<any[]>`

</div>

<div class="overload-section">

### Firma

`bindNodeCallback(callbackFunc: (arg1: A1, arg2: A2, callback: (err: any, res1: R1, res2: R2, res3: R3) => any) => any, scheduler?: SchedulerLike): (arg1: A1, arg2: A2) => Observable<[R1, R2, R3]>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, arg2: A2, callback: (err: any, res1: R1, res2: R2, res3: R3) => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(arg1: A1, arg2: A2) => Observable<[R1, R2, R3]>`

</div>

<div class="overload-section">

### Firma

`bindNodeCallback(callbackFunc: (arg1: A1, arg2: A2, callback: (err: any, res1: R1, res2: R2) => any) => any, scheduler?: SchedulerLike): (arg1: A1, arg2: A2) => Observable<[R1, R2]>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, arg2: A2, callback: (err: any, res1: R1, res2: R2) => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(arg1: A1, arg2: A2) => Observable<[R1, R2]>`

</div>

<div class="overload-section">

### Firma

`bindNodeCallback(callbackFunc: (arg1: A1, arg2: A2, callback: (err: any, res1: R1) => any) => any, scheduler?: SchedulerLike): (arg1: A1, arg2: A2) => Observable<R1>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, arg2: A2, callback: (err: any, res1: R1) => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(arg1: A1, arg2: A2) => Observable<R1>`

</div>

<div class="overload-section">

### Firma

`bindNodeCallback(callbackFunc: (arg1: A1, arg2: A2, callback: (err: any) => any) => any, scheduler?: SchedulerLike): (arg1: A1, arg2: A2) => Observable<void>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, arg2: A2, callback: (err: any) => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(arg1: A1, arg2: A2) => Observable<void>`

</div>

<div class="overload-section">

### Firma

`bindNodeCallback(callbackFunc: (arg1: A1, arg2: A2, arg3: A3, callback: (err: any, res1: R1, res2: R2, res3: R3, res4: R4, ...args: any[]) => any) => any, scheduler?: SchedulerLike): (...args: any[]) => Observable<any[]>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, arg2: A2, arg3: A3, callback: (err: any, res1: R1, res2: R2, res3: R3, res4: R4, ...args: any[]) =></code> any) => any.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(...args: any[]) => Observable<any[]>`

</div>

<div class="overload-section">

### Firma

`bindNodeCallback(callbackFunc: (arg1: A1, arg2: A2, arg3: A3, callback: (err: any, res1: R1, res2: R2, res3: R3) => any) => any, scheduler?: SchedulerLike): (arg1: A1, arg2: A2, arg3: A3) => Observable<[R1, R2, R3]>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, arg2: A2, arg3: A3, callback: (err: any, res1: R1, res2: R2, res3: R3) => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(arg1: A1, arg2: A2, arg3: A3) => Observable<[R1, R2, R3]>`

</div>

<div class="overload-section">

### Firma

`bindNodeCallback(callbackFunc: (arg1: A1, arg2: A2, arg3: A3, callback: (err: any, res1: R1, res2: R2) => any) => any, scheduler?: SchedulerLike): (arg1: A1, arg2: A2, arg3: A3) => Observable<[R1, R2]>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, arg2: A2, arg3: A3, callback: (err: any, res1: R1, res2: R2) => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(arg1: A1, arg2: A2, arg3: A3) => Observable<[R1, R2]>`

</div>

<div class="overload-section">

### Firma

`bindNodeCallback(callbackFunc: (arg1: A1, arg2: A2, arg3: A3, callback: (err: any, res1: R1) => any) => any, scheduler?: SchedulerLike): (arg1: A1, arg2: A2, arg3: A3) => Observable<R1>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, arg2: A2, arg3: A3, callback: (err: any, res1: R1) => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(arg1: A1, arg2: A2, arg3: A3) => Observable<R1>`

</div>

<div class="overload-section">

### Firma

`bindNodeCallback(callbackFunc: (arg1: A1, arg2: A2, arg3: A3, callback: (err: any) => any) => any, scheduler?: SchedulerLike): (arg1: A1, arg2: A2, arg3: A3) => Observable<void>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, arg2: A2, arg3: A3, callback: (err: any) => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(arg1: A1, arg2: A2, arg3: A3) => Observable<void>`

</div>

<div class="overload-section">

### Firma

`bindNodeCallback(callbackFunc: (arg1: A1, arg2: A2, arg3: A3, arg4: A4, callback: (err: any, res1: R1, res2: R2, res3: R3, res4: R4, ...args: any[]) => any) => any, scheduler?: SchedulerLike): (...args: any[]) => Observable<any[]>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, arg2: A2, arg3: A3, arg4: A4, callback: (err: any, res1: R1, res2: R2, res3: R3, res4: R4, ...args: an</code>y[]) => any) => any.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(...args: any[]) => Observable<any[]>`

</div>

<div class="overload-section">

### Firma

`bindNodeCallback(callbackFunc: (arg1: A1, arg2: A2, arg3: A3, arg4: A4, callback: (err: any, res1: R1, res2: R2, res3: R3) => any) => any, scheduler?: SchedulerLike): (arg1: A1, arg2: A2, arg3: A3, arg4: A4) => Observable<[R1, R2, R3]>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, arg2: A2, arg3: A3, arg4: A4, callback: (err: any, res1: R1, res2: R2, res3: R3) => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(arg1: A1, arg2: A2, arg3: A3, arg4: A4) => Observable<[R1, R2, R3]>`

</div>

<div class="overload-section">

### Firma

`bindNodeCallback(callbackFunc: (arg1: A1, arg2: A2, arg3: A3, arg4: A4, callback: (err: any, res1: R1, res2: R2) => any) => any, scheduler?: SchedulerLike): (arg1: A1, arg2: A2, arg3: A3, arg4: A4) => Observable<[R1, R2]>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, arg2: A2, arg3: A3, arg4: A4, callback: (err: any, res1: R1, res2: R2) => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(arg1: A1, arg2: A2, arg3: A3, arg4: A4) => Observable<[R1, R2]>`

</div>

<div class="overload-section">

### Firma

`bindNodeCallback(callbackFunc: (arg1: A1, arg2: A2, arg3: A3, arg4: A4, callback: (err: any, res1: R1) => any) => any, scheduler?: SchedulerLike): (arg1: A1, arg2: A2, arg3: A3, arg4: A4) => Observable<R1>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, arg2: A2, arg3: A3, arg4: A4, callback: (err: any, res1: R1) => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(arg1: A1, arg2: A2, arg3: A3, arg4: A4) => Observable<R1>`

</div>

<div class="overload-section">

### Firma

`bindNodeCallback(callbackFunc: (arg1: A1, arg2: A2, arg3: A3, arg4: A4, callback: (err: any) => any) => any, scheduler?: SchedulerLike): (arg1: A1, arg2: A2, arg3: A3, arg4: A4) => Observable<void>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, arg2: A2, arg3: A3, arg4: A4, callback: (err: any) => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(arg1: A1, arg2: A2, arg3: A3, arg4: A4) => Observable<void>`

</div>

<div class="overload-section">

### Firma

`bindNodeCallback(callbackFunc: (arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5, callback: (err: any, res1: R1, res2: R2, res3: R3, res4: R4, ...args: any[]) => any) => any, scheduler?: SchedulerLike): (...args: any[]) => Observable<any[]>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5, callback: (err: any, res1: R1, res2: R2, res3: R3, res4: R4, ..</code>.args: any[]) => any) => any.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(...args: any[]) => Observable<any[]>`

</div>

<div class="overload-section">

### Firma

`bindNodeCallback(callbackFunc: (arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5, callback: (err: any, res1: R1, res2: R2, res3: R3) => any) => any, scheduler?: SchedulerLike): (arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5) => Observable<[R1, R2, R3]>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5, callback: (err: any, res1: R1, res2: R2, res3: R3) => any) =></code> any.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5) => Observable<[R1, R2, R3]>`

</div>

<div class="overload-section">

### Firma

`bindNodeCallback(callbackFunc: (arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5, callback: (err: any, res1: R1, res2: R2) => any) => any, scheduler?: SchedulerLike): (arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5) => Observable<[R1, R2]>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5, callback: (err: any, res1: R1, res2: R2) => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5) => Observable<[R1, R2]>`

</div>

<div class="overload-section">

### Firma

`bindNodeCallback(callbackFunc: (arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5, callback: (err: any, res1: R1) => any) => any, scheduler?: SchedulerLike): (arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5) => Observable<R1>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5, callback: (err: any, res1: R1) => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5) => Observable<R1>`

</div>

<div class="overload-section">

### Firma

`bindNodeCallback(callbackFunc: (arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5, callback: (err: any) => any) => any, scheduler?: SchedulerLike): (arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5) => Observable<void>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>(arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5, callback: (err: any) => any) => any</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5) => Observable<void>`

</div>

<div class="overload-section">

### Firma

`bindNodeCallback(callbackFunc: Function, scheduler?: SchedulerLike): (...args: any[]) => Observable<any[]>`

### Parámetros

<table>
<tr><td>callbackFunc</td><td>Tipo: <code>Function</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`(...args: any[]) => Observable<any[]>`

</div>

</div>
</details>

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/bindNodeCallback.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/index/function/bindNodeCallback">Documentación oficial en inglés</a>
