# every

### Retorna un Observable que emite

Returns an Observable that emits whether or not every item of the source satisfies the condition specified.

### Firma

`every<T>(predicate: (value: T, index: number, source: Observable<T>) => boolean, thisArg?: any): OperatorFunction<T, boolean>`

### Parameters

<table>
<tr><td>predicate</td><td>Una función que determina si el valor cumple o no la condición.</td></tr>
<tr><td>thisArg</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Objeto opcional que se utiliza como valor del <code>this</code> en la *callback*</td></tr>

<table>

### Retorna

`OperatorFunction<T, boolean>`: Un Observable de un solo valor booleano que determina si todos los elementos del Observable fuente cumplen la condición especificada.

## Descripción

Si todos los valores emitidos por el Observable fuente cumplen la condición especificada, `every` emite _true_. Si hay algún valor que no cumpla la condición, se emite _false_.

## Ejemplos

Comprobar si todos los valores emitidos son numéricos

[StackBlitz](https://stackblitz.com/edit/rxjs-every-1?file=index.html)

```javascript
import { of } from "rxjs";
import { every } from "rxjs/operators";

const number$ = of(1, 2, 3, 4);

number$.pipe(every((n) => Number.isInteger(n))).subscribe(console.log);
// Salida: true
```

Comprobar si todos los valores emitidos son menores a 2

[StackBlitz](https://stackblitz.com/edit/rxjs-every-2?file=index.ts)

```javascript
import { of } from "rxjs";
import { every } from "rxjs/operators";

const number$ = of(1, 2, 3, 4);

number$.pipe(every((n) => n < 2)).subscribe(console.log);
// Salida: false
```

Comprobar si todas las peticiones tienen un status 200 (todo OK)

[StackBlitz](https://stackblitz.com/edit/rxjs-every-3?file=index.ts)

```javascript
import { of } from "rxjs";
import { every, concatMap } from "rxjs/operators";
import { ajax } from "rxjs/ajax";

const pokemonId$ = of(1, 5, 6);

function getPokemon(id: number) {
  return ajax(`https://pokeapi.co/api/v2/pokemon/${id}`);
}

pokemonId$
  .pipe(
    concatMap((id) => getPokemon(id)),
    every(({ status }) => status === 200)
  )
  .subscribe(console.log);
// Salida: true
```

### Ejemplo de la documentación oficial

Un simple ejemplo que emite _true_ si todos los elementos son menores a 5, _false_ en caso contrario

[StackBlitz](https://stackblitz.com/run?devtoolsheight=50)

```javascript
import { of } from "rxjs";
import { every } from "rxjs/operators";

of(1, 2, 3, 4, 5, 6)
  .pipe(every((x) => x < 5))
  .subscribe((x) => console.log(x)); // -> false
```

- [Documentación oficial en inglés](https://rxjs-dev.firebaseapp.com/api/operators/every)
- [Código fuente](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/every.ts)
