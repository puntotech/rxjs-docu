# fromEventPattern

<h2 class="subtitle"> Crea un Observable a partir de una API arbitraria de registro de manejadores de eventos
</h2>

<details>
<summary>Signatura</summary>

### Firma

`fromEventPattern<T>(addHandler: (handler: NodeEventHandler) => any, removeHandler?: (handler: NodeEventHandler, signal?: any) => void, resultSelector?: (...args: any[]) => T): Observable<T | T[]>`

### Parámetros

<table>
<tr><td>addHandler</td><td>Una función que recibe una función manejadora como argumento y la vincula a la fuente de eventos.</td></tr>
<tr><td>removeHandler</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Una función que recibe una función manejadora como argumento y la desvincula de la fuente del evento. Si <code>addHandler</code> retorna algún tipo de token, <code>removeHandler</code> lo recibirá como segundo parámetro.
</td></tr>
<tr><td>resultSelector</td><td>Opcional. El valor por defecto es <code>undefined</code>.
Tipo: <code>(...args: any[]) => T</code>.</td></tr>
</table>

### Retorna

`Observable<T | T[]>`: Un Observable que, cuando se dispara un evento, emite o el primer parámetro que se le haya proporcionado al manejador de eventos registrado, o el resultado de la función de proyección.

</details>

## Descripción

Se utiliza cuando `fromEvent` no está preparado para manejar un determinado método para añadir manejadores de eventos.

<img src="assets/images/marble-diagrams/creation/fromEventPattern.png" alt="Diagrama de canicas de fromEventPattern">

`fromEventPattern` permite convertir cualquier API de registro de funciones manejadores en eventos, en un Observable. Es similar a `fromEvent`, pero mucho más flexible. De hecho, todos los casos de uso de `fromEvent` podrían manejarse con `fromEventPattern` (aunque de forma más verbosa.)

Este operador recibe una función `addHandler` como primer argumento, que se inyecta con un parámetro `handler`. Dicho `handler` es una función de manejo de eventos que se le puede proporcionar a la API que la espera. `addHandler` se llamará cuando se realice alguna suscripción al Observable retornado por `fromEventPattern`, por lo que el registro del manejador en la API no tiene que ocurrir necesariamente cuando se llame a `fromEventPattern`.

Tras el registro, cada vez que se dispare un evento al que se está escuchando, el Observable retornado por `fromEventPattern` emitirá el valor con el que se haya llamado a la función de manejo de eventos. Si el manejador de eventos se ha llamado con más de un argumento, ningún argumento a partir del segundo, este inclusive, aparecerá en el flujo resultante.

Si la API utilizada permite desvincular manejadores de eventos, se le puede pasar un segundo parámetro a `fromEventPattern`: la función `removeHandler`. Se inyectará con la misma función manejadora que antes, pero ahora se puede utilizar para desvincularla de la API. `removeHandler` será llamada cuando el consumidor del Observable resultante cancele la suscripción a dicho Observable.

En algunas APIs, la desvinculación del manejador de eventos se maneja de otra forma. Al vincular un manejador de eventos, se retorna algún tipo de token, que o bien se utiliza después para identificar qué función se debe desvincular, o el propio token contiene un método para desvincular el manejador de eventos. Si ese es el caso, se debe asegurar que el token retornado por el método de registro lo retorna la función `addHandler`. Entonces se le proporcionará a `removeHandler` como segundo argumento, donde se podrá hacer uso de él.

Si se necesita tener acceso a todos los parámetros del manejador de eventos, o se necesita poder transformarlos, se le puede proporcionar un tercer parámetro opcional a `fromEventPattern`: una función de proyección que acepta todos los argumentos pasados al manejador de eventos. El resultado de la función de proyección aparecerá en el flujo resultante en lugar del primer argumento del manejador de eventos.

## Ejemplos

### Ejemplos de la documentación oficial

Emitir los clicks que ocurran en el DOM

```javascript
import { fromEventPattern } from "rxjs";

function addClickHandler(handler) {
  document.addEventListener("click", handler);
}

function removeClickHandler(handler) {
  document.removeEventListener("click", handler);
}

const clicks = fromEventPattern(addClickHandler, removeClickHandler);
clicks.subscribe((x) => console.log(x));
// (click) MouseEvent {} (click) MouseEvent {}
```

Usar `fromEventPattern` con una API que retorna un token de cancelación

```javascript
import { fromEventPattern } from "rxjs";

const token = someAPI.registerEventHandler(function () {});
someAPI.unregisterEventHandler(token); // El método de cancelación de esta API recibe un token especial en lugar de un manejador

const someAPIObservable = fromEventPattern(
  function (handler) {
    return someAPI.registerEventHandler(handler);
  }, // Aquí se retorna el token...
  function (handler, token) {
    someAPI.unregisterEventHandler(token);
  } // ...para utilizarlo aquí
);
```

Usar `fromEventPattern` con función de proyección

```javascript
    import { fromEventPattern } from 'rxjs';

    someAPI.registerEventHandler((eventType, eventMessage) => {
      console.log(eventType, eventMessage); // Imprime "EVENT_TYPE" "EVENT_MESSAGE" por consola
    });

    const someAPIObservable = fromEventPattern(
      handler => someAPI.registerEventHandler(handler),
      handler => someAPI.unregisterEventHandler(handler)
      (eventType, eventMessage) => eventType + " --- " + eventMessage // Sin esta función solo se emitiría "EVENT_TYPE"
    );

    someAPIObservable.subscribe(value => console.log(value));

    // Salida:
    // "EVENT_TYPE --- EVENT_MESSAGE"
```

<div class="additional-section">

## Recursos adicionales

<a target="_blank" href="https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/fromEventPattern.ts">
<svg>
  <use xlink:href="/assets/icons/source.svg#source-code"></use>
</svg>
</a>
</div>

- <a target="_blank" href="https://rxjs.dev/api/index/function/fromEventPattern">Documentación oficial en inglés</a>
