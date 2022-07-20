---
description: >-
  Retorna un Observable que emite un valor booleano que determina si todas las
  emisiones de la fuente cumplen o no una condición
---

# every

<details>

<summary>Signatura</summary>

#### Firma

`every<T>(predicate: (value: T, index: number, source: Observable<T>) => boolean, thisArg?: any): OperatorFunction<T, boolean>`

#### Parámetros

#### Retorna

`OperatorFunction<T, boolean>`: Un Observable de un solo valor booleano que determina si todos los elementos del Observable fuente cumplen la condición especificada.

</details>

## Descripción

Si todos los valores emitidos por el Observable fuente cumplen la condición especificada, `every` emite _true_. Si hay algún valor que no cumpla la condición, se emite _false_.

## Ejemplos

**Comprobar si todos los valores emitidos son numéricos**

[StackBlitz](https://stackblitz.com/edit/rxjs-every-1?file=index.ts)

```javascript
import { of } from "rxjs";
import { every } from "rxjs/operators";

const number$ = of(1, 2, 3, 4);

number$.pipe(every((n) => Number.isInteger(n))).subscribe(console.log);
// Salida: true
```

**Comprobar si todos los valores emitidos son menores a 2**

[StackBlitz](https://stackblitz.com/edit/rxjs-every-2?file=index.ts)

```javascript
import { of } from "rxjs";
import { every } from "rxjs/operators";

const number$ = of(1, 2, 3, 4);

number$.pipe(every((n) => n < 2)).subscribe(console.log);
// Salida: false
```

**Comprobar si todas las peticiones tienen un status 200 (todo OK)**

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

**Un simple ejemplo que emite **_**true**_** si todos los elementos son menores a 5, **_**false**_** en caso contrario**

```javascript
import { of } from "rxjs";
import { every } from "rxjs/operators";

of(1, 2, 3, 4, 5, 6)
  .pipe(every((x) => x < 5))
  .subscribe((x) => console.log(x)); // -> false
```

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/every.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/operators/every)
