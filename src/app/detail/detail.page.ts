import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { LoadingController, ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  public ilanUid:string;
public ilan:any='';
public telefon:any;
public user:any='';

  constructor(private http:HttpClient,private activatedRoute: ActivatedRoute,private navCtrl:NavController,private call:CallNumber,private loading:LoadingController) {
    this.ilanUid = this.activatedRoute.snapshot.paramMap.get('id');
    this.user=JSON.parse(localStorage.getItem('user'));


   }
kullaniciTelefonGetir(){
  this.http.get('https://webservis.online/candostum.php?servis_adi=kullanici_numara_getir&user_id='+this.user.id).subscribe(data=>{
this.telefon=data;

  });
}
async detayGetir(){
  const loading=await this.loading.create();
  loading.present();

  this.http.get('https://webservis.online/candostum.php?servis_adi=ilan_detayi_getir&ilanUid='+this.ilanUid).subscribe(data=>{
    this.ilan=data;

  });
  loading.dismiss();
 }
  ngOnInit() {
    this.detayGetir();
    this.kullaniciTelefonGetir();


 }
back(){
this.navCtrl.back()
}

callNumber(){
  console.log(this.telefon.telefon);
  this.call.callNumber(this.telefon.telefon, true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));    }

}
