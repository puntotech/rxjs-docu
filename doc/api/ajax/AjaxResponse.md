# AjaxResponse

## Una respuesta AJAX normalizada

```typescript
class AjaxResponse {
  constructor(originalEvent: Event, xhr: XMLHttpRequest, request: AjaxRequest)
  status: [object Object]
  response: [object Object]
  responseText: [object Object]
  responseType: [object Object]
  originalEvent: Event
  xhr: XMLHttpRequest
  request: AjaxRequest
}
```

## Constructor

| constructor()                                                                                                                                                                                                                                                                                                                                                                                                                  |                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- |
| <h4>Firma</h4><p><code>constructor(originalEvent: Event, xhr: XMLHttpRequest, request: AjaxRequest)</code></p><h4>Parámetros</h4><table data-header-hidden><thead><tr><th></th><th></th></tr></thead><tbody><tr><td>originalEvent</td><td>Tipo: <code>Event</code>.</td></tr><tr><td>xhr</td><td>Tipo: <code>XMLHttpRequest</code>.</td></tr><tr><td>request</td><td>Tipo: <code>AjaxRequest</code>.</td></tr></tbody></table> |                         |
| originalEvent                                                                                                                                                                                                                                                                                                                                                                                                                  | Tipo: `Event`.          |
| xhr                                                                                                                                                                                                                                                                                                                                                                                                                            | Tipo: `XMLHttpRequest`. |
| request                                                                                                                                                                                                                                                                                                                                                                                                                        | Tipo: `AjaxRequest`.    |

## Propiedades

| Propiedad     | Tipo              | Descripción                  |
| ------------- | ----------------- | ---------------------------- |
| status        | `[object Object]` |                              |
| response      | `[object Object]` |                              |
| responseText  | `[object Object]` |                              |
| responseType  | `[object Object]` |                              |
| originalEvent | `Event`           | Declarado en el constructor. |
| xhr           | `XMLHttpRequest`  | Declarado en el constructor. |
| request       | `AjaxRequest`     | Declarado en el constructor. |

## Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/6.5.5/src/internal/observable/dom/AjaxObservable.ts#L431-L457)

[Documentación oficial en inglés](https://rxjs.dev/api/ajax/AjaxResponse)
