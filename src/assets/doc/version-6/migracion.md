# Guía de Actualización de RxJS v5.x a v6

¡RxJS v6 ha llegado! Aunque este sea un cambio de versión mayor, hemos tratado de mantener los _breaking changes_ al mínimo. En la mayoría de los casos, esto permite que los desarrolladores de aplicaciones y bibliotecas actualicen de forma incremental y utilicen RxJS v6 sin ninguna modificación a su actual.

La capa de compatibilidad regresiva facilita el proceso de actualización, permitiendo que las aplicaciones se mantengan funcionando mientras se van aplicando los cambios en el código al ritmo que necesite cada desarrollador. El proceso completo puede llevarse a cabo en etapas:

1. Actualizar hasta la última versión de RxJS 5.5 y asegurarse de que se haya solucionado cualquier problema causado por las correcciones de errores.

2. Instalar RxJS v6 además del paquete de [compatibilidad regresiva](https://rxjs-dev.firebaseapp.com/guide/v6/migration#backwards-compatibility), `rxjs-compat`.

3. Si la aplicación resulta afectada por alguno de los pocos _breaking changes_ que no se cubren en `rxjs-compat`, se debe actualizar el código afectado acorde a las instrucciones proporcionadas a continuación.

4. Eventualmente, se querrá [prescindir de la capa de compatibilidad]() para completar la actualización a RxJS v6. Al hacerlo, el tamaño de la aplicación disminuirá significativamente. Se puede refactorizar el código TypeScript para que no dependa en `rxjs-compat` con `rxjs-tslint`:

```javascript
npm i -g rxjs-tslint
rxjs-5-to-6-migrate -p [ruta/hacia/tsconfig.json]
```

5. Antes del lanzamiento de RxJS v7, será necesario eliminar o reemplazar toda funcionalidad obsoleta.

## Compatibilidad regresiva

Para minimizar el impacto de la actualización, el lanzamiento de RxJS v6 se hizo en conjunto con el paquete `rxjs-compat`, que proporciona una capa de compatibilidad entre las APIs de v5 y v6. La mayoría de los desarrolladores con aplicaciones en producción deberían llevar a cabo el proceso de actualización instalando tanto `rxjs` como `rxjs-compat` en ^6.0.0:

```javascript
npm i rxjs@6 rxjs-compat@6
```

Para obtener más información sobre este paquete, [ver aquí](https://www.npmjs.com/package/rxjs-compat).

El paquete de compatibilidad aumenta el tamaño del _bundle_ de la aplicación, por lo que se recomienda prescindir de él en cuanto la aplicación y las dependencias hayan sido actualizadas. El aumento del tamaño se exacerba si se utiliza una versión de Webpack previa a la 4.0.0.

Para una explicación completa acerca de lo que se debe actualizar para poder prescindir de `rxjs-compat`, ver la sección [Prescindir de la capa de compatibilidad](). Se debe tener en cuenta que al actualizar una aplicación a v6 de forma completa puede descubrir errores de tipado que no fuesen mostrados anteriormente.

## _Breaking Changes_ no cubiertos por rxjs-compat

Si se ha instalado `rxjs-compat`, únicamente hay dos _breaking changes_ que haya que arreglar de forma inmediata:

### Gestión de errores síncrona

La gestión de errores síncrona (hacer una llamada al método `Observable.subscribe()` desde un bloque `try/catch`) ya no recibe soporte. Si se utiliza, debe ser reemplazada con gestión de errores asíncrona, mediante el uso de la _callback_ de `error` en el método `Observable.subscribe()`. [Ver ejemplos.](https://rxjs-dev.firebaseapp.com/guide/v6/migration#ex-1)

### Operadores prototipo de TypeScript

Si se definen operadores prototipo propios en TypeScript y se modifica el _namespace_ del `Observable`, será necesario cambiar el código del operador para conseguir que TypeScript compile. [Ver ejemplos.](https://rxjs-dev.firebaseapp.com/guide/v6/migration#ex-2) Este es un caso relativamente raro, que probablemente afecte solo a desarrolladores de TypeScript de nivel avanzado.

## Ejemplos

### Reemplazando la gestión de errores síncrona

El siguiente ejemplo muestra un código que realiza una suscripción a un observable desde un bloque `try/catch`, para llevar a cabo la gestión de errores de forma síncrona:

```javascript
try {
  source$.subscribe(nextFn, undefined, completeFn);
} catch (err) {
  handleError(err);
}
```

El siguiente código muestra la actualización de una gestión de errores síncrona a una asíncrona, mediante la definición de una callback de error para `Observable.subscribe()`:

```javascript
source$.subscribe(nextFn, handleError, completeFn);
```

El siguiente ejemplo muestra un test que depende de una gestión de errores síncrona:

```javascript
it("should emit an error on subscription", () => {
  expect(source$.subscribe()).toThrow(Error, "algún mensaje");
});
```

El siguiente código nos muestra cómo corregir el test para que gestione los errores de forma asíncrona:

```javascript
it("should emit an error on subscription", (done) => {
  source$.subscribe({
    error(err) {
      expect(err.message).toEqual("some message");
    },
  });
});
```

### Operadores prototipo de TypeScript definidos por el usuario

El siguiente ejemplo nos muestra el tipo de cambios que deberán llevarse a cambio en los operadores prototipo definidos por el usuario para que TypeScript pueda compilar de forma correcta.

A continuación, un ejemplo de un operador prototipo definido por el usuario:

```javascript
Observable.prototype.userDefined = function () {
  return new Observable((subscriber) => {
    this.subscribe({
      next(value) {
        subscriber.next(value);
      },
      error(err) {
        subscriber.error(err);
      },
      complete() {
        subscriber.complete();
      },
    });
  });
};

source$.userDefined().subscribe();
```

Para que este código compile correctamente en v6, se deben llevar a cambio los siguientes cambios:

```javascript
    const userDefined = <T>() => (source: Observable<T>) => new Observable<T>((subscriber) => {
        source.subscribe({
          next(value) { subscriber.next(value); },
          error(err) { subscriber.error(err); },
          complete() { subscriber.complete(); },
       });
      });
    });

    source$.pipe(
      userDefined(),
    )
    .subscribe();
```

## Prescindir de la capa de compatibilidad

Si se utilizan funcionalidades que se han eliminado de v6, pero a las que se les da soporte en el paquete `rxjs-compat`, se debe refactorizar/reescribir el código para completar la actualización a v6. Las siguientes áreas de funcionalidad dependen de la capa de compatibilidad:

- Las rutas de importación han cambiado.
- La sintaxis de los operadores ha cambiado de usar encadenamiento a usar tuberías.
- Las clases que operan en los Observables se han sustituido por funciones.
- En las funciones que contengan el parámetro `resultSelector`, los parámetros se han vuelto obsoletos (en la mayoría de los casos) y se han reemplazado por dos funciones. Aquellos que hayan sido reemplazados deben actualizarse antes de poder prescindir de la capa de compatibilidad.

## Rutas de importación

A aquellos que sean desarrolladores de TypeScript se les recomienda utilizar `rxjs-tslint` para refactorizar las rutas de importación.

Para los desarrolladores de JavaScript, la regla general es la siguiente:

1. rxjs: Métodos de creación, tipos, schedulers y utilidades

```javascript
import {
  Observable,
  Subject,
  asapScheduler,
  pipe,
  of,
  from,
  interval,
  merge,
  fromEvent,
  SubscriptionLike,
  PartialObserver,
} from "rxjs";
```

2. rxjs/operators: Todos los operadores de tubería:

```javascript
import { map, filter, scan } from "rxjs/operators";
```

3. rxjs/webSocket: La implementación del sujeto de web socket

```javascript
import { webSocket } from "rxjs/webSocket";
```

4. rxjs/ajax: La implementación de Rx ajax

```javascript
import { ajax } from "rxjs/ajax";
```

5. rxjs/testing: Las utilidades de testing

```javascript
import { TestScheduler } from "rxjs/testing";
```

## Sintaxis de operadores tubería

El estilo de código de encadenamiento de operadores que había anteriormente ha sido reemplazado por las tuberías, de tal manera que el resultado de cada operador es la entrada del siguiente. Los operadores tubería fueron añadidos en la versión 5.5. Para el debate completo acerca de estos operadores y de los cambios requeridos, [ver aquí](https://github.com/ReactiveX/rxjs/blob/91088dae1df097be2370c73300ffa11b27fd0100/doc/pipeable-operators.md).

Antes de poder prescindir de la capa de compatibilidad, se debe refactorizar el código para usar únicamente los operadores tubería. En TypeScript, la herramienta `tslint` automatiza este proceso hasta cierto punto, aplicando la transformación al código que esté correctamente tipado.

- Ver [Conversión a sintaxis de tubería]() para obtener más detalles sobre cómo refactorizar utilizando [rxjs-tslint](https://github.com/reactivex/rxjs-tslint).

## Clases Observables

Todas las [clases observables](https://github.com/ReactiveX/rxjs/tree/5.5.8/src/observable) han sido eliminadas de v6, para ser sutituidas por operadores nuevos, o ya existentes, que llevan a cabo las mismas operaciones que los métodos de clase. Por ejemplo, `ArrayObservable.create(myArray)` se puede sustituir por `from(myArray)`, o por el operador nuevo `fromArray()`.

- `ConnectableObservable` carece de acceso directo en v6, y es accesible únicamente a través de los operadores `multicast`, `publish`, `publishReplay` y `publishLast`.
- `SubscribeOnObservable` carece de acceso directo en v6, y es accesible únicamente a través del operador `subscribeOn`.

<table>
<tr><td>v6 creation function</td><td>v5 class</td></tr>
<tr><td>from </td> 	<td>ArrayLikeObservable</td></tr>
<tr><td>of </td> 	<td>ArrayObservable</td></tr>
<tr><td>bindCallback </td> 	<td>BoundCallbackObservable</td></tr>
<tr><td>bindNodeCallback </td> 	<td>BoundNodeCallbackObservable</td></tr>
<tr><td>defer </td> 	<td>DeferObservable</td></tr>
<tr><td>empty o EMPTY (constante)</td> 	<td>EmptyObservable</td></tr>
<tr><td>throwError </td> 	<td>ErrorObservable</td></tr>
<tr><td>forkJoin </td> 	<td>ForkJoinObservable</td></tr>
<tr><td>fromEvent </td> 	<td>FromEventObservable</td></tr>
<tr><td>fromEventPattern </td> 	<td>FromEventPatternObservable</td></tr>
<tr><td>from </td> 	<td>FromObservable</td></tr>
<tr><td>generate </td> 	<td>GenerateObservable</td></tr>
<tr><td>iif </td> 	<td>IfObservable</td></tr>
<tr><td>interval </td> 	<td>IntervalObservable</td></tr>
<tr><td>from </td> 	<td>IteratorObservable</td></tr>
<tr><td>NEVER (constante)</td> 	<td>NeverObservable</td></tr>
<tr><td>pairs </td> 	<td>PairsObservable</td></tr>
<tr><td>from </td> 	<td>PromiseObservable</td></tr>
<tr><td>range </td> 	<td>RangeObservable</td></tr>
<tr><td>of </td> 	<td>ScalarObservable</td></tr>
<tr><td>timer </td> 	<td>TimerObservable</td></tr>
<tr><td>using </td> 	<td>UsingObservable</td></tr>
</table>

## Selectores de resultado eliminados u obsoletos

Los selectores de resultado son una funcionalidad que no se utiliza frecuentemente (en muchas casos no estaban documentados), pero incrementaban el tamaño del código de forma significativa. En el caso de utilizarse, se debe reemplazar el parámetro `resultSelector` obsoleto por código de selección de resultado externo.

- El parámetro `resultSelector` de `first()` y `last()` ha sido eliminado en v6. En el caso de que estas funciones fuesen utilizadas con este parámetro, el código se debe actualizar sin la ayuda del paquete `rxjs-compat`.

- El parámetro `resultSelector` que estaba disponible en muchos de los operadores de mapeo se ha vuelto obsoleto en v6, y su implementación ha sido reescrita para ser mucho más pequeña. Seguirán funcionando sin el paquete de compatibilidad, pero deben ser reemplazados antes del lanzamiento de v7. Ver [Funcionalidades obsoletas.]()

Ver [Migración de Selector de Resultado]() para más detalles sobre qué operadores se ven afectados y cómo quitar las funciones de selección de resultado de la llamada al operador.

## Funcionalidades obsoletas

Antes del lanzamiento de RxJS v7, se debe eliminar/reemplazar cualquier uso de funcionalidades obsoletas. Las siguientes áreas contienen funcionalidad obsoleta:

- `Observable.if` y `Observable.throw`. Estos métodos han sido reemplazados por las funciones estáticas `iif()` y `throwError()`. Se puede utilizar [rxjs-tslint](https://github.com/reactivex/rxjs-tslint) para convertir las llamadas a métodos a llamadas a funciones.
  Ver [Cómo convertir métodos obsoletos](https://rxjs-dev.firebaseapp.com/guide/v6/migration#dep-methods) para obtener más detalles.

- Operadores de creación. Los siguientes operadores se han movido de `rxjs/operators` a `rxjs`, y su uso ha cambiado:
- `merge`
- `concat`
- `combineLatest`
- `race`
- `zip`

Ver [Cómo convertir métodos obsoletos](https://rxjs-dev.firebaseapp.com/guide/v6/migration#dep-methods) para obtener más detalles.

- Selectores de resultado.
  Ver [Migración de Selectores de Resultado]() para obtener más detalles sobre qué operadores se ven afectados y cómo quitar las funciones de selección de resultado de la llamada al operador.

## Cómo: Convertir a sintaxis de tubería

Antes de convertir los operadores de encadenamiento a operadores de tubería, hay que asegurarse de importar los operadores que se vayan a utilizar de `rxjs/operators`. Por ejemplo:

```javascript
import { map, filter, catchError, mergeMap } from "rxjs/operators";
```

Se ha cambiado el nombre de los siguientes operadores, ya que sus nombres anteriores coincidían con palabras reservadas del lenguaje JavaScript:

- `do` -> `tap`
- `catch` -> `catchError`
- `switch` -> `switchAll`
- `finally` -> `finalize`

Para convertir los operadores de encadenamiento a operadores de tubería, se deben envolver en el método `pipe()` del Observable origen, eliminar los puntos y añadir comas para pasar cada operador al método `pipe()` como argumento.

Por ejemplo, el siguiente código utiliza encadenamiento:

```javascript
source
  .map((x) => x + x)
  .mergeMap((n) =>
    of(n + 1, n + 2)
      .filter((x) => x % 1 == 0)
      .scan((acc, x) => acc + x, 0)
  )
  .catch((err) => of("error found"))
  .subscribe(printResult);
```

Para convertirlo a una tubería:

```javascript
source
  .pipe(
    map((x) => x + x),
    mergeMap((n) =>
      of(n + 1, n + 2).pipe(
        filter((x) => x % 1 == 0),
        scan((acc, x) => acc + x, 0)
      )
    ),
    catchError((err) => of("error found"))
  )
  .subscribe(printResult);
```

# Cómo: Convertir métodos obsoletos

`Observable.if` -> `iif()`

```javascript
Observable.if(test, a$, b$);

// Se convierte en

iif(test, a$, b$);
```

`Observable.error` -> `throwError()`

```javascript
Observable.throw(new Error());

// Se convierte en

throwError(new Error());
```

`merge`

```javascript
import { merge } from "rxjs/operators";
a$.pipe(merge(b$, c$));

// Se convierte en

import { merge } from "rxjs";
merge(a$, b$, c$);
```

`concat`

```javascript
import { concat } from "rxjs/operators";
a$.pipe(concat(b$, c$));

// Se convierte en

import { concat } from "rxjs";
concat(a$, b$, c$);
```

`combineLatest`

```javascript
import { combineLatest } from "rxjs/operators";
a$.pipe(combineLatest(b$, c$));

// Se convierte en

import { combineLatest } from "rxjs";
combineLatest(a$, b$, c$);
```

`race`

```javascript
import { race } from "rxjs/operators";
a$.pipe(race(b$, c$));

// Se convierte en

import { race } from "rxjs";
race(a$, b$, c$);
```

`zip`

```javascript
import { zip } from "rxjs/operators";
a$.pipe(zip(b$, c$));

// Se convierte en

import { zip } from "rxjs";
zip(a$, b$, c$);
```

# Cómo: Migración del selector de resultado

En RxJS v5.x, un gran número de operadores tenían un argumento `resultSelector` opcional, al que se le podía pasar una función para manejar el resultado de las operaciones.

Si se está utilizando dicho parámetro, se debe actualizar el código moviendo la función de selección de resultado fuera de la llamada al operador, y aplicarla a los resultados de la llamada.

- El parámetro se ha _eliminado_ de los operadores `first()` y `last()` en v6, pero se le sigue dando soporte en el paquete `rxjs-compat`. Para poder prescindir del paquete de compatibilidad, es necesario actualizar el código.

- El parámetro está _obsoleto_ en los siguientes operadores, y será eliminado en v7. Es necesario actualizar el código antes de actualizar a v7.

- `mergeMap()`
- `mergeMapTo()`
- `concatMap()`
- `concatMapTo()`
- `switchMap`
- `switchMapTo()`
- `exhaustMap()`
- `forkJoin()`
- `zip()`
- `combineLatest()`
- `fromEvent()`

## Ejemplos

### first()

- Con `resultSelector` (v5.x)

```javascript
source.pipe(first(predicate, resultSelector, defaultValue));
```

- sin `resultSelector` (si no se utiliza el índice)

```javascript
source.pipe(first(predicate, defaultValue), map(resultSelector));
```

- sin `resultSelector` (si se utiliza el índice)

```javascript
source.pipe(
  map((v, i) => [v, i]),
  first(([v, i]) => predicate(v, i)),
  map(([v, i]) => resultSelector(v, i))
);
```

### last()

- Con `resultSelector` (v5.x)

```javascript
source.pipe(last(predicate, resultSelector, defaultValue));
```

- sin `resultSelector` (si no se utiliza el índice)

```javascript
source.pipe(last(predicate, defaultValue), map(resultSelector));
```

- sin `resultSelector` (si se utiliza el índice)

```javascript
source.pipe(
  map((v, i) => [v, i]),
  last(([v, i]) => predicate(v, i)),
  map(([v, i]) => resultSelector(v, i))
);
```

### mergeMap()

- Con `resultSelector` (v5.x)
  _NOTA: El argumento de límite de concurrencia es opcional, se muestra aquí por mostrar un ejemplo completo_

```javascript
source.pipe(mergeMap(fn1, fn2, concurrency));
```

- La misma funcionalidad sin `resultSelector`, conseguida con un `map` interno

```javascript
source.pipe(
  mergeMap((a, i) => fn1(a, i).pipe(map((b, ii) => fn2(a, b, i, ii)))),
  concurrency
);
```

### mergeMapTo()

- Con `resultSelector` (v5.x)

```javascript
source.pipe(mergeMapTo(a$, resultSelector));
```

- Sin `resultSelector`

```javascript
source.pipe(
 mergeMapTo((x, i) => a$.pipe(
   map((y, ii) => resultSelector(x, y, i, ii))
 )
)
```

### concatMap()

- Con `resultSelector` (v5.x)

```javascript
source.pipe(concatMap(fn1, fn2));
```

- La misma funcionalidad sin `resultSelector`, conseguida con un `map` interno

```javascript
source.pipe(
 concatMap((a, i) => fn1(a, i).pipe(
   map((b, ii) => fn2(a, b, i, ii))
 )
)
```

### concatMapTo()

- Con `resultSelector` (v5.x)

```javascript
source.pipe(concatMapTo(a$, resultSelector));
```

- Sin `resultSelector`

```javascript
source.pipe(
 concatMap((x, i) => a$.pipe(
   map((y, ii) => resultSelector(x, y, i, ii))
 )
)
```

### switchMap()

- Con `resultSelector` (v5.x)

```javascript
source.pipe(switchMap(fn1, fn2));
```

- La misma funcionalidad sin `resultSelector`, conseguida con un `map` interno

```javascript
source.pipe(
 switchMap((a, i) => fn1(a, i).pipe(
   map((b, ii) => fn2(a, b, i, ii))
 )
)
```

### switchMapTo()

- Con `resultSelector` (v5.x)

```javascript
source.pipe(switchMapTo(a$, resultSelector));
```

- Sin `resultSelector`

```javascript
source.pipe(
 switchMap((x, i) => a$.pipe(
   map((y, ii) => resultSelector(x, y, i, ii))
 )
)
```

### exhaustMap()

- Con `resultSelector` (v5.x)

```javascript
source.pipe(exhaustMap(fn1, fn2));
```

- La misma funcionalidad sin `resultSelector`, conseguida con un `map` interno

```javascript
source.pipe(
 exhaustMap((a, i) => fn1(a, i).pipe(
   map((b, ii) => fn2(a, b, i, ii))
 )
)
```

### forkjoin()

- Con `resultSelector` (v5.x)

```javascript
forkJoin(a$, b$, c$, resultSelector);
// O
forkJoin([a$, b$, c$], resultSelector);
```

- Sin `resultSelector`

```javascript
forkJoin(a$, b$, c$).pipe(map((x) => resultSelector(...x)));
// O
forkJoin([a$, b$, c$]).pipe(map((x) => resultSelector(...x)));
```

### zip()

- Con `resultSelector` (v5.x)

```javascript
zip(a$, b$, c$, resultSelector);
// O
zip([a$, b$, c$], resultSelector);
```

- Sin `resultSelector`

```javascript
zip(a$, b$, c$).pipe(map((x) => resultSelector(...x)));
// O
zip([a$, b$, c$]).pipe(map((x) => resultSelector(...x)));
```

### combineLatest()

- Con `resultSelector` (v5.x)

```javascript
combineLatest(a$, b$, c$, resultSelector);
// O
combineLatest([a$, b$, c$], resultSelector);
```

- Sin `resultSelector`

```javascript
combineLatest(a$, b$, c$).pipe(map((x) => resultSelector(...x)));
// O
combineLatest([a$, b$, c$]).pipe(map((x) => resultSelector(...x)));
```

### fromEvent()

- Con `resultSelector` (v5.x)

```javascript
fromEvent(button, "click", resultSelector);
```

- Sin `resultSelector`

```javascript
fromEvent(button, "click").pipe(map(resultSelector));
```

## Renombramiento del módulo UMD

En RxJS v6.x, el nombre de módulo UMD se ha cambiado de Rx a rxjs para que concuerde con los nombres de los demás módulos.

```javascript
const rx = Rx;

rx.Observable.of(1, 2, 3).map((x) => x + "!!!");

// Se convierte en

const { of } = rxjs;
const { map } = rxjs.operators;

of(1, 2, 3).pipe(map((x) => x + "!!!")); // etc
```
