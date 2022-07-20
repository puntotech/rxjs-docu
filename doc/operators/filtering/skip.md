---
description: >-
  Retorna un Observable que se salta las primeras x emisiones del Observable
  fuente
---

# skip

<details>

<summary>Signatura</summary>

#### Firma

`skip<T>(count: number): MonoTypeOperatorFunction<T>`

#### Parámetros

#### Retorna

`MonoTypeOperatorFunction<T>`: Un Observable que se salta valores emitidos por el Observable fuente.

</details>

## Descripción

`skip` se salta un número determinado por el parámetro `count` de emisiones del Observable fuente, y después continúa emitiendo valores normalmente.

![Diagrama de canicas del operador skip](assets/images/marble-diagrams/filtering/skip.png)

## Ejemplos

**Ignorar los primeros 5 clicks**

[StackBlitz](https://stackblitz.com/edit/rxjs-skip-1?file=index.ts)

```javascript
import { skip } from "rxjs/operators";
import { from, fromEvent } from "rxjs";

const click$ = fromEvent(document, "click");

click$.pipe(skip(5)).subscribe(console.log);
// Salida: ......... ClickEvent {}...
```

**Ignorar el primer elemento**

[StackBlitz](https://stackblitz.com/edit/rxjs-skip-2?file=index.ts)

```javascript
import { skip } from "rxjs/operators";
import { from } from "rxjs";

const language$ = from([
  { name: "Java", type: "Orientado a objetos" },
  { name: "Ruby", type: "Multiparadigma" },
  { name: "Haskell", type: "Funcional" },
]);

language$.pipe(skip(1)).subscribe(console.log);
// Salida: { name: "Ruby", type: "Multiparadigma" }, { name: "Haskell", type: "Funcional" }
```

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/skip.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/operators/skip)
