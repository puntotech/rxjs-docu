# distinct

<h2 class="subtitle"> Retorna un Observable que emite todos los elementos del Observable fuente que sean distintos a los elementos anteriores
</h2>

<details>
<summary>Signatura</summary>

### Firma

`distinct<T, K>(keySelector?: (value: T) => K, flushes?: Observable<any>): MonoTypeOperatorFunction<T>`

### Parámetros

<table>
<tr><td>keySelector</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Función opcional para seleccionar qué valor se quiere comprobar si es o no distinto.</td></tr>
<tr><td>flushes</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Observable opcional para reiniciar el HashSet interno del operador.</td></tr>
</table>

### Retorna

`MonoTypeOperatorFunction<T>`: Un Observable que emite elementos del Observable fuente de distinto valor.

</details>

## Descripción

Si se proporciona una función `keySelector`, se proyectará cada valor emitido por el Observable fuente a un nuevo valor, que se comparará con los valores previamente emitidos para ver si es distinto o no. Si no se proporciona una función `keySelector`, se compararán los valores emitidos por el Observable fuente directamente con las emisiones previas.

En los entornos de ejecución de JavaScript que den soporte a `Set`, `distinct` utilizará un `Set` para mejorar el rendimiento de la comprobación de distinción.

En otros entornos de ejecución, `distinct` utilizará una implementación mínima de `Set` que depende de un Array y de `indexOf`, por lo que el rendimiento empeorará de forma directamente proporcional a la cantidad de valores que se proporcionen. Incluso en los navegadores más modernos, un `distinct` ejecutándose durante un periodo largo de tiempo puede provocar fugas de memoria. Para minimizar este efecto en algunos escenarios, se puede proporcionar un parámetro `flushes` opcional para reiniciar el `Set` interno, eliminando todos sus valores.

## Ejemplos

**Usar distinct sin un selector**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-distinct-1?file=index.ts">StackBlitz</a>

```javascript
import { distinct } from "rxjs/operators";
import { of } from "rxjs";

const fruit$ = of(
  "Fresa",
  "Cereza",
  "Cereza",
  "Arándano",
  "Fresa",
  "Arándano",
  "Cereza"
);

fruit$.pipe(distinct()).subscribe(console.log);
// Salida: Fresa, Cereza, Arándano
```

**Usar distinct con un selector de clave**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-distinct-2?file=index.ts">StackBlitz</a>

```javascript
import { distinct } from "rxjs/operators";
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

language$.pipe(distinct(({ name }) => name)).subscribe(console.log);
/* Salida: 
{ name: "Java", type: "Orientado a objetos" }, 
{ name: "Ruby", type: "Multiparadigma" }, 
{ name: "Haskell", type: "Funcional" }
*/
```

### Ejemplos de la documentación oficial

**Un ejemplo simple con números**

```javascript
import { of } from "rxjs";
import { distinct } from "rxjs/operators";

of(1, 1, 2, 2, 2, 1, 2, 3, 4, 3, 2, 1)
  .pipe(distinct())
  .subscribe((x) => console.log(x)); // 1, 2, 3, 4
```

**Un ejemplo utilizando la función keySelector**

```typescript
import { of } from "rxjs";
import { distinct } from "rxjs/operators";

interface Person {
  age: number;
  name: string;
}

of<Person>(
  { age: 4, name: "Foo" },
  { age: 7, name: "Bar" },
  { age: 5, name: "Foo" }
)
  .pipe(distinct((p: Person) => p.name))
  .subscribe((x) => console.log(x));

// Salida:
// { age: 4, name: 'Foo' }
// { age: 7, name: 'Bar' }
```

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/distinct.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/distinct">Documentación oficial en inglés</a>
