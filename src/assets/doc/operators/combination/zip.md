# zip

<h2 class="subtitle"> Combina varios Observables para crear otro Observable cuyos valores se calculen a partir de las emisiones, en orden, de cada uno de sus Observables de entrada
</h2>

<details>
<summary>Signatura</summary>

### Firma

`zip<O extends ObservableInput<any>, R>(...observables: (O | ((...values: ObservedValueOf<O>[]) => R))[]): Observable<ObservedValueOf<O>[] | R>`

### Parámetros

<table>
<tr><td>observables</td><td>Tipo: <code>(O | ((...values: ObservedValueOf[]) => R))[]</code>.</td></tr>
</table>

### Retorna

`Observable<ObservedValueOf<O>[] | R>`

</details>

## Descripción

Si el último parámetro es una función, esta se utiliza para computar el valor creado a partir de los valores de entrada. Si no, se retorna un array de los valores de entrada.

## Ejemplos

**Esperar a que dos Observables emitan un valor, y emitir ambos valores en un array**

<a target="_blank" href="https://stackblitz.com/edit/docu-rxjs-zip?file=index.ts">StackBlitz</a>

```javascript
import { zip, timer } from "rxjs";
import { mapTo } from "rxjs/operators";

const hello$ = timer(2000).pipe(mapTo("Hello"));
const world$ = timer(4000).pipe(mapTo("World"));

zip(hello$, world$).subscribe(console.log);
// Salida: ['Hello', 'World']
```

**Al combinarlo con interval (o timer), zip puede utilizarse para emitir los valores de un Observable cada cierto tiempo.**
**Ej: Emitir una cadena cada vez que interval emite (cada segundo)**

<a target="_blank" href="https://stackblitz.com/edit/docu-rxjs-zip-2?file=index.ts">StackBlitz</a>

```javascript
import { from, interval, zip } from "rxjs";
import { map } from "rxjs/operators";

const framework$ = zip(from(["Angular", "React", "Vue"]), interval(1000)).pipe(
  map(([framework]) => framework)
);

framework$.subscribe(console.log);
// Salida: (1s) Angular (1s) React (1s) Vue
```

### Ejemplo de la documentación oficial

**Combinar la edad y el nombre de distintas fuentes**

```javascript
import { zip, of } from "rxjs";
import { map } from "rxjs/operators";

let age$ = of < number > (27, 25, 29);
let name$ = of < string > ("Foo", "Bar", "Beer");
let isDev$ = of < boolean > (true, true, false);

zip(age$, name$, isDev$)
  .pipe(map(([age, name, isDev]) => ({ age, name, isDev })))
  .subscribe((x) => console.log(x));

// Salida
// { age: 27, name: 'Foo', isDev: true }
// { age: 25, name: 'Bar', isDev: true }
// { age: 29, name: 'Beer', isDev: false }
```

<details>
<summary>Sobrecargas</summary>
<div class="overload-container">

<div class="overload-section">

### Firma

`zip(v1: O1, resultSelector: (v1: ObservedValueOf<O1>) => R): Observable<R>`

### Parámetros

<table>
<tr><td>v1</td><td>Tipo: <code>O1</code>.</td></tr>
<tr><td>resultSelector</td><td>Tipo: <code>(v1: ObservedValueOf) => R</code>.</td></tr>
</table>

### Retorna

`Observable<R>`

</div>

<div class="overload-section">

### Firma

`zip(v1: O1, v2: O2, resultSelector: (v1: ObservedValueOf<O1>, v2: ObservedValueOf<O2>) => R): Observable<R>`

### Parámetros

<table>
<tr><td>v1</td><td>Tipo: <code>O1</code>.</td></tr>
<tr><td>v2</td><td>Tipo: <code>O2</code>.</td></tr>
<tr><td>resultSelector</td><td>Tipo: <code>(v1: ObservedValueOf, v2: ObservedValueOf) => R</code>.</td></tr>
</table>

### Retorna

`Observable<R>`

</div>

<div class="overload-section">

### Firma

`zip(v1: O1, v2: O2, v3: O3, resultSelector: (v1: ObservedValueOf<O1>, v2: ObservedValueOf<O2>, v3: ObservedValueOf<O3>) => R): Observable<R>`

### Parámetros

<table>
<tr><td>v1</td><td>Tipo: <code>O1</code>.</td></tr>
<tr><td>v2</td><td>Tipo: <code>O2</code>.</td></tr>
<tr><td>v3</td><td>Tipo: <code>O3</code>.</td></tr>
<tr><td>resultSelector</td><td>Tipo: <code>(v1: ObservedValueOf, v2: ObservedValueOf, v3: ObservedValueOf) => R</code>.</td></tr>
</table>

### Retorna

`Observable<R>`

</div>

<div class="overload-section">

### Firma

