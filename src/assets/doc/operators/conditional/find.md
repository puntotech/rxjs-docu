<div class="page-heading">

# find

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/find.ts">
<svg>
  <use xlink:href="/assets/icons/github.svg#github"></use>
</svg>
</a>
</div>

### Emite únicamente el primer elemento emitido por el Observable fuente que cumpla una condición

💡 Si se quiere obtener el primer elemento emitido, sin que cumpla ninguna operación, se puede usar el operador [first]('/operators/filtering/first')

### Firma

`find<T>(predicate: (value: T, index: number, source: Observable<T>) => boolean, thisArg?: any): OperatorFunction<T, T | undefined>`

### Parámetros

<table>
<tr><td>predicate</td>Una función que se llama con cada elemente para comprobar si se cumple o no la condición.<td></td></tr>
<tr><td>thisArg</td>Opcional. El valor por defecto es <code>undefined</code>.
Un argumento opcional para determinar el valor del <code>this</code> en la función <code>predicate</code>.<td></td></tr>
<table>

### Retorna

`OperatorFunction<T, T | undefined>`: Un Observable del primer elemento que cumpla la condición.

## Descripción

Encuentra el primer valor que cumple una condición y lo emite.

<img src="assets/images/marble-diagrams/conditional-boolean/find.png" alt="Diagrama de canicas del operador find">

`find` busca el primer elemento del Observable fuente que cumpla la condición especificada en la función `predicate` y retorna la primera ocurrencia que exista en la fuente. Al contrario que el operador `first`, la función `predicate` es obligatoria, y no se emite un error si no se encuentra un valor válido.

## Ejemplos

Emite la primera vez que se presiona la tecla X, y se completa el flujo

[StackBlitz](https://stackblitz.com/edit/rxjs-find-1?file=index.html)

```typescript
import { find } from "rxjs/operators";
import { fromEvent } from "rxjs";

const key$ = fromEvent<KeyboardEvent>(document, "keydown");

key$.pipe(find(({ code }) => code === "KeyX")).subscribe(console.log);
// Salida: KeyboardEvent {}
```

Emite el primer Pokémon de tipo _Water_

[StackBlitz](https://stackblitz.com/edit/rxjs-find-2?file=index.ts)

```javascript
import { find } from "rxjs/operators";
import { from } from "rxjs";

// Aunque haya más de un Pokémon de tipo agua, find emite únicamente el primero que encuentra
const pokemon$ = from([
  { name: "Charmander", type: "Fire" },
  { name: "Squirtle", type: "Water" },
  { name: "Gyarados", type: "Water" },
]);

pokemon$.pipe(find(({ type }) => type === "Water")).subscribe(console.log);
// Salida: { name: "Squirtle", type: "Water" }
```

Si ningún elemento cumple la condición, se emite `undefined`

```javascript
import { find } from "rxjs/operators";
import { from } from "rxjs";

const pokemon$ = from([
  { name: "Charmander", type: "Fire" },
  { name: "Squirtle", type: "Water" },
  { name: "Gyarados", type: "Water" },
]);

pokemon$
  .pipe(find(({ type }) => type === "no existe"))
  .subscribe(console.log, console.error, () =>
    console.log("¡Flujo completado!")
  );
// Salida: undefined, ¡Flujo completado!
```

### Ejemplo de la documentación oficial

Encuentra y emite el primer click que ocurra en un elemento DIV

[StackBlitz](https://stackblitz.com/run?devtoolsheight=50)

```javascript
import { fromEvent } from "rxjs";
import { find } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const result = clicks.pipe(find((ev) => ev.target.tagName === "DIV"));
result.subscribe((x) => console.log(x));
```

## Recursos adicionales

- [Documentación oficial en inglés](https://rxjs-dev.firebaseapp.com/api/operators/find)
