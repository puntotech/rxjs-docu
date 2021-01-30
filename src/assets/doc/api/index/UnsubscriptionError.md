# UnsubscriptionError

<h2 class="subtitle">Un error lanzado cuando ocurren uno o más errores durante la cancelación de una Suscripción</h2>

```typescript
interface UnsubscriptionError extends Error {
get errors: any[]
}
```

## Propiedades

<table>
<tr><th>Propiedad</th><th>Tipo</th><th>Descripción</th></tr>
<tr><td>errors</td><td><code>any[]</code></td><td>Read-only.</td></tr>
</table>

## Recursos adicionales

<a class="source-icon" target="_blank" href="https://github.com/ReactiveX/rxjs/blob/6.5.5/src/internal/util/UnsubscriptionError.ts#L30-L29">
<img src="assets/icons/source-code.png" alt="Source code">
</a>
</div>

<a target="_blank" href="https://rxjs.dev/api/index/interface/UnsubscriptionError">Documentación oficial en inglés</a>
