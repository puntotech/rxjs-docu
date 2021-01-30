# Observable

<h2 class="subtitle">Una representación de cualquier conjunto de valores a lo largo de cualquier intervalo de tiempo. Es el componente más básico de RxJS</h2>

```typescript
class Observable<T> implements Subscribable {
  static create: Function;
  static if: typeof iif;
  static throw: typeof throwError;
  constructor(
    subscribe?: (
      this: Observable<T>,
      subscriber: Subscriber<T>
    ) => TeardownLogic
  );
  _isScalar: boolean;
  source: Observable<any>;
  operator: Operator<any, T>;
  lift<R>(operator: Operator<T, R>): Observable<R>;
  subscribe(
    observerOrNext?:
      | NextObserver<T>
      | ErrorObserver<T>
      | CompletionObserver<T>
      | ((value: T) => void),
    error?: (error: any) => void,
    complete?: () => void
  ): Subscription;
  _trySubscribe(sink: Subscriber<T>): TeardownLogic;
  forEach(
    next: (value: T) => void,
    promiseCtor?: PromiseConstructorLike
  ): Promise<void>;
  pipe(...operations: OperatorFunction<any, any>[]): Observable<any>;
  toPromise(promiseCtor?: PromiseConstructorLike): Promise<T>;
}
```

## Subclases

- [ConnectableObservable](/api/index/ConnectableObservable)
- [GroupedObservable](/api/index/GroupedObservable)

<ul>
  <li>Subject</li>
  <ul>
    <li><a href="/api/subjects/BehaviorSubject">BehaviorSubject</a></li>
    <li><a href="/api/subjects/ReplaySubject">ReplaySubject</a></li>
    <li><a href="/api/subjects/AsyncSubject">AsyncSubject</a></li>
  </ul>
</ul>

## Propiedades Estáticas

<table>
<tr><th>Propiedad</th><th>Tipo</th><th>Descripción</th></tr>
<tr><td>create</td><td><code>Function</code></td><td>Crea un nuevo Observable frío llamando al constructor Observable.</td></tr>
<tr><td>if</td><td><code>typeof iif</code></td></tr>
<tr><td>throw</td><td><code>typeof throwError</code></td></tr>
</table>

## Constructor

<table>
<tr><th>constructor()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>constructor(subscribe?: (this: Observable<T>, subscriber: Subscriber<T>) => TeardownLogic)</code>
<h3>Parámetros</h3>

<table>
<tr><td>subscribe</td><td>Opcional. El valor por defecto es <code>undefined</code>.

La función que es llamada cuando el Observable es suscrito inicialmente. A esta función se le proporciona un Suscriptor, al cual se le pueden proporcionar notificaciones next con valores nuevos, notificaciones error para lanzar un error o notificaciones complete para indicar una completación exitosa.</td></tr>

</table>
</td></tr>
</table>

## Propiedades

<table>
<tr><th>Propiedad</th><th>Tipo</th><th>Descripción</th></tr>
<tr><td>_isScalar</td><td><code>boolean</code>
Detalle de implementación interna, no se debe usar directamente.</td></tr>
<tr><td>source</td><td><code>Observable<any></code></td></tr>
<tr><td>operator</td><td><code>Operator<any, T></code></td></tr>
</table>

## Métodos

<table>
<tr><th>lift()</th></tr>
<tr><td>Crea un Observable nuevo, con este Observable como fuente, y el operador proporcionado definido como el operador del nuevo Observable.</td></tr>
<tr><td>
<h3>Firma</h3>
<code>lift<R>(operator: Operator<T, R>): Observable<R></code>
<h3>Parámetros</h3>

<table>
<tr><td>operator</td><td>El operador que define la operación que aplicar al Observable</td></tr>
</table>

<h3>Retorna</h3>
<code>Observable<R></code>: Un nuevo Observable con el Operador aplicado.
</td></tr>
</table>

