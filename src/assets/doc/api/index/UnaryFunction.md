# UnaryFunction

<h2 class="subtitle">Interfaces de Operador</h2>

```typescript
interface UnaryFunction<T, R> {
  (source: T): R;
}
```

## Interfaces Hijas

<ul>
    <li><a href="/api/index/OperatorFunction">OperatorFunction</a></li>
    <ul>
        <li><a href="/api/index/MonoTypeOperatorFunction">MonoTypeOperatorFunction</a></li>
    </ul>
</ul>

## Métodos

<table>
<tr><th>call signature</th></tr>
<tr><td>
<h3>Firma</h3>
<code>(source: T): R</code>
<h3>Parámetros</h3>
<table>
<tr><td>source</td><td>Tipo: <code>T</code>.</td></tr>
</table>

<h3>Retorna</h3>
<code>R</code>
</td></tr>
</table>

## Recursos adicionales

<a class="source-icon" target="_blank" href="https://rxjs.dev/api/index/interface/UnaryFunction">
<img src="assets/icons/source-code.png" alt="Source code">
</a>
</div>

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/6.5.5/src/internal/types.ts#L3-L6">Documentación oficial en inglés</a>
