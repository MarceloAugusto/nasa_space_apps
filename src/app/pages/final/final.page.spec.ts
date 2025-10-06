import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinalPage } from './final.page';

describe('FinalPage', () => {
  let component: FinalPage;
  let fixture: ComponentFixture<FinalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
