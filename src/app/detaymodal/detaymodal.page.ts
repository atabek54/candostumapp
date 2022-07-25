import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { ModalController, NavController } from '@ionic/angular';

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
  constructor(private http:HttpClient,private modalCtrl:ModalController,private call:CallNumber) {
    this.user=JSON.parse(localStorage.getItem('user'));
    this.detayGetir();
   }
   kullaniciTelefonGetir(){
    this.http.get('https://webservis.online/candostum.php?servis_adi=kullanici_numara_getir&user_id='+this.user.id).subscribe(data=>{
  this.telefon=data;

    });
  }
   callNumber(){
    this.call.callNumber(this.telefon,true);
    }

   detayGetir(){
    this.http.get('https://webservis.online/candostum.php?servis_adi=ilan_detayi_getir&ilanUid='+this.id).subscribe(data=>{
      this.ilan=data;

    })
   }
  ngOnInit() {

this.detayGetir();


 }
back(){
this.modalCtrl.dismiss();
}


}
