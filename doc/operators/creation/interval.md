# interval

## Crea un Observable que emite una secuencia de números, con el intervalo de tiempo entre emisiones que se especifique

<details>

<summary>Signatura</summary>

#### Firma

`interval(period: number = 0, scheduler: SchedulerLike = async): Observable<number>`

#### Parámetros

#### Retorna

`Observable<number>`: Un Observable que emite una secuencia incremental de números, emitiendo un valor en cada intervalo de tiempo.

</details>

## Descripción

Emite una secuencia incremental de números periódicamente.

![Diagrama de canicas de interval](assets/images/marble-diagrams/creation/interval.png)

`interval` retorna un Observable que emite una secuencia incremental infinita de números, con un intervalo de tiempo constante entre cada emisión. La primera emisión no se envía inmediatamente, sino al terminar el primer periodo de tiempo. Por defecto, este operador utiliza el `SchedulerLike` async para proporcionar una noción del tiempo, pero se le puede pasar cualquier otro `SchedulerLike` por parámetros.

## Ejemplos

**Emitir una secuencia de números ascendente con un intervalo de 2 segundos entre cada emisión**

[StackBlitz](https://stackblitz.com/edit/docu-rxjs-interval?file=index.ts)

```javascript
import { interval } from "rxjs";

const number$ = interval(2000);

number$.subscribe(console.log);
// Salida: 0, 1, 2, 3, 4, 5...
```

**Si no se le proporciona ningún valor a interval, emitirá valores cada 0ms**

[StackBlitz](https://stackblitz.com/edit/docu-rxjs-interval-2?file=index.ts)

```javascript
import { interval } from "rxjs";

const superFastNumber$ = interval();

superFastNumber$.subscribe((number) => console.log(number));
// Salida: O, 1, 2, 3, 4, 5, 6, 7, 8, 9...
```

### Ejemplo de la documentación oficial

**Emite números ascendentes, uno cada segundo (1000ms) hasta el número 3**

```javascript
import { interval } from "rxjs";
import { take } from "rxjs/operators";

const numbers = interval(1000);

const takeFourNumbers = numbers.pipe(take(4));

takeFourNumbers.subscribe((x) => console.log("Next: ", x));
// Salida: "Next: 0", "Next: 1", "Next: 2", "Next: 3"
```

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/interval.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/index/function/interval)
