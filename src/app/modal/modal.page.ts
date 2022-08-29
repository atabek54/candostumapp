import { AppComponent } from './../app.component';
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
public iller:any;
public ad_soyad:string;
public telefon:string;
public konum:string;
  @Input() user: any;
  constructor(private activatedRoute: ActivatedRoute,private modalCtrl:ModalController,private http:HttpClient,private navCtrl:NavController,private service:AppComponent) {
    http.get(this.service.illeri_getir).subscribe(data=>{
      this.iller=data;

    });
   }

  ngOnInit() {



  }
closeModal(){
  this.modalCtrl.dismiss();
}

guncelle(){
  this.http.get(this.service.kullanici_bilgi_guncelle+this.ad_soyad+'&telefon='+this.telefon+'&konum='+this.konum+'&user_id='+this.user.id).subscribe(data=>{

    localStorage.setItem('user', JSON.stringify(data));
    this.modalCtrl.dismiss();
   this.navCtrl.back();
  });
}
}
