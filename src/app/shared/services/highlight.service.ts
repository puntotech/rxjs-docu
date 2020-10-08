import { Injectable, Inject } from '@angular/core';

import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { highlightAll } from 'prismjs';

import 'clipboard';
import 'prismjs';
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-typescript';

@Injectable({ providedIn: 'root' })
export class HighlightService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  highlight() {
    if (isPlatformBrowser(this.platformId)) {
      highlightAll();
    }
  }
}
