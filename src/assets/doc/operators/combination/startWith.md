# startWith

<h2 class="subtitle"> Emite los elementos que se especifiquen como argumentos antes de empezar a emitir las emisiones del Observable fuente
</h2>

<details>
<summary>Signatura</summary>

### Firma

`startWith<T, D>(...array: (SchedulerLike | T)[]): OperatorFunction<T, T | D>`

### Parámetros

<table>
<tr><td>array</td><td>Tipo: <code>(SchedulerLike | T)[]</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, T | D>`: Un Observable que emite primero los elementos en el `Iterable` especificado, y después emite los valores emitidos por el Observable fuente.

</details>

## Descripción

Primero emite sus argumentos en orden, y después las emisiones de la fuente.

<img src="assets/images/marble-diagrams/join-creation/startWith.png" alt="Diagrama de canicas del operador startWith">

## Ejemplos

**Proporcionar un valor inicial al flujo de emisiones**

<a target="_blank" href="https://stackblitz.com/edit/docu-rxjs-startwith?file=index.ts">StackBlitz</a>

```javascript
import { startWith } from "rxjs/operators";
import { from } from "rxjs";

const fruit$ = from(["Fresa", "Cereza"]);

fruit$.pipe(startWith("Arándano")).subscribe(console.log);
// Salida: Arándano, Fresa, Cereza
```

**A startWith se le puede proporcionar más de un valor**

<a target="_blank" href="https://stackblitz.com/edit/docu-rxjs-startwith-2?file=index.ts">StackBlitz</a>

```javascript
import { startWith } from "rxjs/operators";
import { range } from "rxjs";

const number$ = range(0, 4);

number$.pipe(startWith(-3, -2, -1)).subscribe(console.log);
// Salida: -3, -2, -1, 0, 1, 2, 3
```

### Ejemplo de la documentación oficial

**Comenzar la cadena de emisiones con 'primero' y 'segundo'**

```javascript
import { of } from "rxjs";
import { startWith } from "rxjs/operators";

of("Valores de la fuente")
  .pipe(startWith("Primero", "Segundo"))
  .subscribe((x) => console.log(x));

// Salida: "Primero", "Segundo", "Valores de la fuente"
```

<details>
<summary>Sobrecargas</summary>
<div class="overload-container">

<div class="overload-section">

### Firma

`startWith(scheduler: SchedulerLike): MonoTypeOperatorFunction<T>`

### Parámetros

<table>
<tr><td>scheduler</td><td>Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`MonoTypeOperatorFunction<T>`

</div>

<div class="overload-section">

### Firma

`startWith(v1: D, scheduler: SchedulerLike): OperatorFunction<T, T | D>`

### Parámetros

<table>
<tr><td>v1</td><td>Tipo: <code>D</code>.</td></tr>
<tr><td>scheduler</td><td>Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, T | D>`

</div>

<div class="overload-section">

### Firma

`startWith(v1: D, v2: E, scheduler: SchedulerLike): OperatorFunction<T, T | D | E>`

### Parámetros

<table>
<tr><td>v1</td><td>Tipo: <code>D</code>.</td></tr>
<tr><td>v2</td><td>Tipo: <code>E</code>.</td></tr>
<tr><td>scheduler</td><td>Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, T | D | E>`

</div>

<div class="overload-section">

### Firma

`startWith(v1: D, v2: E, v3: F, scheduler: SchedulerLike): OperatorFunction<T, T | D | E | F>`

### Parámetros

<table>
<tr><td>v1</td><td>Tipo: <code>D</code>.</td></tr>
<tr><td>v2</td><td>Tipo: <code>E</code>.</td></tr>
<tr><td>v3</td><td>Tipo: <code>F</code>.</td></tr>
<tr><td>scheduler</td><td>Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, T | D | E | F>`

</div>

<div class="overload-section">

### Firma

`startWith(v1: D, v2: E, v3: F, v4: G, scheduler: SchedulerLike): OperatorFunction<T, T | D | E | F | G>`

### Parámetros

<table>
<tr><td>v1</td><td>Tipo: <code>D</code>.</td></tr>
<tr><td>v2</td><td>Tipo: <code>E</code>.</td></tr>
<tr><td>v3</td><td>Tipo: <code>F</code>.</td></tr>
<tr><td>v4</td><td>Tipo: <code>G</code>.</td></tr>
<tr><td>scheduler</td><td>Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

OperatorFunction<T, T | D | E | F | G>

</div>

<div class="overload-section">

### Firma

`startWith(v1: D, v2: E, v3: F, v4: G, v5: H, scheduler: SchedulerLike): OperatorFunction<T, T | D | E | F | G | H>`

### Parámetros

