# CompletionObserver

```typescript
interface CompletionObserver<T> {
  closed?: boolean;
  next?: (value: T) => void;
  error?: (err: any) => void;
  complete: () => void;
}
```

## Propiedades

<table>
<tr><th>Propiedad</th><th>Tipo</th><th>Descripción</th></tr>
<tr><td>closed</td><td><code>boolean</code></td></tr>
<tr><td>next</td><td><code>(value: T) => void</code></td></tr>
<tr><td>error</td><td><code>(err: any) => void</code></td></tr>
<tr><td>complete</td><td><code>() => void</code></td></tr>
</table>
