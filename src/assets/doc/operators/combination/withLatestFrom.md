# withLatestFrom

<h2 class="subtitle"> Combina el Observable fuente con otros Observables para crear un Observable cuyas emisiones se calculan a partir de los valores más recientes de cada uno, cada vez que la fuente emite
</h2>

<details>
<summary>Signatura</summary>

### Firma

`withLatestFrom<T, R>(...args: any[]): OperatorFunction<T, R>`

### Parámetros

<table>
<tr><td>args</td><td>Tipo: <code>any[]</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, R>`: Un Observable de valores proyectados de cada Observable _input_, o un array de los valores más recientes de cada Observable _input_.

</details>

## Descripción

Cuando el Observable fuente emite un valor, combina dicho valor con las emisiones más recientes de los demás Observables, y emite el resultado de dicha combinación.

<img src="assets/images/marble-diagrams/join-creation/withLatestFrom.png" alt="Diagrama de canicas del operador withLatestFrom">

`withLatestFrom` combina cada valor del Observable fuente (la instancia) con los valores más recientes de los demás Observables cada vez que la fuente emite un valor. Opcionalmente, se puede utilizar una función de proyección para determinar el valor que se emite en el Observable resultante. Todos los Observables _input_ deben emitir al menos un valor para que el Observable resultante pueda emitir.

## Ejemplos

**Combinar cada tecla pulsada con un Observable intervalo, para saber en qué momento se pulsa cada tecla**

<a target="_blank" href="https://stackblitz.com/edit/docu-rxjs-withlatestfrom?file=index.ts">StackBlitz</a>

```javascript
import { fromEvent, interval } from "rxjs";
import { withLatestFrom, map } from "rxjs/operators";

const key$ =
  fromEvent <
  KeyboardEvent >
  (document, "keydown").pipe(map(({ code }) => code));

const number$ = interval(1000);

key$
  .pipe(
    withLatestFrom(number$),
    map(([code, time]) => `Tecla ${code} pulsada a los ${time} segundos`)
  )
  .subscribe((x) => console.log(x));
// Salida: (2s) Tecla KeyR pulsada a los 2 segundos (1s) Tecla KeyX pulsada a los 3 segundos...
```

### Ejemplo de la documentación oficial

**Emitir un array con el temporizador más reciente más el evento click, en cada click**

```javascript
import { fromEvent, interval } from "rxjs";
import { withLatestFrom } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const timer = interval(1000);
const result = clicks.pipe(withLatestFrom(timer));
result.subscribe((x) => console.log(x));
```

<details>
<summary>Sobrecargas</summary>
<div class="overload-container">

<div class="overload-section">

### Firma

`withLatestFrom(project: (v1: T) => R): OperatorFunction<T, R>`

### Parámetros

<table>
<tr><td>project</td><td>Tipo: <code>(v1: T) => R</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, R>`

</div>

<div class="overload-section">

### Firma

`withLatestFrom(source2: O2, project: (v1: T, v2: ObservedValueOf<O2>) => R): OperatorFunction<T, R>`

### Parámetros

<table>

<tr><td>v2</td><td>Tipo: <code>O2</code>.</td></tr>
<tr><td>project</td><td>Tipo: <code>(v1: T, v2: ObservedValueOf) => R</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, R>`

</div>

<div class="overload-section">

### Firma

`withLatestFrom(v2: O2, v3: O3, project: (v1: T, v2: ObservedValueOf<O2>, v3: ObservedValueOf<O3>) => R): OperatorFunction<T, R>`

### Parámetros

<table>
<tr><td>v2</td><td>Tipo: <code>O2</code>.</td></tr>
<tr><td>v3</td><td>Tipo: <code>O3</code>.</td></tr>
<tr><td>project</td><td>Tipo: <code>(v1: T, v2: ObservedValueOf, v3: ObservedValueOf) => R</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, R>`

</div>

<div class="overload-section">

### Firma

`withLatestFrom(v2: O2, v3: O3, v4: O4, project: (v1: T, v2: ObservedValueOf<O2>, v3: ObservedValueOf<O3>, v4: ObservedValueOf<O4>) => R): OperatorFunction<T, R>`

### Parámetros

<table>
<tr><td>v2</td><td>Tipo: <code>O2</code>.</td></tr>
<tr><td>v3</td><td>Tipo: <code>O3</code>.</td></tr>
<tr><td>v4</td><td>Tipo: <code>O4</code>.</td></tr>
<tr><td>project</td><td>Tipo: <code>(v1: T, v2: ObservedValueOf, v3: ObservedValueOf, v4: ObservedValueOf) => R</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, R>`

</div>

<div class="overload-section">

### Firma

`withLatestFrom(v2: O2, v3: O3, v4: O4, v5: O5, project: (v1: T, v2: ObservedValueOf<O2>, v3: ObservedValueOf<O3>, v4: ObservedValueOf<O4>, v5: ObservedValueOf<O5>) => R): OperatorFunction<T, R>`

### Parámetros

<table>
<tr><td>v2</td><td>Tipo: <code>O2</code>.</td></tr>
<tr><td>v3</td><td>Tipo: <code>O3</code>.</td></tr>
<tr><td>v4</td><td>Tipo: <code>O4</code>.</td></tr>
<tr><td>v5</td><td>Tipo: <code>O5</code>.</td></tr>
<tr><td>project</td><td>Tipo: <code>(v1: T, v2: ObservedValueOf, v3: ObservedValueOf, v4: ObservedValueOf, v5: ObservedValueOf) => R</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, R>`

