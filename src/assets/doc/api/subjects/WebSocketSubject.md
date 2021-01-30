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

<table>
<tr><th>constructor()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>constructor(urlConfigOrSource: string | WebSocketSubjectConfig<T> | Observable<T>, destination?: Observer<T>)</code>

<h3>Parámetros</h3>

<table>
<tr><td>urlConfigOrSource</td><td>Tipo: <code>string | WebSocketSubjectConfig | Observable</code>.</td></tr>
<tr><td>destination</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>Observer</code>.</td></tr>
</table>
</td></tr>
</table>

## Propiedades

<table>
<tr><th>Propiedad</th><th>Tipo</th><th>Descripción</th></tr>
<tr><td>_output</td><td><code>Subject<T></code></td></tr>
</table>

## Métodos

<table>
<tr><th>lift()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>lift<R>(operator: Operator<T, R>): WebSocketSubject<R></code>
<h3>Parámetros</h3>

<table>
<tr><td>operator</td><td>Tipo: <code>Operator</code>.</td></tr>
</table>

<h3>Retorna</h3>
<code>WebSocketSubject<R></code>
</td></tr>
</table>

<table>
<tr><th>multiplex()</th></tr>
<tr><td>Crea un Observable que, al ser suscrito, envía el mensaje definido por la función <code>subMsg</code> al servidor a través del socket para dar comienzo a una suscripción a datos a través de dicho socket. Una vez recibidos los datos, el argumento <code>messageFilter</code> se utilizará para seleccionar los datos apropiados para el Observable resultante. Cuando se ejecute la lógica de <em>teardown</em>, bien debido a la cancelación de la suscripción, a la completación o a un error, un mensaje definido por el argumento <code>unsubMsg</code> será enviado al servidor a través del WebSocketSubject.</td></tr>
<tr><td>
<h3>Firma</h3>
<code>multiplex(subMsg: () => any, unsubMsg: () => any, messageFilter: (value: T) => boolean)</code>
</td></tr>
</table>

<h3>Parámetros</h3>

<table>
<tr><td>subMsg</td><td>Una función para generar el mensaje de suscripción que será enviado al servidor. Esto seguirá siendo procesado por el serializador en la configuración del WebSocketSubject (por defecto se utiliza la serialización JSON.)</td></tr>
<tr><td>unsubMsg</td><td>Una función para generar el menasje de cancelación de suscripción que será enviado al servidor cuando se ejecute la lógica de <em>teardown</em>. Esto seguirá siendo procesado por el serializador en la configuración del WebSocketSubject.</td></tr>
<tr><td>messageFilter</td><td>Un predicado para seleccionar los mensajes del servidor apropiados para el flujo resultante.</td></tr>
</table>

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
<tr><th>unsubscribe()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>unsubscribe()</code>

<h3>Parámetros</h3>
No recibe ningún parámetro.
</td></tr>
</table>

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/6.5.5/src/internal/observable/dom/WebSocketSubject.ts#L150-L387">
<img src="assets/icons/source-code.png" alt="Source code">
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/webSocket/WebSocketSubject">Documentación oficial en inglés</a>
