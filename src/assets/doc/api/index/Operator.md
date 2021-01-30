# Operator

```typescript
interface Operator<T, R> {
  call(subscriber: Subscriber<R>, source: any): TeardownLogic;
}
```

## Métodos

<table>
<tr><th>call()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>call(subscriber: Subscriber<R>, source: any): TeardownLogic</code>
<h3>Parámetros</h3>

<table>
<tr><td>subscriber</td><td>Tipo: <code>Subscriber</code>.</td></tr>
<tr><td>source</td><td>Tipo: <code>any</code>.</td></tr>
</table>

<h3>Retorna</h3>
<code>TeardownLogic</code>
</td></tr>
</table>

## Recursos adicionales

<a class="source-icon" target="_blank" href="https://github.com/ReactiveX/rxjs/blob/6.5.5/src/internal/Operator.ts#L3-L6">
<img src="assets/icons/source-code.png" alt="Source code">
</a>
</div>

<a target="_blank" href="https://rxjs.dev/api/index/interface/Operator">Documentación oficial en inglés</a>
