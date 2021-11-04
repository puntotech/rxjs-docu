# RxJS 6.x a 7.x Lista de Cambios Detallada

Este documento contiene una lista detallada de los cambios entre RxJS 6.x y RxJS 7.x, expuestos en el orden en el que se encuentran al hacerle _diffing_ a las APIs de TypeScript en diversos ficheros módulo.

## module rxjs

## Breaking changes

### AsyncSubject

- El método `_subscribe` pasa de ser `public` a ser `protected`.
- Ya no posee su propia implementación del método error heredado de `Subject`.

### BehaviorSubject

- El método `_subscribe` pasa de ser `public` a ser `protected`.
- La propiedad `value` pasa de ser `readonly value` a ser un getter `get value()`, y ya no se le puede asignar un valor a la fuerza.

### bindCallback

- Han cambiado las signaturas genéricas. No pasar genéricos explícitamente.

### combineLatest

- Han cambiado las signaturas genéricas. No pasar genéricos explícitamente.

### concat

- Han cambiado las signaturas genéricas. No pasar genéricos explícitamente.

### ConnectableObservable

- `_isComplete` deja de ser una propiedad.
- El método `_subscribe` pasa de ser `public` a ser `protected`.

### defer

- El argumento genérico ya no extiende de `void`.

### forkJoin

- Han cambiado las signaturas genéricas. No pasar genéricos explícitamente.

### GroupedObservable

- Deja de exponer `_subscribe` públicamente.
- La propiedad `key` es `readonly`.
- Deja de exponer `constructor` públicamente.

### iif

- Han cambiado las signaturas genéricas. No pasar genéricos explícitamente.

### isObservable

- Deja de tener un genérico, y retorna `Observable<unknown>`. Se le debe hacer _casting_ al resultado.

### merge

- Han cambiado las signaturas genéricas. No pasar genéricos explícitamente.

### Notification

- La propiedad `error` ahora es _readonly_.
- La propiedad `hasValue` ahora es _readonly_.
- La propiedad `kind` ahora es _readonly_.
- La propiedad `value` ahora es _readonly_ y puede ser `undefined`.
- La signatura del constructor solo permite construcción válida. Por ejemplo, `new Notification('C', 'some_value')` provocará un error en TypeScript.

### Observable

- La propiedad `_isScalar` ha sido eliminada.
- El método `_subscribe` ha dejado de ser público y ahora está marcado como `@internal`.
- El método `_trySubscribe` ha dejado de ser público y ahora está marcado como `@internal`.
- Las llamadas al método `pipe` con 9 o más argumentos retornarán `Observable<unknown>` en lugar de `Observable<{}>`.
- El método `toPromise` ahora devuelve `Promise<T | undefined>` correctamente, en lugar de `Promise<T>`. Esta correción no implica ningún cambio en tiempo de ejecución, ya que si el Observable no emite un valor antes de completarse, la promesa se resolverá al valor `undefined`.
- Las propiedades `static if` y `static throw` han dejado de estar definidas. En la versión 6 ya dejaron de utilizarse.
- Las propiedades `lift`, `source` y `operator` siguen estando obsoletas, y no deben utilizarse. Son detalles de implementación, y probablemente se renombren o desaparezcan en la versión 8.

### of

- Han cambiado las signaturas genéricas. No pasar genéricos explícitamente.

### onErrorResumeNext

- Han cambiado las signaturas genéricas. No pasar genéricos explícitamente.

### pairs

- Han cambiado las signaturas genéricas. No pasar genéricos explícitamente.

### partition

- Han cambiado las signaturas genéricas. No pasar genéricos explícitamente.

### pipe

- LAs llamadas con 9 o más argumentos retornarán `(arg: A) => unknown` en lugar de `(arg: A) => {}`.

### race

- Han cambiado las signaturas genéricas. No pasar genéricos explícitamente.

### ReplaySubject

- Se ha eliminado el método `_getNow`.
- El método `_subscribe` ha dejado de ser público, y ahora es protegido.

### Subscribable

- `subscribe` aceptará un `Partial<Observer<T>>` a partir de ahora. Todas las sobrecargas con funciones como argumentos hans ido eliminadas. Esto es debido a que `Subscribable` está pensado para proyectar el contrato observable básico de la propuesta TC39 y el tipo de retorno de una llamada a `[Symbol.observable]()`.

### SubscribableOrPromise

- Ver las notas de `Subscribable`.

### Subscriber

- La propiedad `destination` debe ser un `Subscriber` u `Observer` completo.
- La propiedad `syncErrorThrowable` ha sido eliminada.
- La propiedad `syncErrorThrown` ha sido eliminada.
- La propiedad `syncErrorValue` ha sido eliminada.
- La propiedad `_unsubscribeAndRecycle` ha sido eliminada.

### Subscription

