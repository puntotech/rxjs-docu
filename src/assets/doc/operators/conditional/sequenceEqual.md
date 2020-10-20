# sequenceEqual

<h2 class="subtitle"> Compara secuencialmente todos los valores emitidos por dos Observables utilizando una función de comparación (opcional) y retorna un Observable que emite un solo valor booleano en función de si las dos secuencias son o no iguales.
</h2>

<details>
<summary>Signatura</summary>

### Firma

`sequenceEqual<T>(compareTo: Observable<T>, comparator?: (a: T, b: T) => boolean): OperatorFunction<T, boolean>`

### Parámetros

<table>
<tr><td>compareTo</td><td>La secuencia observable con la que se compara la secuencia fuente.</td></tr>
<tr><td>comparator</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Una función opcional para comparar cada par de valores.</td></tr>
</table>

### Retorna

`OperatorFunction<T, boolean>`: Un Observable que emite un solo valor booleano representando si los valores emitidos por ambos Observables son iguales, en el mismo orden.

</details>

## Descripción

Comprueba si todos los valores emitidos por ambos Observables son los mismos, en el mismo orden.

<img class="marble-diagram" src="assets/images/marble-diagrams/conditional-boolean/sequenceEqual.md" alt="Diagrama de canicas del operador sequenceEqual">

`sequenceEqual` se suscribe a dos Observables diferentes y almacena los valores emitidos por cada Observable en un búfer. Cuando cualquiera de los Observables emita un valor, dicho valor se almacena, los búferes se desplazan y se comparan desde abajo hacia arriba; si hay algún par de valores que no sean iguales, el Observable retornado emitirá falso y se completará. Si alguno de los Observables se completa, el operador esperará a que el otro también se complete. Si el otro Observable emite antes de completarse, el Observable retornado emitirá falso y se completará. Si un Observable nunca se completa ni emite después de que el otro se complete, el Observable retornado nunca se completará.

[REVISAR]
subscribes to two observables and buffers incoming values from each observable. Whenever either observable emits a value, the value is buffered and the buffers are shifted and compared from the bottom up; If any value pair doesn't match, the returned observable will emit false and complete. If one of the observables completes, the operator will wait for the other observable to complete; If the other observable emits before completing, the returned observable will emit false and complete. If one observable never completes or emits after the other complets, the returned observable will never complete.

## Ejemplos

Averiguar si la secuencia tecleada se corresponde con el código Konami

```javascript
import { from, fromEvent } from "rxjs";
import { sequenceEqual, bufferCount, mergeMap, map } from "rxjs/operators";

const codes = from([
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
  "Enter", // Obviamente, no tenemos la tecla start
]);

const keys = fromEvent(document, "keyup").pipe(map((e) => e.code));
const matches = keys.pipe(
  bufferCount(11, 1),
  mergeMap((last11) => from(last11).pipe(sequenceEqual(codes)))
);
matches.subscribe((matched) =>
  console.log("Successful cheat at Contra? ", matched)
);
```

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/sequenceEqual.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/sequenceEqual">Documentación oficial en inglés</a>
