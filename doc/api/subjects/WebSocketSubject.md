# WebSocketSubject

```typescript
class WebSocketSubject<T> extends AnonymousSubject {
  constructor(
    urlConfigOrSource: string | WebSocketSubjectConfig<T> | Observable<T>,
    destination?: Observer<T>
  );
  _output: Subject<T>;
  lift<R>(operator: Operator<T, R>): WebSocketSubject<R>;
  multiplex(
    subMsg: () => any,
    unsubMsg: () => any,
    messageFilter: (value: T) => boolean
  );
  _subscribe(subscriber: Subscriber<T>): Subscription;
  unsubscribe();
}
```

## Constructor

| constructor()                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |                                                                  |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| <h4>Firma</h4><p><code>constructor(urlConfigOrSource: string | WebSocketSubjectConfig | Observable, destination?: Observer)</code></p><h4>Parámetros</h4><table data-header-hidden><thead><tr><th></th><th></th></tr></thead><tbody><tr><td>urlConfigOrSource</td><td>Tipo: <code>string | WebSocketSubjectConfig | Observable</code>.</td></tr><tr><td>destination</td><td>Opcional. El valor por defecto es <code>undefined</code>. Tipo: <code>Observer</code>.</td></tr></tbody></table> |                                                                  |
| urlConfigOrSource                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Tipo: `string \| WebSocketSubjectConfig \| Observable`.          |
| destination                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Opcional. El valor por defecto es `undefined`. Tipo: `Observer`. |

## Propiedades

| Propiedad | Tipo      | Descripción |
| --------- | --------- | ----------- |
| \_output  | `Subject` |             |

## Métodos

| lift()                                                                                                                                                                                                                                                                                                        |                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| <h4>Firma</h4><p><code>lift(operator: Operator): WebSocketSubject</code></p><h4>Parámetros</h4><table data-header-hidden><thead><tr><th></th><th></th></tr></thead><tbody><tr><td>operator</td><td>Tipo: <code>Operator</code>.</td></tr></tbody></table><h4>Retorna</h4><p><code>WebSocketSubject</code></p> |                   |
| operator                                                                                                                                                                                                                                                                                                      | Tipo: `Operator`. |

| multiplex()                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Crea un Observable que, al ser suscrito, envía el mensaje definido por la función `subMsg` al servidor a través del socket para dar comienzo a una suscripción a datos a través de dicho socket. Una vez recibidos los datos, el argumento `messageFilter` se utilizará para seleccionar los datos apropiados para el Observable resultante. Cuando se ejecute la lógica de _teardown_, bien debido a la cancelación de la suscripción, a la completación o a un error, un mensaje definido por el argumento `unsubMsg` será enviado al servidor a través del WebSocketSubject. |
| <h4>Firma</h4><p><code>multiplex(subMsg: () => any, unsubMsg: () => any, messageFilter: (value: T) => boolean)</code></p>                                                                                                                                                                                                                                                                                                                                                                                                                                                       |

### Parámetros

| subMsg        | Una función para generar el mensaje de suscripción que será enviado al servidor. Esto seguirá siendo procesado por el serializador en la configuración del WebSocketSubject (por defecto se utiliza la serialización JSON.)           |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| unsubMsg      | Una función para generar el menasje de cancelación de suscripción que será enviado al servidor cuando se ejecute la lógica de _teardown_. Esto seguirá siendo procesado por el serializador en la configuración del WebSocketSubject. |
| messageFilter | Un predicado para seleccionar los mensajes del servidor apropiados para el flujo resultante.                                                                                                                                          |

| \_subscribe()                                                                                                                                                                                                                                                                                                       |                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| <h4>Firma</h4><p><code>_subscribe(subscriber: Subscriber): Subscription</code></p><h4>Parámetros</h4><table data-header-hidden><thead><tr><th></th><th></th></tr></thead><tbody><tr><td>subscriber</td><td>Tipo: <code>Subscriber</code>.</td></tr></tbody></table><h4>Retorna</h4><p><code>Subscription</code></p> |                     |
| subscriber                                                                                                                                                                                                                                                                                                          | Tipo: `Subscriber`. |

| unsubscribe()                                                                                        |
| ---------------------------------------------------------------------------------------------------- |
| <h4>Firma</h4><p><code>unsubscribe()</code></p><h4>Parámetros</h4><p>No recibe ningún parámetro.</p> |

## Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/6.5.5/src/internal/observable/dom/WebSocketSubject.ts#L150-L387)

[Documentación oficial en inglés](https://rxjs.dev/api/webSocket/WebSocketSubject)
