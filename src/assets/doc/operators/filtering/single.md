# single

<h2 class="subtitle"> Emite si solo existe un único valor que cumpla la condición
</h2>

<details>
<summary>Signatura</summary>

### Firma

`single<T>(predicate?: (value: T, index: number, source: Observable<T>) => boolean): MonoTypeOperatorFunction<T>`

### Parámetros

<table>
<tr><td>predicate</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Una función para evaluar los elementos emitidos por el Observable fuente.</td></tr>
</table>

### Retorna

`MonoTypeOperatorFunction<T>`: Un Observable que puede emitir un único valor del Observable fuente que cumpla la condición, o `undefined` si ninguno la cumple.

### Lamza

`EmptyError` Lanza un `EmptyError` si el Observable se completa sin emitir ninguna notificación `next`.

</details>

## Descripción

Es como `first`, pero emite un error si hay más de un valor.

<img src="assets/images/marble-diagrams/filtering/single.png" alt="Diagrama de canicas del operador single">

Retorna un Observable que emite el único valor emitido por el Observable fuente que cumpla la condición especificada, en el caso de que exista dicho valor. Si el Observable fuente emite más de un elemento que cumpla la condición, o no emite ningún elemento, se lanzarán un `IllegalArgumentException` o un `NoSuchElementException` respectivamente.

Si el Observable fuente emite elementos, pero ninguno cumple la condición especificada, se emitirá `undefined`.

## Ejemplos

**Emitir el único elemento que cumpla la condición**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-single-1?file=index.ts">StackBlitz</a>

```javascript
import { single } from "rxjs/operators";
import { from } from "rxjs";

const language$ = from([
  { name: "Java", type: "Orientado a objetos" },
  { name: "Ruby", type: "Multiparadigma" },
  { name: "Haskell", type: "Funcional" },
]);

language$
  .pipe(single(({ type }) => type === "Multiparadigma"))
  .subscribe(console.log);
// Salida: { name: "Ruby", type: "Multiparadigma" }
```

**Si hay más de un elemento que cumpla la condición, se lanzará un error**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-single-2?file=index.ts">StackBlitz</a>

```javascript
import { range } from "rxjs";
import { single } from "rxjs/operators";

const number$ = range(1, 5);

number$.pipe(single((n) => n % 2 === 0)).subscribe(console.log, console.error);
// Salida: (error) Sequence contains more than one element
```

**Si no hay ningún elemento que cumpla la condición, se emitirá undefined**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-single-3?file=index.ts">StackBlitz</a>

```javascript
import { of } from "rxjs";
import { single } from "rxjs/operators";

const user$ = of(
  { name: "NyaGarcía", age: 23 },
  { name: "zaldih", age: 21 },
  { name: "caballerog", age: 35 }
);

user$.pipe(single(({ age }) => age < 18)).subscribe(console.log);
// Salida: undefined
```

### Ejemplos de la documentación oficial

**Emitir 'Error'**

```javascript
import { range } from "rxjs";
import { single } from "rxjs/operators";

const numbers = range(1, 5).pipe(single());
numbers.subscribe(
  (x) => console.log("Nunca se llamará"),
  (e) => console.log("Error")
);
// Salida
// 'Error'
```

**Emitir 'undefined'**

```javascript
import { range } from "rxjs";
import { single } from "rxjs/operators";

const numbers = range(1, 5).pipe(single((x) => x === 10));
numbers.subscribe((x) => console.log(x));
// Salida
// 'undefined'
```

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/single.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/single">Documentación oficial en inglés</a>
