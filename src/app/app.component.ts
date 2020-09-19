import { Component } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { HighlightService } from './shared/services/highlight.service';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'rxjs-docs';

  constructor(
    private library: FaIconLibrary,
    private highlightService: HighlightService
  ) {
    library.addIcons(faFolder);
  }
}
