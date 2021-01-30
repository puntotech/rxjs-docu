# ReplaySubject

<h2 class="subtitle">Un tipo de Sujeto que "repite" o reemite valores antiguos a suscriptores nuevos. Almacena un número determinado de valores en un búfer y emite dichos valores inmediatamente a cualquier suscriptor nuevo, además de emitir nuevos valores a los suscriptores existentes</h2>

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

<table>
<tr><th>constructor()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>constructor(bufferSize: number = Number.POSITIVE_INFINITY, windowTime: number = Number.POSITIVE_INFINITY, scheduler?: SchedulerLike)</code>

<h3>Parámetros</h3>

<table>
<tr><td>bufferSize</td><td>Opcional. El valor por defecto es <code>Number.POSITIVE_INFINITY</code>.
Tipo: <code>number</code>.</td></tr>

<tr><td>windowTime</td><td>Opcional. El valor por defecto es <code>Number.POSITIVE_INFINITY</code>.
Tipo: <code>number</code>.</td></tr>

<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>

</table>

</table>

## Métodos

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
<tr><th>_getNow()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>_getNow(): number</code>
<h3>Parámetros</h3>

No recibe ningún parámetro.

<h3>Retorna</h3>

<code>number</code>

</td></tr>
</table>
