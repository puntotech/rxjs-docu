---
description: >-
  Emite el último valor (o el último valor que cumpla una condición) del el
  Observable fuente
---

# last

<details>

<summary>Signatura</summary>

#### Firma

`last<T, D>(predicate?: (value: T, index: number, source: Observable<T>) => boolean, defaultValue?: D): OperatorFunction<T, T | D>`

#### Parámetros

#### Retorna

`OperatorFunction<T, T | D>`: Un Observable que emite el último elemento del Observable que cumpla la condición, o un `NoSuchElementException` si no se emite ningún elemento.

#### Lanza

`EmptyError` Propaga un `EmptyError` a la _callback_ de error del Observable si este se completa antes de emitir alguna notificación `next`.

`Error` - Se lanza en el caso de que ningún elemento cumple la condición especificada por el Observable fuente.

</details>

## Descripción

Retorna un Observable que emite el último elemento emitido por el Observable fuente. Opcionalmente recibe una función `predicate` como parámetro, en cuyo caso, en lugar de emitir el último elemento del Observable fuente, el Observable resultante emitirá el último elemento del Observable fuente que cumpla la condición especificada.

![Diagrama de canicas del operador last](assets/images/marble-diagrams/filtering/last.png)

## Ejemplos

**Emitir la última cadena de una secuencia**

[StackBlitz](https://stackblitz.com/edit/rxjs-last-1?file=index.ts)

```javascript
import { last } from "rxjs/operators";
import { from, fromEvent } from "rxjs";

const fruit$ = from(["Cereza", "Fresa", "Arándano"]);

fruit$.pipe(last()).subscribe(console.log);
// Salida: Arándano
```

**Emitir el último elemento que cumpla una condición**

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

**Proporcionar un valor por defecto, que será emitido si ningún elemento cumple la condición**

[StackBlitz](https://stackblitz.com/edit/rxjs-last-3?file=index.ts)

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

#### Firma

`last(predicate?: null, defaultValue?: D): OperatorFunction<T, T | D>`

#### Parámetros

#### Retorna

`OperatorFunction<T, T | D>`

#### Firma

`last(predicate: (value: T, index: number, source: Observable<T>) => value is S, defaultValue?: S): OperatorFunction<T, S>`

#### Parámetros

#### Retorna

`OperatorFunction<T, S>`

#### Firma

`last(predicate: (value: T, index: number, source: Observable<T>) => boolean, defaultValue?: D): OperatorFunction<T, T | D>`

#### Parámetros

#### Retorna

`OperatorFunction<T, T | D>`

</details>

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/last.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/operators/last)