<table>
  <tr><th>subscribe()</th></tr>
  <tr><td>Invoca la ejecución de un Observable y registra manejadores Observador para las notificaciones que emita.</td></tr>
  <tr><td>
    <details>
      <summary>5 sobrecargas</summary>
    </details>
  </td></tr>
  <tr><td>
    <code>subscribe</code> no es un operador normal, sino un operador que llama a la función <code>subscribe</code> interna de un Observable. Puede ser, por ejemplo, una función que se le proporicone al constructor del Observable, aunque la mayoría de las veces suele ser una implementación de la biblioteca, que define los valores que serán emitidos por el Observable, y el momento en el que se emitirán. Esto quiere decir que el momento en el que se llama a <code>subscribe</code> es el momento en el que el Observable empieza a trabajar, y no en el momento de su creación, como comúnmente se piensa.
    Además de dar comienzo a la ejecución de un Observable, este método permite escuchar los valores que emite, además de cuando se completa o lanza un error. Esto se puede lograr de dos maneras:
    La primera forma es creando un objeto que implemente la interfaz Observer. Debe contener los métodos definidos por dicha interfaz, pero teniendo en cuenta que debe ser un objeto normal de JavaScript, que se puede crear de cualquier forma (clase ES6, constructor clásico de función, literal de objeto etc.) No se debe tratar de utilizar ningún detalle de implementación de RxJS para crear Observadores, no es necesario. También se debe tener en cuenta que el objeto no tiene por qué implementar todos los métodos, sino que se pueden omitir aquellos métodos que no se vayan a utilizar. Sin embargo, se debe tener en cuenta que si el método error no se proporciona, todos los errores se quedarán sin gestionar.
    La segunda forma consiste en dejar de lado el objeto Observer y utilizar funciones <em>callback</em> en lugar de sus métodos. Esto quiere decir que se pueden proporcionar tres funciones como argumentos a <code>subscribe</code>, donde la primera función es equivalente a un método <code>next</code>, la segunda a un método <code>error</code> y la tercera a un método <code>complete</code>. Al igual que en el caso del objeto Observador, se pueden omitir las funciones que no se necesiten, preferiblemente mediante el paso del valor <code>undefined</code> o <code>null</code>, ya que <code>subscribe</code> reconoce estas funciones según su posición en la llamada a la función. Al igual que antes, si no se proporciona la función de error, cualquier error emitido por el Observable será automáticamente lanzado, sin posibilidad de gestionarlo.
    Independientemente del método que se escoja para llamar a <code>subscribe</code>, se retorna un objeto Subscription. ESte objeto permite que se llame a la función <code>unsubscribe</code>, que para la ejecución del Observable y desecha los recursos que dicho Observable haya utilizado. Se debe tener en cuenta que cancelar una Suscripción no provoca una llamada a la <em>callback</em> <code>complete</code> proporcionada a la función <code>subscribe</code>, ya que esta se llama exclusivamente cuando recibe la señal de completación del Observable.
    Es importante tener en cuenta que no se garantiza que las <em>callbacks</em> proporcionadas a <code>subscribe</code> se llamen asíncronamente, ya que es el propoio Observable el que decide en qué momento se llama a cada una de estas funciones. Por ejemplo, un Observable creado con el operador <code>of</code> emite todos sus valores síncronamente. Siempre se debe comprobar la documentación para ver cómo se comporta cada Observable al ser suscrito, y si su comportamiento por defecto puede modificarse con un Planificador.
    <br>
    <h2>Ejemplos</h2>
    <h3>Ejemplos de la documentación oficial</h3>
Suscribirse con un Observador

```javascript
import { of } from "rxjs";

const sumObserver = {
  sum: 0,
  next(value) {
    console.log("Sumando: " + value);
    this.sum = this.sum + value;
  },
  error() {
    // Este método se podría eliminar, ya que, en este momento, los errores no importan
  },
  complete() {
    console.log("El resultado de la suma es: " + this.sum);
  },
};

of(1, 2, 3) // Emite 1, 2, 3 síncronamente y se completa
  .subscribe(sumObserver);

// Salida:
// "Sumando: 1"
// "Sumando: 2"
// "Sumando: 3"
// "El resultado de la suma es: 6"
```

Suscribirse con funciones

```javascript
import { of } from "rxjs";

let sum = 0;

of(1, 2, 3).subscribe(
  (value) => {
    console.log("Sumando: " + value);
    sum = sum + value;
  },
  undefined,
  () => console.log("El resultado de la suma es: " + sum)
);

// Salida:
// "Sumando: 1"
// "Sumando: 2"
// "Sumando: 3"
// "El resultado de la suma es: 6"
```

