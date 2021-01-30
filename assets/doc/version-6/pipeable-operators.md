# Operadores de tubería

A partir de la versión 5.5, se introdujeron los "operadores de tubería", a los que se puede acceder en `rxjs/operators` (nótese la pluralización de "operadores"). Estos operadores son una alternativa a importar los operadores "parche" del paquete `rxjs-compat`.

NOTA: Usar `rxjs` o `rxjs/operators` sin haber hecho cambios al proceso de compilado puede resultar en un aumento del tamaño del _bundle_. Ver la sección [Problemas Conocidos]().

## Operadores renombrados

Debido a la disponibilidad de operadores independientes a un Observable, los nombres de los operadores no pueden entrar en conflicto con las palabras reservadas del lenguaje de JavaScript. Por tanto, los nombres de la versión de tubería de algunos operadores ha cambiado. Estos operadores son:

1. `do` -> `tap`
2. `catch` -> `catchError`
3. `switch` -> `switchAll`
4. `finally` -> `finalize`

El operador `let` es ahora parte de `Observable` como `pipe` y no puede ser importado.

```javascript
source$.let(myOperator);

// Se convierte en

source$.pipe(myOperator);
```

Ver la sección [Construye tu Propio Operador]().

El operador `toPromise()` ha sido eliminado ya que un operador devuelve un `Observable`, no una `Promise`. Hay ahora un método `Observable.toPromise()`.

## ¿Por qué?

Los problemas causados por los operadores de encadenamiento parcheados son los siguientes:

1. Cualquier biblioteca que importe un operador de parche aumentará el `Observable.prototype` para cualquier consumidor de dicha biblioteca, creando dependencias ciegas. Si la biblioteca elimina su uso, romperán sin saberlo el código de todos los demás. Con los operadores de tubería, hay que importar los operadores que se necesiten directamente en cada fichero en el que se vayan a utilizar.

2. Los operadores parcheados directamente en el *prototype* no son "[tree-shakeable](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking)" mediante herramientas como rollup o webpack. Los operadores de tubería sí que lo serán, dado que son simples funciones que se importan de los módulos de forma directa.

3. Los operadores importados en aplicaciones que no se utilicen no pueden detectarse de forma fiable por ninguna herramienta de compilado ni regla de linter. Esto quiere decir que si se importa el operador `scan`, aunque deje de utilizarse en el código, se seguirá añadiendo al _bundle_ de salida. Con los operadores de tubería, si se deja de darles uso, una regla de linter será capaz de indicárnoslo.

4. La composición funcional es fantástica. Construir un operador personalizado es mucho más fácil, y ahora funcionan y tienen el mismo aspecto que todos los demás operadores de RxJS. Ya no hay que extender Observable ni sobreescribir `lift`.

## ¿Qué?

¿Qué es un operador de tubería? Dicho de forma sencilla, es una función que puede utilizarse con el operador `let` actual. Este fue el origen del primer nombre que se le puso ("lettable"), pero al ser tan confuso se cambió por "pipeable" (de tubería), ya que están diseñados para utilizarse con la utilidad `pipe`. Se puede considerar un operador de tubería a cualquier función que devuelva una función con la siguiente firma: `<T, R>(source: Observable<T>) => Observable <R>`.

Existe un método `pipe` incorporado a `Observable` en `Observable.prototype.pipe` que puede utilizarse para componer los operadores de manera similar a cómo se solía hacer con encadenación (ejemplo mostrado a continuación).

También hay una función de utilidad `pipe` que puede importarse con `import { pipe } from 'rxjs';` La función `pipe` puede utilizarse para construir operadores de tubería reutilizables, a partir de otros operadores de tubería. Por ejemplo:

```javascript
import { pipe } from "rxjs";
import { map } from "rxjs/operators";

const mapTwice = <T, R>(fn: (value: T, index: number) => R) =>
  pipe(map(fn), map(fn));
```

## Uso

Se importa cualquier operador que se quiera utilizar de un solo sitio: `rxjs/operators` (¡Plural!) También se recomienda importar los métodos de creación de Observables de forma directa, tal y como se muestra a continuación con `range`:

```javascript
import { range } from "rxjs";
import { map, filter, scan } from "rxjs/operators";

const source$ = range(0, 10);

source$
  .pipe(
    filter((x) => x % 2 === 0),
    map((x) => x + x),
    scan((acc, x) => acc + x, 0)
  )
  .subscribe((x) => console.log(x));

// Output:
// 0
// 4
// 12
// 24
// 40
```

## Construye tu Propio Operador

Es cierto que _siempre_ se ha podido hacer con `let`... Pero ahora, construir un operador personalizado es tan sencillo como escribir una función. Ahora se pueden componer los operadores personalizados con los demás operadores rxjs de forma perfecta.

