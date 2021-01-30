# Instalación

A continuación se muestran las distintas formas de instalar RxJS:

## ES6 vía npm

```javascript
npm install rxjs
```

Para importar el conjunto de funciones principales al completo:

```javascript
import * as rxjs from "rxjs";

rxjs.of(1, 2, 3);
```

Para importar únicamente lo que necesitemos, utilizando operadores de tubería:

```javascript
import { of } from "rxjs";
import { map } from "rxjs/operators";

of(1, 2, 3).pipe(map((x) => x + "!!!")); // etc
```

- Ver la sección [Operadores de Tubería](/version-6/operadores-tuberia) para más información acerca de operadores de tubería.

Para utilizar con el _bundle_ importado de forma global:

```javascript
const { of } = rxjs;
const { map } = rxjs.operators;

of(1, 2, 3).pipe(map((x) => x + "!!!")); // etc
```

## CommonJS vía npm

Si nos aparece un error como _error TS2304: Cannot find name 'Promise'_ o _error TS2304: Cannot find name 'Iterable'_ al utilizar RxJS, es posible que tengamos que instalar un conjunto de tipos adicional.

1. Para usuarios de _typings_:

```javascript
typings install es6-shim --ambient
```

2. Si no utilizamos _typings_, las interfaces se pueden copiar de _/es6-shim/es6-shim.d.ts_.

3. Añadimos el fichero de definición de tipos incluido en el `tsconfig.json` o en el argumento del CLI.

## Todos los demás tipos de Módulos (CJS/ES6/AMD/TypeScript) vía npm

Para instalar esta biblioteca vía npm versión 3, se utiliza el siguiente comando:

```javascript
npm install #reactivex/rxjs
```

Si se utiliza la versión 2 de npm antes de que esta biblioteca haya alcanzado una versión estable, será necesario especificar la versión de la biblioteca de forma explícita:

```javascript
npm install @reactivex/rxjs@5.0.0-beta.1
```

## CDN

Para CDN, se puede utilizar [unpkg]. Únicamente hay que reemplazar la palabra clave `version` de los siguientes enlaces con la versión actual de RxJS:

Para RxJS 5.0.0-beta.1 hasta beta.11: https://unpkg.com/@reactivex/rxjs@version/dist/global/Rx.umd.js

For RxJS 5.0.0-beta.12 y versiones posteriores: https://unpkg.com/@reactivex/rxjs@version/dist/global/Rx.js

For RxJS 6.0.0 y versiones posteriores: https://unpkg.com/@reactivex/rxjs@version/dist/global/rxjs.umd.js
