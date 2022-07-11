# Instrucciones de importación

Existen diferentes formas de instalar RxJS. El utilizar/importar RxJS depende de la versión de RxJS utilizada, pero también depende del método de instalación utilizado.

Los operadores de tubería se introdujeron en la versión 5.5 de RxJS. Esto permitió que todos los operadores se exportasen de un solo sitio. El nuevo sitio de exportación se introdujo en la versión 6 de RxJS, donde todos los operadores de tubería se podían importar desde 'rxjs/operators'. Por ejemplo `import { map } from 'rxjs/operators'`

## New in RxJS v7.2.0

> A partir de RxJS v7.2.0, la mayoría de los operadores se han movido al sitio de exportación 'rxjs'. Esto quiere decir que los operadores deben exportarse de 'rxjs', ya que el sitio de exportación 'rxjs/operators' está obsoleto.

Por ejemplo, en lugar de utilizar:

`import { map } from 'rxjs/operators';`

Ahora se debe utilizar:

`import { map } from 'rxjs';`

Aunque la manera antigua de importar operadores sigue estando activa, será eliminada en una de las siguientes versiones.

Haz click aquí para ver cómo migrar.

## Sitios de exportación

RxJS v7 exporta 6 ubicaciones distintas desde las cuales se puede importar lo que se necesite. Estas son:

- 'rxjs' - por ejemplo: `import { of } from 'rxjs';`
- 'rxjs/operators' - por ejemplo: `import { map } from 'rxjs/operators';`
- 'rxjs/ajax' - por ejemplo: `import { ajax } from 'rxjs/ajax';`
- 'rxjs/fetch' - por ejemplo: `import { fromFetch } from 'rxjs/fetch';`
- 'rxjs/webSocket' - por ejemplo: `import { webSocket } from 'rxjs/webSocket';`
- 'rxjs/testing' - por ejemplo: `import { TestScheduler } from 'rxjs/testing';`

### Cómo migrar

Aunque no se haya eliminado nada de 'rxjs/operators', se recomienda encarecidamente importar los operadores desde 'rxjs'. Casi todas las exportaciones de funciones de operadores se han movido a 'rxjs', aunque quedan algunos operadores antiguos y obsoletos en 'rxjs/operators'. Estas funciones de operadores están en su mayoría obsoletas y la mayoría han sido reemplazadas por su equivalente estático o se mantienen como operadores, cambiándoles el nombre para que sean distintas a su equivalente de creación estática (suelen terminar con la palabra `With`).

Estos son:

'rxjs/operators' Operator Replace With Static Creation Operator Replace With New Operator Name
combineLatest combineLatest combineLatestWith
concat concat concatWith
merge merge mergeWith
onErrorResumeNext onErrorResumeNext -
partition partition -
race race raceWith
zip zip zipWith

Por ejemplo, la forma antigua y obsoleta de utilizar merge desde 'rxjs/operators' es:

```
import { merge } from 'rxjs/operators';

a$.pipe(merge(b$)).subscribe();
```

Sin embargo, esta forma de hacerlo debe ser evitada, siguiendo en su lugar uno de los dos siguientes ejemplos:

1. Utilizando una función merge estática de creación:

```
import { merge } from 'rxjs';

merge(a$, b$).subscribe();
```

2. También se puede utilizar el operador de tubería mergeWith:

```
import { mergeWith } from 'rxjs';

a$.pipe(mergeWith(b$)).subscribe();
```

Dependiendo del estilo que se prefiera, se puede utilizar una u otra manera, ya que ambas son equivalentes.

Dado que la nueva manera de importar operadores se introdujo con RxJS v7.2.0, las instrucciones se dividirán en antes o después de esta versión.

### ES6 via npm

Si se ha instalado RxJS utilizando ES6 vía npm y la versión instalada es:

#### v7.2.0 or later

Importar únicamente lo que se necesita:

```
import { of, map } from 'rxjs';

of(1, 2, 3).pipe(map((x) => x + '!!!')); // etc
```

Para importar el set completo de funcionalidad:

```
import * as rxjs from 'rxjs';

rxjs.of(1, 2, 3).pipe(rxjs.map((x) => x + '!!!')); // etc;
```

Para uso con un bundle importado globalmente:

```
const { of, map } = rxjs;

of(1, 2, 3).pipe(map((x) => x + '!!!')); // etc
```

Si se ha instalado la versión de RxJS:

#### v7.1.0 o anterior

Importar únicamente lo que se necesita:

```
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

of(1, 2, 3).pipe(map((x) => x + '!!!')); // etc
```

Para importar el set completo de funcionalidad:

```
import * as rxjs from 'rxjs';
import * as operators from 'rxjs';

rxjs.of(1, 2, 3).pipe(operators.map((x) => x + '!!!')); // etc;
```

Para uso con un bundle importado globalmente:

```
const { of } = rxjs;
const { map } = rxjs.operators;

of(1, 2, 3).pipe(map((x) => x + '!!!')); // etc
```

### CDN

Si se ha instalado la biblioteca mediante CDN, el namespace global para rxjs es `rxjs`.

#### v7.2.0 o posterior

```

const { range, filter, map } = rxjs;

range(1, 200)
.pipe(
filter((x) => x % 2 === 1),
map((x) => x + x)
)
.subscribe((x) => console.log(x));

```

#### v7.1.0 o anterior

```

const { range } = rxjs;
const { filter, map } = rxjs.operators;

range(1, 200)
.pipe(
filter((x) => x % 2 === 1),
map((x) => x + x)
)
.subscribe((x) => console.log(x));

```

```

```
