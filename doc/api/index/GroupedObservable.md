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

| constructor()                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |                                                                                                                 |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| <h4>Firma</h4><p><code>constructor(key: K, groupSubject: Subject, refCountSubscription?: RefCountSubscription)</code></p><h4>Parámetros</h4><table data-header-hidden><thead><tr><th></th><th></th></tr></thead><tbody><tr><td>key</td><td>Tipo: <code>K</code>.</td></tr><tr><td>groupSubject</td><td>Tipo: <code>Subject</code>.</td></tr><tr><td>refCountSubscription</td><td><p>Opcional. El valor por defecto es <code>undefined</code>.</p><p>Tipo: <code>RefCountSubscription</code>.</p></td></tr></tbody></table> |                                                                                                                 |
| key                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Tipo: `K`.                                                                                                      |
| groupSubject                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Tipo: `Subject`.                                                                                                |
| refCountSubscription                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | <p>Opcional. El valor por defecto es <code>undefined</code>.</p><p>Tipo: <code>RefCountSubscription</code>.</p> |

## Propiedades

| Propiedad | Tipo | Descripción                  |
| --------- | ---- | ---------------------------- |
| key       | `K`  | Declarado en el constructor. |

## Métodos

| \_subscribe()                                                                                                                                                                                                                                         |                     |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| <h4>Firma</h4><p><code>_subscribe(subscriber: Subscriber)</code></p><h4>Parámetros</h4><table data-header-hidden><thead><tr><th></th><th></th></tr></thead><tbody><tr><td>subscriber</td><td>Tipo: <code>Subscriber</code>.</td></tr></tbody></table> |                     |
| subscriber                                                                                                                                                                                                                                            | Tipo: `Subscriber`. |

## Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/6.5.5/src/internal/operators/groupBy.ts#L269-L296)

[Documentación oficial en inglés](https://rxjs.dev/api/index/class/GroupedObservable)
