# fromFetch

### Utiliza la API Fetch para hacer una petición HTTP

### Firma

`fromFetch<T>(input: string | Request, initWithSelector: RequestInit & { selector?: (response: Response) => any; } = {}): Observable<Response | T>`

### Parámetros

<table>
<tr><td></td><td></td></tr>
<tr><td></td><td></td></tr>
</table>

<table>
<tr><td>input</td><td>El recurso al que se quiere hacer el <code>fetch</code>. Puede ser una URL o un objeto petición.</td></tr>
<tr><td>initWithSelector</td><td>Opcional. El valor por defecto es <code>{}</code>.
Tipo: <code>RequestInit & { selector?: (response: Response) => any; }</code>.</td></tr>
</table>

### Retorna

`Observable<Response | T>`: Un Observable que hace una petición HTTP usando la función `fetch` nativa, cuando un Observador se suscribe a él. La Suscripción está atada al `AbortController` para el `fetch`.

## Descripción

ADVERTENCIA: Partes de la API de `fetch` siguen siendo experimentales. `AbortController` es imprescindible para que esta implementación funcione y para llevar a cabo la cancelación apropiadamente.

`fromFetch` automáticamente genera un `AbortController` interno para eliminar el `fetch` interno cuando se cancele la suscripción.

Si se proporciona una señal vía el argumento `init`, esta se comportará igual que con `fetch`. Si la señal proporcionada aborta, el error que `fetch` normalmente lanza se emitirá como un error del Observable.

## Ejemplos

Realizar una petición `fetch` y emitir el objeto `Response` al completo

[StackBlitz](https://stackblitz.com/edit/docu-rxjs-fromfetch?file=index.ts)

```javascript
import { fromFetch } from "rxjs/fetch";

const ghibliFilmResponse$ = fromFetch("https://ghibliapi.herokuapp.com/films");

ghibliFilmResponse$.subscribe(console.log);
// Salida: Response {...}
```

[StackBlitz]()

```javascript

```

[StackBlitz]()

```javascript

```

### Ejemplos de la documentación oficial

```javascript
import { of } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { switchMap, catchError } from "rxjs/operators";

const data$ = fromFetch("https://api.github.com/users?per_page=5").pipe(
  switchMap((response) => {
    if (response.ok) {
      // OK return data
      return response.json();
    } else {
      // Server is returning a status requiring the client to try something else.
      return of({ error: true, message: `Error ${response.status}` });
    }
  }),
  catchError((err) => {
    // Network or other error, handle appropriately
    console.error(err);
    return of({ error: true, message: err.message });
  })
);

data$.subscribe({
  next: (result) => console.log(result),
  complete: () => console.log("done"),
});
```

Use with Chunked Transfer Encoding

With HTTP responses that use chunked transfer encoding, the promise returned by fetch will resolve as soon as the response's headers are received.

That means the fromFetch observable will emit a Response - and will then complete - before the body is received. When one of the methods on the Response - like text() or json() - is called, the returned promise will not resolve until the entire body has been received. Unsubscribing from any observable that uses the promise as an observable input will not abort the request.

To facilitate aborting the retrieval of responses that use chunked transfer encoding, a selector can be specified via the init parameter:

```javascript
import { of } from "rxjs";
import { fromFetch } from "rxjs/fetch";

const data$ = fromFetch("https://api.github.com/users?per_page=5", {
  selector: (response) => response.json(),
});

data$.subscribe({
  next: (result) => console.log(result),
  complete: () => console.log("done"),
});
```

- [Documentación oficial en inglés](https://rxjs-dev.firebaseapp.com/api/fetch/fromFetch)
- [Código fuente(https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/dom/fetch.ts)
