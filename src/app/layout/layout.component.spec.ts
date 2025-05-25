import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutComponent } from './layout.component';
import { ThemeService } from '../core/services/theme.service';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let themeService: ThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    themeService = TestBed.inject(ThemeService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should apply the initial theme class (dark)', () => {
    const layoutEl: HTMLElement =
      fixture.nativeElement.querySelector('.layout');
    expect(layoutEl.classList).toContain('dark');
  });

  it('should update the class when theme changes', () => {
    themeService.setTheme('light');
    fixture.detectChanges();
    const layoutEl: HTMLElement =
      fixture.nativeElement.querySelector('.layout');
    expect(layoutEl.classList).toContain('light');
    expect(layoutEl.classList).not.toContain('dark');
  });

  it('should toggle the theme when updateTheme is called', () => {
    themeService.updateTheme();
    fixture.detectChanges();
    let layoutEl: HTMLElement = fixture.nativeElement.querySelector('.layout');
    expect(layoutEl.classList).toContain('light');

    themeService.updateTheme();
    fixture.detectChanges();
    layoutEl = fixture.nativeElement.querySelector('.layout');
    expect(layoutEl.classList).toContain('dark');
  });

  it('should render header and footer components', () => {
    const header = fixture.nativeElement.querySelector('app-layout-header');
    const footer = fixture.nativeElement.querySelector('app-layout-footer');
    expect(header).toBeTruthy();
    expect(footer).toBeTruthy();
  });
});