</div>

<div class="overload-section">

### Firma

`withLatestFrom(v2: O2, v3: O3, v4: O4, v5: O5, v6: O6, project: (v1: T, v2: ObservedValueOf<O2>, v3: ObservedValueOf<O3>, v4: ObservedValueOf<O4>, v5: ObservedValueOf<O5>, v6: ObservedValueOf<O6>) => R): OperatorFunction<T, R>`

### Parámetros

<table>
<tr><td>v2</td><td>Tipo: <code>O2</code>.</td></tr>
<tr><td>v3</td><td>Tipo: <code>O3</code>.</td></tr>
<tr><td>v4</td><td>Tipo: <code>O4</code>.</td></tr>
<tr><td>v5</td><td>Tipo: <code>O5</code>.</td></tr>
<tr><td>v6</td><td>Tipo: <code>O6</code>.</td></tr>
<tr><td>project</td><td>Tipo: <code>(v1: T, v2: ObservedValueOf, v3: ObservedValueOf, v4: ObservedValueOf, v5: ObservedValueOf, v6: ObservedValueOf) => R</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, R>`

</div>

<div class="overload-section">

### Firma

`withLatestFrom(source2: O2): OperatorFunction<T, [T, ObservedValueOf<O2>]>`

### Parámetros

<table>
<tr><td>source2</td><td>Tipo: <code>O2</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, [T, ObservedValueOf<O2>]>`

</div>

<div class="overload-section">

### Firma

`withLatestFrom(v2: O2, v3: O3): OperatorFunction<T, [T, ObservedValueOf<O2>, ObservedValueOf<O3>]>`

### Parámetros

<table>
<tr><td>v2</td><td>Tipo: <code>O2</code>.</td></tr>
<tr><td>v3</td><td>Tipo: <code>O3</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, [T, ObservedValueOf<O2>, ObservedValueOf<O3>]>`

</div>

<div class="overload-section">

### Firma

`withLatestFrom(v2: O2, v3: O3, v4: O4): OperatorFunction<T, [T, ObservedValueOf<O2>, ObservedValueOf<O3>, ObservedValueOf<O4>]>`

### Parámetros

<table>
<tr><td>v2</td><td>Tipo: <code>O2</code>.</td></tr>
<tr><td>v3</td><td>Tipo: <code>O3</code>.</td></tr>
<tr><td>v4</td><td>Tipo: <code>O4</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, [T, ObservedValueOf<O2>, ObservedValueOf<O3>, ObservedValueOf<O4>]>`

</div>

<div class="overload-section">

### Firma

`withLatestFrom(v2: O2, v3: O3, v4: O4, v5: O5): OperatorFunction<T, [T, ObservedValueOf<O2>, ObservedValueOf<O3>, ObservedValueOf<O4>, ObservedValueOf<O5>]>`

### Parámetros

<table>
<tr><td>v2</td><td>Tipo: <code>O2</code>.</td></tr>
<tr><td>v3</td><td>Tipo: <code>O3</code>.</td></tr>
<tr><td>v4</td><td>Tipo: <code>O4</code>.</td></tr>
<tr><td>v5</td><td>Tipo: <code>O5</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, [T, ObservedValueOf<O2>, ObservedValueOf<O3>, ObservedValueOf<O4>, ObservedValueOf<O5>]>`

</div>

<div class="overload-section">

### Firma

`withLatestFrom(v2: O2, v3: O3, v4: O4, v5: O5, v6: O6): OperatorFunction<T, [T, ObservedValueOf<O2>, ObservedValueOf<O3>, ObservedValueOf<O4>, ObservedValueOf<O5>, ObservedValueOf<O6>]>`

### Parámetros

<table>
<tr><td>v2</td><td>Tipo: <code>O2</code>.</td></tr>
<tr><td>v3</td><td>Tipo: <code>O3</code>.</td></tr>
<tr><td>v4</td><td>Tipo: <code>O4</code>.</td></tr>
<tr><td>v5</td><td>Tipo: <code>O5</code>.</td></tr>
<tr><td>v6</td><td>Tipo: <code>O6</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, [T, ObservedValueOf<O2>, ObservedValueOf<O3>, ObservedValueOf<O4>, ObservedValueOf<O5>, ObservedValueOf<O6>]>`

</div>

<div class="overload-section">

### Firma

`withLatestFrom(...observables: any[]): OperatorFunction<T, R>`

### Parámetros

<table>
<tr><td>observables</td><td>Tipo: <code>any[]</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, R>`

</div>

<div class="overload-section">

### Firma

`withLatestFrom(array: any[]): OperatorFunction<T, R>`

### Parámetros

<table>
<tr><td>array</td><td>Tipo: <code>any[]</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, R>`

</div>

<div class="overload-section">

### Firma

`withLatestFrom(array: any[], project: (...values: any[]) => R): OperatorFunction<T, R>`

### Parámetros

<table>
<tr><td>array</td><td>Tipo: <code>any[]</code>.</td></tr>
<tr><td>project</td><td>Tipo: <code>(...values: any[]) => R</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, R>`

</div>

</div>
</details>

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/withLatestFrom.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/withLatestFrom">Documentación oficial en inglés</a>
