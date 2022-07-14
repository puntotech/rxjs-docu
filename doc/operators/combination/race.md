# race

## Retorna un Observable que refleja al primer Observable que emita un valor

<details>

<summary>Signatura</summary>

#### Firma

`race<T>(...observables: any[]): Observable<T>`

#### Parámetros

#### Retorna

`Observable<T>`: Un Observable que refleja las emisiones del primer Observable que emita un valor.

</details>

## Descripción

Refleja las emisiones del primer Observable que emita un valor.

## Ejemplos

**Hacer una carrera con 3 Observables**

[StackBlitz](https://stackblitz.com/edit/docu-rxjs-race?file=index.html\))

```javascript
import { mapTo } from "rxjs/operators";
import { race, timer } from "rxjs";

const slow$ = timer(5000).pipe(mapTo("Caracol"));
const medium$ = timer(3000).pipe(mapTo("Gatito"));
const fast$ = timer(2000).pipe(mapTo("Guepardo"));

//
race(slow$, medium$, fast$).subscribe((winner) =>
  console.log(`Y el ganador es... ¡${winner}!`)
);
// Salida: Y el ganador es... ¡Guepardo!
```

**Advertencia: Si alguno de los Observables lanza un error, la 'carrera' terminará con un error**

[StackBlitz](https://stackblitz.com/edit/docu-rxjs-race-2?file=index.ts)

```javascript
import { mapTo } from "rxjs/operators";
import { race, timer, throwError } from "rxjs";

const slow$ = timer(5000).pipe(mapTo("Caracol"));
const medium$ = timer(3000).pipe(mapTo("Gatito"));
const fast$ = timer(2000).pipe(mapTo("Guepardo"));

const error$ = throwError("¡Oh no!");

race(slow$, medium$, fast$, error$).subscribe(console.log, console.error);
// Salida: (error) ¡Oh no!
```

### Ejemplo de la documentación oficial

**Reflejar al primer Observable que emita un valor**

```javascript
import { race, interval } from "rxjs";
import { mapTo } from "rxjs/operators";

const obs1 = interval(1000).pipe(mapTo("Rápido"));
const obs2 = interval(3000).pipe(mapTo("Velocidad media"));
const obs3 = interval(5000).pipe(mapTo("Lento"));

race(obs3, obs1, obs2).subscribe((winner) => console.log(winner));

// Salida:
// Emite 'Rápido' cada segundo
```

<details>

<summary>Sobrecargas</summary>

#### Firma

`race(arg: [any]): Observable<A>`

#### Parámetros

#### Retorna

`Observable<A>`

#### Firma

`race(arg: [any, any]): Observable<A | B>`

#### Parámetros

#### Retorna

`Observable<A | B>`

#### Firma

`race(arg: [any, any, any]): Observable<A | B | C>`

#### Parámetros

#### Retorna

`Observable<A | B | C>`

#### Firma

`race(arg: [any, any, any, any]): Observable<A | B | C | D>`

#### Parámetros

#### Retorna

`Observable<A | B | C | D>`

#### Firma

`race(arg: [any, any, any, any, any]): Observable<A | B | C | D | E>`

#### Parámetros

#### Retorna

`Observable<A | B | C | D | E>`

#### Firma

`race(arg: any[]): Observable<T>`

#### Parámetros

#### Retorna

`Observable<T>`

#### Firma

`race(arg: any[]): Observable<{}>`

#### Parámetros

#### Retorna

`Observable<{}>`

#### Firma

`race(a: any): Observable<A>`

#### Parámetros

#### Retorna

`Observable<A>`

#### Firma

`race(a: any, b: any): Observable<A | B>`

#### Parámetros

#### Retorna

`Observable<A | B>`

#### Firma

`race(a: any, b: any, c: any): Observable<A | B | C>`

#### Parámetros

#### Retorna

`Observable<A | B | C>`

#### Firma

`race(a: any, b: any, c: any, d: any): Observable<A | B | C | D>`

#### Parámetros

#### Retorna

`Observable<A | B | C | D>`

#### Firma

`race(a: any, b: any, c: any, d: any, e: any): Observable<A | B | C | D | E>`

#### Parámetros

#### Retorna

`Observable<A | B | C | D | E>`

#### Firma

`race(observables: any[]): Observable<T>`

#### Parámetros

#### Retorna

`Observable<T>`

#### Firma

`race(observables: any[]): Observable<{}>`

#### Parámetros

#### Retorna

`Observable<{}>`

#### Firma

`race(...observables: any[]): Observable<T>`

#### Parámetros

#### Retorna

`Observable<T>`

#### Firma

`race(...observables: any[]): Observable<{}>`

#### Parámetros

#### Retorna

`Observable<{}>`

</details>

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/race.ts)

* [Documentación oficial en inglés](https://rxjs.dev/api/index/function/race)
