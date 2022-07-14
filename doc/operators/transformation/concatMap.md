# concatMap

## Proyecta cada valor emitido por la fuente a un Observable interno que se une al Observable resultante secuencialmente, esperando a que cada Observable interno esté completo antes de unir el siguiente

💡 Se debe utilizar `concatMap` si se quiere esperar a que cada Observable interno esté completo antes de suscribirse al siguiente

<details>

<summary>Signatura</summary>

#### Firma

`concatMap<T, R, O extends ObservableInput<any>>(project: (value: T, index: number) => O, resultSelector?: (outerValue: T, innerValue: ObservedValueOf<O>, outerIndex: number, innerIndex: number) => R): OperatorFunction<T, ObservedValueOf<O> | R>`

#### Parámetros

#### Retorna

`OperatorFunction<T, ObservedValueOf<O> | R>`: Un Observable que emite el resultado de aplicar la función de proyección (y el `resultSelector` opcional que está obsoleto) a cada elemento emitido por el Observable fuente y obtener los valores de cada Observable interno proyectado de forma secuencial.

</details>

## Descripción

Proyecta cada valor a un Observable interno, que posteriormente 'aplasta' usando el operador `concatAll`.

![Diagrama de canicas del operador concatMap](assets/images/marble-diagrams/transformation/concatMap.png)

Retorna un Observable que emite elementos según el resultado de aplicar una función a cada elemento emitido por el Observable fuente, donde dicha función retorna un Observable interno. Cada nuevo Observable interno se concatena con el Observable interno previo.

Advertencia: Si los valores de la fuente se emiten de forma ilimitada, y más rápidamente de lo que sus Observable internos correspondientes pueden completarse, habrá problemas de memoria, ya que los Observables internos se acumularán en un búfer ilimitado esperando que llegue se turno de ser suscritos.

Nota: `concatMap` es equivalente a utilizar `mergeMap`, teniendo el parámetro de concurrencia el valor 1.

## Ejemplos

**Realizar varias peticiones AJAX de forma secuencial. Hasta que cada petición no termine, no se realizará la siguiente**

[StackBlitz](https://stackblitz.com/edit/rxjs-concatmap-1?file=index.ts)

```javascript
import { concatMap, map } from "rxjs/operators";
import { of } from "rxjs";
import { ajax } from "rxjs/ajax";

const pokemonId$ = of(1, 5, 6);

function getPokemonName(id: number) {
  return ajax
    .getJSON(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .pipe(map(({ name }) => name));
}

pokemonId$.pipe(concatMap((id) => getPokemonName(id))).subscribe(console.log);
// Salida: bulbasaur, charmeleon, charizard
```

**Comparación entre mergeMap y concatMap**

concatMap esperará a que cada petición esté completa antes de realizar la siguiente. Esto implica que todas las peticiones se llevarán a cabo de forma consecutiva.

mergeMap no esparará a que cada petición esté completa, sino que las realizará en paralelo. Esto implica que las peticiones NO se llevarán a cabo de forma consecutiva.

[StackBlitz](https://stackblitz.com/edit/rxjs-concatmap-2?file=index.ts)

```javascript
import { concatMap, mergeMap, map, delayWhen } from "rxjs/operators";
import { of, interval } from "rxjs";
import { ajax } from "rxjs/ajax";

const pokemonId$ = of(1, 5, 6);

function getRandomNumber() {
  return Math.floor(Math.random() * 5) + 1;
}

function getPokemonName(id: number) {
  return ajax.getJSON(`https://pokeapi.co/api/v2/pokemon/${id}`).pipe(
    map(({ name }) => name),
    // El resultado de cada petición se retrasará por un periodo aleatorio de tiempo. Esto se hace para poder observar que, al utilizar mergeMap, los resultados de las peticiones se emitirán en un orden aleatorio
    delayWhen((_) => interval(getRandomNumber() * 1000))
  );
}

pokemonId$.pipe(concatMap((id) => getPokemonName(id))).subscribe(console.log);
// Salida: bulbasaur, charmeleon, charizard

// Con mergeMap, el orden de los resultados será aleatorio
pokemonId$.pipe(mergeMap((id) => getPokemonName(id))).subscribe(console.log);
// Salida: charmeleon, bulbasaur, charizard
```

### Ejemplo de la documentación oficial

**Para cada evento click, emitir los valores de 0 a 3 a intervalos de 1 segundo, sin concurrencia**

```javascript
import { fromEvent, interval } from "rxjs";
import { concatMap, take } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const result = clicks.pipe(concatMap((ev) => interval(1000).pipe(take(4))));
result.subscribe((x) => console.log(x));

// Resulta en:
// (los resultados no son concurrentes)
// Por cada click en el documento, se emitirán los valores del 0 al 3 a intervales de 1000ms
// (click) = 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3
```

<details>

<summary>Sobrecargas</summary>

#### Firma

`concatMap(project: (value: T, index: number) => O): OperatorFunction<T, ObservedValueOf<O>>`

#### Parámetros

#### Retorna

`OperatorFunction<T, ObservedValueOf<O>>`

#### Firma

`concatMap(project: (value: T, index: number) => O, resultSelector: undefined): OperatorFunction<T, ObservedValueOf<O>>`

#### Parámetros

#### Retorna

`OperatorFunction<T, ObservedValueOf<O>>`

#### Firma

`concatMap(project: (value: T, index: number) => O, resultSelector: (outerValue: T, innerValue: ObservedValueOf<O>, outerIndex: number, innerIndex: number) => R): OperatorFunction<T, R>`

#### Parámetros

#### Retorna

`OperatorFunction<T, R>`

</details>

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/concatMap.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/operators/concatMap)
