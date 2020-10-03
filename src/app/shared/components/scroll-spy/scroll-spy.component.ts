import { Component, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'rxjs-scroll-spy',
  templateUrl: './scroll-spy.component.html',
  styleUrls: ['./scroll-spy.component.css'],
})
export class ScrollSpyComponent implements AfterContentChecked {
  currentSection = '';
  sections = [];

  constructor() {}

  scrollTo(sectionId) {
    document.querySelector('#' + sectionId).scrollIntoView();
  }

  ngAfterContentChecked(): void {
    this.loadSections();
  }

  private loadSections() {
    const sectionsDivs = document.querySelectorAll('h2');
    this.sections = [];
    [].forEach.call(sectionsDivs, (div: HTMLDivElement) => {
      this.sections.push({
        name: div.textContent,
        id: div.id,
      });
    });
  }
}
