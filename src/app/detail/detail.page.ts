import { AppComponent } from './../app.component';
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
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

  constructor(private http:HttpClient,private activatedRoute: ActivatedRoute,private navCtrl:NavController,private call:CallNumber,private loading:LoadingController,private service: AppComponent) {
    this.ilanUid = this.activatedRoute.snapshot.paramMap.get('id');
    this.user=JSON.parse(localStorage.getItem('user'));


   }

async detayGetir(){
  const loading=await this.loading.create();
  loading.present();

  this.http.get(this.service.ilan_detay_getir+this.ilanUid).subscribe(data=>{
    this.ilan=data;

  });
  loading.dismiss();
 }
  ngOnInit() {
    this.detayGetir();



 }
back(){
this.navCtrl.back();
}

callNumber(){
  this.call.callNumber(this.ilan.telefon, true)
  .then(res => {})
  .catch(err => {});    }

}
