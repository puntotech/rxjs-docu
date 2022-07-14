# Subscription

## Subscription

### Representa un recurso desechable, como es la ejecución de un Observable. La Suscripción posee un método importante, `unsubscribe`, que no recibe ningún argumento y se encarga de desechar el recurso que representa la Suscripción

```typescript
class Subscription implements SubscriptionLike {
static EMPTY: Subscription
constructor(unsubscribe?: () => void)
closed: [object Object]
unsubscribe(): void
add(teardown: TeardownLogic): Subscription
remove(subscription: Subscription): void
}
```

## Subclases

[Subscriber](api/index/Subscriber/)

### Descripción

Adicionalmente, las suscripciones se pueden agrupar mediante el método `add()`, que adjunta una Suscripción hija a la Suscripción actual. Cuando se cancela una Suscripción, también se cancela la de todos sus hijos (y nietos.)

### Propiedades Estáticas

| Propiedad | Tipo           | Descripción |
| --------- | -------------- | ----------- |
| EMPTY     | `Subscription` |             |

### Constructor

| constructor()                                                           |
| ----------------------------------------------------------------------- |
| <h4>Firma</h4><p><code>constructor(unsubscribe?: () => void)</code></p> |

#### Parámetros

| unsubscribe | Opcional. El valor por defecto es `undefined`. Una función que describe cómo llevar a cabo el desecho de recursos cuando el método `unsubscribe` es llamado. |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |

### Propiedades

| Propiedad | Tipo              | Descripción                                      |
| --------- | ----------------- | ------------------------------------------------ |
| closed    | `[object Object]` | Indica si la Suscripción ha sido cancelada o no. |

### Métodos

| unsubscribe()                                                                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Desecha los recursos representados por la Suscripción. Puede, por ejemplo, cancelar una ejecución Observable o cualquier otro tipo de trabajo que comenzase a partir de la creación de la Suscripción. |
| <h4>Firma</h4><p><code>unsubscribe(): void</code></p><h4>Parámetros</h4><p>No recibe ningún parámetro.</p><h4>Retorna</h4><p><code>void:</code></p>                                                    |

| add()                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |                                                                                            |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Añade un _teardown_ que será llamado durante el `unsubscribe()` de esta Suscripción. También se puede utilizar para añadir una Suscripción hija.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |                                                                                            |
| <h4>Firma</h4><p><code>add(teardown: TeardownLogic): Subscription</code></p><h4>Parámetros</h4><table data-header-hidden><thead><tr><th></th><th></th></tr></thead><tbody><tr><td>teardown</td><td>La lógica adicional a ejecutar durante el <em>teardown</em> (proceso de eliminación de recursos.)</td></tr></tbody></table><h4>Retorna</h4><p><code>Subscription</code>: Retorna la Suscripción utilizada o creada para ser añadida a la lista de Suscripciones internas. Esta Suscripción puede utilizarse junto a <code>remove()</code> para eliminar la lógica de <em>teardown</em> proporcionada de la lista de Suscripciones internas.</p> |                                                                                            |
| teardown                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | La lógica adicional a ejecutar durante el _teardown_ (proceso de eliminación de recursos.) |
| <p>Si el <em>teardown</em> que se quiere añadir es una Suscripción que ya ha sido cancelada, es la misma referencia que la referencia desde la que se está llamando <code>add</code> o es <code>Subscription.EMPTY</code>, no será añadido.</p><p>Si esta Suscripción está en un estado cerrado, la lógica de <em>teardown</em> proporcionada será ejecutada inmediatamente.</p><p>Cuando se cancela una Suscripción padre, cualquier Suscripción hija que se le hubiese añadido también se cancela.</p>                                                                                                                                           |                                                                                            |

| remove()                                                                                                                                 |                                 |
| ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| Elimina una Suscripción de la lista interna de Suscripciones que serán canceladas durante el proceso de cancelación de esta Suscripción. |                                 |
| <h4>Firma</h4><p><code>remove(subscription: Subscription): void</code></p><h4>Parámetros</h4><h4>Retorna</h4><p><code>void:</code></p>   |                                 |
| subscription                                                                                                                             | La suscripción a ser eliminada. |

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/6.5.5/src/internal/Subscription.ts#L6-L207)

[Documentación oficial en inglés](https://rxjs.dev/api/index/class/Subscription)