`zip(v1: O1, v2: O2, v3: O3, v4: O4, resultSelector: (v1: ObservedValueOf<O1>, v2: ObservedValueOf<O2>, v3: ObservedValueOf<O3>, v4: ObservedValueOf<O4>) => R): Observable<R>`

### Parámetros

<table>
<tr><td>v1</td><td>Tipo: <code>O1</code>.</td></tr>
<tr><td>v2</td><td>Tipo: <code>O2</code>.</td></tr>
<tr><td>v3</td><td>Tipo: <code>O3</code>.</td></tr>
<tr><td>v4</td><td>Tipo: <code>O4</code>.</td></tr>
<tr><td>resultSelector</td><td>Tipo: <code>(v1: ObservedValueOf, v2: ObservedValueOf, v3: ObservedValueOf, v4: ObservedValueOf) => R</code>.</td></tr>
</table>

### Retorna

`Observable<R>`

</div>

<div class="overload-section">

### Firma

`zip(v1: O1, v2: O2, v3: O3, v4: O4, v5: O5, resultSelector: (v1: ObservedValueOf<O1>, v2: ObservedValueOf<O2>, v3: ObservedValueOf<O3>, v4: ObservedValueOf<O4>, v5: ObservedValueOf<O5>) => R): Observable<R>`

### Parámetros

<table>
<tr><td>v1</td><td>Tipo: <code>O1</code>.</td></tr>
<tr><td>v2</td><td>Tipo: <code>O2</code>.</td></tr>
<tr><td>v3</td><td>Tipo: <code>O3</code>.</td></tr>
<tr><td>v4</td><td>Tipo: <code>O4</code>.</td></tr>
<tr><td>v5</td><td>Tipo: <code>O5</code>.</td></tr>
<tr><td>resultSelector</td><td>Tipo: <code>(v1: ObservedValueOf, v2: ObservedValueOf, v3: ObservedValueOf, v4: ObservedValueOf, v5: ObservedValueOf) => R</code>.</td></tr>
</table>

### Retorna

`Observable<R>`

</div>

<div class="overload-section">

### Firma

`zip(v1: O1, v2: O2, v3: O3, v4: O4, v5: O5, v6: O6, resultSelector: (v1: ObservedValueOf<O1>, v2: ObservedValueOf<O2>, v3: ObservedValueOf<O3>, v4: ObservedValueOf<O4>, v5: ObservedValueOf<O5>, v6: ObservedValueOf<O6>) => R): Observable<R>`

### Parámetros

<table>
<tr><td>v1</td><td>Tipo: <code>O1</code>.</td></tr>
<tr><td>v2</td><td>Tipo: <code>O2</code>.</td></tr>
<tr><td>v3</td><td>Tipo: <code>O3</code>.</td></tr>
<tr><td>v4</td><td>Tipo: <code>O4</code>.</td></tr>
<tr><td>v5</td><td>Tipo: <code>O5</code>.</td></tr>
<tr><td>v6</td><td>Tipo: <code>O6</code>.</td></tr>
<tr><td>resultSelector</td><td>Tipo: <code>(v1: ObservedValueOf, v2: ObservedValueOf, v3: ObservedValueOf, v4: ObservedValueOf, v5: ObservedValueOf, v6:</code> ObservedValueOf) => R.</td></tr>
</table>

### Retorna

`Observable<R>`

</div>

<div class="overload-section">

### Firma

`zip(v1: O1, v2: O2): Observable<[ObservedValueOf<O1>, ObservedValueOf<O2>]>`

### Parámetros

<table>
<tr><td>v1</td><td>Tipo: <code>O1</code>.</td></tr>
<tr><td>v2</td><td>Tipo: <code>O2</code>.</td></tr>
</table>

### Retorna

`Observable<[ObservedValueOf<O1>, ObservedValueOf<O2>]>`

</div>

<div class="overload-section">

### Firma

`zip(v1: O1, v2: O2, v3: O3): Observable<[ObservedValueOf<O1>, ObservedValueOf<O2>, ObservedValueOf<O3>]>`

### Parámetros

<table>
<tr><td>v1</td><td>Tipo: <code>O1</code>.</td></tr>
<tr><td>v2</td><td>Tipo: <code>O2</code>.</td></tr>
<tr><td>v3</td><td>Tipo: <code>O3</code>.</td></tr>
</table>

### Retorna

`Observable<[ObservedValueOf<O1>, ObservedValueOf<O2>, ObservedValueOf<O3>]>`

</div>

<div class="overload-section">

### Firma

`zip(v1: O1, v2: O2, v3: O3, v4: O4): Observable<[ObservedValueOf<O1>, ObservedValueOf<O2>, ObservedValueOf<O3>, ObservedValueOf<O4>]>`

### Parámetros

<table>
<tr><td>v1</td><td>Tipo: <code>O1</code>.</td></tr>
<tr><td>v2</td><td>Tipo: <code>O2</code>.</td></tr>
<tr><td>v3</td><td>Tipo: <code>O3</code>.</td></tr>
<tr><td>v4</td><td>Tipo: <code>O4</code>.</td></tr>
</table>

