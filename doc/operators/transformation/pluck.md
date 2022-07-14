# pluck

## Extrae propiedadas de un objeto

<details>

<summary>Signatura</summary>

#### Firma

`pluck<T, R>(...properties: string[]): OperatorFunction<T, R>`

#### Parámetros

#### Retorna

`OperatorFunction<T, R>`: Un nuevo Observable de propiedades de los valores de la fuente.

</details>

## Descripción

Es como `map`, pero se utiliza para extraer una de las propiedades anidadas de los objetos emitidos.

![Diagrama de canicas del operador pluck](assets/images/marble-diagrams/transformation/pluck.png)

Dada una lista de cadenas que describan la ruta de una propiedad de un objeto, obtiene el valor de la propiedad anidada especificada de todos los valores del Observable fuente. Si la propiedad no existe, se devolverá `undefined` para ese valor en concreto.

## Ejemplos

**Obtener una propiedad de un objeto**

[StackBlitz](https://stackblitz.com/edit/rxjs-pluck-2?file=index.ts)

```javascript
import { pluck } from "rxjs/operators";
import { from } from "rxjs";

const language$ = from([
  { name: "Ruby", type: "Multiparadigma" },
  { name: "Haskell", type: "Funcional" },
  { name: "Rust", type: "Multiparadigma" },
]);

language$.pipe(pluck("name")).subscribe(console.log);
// Salida: Ruby, Haskell, Rust
```

**Obtener una propiedad anidada de un objeto**

[StackBlitz](https://stackblitz.com/edit/rxjs-pluck-3?file=index.ts)

```javascript
import { pluck } from "rxjs/operators";
import { of } from "rxjs";

const githubUser$ = of(
  { name: "zaldih", stats: { repositories: 23 } },
  { name: "NyaGarcia", stats: { repositories: 30 } },
  { name: "caballerog", stats: { repositories: 89 } },
  { name: "tonivj5", stats: { repositories: 51 } }
);

githubUser$.pipe(pluck("stats", "repositories")).subscribe(console.log);
// Salida: 23, 30, 89, 51
```

### Ejemplo de la documentación oficial

**Proyectar cada click a la propiedad tagName del elemento target del click**

```javascript
import { fromEvent } from "rxjs";
import { pluck } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const tagNames = clicks.pipe(pluck("target", "tagName"));
tagNames.subscribe((x) => console.log(x));
```

<details>

<summary>Sobrecargas</summary>

#### Firma

`pluck(k1: K1): OperatorFunction<T, T[K1]>`

#### Parámetros

#### Retorna

`OperatorFunction<T, T[K1]>`

#### Firma

`pluck(k1: K1, k2: K2): OperatorFunction<T, T[K1][k2]>`

#### Parámetros

#### Retorna

`OperatorFunction<T, T[K1][k2]>`

#### Firma

`pluck(k1: K1, k2: K2, k3: K3): OperatorFunction<T, T[K1][k2][K3]>`

#### Parámetros

#### Retorna

`OperatorFunction<T, T[K1][k2][K3]>`

#### Firma

`pluck(k1: K1, k2: K2, k3: K3, k4: K4): OperatorFunction<T, T[K1][k2][K3][k4]>`

#### Parámetros

#### Retorna

`OperatorFunction<T, T[K1][k2][K3][k4]>`

#### Firma

`pluck(k1: K1, k2: K2, k3: K3, k4: K4, k5: K5): OperatorFunction<T, T[K1][k2][K3][k4][K5]>`

#### Parámetros

#### Retorna

`OperatorFunction<T, T[K1][k2][K3][k4][K5]>`

#### Firma

`pluck(k1: K1, k2: K2, k3: K3, k4: K4, k5: K5, k6: K6): OperatorFunction<T, T[K1][k2][K3][k4][K5][k6]>`

#### Parámetros

#### Retorna

`OperatorFunction<T, T[K1][k2][K3][k4][K5][k6]>`

#### Firma

`pluck(...properties: string[]): OperatorFunction<T, R>`

#### Parámetros

#### Retorna

`OperatorFunction<T, R>`

</details>

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/pluck.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/operators/pluck)
