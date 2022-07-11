# RxJS: Glosario y Semánticas

When discussing and documenting observables, it's important to have a common language and a known set of rules around what is going on. This document is an attempt to standardize these things so we can try to control the language in our docs, and hopefully other publications about RxJS, so we can discuss reactive programming with RxJS on consistent terms.

While not all of the documentation for RxJS reflects this terminology, it is a goal of the team to ensure it does, and to ensure the language and names around the library use this document as a source of truth and unified language.

## Entidades Mayores

There are high level entities that are frequently discussed. It's important to define them separately from other lower-level concepts, because they relate to the nature of observable.

### Consumidor (Consumer)

The code that is subscribing to the observable. This is whoever is being notified of nexted values, and errors or completions.

### Productor (Producer)

Any system or thing that is the source of values that are being pushed out of the observable subscription to the consumer. This can be a wide variety of things, from a WebSocket to a simple iteration over an Array. The producer is most often created during the subscribe action, and therefor "owned" by a subscription in a 1:1 way, but that is not always the case. A producer may be shared between many subscriptions, if it is created outside of the subscribe action, in which case it is one-to-many, resulting in a multicast.

### Suscripción (Subscription)

A contract where a consumer is observing values pushed by a producer. The subscription (not to be confused with the Subscription class or type), is an ongoing process that amounts to the function of the observable from the Consumer's perspective. Subscription starts the moment a subscribe action is initiated, even before the subscribe action is finished.

### Observable

The primary type in RxJS. At its highest level, an observable represents a template for connecting an Observer, as a consumer, to a producer, via a subscribe action, resulting in a subscription.

### Observador (Observer)

The manifestation of a consumer. A type that may have some (or all) handlers for each type of notification: next, error, and complete. Having all three types of handlers generally gets this to be called an "observer", where if it is missing any of the notification handlers, it may be called a "partial observer".

## Acciones Mayores

There are specific actions and events that occur between major entities in RxJS that need to be defined. These major actions are the highest level events that occur within various parts in RxJS.
Subscribe

The act of a consumer requesting an Observable set up a subscription so that it may observe a producer. A subscribe action can occur with an observable via many different mechanisms. The primary mechanism is the subscribe method on the Observable class. Other mechanisms include the forEach method, functions like lastValueFrom, and firstValueFrom, and the deprecated toPromise method.

### Finalización (Finalization)

The act of cleaning up resources used by a producer. This is guaranteed to happen on error, complete, or if unsubscription occurs. This is not to be confused with unsubscription, but it does always happen during unsubscription.

### Cancelación de Suscripción (Unsubscription)

The act of a consumer telling a producer is is no longer interested in receiving values. Causes Finalization

### Observación (Observation)

A consumer reacting to next, error, or complete notifications. This can only happen during subscription.

### Cadena de Observación (Observation Chain)

When an observable uses another observable as a producer, an "observation chain" is set up. That is a chain of observation such that multiple observers are notifying each other in a unidirectional way toward the final consumer.

### Next

A value has been pushed to the consumer to be observed. Will only happen during subscription, and cannot happen after error, complete, or unsubscription. Logically, this also means it cannot happen after finalization.

### Error

The producer has encountered a problem and is notifying the consumer. This is a notification that the producer will no longer send values and will finalize. This cannot occur after complete, any other error, or unsubscription. Logically, this also means it cannot happen after finalization.

### Complete

The producer is notifying the consumer that it is done nexting values, without error, will send no more values, and it will finalize. Completion cannot occur after an error, or unsubscribe. Complete cannot be called twice. Complete, if it occurs, will always happen before finalization.

### Notificación (Notification)

The act of a producer pushing nexted values, errors or completions to a consumer to be observed. Not to be confused with the Notification type, which is notification manifested as a JavaScript object.
Major Concepts

Some of what we discuss is conceptual. These are mostly common traits of behaviors that can manifest in observables or in push-based reactive systems.
Multicast

The act of one producer being observed by many consumers.
Unicast

The act of one producer being observed only one consumer. An observable is "unicast" when it only connects one producer to one consumer. Unicast doesn't necessarily mean "cold".
Cold

