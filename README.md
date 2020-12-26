# ¿Qué es RxJS Docu?

Este proyecto está basado en la documentación oficial de RxJS y es una versión de la documentación en Castellano. Además de los ejemplos que encuentras en la documentación oficial se han incorporado otros que permiten ampliar los conocimientos a los lectores.

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

