import { NestedTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Operadores } from '@assets/api.json';
import { SectionNode } from '@shared/interfaces/section-node.interface';

const TREE_DATA: SectionNode[] = [
  {
    name: 'Introducción',
    url: 'introduction',
  },
  {
    name: 'Instalación',
    url: 'installation',
  },
  {
    name: 'Conceptos',
    url: 'concepts',
    children: [
      { name: 'Observables', url: 'concepts/observables' },

      { name: 'Observador', url: 'concepts/observer' },

      { name: 'Operadores', url: 'concepts/operators' },

      { name: 'Planificadores', url: 'concepts/schedulers' },

      { name: 'Sujetos', url: 'concepts/subjects' },

      { name: 'Suscripción', url: 'concepts/subscription' },

      {
        name: 'Testing',
        url: 'concepts/testing',
        children: [
          {
            name: 'Tests de Canicas',
            url: 'concepts/testing/marble-testing',
          },

          {
            name: 'Contribuir tests a RxJS',
            url: 'concepts/testing/contribute-tests-to-rxjs',
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
        children: [...Object.values(Operadores.Combinación)],
      },
      {
        name: 'Condicionales',
        url: 'operators/conditional',
        children: [...Object.values(Operadores.Condicionales)],
      },
      {
        name: 'Creación',
        url: 'operators/creation',
        children: [...Object.values(Operadores.Creación)],
      },
      {
        name: 'Filtración',
        url: 'operators/filtering',
        children: [...Object.values(Operadores.Filtración)],
      },
      {
        name: 'Gestión de Errores',
        url: 'operators/error-handling',
        children: [...Object.values(Operadores['Gestión de Errores'])],
      },
      {
        name: 'Multidifusión',
        url: 'operators/multicasting',
        children: [...Object.values(Operadores.Multidifusión)],
      },
      {
        name: 'Transformación',
        url: 'operators/transformation',
        children: [...Object.values(Operadores.Transformación)],
      },
      {
        name: 'Utilidad',
        url: 'operators/utility',
        children: [...Object.values(Operadores.Utilidad)],
      },
      {
        name: 'Matemáticos y Agregación',
        url: 'operators/mathematical-aggregate',
        children: [...Object.values(Operadores['Matemáticos y Agregación'])],
      },
    ],
  },
  {
    name: 'Versión 6',
    url: 'version-6',
    children: [
      {
        name: 'Funcionalidades obsoletas',
        url: 'version-6/deprecations',
      },
      { name: 'Migración', url: 'version-6/migration' },
      { name: 'Operadores de tubería', url: 'version-6/pipeable-operators' },
    ],
  },
  { name: 'API', url: 'api' },
  {
    name: 'Código de Conducta',
    url: 'code-of-conduct',
  },
  {
    name: 'Equipo',
    url: 'team',
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
