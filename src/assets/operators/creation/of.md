# of

### Convierte los argumentos en una secuencia Observable.

<div class="fading-line"></div>

### Firma

`of(...args: (SchedulerLike | T)[]): Observable`

### Parámetros

<table>
<tr><td>args</td><td>Tipo: <code>(SchedulerLike | T)[]</code></td></tr>
</table>

### Retorna

`Observable<T>`: Un Observable que emite los argumentos descritos anteriormente y se completa.

<div class="fading-line"></div>

## Descripción

Cada argumento se convierte en una notificación next.

<img class="marble-diagram" src="assets/images/marble-diagrams/creation/of.png" alt="Diagrama de canicas de of">

Al contrario que [from](), no se lleva a cabo ninguna aplanación y cada argumento al completo se emite como una notificación `next`.

## Ejemplos

Emitir una secuencia de números

[StackBlitz](https://stackblitz.com/edit/docu-rxjs-of?file=index.ts)

```javascript
import { of } from "rxjs";

const number$ = of(1, 2, 3, 4, 5);

number$.subscribe((number) => console.log(number));
// Salida: 1, 2, 3, 4, 5
```

Emitir una secuencia de cadenas

[StackBlitz](https://stackblitz.com/edit/docu-rxjs-of-2?file=index.ts)

```javascript
import { of } from "rxjs";

const pokemon$ = of("Squirtle", "Charmander", "Bulbasaur");

pokemon$.subscribe((pokemon) => console.log(pokemon));
// Salida: Squirtle, Charmander, Bulbasaur
```

Emitir una secuencia de arrays

[StackBlitz](https://stackblitz.com/edit/docu-rxjs-of-3?file=index.ts)

```javascript
import { of } from "rxjs";

const fruit$ = of(["Fresa", "Cereza"], ["Limón", "Naranja"]);

fruit$.subscribe((fruit) => console.log(fruit));
// Salida: ["Fresa", "Cereza"] ["Limón", "Naranja"]
```

Emitir una secuencia de objetos

[StackBlitz](https://stackblitz.com/edit/docu-rxjs-of-4?file=index.ts)

```javascript
import { of } from "rxjs";

const iceCream$ = of(
  { size: "Grande", toppings: ["Galletas Oreo", "Sirope de Chocolate"] },
  { size: "Pequeño", toppings: ["Fresas"] }
);

iceCream$.subscribe(console.log);
// Salida: { size: "Grande", toppings: ["Galletas Oreo", "Sirope de Chocolate"] } { size: "Pequeño", toppings: ["Fresas"] }
```

### Ejemplos de la documentación oficial

Emitir los valores `10`, `20`, `30`

```javascript
import { of } from "rxjs";

of(10, 20, 30).subscribe(
  (next) => console.log("next:", next),
  (err) => console.log("error:", err),
  () => console.log("Fin")
);
// Salida:
// 'next: 10'
// 'next: 20'
// 'next: 30'
// 'Fin'
```

Emitir el array [1,2,3]

```javascript
import { of } from "rxjs";

of([1, 2, 3]).subscribe(
  (next) => console.log("next:", next),
  (err) => console.log("error:", err),
  () => console.log("Fin")
);
// Salida:
// 'next: [1,2,3]'
// 'Fin'
```

## Recetas

## Recursos Adicionales

- [of](https://rxjs.dev/api/index/function/of) - Documentación oficial en inglés
- [Código fuente](https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/of.ts)
