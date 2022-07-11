# Argumentos Array

Para unificar la API de `forkJoin` y `combineLatest`, algunas firmas han pasado a estar obsoletas, ya que se recomienda pasarle un Objeto o un Array a estos operadores.

> Este cambio se introdujo en RxJS 6.5.

## Operadores afectados por este cambio

- combineLatest
- forkJoin

## Cómo refactorizar

Las firmas en las que se pasaban Observables como parámetros a estos operadores ahora están obsoletas.

```
import {forkJoin, from} from 'rxjs';

const odd$ = from([1,3,5]);
const even$ = from([2,4,6]);

// Obsoleto
forkJoin(odd$, even$);
// Se puede usar así
forkJoin([odd$, even$]);
// o así
forkJoin({odd: odd$, even: even$})
```