- La propiedad `_parentOrParents` ha sido eliminada.
- El método `add` ahora retorna `void` en lugar de una `Subscription`. Retornar `Subscription` era un comportamiento antiguo de la primera etapa de la versión 5. Si se añade una función a una suscripción (ej: `subscription.add(fn)`), se puede eliminar dicha función directamente mediante una llamada al método `remove` sobre esa misma instancia de función (ej: `subscription.remove(fn)`). Anteriormente, era necesario obtener el objeto `Suscription` retornado y pasárselo a `remove`. En las versiones 6 y anteriores, la `Suscription` retornada al llamar a `add` con otra `Suscription` siempre era la misma suscripción pasada al método (esto implicaba que tanto `subscription.add(subs1).add(subs2)` y `subscription.add(subs1); subs1.add(subs2);` eran antipatrones.)

### VirtualAction

- El método estático `sortActions` ha sido eliminado.

### zip

- Han cambiado las signaturas genéricas. No pasar genéricos explícitamente.

<hr>

## Funcionalidades Nuevas

### animationFrames

- Un nuevo método para crear un flujo de _animation frames_. Cada evento llevará consigo un _timestamp_ de alta resolución, y el tiempo transcurrido desde el comienzo de la observación.

### config

### onUnhandledError

- Un manejador para gestionar los errores que llegan hasta el "final" de la cadena observable cuando no hay ningún manejador de errores en el observador. Es útil para hacer cosas como mostrar los errores no gestionados en las cadenas observables de RxJS.

### onStoppedNotification

- Un manejador para los casos límite, donde un suscriptor es notificado después de haber "parado". Es decir, un punto en el tiempo donde haya recibido una notificación de error o de complete, pero todavía no haya finalizado. Esto es mayormente útil para propósitos de _logging_.

### useDeprecatedNextContext

- En RxJS 6, una funcionalidad muy poco utilizada permitía a los usuarios acceder directamente al `subscriber` como `this`, dentro de una llamada al manejador `next`. El problema residía en que esta funcionalidad incurría en penalizaciones severas a nivel de rendimiento. Este comportamiento se ha cambiado (dado que no estaba bien documentado y apenas se utilizaba) para que no cambie el contexto `this` de ninguno de los manejadores de suscripción proporcionados por el usuario. Si se necesita volver a utilizar esta funcionalidad, se puede activar. Se debe tener en cuenta que este comportamienta será completamente eliminado en la versión 8.

### connectable

- Es la nueva forma de crear un `ConnectableObservable`. Realmente es un reemplazo para el uso de las variantes `multicast` y `publish` sin selector. Simplemente hay que pasar el observable fuente a `connectable` con el `Subject` a través del cual se quiere conectar.

### firstValueFrom

- Un reemplazo mejor, más _tree-shakable_ para `toPromise()` (ahora obsoleto.) Esta función permite que el suuario convierta cualquier `Observable` a una `Promise` que se resolverá cuando el observable fuente emita su primer valor. Si el observable fuente se cierra sin emitir ningún valor, la promesa retornada se rechazará con un `EmptyError`, o se resolverá con el `defaultValue` configurado.

### ObservableInput

- Se trata únicamente de un tipo, pero es importante. Este tipo define los tipos permitidos que se pueden pasar a casi cualquier API dentro de RxJS que también acepta un `Observable`. Siempre ha aceptado `Observable`, `Promise`, `Iterable`, y `ArrayLike`. Ahora también aceptará `AsyncIterable` and `ReadableStream`.

### AsyncIterable

- Los `AsyncIterables` definidos por IxJS o por generadores asíncronos (`async function*`) ahora se pueden pasar a cualquier API que acepte un observable, y pueden convertirse a un `Observable` directamente utilizando `from`.

### ReadableStream

- Los `ReadableStream` como aquellos retornados por `fetch`, et al, ahora se pueden pasar a cualquier API que acepte un observable, y pueden convertirse a un `Observable` directamente utilizando `from`.

### ReplaySubject

