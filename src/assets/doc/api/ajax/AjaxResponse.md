# AjaxResponse

<h2 class="subtitle">Una respuesta AJAX normalizada</h2>

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

<table>
<tr><th>constructor()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>constructor(originalEvent: Event, xhr: XMLHttpRequest, request: AjaxRequest)</code>

<h3>Parámetros</h3>

<table>
<tr><td>originalEvent</td><td>Tipo: <code>Event</code>.</td></tr>
<tr><td>xhr</td><td>Tipo: <code>XMLHttpRequest</code>.</td></tr>
<tr><td>request</td><td>Tipo: <code>AjaxRequest</code>.</td></tr>
</table>
</td></tr>
</table>

## Propiedades

<table>
<tr><th>Propiedad</th><th>Tipo</th><th>Descripción</th></tr>
<tr><td>status</td><td><code>[object Object]</code></td></tr>
<tr><td>response</td><td><code>[object Object]</code></td></tr>
<tr><td>responseText</td><td><code>[object Object]</code></td></tr>
<tr><td>responseType</td><td><code>[object Object]</code></td></tr>
<tr><td>originalEvent</td><td><code>Event </code></td><td>Declarado en el constructor.</td></tr>
<tr><td>xhr</td><td><code>XMLHttpRequest </code></td><td>Declarado en el constructor.</td></tr>
<tr><td>request</td><td><code>AjaxRequest </code></td><td>Declarado en el constructor.</td></tr>
</table>
 
 ## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/6.5.5/src/internal/observable/dom/AjaxObservable.ts#L431-L457">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/ajax/AjaxResponse">Documentación oficial en inglés</a>
