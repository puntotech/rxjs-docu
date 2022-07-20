---
description: >-
  Emite un valor del Observable fuente si, y solo si, pasa un periodo de tiempo
  determinado sin que este emita ningún valor
---

# debounceTime

<details>

<summary>Signatura</summary>

#### Firma

`debounceTime<T>(dueTime: number, scheduler: SchedulerLike = async): MonoTypeOperatorFunction<T>`

#### Parámetros

#### Retorna

`MonoTypeOperatorFunction<T>`: Un Observable que retrasa la emisiones del Observable fuente en un periodo de tiempo especificado por `dueTime`. Es posible que algunos valores sean eliminados si se emiten con demasiada frecuencia.

</details>

## Descripción

Es como `delay`, pero emite únicamente el valor más reciente de una sucesión de emisiones.

![Diagrama de canicas del operador debounceTime](assets/images/marble-diagrams/filtering/debounce.png)

`debounceTime` retrasa los valores del Observable fuente, eliminando las emisiones almacenadas pendientes de ser emitidas si el Observable fuente emite algún valor. Este operador almacena el valor más reciente del Observable fuente, y lo emite solo si ha pasado un periodo de tiempo, indicado por `dueTime`, sin que el Observable fuente emita ningún valor. Si el Observable fuente emite un valor antes de que pase el periodo de tiempo `dueTime`, el valor almacenado será eliminado, y nunca se emitirá en el Observable resultante.

Este es un operador de limitación de emisiones, ya que es imposible que se emita más de un valor en cualquiera de las ventanas de tiempo de duración `dueTime`, pero también es un operador similar a `delay`, ya que las emisiones de salida no ocurren en el mismo momento en el que se emitieron en el Observable fuente.

Recibe un `SchedulerLike` opcional para manejar los temporizadores.

## Ejemplos

**Emitir la tecla pulsada más reciente, tras una sucesión rápida de teclas. Por ejemplo, si escribimos 'RxJS mola' muy rápidamente (con menos de 500ms entre pulsaciones), solo se emitirá la última letra (a)**

[StackBlitz](https://stackblitz.com/edit/rxjs-debouncetime-1?file=index.ts)

```typescript
import { debounceTime } from "rxjs/operators";
import { fromEvent } from "rxjs";

const key$ = fromEvent<KeyboardEvent>(document, "keydown");

key$.pipe(debounceTime(500)).subscribe(({ code }) => console.log(code));
// Salida: KeyE
```

**Emitir la posición del último click tras una sucesión rápida de clicks**

[StackBlitz](https://stackblitz.com/edit/rxjs-debouncetime-2?file=index.ts)

```typescript
import { debounceTime } from "rxjs/operators";
import { fromEvent } from "rxjs";

const click$ = fromEvent<MouseEvent>(document, "click");

click$
  .pipe(debounceTime(1000))
  .subscribe(({ screenX, screenY }) =>
    console.log(
      `Tu último click fue en la posición x: ${screenX}, y: ${screenY}`
    )
  );
// Salida: Tu último click fue en la posición x: 1278 , y: 265
```

### Ejemplo de la documentación oficial

**Emite el click más reciente tras una sucesión de clicks**

```javascript
import { fromEvent } from "rxjs";
import { debounceTime } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const result = clicks.pipe(debounceTime(1000));
result.subscribe((x) => console.log(x));
```

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/debounceTime.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/operators/debounceTime)
