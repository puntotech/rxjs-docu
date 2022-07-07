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

[TestScheduler](api/testing/TestScheduler)

## Propiedades Estáticas

<table>
<tr><th>Propiedad</th><th>Tipo</th><th>Descripción</th></tr>
<tr><td>frameTimeFactor</td><td><code>number</code></td></tr>
</table>

## Constructor

<table>
<tr><th>constructor()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>constructor(SchedulerAction: typeof AsyncAction = VirtualAction as any, maxFrames: number = Number.POSITIVE_INFINITY)</code>
</td></tr>
</table>

<h3>Parámetros</h3>

<table>
<tr><td>SchedulerAction</td><td>Opcional. El valor por defecto es <code>VirtualAction as any</code>.
Tipo: <code>typeof AsyncAction</code>.</td></tr>
<tr><td>maxFrames</td><td>Opcional. El valor por defecto es <code>Number.POSITIVE_INFINITY</code>.
Tipo: <code>number</code>.</td></tr>
</table>

## Propiedades

<table>
<tr><th>Propiedad</th><th>Tipo</th><th>Descripción</th></tr>
<tr><td>frame</td><td><code>number</code></td></tr>
<tr><td>index</td><td><code>number</code></td></tr>
<tr><td>maxFrames</td><td><code>number</code></td><td>Declarado en el constructor.</td></tr>
</table>

## Métodos

<table>
<tr><th>flush()</th></tr>
<tr><td>Provoca que el Scheduler ejecute todas las acciones puestas en cola, limpiando dicha cola.</td></tr>
<tr><td>
<h3>Firma</h3>
<code>flush(): void</code>

<h3>Parámetros</h3>
No recibe ningún parámetro.

<h3>Retorna</h3>
<code>void:</code>
</td></tr>
</table>

## Recursos adicionales

<a class="source-icon" target="_blank" href="https://github.com/ReactiveX/rxjs/blob/6.5.5/src/internal/scheduler/VirtualTimeScheduler.ts#L5-L44">
<img src="assets/icons/source-code.png" alt="Source code">
</a>
</div>

<a target="_blank" href="https://rxjs.dev/api/index/class/VirtualTimeScheduler">Documentación oficial en inglés</a>
