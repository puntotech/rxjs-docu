# BehaviorSubject

## Un tipo de Sujeto que requiere un valor inicial y emmite su valor actual cuando es suscrito

```typescript
    class BehaviorSubject<T> extends Subject {
      constructor(_value: T)
      get value: T
      _subscribe(subscriber: Subscriber<T>): Subscription
      getValue(): T
      next(value: T): void

      // inherited from index/Subject
      static create: Function
      constructor()
      observers: Observer<T>[]
      closed: false
      isStopped: false
      hasError: false
      thrownError: any
      lift<R>(operator: Operator<T, R>): Observable<R>
      next(value?: T)
      error(err: any)
      complete()
      unsubscribe()
      _trySubscribe(subscriber: Subscriber<T>): TeardownLogic
      _subscribe(subscriber: Subscriber<T>): Subscription
      asObservable(): Observable<T>

      // inherited from index/Observable
      static create: Function
      static if: typeof iif
      static throw: typeof throwError
      constructor(subscribe?: (this: Observable<T>, subscriber: Subscriber<T>) => TeardownLogic)
      _isScalar: boolean
      source: Observable<any>
      operator: Operator<any, T>
      lift<R>(operator: Operator<T, R>): Observable<R>
      subscribe(observerOrNext?: NextObserver<T> | ErrorObserver<T> | CompletionObserver<T> | ((value: T) => void), error?: (error: any) => void, complete?: () => void): Subscription
      _trySubscribe(sink: Subscriber<T>): TeardownLogic
      forEach(next: (value: T) => void, promiseCtor?: PromiseConstructorLike): Promise<void>
      pipe(...operations: OperatorFunction<any, any>[]): Observable<any>
      toPromise(promiseCtor?: PromiseConstructorLike): Promise<T>
    }
```

## Constructor

| constructor()                                                               |            |
| --------------------------------------------------------------------------- | ---------- |
| <h4>Firma</h4><p><code>constructor(_value: T)</code></p><h4>Parámetros</h4> |            |
| \_value                                                                     | Tipo: `T`. |

## Propiedades

| Propiedad | Tipo | Descripción |
| --------- | ---- | ----------- |
| valor     | `T`  | Read-only.  |

## Métodos

| \_subscribe()                                                                                                                                                                                                                                                                                                       |                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| <h4>Firma</h4><p><code>_subscribe(subscriber: Subscriber): Subscription</code></p><h4>Parámetros</h4><table data-header-hidden><thead><tr><th></th><th></th></tr></thead><tbody><tr><td>subscriber</td><td>Tipo: <code>Subscriber</code>.</td></tr></tbody></table><h4>Retorna</h4><p><code>Subscription</code></p> |                     |
| subscriber                                                                                                                                                                                                                                                                                                          | Tipo: `Subscriber`. |

| getValue()                                                                                                                                |
| ----------------------------------------------------------------------------------------------------------------------------------------- |
| <h4>Firma</h4><p><code>getValue(): T</code></p><h4>Parámetros</h4><p>No recibe ningún parámetro.</p><h4>Retorna</h4><p><code>T</code></p> |

| next()                                                                                                                                                                                                                                                            |            |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| <h4>Firma</h4><p><code>next(value: T): void</code></p><h4>Parámetros</h4><table data-header-hidden><thead><tr><th></th><th></th></tr></thead><tbody><tr><td>value</td><td>Tipo: <code>T</code>.</td></tr></tbody></table><h4>Retorna</h4><p><code>void</code></p> |            |
| value                                                                                                                                                                                                                                                             | Tipo: `T`. |
