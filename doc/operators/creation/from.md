---
description: >-
  Crea un Observable a partir de un Array, un objeto similar a un Array, una
  Promesa, un objeto iterable o un objeto similar a un Observable
---

# from

<details>

<summary>Signatura</summary>

#### Firma

`from<T>(input: any, scheduler?: SchedulerLike): Observable<T>`

#### Parámetros

#### Retorna

`Observable<T>`: Un Observable que emite los argumentos descritos anteriormente y se completa.

</details>

## Descripción

Convierte prácticamente cualquier elemento en un Observable.

![Diagrama de canicas de from](assets/images/marble-diagrams/creation/from.png)

`from` convierte varios tipos de datos u objetos en Observables. También puede convertir una Promesa, un objeto similar a un Array o un objeto iterable en un Observable que emite los elementos de dicha Promesa, Array o iterable. Un String, en este contexto, se interpreta como un array de caracteres. Los objetos similares a Observables (contienen una función nombrada con el Símbolo ES2015 que corresponde a Observable) también se puede transformar mediante este operador.

## Ejemplos

**Crear un Observable a partir de una cadena**

[StackBlitz](https://stackblitz.com/edit/docu-rxjs-from?file=index.ts)

```javascript
import { from } from "rxjs";

const letter$ = from("RxJS mola");

letter$.subscribe(console.log);
// Salida: 'R', 'x', 'J', 'S', ' ', 'm', 'o', 'l', 'a'
```

**Crear un Observable a partir de un Array de cadenas**

[StackBlitz](https://stackblitz.com/edit/docu-rxjs-from-2?file=index.ts)

```javascript
import { from } from "rxjs";

const fruit$ = from(["Fresa", "Cereza", "Mora"]);

fruit$.subscribe((fruit) => console.log(fruit));
// Salida: Fresa, Cereza, Mora
```

**Crear un Observable a partir de un Map**

[StackBlitz](https://stackblitz.com/edit/docu-rxjs-from-3?file=index.ts)

```javascript
import { from } from "rxjs";

const language$ = from(
  new Map([
    ["Java", "Orientado a objetos"],
    ["Ruby", "Multiparadigma"],
    ["Haskell", "Funcional"],
  ])
);

language$.subscribe(console.log);
// Salida: ["Java", "Orientado a objetos"], ["Ruby", "Multiparadigma"], ["Haskell", "Funcional"]
```

**Crear un Observable a partir de una promesa**

[StackBlitz](https://stackblitz.com/edit/docu-rxjs-from-4?file=index.ts)

```javascript
import { from } from "rxjs";

const promise$ = from(Promise.resolve("Prometo empezar a aprender RxJS"));

promise$.subscribe(console.log);
// Salida: 'Prometo empezar a aprender RxJS'
```

**Crear un Observable a partir de un NodeList**

[StackBlitz](https://stackblitz.com/edit/docu-rxjs-from-5?file=index.ts)

```javascript
import { from } from "rxjs";

const node$ = from(document.querySelectorAll("p"));

node$.subscribe((node) => console.log(node));
// Salida: HTMLParagraphElement {tagName: "p", attributes: {...}}
```

### Ejemplos de la documentación oficial

**Convertir un array a un Observable**

```javascript
import { from } from "rxjs";

const array = [10, 20, 30];
const result = from(array);

result.subscribe((x) => console.log(x));

// Salida:
// 10
// 20
// 30
```

**Convertir un iterable infinito (a partir de un generador) en un Observable**

```javascript
import { from } from "rxjs";
import { take } from "rxjs/operators";

function* generateDoubles(seed) {
  let i = seed;
  while (true) {
    yield i;
    i = 2 * i; // dóblalo
  }
}

const iterator = generateDoubles(3);
const result = from(iterator).pipe(take(10));

result.subscribe((x) => console.log(x));

// Salida:
// 3
// 6
// 12
// 24
// 48
// 96
// 192
// 384
// 768
// 1536
```

**Con el planificador asyncScheduler**

```javascript
import { from, asyncScheduler } from "rxjs";

console.log("Comienzo");

const array = [10, 20, 30];
const result = from(array, asyncScheduler);

result.subscribe((x) => console.log(x));

console.log("Fin");

// Salida:
// Comienzo
// Fin
// 10
// 20
// 30
```

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/from.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/index/function/from)
