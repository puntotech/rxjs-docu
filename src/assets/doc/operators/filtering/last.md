# last

<h2 class="subtitle"> Emite el último valor (o el último valor que cumpla una condición) del el Observable fuente
</h2>

<details>
<summary>Signatura</summary>

### Firma

`last<T, D>(predicate?: (value: T, index: number, source: Observable<T>) => boolean, defaultValue?: D): OperatorFunction<T, T | D>`

### Parámetros

<table>
<tr><td>predicate</td><td>Opcional. El valor por defecto es <code>undefined</code>.
La condición que el elemento emitido por la fuente debe cumplir.</td></tr>
<tr><td>defaultValue</td><td>Opcional. El valor por defecto es <code>undefined</code>.
El valor por defecto opcional que se emitirá en el caso de que ningún elemento cumpla la condición o si no se emite ningún valor.</td></tr>
</table>

### Retorna

`OperatorFunction<T, T | D>`: Un Observable que emite el último elemento del Observable que cumpla la condición, o un `NoSuchElementException` si no se emite ningún elemento.

### Lanza

`EmptyError` Propaga un `EmptyError` a la _callback_ de error del Observable si este se completa antes de emitir alguna notificación `next`.

`Error` - Se lanza en el caso de que ningún elemento cumple la condición especificada por el Observable fuente.

</details>

## Descripción

Retorna un Observable que emite el último elemento emitido por el Observable fuente. Opcionalmente recibe una función `predicate` como parámetro, en cuyo caso, en lugar de emitir el último elemento del Observable fuente, el Observable resultante emitirá el último elemento del Observable fuente que cumpla la condición especificada.

<img src="assets/images/marble-diagrams/filtering/last.png" alt="Diagrama de canicas del operador last">

## Ejemplos

**Emitir la última cadena de una secuencia**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-last-1?file=index.ts">StackBlitz</a>

```javascript
import { last } from "rxjs/operators";
import { from, fromEvent } from "rxjs";

const fruit$ = from(["Cereza", "Fresa", "Arándano"]);

fruit$.pipe(last()).subscribe(console.log);
// Salida: Arándano
```

**Emitir el último elemento que cumpla una condición**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-last-2?file=index.ts">StackBlitz</a>

```javascript
import { of } from "rxjs";
import { last } from "rxjs/operators";

const user$ = of(
  { name: "NyaGarcía", age: 23 },
  { name: "zaldih", age: 21 },
  { name: "caballerog", age: 35 },
  { name: "carla.1003", age: 21 }
);

user$.pipe(last(({ age }) => age === 21)).subscribe(console.log);
// Salida: { name: 'carla.1003', age: 21 }
```

**Proporcionar un valor por defecto, que será emitido si ningún elemento cumple la condición**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-last-3?file=index.ts">StackBlitz</a>

```javascript
import { last } from "rxjs/operators";
import { from } from "rxjs";

const language$ = from([
  { name: "Haskell", type: "Funcional" },
  { name: "Ruby", type: "Multiparadigma" },
  { name: "Rust", type: "Multiparadigma" },
]);

language$
  .pipe(
    last(({ type }) => type === "Orientado a objetos", {
      name: "Java",
      type: "Orientado a objetos",
    })
  )
  .subscribe(console.log);
// Salida: { name: "Java", type: "Orientado a objetos" }
```

<details>
<summary>Sobrecargas</summary>
<div class="overload-container">

<div class="overload-section">

### Firma

`last(predicate?: null, defaultValue?: D): OperatorFunction<T, T | D>`

### Parámetros

<table>
<tr><td>predicate</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>null</code>.</td></tr>
<tr><td>defaultValue</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>D</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, T | D>`

</div>

<div class="overload-section">

### Firma

`last(predicate: (value: T, index: number, source: Observable<T>) => value is S, defaultValue?: S): OperatorFunction<T, S>`

### Parámetros

<table>
<tr><td>predicate</td><td>Tipo: <code>(value: T, index: number, source: Observable) => value is S</code>.</td></tr>
<tr><td>defaultValue</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>S</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, S>`

</div>

<div class="overload-section">

### Firma

`last(predicate: (value: T, index: number, source: Observable<T>) => boolean, defaultValue?: D): OperatorFunction<T, T | D>`

### Parámetros

<table>
<tr><td>predicate</td><td>Tipo: <code>(value: T, index: number, source: Observable) => boolean</code>.</td></tr>
<tr><td>defaultValue</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>D</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, T | D>`

</div>

</div>
</details>

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/last.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/last">Documentación oficial en inglés</a>
