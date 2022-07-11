# El Argumento Scheduler

Para limitar la API de algunos operadores, y también en preparación para una gran refactorización en V8, el argumento `scheduler` de muchos operadores ahora está obsoleto. Únicamente está obsoleto en aquellos métodos en los que raramente se utiliza este argumento. Por tanto, a aquellos operadores temporales, como por ejemplo interval, no les afecta este cambio.

Para dar soporte a esta transición se ha añadido la función de creación scheduled.

> Este cambio se introdujo en RxJS 6.5 y se convertirá en _breaking_ en RxJS 8.

## Operadores afectados por este cambio

- from
- of
- merge
- concat
- startWith
- endWith
- combineLatest

## Cómo refactorizar

Si se utiliza cualquier operador de la lista anterior y utiliza el argumento `scheduler`, existen tres opciones de refactorización.

### Refactorizando of y from

`scheduled` copia parte del comportamiento de `from`. Por tanto, si se utiliza `from` con un argumento `scheduler`, se puede reemplazar por `scheduled`.

For the of creation function you need to this Observable with scheduled and instead of passing the scheduler argument to of pass it to scheduled. Following code example demonstrate this process.

En lugar de utilizar la función de creación `of`, se debe utilizar `scheduled`, y en lugar de pasarle el argumento `scheduler` a `of`, se le debe pasar a `scheduled`. El siguiente código muestra este proceso:

```
import { of, asyncScheduler, scheduled } from 'rxjs';

// Obsoleto
of([1, 2, 3], asyncScheduler).subscribe((x) => console.log(x));

// Sugerencia de refactorización
scheduled([1, 2, 3], asyncScheduler).subscribe((x) => console.log(x));
```

### Refactorizando merge, concat, combineLatest, startWith y endWith

Anteriormente, si se quería utilizar uno de estos operadores con el argumento scheduler, se hacía así:

```
import { concat, of, asyncScheduler } from 'rxjs';

concat(of('hello '), of('World'), asyncScheduler).subscribe((x) => console.log(x));
```

Para gestionar el cambio se puede aprovechar la función `scheduled`.

```
import { scheduled, of, asyncScheduler, concatAll } from 'rxjs';

scheduled([of('hello '), of('World')], asyncScheduler)
    .pipe(concatAll())
    .subscribe((x) => console.log(x));
```

Se puede aplicar este patrón para refactorizar el uso obsoleto de `concat`, `startWith` y `endWith`, aunque se debe tener en cuenta que se necesita utilizar mergeAll para refactorizar el uso obsoleto de `merge`.

Con `combineLatest`, se debe utilizar combineLatestAll.

Por ejemplo, el código que anteriormente era así:

```
import { combineLatest, of, asyncScheduler } from 'rxjs';

combineLatest(of('hello '), of('World'), asyncScheduler).subscribe(console.log);
```

se convertiría en:

```
import { scheduled, of, asyncScheduler, combineLatestAll } from 'rxjs';

scheduled([of('hello '), of('World')], asyncScheduler)
    .pipe(combineLatestAll())
    .subscribe((x) => console.log(x));
```
