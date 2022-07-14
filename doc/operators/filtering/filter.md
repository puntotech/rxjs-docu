# filter

## Filtra elementos emitidos por el Observable fuente, emitiendo únicamente aquellos que cumplan una condición

<details>

<summary>Signatura</summary>

#### Firma

`filter<T>(predicate: (value: T, index: number) => boolean, thisArg?: any): MonoTypeOperatorFunction<T>`

#### Parámetros

#### Retorna

`MonoTypeOperatorFunction<T>`: Un Observable de valores del Observable fuente que han cumpliado la condición especificada por la función `predicate`.

</details>

## Descripción

Al igual que `Array.prototype.filter()`, solo emite un valor si cumple una condición determinada.

![Diagrama de canicas del operador filter](assets/images/marble-diagrams/filtering/filter.png)

Es similar al método `Array.prototype.filter()`. Este operador emite únicamente aquellos valores del Observable fuente que cumplan la condición especificada en la función `predicate`, es decir, aquellos valores que, al proporcionárselos a la función, hagan que esta devuelva `true`.

## Ejemplos

**Emitir los números mayores que 5**

[StackBlitz](https://stackblitz.com/edit/rxjs-filter-1?file=index.ts)

```javascript
import { filter } from "rxjs/operators";
import { range } from "rxjs";

const number$ = range(1, 10);

number$.pipe(filter((n) => n > 5)).subscribe(console.log);
// Salida: 6, 7, 8, 9, 10
```

**Emitir todas las teclas, excepto la barra espaciadora**

[StackBlitz](https://stackblitz.com/edit/rxjs-filter-2?file=index.ts)

```typescript
import { filter, map } from "rxjs/operators";
import { fromEvent } from "rxjs";

const key$ = fromEvent<KeyboardEvent>(document, "keydown");

key$
  .pipe(
    map(({ code }) => code),
    filter((code) => code !== "Space")
  )
  .subscribe(console.log);
// Salida: KeyX, KeyO...
```

**Filtrar los lenguages de tipo Multiparadigma**

[StackBlitz](https://stackblitz.com/edit/rxjs-filter-3?file=index.ts)

```javascript
import { filter } from "rxjs/operators";
import { from } from "rxjs";

const language$ = from([
  { name: "Java", type: "Orientado a objetos" },
  { name: "Ruby", type: "Multiparadigma" },
  { name: "Haskell", type: "Funcional" },
  { name: "Rust", type: "Multiparadigma" },
]);

language$
  .pipe(filter(({ type }) => type !== "Multiparadigma"))
  .subscribe(console.log);
/* Salida: 
{ name: "Java", type: "Orientado a objetos" },
{ name: "Haskell", type: "Funcional" }
*/
```

### Ejemplos de la documentación oficial

**Emite solo los eventos click cuyo target sea un elemento DIV**

```javascript
import { fromEvent } from "rxjs";
import { filter } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const clicksOnDivs = clicks.pipe(filter((ev) => ev.target.tagName === "DIV"));
clicksOnDivs.subscribe((x) => console.log(x));
```

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/filter.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/operators/filter)
