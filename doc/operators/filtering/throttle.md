---
description: >-
  Emite un valor del Observable fuente e ignora las emisiones siguientes durante
  un tiempo determinado por un segundo Observable. Después, repite el proceso
---

# throttle

<details>

<summary>Signatura</summary>

#### Firma

`throttle<T>(durationSelector: (value: T) => SubscribableOrPromise<any>, config: ThrottleConfig = defaultThrottleConfig): MonoTypeOperatorFunction<T>`

#### Parámetros

#### Retorna

`MonoTypeOperatorFunction<T>`: Un Observable que lleva a cabo la acción reguladora para limitar la velocidad de emisión de la fuente.

</details>

## Descripción

Es como `throttleTime`, pero la duración del silenciamiento está determinada por un segundo Observable.

![Diagrama de canicas del operador throttle](assets/images/marble-diagrams/filtering/throttle.png)

`throttle` emite los valores del Observable fuente mientras su temporizador interno esté deshabilitado, e ignora dichos valores mientras el temporizador esté habilitado. Inicialmente, el temporizador está deshabilitado. En cuanto se reciba el primer valor de la fuente, esta se reenvía al Observable resultante y se habilita el temporizador mediante una llamada a la función `durationSelector` con el valor emitido por la fuente. Entonces, la función retorna el Observable de 'duración'. Cuando el Observable de duración emita un valor o se complete, el temporizador se deshabilita, y se repite el proceso para la siguiente emisión del Observable fuente.

## Ejemplos

**Emitir la tecla pulsada, ignorar todos los valores siguientes durante 2 segundos, y repetir**

[StackBlitz](https://stackblitz.com/edit/rxjs-throttle-2?file=index.ts)

```typescript
import { throttle } from "rxjs/operators";
import { fromEvent, interval } from "rxjs";

const key$ = fromEvent<KeyboardEvent>(document, "keydown");

key$
  .pipe(throttle(() => interval(2000)))
  .subscribe(({ code }) => console.log(code));
// Salida: KeyX (2s) KeyO...
```

**Emitir un valor, ignorar todos los valores durante 2 segundos, y repetir**

[StackBlitz](https://stackblitz.com/edit/rxjs-throttle-3?file=index.ts)

```javascript
import { map, throttle } from "rxjs/operators";
import { interval, zip, from } from "rxjs";

// El Observable language$ emite un lenguaje cada segundo
const language$ = zip(
  from(["JavaScript", "TypeScript", "Java", "C#", "Go", "Ruby"]),
  interval(1000)
).pipe(map(([language]) => language));

language$.pipe(throttle(() => interval(2000))).subscribe(console.log);
// Salida: JavaScript, C#
```

### Ejemplo de la documentación oficial

**Emitir como mucho un click por segundo**

```javascript
import { fromEvent } from "rxjs";
import { throttle } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const result = clicks.pipe(throttle((ev) => interval(1000)));
result.subscribe((x) => console.log(x));
```

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/throttle.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/operators/throttle)
