import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { FilterPage } from '../filter/filter.page';
import { FilteradvertPage } from '../filteradvert/filteradvert.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public enYeniIlanlar:any;
  public tumIlanlar:any;
  public yakinIlanlar:any;
 public user:any;

  constructor(



    private modalCtrl:ModalController,private navCtrl:NavController,private http:HttpClient,private activatedRoute: ActivatedRoute) {




    this.user = JSON.parse(localStorage.getItem('user'));

    this.yeniIlanlariGetir();
    this.tumIlanlariGetir();

  }
  doRefresh(event) {


    setTimeout(() => {
      this.yeniIlanlariGetir();
    this.tumIlanlariGetir();
      event.target.complete();
    }, 2000);
  }

  ngOnInit() {
  }
  tumIlanlariGetir(){

    this.http.get('https://webservis.online/candostum.php?servis_adi=tum_ilanlari_getir').subscribe(data=>{
      this.tumIlanlar=data;
    })
  }

  yeniIlanlariGetir(){
    this.http.get('https://webservis.online/candostum.php?servis_adi=en_yeni_ilanlari_getir').subscribe(data=>{
this.enYeniIlanlar=data;
this.enYeniIlanlar=this.enYeniIlanlar.slice(0,15);


    })
  }





  async openFilterModal(ilan){
    const modal=await this.modalCtrl.create({
      component:FilterPage,
      componentProps:{ilan:ilan}


    });
    modal.present();
  }
  async openAdvertModal(ilan){
    const modal=await this.modalCtrl.create({
      component:FilteradvertPage,
componentProps:{ilan:ilan},
backdropDismiss:true


    });
    modal.present();
  }
}
