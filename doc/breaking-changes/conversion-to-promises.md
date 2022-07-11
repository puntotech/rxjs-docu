# Conversión a Promesas

La similitud entre Observables y Promesas radica en que ambas colecciones pueden producir valores a lo largo del tiempo, pero la diferencia es que los Observables pueden producir ningún, o más de un valor, mientras que las Promesas producen un único valor cuando se resuelven con éxito.

## Problemas

Por esta razón, en RxJS 7, el tipo de retorno del método `toPromise()` se ha modificado para reflejar mejor el hecho de que los Observables pueden producir cero valores. Esto puede suponer un _breaking change_ para algunos proyectos, ya que el tipo de retorno se ha cambiado de `Promise<T>` a `Promise<T | undefined>`.

Además, el nombre del método `toPromise()` nunca indicaba cuál de los valores emitidos por el Observable sería el que tomaría la Promesa al resolverse, ya que los Observables pueden emitir múltiples valores a lo largo del tiempo. Al convertir a una Promesa, quizá se quiera elegir qué valor elegir - si el primer valor que haya llegado, o el último. Para solucionar estos problemas, se decidió que el método `toPromise` pasaría a estar obsoleto, y se introducieron dos nuevas funciones _helper_ para la conversión a Promesas.

Also, `toPromise()` method name was never indicating what emitted value a Promise will resolve with because Observables can produce multiple values over time. When converting to a Promise, you might want to choose which value to pick - either the first value that has arrived or the last one. To fix all these issues, we decided to deprecate toPromise(), and to introduce the two new helper functions for conversion to Promises.

## Las dos nuevas funciones

Para reemplazar el método `toPromise()` obsoleto, se debe utilizar una de las dos funciones estáticas de conversión `firstValueFrom` or `lastValueFrom`.

### lastValueFrom

`lastValueFrom` es prácticamente igual que `toPromise()`. Esto quiere decir que se resolverá con el último valor que haya llegado cuando el Observable se complete, pero con una diferencia en su comportamiento cuando el Observable se complete sin emitir ningún valor. En este caso, `toPromise()` se resolvía con éxito con `undefined` , mientras que `lastValueFrom` se rechazará con `EmptyError`. De esta menera, el tipo de retorno de `lastValueFrom` es `Promise<T>`, al igual que `toPromise()` en RxJS 6.

#### Ejemplo

```
    import { interval, take, lastValueFrom } from 'rxjs';

    async function execute() {
      const source$ = interval(2000).pipe(take(10));
      const finalNumber = await lastValueFrom(source$);
      console.log(`El último número es ${finalNumber}`);
    }

    execute();

    // Salida esperada:
    // "El último número es 9"
```

### firstValueFrom

Sin embargo, quizá se quiera obtener el primer valor que llegue sin esperar a que el Observable se complete. En este caso se puede utilizar `firstValueFrom`. `firstValueFrom` se resolverá a una Promesa con el primer valor que haya emitido el Observable, y cancelará la suscripción automáticamente para retener recursos. `firstValueFrom` también se rechazará con un EmptyError si el Observable se completa sin emitir ningún valor.

#### Ejemplo

```
    import { interval, firstValueFrom } from 'rxjs';

    async function execute() {
      const source$ = interval(2000);
      const firstNumber = await firstValueFrom(source$);
      console.log(`El primer número es ${firstNumber}`);
    }

    execute();

    // Salida esperada:
    // "El primer número es 0"
```

Ambas funciones devolverán una Promesa que se rechazará si se produce un error en el Observable fuente. La promesa se rechazará con el mismo error que haya ocurrido en el Observable.

### Uso del valor por defecto

Si no se desea que las Promesas creadas por `lastValueFrom` o `firstValueFrom` se rechacen con EmptyError en el caso de que no se emita ningún valor antes de que el Observable se complete, se puede utilizar el segundo parámetro. Este segundo parámetro dbe ser un objeto con un parámetro `defaultValue`. El valor en `defaultValue` se utilizará para resolver la Promesa si el Observable fuente se completa sin emitir ningún valor.

```
import { firstValueFrom, EMPTY } from 'rxjs';

const result = await firstValueFrom(EMPTY, { defaultValue: 0 });
console.log(result);

// Salida esperada:
// 0
```

## Advertencia

Solo se debe utilizar la función `lastValueFrom` si se tiene la certeza de que el Observable fuente se acabará completando.
La función `firstValueFrom` se debe utilizar si se tiene la certeza de que el Observable fuente emitirá al menos un valor, o se acabará completando. Si el Observable fuente no se completa, ni emite ningún valor, se puede obtener una Promesa que esté colgada, y potencialmente todo el estado de una función asíncrona acabaría colgando en memoria. Para evitar esta situación, se puede utilizar timeout, take, takeWhile, o takeUntil, entre otros.
