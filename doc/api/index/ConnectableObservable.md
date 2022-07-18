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

| constructor()                                                                                                                                                                                                                                                                                                                                           |                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| <h4>Firma</h4><p><code>constructor(source: Observable, subjectFactory: () => Subject)</code></p><h4>Parámetros</h4><table data-header-hidden><thead><tr><th></th><th></th></tr></thead><tbody><tr><td>source</td><td>Tipo: <code>Observable</code>.</td></tr><tr><td>subjectFactory</td><td>Tipo: <code>() => Subject</code>.</td></tr></tbody></table> |                        |
| source                                                                                                                                                                                                                                                                                                                                                  | Tipo: `Observable`.    |
| subjectFactory                                                                                                                                                                                                                                                                                                                                          | Tipo: `() => Subject`. |

## Propiedades

| Propiedad      | Tipo            | Descripción                  |
| -------------- | --------------- | ---------------------------- |
| \_subject      | `Subject`       |                              |
| \_refCount     | `number`        |                              |
| \_connection   | `Subscription`  |                              |
| source         | `Observable`    | Declarado en el constructor. |
| subjectFactory | `() => Subject` | Declarado en el constructor. |

## Métodos

| \_subscribe()                                                                                                                                                                                                                                         |                     |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| <h4>Firma</h4><p><code>_subscribe(subscriber: Subscriber)</code></p><h4>Parámetros</h4><table data-header-hidden><thead><tr><th></th><th></th></tr></thead><tbody><tr><td>subscriber</td><td>Tipo: <code>Subscriber</code>.</td></tr></tbody></table> |                     |
| subscriber                                                                                                                                                                                                                                            | Tipo: `Subscriber`. |

| getSubject()                                                                                                                                                      |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <h4>Firma</h4><p><code>protected getSubject(): Subject</code></p><h4>Parámetros</h4><p>No recibe ningún parámetro.</p><h4>Retorna</h4><p><code>Subject</code></p> |

| connect()                                                                                                                                                      |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <h4>Firma</h4><p><code>connect(): Subscription</code></p><h4>Parámetros</h4><p>No recibe ningún parámetro.</p><h4>Retorna</h4><p><code>Subscription</code></p> |

| refCount()                                                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <h4>Firma</h4><p><code>refCount(): Observable</code></p><h4>Parámetros</h4><p>No recibe ningún parámetro.</p><h4>Retorna</h4><p><code>Observable</code></p> |
