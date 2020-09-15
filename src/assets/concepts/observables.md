# Observables

Los Observables son colecciones Push 'perezosas' de múltiples valores. Rellenan el hueco que faltaba en la siguiente tabla:

Ejemplo: el siguiente Observable empuja los valores `1`, `2`, `3` inmediatamente (de forma síncrona) cuando nos suscribimos a él, el valor `4` un segundo después de la suscripción y por último, se completa.

```javascript
import { Observable } from "rxjs";

const observable = new Observable(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
});
```

Para invocar al Observable y poder ver estos valores, nos tenemos que _suscribir_ a él:

```javascript
import { Observable } from "rxjs";

const observable = new Observable(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
});

console.log("justo antes de suscribirnos");
observable.subscribe({
  next(x) {
    console.log("obtenido el valor " + x);
  },
  error(err) {
    console.error("ha ocurrido un error: " + err);
  },
  complete() {
    console.log("listo");
  }
});
console.log("justo después de la suscripción");
```

Este código imprime lo siguiente por consola:

# Pull vs Push

_Pull_ y _Push_ son dos protocolos diferentes que describen cómo un _Producer_ de datos se comunica con un _Consumer_ de datos.

¿Qué es _Pull_? En los sistemas _Pull_, el _Consumer_ es el que determina cuándo recibe los datos del _Producer_. El _Producer_ no es consciente de cuándo se le proporcionan los datos al _Consumer_.

Todas las funciones de JavaScript son sistemas _Pull_. La función es el _Producer_ de datos, y el código que llama a la función la consume _extrayendo/pulling_ el valor de retorno de la llamada.

En ES2015, se introdujeron [las funciones e iteradores _generator_](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Iterators_and_Generators) (`function*`), otro tipo sistema _Pull_. El código que llama a `iterator.next()` es el _Consumer_, que "extrae" múltiples valores del iterador (el _Producer_).

Producer Consumer
Pull Passive: produces data when requested. Active: decides when data is requested.
Push Active: produces data at its own pace. Passive: reacts to received data.

¿Qué es _Push_? En los sistemas _Push_, el _Producer_ determina cuándo se le envían los datos al _Consumer_. El _Consumer_ no es consciente de cuándo va a recibir los datos.

Las Promesas son los sistemas _Push_ más comunes que hay hoy en día en JavaScript. Una Promesa (el _Producer_) hace entrega de un valor resuelto a callbacks registradas (los _Consumers_), pero, al contrario que las funciones, es la Promesa la que determina en qué momento el valor se "empuja" a las callbacks.

RxJS propone Observables, un nuevo sistema _Push_ para JavaScript. Un Observable es un _Producer_ de múltiples valores, "empujándolos" a los _Observers_ (_Consumers_).

- Una Función es una computación evaluada de forma perezosa que retorna un único valor de forma síncrona al ser invocada.

- Un generador es una computación evaluada de forma perezosa que devuelve cero o (potencialmente) infinitos valores de forma síncrona en la iteración.

- Una Promesa es una computación que puede o no retornar finalmente un único valor.

- Un Observable es una computación evaluada de forma perezosa que puede retornar cero o (potencialmente) infinitos valores de forma síncrona o asíncrona desde el momento de la invocación o en delante.

# Observables como generalizaciones de funciones

Al contrario de la opinión popular, los Observables no son como los EventEmitters ni como las Promesas para múltiples valores. Los Observables pueden actuar como EventEmitters en algunos casos, como cuando son _multicasteados_ mediante Subjects de RxJS, pero no es lo común.

> Los Observables son como funciones con cero argumentos, pero los generalizan para permitir múltiples valores.

Consideremos el siguiente caso:

```javascript
function foo() {
  console.log("Hola");
  return 42;
}

const x = foo.call(); // igual que foo()
console.log(x);
const y = foo.call(); // igual que foo()
console.log(y);
```

Esperamos ver el siguiente output:

```javascript
"Hello";
42;
("Hello");
42;
```

Podemos reescribir este comportamiento con Observables:

````javascript
    import { Observable } from 'rxjs';

    const foo = new Observable(subscriber => {
      console.log('Hola');
      subscriber.next(42);
    });

    foo.subscribe(x => {
      console.log(x);
    });
    foo.subscribe(y => {
      console.log(y);
    });
``

Y obtenemos el mismo output:

```javascript
"Hello"
42
"Hello"
42
```

Esto ocurre porque tanto las funcioens como los Observables son computaciones perezosas. Si no llamamos a la función, el `console.log('Hola')` no ocurrirá. Lo mismo ocurre con los Observables, si no los 'llamamos' (con subscribe), el `console.log('Hola')` no ocurrirá. Además, tanto las llamadas a funciones, como las suscripciones son operaciones aisladas: dos llamadas a funciones provocan dos efectos colaterales separados, y dos suscripciones a Observables provocan dos efectos colaterales separados. Al contrario que los EventEmitters, sin tener en cuenta la existencia de los suscriptores, comparten los efectos colaterales y son de ejecución *eager* o inmediata.

> Suscribirse a un Observable es análogo a llamar a una función.

