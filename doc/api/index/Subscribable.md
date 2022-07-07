# Subscribable

<h2 class="subtitle">Interfaces de Observable</h2>

```typescript
interface Subscribable<T> {
  subscribe(observer?: PartialObserver<T>): Unsubscribable;
}
```

## Implementaciones de Clase

- [Observable](/api/index/Observable)
- [ConnectableObservable](/api/index/ConnectableObservable)
<ul>
    <li><a href="/api/index/GroupedObservable">GroupedObservable</a></li>
    <ul>
        <li><a href="/api/subjects/Subject">Subject</a></li>
        <li><a href="/api/subjects/BehaviorSubject">BehaviorSubject</a></li>
        <li><a href="/api/subjects/ReplaySubject">ReplaySubject</a></li>
        <li><a href="/api/subjects/AsyncSubject">AsyncSubject</a></li>
    </ul>
</ul>

## Métodos

<table>
    <tr><th>subscribe()</th></tr>
    <tr><td>
    <details>
        <summary>4 Sobrecargas</summary>
        <div class="overload-container">         
            <div class="overload-section">
                <h3>Firma</h3>
                <code>subscribe(next: null, error: null, complete: () => void): Unsubscribable</code>
                <h3>Parámetros</h3>
                <table>
                    <tr><td>next</td><td>Tipo: <code>null</code>.</td></tr>
                    <tr><td>error</td><td>Tipo: <code>null</code>.</td></tr>
                    <tr><td>complete</td><td>Tipo: <code>() => void</code>.</td></tr>
                </table>
                <h3>Retorna</h3>
                <code>Unsubscribable</code>
            </div>
            <div class="overload-section">
                <h3>Firma</h3>
                <code>subscribe(next: null, error: (error: any) => void, complete?: () => void): Unsubscribable</code>
                <h3>Parámetros</h3>
                <table>
                    <tr><td>next</td><td>Tipo: <code>null</code>.</td></tr>
                    <tr><td>error</td><td>Tipo: <code>(error: any) => void</code>.</td></tr>
                    <tr><td>complete</td><td>Opcional. El valor por defecto es <code>undefined</code>.
                    Tipo: <code>() => void</code>.</td></tr>
                </table>
                <h3>Retorna</h3>
                <code>Unsubscribable</code>
            </div>
            <div class="overload-section">
                <h3>Firma</h3>
                <code>subscribe(next: (value: T) => void, error: null, complete: () => void): Unsubscribable</code>
                <h3>Parámetros</h3>
                <table>
                    <tr><td>next</td><td>Tipo: <code>(value: T) => void</code>.</td></tr>
                    <tr><td>error</td><td>Tipo: <code>null</code>.</td></tr>
                    <tr><td>complete</td><td>Tipo: <code>() => void</code>.</td></tr>
                </table>
                <h3>Retorna</h3>
                <code>Unsubscribable</code>
            </div>
            <div class="overload-section">
                <h3>Firma</h3>
                    <code>subscribe(next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): Unsubscribable</code>
                <h3>Parámetros</h3>
                <table>
                    <tr><td>next</td><td>Opcional. El valor por defecto es <code>undefined</code>.
                    Tipo: <code>(value: T) => void</code>.</td></tr>
                    <tr><td>error</td><td>Opcional. El valor por defecto es <code>undefined</code>.
                    Tipo: <code>(error: any) => void</code>.</td></tr>
                    <tr><td>complete</td><td>Opcional. El valor por defecto es <code>undefined</code>.
                    Tipo: <code>() => void</code>.</td></tr>
                </table>
                <h3>Retorna</h3>
                <code>Unsubscribable</code>
            </div>
        </div>
    </details>
    </td></tr>
</table>

## Recursos adicionales

<a class="source-icon" target="_blank" href="https://github.com/ReactiveX/rxjs/blob/6.5.5/src/internal/types.ts#L38-L50">
<img src="assets/icons/source-code.png" alt="Source code">
</a>
</div>

<a target="_blank" href="https://rxjs.dev/api/index/interface/Subscribable">Documentación oficial en inglés</a>
