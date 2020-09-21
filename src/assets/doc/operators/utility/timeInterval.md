# timeInterval

### Convierte un Observable que emite elementos en uno que emite indicaciones de la cantidad de tiempo transcurrida entre emisiones

### Firma

`timeInterval<T>(scheduler: SchedulerLike = async): OperatorFunction<T, TimeInterval<T>>`

### Parámetros

<table>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>async</code>.
El planificador utilizado para obtener el tiempo.</td></tr>
</table>

### Retorna

`OperatorFunction<T, TimeInterval<T>>`: Un Observable que emite información sobre el valor y el intervalo.

### Descripción

Emite un objeto que contiene el valor actual y el tiempo transcurrido entre la emisión del valor actual y el valor anterior, que se calcula utilizando el método `now()` del planificador que se haya proporcionado para obtener el momento exacto de cada emisión, y después calculando la diferencia. Dado que el planificador es `async` por defecto, el intervalo estará en milisegundos.

## Ejemplos

Emitir el valor de la tecla pulsada, además del tiempo transcurrido desde la última tecla presionada

[StackBlitz](https://stackblitz.com/edit/rxjs-timeinterval-1?file=index.html)

```javascript
import { timeInterval } from "rxjs/operators";
import { fromEvent } from "rxjs";

const key$ = fromEvent < KeyboardEvent > (document, "keydown");

key$
  .pipe(timeInterval())
  .subscribe(({ value, interval }) =>
    console.log(
      `${value.code}: ${interval}ms han pasado desde la última tecla pulsada`
    )
  );
/* Salida: 
(2s) (Presionar tecla) KeyR: 2000ms han pasado desde la última tecla pulsada
(4s) (Presionar tecla) KeyX: 4000ms han pasado desde la última tecla pulsada
*/
```

### Ejemplo de la documentación oficial

Emitir el intervalo de tiempo transcurrido entre la emisión del valor actual y del valor anterior

```javascript
const seconds = interval(1000);

seconds.pipe(timeInterval()).subscribe(
  (value) => console.log(value),
  (err) => console.log(err)
);

seconds.pipe(timeout(900)).subscribe(
  (value) => console.log(value),
  (err) => console.log(err)
);

// NOTE: The values will never be this precise,
// intervals created with `interval` or `setInterval`
// are non-deterministic.

// {value: 0, interval: 1000}
// {value: 1, interval: 1000}
// {value: 2, interval: 1000}
```

- [Documentación oficial en inglés](https://rxjs-dev.firebaseapp.com/api/operators/timeInterval)
- [Código fuente](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/timeInterval.ts)
