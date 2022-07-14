# find

## Emite únicamente el primer elemento emitido por el Observable fuente que cumpla una condición

💡 Si se quiere obtener el primer elemento emitido, sin que cumpla ninguna operación, se puede usar el operador [first](../../../operators/filtering/first/)

<details>

<summary>Signatura</summary>

#### Firma

`find<T>(predicate: (value: T, index: number, source: Observable<T>) => boolean, thisArg?: any): OperatorFunction<T, T | undefined>`

#### Parámetros

Opcional. El valor por defecto es `undefined`. Un argumento opcional para determinar el valor del `this` en la función `predicate`.

#### Retorna

`OperatorFunction<T, T | undefined>`: Un Observable del primer elemento que cumpla la condición.

</details>

## Descripción

Encuentra el primer valor que cumple una condición y lo emite.

![Diagrama de canicas del operador find](assets/images/marble-diagrams/conditional-boolean/find.png)

`find` busca el primer elemento del Observable fuente que cumpla la condición especificada en la función `predicate` y retorna la primera ocurrencia que exista en la fuente. Al contrario que el operador `first`, la función `predicate` es obligatoria, y no se emite un error si no se encuentra un valor válido.

## Ejemplos

**Emite la primera vez que se presiona la tecla X, y se completa el flujo**

[StackBlitz](https://stackblitz.com/edit/docu-rxjs-find?file=index.ts)

```typescript
import { find } from "rxjs/operators";
import { fromEvent } from "rxjs";

const key$ = fromEvent<KeyboardEvent>(document, "keydown");

key$.pipe(find(({ code }) => code === "KeyX")).subscribe(console.log);
// Salida: KeyboardEvent {}
```

**Emitir el primer lenguaje de tipo Multiparadigma**

Aunque haya más de un lenguaje de tipo multiparadigma, find emite únicamente el primero que encuentra.

[StackBlitz](https://stackblitz.com/edit/docu-rxjs-find-2?file=index.ts)

```javascript
import { find } from "rxjs/operators";
import { from } from "rxjs";

const language$ = from([
  { name: "Java", type: "Orientado a objetos" },
  { name: "Ruby", type: "Multiparadigma" },
  { name: "Haskell", type: "Funcional" },
  { name: "Rust", type: "Multiparadigma" },
]);

language$
  .pipe(find(({ type }) => type === "Multiparadigma"))
  .subscribe(console.log);
// Salida: { name: "Ruby", type: "Multiparadigma" }
```

**Si ningún elemento cumple la condición, se emite undefined**

[StackBlitz](https://stackblitz.com/edit/docu-rxjs-find-3?file=index.ts)

```javascript
import { find } from "rxjs/operators";
import { from } from "rxjs";

const user$ = from([
  { name: "Nya", language: "TS" },
  { name: "Juan", language: "JS" },
  { name: "Carlos", language: "Java" },
]);

user$
  .pipe(find(({ language }) => language === "PHP"))
  .subscribe(console.log, console.error, () =>
    console.log("¡Flujo completado!")
  );
// Salida: undefined, ¡Flujo completado!
```

### Ejemplo de la documentación oficial

**Encuentra y emite el primer click que ocurra en un elemento DIV**

```javascript
import { fromEvent } from "rxjs";
import { find } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const result = clicks.pipe(find((ev) => ev.target.tagName === "DIV"));
result.subscribe((x) => console.log(x));
```

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/find.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/operators/find)
