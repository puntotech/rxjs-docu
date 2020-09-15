# exhaust

### Convierte un Observable de orden superior a uno de primer orden ignorando los Observables internos mientras el Observable interno actual no se haya completado

### Firma

`exhaust<T>(): OperatorFunction<any, T>`

### Parámetros

No recibe ningún parámetro.

### Retorna

`OperatorFunction<any, T>`: Un Observable que recibe una fuente de Observables y propaga el primer Observable hasta que este se completa, antes de suscribirse al siguiente Observable.

### Descripción

'Aplasta' un Observable de Observables ignorando los Observables internos posteriores mientras el Observable interno actual se esté ejecutando.

<img src="assets/images/marble-diagrams/transformation/exhaust.png" alt="Diagrama de canicas del operador exhaust">

`exhaust` se suscribe a un Observable que emite Observables, también conocido como un Observable de orden superior. Cada vez que observa uno de los Observables internos emitidos, el Observable resultante comienza a emitir los elementos emitidos por dicho Observable interno. Hasta aquí, se comporta igual que `mergeAll`. Sin embargo, `exhaust` ignora todos los Observables internos que se emitan mientras el Observable actual no se haya completado. Una vez que el Observable actual se haya completado, `exhaust` lo unirá al Observable resultante y se suscribirá al siguiente Observable interno y repetirá el proceso.

## Ejemplos

// TODO: Add example (maybe pokemon gif animation?)

[StackBlitz]()

```javascript

```

Obtener 3 películas de Studio Ghibli al hacer click en el botón. Si hay alguna petición en curso, los clicks serán ignorados (cada petición tiene un retraso de 5s para poder observar este efecto.)

[StackBlitz](https://stackblitz.com/edit/rxjs-exhaust-2?file=index.ts)

```javascript
import { delay, exhaust, map, mergeAll, take } from "rxjs/operators";
import { fromEvent } from "rxjs";
import { ajax } from "rxjs/ajax";

const click$ = fromEvent(document.getElementById("ghibliButton"), "click");

function getGhibliFilms() {
  return ajax.getJSON("https://ghibliapi.herokuapp.com/films").pipe(
    delay(5000),
    mergeAll(),
    map(({ title }) => title),
    take(3)
  );
}

click$
  .pipe(
    map((_) => getGhibliFilms()),
    exhaust()
  )
  .subscribe(console.log);
// Salida: (Primer click) (click ignorado) (click ignorado) (5s) Castle in the Sky, Grave of the Fireflies, My Neighbor Totoro
```

### Ejemplo de la documentación oficial

Ejecuta un temporizador con cada click, únicamente si no hay ningún temporizador activo

```javascript
import { fromEvent, interval } from "rxjs";
import { exhaust, map, take } from "rxjs/operators";

const clicks = fromEvent(document, "click");
const higherOrder = clicks.pipe(map((ev) => interval(1000).pipe(take(5))));
const result = higherOrder.pipe(exhaust());
result.subscribe((x) => console.log(x));
```

- [Documentación oficial en inglés](https://rxjs-dev.firebaseapp.com/api/operators/exhaust)
- [Código fuente](https://github.com/ReactiveX/rxjs/blob/master/src/internal/operators/exhaust.ts)
