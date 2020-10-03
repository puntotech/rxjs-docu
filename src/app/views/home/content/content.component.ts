import {
  Component,
  AfterViewInit,
  HostListener,
  AfterContentInit,
  AfterContentChecked,
} from '@angular/core';
import { HighlightService } from 'src/app/shared/services/highlight.service';

@Component({
  selector: 'rxjs-docs-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements AfterContentChecked {
  currentSection = '';
  sections = [];

  constructor(private highlightService: HighlightService) {}

  ngAfterContentChecked(): void {
    this.highlightService.highlightAll();
    this.loadSections();
  }

  scrollTo(sectionId) {
    document.querySelector('#' + sectionId).scrollIntoView();
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
