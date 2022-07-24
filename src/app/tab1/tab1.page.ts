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

  public populerIlanlar:any;
  public tumIlanlar:any;
  public yakinIlanlar:any;
 public user:any;
  constructor(



    private modalCtrl:ModalController,private navCtrl:NavController,private http:HttpClient,private activatedRoute: ActivatedRoute) {




    this.user = JSON.parse(localStorage.getItem('user'));
    if(!this.user){
      this.navCtrl.navigateRoot('login');
    }
    console.log(this.user);
    this.populerIlanlariGetir();
    this.tumIlanlariGetir();
this.yakindakiIlanlariGetir();

  }


  ngOnInit() {



  }
  tumIlanlariGetir(){
    this.http.get('https://webservis.online/candostum.php?servis_adi=tum_ilanlari_getir').subscribe(data=>{
      this.tumIlanlar=data;
    })
  }

  populerIlanlariGetir(){
    this.http.get('https://webservis.online/candostum.php?servis_adi=populer_ilanlari_getir').subscribe(data=>{
this.populerIlanlar=data;
this.populerIlanlar=this.populerIlanlar.slice(0,15);


    })
  }

  yakindakiIlanlariGetir(){
    this.http.get('https://webservis.online/candostum.php?servis_adi=yakindaki_ilanlari_getir&konum='+this.user.konum).subscribe(data=>{
      this.yakinIlanlar=data;
      this.yakinIlanlar=this.yakinIlanlar.slice(0,20)
      console.log(this.yakinIlanlar);
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
