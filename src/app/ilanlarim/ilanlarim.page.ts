import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { DetaymodalPage } from '../detaymodal/detaymodal.page';

@Component({
  selector: 'app-ilanlarim',
  templateUrl: './ilanlarim.page.html',
  styleUrls: ['./ilanlarim.page.scss'],
})
export class IlanlarimPage implements OnInit {
public user:any;
public kullaniciIlanlari:any;
  constructor(private http:HttpClient,private modalCtrl:ModalController,private alertCtrl: AlertController,private navCtrl:NavController, private loadingCtrl:LoadingController
    ) {
    this.user = JSON.parse(localStorage.getItem('user'));
    if(this.user)
    this.kullaniciIlanlariGetir();
  }

  ngOnInit() {



  }
async  kullaniciIlanlariGetir() {
  const loading=await this.loadingCtrl.create();
  loading.present();
    this.http
      .get(
        'https://webservis.online/candostum.php?servis_adi=kullanicinin_ilanlarini_getir&user_id=' +
          this.user.id
      )
      .subscribe((data) => {

        this.kullaniciIlanlari = data;
        loading.dismiss();
        console.log(this.kullaniciIlanlari)
      });
  }
  dismissModal(){
    this.modalCtrl.dismiss();
  }
  async deleteAdvert(ilanUid) {

    const alert = await this.alertCtrl.create({
      header: 'Silmek istediğine emin misin?',
      buttons: [
        { text: 'İptal', handler: () => {}, role: 'cancel' },
        {
          text: 'Evet',
          handler:async () => {
            const loading=await this.loadingCtrl.create();
  loading.present();
            this.http
              .get(
                'https://webservis.online/candostum.php?servis_adi=ilani_sil&ilanUid=' +
                  ilanUid
              )
              .subscribe((data) => {

                this.modalCtrl.dismiss();
                this.navCtrl.navigateRoot('tabs/tab1');
              });
              loading.dismiss();

          },
        },
      ],
    });

    alert.present();
  }
  async openDetayModal(id){


    const modal=await this.modalCtrl.create({
      component:DetaymodalPage,
      componentProps:{id:id},

    });
    modal.present();
  }
}

