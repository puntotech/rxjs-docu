# tap

### Lleva a cabo un efecto colateral en cada emisión del Observable fuente, pero retorna un Observable que es idéntico a la fuente

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

### Descripción

Intercepta cada emisión de la fuente y ejecuta una función. Retorna un Observable idéntico a la fuente siempre y cuando no ocurra ningún error.

Returns a mirrored Observable of the source Observable, but modified so that the provided Observer is called to perform a side effect for every value, error, and completion emitted by the source. Any errors that are thrown in the aforementioned Observer or handlers are safely sent down the error path of the output Observable.

Retorna un Observable reflejo del Observable fuente, modificado para que el Observador que se le haya proporcionado al operador pueda ser llamado para llevar a cabo un efecto colateral para cada valor, error o compleción emitidos por el Observable fuente. Si se produce cualquier error en Observador/manejadores mencionados anteriormente, este se envía de forma segura por el canal de error del Observable de salida.

Este operador es muy útil para depurar Observables (ver si el valor emitido es correcto) o para llevar a cabo cualquier tipo de efecto colateral.

Nota: este operador es diferente al `subscribe` del Observable. Si no se realiza una suscripción al Observable retornado por `tap`, los efectos colaterales que se hayan especificado no ocurrirán nunca. Por tanto, `tap` simplemente espía en la ejecución existente, en lugar de disparar una ejecución como hace `subscribe`.

this is different to a subscribe on the Observable. If the Observable returned by tap is not subscribed, the side effects specified by the Observer will never happen. tap therefore simply spies on existing execution, it does not trigger an execution to happen like subscribe does.

## Ejemplos

Hacer un `console.log` para ver el antes y el después de una operación map

[StackBlitz](https://stackblitz.com/edit/rxjs-tap-1?file=index.ts)

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

Actualizar una variable externa con la respuesta de una petición

[StackBlitz](https://stackblitz.com/edit/rxjs-tap-2?file=index.ts)

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

### de la documentación oficial

Proyecta cada click a su posición `clientX`, después de hacer un `console.log` del evento click completo

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

## Sobrecargas

`tap(next: null, error: null, complete: () => void): MonoTypeOperatorFunction<T>`

### Parámetros

<table>
<tr><td>next</td><td>Tipo: <code>null</code>.</td></tr>
<tr><td>error</td><td>Tipo: <code>null</code>.</td></tr>
<tr><td>complete</td><td>Tipo: <code>() => void</code>.</td></tr>
</table>

### Retorna

`MonoTypeOperatorFunction<T>`

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

`tap(next: (value: T) => void, error: null, complete: () => void): MonoTypeOperatorFunction<T>`

### Parámetros

<table>
<tr><td>next</td><td>Tipo: <code>(value: T) => void</code>.</td></tr>
<tr><td>error</td><td>Tipo: <code>null</code>.</td></tr>
<tr><td>complete</td><td>Tipo: <code>() => void</code>.</td></tr>
</table>

### Retorna

`MonoTypeOperatorFunction<T>`

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

`tap(observer: PartialObserver<T>): MonoTypeOperatorFunction<T>`

### Parámetros

<table>
<tr><td>observer</td><td>Tipo: <code>PartialObserver</code>.</td></tr>
</table>

### Retorna

`MonoTypeOperatorFunction<T>`

- [Documentación oficial en inglés](https://rxjs-dev.firebaseapp.com/api/operators/tap)
- [Código fuente](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/tap.ts)
