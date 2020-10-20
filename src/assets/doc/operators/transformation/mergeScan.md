# mergeScan

<h2 class="subtitle"> Aplica una función de acumulación al Observable fuente donde la propia función de acumulación retorna un Observable. Cada Observable interno retornado se fusiona con el Observable resultante
</h2>

<details>
<summary>Signatura</summary>

### Firma

`mergeScan<T, R>(accumulator: (acc: R, value: T, index: number) => any, seed: R, concurrent: number = Number.POSITIVE_INFINITY): OperatorFunction<T, R>`

### Parámetros

<table>
<tr><td>accumulator</td><td>La función de acumulación que se aplica a cada valor emitido.</td></tr>
<tr><td>seed</td><td>El valor de acumulación inicial.</td></tr>
<tr><td>concurrent</td><td>Opcional. El valor por defecto es <code>Number.POSITIVE_INFINITY</code>.
El máximo número de Observables internos a los que se suscribe de forma concurrente.</td></tr>
</table>

### Retorna

`OperatorFunction<T, R>`: Un Observable de los valores acumulados.

</details>

## Descripción

Es como `scan`, pero los Observables retornados por el acumulador se fusionan en el Observable resultante.

## Ejemplos

**Contar el número de teclas pulsadas**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-mergescan-1?file=index.ts">StackBlitz</a>

```javascript
import { fromEvent, of } from "rxjs";
import { mapTo, mergeScan } from "rxjs/operators";

const key$ = fromEvent(document, "keydown").pipe(mapTo(1));

key$.pipe(mergeScan((acc, one) => of(acc + one), 0)).subscribe(console.log);
// Salida: (Pulsar tecla) 1, (Pulsar tecla ) 2, (Pulsar tecla) 3...
```

**Acumular el tiempo que esté pulsado el ratón**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-mergescan-2?file=index.ts">StackBlitz</a>

```javascript
import { fromEvent, interval } from "rxjs";
import { mergeScan, takeUntil, map } from "rxjs/operators";

const mouseDown$ = fromEvent(document, "mousedown");
const mouseUp$ = fromEvent(document, "mouseup");

mouseDown$
  .pipe(
    mergeScan(
      (acc, curr) =>
        interval(1000).pipe(
          takeUntil(mouseUp$),
          map((n) => acc + n)
        ),
      0
    )
  )
  .subscribe(console.log, console.error);
// Salida: (ratón pulsado 5s) 0, 1, 2, 3, 4 (ratón pulsado 2s) 4, 5, 6...
```

### Ejemplo de la documentación oficial

**Contar el número de eventos click**

```javascript
import { fromEvent, of } from "rxjs";
import { mapTo, mergeScan } from "rxjs/operators";

const click$ = fromEvent(document, "click");
const one$ = click$.pipe(mapTo(1));
const seed = 0;
const count$ = one$.pipe(mergeScan((acc, one) => of(acc + one), seed));
count$.subscribe((x) => console.log(x));

// Salida:
// 1
// 2
// 3
// 4
// ...y así sucesivamente para cada click
```

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/mergeScan.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/mergeScan">Documentación oficial en inglés</a>
