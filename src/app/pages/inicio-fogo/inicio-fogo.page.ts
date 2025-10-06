import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-fogo',
  templateUrl: './inicio-fogo.page.html',
  styleUrls: ['./inicio-fogo.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class InicioFogoPage implements OnInit {

  private router = inject(Router);

  constructor() { }

  ngOnInit() {
  }

  onWater(){ /* abre painel de irrigação / SMAP */ }
  onSun(){ /* LST / previsão */ }
  onAction(){ /* comando / tarefa */ }
  onNetwork(){ /* integração / fluxo */ }

  loadSeca(){
    this.router.navigateByUrl('/batalha-seca');
  }

  goToSeca() {
    this.router.navigateByUrl('/batalha-seca');
  }

  proximo() {
    this.router.navigateByUrl('http://www.google.com.br');
  }
}
