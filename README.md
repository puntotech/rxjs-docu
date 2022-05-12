# Index

### English

- [What is RxJS Docu?](#what-is-rxjs-docu)
- [Introduction](#introduction)
- [License](#license)

### Spanish

- [¿Qué es RxJS Docu?](#que-es-rxjs-docu)
- [Introducción](#introduccion)
- [Licencia](#licencia)

<a name="what-is-rxjs-docu"></a>

# What is RxJS Docu?

This project is based on the official [RxJS documentation](https://rxjs.dev/), and constitutes the Spanish documentation. As well as the examples which can be found in the official documentation, other examples have been added that allow the reader to broaden her/his knowledge on RxJS.

<a name="introduction"></a>

# Introduction

RxJS is a library for composing asynchronous and event-based programs by using observable sequences. It provides one core type, the Observable, satellite types (Observer, Schedulers, Subjects) and operators inspired by Array#extras (map, filter, reduce, every, etc) to allow handling asynchronous events as collections.

> Think of RxJS as [Lodash](https://lodash.com/) for events.

ReactiveX combines the Observer pattern with the Iterator pattern and functional programming with collections to fill the need for an ideal way of managing sequences of events.

The essential concepts in RxJS which solve async event management are:

- Observable: represents the idea of an invokable collection of future values or events.
- Observer: is a collection of callbacks that knows how to listen to values delivered by the Observable.
- Subscription: represents the execution of an Observable, is primarily useful for cancelling the execution.
- Operators: are pure functions that enable a functional programming style of dealing with collections with operations like map, filter, concat, reduce, etc.
- Subject: is equivalent to an EventEmitter, and the only way of multicasting a value or event to multiple Observers.
- Schedulers: are centralized dispatchers to control concurrency, allowing us to coordinate when computation happens on e.g. setTimeout or requestAnimationFrame or others.

<a name="license"></a>

# License

MIT © [Nya García Gallardo](https://github.com/NyaGarcia)

<a name="que-es-rxjs-docu"></a>

# ¿Qué es RxJS Docu?

Este proyecto está basado en la documentación oficial de RxJS y es una versión de la documentación en Castellano. Además de los ejemplos que encuentras en la documentación oficial se han incorporado otros que permiten ampliar los conocimientos a los lectores.

<a name="introduccion"></a>

# Introducción

RxJS es una biblioteca para componer programas asíncronos y basados en eventos, mediante secuencias observables. Proporciona un tipo _core_, el Observable, varios tipos satélite (Observer, Schedulers, Subjects) y operadores inspirados por las [funciones de Array](https://developer.mozilla.org/en-US/docs/Archive/Web/JavaScript/New_in_JavaScript/1.6) (`map`, `filter`, `reduce`, `every` etc.) para manejar eventos asíncronos como si fuesen colecciones.

> Podemos considerar a RxJS como el [Lodash](https://lodash.com/) para eventos.

ReactiveX combina el [patrón Observador](<https://es.wikipedia.org/wiki/Observer_(patr%C3%B3n_de_dise%C3%B1o)>) con el [patrón Iterador](<https://es.wikipedia.org/wiki/Iterador_(patr%C3%B3n_de_dise%C3%B1o)>) y la [programación funcional con colecciones](https://martinfowler.com/articles/collection-pipeline/#NestedOperatorExpressions), constituyendo así la solución ideal para manejar secuencias de eventos.

Los conceptos esenciales de RxJS que resuelven el manejo asíncrono de eventos son los siguientes:

- Observable: representa la idea de una colección invocable de valores futuros o eventos.
- Observador: es una colleción de _callbacks_ que sabe cómo escuchar a los valores proporcionados por el Observable.
- Suscripción: representa la ejecución de un Observable; es muy útil a la hora de cancelar la ejecución.
- Operadores: son funciones puras que permiten enfocar el manejo de las colecciones desde un estilo de programación funcional, con operaciones como `map`, `filter`, `concat`, `reduce` etc.
- Sujeto: es el equivalente a un EventEmitter, y la única manera de multidifundir un valor o un evento a múltiples Observadores.
- Planificadores: son despachadores centralizados para controlar la concurrencia, permitiendo coordinar cuándo ocurrirá la computación en `setTimeout`, `requestAnimationFrame` u otros.

<a name="licencia"></a>

# Licencia

MIT © [Nya García Gallardo](https://github.com/NyaGarcia)
