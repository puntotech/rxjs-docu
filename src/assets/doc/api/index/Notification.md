# Notificación

<h2 class="subtitle">Representa un evento o valor <em>push</em> que puede emitir un Observable. Esta clase es especialmente útil para los operadores que gestionan notificaciones, como materialize, dematerialize, observeOn y demás. Además de crear una capa sobre el valor emitido, también lo anota con metadatos de, por ejemplo, qué tipo de mensaje push es (next, error o complete) </h2>

```typescript
class Notification<T> {
  static createNext<T>(value: T): Notification<T>;
  static createError<T>(err?: any): Notification<T>;
  static createComplete(): Notification<any>;
  constructor(kind: "N" | "E" | "C", value?: T, error?: any);
  hasValue: boolean;
  kind: "N" | "E" | "C";
  value?: T;
  error?: any;
  observe(observer: PartialObserver<T>): any;
  do(
    next: (value: T) => void,
    error?: (err: any) => void,
    complete?: () => void
  ): any;
  accept(
    nextOrObserver:
      | NextObserver<T>
      | ErrorObserver<T>
      | CompletionObserver<T>
      | ((value: T) => void),
    error?: (err: any) => void,
    complete?: () => void
  );
  toObservable(): Observable<T>;
}
```

# Métodos Estáticos

<table>
<tr><th>createNext()</th></tr>
<tr><td>Un atajo para crear una instancia de una Notificación de tipo <code>next</code> a partir de un valor dado.</td></tr>
<tr><td>
<h3>Firma</h3>
<code>static createNext<T>(value: T): Notification<T></code>

<h3>Parámetros</h3>

<table>
<tr><td>value</td><td>El valor <code>next</code>.</td></tr>
</table>

<h3>Retorna</h3>
<code>Notification<T></code>: La Notificación "next" que representa al argumento.

</td></tr>
</table>

<table>
<tr><th>createError()</th></tr>
<tr><td>Un atajo para crear una instancia de una Notificación de tipo <code>error</code> a partir de un valor dado.</td></tr>
<tr><td>
<h3>Firma</h3>
<code>static createError<T>(err?: any): Notification<T></code>

<h3>Parámetros</h3>

<table>
<tr><td>err</td><td>Opcional. El valor por defecto es <code>undefined</code>.
El error de <code>error</code>.</td></tr>
</table>

<h3>Retorna</h3>
<code>Notification<T></code>: La Notificación "error" que representa al argumento.

</td></tr>
</table>

<table>
<tr><th>createComplete()</th></tr>
<tr><td>Un atajo para crear una instancia de una Notificación de tipo <code>complete</code>.</td></tr>
<tr><td>
<h3>Firma</h3>
<code>static createComplete(): Notification<any></code>

<h3>Parámetros</h3>
No recibe ningún parámetro.

<h3>Retorna</h3>
<code>Notification<any></code>: La Notificación "complete", que carece de valor.

</td></tr>
</table>

## Constructor

<table>
<tr><th>constructor()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>constructor(kind: "N" | "E" | "C", value?: T, error?: any)</code>

<h3>Parámetros</h3>

<table>
<tr><td>kind</td><td>Tipo: <code>"N" | "E" | "C"</code>.</td></tr>
<tr><td>value</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>T</code>.</td></tr>
<tr><td>error</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>any</code>.</td></tr>
</table>
</td></tr>
</table>

## Propiedades

<table>
<tr><th>Propiedad</th><th>Tipo</th><th>Descripción</th></tr>
<tr><td>hasValue</td><td>boolean</td></tr>
<tr><td>kind</td><td>'N' | 'E' | 'C'</td><td>Declarado en el constructor.</td></tr>
<tr><td>value</td><td>T</td><td>Declarado en el constructor.</td></tr>
<tr><td>error</td><td>any</td><td>Declarado en el constructor.</td></tr>
</table> 
   
## Métodos

<table>
<tr><th>observe()</th></tr>
<tr><td>Envía al observador proporcionado el valor englobado por esta Notificación.</td></tr>
<tr><td>
<h3>Firma</h3>
<code>observe(observer: PartialObserver<T>): any</code>

<h3>Parámetros</h3>

<table>
<tr><td>observer</td><td>Tipo: <code>PartialObserver</code>.</td></tr>
</table>

<h3>Retorna</h3>
<code>any:</code>

</td></tr>
</table>

<table>
<tr><th>do()</th></tr>
<tr><td>Dada una callback de un Observador, envía el valor representado por la Notificación actual a la callback correspondiente.</td></tr>
<tr><td>
<h3>Firma</h3>
<code>do(next: (value: T) => void, error?: (err: any) => void, complete?: () => void): any</code>

<h3>Parámetros</h3>

<table>
<tr><td>next</td><td>Una callback <code>next</code> de un Observador.</td></tr>
<tr><td>error</td><td>Una callback <code>error</code> de un Observador.
Opcional. El valor por defecto es <code>undefined</code>.</td></tr>
<tr><td>complete</td><td>Una callback <code>complete</code> de un Observador.
Opcional. El valor por defecto es <code>undefined</code>.</td></tr>
</table>

<h3>Retorna</h3>
<code>any:</code>

</td></tr>
</table>

<table>
<tr><th>accept()</th></tr>
<tr><td>Recibe un Observador o sus funciones callback individuales y llama al método observe u otro método correspondiente.</td></tr>
<tr><td>
<h3>Firma</h3>
<code>accept(nextOrObserver: NextObserver<T> | ErrorObserver<T> | CompletionObserver<T> | ((value: T) => void), error?: (err: any) => void, complete?: () => void)</code>

<h3>Parámetros</h3>

<table>
<tr><td>nextOrObserver</td><td>Un Observador o una callback <code>next</code></td></tr>
<tr><td>error</td><td>Una callback <code>error</code> de un Observador.
Opcional. El valor por defecto es <code>undefined</code>.</td></tr>
<tr><td>complete</td><td>Una callback <code>complete</code> de un Observador.
Opcional. El valor por defecto es <code>undefined</code>.</td></tr>
</table>

</td></tr>
</table>

<table>
<tr><th>toObservable()</th></tr>
<tr><td>Retorna un Observable simple que emite la notificación representada por esta instancia de Notificación.</td></tr>
<tr><td>
<h3>Firma</h3>
<code>toObservable(): Observable<T></code>

<h3>Parámetros</h3>
No recibe ningún parámetro.

<h3>Retorna</h3>
<code>Observable<T>:</code>
</td></tr>
</table>

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/6.5.5/src/internal/Notification.ts#L17-L148">
<img src="assets/icons/source-code.png" alt="Source code">
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/index/class/Notification">Documentación oficial en inglés</a>
