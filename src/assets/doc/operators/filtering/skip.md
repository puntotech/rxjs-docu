<div class="page-heading">

# skip

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/skip.ts">
<svg>
  <use xlink:href="/assets/icons/github.svg#github"></use>
</svg>
</a>
</div>

### Retorna un Observable que se salta las primeras x emisiones del Observable fuente

### Firma

`skip<T>(count: number): MonoTypeOperatorFunction<T>`

### Parámetros

<table>
<tr><td>count</td><td>El número de elementos del Observable fuente que serán saltados.</td></tr>
</table>

### Retorna

`MonoTypeOperatorFunction<T>`: Un Observable que se salta valores emitidos por el Observable fuente.

## Descripción

`skip` se salta un número determinado por el parámetro `count` de emisiones del Observable fuente, y después continúa emitiendo valores normalmente.

<img src="assets/images/marble-diagrams/filtering/skip.png" alt="Diagrama de canicas del operador skip">

## Ejemplos

Ignorar los primeros 5 clicks

[StackBlitz](https://stackblitz.com/edit/rxjs-skip-1?file=index.ts)

```javascript
import { skip } from "rxjs/operators";
import { from, fromEvent } from "rxjs";

const click$ = fromEvent(document, "click");

click$.pipe(skip(5)).subscribe(console.log);
// Salida: ......... ClickEvent {}...
```

Ignorar el primer elemento

[StackBlitz](https://stackblitz.com/edit/rxjs-skip-2?file=index.ts)

```javascript
import { skip } from "rxjs/operators";
import { from } from "rxjs";

const pokemon$ = from([
  { name: "Bulbasaur", type: "Grass" },
  { name: "Charmander", type: "Fire" },
  { name: "Squirtle", type: "Water" },
]);

pokemon$.pipe(skip(1)).subscribe(console.log);
// Salida: { "Charmander", type: "Fire"}, { name: "Squirtle", type: "Water" }
```

## Recursos adicionales

- [Documentación oficial en inglés](https://rxjs-dev.firebaseapp.com/api/operators/skip)
