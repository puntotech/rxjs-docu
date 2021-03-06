# Observer

```typescript
interface Observer<T> {
  closed?: boolean;
  next: (value: T) => void;
  error: (err: any) => void;
  complete: () => void;
}
```

## Implementaciones de Clase

[Subscriber](api/index/subscriber)

## Propiedades

<table>
<tr><th>Propiedad</th><th>Tipo</th><th>Descripción</th></tr>
<tr><td>closed</td><td><code>boolean</code></td></tr>
<tr><td>next</td><td><code>(value: T) => void</code></td></tr>
<tr><td>error</td><td><code>(err: any) => void</code></td></tr>
<tr><td>complete</td><td><code>() => void</code></td></tr>
</table>

## Recursos adicionales

<a class="source-icon" target="_blank" href="https://github.com/ReactiveX/rxjs/blob/6.5.5/src/internal/types.ts#L83-L89">
<img src="assets/icons/source-code.png" alt="Source code">
</a>
</div>

<a target="_blank" href="https://rxjs.dev/api/index/interface/Observer">Documentación oficial en inglés</a>
