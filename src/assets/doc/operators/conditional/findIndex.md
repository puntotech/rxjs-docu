# findIndex

<h2 class="subtitle"> Emite el índice del primer valor emitido por el Observable fuente que cumple una determinada condición
</h2>

<details>
<summary>Signatura</summary>

### Firma

`findIndex<T>(predicate: (value: T, index: number, source: Observable<T>) => boolean, thisArg?: any): OperatorFunction<T, number>`

### Parámetros

<table>
<tr><td>predicate</td><td>Una función llamada con cada elemento para comprobar si se cumple o no la condición.</td></tr>
<tr><td>thisArg</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Un argumento opcional para determinar el valor del <code>this</code> en la función <code>predicate</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, number>`: Un Observable del índice del primer elemento que cumpla la condición.

</details>

## Descripción

Es como [find](/operators/conditional/find), pero emite el índice del valor encontrado, en lugar del propio valor.

<img src="assets/images/marble-diagrams/conditional-boolean/findIndex.png" alt="Diagrama de canicas del operador findIndex">

findIndex busca el primer elemento del Observable fuente que cumpla la condición especificada en el predicado y retorna su índice (de base cero.) Al contrario que [first](/operators/filtering/first), el predicado es obligatorio en findIndex, y tampoco emite un error si no encuentra un valor válido.

## Ejemplos

**Emitir el índice del primer lenguaje de tipo Multiparadigma**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-findindex-1?file=index.ts">StackBlitz</a>

```javascript
import { findIndex } from "rxjs/operators";
import { from } from "rxjs";

const language$ = from([
  { name: "Java", type: "Orientado a objetos" },
  { name: "Ruby", type: "Multiparadigma" },
  { name: "Haskell", type: "Funcional" },
  { name: "Rust", type: "Multiparadigma" },
]);

language$
  .pipe(findIndex(({ type }) => type === "Multiparadigma"))
  .subscribe(console.log);
// Salida: 1
```

**Emite el índice de la primera vez que se pulse la tecla x**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-findindex-2?file=index.ts">StackBlitz</a>

```typescript
import { findIndex, map } from "rxjs/operators";
import { fromEvent } from "rxjs";

const key$ = fromEvent<KeyboardEvent>(document, "keydown");

key$
  .pipe(
    map(({ code }) => code),
    findIndex((code) => code === "KeyX")
  )
  .subscribe(console.log);
// Salida: (Pulsar tecla n) (Pulsar tecla f) (Pulsar tecla x) 2
```

### Ejemplo de la documentación oficial

**Emite el índice del primer click que ocurre en un elemento DIV**

```javascript
import { fromEvent } from "rxjs";
import { findIndex } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const result = clicks.pipe(findIndex((ev) => ev.target.tagName === "DIV"));
result.subscribe((x) => console.log(x));
```

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/findIndex.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/findIndex">Documentación oficial en inglés</a>
