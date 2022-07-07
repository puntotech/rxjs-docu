# shareReplay

<h2 class="subtitle"> Comparte el Observable fuente entre varios suscriptores, repitiendo las últimas n emisiones con cada suscripción </h2>

💡 La capacidad de repetir emisiones es lo que diferencia a shareReplay de <a href="/operators/multicasting/share">share</a>

<details>
<summary>Signatura</summary>

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

</details>

## Descripción

<!-- ## Ejemplos

[StackBlitz]()

```javascript

```

Comparación entre `share` y `shareReplay`

[StackBlitz]()

```javascript

``` -->

<div class="additional-section">

## Recursos adicionales

<a class="source-icon" target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/shareReplay.ts">
<img src="assets/icons/source-code.png" alt="Source code">
</a>
</div>

<a target="_blank" href="https://rxjs.dev/api/operators/shareReplay">Documentación oficial en inglés</a>
