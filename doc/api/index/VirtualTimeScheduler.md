# VirtualTimeScheduler

```typescript
class VirtualTimeScheduler extends AsyncScheduler {
  protected static frameTimeFactor: number;
  constructor(
    SchedulerAction: typeof AsyncAction = VirtualAction as any,
    maxFrames: number = Number.POSITIVE_INFINITY
  );
  frame: number;
  index: number;
  maxFrames: number;
  flush(): void;
}
```

## Subclases

[TestScheduler](api/testing/TestScheduler/)

## Propiedades Estáticas

| Propiedad       | Tipo     | Descripción |
| --------------- | -------- | ----------- |
| frameTimeFactor | `number` |             |

## Constructor

| constructor()                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <h4>Firma</h4><p><code>constructor(SchedulerAction: typeof AsyncAction = VirtualAction as any, maxFrames: number = Number.POSITIVE_INFINITY)</code></p> |

### Parámetros

| SchedulerAction | Opcional. El valor por defecto es `VirtualAction as any`. Tipo: `typeof AsyncAction`. |
| --------------- | ------------------------------------------------------------------------------------- |
| maxFrames       | Opcional. El valor por defecto es `Number.POSITIVE_INFINITY`. Tipo: `number`.         |

## Propiedades

| Propiedad | Tipo     | Descripción                  |
| --------- | -------- | ---------------------------- |
| frame     | `number` |                              |
| index     | `number` |                              |
| maxFrames | `number` | Declarado en el constructor. |

## Métodos

| flush()                                                                                                                                       |
| --------------------------------------------------------------------------------------------------------------------------------------------- |
| Provoca que el Scheduler ejecute todas las acciones puestas en cola, limpiando dicha cola.                                                    |
| <h4>Firma</h4><p><code>flush(): void</code></p><h4>Parámetros</h4><p>No recibe ningún parámetro.</p><h4>Retorna</h4><p><code>void:</code></p> |

## Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/6.5.5/src/internal/scheduler/VirtualTimeScheduler.ts#L5-L44)

[Documentación oficial en inglés](https://rxjs.dev/api/index/class/VirtualTimeScheduler)
