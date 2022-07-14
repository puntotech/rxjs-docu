# SchedulerLike

## Interfaces de Planificador

```typescript
interface SchedulerLike {
  now(): number;
  schedule<T>(
    work: (this: SchedulerAction<T>, state?: T) => void,
    delay?: number,
    state?: T
  ): Subscription;
}
```

## Implementaciones de Clase

[Scheduler](SchedulerLike.md)

## Métodos

| now()                                                                                                                                          |
| ---------------------------------------------------------------------------------------------------------------------------------------------- |
| <h4>Firma</h4><p><code>now(): number</code></p><h4>Parámetros</h4><p>No recibe ningún parámetro.</p><h4>Retorna</h4><p><code>number</code></p> |

| schedule()                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |                                                                |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| <h4>Firma</h4><p><code>schedule(work: (this: SchedulerAction, state?: T) => void, delay?: number, state?: T): Subscription</code></p><h4>Parámetros</h4><table data-header-hidden><thead><tr><th></th><th></th></tr></thead><tbody><tr><td>work</td><td>Tipo: <code>(this: SchedulerAction, state?: T) => void</code>.</td></tr><tr><td>delay</td><td>Opcional. El valor por defecto es <code>undefined</code>. Tipo: <code>number</code>.</td></tr><tr><td>state</td><td>Opcional. El valor por defecto es <code>undefined</code>. Tipo: <code>T</code>.</td></tr></tbody></table><h4>Retorna</h4><p><code>Subscription</code></p> |                                                                |
| work                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Tipo: `(this: SchedulerAction, state?: T) => void`.            |
| delay                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Opcional. El valor por defecto es `undefined`. Tipo: `number`. |
| state                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Opcional. El valor por defecto es `undefined`. Tipo: `T`.      |

## Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/6.5.5/src/internal/types.ts#L90-L96)

[Documentación oficial en inglés](https://rxjs.dev/api/index/interface/SchedulerLike)