### Retorna

`Observable<[ObservedValueOf<O1>, ObservedValueOf<O2>, ObservedValueOf<O3>, ObservedValueOf<O4>]>`

</div>

<div class="overload-section">

### Firma

zip(v1: O1, v2: O2, v3: O3, v4: O4, v5: O5): Observable<[ObservedValueOf<O1>, ObservedValueOf<O2>, ObservedValueOf<O3>, `ObservedValueOf<O4>, ObservedValueOf<O5>]>`

### Parámetros

<table>
<tr><td>v1</td><td>Tipo: <code>O1</code>.</td></tr>
<tr><td>v2</td><td>Tipo: <code>O2</code>.</td></tr>
<tr><td>v3</td><td>Tipo: <code>O3</code>.</td></tr>
<tr><td>v4</td><td>Tipo: <code>O4</code>.</td></tr>
<tr><td>v5</td><td>Tipo: <code>O5</code>.</td></tr>
</table>

### Retorna

`Observable<[ObservedValueOf<O1>, ObservedValueOf<O2>, ObservedValueOf<O3>, ObservedValueOf<O4>, ObservedValueOf<O5>]>`

</div>

<div class="overload-section">

### Firma

`zip(v1: O1, v2: O2, v3: O3, v4: O4, v5: O5, v6: O6): Observable<[ObservedValueOf<O1>, ObservedValueOf<O2>, ObservedValueOf<O3>, ObservedValueOf<O4>, ObservedValueOf<O5>, ObservedValueOf<O6>]>`

### Parámetros

<table>
<tr><td>v1</td><td>Tipo: <code>O1</code>.</td></tr>
<tr><td>v2</td><td>Tipo: <code>O2</code>.</td></tr>
<tr><td>v3</td><td>Tipo: <code>O3</code>.</td></tr>
<tr><td>v4</td><td>Tipo: <code>O4</code>.</td></tr>
<tr><td>v5</td><td>Tipo: <code>O5</code>.</td></tr>
<tr><td>v6</td><td>Tipo: <code>O6</code>.</td></tr>
</table>

### Retorna

`Observable<[ObservedValueOf<O1>, ObservedValueOf<O2>, ObservedValueOf<O3>, ObservedValueOf<O4>, ObservedValueOf<O5>, ObservedValueOf<O6>]>`

</div>

<div class="overload-section">

### Firma

`zip(array: O[]): Observable<ObservedValueOf<O>[]>`

### Parámetros

<table>
<tr><td>array</td><td>Tipo: <code>O[]</code>.</td></tr>
</table>

### Retorna

`Observable<ObservedValueOf<O>[]>`

</div>

<div class="overload-section">

### Firma

`zip(array: any[]): Observable<R>`

### Parámetros

<table>
<tr><td>array</td><td>Tipo: <code>any[]</code>.</td></tr>
</table>

### Retorna

`Observable<R>`

</div>

<div class="overload-section">

### Firma

`zip(array: O[], resultSelector: (...values: ObservedValueOf<O>[]) => R): Observable<R>`

### Parámetros

<table>
<tr><td>array</td><td>Tipo: <code>O[]</code>.</td></tr>
<tr><td>resultSelector</td><td>Tipo: <code>(...values: ObservedValueOf[]) => R</code>.</td></tr>
</table>

### Retorna

`Observable<R>`

</div>

<div class="overload-section">

### Firma

`zip(array: any[], resultSelector: (...values: any[]) => R): Observable<R>`

### Parámetros

<table>
<tr><td>array</td><td>Tipo: <code>any[]</code>.</td></tr>
<tr><td>resultSelector</td><td>Tipo: <code>(...values: any[]) => R</code>.</td></tr>
</table>

### Retorna

`Observable<R>`

</div>

<div class="overload-section">

### Firma

`zip(...observables: O[]): Observable<ObservedValueOf<O>[]>`

### Parámetros

<table>
<tr><td>observables</td><td>Tipo: <code>O[]</code>.</td></tr>
</table>

### Retorna

`Observable<ObservedValueOf<O>[]>`

</div>

<div class="overload-section">

### Firma

`zip(...observables: (O | ((...values: ObservedValueOf<O>[]) => R))[]): Observable<R>`

### Parámetros

<table>
<tr><td>observables</td><td>Tipo: <code>(O | ((...values: ObservedValueOf[]) => R))[]</code>.</td></tr>
</table>

### Retorna

`Observable<R>`

</div>

<div class="overload-section">

### Firma

`zip(...observables: any[]): Observable<R>`

### Parámetros

<table>
<tr><td>observables</td><td>Tipo: <code>any[]</code>.</td></tr>
</table>

### Retorna

`Observable<R>`

</div>

</div>
</details>

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/zip.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/index/function/zip">Documentación oficial en inglés</a>
