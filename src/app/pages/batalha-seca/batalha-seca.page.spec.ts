import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BatalhaSecaPage } from './batalha-seca.page';

describe('BatalhaSecaPage', () => {
  let component: BatalhaSecaPage;
  let fixture: ComponentFixture<BatalhaSecaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BatalhaSecaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
