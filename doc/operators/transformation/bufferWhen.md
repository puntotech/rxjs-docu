# bufferWhen

## Almacena valores y utiliza una función factoría de Observables para determinar cuándo cerrar, emitir y reiniciar el búfer

<details>

<summary>Signatura</summary>

#### Firma

`bufferWhen<T>(closingSelector: () => Observable<any>): OperatorFunction<T, T[]>`

#### Parámetros

#### Retorna

`OperatorFunction<T, T[]>`: Un Observable de arrays de valores almacenados.

</details>

## Descripción

Almacena valores en un array. Cuando comienza a almacenar valores, llama a una función que retorna un Observable que indica cuándo cerrar el búfer actual y abrir uno nuevo, para seguir almacenando valores.

![Diagrama de canicas del operador bufferWhen](assets/images/marble-diagrams/transformation/bufferWhen.png)

Abre un búfer de forma inmediata, que cierra cuando el Observable retornado por la función `closingSelector` emite un valor. En cuanto se cierra un búfer, se abre uno nuevo y se repite el proceso.

## Ejemplos

**Almacenar valores durante periodos de 4 segundos**

[StackBlitz](https://stackblitz.com/edit/rxjs-bufferwhen-1?file=index.ts)

```javascript
import { bufferWhen } from "rxjs/operators";
import { interval } from "rxjs";

const number$ = interval(1000);

number$.pipe(bufferWhen(() => interval(4000))).subscribe(console.log);
// Salida: [0, 1, 2], [3, 4, 5, 6], [7, 8, 9, 10]...
```

**Almacenar valores hasta que se haga click**

[StackBlitz](https://stackblitz.com/edit/rxjs-bufferwhen-2?file=index.ts)

```javascript
import { bufferWhen } from "rxjs/operators";
import { interval, fromEvent } from "rxjs";

const number$ = interval(1000);
const click$ = fromEvent < MouseEvent > (document, "click");

number$.pipe(bufferWhen(() => click$)).subscribe(console.log);
// Salida: (click ) [0, 1, 2, 3, 4] (click) [5, 6]...
```

### Ejemplos de la documentación oficial

**Emite un array de clicks cada \[1-5] segundos**

```javascript
import { fromEvent, interval } from "rxjs";
import { bufferWhen } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const buffered = clicks.pipe(
  bufferWhen(() => interval(1000 + Math.random() * 4000))
);
buffered.subscribe((x) => console.log(x));
```

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/bufferWhen.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/operators/bufferWhen)
