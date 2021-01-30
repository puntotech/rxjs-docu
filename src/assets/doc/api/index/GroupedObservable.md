# GroupedObservable

An Observable representing values belonging to the same group represented by a common key. The values emitted by a GroupedObservable come from the source Observable. The common key is available as the field key on a GroupedObservable instance.

```typescript
class GroupedObservable<K, T> extends Observable {
  constructor(
    key: K,
    groupSubject: Subject<T>,
    refCountSubscription?: RefCountSubscription
  );
  key: K;
  _subscribe(subscriber: Subscriber<T>);

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
<code>constructor(key: K, groupSubject: Subject<T>, refCountSubscription?: RefCountSubscription)</code>
<h3>Parámetros</h3>
<table>
<tr><td>key</td><td>Tipo: <code>K</code>.</td></tr>
<tr><td>groupSubject</td><td>Tipo: <code>Subject</code>.</td></tr>
<tr><td>refCountSubscription</td><td>Opcional. El valor por defecto es <code>undefined</code>.

Tipo: <code>RefCountSubscription</code>.</td></tr>

</table>

</td></tr>
</table>

## Propiedades

<table>
<tr><th>Propiedad</th><th>Tipo</th><th>Descripción</th></tr>
<tr><td>key</td><td><code>K</code></td><td>Declarado en el constructor.</td></tr>
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

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/6.5.5/src/internal/operators/groupBy.ts#L269-L296">
<img src="assets/icons/source-code.png" alt="Source code">
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/index/class/GroupedObservable">Documentación oficial en inglés</a>
