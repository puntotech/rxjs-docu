# distinctUntilKeyChanged

<h2 class="subtitle"> Retorna un Observable que emite los elementos del Observable fuente cuya propiedad especificada sea distinta a la del elemento anterior
</h2>

<details>
<summary>Signatura</summary>

### Firma

`distinctUntilKeyChanged<T, K extends keyof T>(key: K, compare?: (x: T[K], y: T[K]) => boolean): MonoTypeOperatorFunction<T>`

### Parámetros

<table>
<tr><td>key</td><td>Clave de la propiedad del objeto que se desea comparar.</td></tr>
<tr><td>compare</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Función de comparación opcional que se utiliza para comprobar si un elemento es distinto al elemento anterior.</td></tr>

</table>

### Retorna

`MonoTypeOperatorFunction<T>`: Un Observable que emite elementos del Observable fuente si la propiedad especificada es distinta a la del elemento anterior.

</details>

## Descripción

Si se proporciona una función de comparación, se utilizará para comprobar si cada elemento se debe emitir o no.

Si no se proporciona una función de comparación, se utiliza una verificación de igualdad.

## Ejemplos

**Emitir solo cuando la tecla pulsada sea distinta a la tecla pulsada anterior**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-distinctuntilkeychanged-1?file=index.ts">StackBlitz</a>

```typescript
import { distinctUntilKeyChanged, map } from "rxjs/operators";
import { fromEvent } from "rxjs";

const key$ = fromEvent<KeyboardEvent>(document, "keydown").pipe(
  distinctUntilKeyChanged("code"),
  map(({ code }) => code)
);

key$.subscribe(console.log);
// Salida: (Pulsar tecla y) (Pulsar tecla x) 'KeyX'
```

**Emitir el objeto lenguaje si su propiedad name es distinta a la del objeto anterior**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-distinctuntilkeychanged-2?file=index.ts">StackBlitz</a>

```javascript
import { distinctUntilKeyChanged } from "rxjs/operators";
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

language$.pipe(distinctUntilKeyChanged("name")).subscribe(console.log);
/* Salida:
  { name: "Java", type: "Orientado a objetos" },
  { name: "Ruby", type: "Multiparadigma" },
  { name: "Haskell", type: "Funcional" },
  { name: "Java", type: "Orientado a objetos" },
  { name: "Ruby", type: "Multiparadigma" }
*/
```

**Utilizar una función de comparación para ignorar las diferencias de mayúsculas/minúsculas**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-distinctuntilkeychanged-3?file=index.ts">StackBlitz</a>

```javascript
import { of } from "rxjs";
import { distinctUntilKeyChanged } from "rxjs/operators";

const user$ = of(
  { name: "NyaGarcía", age: 23 },
  { name: "nyagarcía", age: 23 },
  { name: "zaldih", age: 21 },
  { name: "caballerog", age: 35 },
  { name: "caballeroG", age: 35 }
);

user$
  .pipe(
    distinctUntilKeyChanged(
      "name",
      (prev, curr) => prev.toLowerCase() === curr.toLowerCase()
    )
  )
  .subscribe(console.log);
/* Salida: 
  { name: 'NyaGarcía', age: 23 }, 
  { name: 'zaldih', age: 21} , 
  { name: 'caballerog', age: 35 }
*/
```

### Ejemplos de la documentación oficial

**Un ejemplo comparando el campo name**

```typescript
import { of } from "rxjs";
import { distinctUntilKeyChanged } from "rxjs/operators";

interface Person {
  age: number;
  name: string;
}

of<Person>(
  { age: 4, name: "Foo" },
  { age: 7, name: "Bar" },
  { age: 5, name: "Foo" },
  { age: 6, name: "Foo" }
)
  .pipe(distinctUntilKeyChanged("name"))
  .subscribe((x) => console.log(x));

// Salida:
// { age: 4, name: 'Foo' }
// { age: 7, name: 'Bar' }
// { age: 5, name: 'Foo' }
```

**Un ejemplo comparando las primeras letras de la propiedad name**

```typescript
import { of } from "rxjs";
import { distinctUntilKeyChanged } from "rxjs/operators";

interface Person {
  age: number;
  name: string;
}

of<Person>(
  { age: 4, name: "Foo1" },
  { age: 7, name: "Bar" },
  { age: 5, name: "Foo2" },
  { age: 6, name: "Foo3" }
)
  .pipe(
    distinctUntilKeyChanged(
      "name",
      (x: string, y: string) => x.substring(0, 3) === y.substring(0, 3)
    )
  )
  .subscribe((x) => console.log(x));

// Salida:
// { age: 4, name: 'Foo1' }
// { age: 7, name: 'Bar' }
// { age: 5, name: 'Foo2' }
```

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/distinctUntilKeyChanged.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/distinctUntilKeyChanged">Documentación oficial en inglés</a>
