# ConnectableObservable

```typescript
class ConnectableObservable<T> extends Observable {
  constructor(source: Observable<T>, subjectFactory: () => Subject<T>);
  protected _subject: Subject<T>;
  protected _refCount: number;
  protected _connection: Subscription;
  source: Observable<T>;
  protected subjectFactory: () => Subject<T>;
  _subscribe(subscriber: Subscriber<T>);
  protected getSubject(): Subject<T>;
  connect(): Subscription;
  refCount(): Observable<T>;

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

## Constructor

<table>
<tr><th>constructor()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>constructor(source: Observable<T>, subjectFactory: () => Subject<T>)</code>
<h3>Parámetros</h3>
<table>
<tr><td>source</td><td>Tipo: <code>Observable</code>.</td></tr>
<tr><td>subjectFactory</td><td>Tipo: <code>() => Subject</code>.</td></tr>
</table>
</td></tr>
</table>

## Propiedades

<table>
<tr><th>Propiedad</th><th>Tipo</th><th>Descripción</th></tr>
<tr><td>_subject</td><td><code>Subject<T></code></td></tr>
<tr><td>_refCount</td><td><code>number</code></td></tr>
<tr><td>_connection</td><td><code>Subscription</code></td></tr>
<tr><td>source</td><td><code>Observable<T></code></td><td>Declarado en el constructor.</td></tr>
<tr><td>subjectFactory</td><td><code>() => Subject<T></code></td><td>Declarado en el constructor.</td></tr>
</table>

## Métodos

<table>
<tr><th>_subscribe()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>_subscribe(subscriber: Subscriber<T>)</code>
<h3>Parámetros</h3>

<table>
<tr><td>subscriber</td><td>Tipo: <code>Subscriber</code>.</td></tr>
</table>
</td></tr>
</table>

<table>
<tr><th>getSubject()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>protected getSubject(): Subject<T></code>
<h3>Parámetros</h3>
No recibe ningún parámetro.
<h3>Retorna</h3>
<code>Subject<T></code>
</td></tr>
</table>

<table>
<tr><th>connect()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>connect(): Subscription</code>
<h3>Parámetros</h3>
No recibe ningún parámetro.

<h3>Retorna</h3>
<code>Subscription</code>
</td></tr>
</table>

<table>
<tr><th>refCount()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>refCount(): Observable<T></code>

<h3>Parámetros</h3>
No recibe ningún parámetro.

<h3>Retorna</h3>
<code>Observable<T></code>
</td></tr>
</table>
