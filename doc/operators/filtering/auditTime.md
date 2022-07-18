# auditTime

## Ignora los valores de la fuente durante un periodo de tiempo, tras el cual emite el valor más reciente del Observable fuente.

<details>

<summary>Signatura</summary>

#### Firma

`auditTime<T>(duration: number, scheduler: SchedulerLike = async): MonoTypeOperatorFunction<T>`

#### Parámetros

#### Retorna

`MonoTypeOperatorFunction<T>`: Un Observable que limita las emisiones del Observable fuente.

</details>

## Descripción

Cuando recibe un valor de la fuente, lo ignora, además de todos los valores posteriores durante un periodo de tiempo. Una vez finalizado el periodo de tiempo, emite el valor más reciente del Observable fuente.

![Diagrama de canicas del operador auditTime](assets/images/marble-diagrams/filtering/auditTime.png)

auditTime es similar a throttleTime, pero emite el último valor del periodo de silenciamiento, en lugar del primero. auditTime emite el valor más reciente del Observable fuente en cuanto su temporizador interno se deshabilita, e ignora los valores de la fuente mientras el temporizador está habilitado. Inicialmente, el temporizador está deshabilitado. En cuanto llega el primer valor de la fuente, se habilita el temporizador. Tras un periodo de tiempo, determinado por `duration`, se deshabilita el temporizador y se emite el valor más reciente que haya emitido la fuente, en el Observable resultante. Este proceso se repite con cada valor de la fuente. auditTime puede recibir un SchedulerLike opcional para gestionar los temporizadores.

## Ejemplos

**Ignorar las teclas pulsadas durante un periodo de 2s, tras el cual emitir la última tecla pulsada. Repetir.**

[StackBlitz](https://stackblitz.com/edit/rxjs-audittime-1?file=index.ts)

```typescript
import { auditTime } from "rxjs/operators";
import { fromEvent } from "rxjs";

const key$ = fromEvent<KeyboardEvent>(document, "keydown");

key$.pipe(auditTime(2000)).subscribe(({ code }) => console.log(code));
// Salida: (2s) KeyX (2s) KeyO...
```

### Ejemplo de la documentación oficial

**Emite como mucho un click por segundo**

```javascript
import { fromEvent } from "rxjs";
import { auditTime } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const result = clicks.pipe(auditTime(1000));
result.subscribe((x) => console.log(x));
```

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/auditTime.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/operators/auditTime)
