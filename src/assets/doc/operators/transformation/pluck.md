<div class="page-heading">

# pluck

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/pluck.ts">
<svg>
  <use xlink:href="/assets/icons/github.svg#github"></use>
</svg>
</a>
</div>

### Extrae propiedadas de un objeto

### Firma

`pluck<T, R>(...properties: string[]): OperatorFunction<T, R>`

### Parámetros

<table>
<tr><td>properties</td><td>Las propiedades anidadas que obtener de cada elemento de la fuente (un objeto).</td></tr>
</table>

### Retorna

`OperatorFunction<T, R>`: Un nuevo Observable de propiedades de los valores de la fuente.

## Descripción

Es como `map`, pero se utiliza para extraer una de las propiedades anidadas de los objetos emitidos.

<img src="assets/images/marble-diagrams/transformation/pluck.png" alt="Diagrama de canicas del operador pluck">

Dada una lista de cadenas que describan la ruta de una propiedad de un objeto, obtiene el valor de la propiedad anidada especificada de todos los valores del Observable fuente. Si la propiedad no existe, se devolverá `undefined` para ese valor en concreto.

## Ejemplos

Obtener una propiedad de un objeto

[StackBlitz](https://stackblitz.com/edit/rxjs-pluck-2?file=index.ts)

```javascript
import { pluck } from "rxjs/operators";
import { from } from "rxjs";

const pokemon$ = from([
  { name: "Charmander", type: "Fire" },
  { name: "Squirtle", type: "Water" },
  { name: "Bulbasaur", type: "Grass" },
]);

pokemon$.pipe(pluck("name")).subscribe(console.log);
// Salida: Charmander, Squirtle, Bulbasaur
```

Obtener una propiedad anidada de un objeto

[StackBlitz](https://stackblitz.com/edit/rxjs-pluck-3?file=index.ts)

```javascript
import { pluck } from "rxjs/operators";
import { from } from "rxjs";

const pokemon$ = from([
  { name: "Charmander", type: "Fire", stats: { attack: 40, defense: 35 } },
  { name: "Squirtle", type: "Water", stats: { attack: 38, defense: 40 } },
  { name: "Bulbasaur", type: "Grass", stats: { attack: 40, defense: 40 } },
]);

pokemon$.pipe(pluck("stats", "attack")).subscribe(console.log);
// Salida: 35, 40, 40
```

### Ejemplo de la documentación oficial

Proyectar cada click a la propiedad `tagName` del elemento `target` del click.

```javascript
import { fromEvent } from "rxjs";
import { pluck } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const tagNames = clicks.pipe(pluck("target", "tagName"));
tagNames.subscribe((x) => console.log(x));
```

## Sobrecargas

`pluck(k1: K1): OperatorFunction<T, T[K1]>`

### Parámetros

<table>
<tr><td>k1</td><td>Tipo: <code>K1</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, T[K1]>`

`pluck(k1: K1, k2: K2): OperatorFunction<T, T[K1][k2]>`

### Parámetros

<table>
<tr><td>k1</td><td>Tipo: <code>K1</code>.</td></tr>
<tr><td>k2</td><td>Tipo: <code>K2</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, T[K1][k2]>`

`pluck(k1: K1, k2: K2, k3: K3): OperatorFunction<T, T[K1][k2][K3]>`

### Parámetros

<table>
<tr><td>k1</td><td>Tipo: <code>K1</code>.</td></tr>
<tr><td>k2</td><td>Tipo: <code>K2</code>.</td></tr>
<tr><td>k3</td><td>Tipo: <code>K3</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, T[K1][k2][K3]>`

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

`pluck(...properties: string[]): OperatorFunction<T, R>`

### Parámetros

<table>
<tr><td>properties</td><td>Tipo: <code>string[]</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, R>`

## Recursos adicionales

- [Documentación oficial en inglés](https://rxjs-dev.firebaseapp.com/api/operators/pluck)
