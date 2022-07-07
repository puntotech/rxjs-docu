# AsyncSubject

<h2 class="subtitle">Un tipo de Sujeto que únicamente emite un valor cuando se completa. Al completarse emitirá su último valor a todos sus observadores</h2>

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

<table>
<tr><th>_subscribe()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>_subscribe(subscriber: Subscriber<any>): Subscription</code>

<h3>Parámetros</h3>

<table>
<tr><td>subscriber</td><td>Tipo: <code>Subscriber</code>.</td></tr>
</table>

<h3>Retorna</h3>

<code>Subscription</code>

</td></td>
</table>

<table>
<tr><th>next()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>next(value: T): void</code>
<h3>Parámetros</h3>
<table>
<tr><td>value</td><td>Tipo: <code>T</code>.</td></tr>
</table>

<h3>Retorna</h3>

<code>void</code>

</td></tr>
</table>

<table>
<tr><th>error()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>error(error: any): void</code>
Parámetros

<table>
<tr><td>error</td><td>Tipo: <code>any</code>.</td></tr>
</table>

<h3>Retorna</h3>

<code>void</code>

</td></tr>
</table>

<table>
<tr><th>complete()</th></tr>
<tr><td>
<h3>Firma</h3>
complete(): void
<h3>Parámetros</h3>

No recibe ningún parámetro.

<h3>Retorna</h3>

<code>void</code>

</td></tr>
</table>
