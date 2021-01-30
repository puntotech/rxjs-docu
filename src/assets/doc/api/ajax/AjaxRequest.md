# AjaxRequest

```typescript
interface AjaxRequest {
  url?: string;
  body?: any;
  user?: string;
  async?: boolean;
  method?: string;
  headers?: Object;
  timeout?: number;
  password?: string;
  hasContent?: boolean;
  crossDomain?: boolean;
  withCredentials?: boolean;
  createXHR?: () => XMLHttpRequest;
  progressSubscriber?: Subscriber<any>;
  responseType?: string;
}
```

## Propiedades

<table>
<tr><th>Propiedad</th><th>Tipo</th><th>Descripción</th></tr>
<tr><td>url</td><td><code>string</code></td></tr>
<tr><td>body</td><td><code>any</code></td></tr>
<tr><td>user</td><td><code>string</code></td></tr>
<tr><td>async</td><td><code>boolean</code></td></tr>
<tr><td>method</td><td><code>string</code></td></tr>
<tr><td>headers</td><td><code>Object</code></td></tr>
<tr><td>timeout</td><td><code>number</code></td></tr>
<tr><td>password</td><td><code>string</code></td></tr>
<tr><td>hasContent</td><td><code>boolean</code></td></tr>
<tr><td>crossDomain</td><td><code>boolean</code></td></tr>
<tr><td>withCredentials</td><td><code>boolean</code></td></tr>
<tr><td>createXHR</td><td><code>() => XMLHttpRequest</code></td></tr>
<tr><td>progressSubscriber</td><td><code>Subscriber<any></code></td></tr>
<tr><td>responseType</td><td><code>string</code></td></tr>
</table>

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/6.5.5/src/internal/observable/dom/AjaxObservable.ts#L6-L22">
<img src="assets/icons/source-code.png" alt="Source code">
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/ajax/AjaxRequest">Documentación oficial en inglés</a>
