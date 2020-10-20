# switchAll

<h2 class="subtitle">Convierte un Observable de orden superior en uno de primer orden, produciendo valores únicamente de la secuencia Observable más reciente</h2>

<details>
<summary>Signatura</summary>

### Firma

`switchAll<T>(): OperatorFunction<ObservableInput<T>, T>`

### Parámetros

No recibe ningún parámetro.

### Retorna

`OperatorFunction<ObservableInput<T>, T>`

</details>

## Descripción

Convierte un Observable de orden superior en uno de primer orden.

<img src="assets/images/marble-diagrams/join-creation/switchAll.png" alt="Diagrama de canicas del operador switchAll">

switchAll se suscribe a un Observable de Observables, también conocido como un "Observable de orden superior" (o `Observable<Observable<T>>`.) Se suscribe al 'Observable interno' emitido por la fuente más reciente, cancelando la suscripción al Observable interno anterior, de manera que únicamente puede haber una suscripción a un Observable interno: al más reciente. El Observable resultante retornado por switchAll solo se completa si el Observable fuente se completa, y si el Observable interno suscrito también se completa.

## Ejemplos

### Ejemplo de la documentación oficial

**Generar un Observable intervalo nuevo con cada click**

Con cada nuevo click, el intervalo anterior se cancela y el nuevo intervalo es suscrito.

```javascript
import { fromEvent, interval } from "rxjs";
import { switchAll, map, tap } from "rxjs/operators";

const clicks = fromEvent(document, "click").pipe(
  tap(() => console.log("click"))
);
const source = clicks.pipe(map((ev) => interval(1000)));

source.pipe(switchAll()).subscribe((x) => console.log(x));

// Salida: (click) 1, 2, 3, 4... (click) 1, 2, 3... (click) ...
```

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/switchAll.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/switchAll">Documentación oficial en inglés</a>