- Se ha arreglado un bug que impedía que un `ReplaySubject` completado o con errores acumulase valor en su búfer al ser resuscrito a otra fuente. Esto rompe algunos usos - como [esta respuesta de StackOverflow](https://stackoverflow.com/questions/54947878/temporarily-caching-http-responses-from-parametrised-requests-using-rxjs-and-an/54957061#54957061) - que dependendían del comportamiento erróneo.

### Subscription

- Ahora se pueden añadir y eliminar funciones directamente mediante los métodos `add` y `remove`.

### throwError

Ahora acepta un `errorFactory` de `() => any` para aplazar la creación del error hasta el momento en el que sea emitido. Se recomienda utilizar este método, dado que los `Errors` creados en los _runtimes_ más populares de JavaScript retienen todos los valores en el ámbito actual por razones de depuración.

# Módulo rxjs/operators

## Breaking Changes

### buffer

### audit

- El observable retornado por el selector de duración del operador `audit` debe emitir una notificación next para finalizar la duración. Las notificaciones complete ya no finalizan la duración.

- `audit` ahora emite el último valor de la fuente cuando se completa dicha fuente. Anteriormente, `audit` reflejaba la compleción sin emitir el valor.

### auditTime

- `auditTime` ahora emite el último valor de la fuente cuando se completa dicha fuente, después de que transcurra la duración de _audit_. Anteriormente, `auditTime` reflejaba la compleción sin emitir el valor y sin esperar a que la duración transcurriese.

### buffer

- `buffer`

  buffer now subscribes to the source observable before it subscribes to the closing notifier. Previously, it subscribed to the closing notifier first.

        Final buffered values will now always be emitted. To get the same behavior as the previous release, you can use endWith and skipLast(1), like so: source$.pipe(buffer(notifier$.pipe(endWith(true))), skipLast(1))

  closingNotifier completion no longer completes the result of buffer. If that is truly a desired behavior, then you should use takeUntil. Something like: source$.pipe(buffer(notifier$), takeUntil(notifier$.pipe(ignoreElements(), endWith(true)))), where notifier$ is multicast, although there are many ways to compose this behavior.

bufferToggle

    The observable returned by the bufferToggle operator's closing selector must emit a next notification to close the buffer. Complete notifications no longer close the buffer.

bufferWhen

    The observable returned by the bufferWhen operator's closing selector must emit a next notification to close the buffer. Complete notifications no longer close the buffer.

combineLatest

- Han cambiado las signaturas genéricas. No pasar genéricos explícitamente.

concat

- Han cambiado las signaturas genéricas. No pasar genéricos explícitamente.
  Still deprecated, use the new concatWith.

concatAll

- Han cambiado las signaturas genéricas. No pasar genéricos explícitamente.

concatMapTo

- Han cambiado las signaturas genéricas. No pasar genéricos explícitamente.

defaultIfEmpty

- Han cambiado las signaturas genéricas. No pasar genéricos explícitamente.

endWith

- Han cambiado las signaturas genéricas. No pasar genéricos explícitamente.

expand

- Han cambiado las signaturas genéricas. No pasar genéricos explícitamente.

merge

- Han cambiado las signaturas genéricas. No pasar genéricos explícitamente.
  Still deprecated, use the new mergeWith.

mergeAll

- Han cambiado las signaturas genéricas. No pasar genéricos explícitamente.

pluck

- Han cambiado las signaturas genéricas. No pasar genéricos explícitamente.

race

- Han cambiado las signaturas genéricas. No pasar genéricos explícitamente.

reduce

- Han cambiado las signaturas genéricas. No pasar genéricos explícitamente.

scan

- Han cambiado las signaturas genéricas. No pasar genéricos explícitamente.

startWith

- Han cambiado las signaturas genéricas. No pasar genéricos explícitamente.

switchAll

- Han cambiado las signaturas genéricas. No pasar genéricos explícitamente.

switchMapTo

- Han cambiado las signaturas genéricas. No pasar genéricos explícitamente.

withLatestFrom

- Han cambiado las signaturas genéricas. No pasar genéricos explícitamente.

zip

- Han cambiado las signaturas genéricas. No pasar genéricos explícitamente.
  Still deprecated, use the new zipWith.

New Features
connect

    New operator to cover the use cases of publish variants that use a selector. Wherein the selector allows the user to define multicast behavior prior to connection to the source observable for the multicast.

share

    Added functionality to allow complete configuration of what type of Subject is used to multicast, and when that subject is reset.

timeout

    Added more configuration options to timeout, so it could be used to timeout just if the first item doesn't arrive quickly enough, or it could be used as a timeout between each item. Users may also pass a Date object to define an absolute time for a timeout for the first time to arrive. Adds additional information to the timeout error, and the ability to pass along metadata with the timeout for identification purposes.

zipWith, concatWith, mergeWith, raceWith

    Simply renamed versions of the operators zip, concat, mergeWith, and race. So we can deprecate those old names and use the new names without collisions.

module rxjs/ajax
Breaking Changes
AjaxRequest

    AjaxRequest is no longer used to type the configuration argument for calls to ajax. The new type is AjaxConfig. This was done to disambiguate two very similar types with different use cases. AjaxRequest is still there, but properties have changed, and it is used to show what final request information was send as part of an event response.

New Features
AjaxResponse

    Now includes responseHeaders.
    Now includes event type and total numbers for examinining upload and download progress (see includeUploadProgess and includeDownloadProgress).

includeUploadProgress

    A flag to make a request that will include streaming upload progress events in the returned observable.

includeDownloadProgress

    A flag to make a request that will include streaming upload progress events in the returned observable.

queryParams

    Configuration for setting query parameters in the URL of the request to be made.

XSRF (CSRF) additions:

    xsrfCookieName and xsrfHeaderName were added for cross-site request forgery prevention capabilities.

module rxjs/fetch

No changes.
module rxjs/testing
New Features
TestScheduler expectObservable().toEqual()

    A new means of comparing the equality of to observables. If all emissions are the same, and at the same time, then they are equal. This is primarily useful for refactoring operator chains and making sure that they are equivalent.
