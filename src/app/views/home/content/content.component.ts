import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { HighlightService } from 'src/app/shared/services/highlight.service';

@Component({
  selector: 'rxjs-docs-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit {
  page: string;
  defaultPage: string = 'introducción';

  constructor(
    private route: ActivatedRoute,
    private library: FaIconLibrary,
    private highlightService: HighlightService
  ) {
    library.addIcons(faFolder);
  }

  ngOnInit(): void {
    /* this.route.params
      .pipe(map((params) => params?.page || this.defaultPage))
      .subscribe((page) => {
        console.log(page);
        this.page = `assets/${page}.md`;
      }); */

    this.route.url
      .pipe(map((url) => url.map(({ path }) => path).join('/')))
      .subscribe((url) => {
        console.log(url);
        this.page = `assets/doc/${url}.md`;
      });
  }
}
