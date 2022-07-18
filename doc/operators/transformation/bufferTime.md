# bufferTime

## Acumula valores del Observable fuente durante un periodo de tiempo

<details>

<summary>Signatura</summary>

#### Firma

`bufferTime<T>(bufferTimeSpan: number): OperatorFunction<T, T[]>`

#### Parámetros

#### Retorna

`OperatorFunction<T, T[]>`: Un Observable de arrays de valores almacenados.

</details>

## Descripción

Almacena valores en un array, y emite esos arrays periódicamente en el tiempo.

![Diagrama de canicas del operador bufferTime](assets/images/marble-diagrams/transformation/bufferTime.png)

Acumula valores de la fuente durante un periodo de tiempo determinado por `bufferTimeSpan`. Si no se proporciona el argumento opcional `bufferCreationInterval`, se emitirá y reseteará el búfer cada `bufferTimeSpan` milisegundos. En el caso de que sí se proporcione, `bufferTime` abrirá y el búfer cada `bufferCreationInterval` milisegundos y lo cerrará (emitiendo y reseteándolo) cada `bufferTimeSpan` milisegundos. Cuando se proporcione el argumento opcional `maxBufferSize`, el búfer se cerrará o cada `buffertimeSpan` milisegundos o cuando alcance el tamaño especificado por `maxBufferSize`.

## Ejemplos

**Almacenar valores en un array durante un periodo de 5 segundos y emitir el array**

[StackBlitz](https://stackblitz.com/edit/rxjs-buffertime-1?file=index.ts)

```javascript
import { bufferTime } from "rxjs/operators";
import { interval } from "rxjs";

const number$ = interval(1000);

number$.pipe(bufferTime(5000)).subscribe(console.log);
// Salida: [0, 1, 2, 3], [4, 5, 6, 7, 8]...
```

### Ejemplos de la documentación oficial

**Cada segundo, emitir un array de eventos click**

```javascript
import { fromEvent } from "rxjs";
import { bufferTime } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const buffered = clicks.pipe(bufferTime(1000));
buffered.subscribe((x) => console.log(x));
```

**Cada 5 segundos, emitir los eventos click de los siguientes 2 segundos**

```javascript
import { fromEvent } from "rxjs";
import { bufferTime } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const buffered = clicks.pipe(bufferTime(2000, 5000));
buffered.subscribe((x) => console.log(x));
```

<details>

<summary>Sobrecargas</summary>

#### Firma

`bufferTime(bufferTimeSpan: number, scheduler?: SchedulerLike): OperatorFunction<T, T[]>`

#### Parámetros

#### Retorna

`OperatorFunction<T, T[]>`

#### Firma

`bufferTime(bufferTimeSpan: number, bufferCreationInterval: number, scheduler?: SchedulerLike): OperatorFunction<T, T[]>`

#### Parámetros

#### Retorna

`OperatorFunction<T, T[]>`

#### Firma

`bufferTime(bufferTimeSpan: number, bufferCreationInterval: number, maxBufferSize: number, scheduler?: SchedulerLike): OperatorFunction<T, T[]>`

#### Parámetros

#### Retorna

`OperatorFunction<T, T[]>`

</details>

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/bufferTime.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/operators/bufferTime)
