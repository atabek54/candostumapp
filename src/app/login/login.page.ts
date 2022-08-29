import { AppComponent } from './../app.component';
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable max-len */
/* eslint-disable no-var */
/* eslint-disable space-before-function-paren */
/* eslint-disable eqeqeq */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials1: FormGroup;
  credentials2: FormGroup;
  public isLogin : boolean=true;
  public iller: any='';
  public konum: string;
  public eposta: any;
  user=null;

  constructor( private fb: FormBuilder,
    private http: HttpClient,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private service:AppComponent

    ) {
http.get(this.service.illeri_getir).subscribe(data=>{
  this.iller=data;
});
     }
  get email() {
    return this.credentials1.get('email');
  }

  get sifre() {
    return this.credentials1.get('sifre');
  }

  get ad_soyad() {
    return this.credentials2.get('ad_soyad');
  }

  get  telefon() {
    return this.credentials2.get('telefon');
  }

  async presentToast(message, color) {
    const toast = await this.toastCtrl.create({
      message: message,
      color: color,
      duration:2000,
    });
    toast.present();
    this.loadingCtrl.dismiss();
  }
  ngOnInit() {


    const user = JSON.parse(localStorage.getItem('user'));
if(user){
  if(user.verification =='false'){
    this.navCtrl.navigateRoot('verification');

  }
  else if(user.verification=='true'){
    this.navCtrl.navigateRoot('tabs/tab1');
  }
}



    this.credentials1 = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      sifre: ['', [Validators.required, Validators.minLength(6)]],

    });

    this.credentials2=this.fb.group({
      ad_soyad:['',[Validators.required,Validators.minLength(4)]],
      telefon:['',[Validators.required,Validators.minLength(11)]]
    });
  }

  atla(){
    this.navCtrl.navigateRoot('tabs/tab1');
  }
  async sign() {

    if (this.isLogin == true) {
      this.http
        .get(
         this.service.kullanici_giris +
          this.credentials1.value.email +
            '&sifre=' +
            this.credentials1.value.sifre
        )
        .subscribe(async(data) => {
          const loading = await this.loadingCtrl.create();
          loading.present();
          const user = data;
          this.loadingCtrl.dismiss();
          if (user) {
            this.presentToast('Giriş başarılı.','success');
            loading.dismiss();
            localStorage.setItem('user', JSON.stringify(user));


            const userVerified = JSON.parse(localStorage.getItem('user'));

            if(userVerified.verification=='false'){
              this.navCtrl.navigateRoot('verification');

            }
            else if(userVerified.verification=='true'){
              this.navCtrl.navigateRoot('tabs/tab1');
            }

          } else {
            this.presentToast('Kullanıcı bilgileri yanlış.', 'danger');
            this.loadingCtrl.dismiss();
          }

        });
    } else if (this.isLogin == false) {
      this.http
        .get(
          this.service.kullanici_kayit +
          this.credentials1.value.email +
            '&sifre=' +
            this.credentials1.value.sifre +
            '&ad_soyad=' +
            this.credentials2.value.ad_soyad +
            '&telefon=' +
            this.credentials2.value.telefon+
            '&konum='+this.konum,
        )
        .subscribe(async(data) => {

          const loading = await this.loadingCtrl.create();
          loading.present();
          const user = data;
          if (user) {
            this.presentToast('Kayıt başarılı.','success');
            loading.dismiss();
            localStorage.setItem('user', JSON.stringify(user));


            const userVerified = JSON.parse(localStorage.getItem('user'));

            if(userVerified.verification=='false'){
              this.navCtrl.navigateRoot('verification');

            }
            else if(userVerified.verification=='true'){
              this.navCtrl.navigateRoot('tabs/tab1');
            }

          } else {

            this.loadingCtrl.dismiss();
            this.presentToast('Kullanıcı zaten kayıtlı! Giriş yap.', 'danger');
          }
        });
    }
  }
changeSign(){
  this.isLogin=!this.isLogin;

}
modalDismiss(){
  this.modalCtrl.dismiss();
}

sendNewPasswordEmail(){
  var randomstring = Math.random().toString(36).slice(-8);
  this.http.get(this.service.kullanici_getir+this.eposta).subscribe(data=>{
    if(data){
      this.http.get(this.service.sifre_sifirla+this.eposta+'&password='+randomstring).subscribe(data=>{



      });
      this.eposta=undefined;
      this.presentToast('Şifreniz eposta kutunuza gönderilmiştir','success');
      this.modalDismiss();

    }
    else{
      this.presentToast('Kullanıcı kayıtlı değil.','danger');
    }
  });

}

}
