# SchedulerAction

```typescript
interface SchedulerAction<T> extends Subscription {
schedule(state?: T, delay?: number): Subscription

// Heredado de index/Subscription
static EMPTY: Subscription
constructor(unsubscribe?: () => void)
closed: [object Object]
unsubscribe(): void
add(teardown: TeardownLogic): Subscription
remove(subscription: Subscription): void
}
```

## Métodos

<table>
<tr><th>schedule()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>schedule(state?: T, delay?: number): Subscription</code>
<h3>Parámetros</h3>

<table>
<tr><td>state</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>T</code>.</td></tr>
<tr><td>delay</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>number</code>.</td></tr>
</table>

<h3>Retorna</h3>

<code>Subscription</code>

</td></tr>
</table>

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/6.5.5/src/internal/types.ts#L97-L99">
<img src="assets/icons/source-code.png" alt="Source code">
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/index/interface/SchedulerAction">Documentación oficial en inglés</a>
