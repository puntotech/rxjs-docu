# Breaking Changes en la Versión 7

## General

- **TS**: RxJS requiere TS 4.2

- **rxjs-compat**: `rxjs-compat` no está publicado para v7

- **toPromise**: El _return type_ de `toPromise` ahora es `T | undefined` en TypeScript, lo cual es correcto, pero puede que rompa algunos _builds_.

- **Subscription**: `add` ya no retorna una referencia `Subscription` innecesaria. Esto se ha hecho para evitar la confusión provocada por un comportamiento obsoleto. Ahora se pueden añadir (y quitar) funciones y `Subscriptions` como _teardowns_ a una `Subscription` utilizando `add` y `remove` directamente. Anteriormente a este cambio, `remove` solo aceptaba subscriptions.

- **Observable**: `lift` ya no está expuesto. NUNCA estuvo documentado que los usuarios finales de la biblioteca debieran crear operadores utilizando `lift`. Lift tiene [una serie de problemas](https://github.com/ReactiveX/rxjs/issues/5431) y siempre fue una implementación interna de RxJS que fue utilizada por algunos usuarios en los primeros albores de la biblioteca, cuando tenía valor: originalmente, el valor de `lift` era que los Observables . La realidad es que esta funcionalidad no era muy conocida ni utilizada y nunca se documentó, ya que era experimental. Hasta al final de la v7, `lift` seguirá existiendo en Observable. Los usuarios de JavaScript Estándar no notarán ninguna diferencia. Sin embargo, los usuarios de TypeScript pueden llegar a tener problemas por el hecho de que `lift` ya no sea un miembro de observable. Para evitar esto, se pueden hacer dos cosas:

  1. Reescribir los operadores según viene establecido en la documentación, como por ejemplo, que retornen un `new Observable`.
  2. Hacer un _cast_ de `any` al Observable y acceder a `lift` de esta manera.

  El primer método es el recomendado si se quieren evitar errores al migrar a la versión 8.

- **Subscriber**: `new Subscriber`ya no recibe 0-3 argumentos. Para crear un `Subscriber` con 0-3 argumentos, se puede utilizar `Subscriber.create`. Sin embargo, se debe tener en cuenta que no existen apenas razones para crear referencias `Subscriber` directamente, y que tanto `Subscriber.create` como `new Subscriber` están obsoletos.

- **onUnhandledError**: Los errores que ocurran durante el _setup_ de una suscripción observable después de que la suscripción haya emitido un error o se haya completado ahora se lanzan en su propio _call stack_. Antes, se hacía una llamada a `console.warn`. Esto puede llegar a ser _breaking_ en casos límite en aplicaciones node, que se hayan configurado para finalizar en casos de excepciones sin gestionar. Si este es tu caso, puedes configurar el comportamiento para que vuelva a ser el de `console.warn` en el nuevo ajuste de configuración, de la siguiente manera: `import { config } from 'rxjs'; config.onUnhandledError = (err) => console.warn(err);`

- **Tipos de error de RxJS Error types** Los test que se hayan escrito con expectativas _naive_ acerca de los errores ahora pueden fallar, ya que los errores ahora tienen una propiedad de stack en condiciones. En algunos frameworks de testing, una comprobación de igualdad estricta entre dos instancias de error comprobará los valores en el stack, que ahora puede que sean distintos.

- `unsubscribe` ya no está disponible vía el contexto `this` de las funciones observadores. Para habilitarlo, se debe especificar `config.useDeprecatedNextContext = true` en la configuración de RxJS encontrada en `import { config } from 'rxjs';`. Téngase en cuenta que habilitar esto puede resultar en una penalización de rendimiento para todas las suscripciones de consumidor.

- La implementación interna `_unsubscribeAndRecycle` de `Subscriber` ha sido eliminada. En su lugar, utilizar objetos `Subscription`.

- El método estático `sortActions` de `VirtualTimeScheduler` ya no está expuesto públicamente por nuestros tipos TS.

- `Notification.createNext(undefined)` ya no retornarán la misma referencia cada vez.

- Las firmas de tipos de `Notification` y `dematerialize` ahora son más estrictas, por lo que pueden surgir errores por tipos inválidos pasados a estos operadores.

- El soporte experimental de `for await` se ha eliminado. En su lugar se debe utilizar https://github.com/benlesh/rxjs-for-await .

- `ReplaySubject` ya no programa emisiones cuando se le proporciona un scheduler. Si se necesita ese comportamiento, se debe componer `observeOn` utilizando `pipe`. Por ejemplo: `new ReplaySubject(2, 3000).pipe(observeOn(asap))`

- **rxjs-compat**: `rxjs/Rx` ya no es un sitio de importación válido.

## Operadores

### concat

`concat`: Ha cambiado su firma de genéricos. Se recomienda que no se le pasen genéricos explícitamente, sino dejar que la inferencia haga su trabajo. Si es necesario, hacer un _cast_ con `as`.
`of`: Ha cambiado su firma de genéricos. No especificar genéricos, permitir que sean inferidos o utilizar `as`.

### count

`count`: Ya no se pasa el Observable fuente como tercer argumento. Esta funcionalidad raramente se utilizaba, y no proporcionaba demasiado valor.

### defer

`defer`: Ya no permite factorías que retornen `void` o `undefined`. Todas las factorías proporcionadas a `defer` deben retornar un `ObservableInput`, como por ejemplo `Observable`, `Promise`, et al. Para obtener el mismo comportamiento que anteriormente, se puede utilizar `return EMPTY ` o `return of()` en la factoría.

### map

`map`: El valor por defecto de `thisArg` es ahora `undefined`. El anterior valor por defecto de `MapSubscriber` no tenía sentido. Este cambio afectará únicamente al código que haga una llamada a `map` con una función y referencie al `this` de la siguiente manera: `source.pipe(map(function () { console.log(this); }))`. Hacer esto nunca ha sido útil, por lo que se espera que el código afectado sea mínimo.

### mergeScan

`mergeScan`: `mergeScan` dejará de emitir su estado interno otra vez tras la compleción.

### of

`of`: El uso con más de 9 argumentos, donde el último argumento es un `SchedulerLike` puede resultar en el tipo erróneo que incluye el `SchedulerLike`, aunque la implementación en tiempo de ejecución no lo permita. Se debe utilizar `scheduled` en su lugar.

### pairs

`pairs`: `pairs` ya no funcionará en IE win un polyfill para `Object.entries`. Además, el propio operador `pairs` está obsoleto. Utilizar `from(Object.entries(obj))` en su lugar.

### race

`race`: `race()` ya no se suscribirá a observables subsecuentes si la fuente proporcionada se completa o produce un error de forma síncrona. Esto quiere decir que los efectos colaterales que puedieran ocurrir durante la suscripión en esos casos raros ya no ocurrirán.

### repeat

Se ha eliminado un comportamiento indocumentado donde al pasar un argunento `count` negativo resultaba en un Observable que se repetía indefinidamente.

### retry

Se ha eliminado un comportamiento indocumentado donde al pasar un argunento `count` negativo resultaba en un Observable que se repetía indefinidamente.

### single

El operador `single` ahora lanza un error en aquellas situaciones en las que los valores entrantes no están presentes, o no coinciden con el predicado proporcionado. Los tipos de errores también se han actualizado, compruébese la documentación para ver los cambios.

### skipLast

`skipLast`: `skipLast` ya no provocará un error cuando se le pase un número negativo. En su lugar, retornará el Observable fuente, al igual que hace si se le pasa el valor 0.

### startWith

`startWith`: `startWith` retornará tipos incorrectos al ser llamado con más de 7 argumentos y un scheduler. Pasarle un scheduler a `startWith` ahora está obsoleto.

### take

`take` ahora lanzará un _runtime error_ para argumentos negativos o NaN. Esto incluye llamadas no-TS como `take()`.

### takeLast

`takeLast` ahora tiene _runtime assertions_ que lanzan `TypeErrors` para argumentos inválidos. Llamar a `takeLast` sin argumentos o con un argumento NaN lanzará un `TypeError`.

### throwError

`throwError`: `throwError` ya n o es capaz de emitir una función como error directamente. Si se necesita emitir una función como error, se podrá utilizar la función factoría para retornar la función de la siguiente manera: `throwError(() => functionToEmit)`, en otras palabras: `throwError(() => () => console.log('llamado después'))`

### timestamp

El operador `timestamp` acepta un `TimestampProvider`, que es cualquier objeto con un método `now` que retorne un número. Esto puede causar problemas con el modo run del `TestScheduler`. (ver Issue [aquí](https://github.com/ReactiveX/rxjs/issues/5553))

### zip

`zip`: Hacerle zip a un solo arrray ahora tendrá un resultado diferente. Esto es un caso límite raro, ya que es muy poco probable que alguien quiera hacerle zip a un array con nada. El _workaround_ sería encapsular el array en otro array: `zip([[1,2,3]])`. Aunque, como se ha dicho antes, es algo bastante raro.

`zip`: Los operadores `zip` ya no iterarán a través de los iterables proporcionados de manera "as needed". En su lugar, los iterables se tratarán como _push-streams_, tal y como se hace siempre en RxJS. Esto quiere decir que si se proporciona un iterable infinito, el hilo se bloqueará, ya que se intentará leer del iterable indefinidamente. Este cambio alinea RxJS con las demás implementaciones de Rx. Como workaround de este caso, se puede utilizar `map` o una combinación de `map` y `zip`. Por ejemplo `zip(source$, iterator)` podría pasar a ser `source$.pipe(map(value => [value, iterator.next().value]))`.

### ajax

La serialización del cuerpo de `ajax` utilizará ahora el comportamiento por defecto de XHR en todos los casos. Si el cuerpo es un `Blob`, `ArrayBuffer` cualquier vista de array buffer (como una secuencia de bytes, ej: `Uint8Array`, etc.), `FormData`, `URLSearchParams`, `string`, o `ReadableStream`, se utilizará el manejo por defecto. Si el cuerpo es un `typeof "object"`, entonces se convertirá a JSON mediante `JSON.stringify` y la cabecera `Content-Type` será `application/json;charset=utf-8`. Cualquier otro tipo provocará un error.

La cabecera `Content-Type` pasada a la configuración de `ajax` ya no tendrá ningún efecto sobre el comportamiento de serialización de la petición AJAX.

Para usuarios de TypeScript, `AjaxRequest` ya no corresponde al tipo que debe utilizarse explícitamente para crear un `ajax`, sino que ahora es `AjaxConfig`. Aunque los dos tipos son compatibles, solamente `AjaxConfig` tiene `progressSubscriber` y `createXHR`.

`ajax`: En el siguiente caso límite extremo: Si ocurre un error, el responseType es `"json"`, estamos utilizando IE y el responseType no es un JSON válido, el observable `ajax` no emitirá un error de sintaxis, sino que emitirá un `AjaxError` completo con más detalles.

`ajax`: La implementación ajax deja de dar soporte a IE10 y versiones anteriores. Esto alinea RxJS con otras implementaciones y ayuda a limpiar el código en ese ámbito.
