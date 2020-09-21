# sample

### Emite la emisión más reciente del Observable fuente cuando un segundo Observable, el notificador, emite

### Firma

`sample<T>(notifier: Observable<any>): MonoTypeOperatorFunction<T>`

### Parámetros

<table>
<tr><td>notifier</td><td>El Observable que indica cuándo emitir el valor más reciente del Observable fuente.</td></tr>
</table>

### Retorna

`MonoTypeOperatorFunction<T>`: Un Observable que emite el valor más reciente del Observable fuente cuando el Observable `notifier` emite un valor o se completa.

## Descripción

Es como `sampleTime`, pero toma una muestra del Observable fuente cuando el Observable notificador emite un valor.

<img src="assets/images/marble-diagrams/filtering/sample.png" alt="Diagrama de canicas del operador sample">

Cuando el Observable `notifier` emite un valor o se completa, `sample` toma una muestra del Observable fuente y emite la emisión más reciente desde el último muestreo, a no ser que la fuente no haya emitido nada desde el último muestreo. En cuanto se lleve a cabo la suscripción al Observable resultante, también se realizará la del Observable `notifier`.

## Ejemplos

Emitir el valor más reciente desde el último muestreo, realizado cuando `interval` emite (cada 2s)

[StackBlitz](https://stackblitz.com/edit/rxjs-sample-1?file=index.html)

```javascript
import { interval } from "rxjs";
import { sample } from "rxjs/operators";

const number$ = interval(1000);

number$.pipe(sample(interval(2000))).subscribe(console.log);
// Salida: 1, 3, 5, 7, 9...
```

Emitir el valor más reciente desde el último muestreo, realizado cada vez que se pulsa una tecla

[StackBlitz](https://stackblitz.com/edit/rxjs-sample-2?file=index.ts)

```typescript
import { fromEvent, interval } from "rxjs";
import { sample } from "rxjs/operators";

const number$ = interval(1000);
const key$ = fromEvent<KeyboardEvent>(document, "keydown");

number$
  .pipe(sample(key$))
  .subscribe((n) =>
    console.log(`El último valor emitido tras la última tecla pulsada es: ${n}`)
  );
// Salida: El último valor emitido tras la última tecla pulsada es: n
```

### Ejemplo de la documentación oficial

Con cada click, realizar un muestreo del temporizador `seconds`

```javascript
import { fromEvent, interval } from "rxjs";
import { sample } from "rxjs/operators";

const seconds = interval(1000);
const clicks = fromEvent(document, "click");
const result = seconds.pipe(sample(clicks));
result.subscribe((x) => console.log(x));
```

- [Documentación oficial en inglés](https://rxjs-dev.firebaseapp.com/api/operators/sample)
- [Código fuente](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/sample.ts)
