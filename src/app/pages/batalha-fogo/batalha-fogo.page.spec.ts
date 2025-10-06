import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BatalhaFogoPage } from './batalha-fogo.page';

describe('BatalhaFogoPage', () => {
  let component: BatalhaFogoPage;
  let fixture: ComponentFixture<BatalhaFogoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BatalhaFogoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
