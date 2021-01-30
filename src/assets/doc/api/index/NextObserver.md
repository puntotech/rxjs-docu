# NextObserver

<h2 class="subtitle">Interfaces del Observador</h2>

```typescript
interface NextObserver<T> {
  closed?: boolean;
  next: (value: T) => void;
  error?: (err: any) => void;
  complete?: () => void;
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

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/6.5.5/src/internal/types.ts#L58-L66">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/index/interface/NextObserver">Documentación oficial en inglés</a>
