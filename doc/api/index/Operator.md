# Operator

```typescript
interface Operator<T, R> {
  call(subscriber: Subscriber<R>, source: any): TeardownLogic;
}
```

## Métodos

| call()                                                                                                                                                                                                                                                                                                                                                                               |                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- |
| <h4>Firma</h4><p><code>call(subscriber: Subscriber, source: any): TeardownLogic</code></p><h4>Parámetros</h4><table data-header-hidden><thead><tr><th></th><th></th></tr></thead><tbody><tr><td>subscriber</td><td>Tipo: <code>Subscriber</code>.</td></tr><tr><td>source</td><td>Tipo: <code>any</code>.</td></tr></tbody></table><h4>Retorna</h4><p><code>TeardownLogic</code></p> |                     |
| subscriber                                                                                                                                                                                                                                                                                                                                                                           | Tipo: `Subscriber`. |
| source                                                                                                                                                                                                                                                                                                                                                                               | Tipo: `any`.        |

## Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/6.5.5/src/internal/Operator.ts#L3-L6)

[Documentación oficial en inglés](https://rxjs.dev/api/index/interface/Operator)
