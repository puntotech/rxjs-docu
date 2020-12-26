# concatAll

<h2 class="subtitle"> Convierte un Observable de orden superior en uno de primer orden concatenando los Observables internos en orden
</h2>

<details>
<summary>Signatura</summary>

### Firma

`concatAll<T>(): OperatorFunction<ObservableInput<T>, T>`

### Parámetros

No recibe ningún parámetro.

### Retorna

`OperatorFunction<ObservableInput<T>, T>`: Un Observable que emite los valores emitidos por los Observables internos concatenados.

</details>

## Descripción

Convierte un Observable de orden superior en uno de primer orden concatenando los Observables internos uno detrás de otro.

<img src="assets/images/marble-diagrams/join-creation/concatAll.png" alt="Diagrama de canicas del operador concatAll">

Concatena cada Observable emitido por la fuente (un Observable de orden superior), de forma secuencial. Se suscribe a cada Observable interno si, y solo si, el Observable interno anterior se ha completado, y emite todos sus valores en el Observable resultante.

Advertencia: Si el Observable fuente emite Observables de forma rápida e indefinida, y los Observables internos que emite se completan más lento de lo que la fuente emite valores, se pueden dar problemas de memoria al almacenarse los Observables internos en un búfer infinito.

💡 `concatAll` es equivalente a `mergeAll` con un parámetro de concurrencia de valor 1.

## Ejemplos

**concatAll se suscribe a cada Observable interno si, y solo si, el Observable interno anterior se ha completado. Esto implica que espera a que cada petición esté terminada antes de hacer una nueva**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-concatall-1?file=index.ts">StackBlitz</a>

```javascript
import { concatAll, map, delay } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import { of } from "rxjs";

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
    concatAll()
  )
  .subscribe(console.log);
// Salida: (2s) bulbasaur, (2s) charmeleon, (2s) charizard
```

### Ejemplo de la documentación oficial

**Por cada evento click, emitir los números del 0 al 3 a intervalos de 1s, sin concurrencia**

```javascript
import { fromEvent, interval } from "rxjs";
import { map, take, concatAll } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const higherOrder = clicks.pipe(map((ev) => interval(1000).pipe(take(4))));
const firstOrder = higherOrder.pipe(concatAll());
firstOrder.subscribe((x) => console.log(x));

// Salida:
// (Los resultados no son concurrentes)
// Por cada click en el "document" se emitirán los números del 0 al 3 a intervalos de 1s
// Un click = 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3
```

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/concatAll.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/concatAll">Documentación oficial en inglés</a>
