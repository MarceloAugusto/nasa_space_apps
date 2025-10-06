import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.page.html',
  styleUrls: ['./loading.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule]
})
export class LoadingPage implements OnInit {

  private router = inject(Router);

  constructor() { }


  ngOnInit() {
  }

  goStart() {
     this.router.navigateByUrl('/home');
  }

  seca() {
     this.router.navigateByUrl('/inicio-fogo');
  }

}
