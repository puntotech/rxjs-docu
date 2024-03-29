---
description: Agrupa las emisiones consecutivas en pares y las emite en forma de array
---

# pairwise

<details>

<summary>Signatura</summary>

#### Firma

`pairwise<T>(): OperatorFunction<T, [T, T]>`

#### Parámetros

No recibe ningún parámetro.

#### Retorna

`OperatorFunction<T, [T, T]>`: Un Observable de pares (en forma de array) de valores consecutivos del Observable fuente.

</details>

## Descripción

Recoge el valor actual y el anterior en un array, y lo emite.

![Diagrama de canicas del operador pairwise](assets/images/marble-diagrams/transformation/pairwise.png)

La N-ésima emisión del Observable fuente hará que el Observable resultante emita un array \[(N-1)-ésimo, N-ésimo] del valor anterior y del actual. Por esta razón, \`pairwise++ emite a partir de la segunda emisión del Observable fuente, y no a partir de la primera emisión, ya que en ese caso no hay valor previo.

## Ejemplos

**Agrupar la cadena anterior y la actual en un array**

[StackBlitz](https://stackblitz.com/edit/rxjs-pairwise-1?file=index.ts)

```javascript
import { pairwise } from "rxjs/operators";
import { from } from "rxjs";

const framework$ = from(["Angular", "React", "Vue"]);

framework$.pipe(pairwise()).subscribe(console.log);
// Salida: ["Angular", "React"], ["React", "Vue"]
```

**Agrupar los códigos de las teclas pulsadas (a partir de la segunda) por parejas**

[StackBlitz](https://stackblitz.com/edit/rxjs-pairwise-2?file=index.ts)

```typescript
import { fromEvent } from "rxjs";
import { map, pairwise } from "rxjs/operators";

const key$ = fromEvent<KeyboardEvent>(document, "keydown").pipe(
  map(({ code }) => code)
);

key$.pipe(pairwise()).subscribe(console.log);
// Salida: ["KeyR", "KeyX"], ["KeyJ", "KeyS"]...
```

### Ejemplo de la documentación oficial

**En cada click (empezando a partir del segundo), emitir la distancia relativa al click anterior**

```javascript
import { fromEvent } from "rxjs";
import { pairwise, map } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const pairs = clicks.pipe(pairwise());
const distance = pairs.pipe(
  map((pair) => {
    const x0 = pair[0].clientX;
    const y0 = pair[0].clientY;
    const x1 = pair[1].clientX;
    const y1 = pair[1].clientY;
    return Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));
  })
);
distance.subscribe((x) => console.log(x));
```

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/pairwise.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/operators/pairwise)