<table>
<tr><td>v1</td><td>Tipo: <code>D</code>.</td></tr>
<tr><td>v2</td><td>Tipo: <code>E</code>.</td></tr>
<tr><td>v3</td><td>Tipo: <code>F</code>.</td></tr>
<tr><td>v4</td><td>Tipo: <code>G</code>.</td></tr>
<tr><td>v5</td><td>Tipo: <code>H</code>.</td></tr>
<tr><td>scheduler</td><td>Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

OperatorFunction<T, T | D | E | F | G | H>

</div>

<div class="overload-section">

### Firma

`startWith(v1: D, v2: E, v3: F, v4: G, v5: H, v6: I, scheduler: SchedulerLike): OperatorFunction<T, T | D | E | F | G | H | I>`

### Parámetros

<table>
<tr><td>v1</td><td>Tipo: <code>D</code>.</td></tr>
<tr><td>v2</td><td>Tipo: <code>E</code>.</td></tr>
<tr><td>v3</td><td>Tipo: <code>F</code>.</td></tr>
<tr><td>v4</td><td>Tipo: <code>G</code>.</td></tr>
<tr><td>v5</td><td>Tipo: <code>H</code>.</td></tr>
<tr><td>v6</td><td>Tipo: <code>I</code>.</td></tr>
<tr><td>scheduler</td><td>Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, T | D | E | F | G | H | I>`

</div>

<div class="overload-section">

### Firma

`startWith(v1: D): OperatorFunction<T, T | D>`

### Parámetros

<table>
<tr><td>v1</td><td>Tipo: <code>D</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, T | D>`

</div>

<div class="overload-section">

### Firma

`startWith(v1: D, v2: E): OperatorFunction<T, T | D | E>`

### Parámetros

<table>
<tr><td>v1</td><td>Tipo: <code>D</code>.</td></tr>
<tr><td>v2</td><td>Tipo: <code>E</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, T | D | E>`

</div>

<div class="overload-section">

### Firma

`startWith(v1: D, v2: E, v3: F): OperatorFunction<T, T | D | E | F>`

### Parámetros

<table>
<tr><td>v1</td><td>Tipo: <code>D</code>.</td></tr>
<tr><td>v2</td><td>Tipo: <code>E</code>.</td></tr>
<tr><td>v3</td><td>Tipo: <code>F</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, T | D | E | F>`

</div>

<div class="overload-section">

### Firma

`startWith(v1: D, v2: E, v3: F, v4: G): OperatorFunction<T, T | D | E | F | G>`

### Parámetros

<table>
<tr><td>v1</td><td>Tipo: <code>D</code>.</td></tr>
<tr><td>v2</td><td>Tipo: <code>E</code>.</td></tr>
<tr><td>v3</td><td>Tipo: <code>F</code>.</td></tr>
<tr><td>v4</td><td>Tipo: <code>G</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, T | D | E | F | G>`

</div>

<div class="overload-section">

### Firma

`startWith(v1: D, v2: E, v3: F, v4: G, v5: H): OperatorFunction<T, T | D | E | F | G | H>`

### Parámetros

<table>
<tr><td>v1</td><td>Tipo: <code>D</code>.</td></tr>
<tr><td>v2</td><td>Tipo: <code>E</code>.</td></tr>
<tr><td>v3</td><td>Tipo: <code>F</code>.</td></tr>
<tr><td>v4</td><td>Tipo: <code>G</code>.</td></tr>
<tr><td>v5</td><td>Tipo: <code>H</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, T | D | E | F | G | H>`

</div>

<div class="overload-section">

### Firma

`startWith(v1: D, v2: E, v3: F, v4: G, v5: H, v6: I): OperatorFunction<T, T | D | E | F | G | H | I>`

### Parámetros

<table>
<tr><td>v1</td><td>Tipo: <code>D</code>.</td></tr>
<tr><td>v2</td><td>Tipo: <code>E</code>.</td></tr>
<tr><td>v3</td><td>Tipo: <code>F</code>.</td></tr>
<tr><td>v4</td><td>Tipo: <code>G</code>.</td></tr>
<tr><td>v5</td><td>Tipo: <code>H</code>.</td></tr>
<tr><td>v6</td><td>Tipo: <code>I</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, T | D | E | F | G | H | I>`

</div>

<div class="overload-section">

### Firma

`startWith(...array: D[]): OperatorFunction<T, T | D>`

### Parámetros

<table>
<tr><td>array</td><td>Tipo: <code>D[]</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, T | D>`

</div>

<div class="overload-section">

### Firma

`startWith(...array: (SchedulerLike | D)[]): OperatorFunction<T, T | D>`

### Parámetros

<table>
<tr><td>array</td><td>Tipo: <code>(SchedulerLike | D)[]</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, T | D>`

</div>

</div>
</details>

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/startWith.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/startWith">Documentación oficial en inglés</a>
