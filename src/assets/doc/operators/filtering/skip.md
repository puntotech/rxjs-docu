# skip

<h2 class="subtitle"> Retorna un Observable que se salta las primeras x emisiones del Observable fuente
</h2>

<details>
<summary>Signatura</summary>

### Firma

`skip<T>(count: number): MonoTypeOperatorFunction<T>`

### Parámetros

<table>
<tr><td>count</td><td>El número de elementos del Observable fuente que serán saltados.</td></tr>
</table>

### Retorna

`MonoTypeOperatorFunction<T>`: Un Observable que se salta valores emitidos por el Observable fuente.

</details>

## Descripción

`skip` se salta un número determinado por el parámetro `count` de emisiones del Observable fuente, y después continúa emitiendo valores normalmente.

<img src="assets/images/marble-diagrams/filtering/skip.png" alt="Diagrama de canicas del operador skip">

## Ejemplos

**Ignorar los primeros 5 clicks**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-skip-1?file=index.ts">StackBlitz</a>

```javascript
import { skip } from "rxjs/operators";
import { from, fromEvent } from "rxjs";

const click$ = fromEvent(document, "click");

click$.pipe(skip(5)).subscribe(console.log);
// Salida: ......... ClickEvent {}...
```

**Ignorar el primer elemento**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-skip-2?file=index.ts">StackBlitz</a>

```javascript
import { skip } from "rxjs/operators";
import { from } from "rxjs";

const language$ = from([
  { name: "Java", type: "Orientado a objetos" },
  { name: "Ruby", type: "Multiparadigma" },
  { name: "Haskell", type: "Funcional" },
]);

language$.pipe(skip(1)).subscribe(console.log);
// Salida: { name: "Ruby", type: "Multiparadigma" }, { name: "Haskell", type: "Funcional" }
```

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/skip.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/skip">Documentación oficial en inglés</a>
