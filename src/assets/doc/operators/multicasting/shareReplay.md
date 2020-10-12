<div class="page-heading">

# shareReplay

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/shareReplay.ts">
<svg>
  <use xlink:href="/assets/icons/github.svg#github"></use>
</svg>
</a>
</div>

### Comparte el Observable fuente entre varios suscriptores, repitiendo las últimas n emisiones con cada suscripción

💡 La capacidad de repetir emisiones es lo que diferencia a shareReplay de <a href="/operators/multicasting/share">share</a>

### Firma

`shareReplay<T>(configOrBufferSize?: number | ShareReplayConfig, windowTime?: number, scheduler?: SchedulerLike): MonoTypeOperatorFunction<T>`

### Parámetros

<table>
<tr><td>configOrBufferSize</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>number | ShareReplayConfig</code>.</td></tr>
<tr><td>windowTime</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>number</code>.</td></tr>
<tr><td>scheduler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>SchedulerLike</code>.</td></tr>
</table>

### Retorna

`MonoTypeOperatorFunction<T>`

## Descripción

    shareReplay(n) — no matter if there are active subscribers or not ReplaySubject will keep emitting values and keep connection with Source until Source will complete or error. Any new Subscriber will get last N values (if not on error). If Source hasn’t completed yet, new subscribers will continue getting values from Source

<!-- ## Ejemplos

[StackBlitz]()

```javascript

```

Comparación entre `share` y `shareReplay`

[StackBlitz]()

```javascript

``` -->

## Recursos adicionales -

- <a target="_blank" href="https://rxjs.dev/api/operators/shareReplay">Documentación oficial en inglés</a>
