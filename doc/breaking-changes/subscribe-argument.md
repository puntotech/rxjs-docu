# Argumentos Subscribe

Es posible que se haya visto que algunas firmas del método `subscribe` están obsoletas, lo que puede haber causado confusión. El método `subscribe` en sí no está obsoleto. Este cambio afecta también al operador tap, ya que tap posee la misma firma que el método `subscribe`.

Este cambio existe en preparación para un futuro en el que se permitirá la configuración de `subscribe` mediante el segundo argumento, para casos como `AbortSignal` o similares (por ejemplo `source$.`subscribe`(fn, { signal })`). Este cambio también se ha hecho debido a que tener 2-3 argumentos puede hacer que el código sea poco legible. Por ejemplo, se podrían elegir nombres poco adecuados para las funciones y confundir al lector:

`source$.subscribe(doSomething, doSomethingElse, lol)`

Con esta firma, se necesita conocer el funcionamiento de `subscribe`, mientras que si se utiliza un observador parcial no es necesario:

`source$.subscribe({ next: doSomething, error: doSomethingElse, complete: lol })`

> Este cambio se introdujo en RxJS 6.4.

En resumen, todas las firmas en las que se especifica una callback `error` o `complete` anónima y se pasa una función vacía a una de las callbacks están obsoletas.

## Qué firmas han sido afectadas

Todas las firmas de `suscribe` que reciben más de un argumento ahora están obsoletas.

Las firmas para pasar únicamente la callback `complete` están obsoletas.

```
import { of } from 'rxjs';

// Obsoleto
of([1,2,3]).subscribe(null, null, console.info); // difficult to read
// Sugerencia
of([1,2,3]).subscribe({complete: console.info});
```

De manera parecida, las firmas para pasar únicamente la callback `error` están obsoletas.

```
import { throwError } from 'rxjs';

// Obsoleto
throwError('I am an error').subscribe(null, console.error);

// Sugerencia
throwError('I am an error').subscribe({error: console.error});
```

En general se recomienda utilizar la función anónima solo si se especifica la callback `next`. En cualquier otro caso se recomienda pasar un Observador.

```
import { of } from 'rxjs';

// Recomendado
of([1,2,3]).subscribe((v) => console.info(v));

// También se recomienda
of([1,2,3]).subscribe({
next: (v) => console.log(v),
error: (e) => console.error(e),
complete: () => console.info('complete')
})
```
