import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {

  LoadingController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { IlanlarimPage } from '../ilanlarim/ilanlarim.page';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  public kullaniciIlanlari: any = '';

  public user: any = '';
  constructor(
    private modalCtrl: ModalController,
    private http: HttpClient,
    private navCtrl: NavController,
    private loadingCtrl:LoadingController

  ) {
    this.user = JSON.parse(localStorage.getItem('user'));

    if (!this.user) {
      this.navCtrl.navigateRoot('login');
    }
    this.kullaniciIlanlariGetir();
  }
  ngOnInit(): void {
    this.kullaniciIlanlariGetir();
  }

  kullaniciIlanlariGetir() {
    this.http
      .get(
        'https://webservis.online/candostum.php?servis_adi=kullanicinin_ilanlarini_getir&user_id=' +
          this.user.id
      )
      .subscribe((data) => {
        this.kullaniciIlanlari = data;
      });
  }
  async openUserModal() {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: { user: this.user },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.7,
    });
    modal.present();
  }
  async openilanlarimModal() {
    const modal = await this.modalCtrl.create({
      component: IlanlarimPage,

      breakpoints: [0, 0.5, 0.8],

    });
    modal.present();
  }

async  signOut() {
    const loading= await this.loadingCtrl.create();
    loading.present();
    localStorage.removeItem('user');
    loading.dismiss();
    this.navCtrl.navigateRoot('login');

  }


}
