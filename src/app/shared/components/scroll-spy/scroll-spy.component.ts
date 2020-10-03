import {
  Component,
  AfterContentChecked,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';
import { debounce, throttle, debounceTime } from 'rxjs/operators';
import { ScrollDispatcher, CdkScrollable } from '@angular/cdk/overlay';
import { interval } from 'rxjs';

@Component({
  selector: 'rxjs-scroll-spy',
  templateUrl: './scroll-spy.component.html',
  styleUrls: ['./scroll-spy.component.css'],
})
export class ScrollSpyComponent implements AfterContentChecked, OnInit {
  currentSection = '';
  sections = [];
  private sectionsHeader: NodeListOf<HTMLHeadingElement>;

  constructor(
    private scroll: ScrollDispatcher,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.scroll
      .scrolled()
      .pipe(throttle((ev) => interval(100)))
      .subscribe((scroll: CdkScrollable) => this.onScroll(scroll));
  }

  ngAfterContentChecked(): void {
    this.loadSections();
  }

  scrollTo(sectionId) {
    document.querySelector('#' + sectionId).scrollIntoView();
  }

  isActualSection(sectionId: string) {
    return sectionId === this.currentSection;
  }

  private loadSections() {
    this.sectionsHeader = document.querySelectorAll('h2');
    this.sections = [];
    this.sectionsHeader.forEach((header: HTMLHeadingElement) => {
      this.sections.push({
        name: header.textContent,
        id: header.id,
      });
    });
  }

  private onScroll(scroll: CdkScrollable) {
    const scrollTop = scroll.getElementRef().nativeElement.scrollTop || 0;
    const parentOffset = scroll.getElementRef().nativeElement.offsetTop;
    const currentSection = this.getCurrentSection({ scrollTop, parentOffset });

    if (!currentSection || currentSection.id === this.currentSection) {
      return;
    }

    this.currentSection = currentSection.id;
    this.changeDetector.detectChanges();
  }

  private getCurrentSection({ scrollTop, parentOffset }) {
    const sectionsCount = this.sectionsHeader.length;
    let actualHeader;
    for (let i = 0; i < sectionsCount; i++) {
      const header = this.sectionsHeader[i];
      if (header.offsetTop - parentOffset <= scrollTop) {
        actualHeader = header;
      }
    }

    return actualHeader;

    /* For some reason, this (and similar) DONT work. Only get first element
     return [].find.call(
      this.sectionsHeader,
      (header: HTMLHeadingElement) =>
        header.offsetTop - parentOffset <= scrollTop
    ); */
  }
}
