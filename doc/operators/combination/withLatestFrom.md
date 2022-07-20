---
description: >-
  Combina el Observable fuente con otros Observables para crear un Observable
  cuyas emisiones se calculan a partir de los valores más recientes de cada uno,
  cada vez que la fuente emite
---

# withLatestFrom

<details>

<summary>Signatura</summary>

#### Firma

`withLatestFrom<T, R>(...args: any[]): OperatorFunction<T, R>`

#### Parámetros

#### Retorna

`OperatorFunction<T, R>`: Un Observable de valores proyectados de cada Observable _input_, o un array de los valores más recientes de cada Observable _input_.

</details>

## Descripción

Cuando el Observable fuente emite un valor, combina dicho valor con las emisiones más recientes de los demás Observables, y emite el resultado de dicha combinación.

![Diagrama de canicas del operador withLatestFrom](assets/images/marble-diagrams/join-creation/withLatestFrom.png)

`withLatestFrom` combina cada valor del Observable fuente (la instancia) con los valores más recientes de los demás Observables cada vez que la fuente emite un valor. Opcionalmente, se puede utilizar una función de proyección para determinar el valor que se emite en el Observable resultante. Todos los Observables _input_ deben emitir al menos un valor para que el Observable resultante pueda emitir.

## Ejemplos

**Combinar cada tecla pulsada con un Observable intervalo, para saber en qué momento se pulsa cada tecla**

[StackBlitz](https://stackblitz.com/edit/docu-rxjs-withlatestfrom?file=index.ts)

```javascript
import { fromEvent, interval } from "rxjs";
import { withLatestFrom, map } from "rxjs/operators";

const key$ =
  fromEvent <
  KeyboardEvent >
  (document, "keydown").pipe(map(({ code }) => code));

const number$ = interval(1000);

key$
  .pipe(
    withLatestFrom(number$),
    map(([code, time]) => `Tecla ${code} pulsada a los ${time} segundos`)
  )
  .subscribe((x) => console.log(x));
// Salida: (2s) Tecla KeyR pulsada a los 2 segundos (1s) Tecla KeyX pulsada a los 3 segundos...
```

### Ejemplo de la documentación oficial

**Emitir un array con el temporizador más reciente más el evento click, en cada click**

```javascript
import { fromEvent, interval } from "rxjs";
import { withLatestFrom } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const timer = interval(1000);
const result = clicks.pipe(withLatestFrom(timer));
result.subscribe((x) => console.log(x));
```

<details>

<summary>Sobrecargas</summary>

#### Firma

`withLatestFrom(project: (v1: T) => R): OperatorFunction<T, R>`

#### Parámetros

#### Retorna

`OperatorFunction<T, R>`

#### Firma

`withLatestFrom(source2: O2, project: (v1: T, v2: ObservedValueOf<O2>) => R): OperatorFunction<T, R>`

#### Parámetros

#### Retorna

`OperatorFunction<T, R>`

#### Firma

`withLatestFrom(v2: O2, v3: O3, project: (v1: T, v2: ObservedValueOf<O2>, v3: ObservedValueOf<O3>) => R): OperatorFunction<T, R>`

#### Parámetros

#### Retorna

`OperatorFunction<T, R>`

#### Firma

`withLatestFrom(v2: O2, v3: O3, v4: O4, project: (v1: T, v2: ObservedValueOf<O2>, v3: ObservedValueOf<O3>, v4: ObservedValueOf<O4>) => R): OperatorFunction<T, R>`

#### Parámetros

#### Retorna

`OperatorFunction<T, R>`

#### Firma

`withLatestFrom(v2: O2, v3: O3, v4: O4, v5: O5, project: (v1: T, v2: ObservedValueOf<O2>, v3: ObservedValueOf<O3>, v4: ObservedValueOf<O4>, v5: ObservedValueOf<O5>) => R): OperatorFunction<T, R>`

#### Parámetros

#### Retorna

`OperatorFunction<T, R>`

#### Firma

`withLatestFrom(v2: O2, v3: O3, v4: O4, v5: O5, v6: O6, project: (v1: T, v2: ObservedValueOf<O2>, v3: ObservedValueOf<O3>, v4: ObservedValueOf<O4>, v5: ObservedValueOf<O5>, v6: ObservedValueOf<O6>) => R): OperatorFunction<T, R>`

#### Parámetros

#### Retorna

`OperatorFunction<T, R>`

#### Firma

`withLatestFrom(source2: O2): OperatorFunction<T, [T, ObservedValueOf<O2>]>`

#### Parámetros

#### Retorna

`OperatorFunction<T, [T, ObservedValueOf<O2>]>`

#### Firma

`withLatestFrom(v2: O2, v3: O3): OperatorFunction<T, [T, ObservedValueOf<O2>, ObservedValueOf<O3>]>`

#### Parámetros

#### Retorna

`OperatorFunction<T, [T, ObservedValueOf<O2>, ObservedValueOf<O3>]>`

#### Firma

`withLatestFrom(v2: O2, v3: O3, v4: O4): OperatorFunction<T, [T, ObservedValueOf<O2>, ObservedValueOf<O3>, ObservedValueOf<O4>]>`

#### Parámetros

#### Retorna

`OperatorFunction<T, [T, ObservedValueOf<O2>, ObservedValueOf<O3>, ObservedValueOf<O4>]>`

#### Firma

`withLatestFrom(v2: O2, v3: O3, v4: O4, v5: O5): OperatorFunction<T, [T, ObservedValueOf<O2>, ObservedValueOf<O3>, ObservedValueOf<O4>, ObservedValueOf<O5>]>`

#### Parámetros

#### Retorna

`OperatorFunction<T, [T, ObservedValueOf<O2>, ObservedValueOf<O3>, ObservedValueOf<O4>, ObservedValueOf<O5>]>`

#### Firma

`withLatestFrom(v2: O2, v3: O3, v4: O4, v5: O5, v6: O6): OperatorFunction<T, [T, ObservedValueOf<O2>, ObservedValueOf<O3>, ObservedValueOf<O4>, ObservedValueOf<O5>, ObservedValueOf<O6>]>`

#### Parámetros

#### Retorna

`OperatorFunction<T, [T, ObservedValueOf<O2>, ObservedValueOf<O3>, ObservedValueOf<O4>, ObservedValueOf<O5>, ObservedValueOf<O6>]>`

#### Firma

`withLatestFrom(...observables: any[]): OperatorFunction<T, R>`

#### Parámetros

#### Retorna

`OperatorFunction<T, R>`

#### Firma

`withLatestFrom(array: any[]): OperatorFunction<T, R>`

#### Parámetros

#### Retorna

`OperatorFunction<T, R>`

#### Firma

`withLatestFrom(array: any[], project: (...values: any[]) => R): OperatorFunction<T, R>`

#### Parámetros

#### Retorna

`OperatorFunction<T, R>`

</details>

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/withLatestFrom.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/operators/withLatestFrom)
