# Subscription

<h2 class="subtitle">Representa un recurso desechable, como es la ejecución de un Observable. La Suscripción posee un método importante, <code>unsubscribe</code>, que no recibe ningún argumento y se encarga de desechar el recurso que representa la Suscripción</h2>

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

# Subclases

[Subscriber](api/index/Subscriber)

## Descripción

Adicionalmente, las suscripciones se pueden agrupar mediante el método `add()`, que adjunta una Suscripción hija a la Suscripción actual. Cuando se cancela una Suscripción, también se cancela la de todos sus hijos (y nietos.)

## Propiedades Estáticas

<table>
<tr><th>Propiedad</th><th>Tipo</th><th>Descripción</th></tr>
<tr><td>EMPTY</td><td><code>Subscription</code></td></tr>
</table>

## Constructor

<table>
<tr><th>constructor()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>constructor(unsubscribe?: () => void)</code>
</td></tr>
</table>

<h3>Parámetros</h3>

<table>
<tr><td>unsubscribe</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Una función que describe cómo llevar a cabo el desecho de recursos cuando el método <code>unsubscribe</code> es llamado.</td></tr>
</table>

## Propiedades

<table>
<tr><th>Propiedad</th><th>Tipo</th><th>Descripción</th></tr>
<tr><td>closed</td><td><code>[object Object]</code></td><td>Indica si la Suscripción ha sido cancelada o no.</td></tr>
</table>

## Métodos

<table>
<tr><th>unsubscribe()</th></tr>
<tr><td>Desecha los recursos representados por la Suscripción. Puede, por ejemplo, cancelar una ejecución Observable o cualquier otro tipo de trabajo que comenzase a partir de la creación de la Suscripción.</td></tr>
<tr><td>
<h3>Firma</h3>
<code>unsubscribe(): void</code>
<h3>Parámetros</h3>
No recibe ningún parámetro.

<h3>Retorna</h3>
<code>void:</code>
</td></tr>
</table>

<table>
<tr><th>add()</th></tr>
<tr><td>Añade un <em>teardown</em> que será llamado durante el <code>unsubscribe()</code> de esta Suscripción. También se puede utilizar para añadir una Suscripción hija.</td></tr>
<tr><td>
<h3>Firma</h3>
<code>add(teardown: TeardownLogic): Subscription</code>
<h3>Parámetros</h3>

<table>
<tr><td>teardown</td><td>La lógica adicional a ejecutar durante el <em>teardown</em> (proceso de eliminación de recursos.)</td></tr>
</table>

<h3>Retorna</h3>
<code>Subscription</code>: Retorna la Suscripción utilizada o creada para ser añadida a la lista de Suscripciones internas. Esta Suscripción puede utilizarse junto a <code>remove()</code> para eliminar la lógica de <em>teardown</em> proporcionada de la lista de Suscripciones internas.

<tr><td>Si el <em>teardown</em> que se quiere añadir es una Suscripción que ya ha sido cancelada, es la misma referencia que la referencia desde la que se está llamando <code>add</code> o es <code>Subscription.EMPTY</code>, no será añadido.

Si esta Suscripción está en un estado cerrado, la lógica de <em>teardown</em> proporcionada será ejecutada inmediatamente.

Cuando se cancela una Suscripción padre, cualquier Suscripción hija que se le hubiese añadido también se cancela.

</td></tr>
</td></tr>
</table>

<table>
<tr><th>remove()</th></tr>
<tr><td>Elimina una Suscripción de la lista interna de Suscripciones que serán canceladas durante el proceso de cancelación de esta Suscripción.</td></tr>
<tr><td>
<h3>Firma</h3>
<code>remove(subscription: Subscription): void</code>
<h3>Parámetros</h3>

<table>
<tr><td>subscription</td><td>La suscripción a ser eliminada.</td></tr>
</table>

<h3>Retorna</h3>
<code>void:</code>
</td></tr>
</table>

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/6.5.5/src/internal/Subscription.ts#L6-L207">
<img src="assets/icons/source-code.png" alt="Source code">
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/index/class/Subscription">Documentación oficial en inglés</a>
