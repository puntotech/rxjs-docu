# race

### Retorna un Observable que refleja al primer Observable que emita un valor

### Firma

`race<T>(...observables: any[]): Observable<T>`

### Parámetros

<table>
<tr><td>observables</td><td>Tipo: <code>any[]</code>.</td></tr>
</table>

### Retorna

`Observable<T>`: Un Observable que refleja las emisiones del primer Observable que emita un valor.

## Descripción

Refleja las emisiones del primer Observable que emita un valor.

## Ejemplos

Hacer una carrera con 3 Observables

[StackBlitz](https://stackblitz.com/edit/docu-rxjs-race?file=index.html)

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

Advertencia: Si alguno de los Observables lanza un error, la 'carrera' terminará con un error

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

Reflejar al primer Observable que emita un valor

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

## Sobrecargas

`race(arg: [any]): Observable<A>`

### Parámetros

<table>
<tr><td>arg</td><td>Tipo: <code>[any]</code>.</td></tr>
</table>

### Retorna

`Observable<A>`

`race(arg: [any, any]): Observable<A | B>`

### Parámetros

<table>
<tr><td>arg</td><td>Tipo: <code>[any, any]</code>.</td></tr>
</table>

### Retorna

`Observable<A | B>`

`race(arg: [any, any, any]): Observable<A | B | C>`

### Parámetros

<table>
<tr><td>arg</td><td>Tipo: <code>[any, any, any]</code>.</td></tr>
</table>

### Retorna

`Observable<A | B | C>`

`race(arg: [any, any, any, any]): Observable<A | B | C | D>`

### Parámetros

<table>
<tr><td>arg</td><td>Tipo: <code>[any, any, any, any]</code>.</td></tr>
</table>

### Retorna

`Observable<A | B | C | D>`

`race(arg: [any, any, any, any, any]): Observable<A | B | C | D | E>`

### Parámetros

<table>
<tr><td>arg</td><td>Tipo: <code>[any, any, any, any, any]</code>.</td></tr>
</table>

### Retorna

`Observable<A | B | C | D | E>`

`race(arg: any[]): Observable<T>`

### Parámetros

<table>
<tr><td>arg</td><td>Tipo: <code>any[]</code>.</td></tr>
</table>

### Retorna

`Observable<T>`

`race(arg: any[]): Observable<{}>`

### Parámetros

<table>
<tr><td>arg</td><td>Tipo: <code>any[]</code>.</td></tr>
</table>

### Retorna

`Observable<{}>`

`race(a: any): Observable<A>`

### Parámetros

<table>
<tr><td>a</td><td>Tipo: <code>any</code>.</td></tr>
</table>

### Retorna

`Observable<A>`

`race(a: any, b: any): Observable<A | B>`

### Parámetros

<table>
<tr><td>a</td><td>Tipo: <code>any</code>.</td></tr>
<tr><td>b</td><td>Tipo: <code>any</code>.</td></tr>
</table>

### Retorna

`Observable<A | B>`

race(a: any, b: any, c: any): Observable<A | B | C>

### Parámetros

<table>
<tr><td>a</td><td>Tipo: <code>any</code>.</td></tr>
<tr><td>b</td><td>Tipo: <code>any</code>.</td></tr>
<tr><td>c</td><td>Tipo: <code>any</code>.</td></tr>
</table>

### Retorna

`Observable<A | B | C>`

race(a: any, b: any, c: any, d: any): Observable<A | B | C | D>

### Parámetros

<table>
<tr><td>a</td><td>Tipo: <code>any</code>.</td></tr>
<tr><td>b</td><td>Tipo: <code>any</code>.</td></tr>
<tr><td>c</td><td>Tipo: <code>any</code>.</td></tr>
<tr><td>d</td><td>Tipo: <code>any</code>.</td></tr>
</table>

### Retorna

`Observable<A | B | C | D>`

`race(a: any, b: any, c: any, d: any, e: any): Observable<A | B | C | D | E>`

### Parámetros

<table>
<tr><td>a</td><td>Tipo: <code>any</code>.</td></tr>
<tr><td>b</td><td>Tipo: <code>any</code>.</td></tr>
<tr><td>c</td><td>Tipo: <code>any</code>.</td></tr>
<tr><td>d</td><td>Tipo: <code>any</code>.</td></tr>
<tr><td>e</td><td>Tipo: <code>any</code>.</td></tr>
</table>

### Retorna

`Observable<A | B | C | D | E>`

`race(observables: any[]): Observable<T>`

### Parámetros

<table>
<tr><td>observables</td><td>Tipo: <code>any[]</code>.</td></tr>
</table>

### Retorna

`Observable<T>`

`race(observables: any[]): Observable<{}>`

### Parámetros

<table>
<tr><td>observables</td><td>Tipo: <code>any[]</code>.</td></tr>
</table>

### Retorna

`Observable<{}>`

`race(...observables: any[]): Observable<T>`

### Parámetros

<table>
<tr><td>observables</td><td>Tipo: <code>any[]</code>.</td></tr>
</table>

### Retorna

`Observable<T>`

`race(...observables: any[]): Observable<{}>`

### Parámetros

<table>
<tr><td>observables</td><td>Tipo: <code>any[]</code>.</td></tr>
</table>

### Retorna

`Observable<{}>`

## Recursos adicionales

- [Documentación oficial en inglés](https://rxjs.dev/api/index/function/race)
- [Código fuente](https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/race.ts)