Cancelar una suscripción

```javascript
import { interval } from "rxjs";

const subscription = interval(1000).subscribe(
  (num) => console.log(num),
  undefined,
  () => {
    // No se llamará, aunque se cancele la Suscripción. not be called, even when cancelling subscription.
    console.log("¡Completado!");
  }
);

setTimeout(() => {
  subscription.unsubscribe();
  console.log("¡Suscripción cancelada!");
}, 2500);

// Salida:
// 0 tras 1s
// 1 tras 2s
// "¡Suscripción cancelada!" tras 2.5s
```

  </td></tr>
</table>

<table>
<tr><th>_trySubscribe()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>_trySubscribe(sink: Subscriber<T>): TeardownLogic</code>
<h3>Parámetros</h3>

<table>
<tr><td>sink</td><td>Tipo: <code>Subscriber</code>.</td></tr>
</table>

<h3>Retorna</h3>
<code>TeardownLogic</code>
</td></tr>
</table>

<table>
<tr><th>forEach()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>forEach(next: (value: T) => void, promiseCtor?: PromiseConstructorLike): Promise<void></code>
<h3>Parámetros</h3>

<table>
<tr><td>next</td><td>Un manejador para cada elemento emitido por el Observable.</td></tr>
<tr><td>promiseCtor</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Una función constructora utilizada para instanciar la Promesa.
</td></tr>
</table>

<h3>Retorna</h3>
<code>Promise<void></code>: Una Promesa que o bien se resuelve al completarse el Observable o se rechaza con el error gestionado.
</td></tr>
</table>

