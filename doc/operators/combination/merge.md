# merge

## Crea un Observable de salida que emite concurrentemente los valores de todos los Observables de entrada

## Descripción

Une varios Observables en uno solo.

![Diagrama de canicas del operador merge](assets/images/marble-diagrams/join-creation/merge.png)

`merge` se subscribe a cada Observable de entrada de forma concurrente, y emite sus valores, sin transformarlos, en el Observable resultante. El Observable resultante solo se completa cuando todos los Observables de entrada se hayan completado.

Cualquier error lanzado por un Observable de entrada será emitido inmediatamente en el Observable resultante.

## Ejemplos

**Unir dos Observables ajax**

[StackBlitz](https://stackblitz.com/edit/docu-rxjs-merge?file=index.ts)

```javascript
import { concat } from "rxjs";
import { ajax } from "rxjs/ajax";

const totoroFilmData$ = ajax.getJSON(
  "https://ghibliapi.herokuapp.com/films/58611129-2dbc-4a81-a72f-77ddfc1b1b49"
);

const charmanderData$ = ajax.getJSON("https://pokeapi.co/api/v2/pokemon/4");

concat(totoroFilmData$, charmanderData$).subscribe(console.log);
// Salida: {..., title: 'My Neighbor Totoro', ...}, { abilities: [], ...}
```

**`merge` se suscribe de forma concurrente (a la vez) a todos los Observables de entrada, mientras que `concat` se suscribe a ellos por orden, y hasta que el primero no se complete, no se suscribe al siguiente. Comparación entre `concat` y `merge`:**

[StackBlitz](https://stackblitz.com/edit/docu-rxjs-merge-2?file=index.ts)

```javascript
import { concat, merge, timer } from "rxjs";
import { mapTo } from "rxjs/operators";

const first$ = timer(3000).pipe(mapTo("Primero"));

const second$ = timer(1000).pipe(mapTo("Segundo"));

const third$ = timer(2000).pipe(mapTo("Tercero"));

merge(first$, second$, third$).subscribe(console.log);
// Salida: (1s) Segundo (1s) Tercero (1s) Primero

concat(first$, second$, third$).subscribe(console.log);
// Salida: (3s) Primero (1s) Segundo (2s) Tercero
```

### Ejemplos de la documentación oficial

**Unir 2 Observables: 1s interval y clicks**

```javascript
import { merge, fromEvent, interval } from "rxjs";

const clicks = fromEvent(document, "click");
const timer = interval(1000);
const clicksOrTimer = merge(clicks, timer);
clicksOrTimer.subscribe((x) => console.log(x));

// Salida:
// timer emite valores ascendetntes, uno cada segundo (1000ms)
// clicks imprime MouseEvents por console cada vez que se haga click en el 'document'
```

**Unir 3 Observables, pero solo ejecutar 2 de forma concurrente**

```javascript
import { merge, interval } from "rxjs";
import { take } from "rxjs/operators";

const timer1 = interval(1000).pipe(take(10));
const timer2 = interval(2000).pipe(take(6));
const timer3 = interval(500).pipe(take(10));
const concurrent = 2; // el argumento
const merged = merge(timer1, timer2, timer3, concurrent);
merged.subscribe((x) => console.log(x));

// Salida:
// - timer1 y timer2 se ejecutan concurrentemente
// - timer1 emite un valor cada 1000ms durante 10 iterations
// - timer2 emite un valor cada 2000ms durante 6 iterations
// - Cuando timer1 llega a su max iteration, timer2 continuará
//   y timer3 empezará a ejecutarse concurrentemente con timer2
// - Cuando timer2 llega a su max iteration, se termina, y
//   timer3 continuará emitiendo un valor cada 500ms hasta que se complete
```

<details>

<summary>Sobrecargas</summary>

#### Firma

`merge(v1: any, scheduler: SchedulerLike): Observable<T>`

#### Parámetros

#### Retorna

`Observable<T>`

#### Firma

`merge(v1: any, concurrent: number, scheduler: SchedulerLike): Observable<T>`

#### Parámetros

#### Retorna

`Observable<T>`

#### Firma

`merge(v1: any, v2: any, scheduler: SchedulerLike): Observable<T | T2>`

#### Parámetros

#### Retorna

`Observable<T | T2>`

#### Firma

`merge(v1: any, v2: any, concurrent: number, scheduler: SchedulerLike): Observable<T | T2>`

#### Parámetros

#### Retorna

`Observable<T | T2>`

#### Firma

`merge(v1: any, v2: any, v3: any, scheduler: SchedulerLike): Observable<T | T2 | T3>`

#### Parámetros

#### Retorna

`Observable<T | T2 | T3>`

#### Firma

`merge(v1: any, v2: any, v3: any, concurrent: number, scheduler: SchedulerLike): Observable<T | T2 | T3>`

#### Parámetros

#### Retorna

`Observable<T | T2 | T3>`

#### Firma

`merge(v1: any, v2: any, v3: any, v4: any, scheduler: SchedulerLike): Observable<T | T2 | T3 | T4>`

#### Parámetros

#### Retorna

`Observable<T | T2 | T3 | T4>`

#### Firma

`merge(v1: any, v2: any, v3: any, v4: any, concurrent: number, scheduler: SchedulerLike): Observable<T | T2 | T3 | T4>`

#### Parámetros

#### Retorna

`Observable<T | T2 | T3 | T4>`

#### Firma

`merge(v1: any, v2: any, v3: any, v4: any, v5: any, scheduler: SchedulerLike): Observable<T | T2 | T3 | T4 | T5>`

#### Parámetros

#### Retorna

`Observable<T | T2 | T3 | T4 | T5>`

#### Firma

`merge(v1: any, v2: any, v3: any, v4: any, v5: any, concurrent: number, scheduler: SchedulerLike): Observable<T | T2 | T3 | T4 | T5>`

#### Parámetros

#### Retorna

`Observable<T | T2 | T3 | T4 | T5>`

#### Firma

`merge(v1: any, v2: any, v3: any, v4: any, v5: any, v6: any, scheduler: SchedulerLike): Observable<T | T2 | T3 | T4 | T5 | T6>`

#### Parámetros

#### Retorna

`Observable<T | T2 | T3 | T4 | T5 | T6>`

#### Firma

merge(v1: any, v2: any, v3: any, v4: any, v5: any, v6: any, concurrent: number, scheduler: SchedulerLike): Observable\<T | T2 | `T3 | T4 | T5 | T6>`

#### Parámetros

#### Retorna

`Observable<T | T2 | T3 | T4 | T5 | T6>`

#### Firma

`merge(v1: any): Observable<T>`

#### Parámetros

#### Retorna

`Observable<T>`

#### Firma

`merge(v1: any, concurrent?: number): Observable<T>`

#### Parámetros

#### Retorna

`Observable<T>`

#### Firma

`merge(v1: any, v2: any): Observable<T | T2>`

#### Parámetros

#### Retorna

`Observable<T | T2>`

#### Firma

`merge(v1: any, v2: any, concurrent?: number): Observable<T | T2>`

#### Parámetros

#### Retorna

`Observable<T | T2>`

#### Firma

`merge(v1: any, v2: any, v3: any): Observable<T | T2 | T3>`

#### Parámetros

#### Retorna

`Observable<T | T2 | T3>`

#### Firma

`merge(v1: any, v2: any, v3: any, concurrent?: number): Observable<T | T2 | T3>`

#### Parámetros

#### Retorna

`Observable<T | T2 | T3>`

#### Firma

`merge(v1: any, v2: any, v3: any, v4: any): Observable<T | T2 | T3 | T4>`

#### Parámetros

#### Retorna

`Observable<T | T2 | T3 | T4>`

#### Firma

`merge(v1: any, v2: any, v3: any, v4: any, concurrent?: number): Observable<T | T2 | T3 | T4>`

#### Parámetros

#### Retorna

`Observable<T | T2 | T3 | T4>`

#### Firma

`merge(v1: any, v2: any, v3: any, v4: any, v5: any): Observable<T | T2 | T3 | T4 | T5>`

#### Parámetros

#### Retorna

`Observable<T | T2 | T3 | T4 | T5>`

#### Firma

`merge(v1: any, v2: any, v3: any, v4: any, v5: any, concurrent?: number): Observable<T | T2 | T3 | T4 | T5>`

#### Parámetros

#### Retorna

`Observable<T | T2 | T3 | T4 | T5>`

#### Firma

`merge(v1: any, v2: any, v3: any, v4: any, v5: any, v6: any): Observable<T | T2 | T3 | T4 | T5 | T6>`

#### Parámetros

#### Retorna

`Observable<T | T2 | T3 | T4 | T5 | T6>`

#### Firma

`merge(v1: any, v2: any, v3: any, v4: any, v5: any, v6: any, concurrent?: number): Observable<T | T2 | T3 | T4 | T5 | T6>`

#### Parámetros

#### Retorna

`Observable<T | T2 | T3 | T4 | T5 | T6>`

#### Firma

`merge(...observables: any[]): Observable<T>`

#### Parámetros

#### Retorna

`Observable<T>`

#### Firma

`merge(...observables: any[]): Observable<T>`

#### Parámetros

#### Retorna

`Observable<T>`

#### Firma

`merge(...observables: any[]): Observable<R>`

#### Parámetros

#### Retorna

`Observable<R>`

#### Firma

`merge(...observables: any[]): Observable<R>`

#### Parámetros

#### Retorna

`Observable<R>`

</details>

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/merge.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/index/function/merge)
