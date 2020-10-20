# share

<h2 class="subtitle"> Comparte el Observable fuente entre varios suscriptores</h2>

💡 Se puede utilizar share para convertir un Observable frío en uno caliente

💡 share es como utilizar <a href="/operators/multicasting/multicast">multicast</a> con un Sujeto y <a href="/operators/multicasting/refCount">refCount</a>

<details>
<summary>Signatura</summary>

## Firma

`share<T>(): MonoTypeOperatorFunction<T>`

## Parámetros

No recibe ningún parámetro.

## Retorna

`MonoTypeOperatorFunction<T>`: Un Observable que, al ser conectado, hace que el Observable fuente emita valores a sus Observadores.

</details>

## Descripción

Comparte las emisiones del Observable fuente entre todos sus suscriptores.

<img src="/assets/images/marble-diagrams/multicasting/share.png" alt="Diagrama de canicas del operador share">

Retorna un Observable nuevo que multidifunde (comparte) el Observable original. Mientras haya al menos un suscriptor, el Observable emitirá valores. Cuando todos los Suscriptores hayan cancelado la suscripción al Observable compartido, `share` cancelará la suscripción al Observable fuente. Dado que el Observable está multidifundido, el flujo es caliente.

`share` es un alias de `multicast(() => new Subject()), refCount()`.

## Ejemplos

Por defecto, los Observables son fríos. Esto quiere decir que con cada suscripción, se vuelve a crear el productor subyacente. Por tanto, si un Observable realiza una petición AJAX, cada vez que reciba una suscripción nueva, **volverá a hacer la petición**. Este comportamiento se puede observar en el siguiente ejemplo:

[StackBlitz](https://stackblitz.com/edit/docu-rxjs-share?file=index.ts)

```javascript
import { map, mergeAll, take, tap } from "rxjs/operators";
import { ajax } from "rxjs/ajax";

const ghibliFilm$ = ajax.getJSON("https://ghibliapi.herokuapp.com/films").pipe(
  tap((_) => console.log("Nueva petición")),
  mergeAll(),
  take(1)
);

const ghibliFilmTitle$ = ghibliFilm$.pipe(map(({ title }) => title));

const ghibliFilmDescription$ = ghibliFilm$.pipe(
  map(({ description }) => description)
);

ghibliFilmTitle$.subscribe(console.log);
ghibliFilmDescription$.subscribe(console.log);

/* Salida: 
'Nueva petición'
'Castle in the Sky',
'Nueva petición',
'The orphan Sheeta inherited a mysterious crystal that links her to the mythical...'
*/
```

Sin embargo, si se utiliza el operador `share` para multidifundir (compartir) los valores del Observable entre todos sus suscriptores. De esta manera, el Observable frío se convierte en uno caliente, y, en el caso del ejemplo anterior, la petición AJAX **no se repite** con cada nueva suscripción.

[StackBlitz](https://stackblitz.com/edit/docu-rxjs-share-2?file=index.ts)

```javascript
import { map, mergeAll, share, take, tap } from "rxjs/operators";
import { ajax } from "rxjs/ajax";

const ghibliFilm$ = ajax.getJSON("https://ghibliapi.herokuapp.com/films").pipe(
  tap((_) => console.log("Nueva petición")),
  mergeAll(),
  take(1),
  share()
);

const ghibliFilmTitle$ = ghibliFilm$.pipe(map(({ title }) => title));

const ghibliFilmDescription$ = ghibliFilm$.pipe(
  map(({ description }) => description)
);

ghibliFilmTitle$.subscribe(console.log);

ghibliFilmDescription$.subscribe(console.log);
/* Salida:
'Nueva petición'
'Castle in the Sky',
'The orphan Sheeta inherited a mysterious crystal that links her to the mythical...'
*/
```

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/share.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/operators/share">Documentación oficial en inglés</a>
