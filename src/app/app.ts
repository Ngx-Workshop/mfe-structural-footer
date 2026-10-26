import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import type { StructuralOverrideMode } from '@tmdjr/ngx-mfe-orchestrator-contracts';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ngx-footer-mfe',
  imports: [AsyncPipe],
  host: { class: 'ngx-design-system', '[attr.data-mode]': 'mode$.value' },
  template: `
    @if (mode$ | async; as mode) {
      @if (mode !== 'disabled') {
        <footer [attr.data-mode]="mode">
          @if (mode === 'full') {
            <a class="brand" href="/">NGX / WORKSHOP</a>
          }
          @if (mode !== 'compact') {
            <span class="tagline">Build. Experiment. Learn.</span>
          }
          <a
            class="repository"
            href="https://github.com/Ngx-Workshop"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span aria-hidden="true">↗</span> Made with
            <span class="heart" aria-label="love">♥</span>
            <span class="screen-reader"> — Ngx Workshop on GitHub (opens in new tab)</span>
          </a>
        </footer>
      }
    }
  `,
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  @Input()
  set role(value: 'admin' | 'publisher' | 'regular' | 'none') {
    this.role$.next(value);
  }
  role$ = new BehaviorSubject<'admin' | 'publisher' | 'regular' | 'none'>('none');

  @Input()
  set mode(value: StructuralOverrideMode) {
    this.mode$.next(value);
  }
  mode$ = new BehaviorSubject<StructuralOverrideMode>('disabled');
}

// 👇 **IMPORTANT FOR DYMANIC LOADING**
export default App;
