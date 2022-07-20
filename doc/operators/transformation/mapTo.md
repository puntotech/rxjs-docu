---
description: Emite el mismo valor cada vez que el Observable fuente emite un valor
---

# mapTo

<details>

<summary>Signatura</summary>

#### Firma

`mapTo<T, R>(value: R): OperatorFunction<T, R>`

#### Parámetros

#### Retorna

`OperatorFunction<T, R>`: Un Observable que emite el mismo valor cada vez que el Observable fuente emite algo.

</details>

## Descripción

Es como `map`, pero proyecta cada emisión siempre al mismo valor.

![Diagrama de canicas del operador mapTo](assets/images/marble-diagrams/transformation/mapTo.png)

Recibe un valor constante como argumento, que emite cuandoquiera que el Observable fuente emita un valor. En otras palabras, ignora el valor emitido, y simplemente utiliza el momento de emisión para saber cuándo emitir el valor constante proporcionado.

## Ejemplos

**Emitir "La respuesta es 42" de forma indefinida**

[StackBlitz](https://stackblitz.com/edit/rxjs-mapto-1?file=index.ts)

```javascript
import { mapTo } from "rxjs/operators";
import { interval } from "rxjs";

const number$ = interval(1000);

number$.pipe(mapTo("La respuesta es 42")).subscribe(console.log);
// Salida: La respuesta es 42, La respuesta es 42, La respuesta es 42, La respuesta es 42...
```

**Emitir "¡Tecla pulsada!" cada vez que se pulse una tecla**

[StackBlitz](https://stackblitz.com/edit/rxjs-mapto-2?file=index.ts)

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

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/mapTo.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/operators/mapTo)
