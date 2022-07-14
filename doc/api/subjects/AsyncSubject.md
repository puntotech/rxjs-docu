# AsyncSubject

## Un tipo de Sujeto que únicamente emite un valor cuando se completa. Al completarse emitirá su último valor a todos sus observadores

```typescript
class AsyncSubject<T> extends Subject {
  _subscribe(subscriber: Subscriber<any>): Subscription;
  next(value: T): void;
  error(error: any): void;
  complete(): void;

  // Heredado de index/Subject
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

## Métodos

| \_subscribe()                                                                                                                                                                                                                                                                                                       |                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| <h4>Firma</h4><p><code>_subscribe(subscriber: Subscriber): Subscription</code></p><h4>Parámetros</h4><table data-header-hidden><thead><tr><th></th><th></th></tr></thead><tbody><tr><td>subscriber</td><td>Tipo: <code>Subscriber</code>.</td></tr></tbody></table><h4>Retorna</h4><p><code>Subscription</code></p> |                     |
| subscriber                                                                                                                                                                                                                                                                                                          | Tipo: `Subscriber`. |

| next()                                                                                                                                                                                                                                                            |            |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| <h4>Firma</h4><p><code>next(value: T): void</code></p><h4>Parámetros</h4><table data-header-hidden><thead><tr><th></th><th></th></tr></thead><tbody><tr><td>value</td><td>Tipo: <code>T</code>.</td></tr></tbody></table><h4>Retorna</h4><p><code>void</code></p> |            |
| value                                                                                                                                                                                                                                                             | Tipo: `T`. |

| error()                                                                                                                                                                                                                                                        |              |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| <h4>Firma</h4><p><code>error(error: any): void</code> Parámetros</p><table data-header-hidden><thead><tr><th></th><th></th></tr></thead><tbody><tr><td>error</td><td>Tipo: <code>any</code>.</td></tr></tbody></table><h4>Retorna</h4><p><code>void</code></p> |              |
| error                                                                                                                                                                                                                                                          | Tipo: `any`. |

| complete()                                                                                                                         |
| ---------------------------------------------------------------------------------------------------------------------------------- |
| <h4>Firma</h4><p>complete(): void</p><h4>Parámetros</h4><p>No recibe ningún parámetro.</p><h4>Retorna</h4><p><code>void</code></p> |
