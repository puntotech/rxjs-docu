---
description: >-
  Convierte un Observable de objetos Notification en las emisiones que
  representan
---

# dematerialize

<details>

<summary>Signatura</summary>

#### Firma

`dematerialize<T>(): OperatorFunction<Notification<T>, T>`

#### Parámetros

No recibe ningún parámetro.

#### Retorna

`OperatorFunction<Notification<T>, T>`: Un Observable que emite elementos y notificaciones embebidos en objetos `Notification` emitidos por el Observable fuente.

</details>

## Description

Transforma los objetos `Notification` en emisiones `next`, `error` y `complete`. Es el operador opuesto a `materialize`.

![Diagrama de canicas del operador dematerialize](assets/images/marble-diagrams/utility/dematerialize.png)

`dematerialize` opera un Observable que únicamente emite objetos `Notification` como emisiones `next`, y no emite ningún error. Tal Observable es el resultado de una operación con `materialize`. Esas notificaciones se transforman mediante los metadatos que contienen, y se emiten como notificaciones `next`, `error` y `complete` en el Observable salida.

Se utiliza junto al operador `materialize`.

## Ejemplos

**Convierte las Notificaciones en emisiones con el mismo valor y tipo (error, next o complete)**

[StackBlitz](https://stackblitz.com/edit/rxjs-dematerialize-1?file=index.ts)

```javascript
import { dematerialize } from "rxjs/operators";
import { of, Notification } from "rxjs";

const notification$ = of(
  Notification.createNext("RxJS mola"),
  Notification.createError(new Error("¡Oh no!"))
);

// Emitirá objetos Notification
notification$.subscribe(console.log);
/* Salida: 
Notification { kind: 'N', value: 'RxJS is cool', error: undefined, ... }, 
Notification { kind: 'E', value: undefined, error: {...}, ...}
*/

// Al usar dematerialize, emitirá el valor de la notificación
notification$.pipe(dematerialize()).subscribe(console.log, console.error);
// Salida: RxJS is cool, (error) Oh noez!
```

### Ejemplo de la documentación oficial

**Convierte un Observable de Notificaciones en un Observable de valores**

```javascript
import { of, Notification } from "rxjs";
import { dematerialize } from "rxjs/operators";

const notifA = new Notification("N", "A");
const notifB = new Notification("N", "B");
const notifE = new Notification(
  "E",
  undefined,
  new TypeError("x.toUpperCase is not a function")
);
const materialized = of(notifA, notifB, notifE);
const upperCase = materialized.pipe(dematerialize());
upperCase.subscribe(
  (x) => console.log(x),
  (e) => console.error(e)
);

// Salida:
// A
// B
// TypeError: x.toUpperCase is not a function
```

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/dematerialize.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/operators/dematerialize)
