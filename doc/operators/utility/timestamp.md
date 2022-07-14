# timestamp

## Adjunta un timestamp a cada elemento emitido por el Observable, indicando el momento en el que fue emitido

<details>

<summary>Signatura</summary>

#### Firma

`timestamp<T>(scheduler: SchedulerLike = async): OperatorFunction<T, Timestamp<T>>`

#### Parámetros

### Retorna

`OperatorFunction<T, Timestamp<T>>:`

</details>

## Descripción

Adjunta un timestamp a cada elemento emitido por el Observable, que indica el momento en el que dicho valor fue emitido.

![Diagrama de canicas del operador timestamp](assets/images/marble-diagrams/utility/timestamp.png)

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

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/timestamp.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/operators/timestamp)
