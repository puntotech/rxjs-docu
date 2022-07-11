# Multidifusión (multicasting)

En la versión 7, las APIs de multidifusión se han simplificado y ahora poseen menos funciones:

- connectable
- connect
- share

Y shareReplay - que es un pequeño _wrapper_ en torno al ahora altamente configurable operador share.

Otras APIs relacionadas con la multidifusión están ahora obsoletas.

> Estos cambios se introdujeron en RxJS 7.0 y serán _breaking_ en RxJS 8.

## APIs afectadas por este cambio

- ConnectableObservable
- multicast
- publish
- publishBehavior
- publishLast
- publishReplay
- refCount

## Cómo refactorizar

### ConnectableObservable

En lugar de crear una instancia de ConnectableObservable, se debe hacer una llamada a la función connectable para obtener un Observable connectable.

```
import { ConnectableObservable, timer, Subject } from 'rxjs';

// Obsoleto
const tick$ = new ConnectableObservable(
timer(1_000),
() => new Subject());
tick$.connect();
```

```
import { connectable, timer, Subject } from 'rxjs';

// Sugerencia de refactorización
const tick$ = connectable(timer(1_000), {
connector: () => new Subject()
});
tick$.connect();
```

En aquellas situaciones en las que se utilice el método `refCount`, se puede utilizar el operador share.

```
import { ConnectableObservable, timer, Subject } from 'rxjs';

// Obsoleto
const tick$ = new ConnectableObservable(
timer(1_000),
() => new Subject()
).refCount();
```

```
import { timer, share, Subject } from 'rxjs';

// Sugerencia de refactorización
const tick$ = timer(1_000).pipe(
share({ connector: () => new Subject() })
);
```

### multicast

En lugar de llamar a multicast con una factoría de sujetos, se puede hacer con connectable.

```
import { timer, multicast, Subject, ConnectableObservable } from 'rxjs';

// Obsoleto
const tick$ = timer(1_000).pipe(
multicast(() => new Subject())
) as ConnectableObservable<number>;
```

```
import { connectable, timer, Subject } from 'rxjs';

// Sugerencia de refactorización
const tick$ = connectable(timer(1_000), {
connector: () => new Subject()
});
```

En lugar de llamar a multicast con una instancia de un sujeto, se puede hacer con connectable y una instancia local de un sujeto.

```
import { timer, multicast, Subject, ConnectableObservable } from 'rxjs';

// Obsoleto
const tick$ = timer(1_000).pipe(
multicast(new Subject())
) as ConnectableObservable<number>;
```

```
import { connectable, timer, Subject } from 'rxjs';

// Sugerencia de refactorización
const tick$ = connectable(timer(1_000), {
connector: () => new Subject(),
resetOnDisconnect: false
});
```

En lugar de utilizar multicast junto a refCount, se puede reemplazar con share.

```
import { timer, multicast, Subject, refCount } from 'rxjs';

// Obsoleto
const tick$ = timer(1_000).pipe(
multicast(() => new Subject()),
refCount()
);
```

```
import { timer, share, Subject } from 'rxjs';

// Sugerencia de refactorización
const tick$ = timer(1_000).pipe(
share({ connector: () => new Subject() })
);
```

En lugar de utilizar multicast con un selector, se puede utilizar connect.

```
import { timer, multicast, Subject, combineLatest } from 'rxjs';

// Obsoleto
const tick$ = timer(1_000).pipe(
multicast(
() => new Subject(),
(source) => combineLatest([source, source])
)
);
```

```
import { timer, connect, combineLatest, Subject } from 'rxjs';

// Sugerencia de refactorización
const tick$ = timer(1_000).pipe(
connect((source) => combineLatest([source, source]), {
connector: () => new Subject()
})
);
```

### publish

En lugar de utilizar publish para crear un ConnectableObservable, se puede utilizar connectable.

```
import { timer, publish, ConnectableObservable } from 'rxjs';

// Obsoleto
const tick$ = timer(1_000).pipe(
publish()
) as ConnectableObservable<number>;
```

```
import { connectable, timer, Subject } from 'rxjs';

// Sugerencia de refactorización
const tick$ = connectable(timer(1_000), {
connector: () => new Subject<number>(),
resetOnDisconnect: false
});
```

Si al resultado de publish se le aplica refCount, se puede utilizar share para reemplazarlos a ambos.

```
import { timer, publish, refCount } from 'rxjs';

// Obsoleto
const tick$ = timer(1_000).pipe(
    publish(),
    refCount()
);
```

```
import { timer, share } from 'rxjs';

// Sugerencia de refactorización
const tick$ = timer(1_000).pipe(
    share({
        resetOnError: false,
        resetOnComplete: false,
        resetOnRefCountZero: false
    })
);
```

Si se utiliza publish con un selector, se puede utilizar el operador connect en su lugar.

