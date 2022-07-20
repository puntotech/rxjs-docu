---
description: Crea un Observable que emite una secuencia de números dentro de un rango
---

# range

<details>

<summary>Signatura</summary>

#### Firma

`range(start: number = 0, count?: number, scheduler?: SchedulerLike): Observable<number>`

#### Parámetros

#### Retorna

`Observable<number>`: Un Observable de números que emite una secuencia finita de números consecutivos dentro de un rango.

</details>

## Descripción

Emite una secuencia de números dentro de un rango.

![Diagrama de canicas de range](assets/images/marble-diagrams/creation/range.png)

`range` emite una secuencia de números en un rango, en orden, donde se permite seleccionar el comienzo del rango y su longitud. Por defecto, no se utiliza ningún `SchedulerLike`, por lo que las notificaciones se emiten de forma síncrona, pero se puede proporcionar un `SchedulerLike` opcional para regular dichas notificaciones.

## Ejemplos

**Emitir una secuencia de 5 números. Al no especificar el comienzo del rango, se utilizará el valor por defecto: 0**

[StackBlitz](https://stackblitz.com/edit/docu-rxjs-range?file=index.ts)

```javascript
import { range } from "rxjs";

const number$ = range(5);

number$.subscribe((number) => console.log(number));
// Salida: 0, 1, 2, 3, 4
```

**Emitir una secuencia de 5 números, especificando el valor inicial**

[StackBlitz](https://stackblitz.com/edit/docu-rxjs-ramge-2?file=index.ts)

```javascript
import { range } from "rxjs";

const range$ = range(1, 5);

range$.subscribe(console.log);
// Salida: 1, 2, 3, 4, 5
```

### Ejemplo de la documentación oficial

**Emitir los números del 1 al 10**

```javascript
import { range } from "rxjs";

const numbers = range(1, 10);
numbers.subscribe((x) => console.log(x));
```

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/range.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/index/function/range)
