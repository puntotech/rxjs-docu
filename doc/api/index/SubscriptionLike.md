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

* [Subject](../../../api/subjects/Subject/)
*
  * [BehaviorSubject](../../../api/subjects/BehaviorSubject/)
  * [ReplaySubject](../../../api/subjects/ReplaySubject/)
  * [AsyncSubject](../../../api/subjects/AsyncSubject/)
* [Subscription](../../../api/index/Subscription/)
*
  * [Subscriber](../../../api/index/Subscriber/)

## Propiedades

| Propiedad | Tipo      | Descripción |
| --------- | --------- | ----------- |
| closed    | `boolean` | Read-only.  |

## Métodos

| unsubscribe()                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------- |
| <h4>Firma</h4><p><code>unsubscribe(): void</code></p><h4>Parámetros</h4><p>No recibe ningún parámetro.</p><h4>Retorna</h4><p>void</p> |

## Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/6.5.5/src/internal/types.ts#L31-L35)

[Documentación oficial en inglés](https://rxjs.dev/api/index/interface/SubscriptionLike)
