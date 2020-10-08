import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollSpyComponent } from './scroll-spy.component';

describe('ScrollSpyComponent', () => {
  let component: ScrollSpyComponent;
  let fixture: ComponentFixture<ScrollSpyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollSpyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollSpyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
