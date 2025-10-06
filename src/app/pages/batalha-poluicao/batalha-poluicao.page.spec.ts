import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BatalhaPoluicaoPage } from './batalha-poluicao.page';

describe('BatalhaPoluicaoPage', () => {
  let component: BatalhaPoluicaoPage;
  let fixture: ComponentFixture<BatalhaPoluicaoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BatalhaPoluicaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
