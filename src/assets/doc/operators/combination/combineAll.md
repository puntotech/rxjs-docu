# combineAll

<h2 class="subtitle">Convierte un Observable de orden superior en uno de primer orden aplicando <a href="/operators/combination/combineLatest">combineLatest</a> cuando el Observable de orden superior se completa</h2>

<details>
<summary>Signatura</summary>

### Firma

`combineAll<T, R>(project?: (...values: any[]) => R): OperatorFunction<T, R>`

### Parámetros

<table>
<tr><td>project</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>(...values: any[]) => R</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<T, R>`

</details>

## Descripción

<img src="assets/images/marble-diagrams/join-creation/combineAll.png" alt="Diagrama de canicas del operador combineAll">

`combineAll` recibe un Observable de Observables y recoge todos los Observables que contenga. Una vez que el Observable externo se haya completado, se suscribe a todos los Observables recogidos y combina sus valores mediante la estrategia `combineLatest`, de manera que:

- Cada vez que un Observable interno emite, el Observable resultante emite.
- Cuando el Observable retornado emite, emite todos los valores recientes de manera que:
  - Si se proporciona una función `project`, se llama a dicha función con cada valor de cada Observable interno en el orden en el que llegaron, y el resultado de la función de proyección es lo que se emite en el Observable resultante.
  - Si no se proporciona una función `project`, el Observable resultante emite un array de todos los valores recientes.

## Ejemplos

**combineAll espera a recibir todos los valores, y los combina en un array**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-combineall-1?file=index.ts">StackBlitz</a>

```javascript
import { of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { map, delay, combineAll } from "rxjs/operators";

const pokemonId$ = of(1, 5, 6);

function getPokemonName(id: number) {
  return ajax.getJSON(`https://pokeapi.co/api/v2/pokemon/${id}`).pipe(
    map(({ name }) => name),
    delay(2000)
  );
}

pokemonId$
  .pipe(
    map((id) => getPokemonName(id)),
    combineAll()
  )
  .subscribe(console.log);
// Salida: (2s) ['bulbasaur', 'charmeleon', 'charizard']
```

### Ejemplo de la documentación oficial

**Proyectar dos eventos click sobre un Observable intervalo, y aplicar combineAll**

```javascript
import { fromEvent, interval } from "rxjs";
import { map, combineAll, take } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const higherOrder = clicks.pipe(
  map((ev) => interval(Math.random() * 2000).pipe(take(3))),
  take(2)
);
const result = higherOrder.pipe(combineAll());

result.subscribe((x) => console.log(x));
```

<details>
<summary>Sobrecargas</summary>
<div class="overload-container">

<div class="overload-section">

### Firma

`combineAll(): OperatorFunction<ObservableInput<T>, T[]>`

### Parámetros

No recibe ningún parámetro.

### Retorna

`OperatorFunction<ObservableInput<T>, T[]>`

</div>

<div class="overload-section">

### Firma

`combineAll(): OperatorFunction<any, T[]>`

### Parámetros

No recibe ningún parámetro.

### Retorna

`OperatorFunction<any, T[]>`

</div>

<div class="overload-section">

### Firma

`combineAll(project: (...values: T[]) => R): OperatorFunction<ObservableInput<T>, R>`

### Parámetros

<table>
<tr><td>project</td><td>Tipo: <code>(...values: T[]) => R</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<ObservableInput<T>, R>`

</div>

<div class="overload-section">

### Firma

`combineAll(project: (...values: any[]) => R): OperatorFunction<any, R>`

### Parámetros

<table>
<tr><td>project</td><td>Tipo: <code>(...values: any[]) => R</code>.</td></tr>
</table>

### Retorna

`OperatorFunction<any, R>`

</div>
</div>
</details>

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/combineAll.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/combineAll">Documentación oficial en inglés</a>