```
import { timer, publish, combineLatest } from 'rxjs';

// Obsoleto
const tick$ = timer(1_000).pipe(
publish((source) => combineLatest([source, source]))
);
```

```
import { timer, connect, combineLatest } from 'rxjs';

// Sugerencia de refactorización
const tick$ = timer(1_000).pipe(
connect((source) => combineLatest([source, source]))
);
```

### publishBehavior

En lugar de utilizar publishBehavior para crear un ConnectableObservable, se puede utilizar connectable con un BehaviorSubject.

```
import { timer, publishBehavior, ConnectableObservable } from 'rxjs';

// Obsoleto
const tick$ = timer(1_000).pipe(
publishBehavior(0)
) as ConnectableObservable<number>;
```

```
import { connectable, timer, BehaviorSubject } from 'rxjs';

// Sugerencia de refactorización
const tick$ = connectable(timer(1_000), {
connector: () => new BehaviorSubject(0),
resetOnDisconnect: false
});
```

Si al resultado de publishBehavior se le aplica refCount, se puede utilizar el operador share - junto a un conector BehaviorSubject - para reemplazar ambos.

```
import { timer, publishBehavior, refCount } from 'rxjs';

// Obsoleto
const tick$ = timer(1_000).pipe(
publishBehavior(0),
refCount()
);
```

```
import { timer, share, BehaviorSubject } from 'rxjs';

// Sugerencia de refactorización
const tick$ = timer(1_000).pipe(
share({
connector: () => new BehaviorSubject(0),
resetOnError: false,
resetOnComplete: false,
resetOnRefCountZero: false
})
);
```

### publishLast

En lugar de utilizar publishLast para crear un ConnectableObservable, se puede utilizar connectable junto a un AsyncSubject.

```
import { timer, publishLast, ConnectableObservable } from 'rxjs';

// Obsoleto
const tick$ = timer(1_000).pipe(
publishLast()
) as ConnectableObservable<number>;
```

```
import { connectable, timer, AsyncSubject } from 'rxjs';

// Sugerencia de refactorización
const tick$ = connectable(timer(1_000), {
connector: () => new AsyncSubject<number>(),
resetOnDisconnect: false
});
```

Si al resultado de publishLast se le aplica refCount, se puede utilizar el operador share - junto a un conector AsyncSubject - para reemplazar ambos.

```
import { timer, publishLast, refCount } from 'rxjs';

// Obsoleto
const tick$ = timer(1_000).pipe(
publishLast(),
refCount()
);
```

```
import { timer, share, AsyncSubject } from 'rxjs';

// Sugerencia de refactorización
const tick$ = timer(1_000).pipe(
share({
connector: () => new AsyncSubject(),
resetOnError: false,
resetOnComplete: false,
resetOnRefCountZero: false
})
);
```

### publishReplay

En lugar de utilizar publishReplay para crear un ConnectableObservable, se puede utilizar connectable junto a un ReplaySubject.

```
import { timer, publishReplay, ConnectableObservable } from 'rxjs';

// Obsoleto
const tick$ = timer(1_000).pipe(
publishReplay(1)
) as ConnectableObservable<number>;
```

```
import { connectable, timer, ReplaySubject } from 'rxjs';

// Sugerencia de refactorización
const tick$ = connectable(timer(1_000), {
connector: () => new ReplaySubject<number>(1),
resetOnDisconnect: false
});
```

Si al resultado de publishReplay se le aplica refCount, se puede utilizar el operador share - junto a un conector ReplaySubject - para reemplazar ambos.

```
import { timer, publishReplay, refCount } from 'rxjs';

// Obsoleto
const tick$ = timer(1_000).pipe(
publishReplay(1),
refCount()
);
```

```
import { timer, share, ReplaySubject } from 'rxjs';

// Sugerencia de refactorización
const tick$ = timer(1_000).pipe(
share({
connector: () => new ReplaySubject(1),
resetOnError: false,
resetOnComplete: false,
resetOnRefCountZero: false
})
);
```

Si publishReplay se llama con un selector, se puede utilizar el operador connect - junto a un conector ReplaySubject - en su lugar.

```
import { timer, publishReplay, combineLatest } from 'rxjs';

// Obsoleto
const tick$ = timer(1_000).pipe(
publishReplay(1, undefined, (source) => combineLatest([source, source]))
);
```

```
import { timer, connect, combineLatest, ReplaySubject } from 'rxjs';

// Sugerencia de refactorización
const tick$ = timer(1_000).pipe(
connect((source) => combineLatest([source, source]), {
connector: () => new ReplaySubject(1)
})
);
```

### refCount

En lugar de aplicar el operador refCount al ConnectableObservable obtenido de un operador multicast o publish, se puede utilizar el operador share para reemplazarlos a ambos.

Las propiedades que se le pasen a share dependerán d elos operadores que estén siendo reemplazados. Las propuestas de refactorización para utilizar refCount con multicast, publish, publishBehavior, publishLast y publishReplay están detalladas arriba.
