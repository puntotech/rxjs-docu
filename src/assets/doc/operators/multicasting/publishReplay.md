# publishReplay

<details class="no-subtitle">
<summary>Signatura</summary>

### Firma

`publishReplay<T, R>(bufferSize?: number, windowTime?: number, selectorOrScheduler?: SchedulerLike | OperatorFunction<T, R>, scheduler?: SchedulerLike): UnaryFunction<Observable<T>, ConnectableObservable<R>>`

### Parámetros

<table>
<tr><td>bufferSize</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>number</code>.</td></tr>
<tr><td>windowTime</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>number</code>.</td></tr>
<tr><td>selectorOrScheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike | OperatorFunction</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`UnaryFunction<Observable<T>, ConnectableObservable<R>>`

</div>

</details>

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/publishReplay.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/publishReplay">Documentación oficial en inglés</a>
