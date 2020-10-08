import { Component, AfterViewChecked } from '@angular/core';
import { HighlightService } from 'src/app/shared/services/highlight.service';

@Component({
  selector: 'rxjs-docs-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements AfterViewChecked {
  constructor(private highlightService: HighlightService) {}

  ngAfterViewChecked(): void {
    this.highlightService.highlight();
  }
}
