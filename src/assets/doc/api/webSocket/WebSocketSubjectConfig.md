# WebSocketSubjectConfig

<h2 class="subtitle">WebSocketSubjectConfig es un Objeto sencillo que permite configurar un WebSocket</h2>

```typescript
interface WebSocketSubjectConfig<T> {
  url: string
  protocol?: string | Array<string>
  resultSelector?: (e: MessageEvent) => T
  serializer?: (value: T) => WebSocketMessage
  deserializer?: (e: MessageEvent) => T
  openObserver?: NextObserver<Event>
  closeObserver?: NextObserver<CloseEvent>
  closingObserver?: NextObserver<void>
  WebSocketCtor?: {...}
  binaryType?: 'blob' | 'arraybuffer'
}
```

## Descripciṕn

Proporciona flexibilidad a webSocket.

It defines a set of properties to provide custom behavior in specific moments of the socket's lifecycle. When the connection opens we can use openObserver, when the connection is closed closeObserver, if we are interested in listening for data comming from server: deserializer, which allows us to customize the deserialization strategy of data before passing it to the socket client. By default deserializer is going to apply JSON.parse to each message comming from the Server.

## Ejemplos

deserializer, the default for this property is JSON.parse but since there are just two options for incomming data, either be text or binarydata. We can apply a custom deserialization strategy or just simply skip the default behaviour.

```javascript
import { webSocket } from 'rxjs/webSocket';

const wsSubject = webSocket({
url: 'ws://localhost:8081',
//Apply any transformation of your choice.
deserializer: ({data}) => data
});

wsSubject.subscribe(console.log);

// Let's suppose we have this on the Server: ws.send("This is a msg from the server")
//output
//
// This is a msg from the server
serializer allows us tom apply custom serialization strategy but for the outgoing messages
```

```javascript
import { webSocket } from 'rxjs/webSocket';

const wsSubject = webSocket({
url: 'ws://localhost:8081',
//Apply any transformation of your choice.
serializer: msg => JSON.stringify({channel: "webDevelopment", msg: msg})
});

wsSubject.subscribe(() => subject.next("msg to the server"));

// Let's suppose we have this on the Server: ws.send("This is a msg from the server")
//output
//
// {"channel":"webDevelopment","msg":"msg to the server"}
closeObserver allows us to set a custom error when an error raise up.
```

```javascript
import { webSocket } from "rxjs/webSocket";

const wsSubject = webSocket({
  url: "ws://localhost:8081",
  closeObserver: {
    next(closeEvent) {
      const customError = { code: 6666, reason: "Custom evil reason" };
      console.log(`code: ${customError.code}, reason: ${customError.reason}`);
    },
  },
});

//output
// code: 6666, reason: Custom evil reason
```

openObserver, Let's say we need to make some kind of init task before sending/receiving msgs to the webSocket or sending notification that the connection was successful, this is when openObserver is usefull for.

```javascript
import { webSocket } from "rxjs/webSocket";

const wsSubject = webSocket({
  url: "ws://localhost:8081",
  openObserver: {
    next: () => {
      console.log("Conexión OK");
    },
  },
});

// Salida:
// Conexión OK`
```

## Propiedades

<table>
<tr><th>Propiedad</th><th>Tipo</th><th>Descripción</th></tr>
<tr><td>url</td><td><code>string</code></td><td>La url del servidor al que conectarse.</td></tr>
<tr><td>protocol</td><td><code>string | Array<string></code></td><td>El protocolo a utilizar para conectar.</td></tr>
<tr><td>resultSelector</td><td><code>(e: MessageEvent) => T</code></td></tr>
<tr><td>serializer</td><td><code>(value: T) => WebSocketMessage</code></td><td>El serializador utilizado para crear mensajes a partir de los valores proporcionados antes de que los mensajes se envían al servidor. Por defecto es <code>JSON.stringify</code></td></tr>
<tr><td>deserializer</td><td><code>(e: MessageEvent) => T</code></td><td>El deserialiador utilizado para los mensajes que llegan al socket desde el servidor. Por defecto es <code>JSON.parse</code></td></tr>
<tr><td>openObserver</td><td><code>NextObserver<Event></code></td><td>Un Observador que observa los eventos <em>open</em> que ocurran en el webSocket subyacente.</td></tr>
<tr><td>closeObserver</td><td><code>NextObserver<CloseEvent></code></td><td>Un Observador que observa los eventos <em>close</em> que ocurran en el webSocket subyacente.</td></tr>
<tr><td>closingObserver</td><td><code>NextObserver<void></code></td><td>Un Observador que observa el momento en el que un evnto <em>close</em> va a ocurrir debido a una cancelación de suscripción.</td></tr>
<tr><td>WebSocketCtor</td><td><code>{ new (url: string, protocols?: string | string[]): WebSocket; }</code></td><td>El constructor WebSocket que utilizar. Esto puede resultar útil para utilizar una implementación de WebSocket en Node (WebSocket es una API del DOM) o para falsificar <em>(mock)</em> un WebSocket en un entorno de testing.</td></tr>
<tr><td>binaryType</td><td><code>'blob' | 'arraybuffer'</code></td><td>Especifica la propiedad <code>binaryType</code> del WebSocket subyacente.</td></tr>
</table>

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/6.5.5/src/internal/observable/dom/WebSocketSubject.ts#L8-L138">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/webSocket/WebSocketSubjectConfig">Documentación oficial en inglés</a>
