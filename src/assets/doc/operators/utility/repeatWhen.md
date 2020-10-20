# repeatWhen

<h2 class="subtitle"> Repite o no una secuencia Observable en función de un Observable de notificaciones
</h2>

<details>
<summary>Signatura</summary>

### Firma

`repeatWhen<T>(notifier: (notifications: Observable<any>) => Observable<any>): MonoTypeOperatorFunction<T>`

### Parámetros

<table>
<tr><td>notifier</td><td>Recibe un Observable de notificaciones con las que el usuario puede completar el flujo o provocar un error, abortando la repetición.</td></tr>
</table>

### Retorna

`MonoTypeOperatorFunction<T>`: El Observable fuente modificado con lógica de repetición.

</details>

## Descripción

<img src="assets/images/marble-diagrams/utility/repeatWhen.png" alt="Diagrama de canicas del operador repeatWhen">

<!-- TODO Revise translation -->

Retorna un Observable que refleja el Observable fuente con la excepción de un evento `complete`. Si el Observable fuente hace una llamada `complete`, `repeatWhen` emitirá al Observable retornado por el notificador. Si ese Observable hace una llamada `complete` o `error`, entonces este método hará una llamada `complete` o `error` en la suscripción hija. Si no, `repeatWhen` volverá a suscribirse al Observable fuente.

<!-- Returns an Observable that mirrors the source Observable with the exception of a complete. If the source Observable calls complete, this method will emit to the Observable returned from notifier. If that Observable calls complete or error, then this method will call complete or error on the child subscription. Otherwise this method will resubscribe to the source Observable. -->

## Ejemplos

**Repetir una secuencia de números con cada click**

<a target="_blank" href="https://stackblitz.com/edit/docu-rxjs-repeatwhen?file=index.ts">StackBlitz</a>

```javascript
import { repeatWhen } from "rxjs/operators";
import { fromEvent, range } from "rxjs";

const click$ = fromEvent < MouseEvent > (document, "click");

const number$ = range(1, 3);

number$.pipe(repeatWhen(() => click$)).subscribe(console.log);
// Salida: 1, 2, 3 (click) 1, 2, 3
```

**Suscribirse al Observable fuente con cada click, desencadenando una nueva petición AJAX con un id aleatorio**

<a target="_blank" href="https://stackblitz.com/edit/rxjs-repeatwhen-2?file=index.ts">StackBlitz</a>

```typescript
import { repeatWhen, map } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import { fromEvent, defer } from "rxjs";

const ids = [
  "58611129-2dbc-4a81-a72f-77ddfc1b1b49",
  "2baf70d1-42bb-4437-b551-e5fed5a87abe",
];

function getRandomId() {
  return ids[Math.floor(Math.random() * ids.length)];
}

const click$ = fromEvent<MouseEvent>(document, "click");

defer(() =>
  ajax.getJSON(`https://ghibliapi.herokuapp.com/films/${getRandomId()}`)
)
  .pipe(
    map(({ title }) => title),
    repeatWhen(() => click$)
  )
  .subscribe(console.log);
// Salida: (click) Castle in the Sky (click) My Neighbor Totoro (click) My Neighbor Totoro...
```

#### Ejemplo de la documentación oficial

**Repetir un flujo de mensajes con cada click**

```javascript
import { of, fromEvent } from "rxjs";
import { repeatWhen } from "rxjs/operators";

const source = of("Repeat message");
const documentClick$ = fromEvent(document, "click");

source
  .pipe(repeatWhen(() => documentClick$))
  .subscribe((data) => console.log(data));
```

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/repeatWhen.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/repeatWhen">Documentación oficial en inglés</a>
