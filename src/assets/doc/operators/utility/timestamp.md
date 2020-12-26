# timestamp

<h2 class="subtitle">Adjunta un timestamp a cada elemento emitido por el Observable, indicando el momento en el que fue emitido</h2>

<details>
<summary>Signatura</summary>

### Firma

`timestamp<T>(scheduler: SchedulerLike = async): OperatorFunction<T, Timestamp<T>>`

### Parámetros

<table>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>async</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

## Retorna

`OperatorFunction<T, Timestamp<T>>:`

</details>

## Descripción

Adjunta un timestamp a cada elemento emitido por el Observable, que indica el momento en el que dicho valor fue emitido.

<img src="assets/images/marble-diagrams/utility/timestamp.png" alt="Diagrama de canicas del operador timestamp">

El operador timestamp proyecta cada valor emitido por el Observable fuente a un objeto de tipo `{ value: T, timestamp: R }`. Las propiedades están tipadas con genéricos. La propiedad value contiene el valor y el tipo del Observable fuete. El timestamp se genera con la función `now()` del Planificador.

Por defecto, se utiliza el planificador async, que retorna `Date.now()` (milisegundos transcurridos desde 01/01/1970 00:00:00:000) y por tanto, es de tipo number.

## Ejemplos

### Ejemplo de la documentación oficial

**En este ejemplo hay un timestamp adjuntado al evento click del documento**

```javascript
import { fromEvent } from "rxjs";
import { timestamp } from "rxjs/operators";

const clickWithTimestamp = fromEvent(document, "click").pipe(timestamp());

// Emite datos de tipo { value: MouseEvent, timestamp: number }
clickWithTimestamp.subscribe((data) => {
  console.log(data);
});
```

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/timestamp.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/timestamp">Documentación oficial en inglés</a>
