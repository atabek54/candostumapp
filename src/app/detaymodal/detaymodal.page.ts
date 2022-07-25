import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { LoadingController, ModalController,  } from '@ionic/angular';

@Component({
  selector: 'app-detaymodal',
  templateUrl: './detaymodal.page.html',
  styleUrls: ['./detaymodal.page.scss'],
})
export class DetaymodalPage implements OnInit {

  public telefon:any;
  public user:any=''
public ilan:any='';
@Input() id: string;
  constructor(private http:HttpClient,private modalCtrl:ModalController,private call:CallNumber,private loading:LoadingController) {
    this.user=JSON.parse(localStorage.getItem('user'));

    this.detayGetir();
   }
   kullaniciTelefonGetir(){
    this.http.get('https://webservis.online/candostum.php?servis_adi=kullanici_numara_getir&user_id='+this.user.id).subscribe(data=>{
  this.telefon=data;

    });
  }
   callNumber(){
    this.call.callNumber(this.telefon, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));    }


  async detayGetir(){
    const loading=await this.loading.create();
    loading.present();

    this.http.get('https://webservis.online/candostum.php?servis_adi=ilan_detayi_getir&ilanUid='+this.id).subscribe(data=>{
      this.ilan=data;

    });
    loading.dismiss();
   }
  ngOnInit() {

this.detayGetir();


 }
back(){
this.modalCtrl.dismiss();
}


}
