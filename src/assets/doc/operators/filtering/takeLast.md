# takeLast

<h2 class="subtitle"> Emite las últimas x emisiones del Observable fuente
</h2>

<details>
<summary>Signatura</summary>

### Firma

`takeLast<T>(count: number): MonoTypeOperatorFunction<T>`

### Parámetros

<table>
<tr><td>count</td><td>El máximo número de valores que se emitirán del final de la secuencia de emisiones del Observable fuente.</td></tr>
</table>

### Retorna

`MonoTypeOperatorFunction<T>`: Un Observable que emite las últimas `count` emisiones del Observable fuente.

### Lanza

`ArgumentOutOfRangeError` Al usar `takeLast(i)`, se lanza un Error `ArgumentOutOrRangeError` si `i < 0`.

</details>

## Descripción

Almacena los últimos `count` valores, y los emite cuando el Observable fuente se completa.

<img src="assets/images/marble-diagrams/filtering/takeLast.png" alt="Diagrama de canicas del operador takeLast">

`takeLast` retorna un Observable que emite los últimos `count` valores emitidos por el Observable fuente. Si la fuente emite menos de `count` valores, se emitirán todos. Este operador debe esperar a que el Observable fuente se complete para poder emitir los últimos `count` valores en el Observable resultante, ya que, de lo contrario, es imposible saber si el Observable fuente emitirá o no más valores. Por esta razón, todos los valores se emiten de forma síncrona, seguidos de la notificación `complete`.

## Ejemplos

**Emitir el último valor de un Observable**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-takelast-1?file=index.ts">StackBlitz</a>

```javascript
import { takeLast } from "rxjs/operators";
import { from } from "rxjs";

const language$ = from([
  { name: "Java", type: "Orientado a objetos" },
  { name: "Scala", type: "Multiparadigma" },
  { name: "Haskell", type: "Funcional" },
]);

language$.pipe(takeLast(1)).subscribe(console.log);
// Salida: { name: "Haskell", type: "Funcional" }
```

**Si el Observable fuente emite más de count valores, se emitirán todos**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-takelast-2?file=index.ts">StackBlitz</a>

```javascript
import { takeLast } from "rxjs/operators";
import { range } from "rxjs";

const range$ = range(0, 5);

range$
  .pipe(takeLast(10))
  .subscribe(console.log, console.error, () => console.log("Completado"));
// Salida: 0, 1, 2, 3, 4
```

**Si el Observable fuente no se completa, no se emitirá ningún valor**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-takelast-3?file=index.ts">StackBlitz</a>

```javascript
import { takeLast } from "rxjs/operators";
import { interval } from "rxjs";

const number$ = interval(1000);

number$
  .pipe(takeLast(5))
  .subscribe(console.log, console.error, () => console.log("Complete"));
// Salida:
```

### Ejemplo de la documentación oficial

**Emite los últimos 3 valores de un Observable**

```javascript
import { range } from "rxjs";
import { takeLast } from "rxjs/operators";

const many = range(1, 100);
const lastThree = many.pipe(takeLast(3));
lastThree.subscribe((x) => console.log(x));
```

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/takeLast.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/takeLast">Documentación oficial en inglés</a>
