# defaultIfEmpty

<h2 class="subtitle"> Emite el valor proporcionado si el Observable fuente se completa sin emitir ningún valor. Si no, refleja al Observable fuente
</h2>

<details>
<summary>Signatura</summary>

### Firma

`defaultIfEmpty<T, R>(defaultValue: R = null): OperatorFunction<T, T | R>`

### Parámetros

<table>
<tr><td>defaultValue</td><td>Opcional. El valor por defecto es <code>null</code>.
El valor por defecto utilizado en el caso de que el Observable esté vacío.</td></tr>
</table>

### Retorna

`OperatorFunction<T, T | R>`: Un Observable que puede emitir el valor por defecto especificado si el Observable fuente no emite ningún valor, o los valores emitidos por el Observable fuente.

</details>

## Descripción

Si el Observable fuente está vacío, este operador emitirá un valor por defecto.

<img src="assets/images/marble-diagrams/conditional-boolean/defaultIfEmpty.png" alt="Diagrama de canicas del operador defaultIfEmpty">

`defaultIfEmpty` emite los valores emitidos por el Observable fuente o un valor por defecto en el caso de que el Observable fuente esté vacío (se completa sin haber emitido ningún valor `next`.)

## Ejemplos

**Como el Observable está vacío, se emitirá el valor por defecto**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-defaultifempty-1?file=index.ts">StackBlitz</a>

```javascript
import { defaultIfEmpty } from "rxjs/operators";
import { EMPTY } from "rxjs";

const empty$ = EMPTY;

empty$.pipe(defaultIfEmpty("La respuesta es 42")).subscribe(console.log);
// Salida: La respuesta es 42
```

**Si no se presiona ninguna tecla en 4 segundos, se emitirá el valor de la tecla por defecto**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-defaultifempty-2?file=index.ts">StackBlitz</a>

```typescript
import { defaultIfEmpty, map, takeUntil } from "rxjs/operators";
import { fromEvent, timer } from "rxjs";

const defaultKey = "Space";

const key$ = fromEvent<KeyboardEvent>(document, "keydown").pipe(
  map(({ code }) => code),
  takeUntil(timer(4000))
);

key$.pipe(defaultIfEmpty(defaultKey)).subscribe(console.log);
// Salida: (4s) Space
```

### Ejemplo de la documentación oficial

**Si en 5 segundos no se hace ningún click, se emitirá el mensaje "Ningún click"**

```javascript
import { fromEvent } from "rxjs";
import { defaultIfEmpty, takeUntil } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const clicksBeforeFive = clicks.pipe(takeUntil(interval(5000)));
const result = clicksBeforeFive.pipe(defaultIfEmpty("Ningún click"));
result.subscribe((x) => console.log(x));
```

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/defaultIfEmpty.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/defaultIfEmpty">Documentación oficial en inglés</a>
