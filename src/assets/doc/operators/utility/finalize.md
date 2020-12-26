# finalize

<h2 class="subtitle"> Retorna un Observable que refleja el Observable fuente, pero que llamará a una función determinada tras la terminación de la fuente, en complete o en error></h2>

<details>
<summary>Signatura</summary>

### Firma

`finalize<T>(callback: () => void): MonoTypeOperatorFunction<T>`

### Parameters

<table>
<tr><td>callback</td><td>Función que se llamará cuando la fuente se termine.</td></tr>
</table>

### Retorna

`MonoTypeOperatorFunction<T>`: Un Observable que refleja la fuente, pero que hará una llamada a la función proporcionada tras la terminación de la fuente.

## Ejemplos

**Ejecutar la función _callback_ tras la compleción del Observable**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-finalize-1?file=index.ts">StackBlitz</a>

```javascript
import { of } from "rxjs";
import { finalize } from "rxjs/operators";

const fruit$ = of("Cereza", "Fresa", "Arándano");

fruit$
  .pipe(finalize(() => console.log("Ejecutando finalize")))
  .subscribe(console.log, console.error, () => console.log("Flujo completado"));
// Salida: Cereza, Fresa, Arándano, Flujo completado, Ejecutando finalize
```

`finalize`

**La función _callback_ se ejecuta aunque ocurra un error**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-finalize-2?file=index.ts">StackBlitz</a>

```javascript
import { throwError } from "rxjs";
import { finalize } from "rxjs/operators";

const error$ = throwError("¡Oh no!");

error$
  .pipe(finalize(() => console.log("Ejecutando a pesar del error!")))
  .subscribe(console.log, console.error);
// Output: (error) '¡Oh no!', 'Ejecutando a pesar del error!'
```

**Ejecutar la función _callback_ tras realizar todas las peticiones AJAX**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-finalize-3?file=index.ts">StackBlitz</a>

```javascript
import { finalize, take, map, mergeAll } from "rxjs/operators";
import { ajax } from "rxjs/ajax";

const ghibliFilm$ = ajax.getJSON(`https://ghibliapi.herokuapp.com/films/`);

ghibliFilm$
  .pipe(
    mergeAll(),
    map(({ title }) => title),
    take(3),
    finalize(() => console.log("Peticiones Realizadas"))
  )
  .subscribe(console.log, console.error, () => console.log("Flujo Completado"));
// Salida: Castle in the Sky, Grave of the Fireflies, My Neighbor Totoro, Flujo Completado, Peticiones Realizadas
```

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/finalize.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/finalize">Documentación oficial en inglés</a>
