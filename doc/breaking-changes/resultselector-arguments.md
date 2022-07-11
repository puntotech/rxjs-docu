# Parámetro ResultSelector

Algunos operadores podían utilizarse con un argumento `resultSelector`
Some operator supported a resultSelector argument that acted as mapping function on the result of that operator. The same behavior can be reproduced with the map operator, therefore this argument became deprecated.

> Este cambio se introdujo en RxJS 6.0 y será _breaking_ en RxJS 8.

Existen dos razones por las que estos parámetros están obsoletos:

1. Aumenta el tamaño del buncle de cada operador
2. En algunos escenarios los valores tenían que retenerse en memoria, causando presión de memoria general

## Operadores afectados por este cambio

- concatMap
- concatMapTo
- exhaustMap
- mergeMap
- mergeMapTo
- switchMap
- swithMapTo

## Cómo refactorizar

En lugar de utilizar el argumento resultSelector, se puede aprovechar el operador map en el Observable interno:

```
import { fromEvent, switchMap, interval, map } from 'rxjs';

// Obsoleto
fromEvent(document, 'click').pipe(
switchMap((x) => interval(1000), (\_, x) => x + 1)
);

// Sugerencia de refactorización
fromEvent(document, 'click').pipe(
switchMap((x) => interval(1000).pipe(map((x) => x + 1)))
);
```
