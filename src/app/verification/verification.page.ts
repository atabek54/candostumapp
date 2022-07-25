import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss'],
})
export class VerificationPage implements OnInit {
  public verificationCode: any;
  public code: any;
  public user:any;
  constructor(
    private http: HttpClient,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private loadingCtrl:LoadingController
  ) {}

  sendVerificationCode() {
    this.verificationCode = Math.floor(
      Math.random() * (999999 - 100000) + 100000
    );
    this.presentToast('Doğrulama kodu gönderildi', 'success');
    this.http
      .get(
        'https://webservis.online/candostum.php?servis_adi=dogrulama_kodu_gonder&email='+this.user.email+'&code=' +
          this.verificationCode
      )
      .subscribe((data) => {});
  }

async  verifyCode() {

    if (this.verificationCode == this.code) {
      const loading= await this.loadingCtrl.create();
      loading.present();
      this.http.get('https://webservis.online/candostum.php?servis_adi=hesabi_dogrula&user_id='+this.user.id).subscribe(data=>{
        this.user=data;
        localStorage.setItem('user', JSON.stringify(this.user));
      })
      loading.dismiss();
      this.navCtrl.navigateRoot('tabs/tab1');
    }
    else{
      this.presentToast('Dogrulama kodu yanlış yada süresi geçmiş','danger');
    }
  }
  async presentToast(message, color) {
    const toast = await this.toastCtrl.create({
      message: message,
      color: color,
      duration: 2000,
    });
    toast.present();

  }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('user'));
    this.sendVerificationCode();
  }
 async signOut(){
    const loading= await this.loadingCtrl.create();
      loading.present();
    localStorage.removeItem('user');
    loading.dismiss();
    this.navCtrl.navigateRoot('login')
  }


}
