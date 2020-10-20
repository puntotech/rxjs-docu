# tap

<h2 class="subtitle"> Lleva a cabo un efecto colateral en cada emisión del Observable fuente, pero retorna un Observable que es idéntico a la fuente
</h2>

<details>
<summary>Signatura</summary>

### Firma

`tap<T>(nextOrObserver?: NextObserver<T> | ErrorObserver<T> | CompletionObserver<T> | ((x: T) => void), error?: (e: any) => void, complete?: () => void): MonoTypeOperatorFunction<T>`

### Parámetros

<table>
<tr><td>nextOrObserver</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Un objeto Observador normal o una función *callback* para <code>next</code>.</td></tr>
<tr><td>error</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Función *callback* para los errores de la fuente.</td></tr>
<tr><td>complete</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Callback for the completion of the source.</td></tr>
</table>

### Retorna

`MonoTypeOperatorFunction<T>`: Un Observable idéntico a la fuente, pero ejecuta el Observador o la/las callbacks en cada emisión.

</details>

## Descripción

Intercepta cada emisión de la fuente y ejecuta una función. Retorna un Observable idéntico a la fuente siempre y cuando no ocurra ningún error.

Retorna un Observable que refleja al Observable fuente, pero modificado de tal manera para que el Observador que se le haya proporcionado al operador pueda ser llamado para llevar a cabo un efecto colateral por cada valor, error o completación emitidos por el Observable fuente. Si se produce cualquier error en Observador/manejadores mencionados anteriormente, este se envía de forma segura por el canal de error del Observable de salida.

Este operador es muy útil para depurar Observables (ver si el valor emitido es correcto) o para llevar a cabo cualquier tipo de efecto colateral.

Nota: este operador es diferente al `subscribe` del Observable. Si no se realiza una suscripción al Observable retornado por `tap`, los efectos colaterales que se hayan especificado no ocurrirán nunca. Por tanto, `tap` se limita a espiar a la ejecución existente, en lugar de disparar una ejecución como hace `subscribe`.

## Ejemplos

**Hacer un console.log para ver el antes y el después de una operación map**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-tap-1?file=index.ts">StackBlitz</a>

```javascript
import { of } from "rxjs";
import { map, tap } from "rxjs/operators";

const fruit$ = of("Cereza", "Fresa", "Arándano");

fruit$
  .pipe(
    tap((fruit) => console.log(`Antes: ${fruit}`)),
    map((fruit) => fruit.toUpperCase()),
    tap((fruit) => console.log(`Después: ${fruit}`))
  )
  .subscribe();

/* Salida:
Antes: Cereza, Después: CEREZA,
Antes: Fresa, Después: FRESA,
Antes: Arándano, Después: ARÁNDANO
*/
```

**Actualizar una variable externa con la respuesta de una petición**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-tap-2?file=index.ts">StackBlitz</a>

```javascript
import { tap, map, concatMap } from "rxjs/operators";
import { of } from "rxjs";
import { ajax } from "rxjs/ajax";

const pokemonId$ = of(3, 5, 6);
let pokedex = [];

function getPokemonName(id: number) {
  return ajax.getJSON(`https://pokeapi.co/api/v2/pokemon/${id}`).pipe(
    tap((pokemonData) => (pokedex = [...pokedex, pokemonData])),
    map(({ name }) => name)
  );
}

pokemonId$.pipe(concatMap((id) => getPokemonName(id))).subscribe(console.log, console.error, () => {
    console.log(pokedex));
// Output: venusaur, charmeleon, charizard, [{}, {}, {}]
```

### Ejemplo de la documentación oficial

**Proyecta cada click a su posición clientX, después de hacer un console.log del evento click completo**

```javascript
import { fromEvent } from "rxjs";
import { tap, map } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const positions = clicks.pipe(
  tap((ev) => console.log(ev)),
  map((ev) => ev.clientX)
);
positions.subscribe((x) => console.log(x));
```

<details>
<summary>Sobrecargas</summary>
<div class="overload-container">

<div class="overload-section">

### Firma

`tap(next: null, error: null, complete: () => void): MonoTypeOperatorFunction<T>`

### Parámetros

<table>
<tr><td>next</td><td>Tipo: <code>null</code>.</td></tr>
<tr><td>error</td><td>Tipo: <code>null</code>.</td></tr>
<tr><td>complete</td><td>Tipo: <code>() => void</code>.</td></tr>
</table>

### Retorna

`MonoTypeOperatorFunction<T>`

</div>

<div class="overload-section">

### Firma

`tap(next: null, error: (error: any) => void, complete?: () => void): MonoTypeOperatorFunction<T>`

### Parámetros

<table>
<tr><td>next</td><td>Tipo: null.</td></tr>
<tr><td>error</td><td>Tipo: (error: any) => void.</td></tr>
<tr><td>complete</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>() => void</code>.</td></tr>
</table>

### Retorna

`MonoTypeOperatorFunction<T>`

</div>

<div class="overload-section">

### Firma

`tap(next: (value: T) => void, error: null, complete: () => void): MonoTypeOperatorFunction<T>`

### Parámetros

<table>
<tr><td>next</td><td>Tipo: <code>(value: T) => void</code>.</td></tr>
<tr><td>error</td><td>Tipo: <code>null</code>.</td></tr>
<tr><td>complete</td><td>Tipo: <code>() => void</code>.</td></tr>
</table>

### Retorna

`MonoTypeOperatorFunction<T>`

</div>

<div class="overload-section">

### Firma

`tap(next?: (x: T) => void, error?: (e: any) => void, complete?: () => void): MonoTypeOperatorFunction<T>`

### Parámetros

<table>
<tr><td>next</td><td>Opcional. El valor por defecto es <code>undefined</code>.

Tipo: <code>(x: T) => void</code>.</td></tr>

<tr><td>error</td><td>Opcional. El valor por defecto es <code>undefined</code>.

Tipo: <code>(e: any) => void</code>.</td></tr>

<tr><td>complete</td><td>Opcional. El valor por defecto es <code>undefined</code>.

Tipo: <code>() => void</code>.</td></tr>

</table>

### Retorna

`MonoTypeOperatorFunction<T>`

</div>

<div class="overload-section">

### Firma

`tap(observer: PartialObserver<T>): MonoTypeOperatorFunction<T>`

### Parámetros

<table>
<tr><td>observer</td><td>Tipo: <code>PartialObserver</code>.</td></tr>
</table>

### Retorna

`MonoTypeOperatorFunction<T>`

</div>

</div>
</details>

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/tap.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/tap">Documentación oficial en inglés</a>
