---
description: >-
  Emite los elementos que se especifiquen como argumentos antes de empezar a
  emitir las emisiones del Observable fuente
---

# startWith

<details>

<summary>Signatura</summary>

#### Firma

`startWith<T, D>(...array: (SchedulerLike | T)[]): OperatorFunction<T, T | D>`

#### Parámetros

#### Retorna

`OperatorFunction<T, T | D>`: Un Observable que emite primero los elementos en el `Iterable` especificado, y después emite los valores emitidos por el Observable fuente.

</details>

## Descripción

Primero emite sus argumentos en orden, y después las emisiones de la fuente.

![Diagrama de canicas del operador startWith](assets/images/marble-diagrams/join-creation/startWith.png)

## Ejemplos

**Proporcionar un valor inicial al flujo de emisiones**

[StackBlitz](https://stackblitz.com/edit/docu-rxjs-startwith?file=index.ts)

```javascript
import { startWith } from "rxjs/operators";
import { from } from "rxjs";

const fruit$ = from(["Fresa", "Cereza"]);

fruit$.pipe(startWith("Arándano")).subscribe(console.log);
// Salida: Arándano, Fresa, Cereza
```

**A startWith se le puede proporcionar más de un valor**

[StackBlitz](https://stackblitz.com/edit/docu-rxjs-startwith-2?file=index.ts)

```javascript
import { startWith } from "rxjs/operators";
import { range } from "rxjs";

const number$ = range(0, 4);

number$.pipe(startWith(-3, -2, -1)).subscribe(console.log);
// Salida: -3, -2, -1, 0, 1, 2, 3
```

### Ejemplo de la documentación oficial

**Comenzar la cadena de emisiones con 'primero' y 'segundo'**

```javascript
import { of } from "rxjs";
import { startWith } from "rxjs/operators";

of("Valores de la fuente")
  .pipe(startWith("Primero", "Segundo"))
  .subscribe((x) => console.log(x));

// Salida: "Primero", "Segundo", "Valores de la fuente"
```

<details>

<summary>Sobrecargas</summary>

#### Firma

`startWith(scheduler: SchedulerLike): MonoTypeOperatorFunction<T>`

#### Parámetros

#### Retorna

`MonoTypeOperatorFunction<T>`

#### Firma

`startWith(v1: D, scheduler: SchedulerLike): OperatorFunction<T, T | D>`

#### Parámetros

#### Retorna

`OperatorFunction<T, T | D>`

#### Firma

`startWith(v1: D, v2: E, scheduler: SchedulerLike): OperatorFunction<T, T | D | E>`

#### Parámetros

#### Retorna

`OperatorFunction<T, T | D | E>`

#### Firma

`startWith(v1: D, v2: E, v3: F, scheduler: SchedulerLike): OperatorFunction<T, T | D | E | F>`

#### Parámetros

#### Retorna

`OperatorFunction<T, T | D | E | F>`

#### Firma

`startWith(v1: D, v2: E, v3: F, v4: G, scheduler: SchedulerLike): OperatorFunction<T, T | D | E | F | G>`

#### Parámetros

#### Retorna

OperatorFunction\<T, T | D | E | F | G>

#### Firma

`startWith(v1: D, v2: E, v3: F, v4: G, v5: H, scheduler: SchedulerLike): OperatorFunction<T, T | D | E | F | G | H>`

#### Parámetros

#### Retorna

OperatorFunction\<T, T | D | E | F | G | H>

#### Firma

`startWith(v1: D, v2: E, v3: F, v4: G, v5: H, v6: I, scheduler: SchedulerLike): OperatorFunction<T, T | D | E | F | G | H | I>`

#### Parámetros

#### Retorna

`OperatorFunction<T, T | D | E | F | G | H | I>`

#### Firma

`startWith(v1: D): OperatorFunction<T, T | D>`

#### Parámetros

#### Retorna

`OperatorFunction<T, T | D>`

#### Firma

`startWith(v1: D, v2: E): OperatorFunction<T, T | D | E>`

#### Parámetros

#### Retorna

`OperatorFunction<T, T | D | E>`

#### Firma

`startWith(v1: D, v2: E, v3: F): OperatorFunction<T, T | D | E | F>`

#### Parámetros

#### Retorna

`OperatorFunction<T, T | D | E | F>`

#### Firma

`startWith(v1: D, v2: E, v3: F, v4: G): OperatorFunction<T, T | D | E | F | G>`

#### Parámetros

#### Retorna

`OperatorFunction<T, T | D | E | F | G>`

#### Firma

`startWith(v1: D, v2: E, v3: F, v4: G, v5: H): OperatorFunction<T, T | D | E | F | G | H>`

#### Parámetros

#### Retorna

`OperatorFunction<T, T | D | E | F | G | H>`

#### Firma

`startWith(v1: D, v2: E, v3: F, v4: G, v5: H, v6: I): OperatorFunction<T, T | D | E | F | G | H | I>`

#### Parámetros

#### Retorna

`OperatorFunction<T, T | D | E | F | G | H | I>`

#### Firma

`startWith(...array: D[]): OperatorFunction<T, T | D>`

#### Parámetros

#### Retorna

`OperatorFunction<T, T | D>`

#### Firma

`startWith(...array: (SchedulerLike | D)[]): OperatorFunction<T, T | D>`

#### Parámetros

#### Retorna

`OperatorFunction<T, T | D>`

</details>

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/startWith.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/operators/startWith)
