# pipe

<details>

<summary>Signatura</summary>

#### Firma

```typescript
pipe(...fns: UnaryFunction<any, any>[]): UnaryFunction<any, any>
```

#### Parámetros

#### Retorna

`UnaryFunction<any, any>`

</details>

## Sobrecargas

<details>

<summary>Sobrecargas</summary>

#### Firma

`pipe(): UnaryFunction<T, T>`

#### Parámetros

No recibe ningún parámetro.

#### Retorna

`UnaryFunction<T, T>`

#### Firma

`pipe(fn1: UnaryFunction<T, A>): UnaryFunction<T, A>`

#### Parámetros

#### Retorna

`UnaryFunction<T, A>`

#### Firma

`pipe(fn1: UnaryFunction<T, A>, fn2: UnaryFunction<A, B>): UnaryFunction<T, B>`

#### Parámetros

#### Retorna

`UnaryFunction<T, B>`

#### Firma

`pipe(fn1: UnaryFunction<T, A>, fn2: UnaryFunction<A, B>, fn3: UnaryFunction<B, C>): UnaryFunction<T, C>`

#### Parámetros

#### Retorna

`UnaryFunction<T, C>`

#### Firma

`pipe(fn1: UnaryFunction<T, A>, fn2: UnaryFunction<A, B>, fn3: UnaryFunction<B, C>, fn4: UnaryFunction<C, D>): UnaryFunction<T, D>`

#### Parámetros

#### Retorna

`UnaryFunction<T, D>`

#### Firma

`pipe(fn1: UnaryFunction<T, A>, fn2: UnaryFunction<A, B>, fn3: UnaryFunction<B, C>, fn4: UnaryFunction<C, D>, fn5: UnaryFunction<D, E>): UnaryFunction<T, E>`

#### Parámetros

#### Retorna

`UnaryFunction<T, E>`

#### Firma

`pipe(fn1: UnaryFunction<T, A>, fn2: UnaryFunction<A, B>, fn3: UnaryFunction<B, C>, fn4: UnaryFunction<C, D>, fn5: UnaryFunction<D, E>, fn6: UnaryFunction<E, F>): UnaryFunction<T, F>`

#### Parámetros

#### Retorna

`UnaryFunction<T, F>`

#### Firma

`pipe(fn1: UnaryFunction<T, A>, fn2: UnaryFunction<A, B>, fn3: UnaryFunction<B, C>, fn4: UnaryFunction<C, D>, fn5: UnaryFunction<D, E>, fn6: UnaryFunction<E, F>, fn7: UnaryFunction<F, G>): UnaryFunction<T, G>`

#### Parámetros

#### Retorna

`UnaryFunction<T, G>`

#### Firma

`pipe(fn1: UnaryFunction<T, A>, fn2: UnaryFunction<A, B>, fn3: UnaryFunction<B, C>, fn4: UnaryFunction<C, D>, fn5:UnaryFunction<D, E>, fn6: UnaryFunction<E, F>, fn7: UnaryFunction<F, G>, fn8: UnaryFunction<G, H>): UnaryFunction<T, H>`

#### Parámetros

#### Retorna

`UnaryFunction<T, H>`

#### Firma

`pipe(fn1: UnaryFunction<T, A>, fn2: UnaryFunction<A, B>, fn3: UnaryFunction<B, C>, fn4: UnaryFunction<C, D>, fn5: UnaryFunction<D, E>, fn6: UnaryFunction<E, F>, fn7: UnaryFunction<F, G>, fn8: UnaryFunction<G, H>, fn9: UnaryFunction<H, I>): UnaryFunction<T, I>`

#### Parámetros

#### Retorna

`UnaryFunction<T, I>`

#### Firma

`pipe(fn1: UnaryFunction<T, A>, fn2: UnaryFunction<A, B>, fn3: UnaryFunction<B, C>, fn4: UnaryFunction<C, D>, fn5: UnaryFunction<D, E>, fn6: UnaryFunction<E, F>, fn7: UnaryFunction<F, G>, fn8: UnaryFunction<G, H>, fn9: UnaryFunction<H, I>, ...fns: UnaryFunction<any, any>[]): UnaryFunction<T, {}>`

#### Parámetros

#### Retorna

`UnaryFunction<T, {}>`

</details>

## Recursos adicionales

[![Source code](assets/icons/source-code.png)](https://github.com/ReactiveX/rxjs/blob/6.5.5/src/internal/util/pipe.ts#L17-L21)

[Documentación oficial en inglés](https://rxjs.dev/api/index/function/pipe)
