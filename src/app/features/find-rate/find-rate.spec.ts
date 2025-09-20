import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindRate } from './find-rate';

describe('FindRate', () => {
  let component: FindRate;
  let fixture: ComponentFixture<FindRate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindRate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindRate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