```typescript
import { Observable, interval } from "rxjs";
import { filter, map, take, toArray } from "rxjs/operators";

/**
 * Un operador que obtiene cada N-ésimo valor
 */
const takeEveryNth = (n: number) => <T>(source: Observable<T>) =>
  new Observable()<T>((observer) => {
    let count = 0;
    return source.subscribe({
      next(x) {
        if (count++ % n === 0) observer.next(x);
      },
      error(err) {
        observer.error(err);
      },
      complete() {
        observer.complete();
      },
    });
  });

/**
 * También se puede utilizar un operador ya existente
 */
const takeEveryNthSimple = (n: number) => <T>(source: Observable<T>) =>
  source.pipe(filter((value, index) => index % n === 0));

/**
 * Dado que los operadores de tubería devuelven funciones, se puede simplificar, de la siguiente manera
 */
const takeEveryNthSimplest = (n: number) =>
  filter((value, index) => index % n === 0);

interval(1000)
  .pipe(
    takeEveryNth(2),
    map((x) => x + x),
    takeEveryNthSimple(3),
    map((x) => x * x),
    takeEveryNthSimplest(4),
    take(3),
    toArray()
  )
  .subscribe((x) => console.log(x));
// Output:
// [0, 2304, 9216]
```

## Problemas Conocidos

### TypeScript < 2.4

En TypeScript versión 2.3 y anteriores, se deben añadir los tipos a las funciones pasadas a los operadores, dado que los tipos no se pueden inferir en versiones anteriores a TypeScript 2.4. En TypeScript 2.4 y versiones posteriores, los tipos serán inferidos correctamente vía composición.

TS 2.3 y anteriores

```javascript
range(0, 10)
  .pipe(
    map((n: number) => n + "!"),
    map((s: string) => "Hello, " + s)
  )
  .subscribe((x) => console.log(x));
```

TS 2.3 y posteriores

```javascript
range(0, 10)
  .pipe(
    map((n) => n + "!"),
    map((s) => "Hello, " + s)
  )
  .subscribe((x) => console.log(x));
```

## Proceso de Construcción y Treeshaking

Cuando se realizan importaciones de un fichero manifest (o de re-exportación), el _bundle_ de una aplicación puede llegar a aumentar de tamaño. Los operadores de tubería se pueden importar desde `rxjs/operators`, pero hacerlo sin cambiar el proceso de construcción suele provocar el aumento de tamaño del _bundle_ de la aplicación. Esto es debido a que, por defecto, `rxjs/operators` resuelve a la salida de CommonJS de rxjs.

Para poder utilizar los operadores de tubería nuevos y no aumentar el tamaño del _bundle_, se debe cambiar la configuración de Webpack. Solo funcionará con Webpack3+, ya que depende del nuevo `ModuleConcatenationPlugin` de Webpack 3.

#### Mapeo de rutas

Junto a rxjs 5.5, se publicaron _builds_ de rxjs en formato Módulo de ECMAScript (imports y exports), con los niveles de lenguaje ES5 y ES2015. Estas distribuciones se pueden encontrar en `node_modules/rxjs/_esm5` y en `node_modules/rxjs/_esm2015` ("esm" se refiere a Módulos ECMAScript y el número "5" o "2015" al nivel de lenguaje ES.) En el código fuente de la aplicación se debe importar desde `rxjs/operators`, pero en el fichero de configuración de Webpack será necesario proyectar los _imports_ a la versión ESM5 (o ESM2015.)

Al hacer `require('rxjs/_esm5/path-mapping')`, se recibirá una función que retorna un objeto de pares clave-valor, proyectando cada _input_ a su ubicación en disco. Se puede utilizar este mapeo de la siguiente forma:

En el fichero `webpack.config.js`:

- Configuración simple:

```javascript
const rxPaths = require("rxjs/_esm5/path-mapping");
const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: "index.js",
  output: "bundle.js",
  resolve: {
    // Se utiliza la clave "alias" para resolver a una distribución ESM
    alias: rxPaths(),
  },
  plugins: [new webpack.optimize.ModuleConcatenationPlugin()],
};
```

- Configuración más completa (cercana a un escenario real)

```javascript
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DashboardPlugin = require("webpack-dashboard/plugin");
const nodeEnv = process.env.NODE_ENV || "development";
const isProd = nodeEnv === "production";
const rxPaths = require("rxjs/_esm5/path-mapping");

var config = {
  devtool: isProd ? "hidden-source-map" : "cheap-eval-source-map",
  context: path.resolve("./src"),
  entry: {
    app: "./index.ts",
    vendor: "./vendor.ts",
  },
  output: {
    path: path.resolve("./dist"),
    filename: "[name].bundle.js",
    sourceMapFilename: "[name].map",
    devtoolModuleFilenameTemplate: function (info) {
      return "file:///" + info.absoluteResourcePath;
    },
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.ts$|\.tsx$/,
        exclude: ["node_modules"],
        loader: "ts-loader",
      },
      { test: /\.html$/, loader: "html" },
      { test: /\.css$/, loaders: ["style", "css"] },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    modules: [path.resolve("./src"), "node_modules"],
    alias: rxPaths(),
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        // eslint-disable-line quote-props
        NODE_ENV: JSON.stringify(nodeEnv),
      },
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new HtmlWebpackPlugin({
      title: "Typescript Webpack Starter",
      template: "!!ejs-loader!src/index.html",
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: Infinity,
      filename: "vendor.bundle.js",
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      compress: {
        warnings: false,
        pure_getters: true,
        passes: 3,
        screw_ie8: true,
        sequences: false,
      },
      output: { comments: false, beautify: true },
      sourceMap: false,
    }),
    new DashboardPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        tslint: {
          emitErrors: true,
          failOnHint: true,
        },
      },
    }),
  ],
};

module.exports = config;
```
