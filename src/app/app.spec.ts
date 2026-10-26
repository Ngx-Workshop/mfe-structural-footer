import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('Structural footer', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });
  it('renders distinct full, relaxed and compact content and no disabled chrome', async () => {
    const fixture = TestBed.createComponent(App);
    for (const mode of ['full', 'relaxed', 'compact', 'disabled']) {
      fixture.componentRef.setInput('mode', mode);
      fixture.detectChanges();
      await fixture.whenStable();
      const el = fixture.nativeElement as HTMLElement;
      expect(!!el.querySelector('footer')).toBe(mode !== 'disabled');
      expect(!!el.querySelector('.brand')).toBe(mode === 'full');
      expect(!!el.querySelector('.tagline')).toBe(mode === 'full' || mode === 'relaxed');
      if (mode !== 'disabled') {
        expect(el.querySelector('.repository')?.getAttribute('rel')).toContain('noopener');
      }
    }
  });
});
