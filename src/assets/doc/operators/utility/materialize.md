# materialize

<h2 class="subtitle">Representa todas las notificaciones next del Observable fuente como emisiones marcadas con sus tipos originales, dentro de objetos Notification</h2>

<details>
<summary>Signatura</summary>

### Firma

`materialize<T>(): OperatorFunction<T, Notification<T>>`

### Parámetros

No recibe ningún parámetro.

### Retorna

`OperatorFunction<T, Notification<T>>`: Un Observable que emite objetos Notification que contienen las emisiones originales del Observable fuente, además de sus metadatos correspondientes.

</details>

## Descripción

Envuelve emisiones next, error y complete en objetos Notification, emitidos como valores next en el Observable resultante.

<img src="assets/images/marble-diagrams/utility/materialize.png" alt="Diagrama de canicas del operador materialize">

materialize retorna un Observable que emite una notificación next por cada emisión next, error o complete del Observable fuente. Cuando el Observable fuente emite complete, el Observable resultante emitirá una Notificación de tipo complete, como valor next, y se completará también. Cuando el Observable fuente emite un error, el Observable resultante emitirá una Notificación de tipo error como valor next, y se completará.

Este operador es útil para producir metadatos de las emisiones del Observable fuente, que se consumen en forma de notificaciones next. Se suele utilizar en conjunto con [dematerialize](/operators/utility/dematerialize).

## Ejemplos

### Ejemplo de la documentación oficial

**Convierte un Observable defectuoso en un Observable de Notifications**

```javascript
import { of } from "rxjs";
import { materialize, map } from "rxjs/operators";

const letters = of("a", "b", 13, "d");
const upperCase = letters.pipe(map((x) => x.toUpperCase()));
const materialized = upperCase.pipe(materialize());
materialized.subscribe((x) => console.log(x));

// Salida:
// - Notification {kind: "N", value: "A", error: undefined, hasValue: true}
// - Notification {kind: "N", value: "B", error: undefined, hasValue: true}
// - Notification {kind: "E", value: undefined, error: TypeError:
//   x.toUpperCase is not a function at MapSubscriber.letters.map.x
//   [as project] (http://1…, hasValue: false}
```

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/materialize.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/materialize">Documentación oficial en inglés</a>
