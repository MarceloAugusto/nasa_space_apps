import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BatalhaAtmosfericaPage } from './batalha-atmosferica.page';

describe('BatalhaAtmosfericaPage', () => {
  let component: BatalhaAtmosfericaPage;
  let fixture: ComponentFixture<BatalhaAtmosfericaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BatalhaAtmosfericaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
