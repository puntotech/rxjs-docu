import { Injectable } from '@angular/core';
import { ContributorGroup, Contributor } from './contributors.model';
import { ConnectableObservable, Observable } from 'rxjs';
import { publishLast, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContributorService {
  contributors: Observable<ContributorGroup[]>;
  private constributorsPath = 'assets/contributors.json';
  private knownGroups = ['Core Team', 'Core Team ESP'];

  constructor(private http: HttpClient) {
    this.contributors = this.getContributors();
  }

  private getContributors() {
    const contributors = this.http
      .get<{ [key: string]: Contributor }>(this.constributorsPath)
      .pipe(
        // Create group map
        map((contribs) => {
          const contribMap: { [name: string]: Contributor[] } = {};
          Object.keys(contribs).forEach((key) => {
            const contributor = contribs[key];
            const group = contributor.group;
            const contribGroup = contribMap[group];
            if (contribGroup) {
              contribGroup.push(contributor);
            } else {
              contribMap[group] = [contributor];
            }
          });

          return contribMap;
        }),

        // Flatten group map into sorted group array of sorted contributors
        map((cmap) => {
          return Object.keys(cmap).map((key) => {
            const order = this.knownGroups.indexOf(key);
            return {
              name: key,
              order: order === -1 ? this.knownGroups.length : order,
              contributors: cmap[key].sort(compareContributors),
            } as ContributorGroup;
          });
        }),

        publishLast()
      );

    (contributors as ConnectableObservable<ContributorGroup[]>).connect();
    return contributors;
  }
}

function compareContributors(l: Contributor, r: Contributor) {
  return 1;
}

function compareGroups(l: ContributorGroup, r: ContributorGroup) {
  return l.order === r.order
    ? l.name > r.name
      ? 1
      : -1
    : l.order > r.order
    ? 1
    : -1;
}
