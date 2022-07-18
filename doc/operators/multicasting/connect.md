# connect

#### Crea un Observable al multidifundir el Observable fuente dentro de una función que permite al desarrollador definir el uso del multicast tras la conexión

<details>

<summary>Signatura</summary>

#### Firma

`connect<T, O extends ObservableInput<unknown>>(selector: (shared: Observable<T>) => O, config: ConnectConfig<T> = DEFAULT_CONFIG): OperatorFunction<T, ObservedValueOf<O>>`

#### Parámetros

#### Retorna

`OperatorFunction<T, ObservedValueOf<O>>`

</details>

## Descripción

Este operador es especialmente útil si el Observable fuente que se quiere multidifundir es síncrono o asíncrono. Ahí radica la diferencia con el operador share, que, en el caso de las fuentes totalmente síncronas, fallará al intentar compartir una sola suscripción con varios consumidores, ya que para el momento en el que la suscripción al resultado de share haya retornado, si la fuente es síncrona en su referencia interna, el recuento de referencias saltará de 0 a 1, de vuelta a 0 y se reiniciará.

Para utilizar `connect`, hay que proporcionar una función `selector` que nos dará un Observable multidifundido (que todavía no ha sido conectado). Entonces, se utiliza ese Observable multidifundido para crear un Observable resultante que, al suscribirnos a él, se encargará de configurar el _multicast_. Esto se suele conseguir, aunque no siempre, con merge.

Téngase en cuenta que el utilizar el operador takeUntil dentro del `selector` de `connect`, puede ser síntoma de que en realidad haya que utilizar el operador takeWhile.

Cuando se lleva a cabo la suscripción al resultado de `connect`, la función `selector` será llamada. Cuando la función `selector` retorne, el Observable que retorne será suscrito, y _entonces_ será cuando el _multicast_ se conectará a la fuente.

## Ejemplo

Compartiendo un Observable completamente síncrono

```
import { of, tap, connect, merge, map, filter } from 'rxjs';

const source$ = of(1, 2, 3, 4, 5).pipe(
  tap({
    subscribe: () => console.log('suscripción empezada'),
    next: n => console.log(`la fuente ha emitido ${ n }`)
  })
);

source$.pipe(
  // Aquí estamos uniendo 3 subscriptions a `shared$`.
  connect(shared$ => merge(
    shared$.pipe(map(n => `all ${ n }`)),
    shared$.pipe(filter(n => n % 2 === 0), map(n => `par ${ n }`)),
    shared$.pipe(filter(n => n % 2 === 1), map(n => `impar ${ n }`))
  ))
)
.subscribe(console.log);

// Salida esperada: (notice only one subscription)
'suscripción empezada'
'la fuente ha emitido 1'
'all 1'
'impar 1'
'la fuente ha emitido 2'
'all 2'
'par 2'
'la fuente ha emitido 3'
'all 3'
'impar 3'
'la fuente ha emitido 4'
'all 4'
'par 4'
'la fuente ha emitido 5'
'all 5'
'impar 5'
```
