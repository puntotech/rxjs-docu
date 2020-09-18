# last

### Emite el último valor (o el último valor que cumpla una condición) emitido por el Observable fuente

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

## Descripción

Retorna un Observable que emite el último elemento emitido por el Observable fuente. Opcionalmente recibe una función `predicate` como parámetro, en cuyo caso, en lugar de emitir el último elemento del Observable fuente, el Observable resultante emitirá el último elemento del Observable fuente que cumpla la condición especificada.

<img src="assets/images/marble-diagrams/filtering/last.png" alt="Diagrama de canicas del operador last">

## Ejemplos

Emitir la última cadena de una secuencia

[StackBlitz](https://stackblitz.com/edit/rxjs-last-1?file=index.ts)

```javascript
import { last } from "rxjs/operators";
import { from, fromEvent } from "rxjs";

const fruit$ = from(["Cereza", "Fresa", "Arándano"]);

fruit$.pipe(last()).subscribe(console.log);
// Salida: Arándano
```

Emitir el último elemento que cumpla una condición

[StackBlitz](https://stackblitz.com/edit/rxjs-last-2?file=index.ts)

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

Proporcionar un valor por defecto, que será emitido si ningún elemento cumple la condición

[StackBlitz](https://stackblitz.com/edit/rxjs-last-3?file=index.ts)

```javascript
import { last } from "rxjs/operators";
import { from } from "rxjs";

const pokemon$ = from([
  { name: "Charmander", type: "Fire" },
  { name: "Squirtle", type: "Water" },
  { name: "Gyarados", type: "Water" },
]);

pokemon$
  .pipe(
    last(({ type }) => type === "Grass", { name: "Bulbasaur", type: "Grass" })
  )
  .subscribe(console.log);
// Salida: { name: "Bulbasaur", type: "Grass" }
```

## Sobrecargas

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

`last(predicate: (value: T, index: number, source: Observable<T>) => value is S, defaultValue?: S): OperatorFunction<T, S>`

### Parámetros

<table>
<tr><td>predicate</td><td>Tipo: <code>(value: T, index: number, source: Observable) => value is S</code>.</td></tr>
<tr><td>defaultValue</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>S</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, S>`

`last(predicate: (value: T, index: number, source: Observable<T>) => boolean, defaultValue?: D): OperatorFunction<T, T | D>`

### Parámetros

<table>
<tr><td>predicate</td><td>Tipo: <code>(value: T, index: number, source: Observable) => boolean</code>.</td></tr>
<tr><td>defaultValue</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>D</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, T | D>`

- [Documentación oficial en inglés](https://rxjs-dev.firebaseapp.com/api/operators/last)
- [Código fuente](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/last.ts)