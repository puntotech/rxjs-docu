# throwError

<h2 class="subtitle"> Crea un Observable que solo emite una notificación de error
</h2>

<details>
<summary>Signatura</summary>

### Firma

`throwError(error: any, scheduler?: SchedulerLike): Observable<never>`

### Parámetros

<table>
<tr><td>error</td><td>El Error que se le proporciona a la notificación error.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
El <code>SchedulerLike</code> que utilizar para planificar la emisión de la notificación <code>error</code>.</td></tr>

</table>

### Retorna

`Observable<never>`: Un Observable de error: emite solo la notificación `error` utilizando el argumento `error` proporcionado

</details>

## Descripción

Emite un Error y nada más.

<img src="assets/images/marble-diagrams/creation/throwError.png" alt="Diagrama de canicas de throw">

Este operador estático es útil para crear un Observable simple que solo emite la notificación de error. Se puede utilizar para la composición de Observables, como por ejemplo, usando `mergeMap`.

## Ejemplos

**Emitir un error simple**

<a target="_blank" href="https://stackblitz.com/edit/docu-rxjs-throwerror?file=index.ts">StackBlitz</a>

```javascript
import { throwError } from "rxjs";

const error$ = throwError("¡Oh no!");

error$.subscribe(
  (result) => console.log(result),
  (error) => console.error(error)
);
// Salida: (error) 'Oh no!
```

**Lanzar un error según se cumpla una condición**

<a target="_blank" href="https://stackblitz.com/edit/docu-rxjs-throwerror-2?file=index.ts">StackBlitz</a>

```javascript
import { of, throwError } from "rxjs";
import { concatMap } from "rxjs/operators";

const user$ = of(
  { name: "NyaGarcía", age: 23 },
  { name: "zaldih", age: 21 },
  { name: "caballerog", age: 35 },
  { name: "carla.1003", age: 17 }
);

user$
  .pipe(
    concatMap((user) =>
      user.age < 18 ? throwError("Menor de edad") : of(user)
    )
  )
  .subscribe(console.log, console.error);
// Salida: { name: "NyaGarcía", age: 23 }, { name: 'zaldih', age: 21 }, { name: "caballerog", age: 35 }, (error) Menor de edad
```

### Ejemplos de la documentación oficial

**Emitir el número 7 y después un Error**

```javascript
import { throwError, concat, of } from "rxjs";

const result = concat(of(7), throwError(new Error("oops!")));
result.subscribe(
  (x) => console.log(x),
  (e) => console.error(e)
);

// Salida: 7, (error) Error: oops!
```

**Proyectar cada número a la secuencia 'a', 'b', 'c', lanzando un error para el número 2**

```javascript
import { throwError, interval, of } from "rxjs";
import { mergeMap } from "rxjs/operators";

interval(1000)
  .pipe(
    mergeMap((x) =>
      x === 2 ? throwError("El número 2 no mola") : of("a", "b", "c")
    )
  )
  .subscribe(
    (x) => console.log(x),
    (e) => console.error(e)
  );

// Salida:
// a
// b
// c
// a
// b
// c
// (error) El número 2 no mola
```

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/throwError.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/index/function/throwError">Documentación oficial en inglés</a>
