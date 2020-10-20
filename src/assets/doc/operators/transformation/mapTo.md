# mapTo

<h2 class="subtitle"> Emite el mismo valor cada vez que el Observable fuente emite un valor
</h2>

<details>
<summary>Signatura</summary>

### Firma

`mapTo<T, R>(value: R): OperatorFunction<T, R>`

### Parámetros

<table>
<tr><td>value</td><td>El valor al que proyectar cada emisión.</td></tr>
</table>

### Retorna

`OperatorFunction<T, R>`: Un Observable que emite el mismo valor cada vez que el Observable fuente emite algo.

</details>

## Descripción

Es como `map`, pero proyecta cada emisión siempre al mismo valor.

<img src="assets/images/marble-diagrams/transformation/mapTo.png" alt="Diagrama de canicas del operador mapTo">

Recibe un valor constante como argumento, que emite cuandoquiera que el Observable fuente emita un valor. En otras palabras, ignora el valor emitido, y simplemente utiliza el momento de emisión para saber cuándo emitir el valor constante proporcionado.

## Ejemplos

**Emitir "La respuesta es 42" de forma indefinida**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-mapto-1?file=index.ts">StackBlitz</a>

```javascript
import { mapTo } from "rxjs/operators";
import { interval } from "rxjs";

const number$ = interval(1000);

number$.pipe(mapTo("La respuesta es 42")).subscribe(console.log);
// Salida: La respuesta es 42, La respuesta es 42, La respuesta es 42, La respuesta es 42...
```

**Emitir "¡Tecla pulsada!" cada vez que se pulse una tecla**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-mapto-2?file=index.ts">StackBlitz</a>

```javascript
import { mapTo } from "rxjs/operators";
import { fromEvent } from "rxjs";

const key$ = fromEvent(document, "keydown");

key$.pipe(mapTo("¡Tecla pulsada!")).subscribe(console.log);
// Salida: (keyPress) ¡Tecla pulsada!...
```

### Ejemplo de la documentación oficial

**Proyectar cada click a la cadena 'Hi'**

```javascript
import { fromEvent } from "rxjs";
import { mapTo } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const greetings = clicks.pipe(mapTo("Hi"));
greetings.subscribe((x) => console.log(x));
```

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/mapTo.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/mapTo">Documentación oficial en inglés</a>
