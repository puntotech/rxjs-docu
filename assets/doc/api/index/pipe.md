# pipe

<details>
<summary>Signatura</summary>

### Firma

```typescript
pipe(...fns: UnaryFunction<any, any>[]): UnaryFunction<any, any>
```

### Parámetros

<table>
<tr><td>fns</td><td>Tipo: <code>UnaryFunction[]</code>.</td></tr>
</table>

### Retorna

`UnaryFunction<any, any>`

</details>

## Sobrecargas

<details>
<summary>Sobrecargas</summary>
<div class="overload-container">

<div class="overload-section">

### Firma

`pipe(): UnaryFunction<T, T>`

### Parámetros

No recibe ningún parámetro.

### Retorna

`UnaryFunction<T, T>`

</div>

<div class="overload-section">

### Firma

`pipe(fn1: UnaryFunction<T, A>): UnaryFunction<T, A>`

### Parámetros

<table>
<tr><td>fn1</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
</table>

### Retorna

`UnaryFunction<T, A>`

</div>

<div class="overload-section">

### Firma

`pipe(fn1: UnaryFunction<T, A>, fn2: UnaryFunction<A, B>): UnaryFunction<T, B>`

### Parámetros

<table>
<tr><td>fn1</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
<tr><td>fn2</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
</table>

### Retorna

`UnaryFunction<T, B>`

</div>

<div class="overload-section">

### Firma

`pipe(fn1: UnaryFunction<T, A>, fn2: UnaryFunction<A, B>, fn3: UnaryFunction<B, C>): UnaryFunction<T, C>`

### Parámetros

<table>
<tr><td>fn1</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
<tr><td>fn2</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
<tr><td>fn3</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
</table>

### Retorna

`UnaryFunction<T, C>`

</div>

<div class="overload-section">

### Firma

`pipe(fn1: UnaryFunction<T, A>, fn2: UnaryFunction<A, B>, fn3: UnaryFunction<B, C>, fn4: UnaryFunction<C, D>): UnaryFunction<T, D>`

### Parámetros

<table>
<tr><td>fn1</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
<tr><td>fn2</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
<tr><td>fn3</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
<tr><td>fn4</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
</table>

### Retorna

`UnaryFunction<T, D>`

</div>

<div class="overload-section">

### Firma

`pipe(fn1: UnaryFunction<T, A>, fn2: UnaryFunction<A, B>, fn3: UnaryFunction<B, C>, fn4: UnaryFunction<C, D>, fn5: UnaryFunction<D, E>): UnaryFunction<T, E>`

### Parámetros

<table>
<tr><td>fn1</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
<tr><td>fn2</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
<tr><td>fn3</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
<tr><td>fn4</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
<tr><td>fn5</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
</table>

### Retorna

`UnaryFunction<T, E>`

</div>

<div class="overload-section">

### Firma

`pipe(fn1: UnaryFunction<T, A>, fn2: UnaryFunction<A, B>, fn3: UnaryFunction<B, C>, fn4: UnaryFunction<C, D>, fn5: UnaryFunction<D, E>, fn6: UnaryFunction<E, F>): UnaryFunction<T, F>`

### Parámetros

<table>
<tr><td>fn1</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
<tr><td>fn2</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
<tr><td>fn3</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
<tr><td>fn4</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
<tr><td>fn5</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
<tr><td>fn6</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
</table>

### Retorna

`UnaryFunction<T, F>`

</div>

<div class="overload-section">

### Firma

`pipe(fn1: UnaryFunction<T, A>, fn2: UnaryFunction<A, B>, fn3: UnaryFunction<B, C>, fn4: UnaryFunction<C, D>, fn5: UnaryFunction<D, E>, fn6: UnaryFunction<E, F>, fn7: UnaryFunction<F, G>): UnaryFunction<T, G>`

### Parámetros

<table>
<tr><td>fn1</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
<tr><td>fn2</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
<tr><td>fn3</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
<tr><td>fn4</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
<tr><td>fn5</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
<tr><td>fn6</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
<tr><td>fn7</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
</table>

### Retorna

`UnaryFunction<T, G>`

</div>

<div class="overload-section">

### Firma

`pipe(fn1: UnaryFunction<T, A>, fn2: UnaryFunction<A, B>, fn3: UnaryFunction<B, C>, fn4: UnaryFunction<C, D>, fn5:UnaryFunction<D, E>, fn6: UnaryFunction<E, F>, fn7: UnaryFunction<F, G>, fn8: UnaryFunction<G, H>): UnaryFunction<T, H>`

### Parámetros

<table>
<tr><td>fn1</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
<tr><td>fn2</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
<tr><td>fn3</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
<tr><td>fn4</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
<tr><td>fn5</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
<tr><td>fn6</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
<tr><td>fn7</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
<tr><td>fn8</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
</table>

### Retorna

`UnaryFunction<T, H>`

</div>

<div class="overload-section">

### Firma

`pipe(fn1: UnaryFunction<T, A>, fn2: UnaryFunction<A, B>, fn3: UnaryFunction<B, C>, fn4: UnaryFunction<C, D>, fn5: UnaryFunction<D, E>, fn6: UnaryFunction<E, F>, fn7: UnaryFunction<F, G>, fn8: UnaryFunction<G, H>, fn9: UnaryFunction<H, I>): UnaryFunction<T, I>`

### Parámetros

<table>
<tr><td>fn1</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
<tr><td>fn2</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
<tr><td>fn3</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
<tr><td>fn4</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
<tr><td>fn5</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
<tr><td>fn6</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
<tr><td>fn7</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
<tr><td>fn8</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
<tr><td>fn9</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
</table>

### Retorna

`UnaryFunction<T, I>`

</div>

<div class="overload-section">

### Firma

`pipe(fn1: UnaryFunction<T, A>, fn2: UnaryFunction<A, B>, fn3: UnaryFunction<B, C>, fn4: UnaryFunction<C, D>, fn5: UnaryFunction<D, E>, fn6: UnaryFunction<E, F>, fn7: UnaryFunction<F, G>, fn8: UnaryFunction<G, H>, fn9: UnaryFunction<H, I>, ...fns: UnaryFunction<any, any>[]): UnaryFunction<T, {}>`

### Parámetros

<table>
<tr><td>fn1</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
<tr><td>fn2</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
<tr><td>fn3</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
<tr><td>fn4</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
<tr><td>fn5</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
<tr><td>fn6</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
<tr><td>fn7</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
<tr><td>fn8</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
<tr><td>fn9</td><td>Tipo: <code>UnaryFunction</code>.</td></tr>
<tr><td>fns</td><td>Tipo: <code>UnaryFunction[]</code>.</td></tr>
</table>

### Retorna

`UnaryFunction<T, {}>`

</div>

</div>
</details>

## Recursos adicionales

<a class="source-icon" target="_blank" href="https://github.com/ReactiveX/rxjs/blob/6.5.5/src/internal/util/pipe.ts#L17-L21">
<img src="assets/icons/source-code.png" alt="Source code">
</a>
</div>

<a target="_blank" href="https://rxjs.dev/api/index/function/pipe">Documentación oficial en inglés</a>
