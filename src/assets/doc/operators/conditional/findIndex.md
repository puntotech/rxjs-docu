# findIndex

### Emite el índice del primer valor emitido por el Observable fuente que cumple una determinada condición

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

## Descripción

Es como `find`, pero emite el índice del valor encontrado, en lugar del propio valor.

<img src="assets/images/marble-diagrams/conditional-boolean/findIndex.png" alt="Diagrama de canicas del operador findIndex">

findIndex searches for the first item in the source Observable that matches the specified condition embodied by the predicate, and returns the (zero-based) index of the first occurrence in the source. Unlike first, the predicate is required in findIndex, and does not emit an error if a valid value is not found.

## Ejemplos

Emite el índice del primer Pokémon de tipo fuego

[StackBlitz](https://stackblitz.com/edit/rxjs-findindex-1?file=index.html)

```javascript
import { findIndex } from "rxjs/operators";
import { from } from "rxjs";

const pokemon$ = from([
  { name: "Squirtle", type: "Water" },
  { name: "Charmander", type: "Fire" },
  { name: "Bulbasaur", type: "Grass" },
  { name: "Cyndaquil", type: "Fire" },
]);

pokemon$.pipe(findIndex(({ type }) => type === "Fire")).subscribe(console.log);
// Salida: 1
```

Emite el índice de la primera vez que se pulse la tecla x

[StackBlitz](https://stackblitz.com/edit/rxjs-findindex-2?file=index.ts)

```javascript
import { findIndex, map } from "rxjs/operators";
import { fromEvent } from "rxjs";

const key$ = fromEvent < KeyboardEvent > (document, "keydown");

key$
  .pipe(
    map(({ code }) => code),
    findIndex((code) => code === "KeyX")
  )
  .subscribe(console.log);
// Salida: (Tecla n) (Tecla f) (Tecla x) 2
```

### Ejemplo de la documentación oficial

Emite el índice del primer click que ocurre en un elemento DIV

[StackBlitz](https://stackblitz.com/run?devtoolsheight=50)

```javascript
import { fromEvent } from "rxjs";
import { findIndex } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const result = clicks.pipe(findIndex((ev) => ev.target.tagName === "DIV"));
result.subscribe((x) => console.log(x));
```

- [Documentación oficial en inglés](https://rxjs-dev.firebaseapp.com/api/operators/findIndex)
- [Código fuente](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/findIndex.ts)
