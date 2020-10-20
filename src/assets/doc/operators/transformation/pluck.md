# pluck

<h2 class="subtitle"> Extrae propiedadas de un objeto
</h2>

<details>
<summary>Signatura</summary>

### Firma

`pluck<T, R>(...properties: string[]): OperatorFunction<T, R>`

### Parámetros

<table>
<tr><td>properties</td><td>Las propiedades anidadas que obtener de cada elemento de la fuente (un objeto).</td></tr>
</table>

### Retorna

`OperatorFunction<T, R>`: Un nuevo Observable de propiedades de los valores de la fuente.

</details>

## Descripción

Es como `map`, pero se utiliza para extraer una de las propiedades anidadas de los objetos emitidos.

<img src="assets/images/marble-diagrams/transformation/pluck.png" alt="Diagrama de canicas del operador pluck">

Dada una lista de cadenas que describan la ruta de una propiedad de un objeto, obtiene el valor de la propiedad anidada especificada de todos los valores del Observable fuente. Si la propiedad no existe, se devolverá `undefined` para ese valor en concreto.

## Ejemplos

**Obtener una propiedad de un objeto**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-pluck-2?file=index.ts">StackBlitz</a>

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

<a target="_blank" href="https://stackblitz.com/edit/rxjs-pluck-3?file=index.ts">StackBlitz</a>

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
<div class="overload-container">

<div class="overload-section">

### Firma

`pluck(k1: K1): OperatorFunction<T, T[K1]>`

### Parámetros

<table>
<tr><td>k1</td><td>Tipo: <code>K1</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, T[K1]>`

</div>

<div class="overload-section">

### Firma

`pluck(k1: K1, k2: K2): OperatorFunction<T, T[K1][k2]>`

### Parámetros

<table>
<tr><td>k1</td><td>Tipo: <code>K1</code>.</td></tr>
<tr><td>k2</td><td>Tipo: <code>K2</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, T[K1][k2]>`

</div>

<div class="overload-section">

### Firma

`pluck(k1: K1, k2: K2, k3: K3): OperatorFunction<T, T[K1][k2][K3]>`

### Parámetros

<table>
<tr><td>k1</td><td>Tipo: <code>K1</code>.</td></tr>
<tr><td>k2</td><td>Tipo: <code>K2</code>.</td></tr>
<tr><td>k3</td><td>Tipo: <code>K3</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, T[K1][k2][K3]>`

</div>

<div class="overload-section">

### Firma

`pluck(k1: K1, k2: K2, k3: K3, k4: K4): OperatorFunction<T, T[K1][k2][K3][k4]>`

### Parámetros

<table>
<tr><td>k1</td><td>Tipo: <code>K1</code>.</td></tr>
<tr><td>k2</td><td>Tipo: <code>K2</code>.</td></tr>
<tr><td>k3</td><td>Tipo: <code>K3</code>.</td></tr>
<tr><td>k4</td><td>Tipo: <code>K4</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, T[K1][k2][K3][k4]>`

</div>

<div class="overload-section">

### Firma

`pluck(k1: K1, k2: K2, k3: K3, k4: K4, k5: K5): OperatorFunction<T, T[K1][k2][K3][k4][K5]>`

### Parámetros

<table>
<tr><td>k1</td><td>Tipo: <code>K1</code>.</td></tr>
<tr><td>k2</td><td>Tipo: <code>K2</code>.</td></tr>
<tr><td>k3</td><td>Tipo: <code>K3</code>.</td></tr>
<tr><td>k4</td><td>Tipo: <code>K4</code>.</td></tr>
<tr><td>k5</td><td>Tipo: <code>K5</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, T[K1][k2][K3][k4][K5]>`

</div>

<div class="overload-section">

### Firma

`pluck(k1: K1, k2: K2, k3: K3, k4: K4, k5: K5, k6: K6): OperatorFunction<T, T[K1][k2][K3][k4][K5][k6]>`

### Parámetros

<table>
<tr><td>k1</td><td>Tipo: <code>K1</code>.</td></tr>
<tr><td>k2</td><td>Tipo: <code>K2</code>.</td></tr>
<tr><td>k3</td><td>Tipo: <code>K3</code>.</td></tr>
<tr><td>k4</td><td>Tipo: <code>K4</code>.</td></tr>
<tr><td>k5</td><td>Tipo: <code>K5</code>.</td></tr>
<tr><td>k6</td><td>Tipo: <code>K6</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, T[K1][k2][K3][k4][K5][k6]>`

</div>

<div class="overload-section">

### Firma

`pluck(...properties: string[]): OperatorFunction<T, R>`

### Parámetros

<table>
<tr><td>properties</td><td>Tipo: <code>string[]</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, R>`

</div>

</div>
</details>

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/pluck.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/pluck">Documentación oficial en inglés</a>
