# SubscriptionLike

```typescript
interface SubscriptionLike extends Unsubscribable {
get closed: boolean
unsubscribe(): void

// Heredado de index/Unsubscribable
unsubscribe(): void
}
```

## Implementación de Clases

<ul>
    <li><a href="/api/subjects/Subject">Subject</a></li>
    <ul>
        <li><a href="/api/subjects/BehaviorSubject">BehaviorSubject</a></li>
        <li><a href="/api/subjects/ReplaySubject">ReplaySubject</a></li>
        <li><a href="/api/subjects/AsyncSubject">AsyncSubject</a></li>
    </ul>
</ul>

<ul>
    <li><a href="/api/index/Subscription">Subscription</a></li>
    <ul>
        <li><a href="/api/index/Subscriber">Subscriber</a></li>
    </ul>
</ul>

## Propiedades

<table>
<tr><th>Propiedad</th><th>Tipo</th><th>Descripción</th></tr>
<tr><td>closed</td><td><code>boolean</code></td><td>Read-only.</td></tr>
</table>

## Métodos

<table>
<tr><th>unsubscribe()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>unsubscribe(): void</code>
<h3>Parámetros</h3>
No recibe ningún parámetro.

<h3>Retorna</h3>
void
</td></tr>
</table>

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/6.5.5/src/internal/types.ts#L31-L35">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/index/interface/SubscriptionLike">Documentación oficial en inglés</a>
