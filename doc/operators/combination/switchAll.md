# switchAll

## Convierte un Observable de orden superior en uno de primer orden, produciendo valores únicamente de la secuencia Observable más reciente

<details>

<summary>Signatura</summary>

#### Firma

`switchAll<T>(): OperatorFunction<ObservableInput<T>, T>`

#### Parámetros

No recibe ningún parámetro.

#### Retorna

`OperatorFunction<ObservableInput<T>, T>`

</details>

## Descripción

Convierte un Observable de orden superior en uno de primer orden.

![Diagrama de canicas del operador switchAll](assets/images/marble-diagrams/join-creation/switchAll.png)

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

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/switchAll.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/operators/switchAll)