An observable is "cold" when it creates a new producer during subscribe for every new subscription. As a result, a "cold" observables are always unicast, being one producer observed by one consumer. Cold observables can be made hot but not the other way around.
Hot

An observable is "hot", when its producer was created outside of the context of the subscribe action. This means that the "hot" observable is almost always multicast. It is possible that a "hot" observable is still technically unicast, if it is engineered to only allow one subscription at a time, however, there is no straightforward mechanism for this in RxJS, and the scenario is a unlikely. For the purposes of discussion, all "hot" observables can be assumed to be multicast. Hot observables cannot be made cold.
Push

Observables are a push-based type. That means rather than having the consumer call a function or perform some other action to get a value, the consumer receives values as soon as the producer has produced them, via a registered next handler.
Pull

Pull-based systems are the opposite of push-based. In a pull-based type or system, the consumer must request each value the producer has produced manually, perhaps long after the producer has actually done so. Examples of such systems are Functions and Iterators
Minor Entities
Operator

A factory function that creates an operator function. Examples of this in rxjs are functions like map and mergeMap, which are generally passed to pipe. The result of calling many operators, and passing their resulting operator functions into pipe on an observable source will be another observable, and will generally not result in subscription.
Operator Function

A function that takes an observable, and maps it to a new observable. Nothing more, nothing less. Operator functions are created by operators. If you were to call an rxjs operator like map and put the return value in a variable, the returned value would be an operator function.
Operation

An action taken while handling a notification, as set up by an operator and/or operator function. In RxJS, a developer can chain several operator functions together by calling operators and passing the created operator functions to the pipe method of Observable, which results in a new observable. During subscription to that observable, operations are performed in an order dictated by the observation chain.
Stream

A "stream" or "streaming" in the case of observables, refers to the collection of operations, as they are processed during a subscription. This is not to be confused with node Streams, and the word "stream", on its own, should be used sparingly in documentation and articles. Instead, prefer observation chain, operations, or subscription. "Streaming" is less ambiguous, and is fine to use given this defined meaning.
Source

A observable or valid observable input having been converted to an observable, that will supply values to another observable, either as the result of an operator or other function that creates one observable as another. This source, will be the producer for the resulting observable and all of its subscriptions. Sources may generally be any type of observable.
Observable Inputs

A "observable input" (defined as a type here), is any type that can easily converted to an Observable. Observable Inputs may sometimes be referred to as "valid observable sources".
Notifier

An observable that is being used to notify another observable that it needs to perform some action. The action should only occur on a next notification, and never on error or complete. Generally, notifiers are used with specific operators, such as takeUntil, buffer, or delayWhen. A notifier may be passed directly, or it may be returned by a callback.
Inner Source

One, of possibly many sources, which are subscribed to automatically within a single subscription to another observable. Examples of an "inner source" include the observable inputs returned by the mapping function in a mergeMap operator. (e.g. source.pipe(mergeMap(value => createInnerSource(value)))), were createInnerSource returns any valid observable input).
Partial Observer

An observer that lacks all necessary notification handlers. Generally these are supplied by user-land consumer code. A "full observer" or "observer" would simply be an observer than had all notification handlers.
Other Concepts
Unhandled Errors

An "unhandled error" is any error that is not handled by a consumer-provided function, which is generally provided during the subscribe action. If no error handler was provided, RxJS will assume the error is "unhandled" and rethrow the error on a new callstack or prevent "producer interference"
Producer Interference

Producer interference happens when an error is allowed to unwind the callstack the RxJS callstack during notification. When this happens, the error could break things like for-loops in upstream sources that are notifying consumers during a multicast. That would cause the other consumers in that multicast to suddenly stop receiving values without logical explanation. As of version 6, RxJS goes out of its way to prevent producer interference by ensuring that all unhandled errors are thrown on a separate callstack.
Upstream And Downstream
The order in which notifications are processed by operations in a stream have a directionality to them. "Upstream" refers to an operation that was already processed before the current operation, and "downstream" refers to an operation that will be processed after the current operation. See also: Streaming.
