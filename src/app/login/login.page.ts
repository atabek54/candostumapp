import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators,FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials1: FormGroup;
  credentials2: FormGroup;
  public isLogin:boolean=true;
  public iller:any='';
  public konum:string;
  public eposta:any;
  user=null;

  constructor( private fb: FormBuilder,
    private http: HttpClient,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private modalCtrl:ModalController,

    ) {
http.get('https://webservis.online/candostum.php?servis_adi=illeri_getir').subscribe(data=>{
  this.iller=data;
  console.log(this.iller);
})
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
    window.location.reload();

    const user = JSON.parse(localStorage.getItem('user'));
if(user){
  if(user.verification=='false'){
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
    })
  }
  async sign() {

    if (this.isLogin == true) {
      this.http
        .get(
          'https://webservis.online/candostum.php?servis_adi=kullanici_giris&email=' +
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
            console.log(JSON.parse(localStorage.getItem('user')));

            const userVerified = JSON.parse(localStorage.getItem('user'));
            console.log(userVerified.verification);
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
          'https://webservis.online/candostum.php?servis_adi=kullanici_kayit&email=' +
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
          console.log(data);
          const loading = await this.loadingCtrl.create();
          loading.present();
          const user = data;
          if (user) {
            this.presentToast('Kayıt başarılı.','success');
            loading.dismiss();
            localStorage.setItem('user', JSON.stringify(user));
            console.log(JSON.parse(localStorage.getItem('user')));

            const userVerified = JSON.parse(localStorage.getItem('user'));
            console.log(userVerified.verification);
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
  this.isLogin=!this.isLogin
}
modalDismiss(){
  this.modalCtrl.dismiss();
}

sendNewPasswordEmail(){
  var randomstring = Math.random().toString(36).slice(-8);
  console.log(randomstring);
  this.http.get('https://webservis.online/candostum.php?servis_adi=kullanici_getir&email='+this.eposta).subscribe(data=>{
    if(data){
      this.http.get('https://webservis.online/candostum.php?servis_adi=sifre_sifirla&email='+this.eposta+'&password='+randomstring).subscribe(data=>{



      });
      this.eposta=undefined;
      this.presentToast('Şifreniz eposta kutunuza gönderilmiştir','success');
      this.modalDismiss();

    }
    else{
      this.presentToast('Kullanıcı kayıtlı değil.','danger');
    }
  })

}

}
