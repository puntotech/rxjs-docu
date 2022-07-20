---
description: >-
  Retorna un Observable que se salta los valores emitidos por el Observable
  fuente hasta que un segundo Observable emite un valor
---

# skipUntil

<details>

<summary>Signatura</summary>

#### Firma

`skipUntil<T>(notifier: Observable<any>): MonoTypeOperatorFunction<T>`

#### Parámetros

#### Retorna

`MonoTypeOperatorFunction<T>`: Un Observable que se salta elementos del Observable fuente hasta que el segundo Observable emite un valor. Entonces, comienza a emitir valores normalmente.

</details>

## Descripción

El operador `skipUntil` se salta las emisiones del Observable fuente hasta que el segundo Observable emita un valor. Esto puede ser especialmente útil para gestionar las interacciones del usuario, las respuestas de peticiones http o para esperar a que pasen periodos determinados de tiempo.

![Diagrama de canicas del operador skipUntil](assets/images/marble-diagrams/filtering/skipUntil.png)

Internamente, el operador `skipUntil` se suscribe al Observable recibido por parámetros (conocido como Observable notificador) para poder saber cuándo emite el primer valor. Cuando esto ocurra, el operador cancela la suscripcón al Observable notificador y comienza a emitir los valores del Observable fuente.

Si el Observable notificador se completa o lanza un error sin haber emitido ningún valor, los valores del Observable fuente nunca se emitirán.

## Ejemplos

**Saltar la secuencia de números hasta que se pulse la barra espaciadora**

[StackBlitz](https://stackblitz.com/edit/rxjs-skipuntil-1?file=index.ts)

```typescript
import { filter, map, skipUntil } from "rxjs/operators";
import { fromEvent, interval } from "rxjs";

const number$ = interval(1000);

const key$ = fromEvent<KeyboardEvent>(document, "keydown").pipe(
  map(({ code }) => code),
  filter((code) => code === "Space")
);

number$.pipe(skipUntil(key$)).subscribe(console.log);
// Salida: (4s) (Pulsar barra espaciadora) 4, 5, 6...
```

**Saltar la secuencia de números hasta que pasen 4 segundos**

[StackBlitz](https://stackblitz.com/edit/rxjs-skipuntil-2?file=index.ts)

```javascript
import { skipUntil } from "rxjs/operators";
import { timer, interval } from "rxjs";

const number$ = interval(1000);
const timer$ = timer(4000);

number$.pipe(skipUntil(timer$)).subscribe(console.log);
// Salida: 3, 4, 5, 6, 7, 8...
```

### Ejemplo de la documentación oficial

**Saltar las emisiones del Observable fuente hasta que el usuario haga click**

```javascript
import { interval, fromEvent } from "rxjs";
import { skipUntil } from "rxjs/operators";

const intervalObservable = interval(1000);
const click = fromEvent(document, "click");

const emitAfterClick = intervalObservable.pipe(skipUntil(click));
// Click a los 4.6s. Salida: 5...6...7...8........ o
// Click a los 7.3s. Salida: 8...9...10..11.......
const subscribe = emitAfterClick.subscribe((value) => console.log(value));
```

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/skipUntil.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/operators/skipUntil)
