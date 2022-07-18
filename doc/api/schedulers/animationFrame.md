# animationFrame

|           |
| --------- |
| <h4></h4> |

## animationFrame

### Planificador Animation Frame

#### Firma

`const animationFrame: any;`

### Descripción

Lleva a cabo una acción en el momento en el que se dispararía `window.requestAnimationFrame`.

Cuando el planificador animationFrame se utiliza con delay, se comporta como el planificador [async](animationFrame.md).

Sin delay, el planificador animationFrame se puede utilizar para crear animaciones del navegador fluidas. Se asegura de que la tarea planificada ocurra justo antes del siguiente repintado del navegador, llevando así a cabo las animaciones de la forma más eficiente posible.

### Ejemplo

Planificar animación de la altura de un div

```javascript
// html: <div style="background: #0ff;"></div>
import { animationFrameScheduler } from "rxjs";

const div = document.querySelector("div");

animationFrameScheduler.schedule(
  function (height) {
    div.style.height = height + "px";

    this.schedule(height + 1); // `this` referencia a la acción que se está ejecutando,
    // que se replanifica con un nuevo estado
  },
  0,
  0
);

// Se podrá observar un incremento en la altura de un elemento div
```
