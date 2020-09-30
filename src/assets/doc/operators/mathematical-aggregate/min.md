<div class="page-heading">

# min

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/min.ts">
<svg>
  <use xlink:href="/assets/icons/github.svg#github"></use>
</svg>
</a>
</div>

### Emite el elemento de menor valor

### Firma

`min<T>(comparer?: (x: T, y: T) => number): MonoTypeOperatorFunction<T>`

### Parámetros

<table>
<tr><td>comparer</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Función de comparación opcional, para comparar el valor de dos elementos.
</td></tr>
</table>

### Retorna

`MonoTypeOperatorFunction<T>`: Un Observable que emite el elemento de menor valor.

## Descripción

El operador `max` opera con Observables que emiten valores numéricos (o elementos que se puedan comparar mediante la función de comparación proporcionada), emitiendo un solo valor cuando el Observable fuente se completa: el elemento de menor valor.

<img src="assets/images/marble-diagrams/mathematical-aggregate/min.png" alt="Diagrama de canicas del operador min">

## Ejemplos

Obtener el valor máximo de una serie de números

[StackBlitz](https://stackblitz.com/edit/rxjs-min-1?file=index.ts)

```javascript
import { of } from "rxjs";
import { min } from "rxjs/operators";

const number$ = of(4, 7, 2, 10, 8, 9);

number$.pipe(min()).subscribe(console.log);
// Salida: 2
```

Utilizar una función de comparación para obtener la cadena más corta

[StackBlitz](https://stackblitz.com/edit/rxjs-min-2?file=index.ts)

```javascript
import { of } from "rxjs";
import { min } from "rxjs/operators";

const fruit$ = of("Cereza", "Arándano", "Fresa");

// Utilizar una función de comparación para obtener la cadena más corta
fruit$.pipe(min((a, b) => a.length - b.length)).subscribe(console.log);
// Salida: Fresa
```

Utilizar una función de comparación para comparar objetos anidados y obtener el de menor valor

[StackBlitz](https://stackblitz.com/edit/rxjs-min-3?file=index.ts)

```javascript
import { of } from "rxjs";
import { map, min } from "rxjs/operators";

const pokemon$ = of(
  { name: "Squirtle", stats: { attack: 30, defence: 40 } },
  { name: "Charmander", stats: { attack: 40, defence: 35 } },
  { name: "Bulbasaur", stats: { attack: 35, defence: 40 } }
);

pokemon$
  .pipe(
    min((a, b) => a.stats.attack - b.stats.attack),
    map(({ name }) => name)
  )
  .subscribe(console.log);
// Salida: Squirtle
```

### Ejemplos de la documentación oficial

Obtener el mayor valor de una serie de números

```javascript
import { of } from "rxjs";
import { min } from "rxjs/operators";

of(5, 4, 7, 2, 8)
  .pipe(min())
  .subscribe((x) => console.log(x)); // -> 2
```

Utilizar una función de comparación para obtener el elemento de menor valor

```javascript
    import { of } from 'rxjs';
    import { min } from 'rxjs/operators';

    interface Person {
      age: number,
      name: string
    }
    of<Person>(
      {age: 7, name: 'Foo'},
      {age: 5, name: 'Bar'},
      {age: 9, name: 'Beer'},
    ).pipe(
      min<Person>( (a: Person, b: Person) => a.age < b.age ? -1 : 1),
    )
    .subscribe((x: Person) => console.log(x.name)); // -> 'Bar'
```

## Recursos adicionales

- [Documentación oficial en inglés](https://rxjs-dev.firebaseapp.com/api/operators/min)
