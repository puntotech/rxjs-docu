# TestScheduler

```typescript
class TestScheduler extends VirtualTimeScheduler {
  static parseMarblesAsSubscriptions(marbles: string, runMode: boolean = false): SubscriptionLog
  static parseMarbles(marbles: string, values?: any, errorValue?: any, materializeInnerObservables: boolean = false, runMode: boolean = false): TestMessage[]
  constructor(assertDeepEqual: (actual: any, expected: any) => boolean | void)
  get hotObservables: HotObservable<any>[]
  get coldObservables: ColdObservable<any>[]
  assertDeepEqual: (actual: any, expected: any) => boolean | void
  createTime(marbles: string): number
  createColdObservable<T = string>(marbles: string, values?: { [marble: string]: T; }, error?: any): ColdObservable<T>
  createHotObservable<T = string>(marbles: string, values?: { [marble: string]: T; }, error?: any): HotObservable<T>
  expectObservable(observable: Observable<any>, subscriptionMarbles: string = null): ({...})
  expectSubscriptions(actualSubscriptionLogs: SubscriptionLog[]): ({...})
  flush()
  run<T>(callback: (helpers: RunHelpers) => T): T

  // Heredado de index/VirtualTimeScheduler
  protected static frameTimeFactor: number
  constructor(SchedulerAction: typeof AsyncAction = VirtualAction as any, maxFrames: number = Number.POSITIVE_INFINITY)
  frame: number
  index: number
  maxFrames: number
  flush(): void
}
```

## Métodos Estáticos

<table>
<tr><th>parseMarblesAsSubscriptions()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>static parseMarblesAsSubscriptions(marbles: string, runMode: boolean = false): SubscriptionLog</code>
<h3>Parámetros</h3>

<table>
<tr><td>marbles</td><td>Tipo: <code>string</code>.</td></tr>
<tr><td>runMode</td><td>Opcional. El valor por defecto es <code>false</code>.
Tipo: <code>boolean</code>.</td></tr>
</table>

<h3>Retorna</h3>
<code>SubscriptionLog</code>
</td></tr>
</table>

<table>
<tr><th>parseMarbles()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>static parseMarbles(marbles: string, values?: any, errorValue?: any, materializeInnerObservables: boolean = false, runMode: boolean = false): TestMessage[]</code>
<h3>Parámetros</h3>

<table>
<tr><td>marbles</td><td>Tipo: <code>string</code>.</td></tr>
<tr><td>values</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>any</code>.</td></tr>
<tr><td>errorValue</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>any</code>.</td></tr>
<tr><td>materializeInnerObservables</td><td>Opcional. El valor por defecto es <code>false</code>.
Tipo: <code>boolean</code>.</td></tr>
<tr><td>runMode</td><td>Opcional. El valor por defecto es <code>false</code>.
Tipo: <code>boolean</code>.</td></tr>
</table>

<h3>Retorna</h3>
<code>TestMessage[]</code>
</td></tr>
</table>

## Constructor

<table>
<tr><th>constructor()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>constructor(assertDeepEqual: (actual: any, expected: any) => boolean | void)</code>
<h3>Parámetros</h3>

<table>
<tr><td>assertDeepEqual</td><td>Tipo: <code>(actual: any, expected: any) => boolean | void</code>.</td></tr>
</table>

</td></tr>
</table>

## Propiedades

<table>
<tr><th>Propiedad</th><th>Tipo</th><th>Descripción</th></tr>
<tr><td>hotObservables</td><td><code>HotObservable<any>[]</code></td><td>Read-only.</td></tr>
<tr><td>coldObservables</td><td><code>ColdObservable<any>[]</code></td><td>Read-only.</td></tr>
<tr><td>assertDeepEqual</td><td><code>(actual: any, expected: any) => boolean | void</code></td><td>Declarado en el constructor.</td></tr>
</table>

## Métodos

<table>
<tr><th>createTime()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>createTime(marbles: string): number</code>
<h3>Parámetros</h3>

<table>
<tr><td>marbles</td><td>Tipo: <code>string</code>.</td></tr>
</table>

<h3>Retorna</h3>
<code>number</code>
</td></tr>
</table>

<table>
<tr><th>createColdObservable()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>createColdObservable<T = string>(marbles: string, values?: { [marble: string]: T; }, error?: any): ColdObservable<T></code>
<h3>Parámetros</h3>

<table>
<tr><td>marbles</td><td>Un diagrama en el DSL de canicas. Las letras se proyectan sobre las claves de <em>values</em>, en el caso de que este se proporcione.</td></tr>
<tr><td>values</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Los valores que utilizar para las letras en <em>marbles</em>. Si se omite, se utilizan las propias letras como valores.</td></tr>
<tr><td>error</td><td>Opcional. El valor por defecto es <code>undefined</code>.
El error que utilizar para la canica <code>#</code> (si existe.)</td></tr>
</table>

<h3>Retorna</h3>
<code>ColdObservable<T></code>
</td></tr>
</table>

<table>
<tr><th>createHotObservable()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>createHotObservable<T = string>(marbles: string, values?: { [marble: string]: T; }, error?: any): HotObservable<T></code>
<h3>Parámetros</h3>

<table>
<tr><td>marbles</td><td>Un diagrama en el DSL de canicas. Las letras se proyectan sobre las claves de <em>values</em>, en el caso de que este se proporcione.</td></tr>
<tr><td>values</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Los valores que utilizar para las letras en <em>marbles</em>. Si se omite, se utilizan las propias letras como valores.</td></tr>
<tr><td>error</td><td>Opcional. El valor por defecto es <code>undefined</code>.
El error que utilizar para la canica <code>#</code> (si existe.)</td></tr>
</table>

<h3>Retorna</h3>
<code>HotObservable<T></code>
</td></tr>
</table>

<table>
<tr><th>expectObservable()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>expectObservable(observable: Observable<any>, subscriptionMarbles: string = null): ({
toBe: observableToBeFn;
})</code>
<h3>Parámetros</h3>

<table>
<tr><td>observable</td><td>Tipo: <code>Observable</code>.</td></tr>
<tr><td>subscriptionMarbles</td><td>Opcional. El valor por defecto es <code>null</code>.
Tipo: <code>string</code>.</td></tr>
</table>

<h3>Retorna</h3>
<code>({ toBe: observableToBeFn; })</code>
</td></tr>
</table>

<table>
<tr><th>expectSubscriptions()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>expectSubscriptions(actualSubscriptionLogs: SubscriptionLog[]): ({
toBe: subscriptionLogsToBeFn;
})</code>
<h3>Parámetros</h3>

<table>
<tr><td>actualSubscriptionLogs</td><td>Tipo: <code>SubscriptionLog[]</code>.</td></tr>
</table>

<h3>Retorna</h3>
<code>({ toBe: subscriptionLogsToBeFn; })</code>
</td></tr>
</table>

<table>
<tr><th>flush()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>flush()</code>
<h3>Parámetros</h3>
No recibe ningún parámetro.
</td></tr>
</table>

<table>
<tr><th>run()</th></tr>
<tr><td>
<h3>Firma</h3>
<code>run<T>(callback: (helpers: RunHelpers) => T): T</code>

<h3>Parámetros</h3>

<table>
<tr><td>callback</td><td>Tipo: <code>(helpers: RunHelpers) => T</code>.</td></tr>
</table>

<h3>Retorna</h3>
<code>T</code>
</td></tr>
</table>

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/6.5.5/src/internal/testing/TestScheduler.ts#L29-L401">
<img src="assets/icons/source-code.png" alt="Source code">
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/testing/TestScheduler">Documentación oficial en inglés</a>
