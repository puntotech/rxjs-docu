# SubscribableOrPromise

```typescript
type SubscribableOrPromise<T> =
  | Subscribable<T>
  | Subscribable<never>
  | PromiseLike<T>
  | InteropObservable<T>;
```

## Recursos adicionales

<a class="source-icon" target="_blank" href="https://github.com/ReactiveX/rxjs/blob/6.5.5/src/internal/types.ts#L36-L37">
<img src="assets/icons/source-code.png" alt="Source code">
</a>
</div>

<a target="_blank" href="https://rxjs.dev/api/index/type-alias/SubscribableOrPromise">Documentación oficial en inglés</a>
