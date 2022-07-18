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

| schedule()                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------- |
| <h4>Firma</h4><p><code>schedule(state?: T, delay?: number): Subscription</code></p><h4>Parámetros</h4><table data-header-hidden><thead><tr><th></th><th></th></tr></thead><tbody><tr><td>state</td><td>Opcional. El valor por defecto es <code>undefined</code>. Tipo: <code>T</code>.</td></tr><tr><td>delay</td><td>Opcional. El valor por defecto es <code>undefined</code>. Tipo: <code>number</code>.</td></tr></tbody></table><h4>Retorna</h4><p><code>Subscription</code></p> |                                                                |
| state                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Opcional. El valor por defecto es `undefined`. Tipo: `T`.      |
| delay                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Opcional. El valor por defecto es `undefined`. Tipo: `number`. |

## Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/6.5.5/src/internal/types.ts#L97-L99)

[Documentación oficial en inglés](https://rxjs.dev/api/index/interface/SchedulerAction)
