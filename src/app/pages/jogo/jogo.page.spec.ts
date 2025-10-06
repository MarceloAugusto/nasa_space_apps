import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JogoPage } from './jogo.page';

describe('JogoPage', () => {
  let component: JogoPage;
  let fixture: ComponentFixture<JogoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JogoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
