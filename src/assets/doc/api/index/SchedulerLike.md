# SchedulerLike

<h2 class="subtitle">Interfaces de Planificador</h2>

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

[Scheduler]()

## Métodos

<table>
<tr><th>now()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>now(): number</code>

<h3>Parámetros</h3>
No recibe ningún parámetro.

<h3>Retorna</h3>
<code>number</code>
</td></tr>
</table>

<table>
<tr><th>schedule()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>schedule<T>(work: (this: SchedulerAction<T>, state?: T) => void, delay?: number, state?: T): Subscription</code>
<h3>Parámetros</h3>

<table>
<tr><td>work</td><td>Tipo: <code>(this: SchedulerAction, state?: T) => void</code>.</td></tr>
<tr><td>delay</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>number</code>.</td></tr>
<tr><td>state</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>T</code>.</td></tr>
</table>

<h3>Retorna</h3>
<code>Subscription</code>
</td></tr>
</table>

## Recursos adicionales

<a class="source-icon" target="_blank" href="https://github.com/ReactiveX/rxjs/blob/6.5.5/src/internal/types.ts#L90-L96">
<img src="assets/icons/source-code.png" alt="Source code">
</a>
</div>

<a target="_blank" href="https://rxjs.dev/api/index/interface/SchedulerLike">Documentación oficial en inglés</a>
