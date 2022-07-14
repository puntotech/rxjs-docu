# switchMapTo

## Proyecta cada valor de la fuente al mismo Observable interno, posteriormente usando switchMap para unirlos al Observable resultante

<details>

<summary>Signatura</summary>

#### Firma

`switchMapTo<T, I, R>(innerObservable: any, resultSelector?: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R): OperatorFunction<T, I | R>`

#### Parámetros

#### Retorna

`OperatorFunction<T, I | R>`: Un Observable que emite elementos del `innerObservable` cada vez que el Observable fuente emite un valor. Se obtienen los valores del Observable interno más reciente.

</details>

## Descripción

Es como `switchMap`, pero siempre proyecta los valores sobre el mismo Observable interno.

![Diagrama de canicas del operador switchMapTo](assets/images/marble-diagrams/transformation/switchMapTo.png)

Proyecta cada emisión de la fuente al Observable `innerObservable` proporcionado, independientemente del valor de la emisión, y posteriormente 'aplasta' los Observables internos resultantes en un solo Observable, el Observable resultante. El Observable resultante solo emite valores de la instancia más reciente de `innerObservable`.

## Ejemplos

**Proyectar cada click al mismo Observable interno, que emite un mensaje**

Si antes de que pasen dos segundos se vuelve a hacer click, switchMapTo cancelará la suscripción al Observable interno antiguo y se suscribirá al nuevo. Esto quiere decir que, si no se deja que pasen dos segundos sin hacer ningún click, nunca se verá el mensaje del Observable interno.

[StackBlitz](https://stackblitz.com/edit/rxjs-switchmapto-1?file=index.ts)

```typescript
import { fromEvent, of } from "rxjs";
import { delay, switchMapTo } from "rxjs/operators";

const click$ = fromEvent<MouseEvent>(document, "click");

const message$ = of("Hola, has hecho click :D").pipe(delay(2000));

click$.pipe(switchMapTo(message$)).subscribe(console.log);
// Salida: (click) (2s) 'Hola, has hecho click :D' (click) (1s) (click) (2s) 'Hola, has hecho click :D'...
```

**Cada 3 segundos, obtener los títulos de las 3 primeras películas de Ghibli**

[StackBlitz](https://stackblitz.com/edit/rxjs-switchmapto-2?file=index.ts)

### Ejemplo de la documentación oficial

**Reinicia un Observable intervalo con cada click**

```javascript
import { fromEvent, interval } from "rxjs";
import { switchMapTo } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const result = clicks.pipe(switchMapTo(interval(1000)));
result.subscribe((x) => console.log(x));
```

<details>

<summary>Sobrecargas</summary>

#### Firma

`switchMapTo(observable: any): OperatorFunction<any, R>`

#### Parámetros

#### Retorna

`OperatorFunction<any, R>`

#### Firma

`switchMapTo(observable: any, resultSelector: undefined): OperatorFunction<T, R>`

#### Parámetros

#### Retorna

`OperatorFunction<T, R>`

#### Firma

`switchMapTo(observable: any, resultSelector: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R): OperatorFunction<T, R>`

#### Parámetros

#### Retorna

`OperatorFunction<T, R>`

</details>

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/switchMapTo.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/operators/switchMapTo)
