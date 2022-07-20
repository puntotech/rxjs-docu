---
description: >-
  Convierte un Observable de orden superior en uno de primer orden ignorando los
  Observables internos mientras el Observable interno actual no se haya
  completado
---

# exhaust

<details>

<summary>Signatura</summary>

#### Firma

`exhaust<T>(): OperatorFunction<any, T>`

#### Parámetros

No recibe ningún parámetro.

#### Retorna

`OperatorFunction<any, T>`: Un Observable que recibe un Observable de orden superior y propaga el primer Observable hasta que se completa, antes de suscribirse al siguiente Observable.

</details>

## Descripción

Convierte un Observable de orden superior en uno de primer orden ignorando los Observables internos mientras el Observable interno actual no se haya completado.

![Diagrama de canicas del operador exhaust](assets/images/marble-diagrams/join-creation/exhaust.png)

`exhaust` se suscribe a un Observable que emite Observables, también conocido como Observable de orden superior. Cuando recibe un Observable interno, el Observable resultante comienza a emitir sus emisiones. Hasta este punto, se comporta igual que `mergeAll`. Sin embargo, `exhaust` ignora cada Observable interno nuevo hasta que el Observable actual no se haya completado. Una vez esté completo, aceptará el siguiente Observable interno y comenzará a emitir sus valores, repitiendo el proceso.

## Ejemplos

**Ignorar todos los Observables internos hasta que el Observable interno actual esté completo**

[StackBlitz](https://stackblitz.com/edit/docu-rxjs-exhaust?file=index.ts)

```javascript
import { exhaust, map, delay } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import { of } from "rxjs";

const pokemonId$ = of(1, 5, 6);

function getPokemonName(id: number) {
  return ajax.getJSON(`https://pokeapi.co/api/v2/pokemon/${id}`).pipe(
    map(({ name }) => name),
    delay(2000)
  );
}

pokemonId$
  .pipe(
    map((id) => getPokemonName(id)),
    exhaust()
  )
  .subscribe(console.log);
// Salida: bulbasaur
```

### Ejemplo de la documentación oficial

**Por cada click, ejecutar un temporizador, únicamente si no hay ningún temporizador activo**

```javascript
import { fromEvent, interval } from "rxjs";
import { exhaust, map, take } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const higherOrder = clicks.pipe(map((ev) => interval(1000).pipe(take(5))));
const result = higherOrder.pipe(exhaust());
result.subscribe((x) => console.log(x));
```

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/exhaust.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/operators/exhaust)
