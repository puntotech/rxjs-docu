# repeatWhen

## Repite o no una secuencia Observable en función de un Observable de notificaciones

<details>

<summary>Signatura</summary>

#### Firma

`repeatWhen<T>(notifier: (notifications: Observable<any>) => Observable<any>): MonoTypeOperatorFunction<T>`

#### Parámetros

#### Retorna

`MonoTypeOperatorFunction<T>`: El Observable fuente modificado con lógica de repetición.

</details>

## Descripción

![Diagrama de canicas del operador repeatWhen](assets/images/marble-diagrams/utility/repeatWhen.png)

Retorna un Observable que refleja el Observable fuente con la excepción de un evento `complete`. Si el Observable fuente hace una llamada `complete`, `repeatWhen` emitirá al Observable retornado por el notificador. Si ese Observable hace una llamada `complete` o `error`, entonces este método hará una llamada `complete` o `error` en la suscripción hija. Si no, `repeatWhen` volverá a suscribirse al Observable fuente.

## Ejemplos

**Repetir una secuencia de números con cada click**

[StackBlitz](https://stackblitz.com/edit/docu-rxjs-repeatwhen?file=index.ts)

```javascript
import { repeatWhen } from "rxjs/operators";
import { fromEvent, range } from "rxjs";

const click$ = fromEvent < MouseEvent > (document, "click");

const number$ = range(1, 3);

number$.pipe(repeatWhen(() => click$)).subscribe(console.log);
// Salida: 1, 2, 3 (click) 1, 2, 3
```

**Suscribirse al Observable fuente con cada click, desencadenando una nueva petición AJAX con un id aleatorio**

[StackBlitz](https://stackblitz.com/edit/rxjs-repeatwhen-2?file=index.ts)

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

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/repeatWhen.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/operators/repeatWhen)