<table>
  <tr><th>pipe()</th></tr>
  <tr><td>Se utiliza para encadenar los operadores funcionales.</td></tr>
  <tr><td>
    <details>
      <summary>11 sobrecargas</summary>
      <div class="overload-container">
      <div class="overload-section">
        <h3>Firma</h3>
        <code>pipe(): Observable<T></code>
        <h3>Parámetros</h3>
        No recibe ningún parámetro.
        <h3>Retorna</h3>
        <code>Observable<T></code>
      </div>
      <div class="overload-section">
        <h3>Firma</h3>
        <code>pipe<A>(op1: OperatorFunction<T, A>): Observable<A></code>
        <h3>Parámetros</h3>
        <table>
          <tr><td>op1</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
        </table>
        <h3>Retorna</h3>
        <code>Observable<A></code>
      </div>
      <div class="overload-section">
       <h3>Firma</h3>
        <code>pipe<A, B>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>): Observable<B></code>
        <h3>Parámetros</h3>
        <table>
          <tr><td>op1</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
          <tr><td>op2</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
        </table>
        <h3>Retorna</h3>
        <code>Observable<B></code>
      </div>
      <div class="overload-section">
       <h3>Firma</h3>
        <code>pipe<A, B, C>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>): Observable<C></code>
        <h3>Parámetros</h3>
        <table>
          <tr><td>op1</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
          <tr><td>op2</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
          <tr><td>op3</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
        </table>
        <h3>Retorna</h3>
        <code>Observable<C></code>
      </div>
      <div class="overload-section">
        <h3>Firma</h3>
        <code>pipe<A, B, C, D>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>): Observable<D></code>
        <h3>Parámetros</h3>
        <table>
          <tr><td>op1</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
          <tr><td>op2</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
          <tr><td>op3</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
          <tr><td>op4</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
        </table>
        <h3>Retorna</h3>
        <code>Observable<D></code>
      </div>
      <div class="overload-section">
        <h3>Firma</h3>
        <code>pipe<A, B, C, D, E>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>): Observable<E></code>
        <h3>Parámetros</h3>
        <table>
          <tr><td>op1</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
          <tr><td>op2</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
          <tr><td>op3</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
          <tr><td>op4</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
          <tr><td>op5</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
        </table>
        <h3>Retorna</h3>
        <code>Observable<E></code>
      </div>
      <div class="overload-section">
        <h3>Firma</h3>
        <code>pipe<A, B, C, D, E, F>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>): Observable<F></code>
        <h3>Parámetros</h3>
        <table>
          <tr><td>op1</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
          <tr><td>op2</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
          <tr><td>op3</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
          <tr><td>op4</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
          <tr><td>op5</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
          <tr><td>op6</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
        </table>
        <h3>Retorna</h3>
        <code>Observable<F></code>
      </div>
      <div class="overload-section">
        <h3>Firma</h3>
        <code>pipe<A, B, C, D, E, F, G>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>): Observable<G></code>
        <h3>Parámetros</h3>
        <table>
          <tr><td>op1</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
          <tr><td>op2</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
          <tr><td>op3</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
          <tr><td>op4</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
          <tr><td>op5</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
          <tr><td>op6</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
          <tr><td>op7</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
        </table>
        <h3>Retorna</h3>
        <code>Observable<G></code>
      </div>
      <div class="overload-section">
        <h3>Firma</h3>
        <code>pipe<A, B, C, D, E, F, G, H>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>): Observable<H></code>
        <h3>Parámetros</h3>
        <table>
          <tr><td>op1</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
          <tr><td>op2</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
          <tr><td>op3</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
          <tr><td>op4</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
          <tr><td>op5</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
          <tr><td>op6</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
          <tr><td>op7</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
          <tr><td>op8</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
        </table>
        <h3>Retorna</h3>
        <code>Observable<H></code>
      </div>
      <div class="overload-section">
        <h3>Firma</h3>
        <code>pipe<A, B, C, D, E, F, G, H, I>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>, op9: OperatorFunction<H, I>): Observable<I></code>
        <h3>Parámetros</h3>
        <table>
          <tr><td>op1</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
          <tr><td>op2</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
          <tr><td>op3</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
          <tr><td>op4</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
          <tr><td>op5</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
          <tr><td>op6</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
          <tr><td>op7</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
          <tr><td>op8</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
          <tr><td>op9</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
        </table>
        <h3>Retorna</h3>
        <code>Observable<I></code>
      </div>
      <div class="overload-section">
        <h3>Firma</h3>
        <code>pipe<A, B, C, D, E, F, G, H, I>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>, op9: OperatorFunction<H, I>, ...operations: OperatorFunction<any, any>[]): Observable<{}></code>
        <h3>Parámetros</h3>
        <table>
          <tr><td>op1</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
          <tr><td>op2</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
          <tr><td>op3</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
          <tr><td>op4</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
          <tr><td>op5</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
          <tr><td>op6</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
          <tr><td>op7</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
          <tr><td>op8</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
          <tr><td>op9</td><td>Tipo: <code>OperatorFunction</code>.</td></tr>
          <tr><td>operations</td><td>Tipo: <code>OperatorFunction[]</code>.</td></tr>
        </table>
        <h3>Retorna</h3>
        <code>Observable<{}></code>
      </div>
    </div>
    </details>

  </td></tr>
</table>

<table>
  <tr><th>toPromise()</th></tr>
  <tr><td>
    <details>
      <summary>3 sobrecargas</summary>
      <div class="overload-container">
        <div class="overload-section">
          <h3>Firma</h3>
          <code>toPromise<T>(): Promise<T></code>
          <h3>Parámetros</h3>
          No recibe ningún parámetro.
          <h3>Retorna</h3>
          <code>Promise<T></code>
        </div>
      <div class="overload-section">
        <h3>Firma</h3>
        <code>toPromise<T>(PromiseCtor: any): Promise<T></code>
        <h3>Parámetros</h3>
        <table>
          <tr><td>PromiseCtor</td><td>Tipo: <code>any</code>.</td></tr>
        </table>
        <h3>Retorna</h3>
        <code>Promise<T></code>
      </div>
      <div class="overload-section">
        <h3>Firma</h3>
        <code>toPromise<T>(PromiseCtor: PromiseConstructorLike): Promise<T></code>
        <h3>Parámetros</h3>
        <table>
          <tr><td>PromiseCtor</td><td>Tipo: <code>PromiseConstructorLike</code>.</td></tr>
        </table>
        <h3>Retorna</h3>
        <code>Promise<T></code>
      </div>
    </div>
  </details>
  </td></tr>
</table>

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/6.5.5/src/internal/Observable.ts#L12-L363">
<img src="assets/icons/source-code.png" alt="Source code">
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/index/class/Observable">Documentación oficial en inglés</a>
