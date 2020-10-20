# range

<h2 class="subtitle"> Crea un Observable que emite una secuencia de números dentro de un rango
</h2>

<details>
<summary>Signatura</summary>

### Firma

`range(start: number = 0, count?: number, scheduler?: SchedulerLike): Observable<number>`

### Parámetros

<table>
<tr><td>start</td><td>Opcional. El valor por defecto es <code>0</code>.
El valor del primer número de la secuencia.</td></tr>
<tr><td>count</td><td>Opcional. El valor por defecto es <code>undefined</code>.
La cantidad de números secuenciales que generar.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
El <code>SchedulerLike</code> para gestionar las emisiones.</td></tr>
</table>

### Retorna

`Observable<number>`: Un Observable de números que emite una secuencia finita de números consecutivos dentro de un rango.

</details>

## Descripción

Emite una secuencia de números dentro de un rango.

<img src="assets/images/marble-diagrams/creation/range.png" alt="Diagrama de canicas de range">

`range` emite una secuencia de números en un rango, en orden, donde se permite seleccionar el comienzo del rango y su longitud. Por defecto, no se utiliza ningún `SchedulerLike`, por lo que las notificaciones se emiten de forma síncrona, pero se puede proporcionar un `SchedulerLike` opcional para regular dichas notificaciones.

## Ejemplos

**Emitir una secuencia de 5 números. Al no especificar el comienzo del rango, se utilizará el valor por defecto: 0**

<a target="_blank" href="https://stackblitz.com/edit/docu-rxjs-range?file=index.ts">StackBlitz</a>

```javascript
import { range } from "rxjs";

const number$ = range(5);

number$.subscribe((number) => console.log(number));
// Salida: 0, 1, 2, 3, 4
```

**Emitir una secuencia de 5 números, especificando el valor inicial**

<a target="_blank" href="https://stackblitz.com/edit/docu-rxjs-ramge-2?file=index.ts">StackBlitz</a>

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

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/range.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/index/function/range">Documentación oficial en inglés</a>
