# ReplaySubject

## Un tipo de Sujeto que "repite" o reemite valores antiguos a suscriptores nuevos. Almacena un número determinado de valores en un búfer y emite dichos valores inmediatamente a cualquier suscriptor nuevo, además de emitir nuevos valores a los suscriptores existentes

```typescript
class ReplaySubject<T> extends Subject {
  constructor(
    bufferSize: number = Number.POSITIVE_INFINITY,
    windowTime: number = Number.POSITIVE_INFINITY,
    scheduler?: SchedulerLike
  );
  _subscribe(subscriber: Subscriber<T>): Subscription;
  _getNow(): number;

  // inherited from index/Subject
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

  // inherited from index/Observable
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

| constructor()                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                               |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| <h4>Firma</h4><p><code>constructor(bufferSize: number = Number.POSITIVE_INFINITY, windowTime: number = Number.POSITIVE_INFINITY, scheduler?: SchedulerLike)</code></p><h4>Parámetros</h4><table data-header-hidden><thead><tr><th></th><th></th></tr></thead><tbody><tr><td>bufferSize</td><td>Opcional. El valor por defecto es <code>Number.POSITIVE_INFINITY</code>. Tipo: <code>number</code>.</td></tr><tr><td>windowTime</td><td>Opcional. El valor por defecto es <code>Number.POSITIVE_INFINITY</code>. Tipo: <code>number</code>.</td></tr><tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>. Tipo: <code>SchedulerLike</code>.</td></tr></tbody></table> |                                                                               |
| bufferSize                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Opcional. El valor por defecto es `Number.POSITIVE_INFINITY`. Tipo: `number`. |
| windowTime                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Opcional. El valor por defecto es `Number.POSITIVE_INFINITY`. Tipo: `number`. |
| scheduler                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Opcional. El valor por defecto es `undefined`. Tipo: `SchedulerLike`.         |

## Métodos

| \_subscribe()                                                                                                                                                                                                                                                                                                       |                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| <h4>Firma</h4><p><code>_subscribe(subscriber: Subscriber): Subscription</code></p><h4>Parámetros</h4><table data-header-hidden><thead><tr><th></th><th></th></tr></thead><tbody><tr><td>subscriber</td><td>Tipo: <code>Subscriber</code>.</td></tr></tbody></table><h4>Retorna</h4><p><code>Subscription</code></p> |                     |
| subscriber                                                                                                                                                                                                                                                                                                          | Tipo: `Subscriber`. |

| \_getNow()                                                                                                                                         |
| -------------------------------------------------------------------------------------------------------------------------------------------------- |
| <h4>Firma</h4><p><code>_getNow(): number</code></p><h4>Parámetros</h4><p>No recibe ningún parámetro.</p><h4>Retorna</h4><p><code>number</code></p> |
