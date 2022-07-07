# BehaviorSubject

<h2 class="subtitle">Un tipo de Sujeto que requiere un valor inicial y emmite su valor actual cuando es suscrito</h2>

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

<table>
<tr><th>constructor()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>constructor(_value: T)</code>

<h3>Parámetros</h3>

<tr><td>_value</td><td>Tipo: <code>T</code>.</td></tr>
</td>
</tr>
</table>

## Propiedades

<table>
<tr><th>Propiedad</th><th>Tipo</th><th>Descripción</th></tr>
<tr><td>valor</td><td><code>T</code></td><td>Read-only.</td></tr>
</table>

## Métodos

<table>
<tr><th>_subscribe()</th><td>
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
<tr><th>getValue()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>getValue(): T</code>

<h3>Parámetros</h3>

No recibe ningún parámetro.

<h3>Retorna</h3>

<code>T</code>

</td></tr>
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
