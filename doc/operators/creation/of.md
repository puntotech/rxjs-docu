---
description: Convierte los argumentos en una secuencia Observable
---

# of

<details>

<summary>Signatura</summary>

#### Firma

`of(...args: (SchedulerLike | T)[]): Observable`

#### Parámetros

#### Retorna

`Observable<T>`: Un Observable que emite los argumentos descritos anteriormente y se completa.

</details>

## Descripción

Cada argumento se convierte en una notificación next.

![Diagrama de canicas de of](assets/images/marble-diagrams/creation/of.png)

Al contrario que [from](../../../operators/creation/from/), no se lleva a cabo ninguna aplanación y cada argumento al completo se emite como una notificación `next`.

## Ejemplos

**Emitir una secuencia de números**

[StackBlitz](https://stackblitz.com/edit/docu-rxjs-of?file=index.ts)

```javascript
import { of } from "rxjs";

const number$ = of(1, 2, 3, 4, 5);

number$.subscribe((number) => console.log(number));
// Salida: 1, 2, 3, 4, 5
```

**Emitir una secuencia de cadenas**

[StackBlitz](https://stackblitz.com/edit/docu-rxjs-of-2?file=index.ts)

```javascript
import { of } from "rxjs";

const framework$ = of("Angular", "React", "Vue");

framework$.subscribe(console.log);
// Salida: Angular, React, Vue
```

**Emitir una secuencia de arrays**

[StackBlitz](https://stackblitz.com/edit/docu-rxjs-of-3?file=index.ts)

```javascript
import { of } from "rxjs";

const fruit$ = of(["Fresa", "Cereza"], ["Limón", "Naranja"]);

fruit$.subscribe((fruit) => console.log(fruit));
// Salida: ["Fresa", "Cereza"] ["Limón", "Naranja"]
```

**Emitir una secuencia de objetos**

[StackBlitz](https://stackblitz.com/edit/docu-rxjs-of-4?file=index.ts)

```javascript
import { of } from "rxjs";

const iceCream$ = of(
  { size: "Grande", toppings: ["Galletas Oreo", "Sirope de Chocolate"] },
  { size: "Pequeño", toppings: ["Fresas"] }
);

iceCream$.subscribe(console.log);
// Salida: { size: "Grande", toppings: ["Galletas Oreo", "Sirope de Chocolate"] } { size: "Pequeño", toppings: ["Fresas"] }
```

### Ejemplos de la documentación oficial

**Emitir los valores 10, 20, 30**

```javascript
import { of } from "rxjs";

of(10, 20, 30).subscribe(
  (next) => console.log("next:", next),
  (err) => console.log("error:", err),
  () => console.log("Fin")
);
// Salida:
// 'next: 10'
// 'next: 20'
// 'next: 30'
// 'Fin'
```

**Emitir el array \[1,2,3]**

```javascript
import { of } from "rxjs";

of([1, 2, 3]).subscribe(
  (next) => console.log("next:", next),
  (err) => console.log("error:", err),
  () => console.log("Fin")
);
// Salida:
// 'next: [1,2,3]'
// 'Fin'
```

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/of.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/index/function/of)
