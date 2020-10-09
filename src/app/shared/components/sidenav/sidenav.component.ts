import { NestedTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';

interface SectionNode {
  name: string;
  children?: SectionNode[];
  url: string;
}

const TREE_DATA: SectionNode[] = [
  {
    name: 'Introducción',
    url: 'introduccion',
  },
  {
    name: 'Instalación',
    url: 'instalacion',
  },
  {
    name: 'Conceptos',
    url: 'concepts',
    children: [
      { name: 'Observables', url: 'concepts/observables' },

      { name: 'Observador', url: 'concepts/observador' },

      { name: 'Operadores', url: 'concepts/operadores' },

      { name: 'Planificadores', url: 'concepts/planificadores' },

      { name: 'Sujetos', url: 'concepts/sujetos' },

      { name: 'Suscripción', url: 'concepts/suscripcion' },

      {
        name: 'Testing',
        url: 'concepts/testing',
        children: [
          {
            name: 'Tests de Canicas',
            url: 'concepts/testing/tests-de-canicas',
          },

          {
            name: 'Contribuir tests a RxJS',
            url: 'concepts/testing/contribuir-tests-a-rxjs',
          },
        ],
      },
    ],
  },
  {
    name: 'Operadores',
    url: 'operators',
    children: [
      {
        name: 'Combinación',
        url: 'operators/combination',
        children: [
          { name: 'combineAll', url: 'operators/combination/combineAll' },

          {
            name: 'combineLatest',
            url: 'operators/combination/combineLatest',
          },

          { name: 'concat', url: 'operators/combination/concat' },

          { name: 'concatAll', url: 'operators/combination/concatAll' },

          { name: 'exhaust', url: 'operators/combination/exhaust' },

          { name: 'forkJoin', url: 'operators/combination/forkJoin' },

          { name: 'merge', url: 'operators/combination/merge' },

          { name: 'mergeAll', url: 'operators/combination/mergeAll' },

          { name: 'race', url: 'operators/combination/race' },

          { name: 'startWith', url: 'operators/combination/startWith' },

          {
            name: 'withLatestFrom',
            url: 'operators/combination/withLatestFrom',
          },

          { name: 'zip', url: 'operators/combination/zip' },
        ],
      },
      {
        name: 'Condicionales',
        url: 'operators/conditional',
        children: [
          {
            name: 'defaultIfEmpty',
            url: 'operators/conditional/defaultIfEmpty',
          },

          { name: 'every', url: 'operators/conditional/every' },

          { name: 'find', url: 'operators/conditional/find' },

          { name: 'findIndex', url: 'operators/conditional/findIndex' },

          { name: 'isEmpty', url: 'operators/conditional/isEmpty' },
        ],
      },
      {
        name: 'Creación',
        url: 'operators/creation',
        children: [
          { name: 'ajax', url: 'operators/creation/ajax' },

          { name: 'bindCallback', url: 'operators/creation/bindCallback' },

          {
            name: 'bindNodeCallback',
            url: 'operators/creation/bindNodeCallback',
          },

          { name: 'defer', url: 'operators/creation/defer' },

          { name: 'empty', url: 'operators/creation/empty' },

          { name: 'from', url: 'operators/creation/from' },

          { name: 'fromEvent', url: 'operators/creation/fromEvent' },

          {
            name: 'fromEventPattern',
            url: 'operators/creation/fromEventPattern',
          },

          { name: 'fromFetch', url: 'operators/creation/fromFetch' },

          { name: 'generate', url: 'operators/creation/generate' },

          { name: 'interval', url: 'operators/creation/interval' },

          { name: 'of', url: 'operators/creation/of' },

          { name: 'range', url: 'operators/creation/range' },

          { name: 'throwError', url: 'operators/creation/throwError' },

          { name: 'timer', url: 'operators/creation/timer' },

          { name: 'iif', url: 'operators/creation/iif' },
        ],
      },
      {
        name: 'Filtración',
        url: 'operators/filtering',
        children: [
          { name: 'audit', url: 'operators/filtering/audit' },

          { name: 'auditTime', url: 'operators/filtering/auditTime' },

          { name: 'debounce', url: 'operators/filtering/debounce' },

          { name: 'debounceTime', url: 'operators/filtering/debounceTime' },

          { name: 'distinct', url: 'operators/filtering/distinct' },

          {
            name: 'distinctUntilChanged',
            url: 'operators/filtering/distinctUntilChanged',
          },

          {
            name: 'distinctUntilKeyChanged',
            url: 'operators/filtering/distinctUntilKeyChanged',
          },

          { name: 'elementAt', url: 'operators/filtering/elementAt' },

          { name: 'filter', url: 'operators/filtering/filter' },

          { name: 'first', url: 'operators/filtering/first' },

          {
            name: 'ignoreElements',
            url: 'operators/filtering/ignoreElements',
          },

          { name: 'last', url: 'operators/filtering/last' },

          { name: 'sample', url: 'operators/filtering/sample' },

          { name: 'sampleTime', url: 'operators/filtering/sampleTime' },

          { name: 'single', url: 'operators/filtering/single' },

          { name: 'skip', url: 'operators/filtering/skip' },

          { name: 'skipLast', url: 'operators/filtering/skipLast' },

          { name: 'skipUntil', url: 'operators/filtering/skipUntil' },

          { name: 'skipWhile', url: 'operators/filtering/skipWhile' },

          { name: 'take', url: 'operators/filtering/take' },

          { name: 'takeLast', url: 'operators/filtering/takeLast' },

          { name: 'takeUntil', url: 'operators/filtering/takeUntil' },

          { name: 'takeWhile', url: 'operators/filtering/takeWhile' },

          { name: 'throttle', url: 'operators/filtering/throttle' },

          { name: 'throttleTime', url: 'operators/filtering/throttleTime' },
        ],
      },
      {
        name: 'Gestión de Errores',
        url: 'operators/error-handling',
        children: [
          {
            name: 'catchError',
            url: 'operators/error-handling/catchError',
          },

          { name: 'retry', url: 'operators/error-handling/retry' },

          { name: 'retryWhen', url: 'operators/error-handling/retryWhen' },
        ],
      },
      {
        name: 'Multidifusión',
        url: 'operators/multicasting',
        children: [
          { name: 'multicast', url: 'operators/multicasting/multicast' },

          { name: 'publish', url: 'operators/multicasting/publish' },

          {
            name: 'publishBehavior',
            url: 'operators/multicasting/publishBehavior',
          },

          { name: 'publishLast', url: 'operators/multicasting/publishLast' },

          {
            name: 'publishReplay',
            url: 'operators/multicasting/publishReplay',
          },

          { name: 'share', url: 'operators/multicasting/share' },
        ],
      },
      {
        name: 'Transformación',
        url: 'operators/transformation',
        children: [
          { name: 'buffer', url: 'operators/transformation/buffer' },

          { name: 'bufferCount', url: 'operators/transformation/bufferCount' },

          { name: 'bufferTime', url: 'operators/transformation/bufferTime' },

          {
            name: 'bufferToggle',
            url: 'operators/transformation/bufferToggle',
          },

          { name: 'bufferWhen', url: 'operators/transformation/bufferWhen' },

          { name: 'concatMap', url: 'operators/transformation/concatMap' },

          { name: 'concatMapTo', url: 'operators/transformation/concatMapTo' },

          { name: 'exhaust', url: 'operators/transformation/exhaust' },

          { name: 'exhaustMap', url: 'operators/transformation/exhaustMap' },

          { name: 'expand', url: 'operators/transformation/expand' },

          { name: 'groupBy', url: 'operators/transformation/groupBy' },

          { name: 'map', url: 'operators/transformation/map' },

          { name: 'mapTo', url: 'operators/transformation/mapTo' },

          { name: 'mergeMap', url: 'operators/transformation/mergeMap' },

          { name: 'mergeMapTo', url: 'operators/transformation/mergeMapTo' },

          { name: 'mergeScan', url: 'operators/transformation/mergeScan' },

          { name: 'pairwise', url: 'operators/transformation/pairwise' },

          { name: 'partition', url: 'operators/transformation/partition' },

          { name: 'pluck', url: 'operators/transformation/pluck' },

          { name: 'scan', url: 'operators/transformation/scan' },

          { name: 'switchMap', url: 'operators/transformation/switchMap' },

          { name: 'switchMapTo', url: 'operators/transformation/switchMapTo' },

          { name: 'window', url: 'operators/transformation/window' },

          { name: 'windowCount', url: 'operators/transformation/windowCount' },

          { name: 'windowTime', url: 'operators/transformation/windowTime' },

          {
            name: 'windowToggle',
            url: 'operators/transformation/windowToggle',
          },

          { name: 'windowWhen', url: 'operators/transformation/windowWhen' },
        ],
      },
      {
        name: 'Utilidad',
        url: 'operators/utility',
        children: [
          { name: 'tap/do', url: 'operators/utility/tap' },

          { name: 'delay', url: 'operators/utility/delay' },

          { name: 'delayWhen', url: 'operators/utility/delayWhen' },

          { name: 'dematerialize', url: 'operators/utility/dematerialize' },

          { name: 'materialize', url: 'operators/utility/materialize' },

          { name: 'observeOn', url: 'operators/utility/observeOn' },

          { name: 'subscribeOn', url: 'operators/utility/subscribeOn' },

          { name: 'timeInterval', url: 'operators/utility/timeInterval' },

          { name: 'timestamp', url: 'operators/utility/timestamp' },

          { name: 'timeout', url: 'operators/utility/timeout' },

          { name: 'timeoutWith', url: 'operators/utility/timeoutWith' },

          { name: 'toArray', url: 'operators/utility/toArray' },
        ],
      },
      {
        name: 'Matemáticos y Agregación',
        url: 'operators/mathematical-aggregate',
        children: [
          { name: 'count', url: 'operators/mathematical-aggregate/count' },

          { name: 'max', url: 'operators/mathematical-aggregate/max' },

          { name: 'min', url: 'operators/mathematical-aggregate/min' },

          { name: 'reduce', url: 'operators/mathematical-aggregate/reduce' },
        ],
      },
    ],
  },
  {
    name: 'Versión 6',
    url: 'version-6',
    children: [
      {
        name: 'Funcionalidades obsoletas',
        url: 'version-6/funcionalidades-obsoletas',
      },
      { name: 'Migración', url: 'version-6/migracion' },
      { name: 'Operadores de tubería', url: 'version-6/operadores-tuberia' },
    ],
  },
  {
    name: 'Código de Conducta',
    url: 'codigo-de-conducta',
  },
];

/**
 * @title Tree with nested nodes
 */
@Component({
  selector: 'rxjs-docs-sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.css'],
})
export class SidenavComponent {
  treeControl = new NestedTreeControl<SectionNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<SectionNode>();

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: SectionNode) =>
    !!node.children && node.children.length > 0;
}
