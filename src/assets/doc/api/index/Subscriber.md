# Subscriber

<h2 class="subtitle">Implementa el interfaz Observador y extiende la clase Suscripción. Mientras el Observador es la API pública para consumir los valores de un Observable, todos los Observadores se convierten en Suscriptores, para poder proporcionar capacidades propias de la Suscripción, tal y como <code>unsubscribe</code>. <code>Subscriber</code> es un tipo común en RxJS y es crucial para implementar operadores, pero raramente se utiliza como API pública</h2>

```typescript
class Subscriber<T> extends Subscription implements Observer {
static create<T>(next?: (x?: T) => void, error?: (e?: any) => void, complete?: () => void): Subscriber<T>
constructor(destinationOrNext?: NextObserver<any> | ErrorObserver<any> | CompletionObserver<any> | ((value: T) => void), error?: (e?: any) => void, complete?: () => void)
protected isStopped: boolean
protected destination: PartialObserver<any> | Subscriber<any>
next(value?: T): void
error(err?: any): void
complete(): void
unsubscribe(): void
protected _next(value: T): void
protected _error(err: any): void
protected _complete(): void
_unsubscribeAndRecycle(): Subscriber<T>

// Heredado de index/Subscription
static EMPTY: Subscription
constructor(unsubscribe?: () => void)
closed: [object Object]
unsubscribe(): void
add(teardown: TeardownLogic): Subscription
remove(subscription: Subscription): void
}
```

## Métodos Estáticos

<table>
<tr><th>create()</th></tr>
<tr><td>Una factoría estática para un Suscriptor, dada una (posiblemente parcial) definición de un Observador.</td></tr>
<tr><td>
<h3>Firma</h3>
<code>static create<T>(next?: (x?: T) => void, error?: (e?: any) => void, complete?: () => void): Subscriber<T></code>
<h3>Parámetros</h3>

<table>
<tr><td>next</td><td>Opcional. El valor por defecto es <code>undefined</code>.
La <em>callback</em> next de un Observador.</td></tr>
<tr><td>error</td><td>Opcional. El valor por defecto es <code>undefined</code>.
La <em>callback</em> error de un Observador.</td></tr>
<tr><td>complete</td><td>Opcional. El valor por defecto es <code>undefined</code>.
La <em>callback</em> de un Observador.</td></tr>
</table>

<h3>Retorna</h3>
<code>Subscriber<T></code>: Un Suscriptor que envuelve el Observador (parcialmente definido) representado por los argumentos dados.
</td></tr>
</table>

## Constructor

<table>
<tr><th>constructor()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>constructor(destinationOrNext?: NextObserver<any> | ErrorObserver<any> | CompletionObserver<any> | ((value: T) => void), error?: (e?: any) => void, complete?: () => void)</code>
<h3>Parámetros</h3>

<table>
<tr><td>destinationOrNext</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Un Observador parcialmente definido o una función <em>callback</em> next.</td></tr>
<tr><td>error</td><td>Opcional. El valor por defecto es <code>undefined</code>.
La <em>callback</em> error de un Observador.</td></tr>
<tr><td>complete</td><td>Opcional. El valor por defecto es <code>undefined</code>.
La <em>callback</em> complete de un Observador.</td></tr>
</table>
</td></tr>
</table>

## Propiedades

<table>
<tr><th>Propiedad</th><th>Tipo</th><th>Descripción</th></tr>
<tr><td>isStopped</td><td><code>boolean</code></td></tr>
<tr><td>destination</td><td><code>PartialObserver<any> | Subscriber<any></code></td></tr>
</table>

## Métodos

<table>
<tr><th>next()</th></tr>
<tr><td>La <em>callback</em> Observador para recibir notificaciones de tipo next del Observable, con un valor. El Observable puede llamar a este método 0 o más veces.</td></tr>
<tr><td>
<h3>Firma</h3>
<code>next(value?: T): void</code>
<h3>Parámetros</h3>

<table>
<tr><td>value</td><td>Opcional. El valor por defecto es <code>undefined</code>.
El valor next.</td></tr>
</table>

<h3>Retorna</h3>
<code>void</code>:
</td></tr>
</table>

<table>
<tr><th>error()</th></tr>
<tr><td>La <em>callback</em> Observador para recibir notificaciones de tipo error del Observable, con un error adjunto. Notifica al Observador que el Observable ha experimentado una condición de error.</td></tr>
<tr><td>
<h3>Firma</h3>
<code>error(err?: any): void</code>
<h3>Parámetros</h3>

<table>
<tr><td>err</td><td>Opcional. El valor por defecto es <code>undefined</code>.
La excepción error.</td></tr>
</table>

<h3>Retorna</h3>
<code>void</code>:
</td></tr>
</table>

<table>
<tr><th>complete()</th></tr>
<tr><td>La <em>callback</em> Observador para recibir una notificación sin valor de tipo complete del Observable. Notifica al Observador que el Observable ha terminado de emitir notificaciones <em>push</em></td></tr>
<tr><td>
<h3>Firma</h3>
<code>complete(): void</code>
<h3>Parámetros</h3>
No recibe ningún parámetro.

<h3>Retorna</h3>
<code>void</code>:
</td></tr>
</table>

<table>
<tr><th>unsubscribe()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>unsubscribe(): void</code>
<h3>Parámetros</h3>
No recibe ningún parámetro.

<h3>Retorna</h3>
<code>void</code>
</td></tr>
</table>

<table>
<tr><th>_next()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>protected _next(value: T): void</code>
<h3>Parámetros</h3>

<table>
<tr><td>value</td><td>Tipo: <code>T</code>.</td></tr>
</table>

<h3>Retorna</h3>
<code>void</code>
</td></tr>
</table>

<table>
<tr><th>_error()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>protected _error(err: any): void</code>
<h3>Parámetros</h3>

<table>
<tr><td>err</td><td>Tipo: <code>any</code>.</td></tr>
</table>

<h3>Retorna</h3>
<code>void</code>
</td></tr>
</table>

<table>
<tr><th>_complete()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>protected _complete(): void</code>
<h3>Parámetros</h3>
No recibe ningún parámetro.

<h3>Retorna</h3>
<code>void</code>
</td></tr>
</table>

<table>
<tr><th>_unsubscribeAndRecycle()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>_unsubscribeAndRecycle(): Subscriber<T></code>
<h3>Parámetros</h3>
No recibe ningún parámetro.

<h3>Retorna</h3>
<code>Subscriber<T></code>
</td></tr>
</table>

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/6.5.5/src/internal/Subscriber.ts#L8-L162">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/index/class/Subscriber">Documentación oficial en inglés</a>
