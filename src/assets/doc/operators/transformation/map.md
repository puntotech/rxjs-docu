# map

<h2 class="subtitle"> Aplica una función de proyección a cada valor emitido por el Observable fuente, y emite los valores resultantes como un Observable
</h2>

<details>
<summary>Signatura</summary>

### Firma

`map<T, R>(project: (value: T, index: number) => R, thisArg?: any): OperatorFunction<T, R>`

### Parámetros

<table>
<tr><td>project</td><td>La función que se aplica a cada valor emitido por el Observable fuente. El parámetro `index` es el número `i` para la `i`ésima emisión que haya ocurrido desde la suscripción, comenzando por el número 0.</td></tr>
<tr><td>thisArg</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Un argumento opcional para definir el valor del <code>this</code> en la función de proyección.</td></tr>
</table>

### Retorna

`OperatorFunction<T, R>`: Un Observable que emite los valores del Observable fuente transformados por la función de proyección.

</details>

## Descripción

Al igual que `Array.prototype.map()`, aplica una función de transformación a cada uno de los valores emitidos por la fuente, para obtener los valores de salida correspondientes.

<img src="assets/images/marble-diagrams/transformation/map.png" alt="Diagrama de canicas del operador map">

Al igual que la función `Array.prototype.map`, este operador aplica una función de proyección a cada valor y emite dicha proyección en el Observable resultante.

## Ejemplos

**Multiplicar cada número por 2**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-map-1?file=index.ts">StackBlitz</a>

```javascript
import { map } from "rxjs/operators";
import { fromEvent, range } from "rxjs";

const number$ = range(1, 5);

number$.pipe(map((number) => number * 2)).subscribe(console.log);
// Salida: 2, 4, 6, 8, 10
```

**Emitir la propiedad code de cada objeto KeyboardEvent**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-map-2?file=index.ts">StackBlitz</a>

```typescript
import { map } from "rxjs/operators";
import { fromEvent } from "rxjs";

const key$ = fromEvent<KeyboardEvent>(document, "keydown");

key$.pipe(map(({ code }) => code)).subscribe(console.log);
// Salida: KeyX, KeyO...
```

### Ejemplos de la documentación oficial

**Proyecta cada click a la posición clientX de dicho click**

```javascript
import { fromEvent } from "rxjs";
import { map } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const positions = clicks.pipe(map((ev) => ev.clientX));
positions.subscribe((x) => console.log(x));
```

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/map.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/map">Documentación oficial en inglés</a>
