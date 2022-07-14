# first

## Emite el primer valor (o el primer valor que cumpla una condición) emitido por el Observable fuente

<details>

<summary>Signatura</summary>

#### Firma

`first<T, D>(predicate?: (value: T, index: number, source: Observable<T>) => boolean, defaultValue?: D): OperatorFunction<T, T | D>`

#### Parámetros

#### Retorna

`OperatorFunction<T, T | D>`: Un Observable del primer elemento que cumpla la condición especificada.

#### Lanza

`EmptyError`: Lanza un `EmptyError` si el Observable se completa sin emitir ninguna notificación `next`.

</details>

## Descripción

Emite únicamente el primer valor. O emite el primer valor que cumpla alguna condición.

![Diagrama de canicas del operador first](assets/images/marble-diagrams/filtering/first.png)

Si se llama sin ningún argumento, `first` emite el primer valor del Observable fuente y se completa. Si se llama con una función `predicate`, `first` emite el valor de la fuente que cumpla la condición especificada. También puede recibir un valor por defecto, que se emite en el caso de que la fuente se complete sin emitir ningún elemento válido. Lanza un error en el caso de que no se encuentre un elemento válido y no se haya proporcionado un `defaultValue` .

## Ejemplos

**Emitir la primera cadena de una secuencia**

[StackBlitz](https://stackblitz.com/edit/rxjs-first-1?file=index.ts)

```javascript
import { first } from "rxjs/operators";
import { from, fromEvent } from "rxjs";

const fruit$ = from(["Cereza", "Fresa", "Arándano"]);

fruit$.pipe(first()).subscribe(console.log);
// Salida: Cereza
```

**Emitir la primera tecla pulsada**

[StackBlitz](https://stackblitz.com/edit/rxjs-rxjs-first-2?file=index.ts)

```typescript
import { first, map } from "rxjs/operators";
import { fromEvent } from "rxjs";

const keyPressed$ = fromEvent<KeyboardEvent>(document, "keydown");

keyPressed$
  .pipe(
    first(),
    map(({ code }) => code)
  )
  .subscribe(console.log);
// Salida: KeyX
```

**Emitir el primer elemento que cumpla una condición**

[StackBlitz](https://stackblitz.com/edit/rxjs-first-3?file=index.ts)

```javascript
import { of } from "rxjs";
import { first } from "rxjs/operators";

const user$ = of(
  { name: "NyaGarcía", age: 23 },
  { name: "zaldih", age: 21 },
  { name: "caballerog", age: 35 }
);

user$.pipe(first(({ age }) => age === 21)).subscribe(console.log);
// Salida: { name: 'zaldih', age: 21 }
```

**Proporcionar un valor por defecto, que será emitido si ningún elemento cumple la condición**

[StackBlitz](https://stackblitz.com/edit/rxjs-first-4?file=index.ts)

```javascript
import { first } from "rxjs/operators";
import { from } from "rxjs";

const language$ = from([
  { name: "Ruby", type: "Multiparadigma" },
  { name: "Haskell", type: "Funcional" },
  { name: "Rust", type: "Multiparadigma" },
]);

language$
  .pipe(
    first(({ type }) => type === "Orientado a objetos", {
      name: "Java",
      type: "Orientado a objetos",
    })
  )
  .subscribe(console.log);
// Salida: { name: "Java", type: "Orientado a objetos" }
```

### Ejemplos de la documentación oficial

**Emitir solo el primer click que ocurra en el DOM**

```javascript
import { fromEvent } from "rxjs";
import { first } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const result = clicks.pipe(first());
result.subscribe((x) => console.log(x));
```

**Emitir el primer click que ocurra en un DIV**

```javascript
import { fromEvent } from "rxjs";
import { first } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const result = clicks.pipe(first((ev) => ev.target.tagName === "DIV"));
result.subscribe((x) => console.log(x));
```

<details>

<summary>Sobrecargas</summary>

#### Firma

`first(predicate?: null, defaultValue?: D): OperatorFunction<T, T | D>`

#### Parameters

#### Retorna

`OperatorFunction<T, T | D>`

#### Firma

`first(predicate: (value: T, index: number, source: Observable<T>) => value is S, defaultValue?: S): OperatorFunction<T, S>`

#### Parameters

#### Retorna

`OperatorFunction<T, S>`

#### Firma

`first(predicate: (value: T, index: number, source: Observable<T>) => boolean, defaultValue?: D): OperatorFunction<T, T | D>`

#### Parameters

#### Retorna

`OperatorFunction<T, T | D>`

</details>

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/first.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/operators/first)
