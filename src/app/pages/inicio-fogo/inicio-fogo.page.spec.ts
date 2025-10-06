import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InicioFogoPage } from './inicio-fogo.page';

describe('InicioFogoPage', () => {
  let component: InicioFogoPage;
  let fixture: ComponentFixture<InicioFogoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioFogoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
