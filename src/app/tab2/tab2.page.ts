import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { LoadingController, NavController } from '@ionic/angular';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadString,
} from '@angular/fire/storage';
import * as moment from 'moment';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  public kategoriler: any;
  public turler: any;
  public iller: any = '';
  public image = null;
  public imageUrl: string;
  public user: any;
  public ilanTuru: string;
  public ilan_tarihi: string;
  public ilan_sahibi_id: any;
  public kategori: any;
  public tur: any;
  public cinsiyet: any;
  public yas: any;
  public konum: any;
  public aciklama: any;
  public ilanUid: number;
  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private storage: Storage,
 private loadingCtrl:LoadingController
  ) {

    this.user = JSON.parse(localStorage.getItem('user'));

    if(!this.user){
      this.navCtrl.navigateRoot('login');
    }
    this.kategoriGetir();
    this.illeriGetir();
  }
  ngOnInit() {


  }
  turleriGetir() {
    this.http
      .get(
        'https://webservis.online/candostum.php?servis_adi=tur_getir&kategori=' +
          this.kategori
      )
      .subscribe((data) => {
        this.turler = data;

      });
  }

  ilanUidUret() {
    this.ilanUid = Math.floor(Math.random() * (9999999 - 100000) + 100000);
  }

 async ekle() {

    this.http
      .get(
        'https://webservis.online/candostum.php?servis_adi=ilan_ekle&ilan_turu=' +
          this.ilanTuru +
          '&kategori=' +
          this.kategori +
          '&tur=' +
          this.tur +
          '&konum=' +
          this.konum +
          '&cinsiyet=' +
          this.cinsiyet +
          '&ilan_tarihi=' +
          this.ilan_tarihi +
          '&aciklama=' +
          this.aciklama +
          '&yas=' +
          this.yas +
          '&ilan_sahibi_id=' +
          this.user.id +
          '&gorulme=1&ilanUid=' +
          this.ilanUid +
          '&resim_url=' +
          this.imageUrl
      )
      .subscribe((data) => {



      });

  }

  async ilanEkle() {
    const loading=await this.loadingCtrl.create();
    loading.present();

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    this.ilan_tarihi = today.toLocaleDateString();
    this.user = JSON.parse(localStorage.getItem('user'));
    let formattedDate = (moment(today)).format('DD-MM-YYYY');
    this.ilan_tarihi=formattedDate;
    if (this.image) {

      this.ilanUidUret();
      const path = `${this.ilanUid}`;
      const storageRef = ref(this.storage, path);
      try {
        await uploadString(storageRef, this.image.base64String, 'base64');

        this.imageUrl = await getDownloadURL(storageRef);

        if (this.imageUrl) {

          let sayac = 1;

          for (let index = 0; index < sayac; index++) {
            this.http
              .get(
                'https://webservis.online/candostum.php?servis_adi=ilanUid_kontrolu&ilanUid=' +
                  this.ilanUid
              )
              .subscribe((data) => {
                if (data == false) {
                  this.ekle();
loading.dismiss();
this.ilanTuru=undefined;
this.kategori=undefined;
this.tur=undefined;
this.cinsiyet=undefined;
this.yas=undefined;
this.konum=undefined;
this.image=undefined;
this.aciklama=undefined;

                   this.navCtrl.navigateRoot('tabs/tab1');
                } else if (data != false) {
                  this.ilanUidUret();
                  this.http
                    .get(
                      'https://webservis.online/candostum.php?servis_adi=ilanUid_kontrolu&ilanUid=' +
                        this.ilanUid
                    )
                    .subscribe((data) => {
                      if (data == false) {
                        this.ekle();
                      } else {
                        sayac += 1;
                      }
                    });
                }
              });
          }
        }
        return true;
      } catch (e) {
        return null;
      }
    }
  }
  kategoriGetir() {
    this.http
      .get('https://webservis.online/candostum.php?servis_adi=kategori_getir')
      .subscribe((data) => {
        this.kategoriler = data;
      });
  }
  illeriGetir() {
    this.http
      .get('https://webservis.online/candostum.php?servis_adi=illeri_getir')
      .subscribe((data) => {
        this.iller = data;

      });
  }

  async captureImage() {
    this.image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Prompt,
    });

  }
}