Hay quien piensa que los Observables son asíncronos. Esto no es cierto. Si rodeamos una llamada a una función con logs, así:

```javascript
console.log('before');
console.log(foo.call());
console.log('after');
```

Podremos ver el siguiente output:

```javascript
"before"
"Hello"
42
"after"
```

Aquí tenemos el mismo comportamiento, con Observables:

```javascript
console.log('before');
foo.subscribe(x => {
console.log(x);
});
console.log('after');
```

El output es:

```javascript
"before"
"Hello"
42
"after"
```

Lo que demuestra que la suscripción a `foo` es completamente síncrona, al igual que una función.

> Los Observables pueden emitir valores de forma síncrona o asíncrona.

¿Cuál es la diferencia entre un Observable y una función? Los OBservables pueden "retornar" múltiples valores a lo largo del tiempo, algo que las funciones no pueden hacer. No podemos hacer esto:

```javascript
function foo() {
console.log('Hello');
return 42;
return 100; // Código muerto, nunca se llegará a ejecutar.
}
```

Las funciones solo pueden retornar un valor. Los Observables, sin embargo, pueden hacer esto:

```javascript
    import { Observable } from 'rxjs';

    const foo = new Observable(subscriber => {
      console.log('Hello');
      subscriber.next(42);
      subscriber.next(100); // "return" another value
      subscriber.next(200); // "return" yet another
    });

    console.log('before');
    foo.subscribe(x => {
      console.log(x);
    });
    console.log('after');
```

Con un output síncrono:

```javascript
"before"
"Hello"
42
100
200
"after"
```

También podemos "retornar" valores de forma asíncrona:

```javascript
    import { Observable } from 'rxjs';

    const foo = new Observable(subscriber => {
      console.log('Hello');
      subscriber.next(42);
      subscriber.next(100);
      subscriber.next(200);
      setTimeout(() => {
        subscriber.next(300); // happens asynchronously
      }, 1000);
    });

    console.log('before');
    foo.subscribe(x => {
      console.log(x);
    });
    console.log('after');
```

Con el siguiente output:

```javascript
"before"
"Hello"
42
100
200
"after"
300
```

Conclusión:

`func.call()` significa "dame un solo valor síncrono"
`observable.subscribe()` significa "dame un número determinado de valores síncronos o asíncronos"

#Anatomía de un Observable
Los Observables se crean mediante `new Observable` o un operador de creación, nos suscribimos a ellos mediante un *Observer*, durante la ejecución envían notificaciones `next`/ `error` / `complete`, y nos podemos deshacer de su ejecución. Estos cuatro aspectos están codificados en cada instancia del Observable, aunque algunos están relacionados con otros tipos, como el *Observer* y la *Suscripción*

Cometidos principales de un Observable:
- Crear Observables
- Suscribirse a un Observable
- Ejecutar el Observable
- Deshacerse de un Observable

#Creando Observables
El constructor del `Observable` recibe un argumento: la función `suscribe`.

El siguiente ejemplo crea un Observable que emite el string 'hola' cada segundo a un *suscriber*.

```javascript
import { Observable } from 'rxjs';

const observable = new Observable(function subscribe(subscriber) {
const id = setInterval(() => {
subscriber.next('hola')
}, 1000);
});
```

> Los Observables se pueden crear con `new Observable`. Más comúnmente, los Observables se crean mediante funciones de creación, como `of`, `from`, `interval` etc.

En el ejemplo anterior, la función `suscribe` es la pieza más importante para describir al Observable. Vamos a ver qué sinifica suscribirse.

#Suscripción a un Observable
Nos podemos suscribir al Observable `observable` así:

```javascript
observable.subscribe(x => console.log(x));
```

No es una coincidencia que `observable.subscribe` y `subscribe` en `new Observable (function subscribe(subscriber) {...})` tengan el mismo nombre. En la biblioteca, son distintos, pero por razones prácticas los podemos considerar conceptualmente iguales.

Esto nos muestre que las llamadas `subscribe` no se comparten entre los diversos *Observers* del mismo Observable. Al hacer una llamada a `observable.subscribe` desde un *Observer*, la función `subscribe in new Observable(function subscribe(subscriber) {...})` se ejecuta para dicho suscriber. Cada llamada a `observable.subscribe` provoca un *setup* independiente para dicho suscriber.

> Suscribirse a un Observable es como llamar a una función, proporcionando callbacks donde se recibirán los datos.

Esto es drásticamente diferente a las APIs de manejo de eventos como `addEventListener` / `removeEventListener`. Con `observable.subscribe`, el Observer no se registra como un listener en el Observable. El Observable ni siquiera mantiene una lista de Observers agregados.

La llamada `subscribe` es simplemente una forma de comenzar la "ejecución Observable" y enviar valores o eventos a un Observer de dicha ejecución.

#Ejecutando Observables

El código dentro de `new Observable(function subscribe(subscriber) {...})` representa una "ejecución Observable", una computación perezosa que solo se da para code Observer que se suscribe. La ejecución produce múltiples valores a lo largo del tiempo, bien síncrona o asíncronamente.

