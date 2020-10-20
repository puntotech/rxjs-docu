# ignoreElements

<h2 class="subtitle">Ignora todos los elementos emitidos por el Observable fuente, propagando únicamente las llamadas a <code>complete</code> o a <code>error</code></h2>

<details>
<summary>Signatura</summary>

### Firma

`ignoreElements(): OperatorFunction<any, never>`

### Parámetros

No recibe ningún parámetro

### Retorna

`OperatorFunction<any, never>`: Un Observable vacío que solo propaga las llamadas `complete` o `error` que haga el Observable fuente.

</details>

## Descripción

<img src="assets/images/marble-diagrams/filtering/ignoreElements.png" alt="Diagrama de canicas del operador ignoreElements">

## Ejemplos

**Ignorar todos los valores del Observable fuente hasta que se complete**

<a target="_blank" href="https://stackblitz.com/edit/docu-rxjs-ignoreelements?file=index.ts">StackBlitz</a>

```javascript
import { ignoreElements } from "rxjs/operators";
import { of, throwError } from "rxjs";

const hater$ = of(
  "No eres lo suficientemente buena/o",
  "Tu código es una m****a",
  "Nunca vas a conseguirlo",
  "Las mujeres no saben programar"
);

hater$
  .pipe(ignoreElements())
  .subscribe(console.log, console.error, () =>
    console.log("Haters ignorados :)")
  );
// Salida: Haters ignorados :)
```

**Si ocurre un error, será emitido**

<a target="_blank" href="https://stackblitz.com/edit/docu-rxjs-ignoreelements-2?file=index.ts">StackBlitz</a>

```javascript
import { ignoreElements } from "rxjs/operators";
import { throwError } from "rxjs";

const error$ = throwError("Ha ocurrido un error");

error$
  .pipe(ignoreElements())
  .subscribe(console.log, console.error, () => console.log("Complete"));
// Salida: (error) Ha ocurrido un error
```

### Ejemplo de la documentación oficial

**Ignorar los valores emitidos hasta que el Observable se complete**

```javascript
import { of } from "rxjs";
import { ignoreElements } from "rxjs/operators";

of("you", "talking", "to", "me")
  .pipe(ignoreElements())
  .subscribe(
    (word) => console.log(word),
    (err) => console.log("error:", err),
    () => console.log("the end")
  );
// Salida:
// 'the end'
```

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/ignoreElements.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/ignoreElements">Documentación oficial en inglés</a>
