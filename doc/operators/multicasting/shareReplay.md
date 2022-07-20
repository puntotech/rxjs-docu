---
description: >-
  Comparte el Observable fuente entre varios suscriptores, repitiendo las
  últimas n emisiones con cada suscripción
---

# shareReplay

💡 La capacidad de repetir emisiones es lo que diferencia a shareReplay de [share](../../../operators/multicasting/share/)

<details>

<summary>Signatura</summary>

#### Firma

`shareReplay<T>(configOrBufferSize?: number | ShareReplayConfig, windowTime?: number, scheduler?: SchedulerLike): MonoTypeOperatorFunction<T>`

#### Parámetros

#### Retorna

`MonoTypeOperatorFunction<T>`

</details>

## Descripción

### Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/shareReplay.ts)

[Documentación oficial en inglés](https://rxjs.dev/api/operators/shareReplay)
