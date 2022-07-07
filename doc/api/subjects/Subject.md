# Subject

<h2 class="subtitle">Un Sujeto es un tipo especial de Observable que permite que los valores sean multidifundidos a varios Observadores. Los Sujetos son como EventEmitters</h2>

```typescript
class Subject<T> extends Observable implements SubscriptionLike {
  static create: Function;
  constructor();
  observers: Observer<T>[];
  closed: false;
  isStopped: false;
  hasError: false;
  thrownError: any;
  lift<R>(operator: Operator<T, R>): Observable<R>;
  next(value?: T);
  error(err: any);
  complete();
  unsubscribe();
  _trySubscribe(subscriber: Subscriber<T>): TeardownLogic;
  _subscribe(subscriber: Subscriber<T>): Subscription;
  asObservable(): Observable<T>;

  // Heredado de index/Observable
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

- [BehaviorSubject](/api/subjects/BehaviorSubject)
- [ReplaySubject](/api/subjects/ReplaySubject)
- [AsyncSubject](/api/subjects/AsyncSubject)

## Descripción

Cada Sujeto es un Observable y un Observador. Se puede realizar una suscripción a un Sujeto, y llamar al método next() para proporcionarle valores, además de notificaciones de error y complete.

## Propiedades Estáticas

<table>
<tr><th>Property</th><th>Type</th><th>Description</th></tr>
<tr><td>create</td><td>Function</td></tr>
</table>

## Constructor

<table>
<tr><th>constructor()</th></tr>
<tr><td>
<h3><code>constructor()</code></h3>
<h3>Parámetros</h3>
No recibe ningún parámetro.
</td></tr>
</table>

## Propiedades

<table>
<tr><th>Propiedad</th><th>Tipo</th><th>Descripción</th></tr>
<tr><td>observers</td><td><code>Observer<T>[]</code></td></tr>
<tr><td>closed</td><td><code>false</code></td></tr>
<tr><td>isStopped</td><td><code>false</code></td></tr>
<tr><td>hasError</td><td><code>false</code></td></tr>
<tr><td>thrownError</td><td><code>any</code></td></tr>
</table>

## Métodos

<table>
<tr><th>lift()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>lift<R>(operator: Operator<T, R>): Observable<R></code>

<h3>Parámetros</h3>

<table>
<tr><td>operator</td><td>Tipo: <code>Operator</code>.</td></tr>
</table>

<h3>Retorna</h3>
<code>Observable<R></code>

</td></tr>
</table>

<table>
<tr><th>next()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>next(value?: T)</code>

<h3>Parámetros</h3>

<table>
<tr><td>value</td><td>Opcional. El valor por defecto es <code>undefined</code>.

Tipo: <code>T</code>.</td></tr>

</table>
</td></tr>
</table>

<table>
<tr><th>error()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>error(err: any)</code>

<h3>Parámetros</h3>

<table>
<tr><td>err</td><td>Tipo: <code>any</code>.</td></tr>
</table>
</td></tr>
</table>

<table>
<tr><th>complete()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>complete()</code>
<h3>Parámetros</h3>
No recibe ningún parámetro.
</td></tr>
</table>

<table>
<tr><th>unsubscribe()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>unsubscribe()</code>
<h3>Parámetros</h3>
No recibe ningún parámetro.
</td></tr>
</table>

<table>
<tr><th>_trySubscribe()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>_trySubscribe(subscriber: Subscriber<T>): TeardownLogic</code>
<h3>Parámetros</h3>

<table>
<tr><td>subscriber</td><td>Tipo: <code>Subscriber</code>.</td></tr>
</table>

<h3>Retorna</h3>
<code>TeardownLogic</code>

</td></tr>
</table>

<table>
<tr><th>_subscribe()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>_subscribe(subscriber: Subscriber<T>): Subscription</code>
<h3>Parámetros</h3>

<table>
<tr><td>subscriber</td><td>Tipo: <code>Subscriber</code>.</td></tr>
</table>

<h3>Retorna</h3>
<code>Subscription</code>

</td></tr>
</table>

<table>
<tr><th>asObservable()</th></tr>
<tr><td>Crea un nuevo Observable con este Sujeto como fuente. Se puede hacer esto para crear lógica personalizada de la parte Observador del Sujeto y esconderla del código que utiliza el Observable</td></tr>
<tr><td>
<h3>Firma</h3>
<code>asObservable(): Observable<T></code>

<h3>Parámetros</h3>
No recibe ningún parámetro.

<h3>Retorna</h3>
<code>Observable<T>: Observable that the Subject casts to</code>

</td></tr>
</table>
