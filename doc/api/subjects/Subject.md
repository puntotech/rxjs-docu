# Subject

## Un Sujeto es un tipo especial de Observable que permite que los valores sean multidifundidos a varios Observadores. Los Sujetos son como EventEmitters

```typescript
class Subject<T> extends Observable implements SubscriptionLike {
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

## Subclases

* [BehaviorSubject](../../../api/subjects/BehaviorSubject/)
* [ReplaySubject](../../../api/subjects/ReplaySubject/)
* [AsyncSubject](../../../api/subjects/AsyncSubject/)

## Descripción

Cada Sujeto es un Observable y un Observador. Se puede realizar una suscripción a un Sujeto, y llamar al método next() para proporcionarle valores, además de notificaciones de error y complete.

## Propiedades Estáticas

| Property | Type     | Description |
| -------- | -------- | ----------- |
| create   | Function |             |

## Constructor

| constructor()                                                                            |
| ---------------------------------------------------------------------------------------- |
| <h4><code>constructor()</code></h4><h4>Parámetros</h4><p>No recibe ningún parámetro.</p> |

## Propiedades

| Propiedad   | Tipo         | Descripción |
| ----------- | ------------ | ----------- |
| observers   | `Observer[]` |             |
| closed      | `false`      |             |
| isStopped   | `false`      |             |
| hasError    | `false`      |             |
| thrownError | `any`        |             |

## Métodos

| lift()                                                                                                                                                                                                                                                                                            |                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| <h4>Firma</h4><p><code>lift(operator: Operator): Observable</code></p><h4>Parámetros</h4><table data-header-hidden><thead><tr><th></th><th></th></tr></thead><tbody><tr><td>operator</td><td>Tipo: <code>Operator</code>.</td></tr></tbody></table><h4>Retorna</h4><p><code>Observable</code></p> |                   |
| operator                                                                                                                                                                                                                                                                                          | Tipo: `Operator`. |

| next()                                                                                                                                                                                                                                                                                      |                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| <h4>Firma</h4><p><code>next(value?: T)</code></p><h4>Parámetros</h4><table data-header-hidden><thead><tr><th></th><th></th></tr></thead><tbody><tr><td>value</td><td><p>Opcional. El valor por defecto es <code>undefined</code>.</p><p>Tipo: <code>T</code>.</p></td></tr></tbody></table> |                                                                                              |
| value                                                                                                                                                                                                                                                                                       | <p>Opcional. El valor por defecto es <code>undefined</code>.</p><p>Tipo: <code>T</code>.</p> |

| error()                                                                                                                                                                                                              |              |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| <h4>Firma</h4><p><code>error(err: any)</code></p><h4>Parámetros</h4><table data-header-hidden><thead><tr><th></th><th></th></tr></thead><tbody><tr><td>err</td><td>Tipo: <code>any</code>.</td></tr></tbody></table> |              |
| err                                                                                                                                                                                                                  | Tipo: `any`. |

| complete()                                                                                        |
| ------------------------------------------------------------------------------------------------- |
| <h4>Firma</h4><p><code>complete()</code></p><h4>Parámetros</h4><p>No recibe ningún parámetro.</p> |

| unsubscribe()                                                                                        |
| ---------------------------------------------------------------------------------------------------- |
| <h4>Firma</h4><p><code>unsubscribe()</code></p><h4>Parámetros</h4><p>No recibe ningún parámetro.</p> |

| \_trySubscribe()                                                                                                                                                                                                                                                                                                         |                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- |
| <h4>Firma</h4><p><code>_trySubscribe(subscriber: Subscriber): TeardownLogic</code></p><h4>Parámetros</h4><table data-header-hidden><thead><tr><th></th><th></th></tr></thead><tbody><tr><td>subscriber</td><td>Tipo: <code>Subscriber</code>.</td></tr></tbody></table><h4>Retorna</h4><p><code>TeardownLogic</code></p> |                     |
| subscriber                                                                                                                                                                                                                                                                                                               | Tipo: `Subscriber`. |

| \_subscribe()                                                                                                                                                                                                                                                                                                       |                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| <h4>Firma</h4><p><code>_subscribe(subscriber: Subscriber): Subscription</code></p><h4>Parámetros</h4><table data-header-hidden><thead><tr><th></th><th></th></tr></thead><tbody><tr><td>subscriber</td><td>Tipo: <code>Subscriber</code>.</td></tr></tbody></table><h4>Retorna</h4><p><code>Subscription</code></p> |                     |
| subscriber                                                                                                                                                                                                                                                                                                          | Tipo: `Subscriber`. |

| asObservable()                                                                                                                                                                                        |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Crea un nuevo Observable con este Sujeto como fuente. Se puede hacer esto para crear lógica personalizada de la parte Observador del Sujeto y esconderla del código que utiliza el Observable         |
| <h4>Firma</h4><p><code>asObservable(): Observable</code></p><h4>Parámetros</h4><p>No recibe ningún parámetro.</p><h4>Retorna</h4><p><code>Observable: Observable that the Subject casts to</code></p> |