Hay tres tipos de valores que una Ejecución Observable puede entregar:

- notificación "Next": envía un valor como puede ser un Number, un String, un Object, etc.
- notificación "Error": envía un Error JavaScript o una excepción.
- notificación "Complete": no envía ningún valor.

Las notificaciones "Next" son las más importantes, y las más comunes: representan los datos que se envían al suscriptor. Las notificaciones "Error" y "Complete" solo pueden ocurrir una vez durante la Ejecución Observable, y solo puede darse una de ellas.

La mejor forma de expresar estas restricciones es mediante la Gramática Observable o Contract, escrita mediante una expresión regular:

```javascript
next\*(error|complete)?
```

> En una Ejecución Observable, se pueden entregar desde cero a infinitas notificaciones. En el caso de que se diera una notificación "Error" o "Complete", ninguna otra notificación podrá emitirse a partir de ese momento.

En el siguiente ejemplo podemos ver una Ejecución Observable que emite tres notificaciones "Next", y se completa:

```javascript
import { Observable } from 'rxjs';

const observable = new Observable(function subscribe(subscriber) {
subscriber.next(1);
subscriber.next(2);
subscriber.next(3);
subscriber.complete();
});
```

Los Observables se adhieren estrictamente al Contrato Observable, por lo que el siguiente código no puede llegar a emitir la notificación "Next" 4:

```javascript
import { Observable } from 'rxjs';

const observable = new Observable(function subscribe(subscriber) {
subscriber.next(1);
subscriber.next(2);
subscriber.next(3);
subscriber.complete();
subscriber.next(4); // Esta notificación no se emite, ya que supondría una violación del Contrato
});
```

Suele ser una buena práctica el "envolver" cualquier código que haya en el `subscribe` con un bloque `try/catch` que emita una notificación "Error" en el caso de que capture una excepción:

```javascript
    import { Observable } from 'rxjs';

    const observable = new Observable(function subscribe(subscriber) {
      try {
        subscriber.next(1);
        subscriber.next(2);
        subscriber.next(3);
        subscriber.complete();
      } catch (err) {
        subscriber.error(err); // Emite un error si se captura alguno
      }
    });
```

# Cancelando Ejecuciones Observables

Ya que las Ejecuciones Observables pueden ser infinitas, y es muy común que un Observer quiera abortar la ejecución en un tiempo finito, necesitamos una API para poder cancelar una ejecución. Dado que cada ejecución pertenece exclusivamente a un único Observer, una vez que el Observer ha terminado de recibir valores, tiene que tener una forma de parar la ejecución, para evitar el gasto de recursos de memoria o de computación.

Cuando se hace una llamada a `observable.subscribe`, el Observer se vincula a la ejecución Observable recién creada. Este llamada también devuelve un objeto, la `Subscription`:

```javascript
const subscription = observable.subscribe(x => console.log(x));
```

La Subscription representa la ejecución en curso, y tiene una API minimalista que nos permite cancelar dicha ejecución. Se puede leer más acerca del [tipo Subscription aquí](). Con `subscription.unsubscribe()` podemos cancelar la ejecución en curso:

```javascript
import { from } from 'rxjs';

const observable = from([10, 20, 30]);
const subscription = observable.subscribe(x => console.log(x));
// Más tarde:
subscription.unsubscribe();
```

> Cuando nos suscribimos, obtenemos una Subscription, que representa la ejecución en curso. Para cancelar la ejecución, simplemente llamamos a `unsubscribe()`.

Cada Observable es responsable de definir cómo deshacerse de los recursos de su ejecución cuando creamos el Observable mediante `create()`. Podemos hacerlo mediante el retorno de una función `unsubscribe` personalizada desde la función `subscribe()`.

Por ejemplo, así es como limpiamos una ejecución intervalo creada con `setInterval`:

```javascript
const observable = new Observable(function subscribe(subscriber) {
  // Utilizando el recurso interval
  const intervalId = setInterval(() => {
    subscriber.next("hi");
  }, 1000);

  // Proporcionamos una forma de cancelar el recurso interval
  return function unsubscribe() {
    clearInterval(intervalId);
  };
});
```

Al igual ocurre con el parecido entre `observable.subscribe` y `new Observable(function subscribe() {...})`, el `unsubscribe` que retornamos desde `subscribe` es conceptualmente equivalente al `subscription.unsubscribe`. De hecho, si eliminamos los tipos de ReactiveX que rodean estos conceptos, nos quedamos con un código JavaScript sencillo.

```javascript
function subscribe(subscriber) {
  const intervalId = setInterval(() => {
    subscriber.next("hola");
  }, 1000);

  return function unsubscribe() {
    clearInterval(intervalId);
  };
}

const unsubscribe = subscribe({ next: x => console.log(x) });

// Más tarde:
unsubscribe(); // Gestionamos la eliminación de los recursos
```

La razón por la que utilizamos tipos de Rx como el _Observable_, _Observer_ o la _Subscription_ es para garantizar la seguridad (el Contrato Observable) y la componibilidad con Operadores.
````
