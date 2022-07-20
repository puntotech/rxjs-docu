---
description: >-
  Emite false si el Observable emite cualquier valor, o emite true si el
  Observable se completa sin emitir ningún valor
---

# isEmpty

<details>

<summary>Signatura</summary>

#### Firma

`isEmpty<T>(): OperatorFunction<T, boolean>`

#### Parámetros

No recibe ningún parámetro.

#### Retorna

`OperatorFunction<T, boolean>`: Un Observable de valor booleano indicando si el Observable estaba vacío o no.

</details>

## Descripción

Indica si un Observable emite algún valor o no.

![Diagrama de canicas del operador isEmpty](assets/images/marble-diagrams/conditional-boolean/isEmpty.png)

`isEmpty` transforma un Observable que emite valores en un Observable que emite un solo valor booleano representando si el Observable fuente emite o no valores. En cuanto el Observable fuente emita un valor, `isEmpty` emitirá _false_ y se completará. Si el Observable fuente se completa sin haber emitido ningún valor, `isEmpty` emitirá _true_ y se completará.

Se podría lograr un efecto similar con el operador `count`, pero `isEmpty` puede emitir el valor _false_ antes.

## Ejemplos

[StackBlitz](https://stackblitz.com/edit/rxjs-isempty?file=index.ts)

**Emite **_**false**_** para un Observable que no está vacío**

```javascript
import { of } from "rxjs";
import { isEmpty } from "rxjs/operators";

const word$ = of("No", "está", "vacío");

word$.pipe(isEmpty()).subscribe(console.log);
// Salida: false
```

**Emite **_**true**_** para Observables vacíos**

[StackBlitz](https://stackblitz.com/edit/rxjs-isempty-2?file=index.ts)

```javascript
import { EMPTY, of } from "rxjs";
import { isEmpty } from "rxjs/operators";

const empty$ = EMPTY;
const anotherEmpty$ = of();

empty$.pipe(isEmpty()).subscribe(console.log);
// Salida: true

anotherEmpty$.pipe(isEmpty()).subscribe(console.log);
// Salida: true
```

### Ejemplo de la documentación oficial

**Emite **_**false**_** para un Sujeto que no está vacío**

```javascript
    import { Subject } from 'rxjs';
    import { isEmpty } from 'rxjs/operators';

    const source = new Subject<string>();
    const result = source.pipe(isEmpty());
    source.subscribe(x => console.log(x));
    result.subscribe(x => console.log(x));
    source.next('a');
    source.next('b');
    source.next('c');
    source.complete();

    // Salida: a, false, b, c
```

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/isEmpty.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/operators/isEmpty)
