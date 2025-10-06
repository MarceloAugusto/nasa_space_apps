import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  standalone: true, // garanta que esteja standalone
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent],
})
export class HomePage {
  constructor(private router: Router) {}
  goPerfil(){ this.router.navigateByUrl('/perfil'); }

}
