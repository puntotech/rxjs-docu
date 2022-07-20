---
description: >-
  Retorna un Observable que emite todos los elementos emitidos por el Observable
  fuente que sean distintos al valor anterior
---

# distinctUntilChanged

<details>

<summary>Signatura</summary>

#### Firma

`distinctUntilChanged<T, K>(compare?: (x: K, y: K) => boolean, keySelector?: (x: T) => K): MonoTypeOperatorFunction<T>`

#### Parámetros

#### Retorna

`MonoTypeOperatorFunction<T>`: Un Observable que emite elementos del Observable fuente que tengan valores distintos.

</details>

## Descripción

Si se proporciona una función de comparación, se utilizará para comprobar si cada elemento se debe emitir o no.

Si no se proporciona una función de comparación, se utiliza una verificación de igualdad.

## Ejemplos

**Usar distinctUntilChanged\` sin una función de comparación**

[StackBlitz](https://stackblitz.com/edit/rxjs-distinctuntilchanged-1?file=index.ts)

```javascript
import { distinctUntilChanged } from "rxjs/operators";
import { of } from "rxjs";

const fruit$ = of("Fresa", "Cereza", "Cereza", "Arándano", "Arándano", "Fresa");

fruit$.pipe(distinctUntilChanged()).subscribe(console.log);
// Salida: Fresa, Cereza, Arándano, Fresa
```

**Usar distinctUntilChanged con una función de comparación**

[StackBlitz](https://stackblitz.com/edit/rxjs-distinctuntilchanged-2?file=index.ts)

```javascript
import { distinctUntilChanged } from "rxjs/operators";
import { of } from "rxjs";

const language$ = of(
  { name: "Java", type: "Orientado a objetos" },
  { name: "Ruby", type: "Multiparadigma" },
  { name: "Ruby", type: "Multiparadigma" },
  { name: "Haskell", type: "Funcional" },
  { name: "Haskell", type: "Funcional" },
  { name: "Java", type: "Orientado a objetos" },
  { name: "Ruby", type: "Multiparadigma" }
);

language$
  .pipe(
    distinctUntilChanged(
      ({ name: previousName }, { name }) => previousName === name
    )
  )
  .subscribe(console.log);
/* Salida: 
  { name: "Java", type: "Orientado a objetos" },
  { name: "Ruby", type: "Multiparadigma" },
  { name: "Haskell", type: "Funcional" },
  { name: "Java", type: "Orientado a objetos" },
  { name: "Ruby", type: "Multiparadigma" }
*/
```

### Ejemplos de la documentación oficial

**Un ejemplo simple con números**

```javascript
import { of } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";

of(1, 1, 2, 2, 2, 1, 1, 2, 3, 3, 4)
  .pipe(distinctUntilChanged())
  .subscribe((x) => console.log(x)); // 1, 2, 1, 2, 3, 4
```

**Un ejemplo usando una función de comparación**

```javascript
    import { of } from 'rxjs';
    import { distinctUntilChanged } from 'rxjs/operators';

    interface Person {
       age: number,
       name: string
    }

    of<Person>(
        { age: 4, name: 'Foo'},
        { age: 7, name: 'Bar'},
        { age: 5, name: 'Foo'},
        { age: 6, name: 'Foo'},
      ).pipe(
        distinctUntilChanged((p: Person, q: Person) => p.name === q.name),
      )
      .subscribe(x => console.log(x));

    // displays:
    // { age: 4, name: 'Foo' }
    // { age: 7, name: 'Bar' }
    // { age: 5, name: 'Foo' }
```

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/distinctUntilChanged.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/operators/distinctUntilChanged)
