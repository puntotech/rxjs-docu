# max

## Emite el elemento de mayor valor

<details>

<summary>Signatura</summary>

#### Firma

`max<T>(comparer?: (x: T, y: T) => number): MonoTypeOperatorFunction<T>`

#### Parámetros

#### Retorna

`MonoTypeOperatorFunction<T>`: Un Observable que emite el elemento de mayor valor.

</details>

## Descripción

El operador `max` opera con Observables que emiten valores numéricos (o elementos que se puedan comparar mediante la función de comparación proporcionada), emitiendo un solo valor cuando el Observable fuente se completa: el elemento de mayor valor.

![Diagrama de canicas del operador max](assets/images/marble-diagrams/mathematical-aggregate/max.png)

## Ejemplos

**Obtener el valor máximo de una serie de números**

[StackBlitz](https://stackblitz.com/edit/rxjs-max-1?file=index.ts)

```javascript
import { of } from "rxjs";
import { max } from "rxjs/operators";

const number$ = of(4, 7, 2, 10, 8, 9);

number$.pipe(max()).subscribe(console.log);
// Salida: 10
```

**Utilizar una función de comparación para obtener la cadena más larga**

[StackBlitz](https://stackblitz.com/edit/rxjs-max-2?file=index.ts)

```javascript
import { of } from "rxjs";
import { max } from "rxjs/operators";

const fruit$ = of("Cereza", "Arándano", "Fresa");

// Utilizar una función de comparación para obtener la cadena más larga
fruit$.pipe(max((a, b) => a.length - b.length)).subscribe(console.log);
// Salida: Arándano
```

**Utilizar una función de comparación para comparar objetos anidados y obtener el de mayor valor**

[StackBlitz](https://stackblitz.com/edit/rxjs-max-3?file=index.ts)

```javascript
import { of } from "rxjs";
import { map, max } from "rxjs/operators";

const githubUser$ = of(
  { name: "zaldih", stats: { repositories: 23 } },
  { name: "NyaGarcia", stats: { repositories: 30 } },
  { name: "caballerog", stats: { repositories: 89 } },
  { name: "tonivj5", stats: { repositories: 51 } }
);

githubUser$
  .pipe(
    max((a, b) => a.stats.repositories - b.stats.repositories),
    map(({ name }) => name)
  )
  .subscribe(console.log);
// Salida: caballerog
```

### Ejemplos de la documentación oficial

**Obtener el mayor valor de una serie de números**

```javascript
import { of } from "rxjs";
import { max } from "rxjs/operators";

of(5, 4, 7, 2, 8)
  .pipe(max())
  .subscribe((x) => console.log(x)); // -> 8
```

**Utilizar una función de comparación para obtener el elemento de mayor valor**

```javascript
    import { of } from 'rxjs';
    import { max } from 'rxjs/operators';

    interface Person {
      age: number,
      name: string
    }
    of<Person>(
      {age: 7, name: 'Foo'},
      {age: 5, name: 'Bar'},
      {age: 9, name: 'Beer'},
    ).pipe(
      max<Person>((a: Person, b: Person) => a.age < b.age ? -1 : 1),
    )
    .subscribe((x: Person) => console.log(x.name)); // -> 'Beer'
```

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/max.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/operators/max)
