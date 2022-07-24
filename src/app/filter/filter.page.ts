import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FilteradvertPage } from '../filteradvert/filteradvert.page';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {
  public kategoriler:any='';
  public turler:any='';
  public iller:any='';
  public kategori:string;
  public tur:string;
  public yas:string;
  public konum:string;
  public cinsiyet:string;
  public ilanTuru:string;
  constructor(private activatedRoute: ActivatedRoute,private modalCtrl:ModalController,private http:HttpClient) {
   this.kategoriGetir();
   this.illeriGetir();
   }

  ngOnInit() {



  }

  kategoriGetir(){
    this.http.get('https://webservis.online/candostum.php?servis_adi=kategori_getir').subscribe(data=>{
      this.kategoriler=data;
    });
  }
  illeriGetir(){
    this.http.get('https://webservis.online/candostum.php?servis_adi=illeri_getir').subscribe(data=>{
  this.iller=data;
  console.log(this.iller);
})
  }
  closeModal(){
    this.modalCtrl.dismiss();
  }

  async openFilterModal(){
    const modal=await this.modalCtrl.create({
      component:FilteradvertPage,
      componentProps:{kategori: this.kategori,tur:this.tur,yas:this.yas,konum:this.konum,cinsiyet:this.cinsiyet,ilanTuru:this.ilanTuru},

    });
    modal.present();
  }
  turGetir(){
    this.http.get('https://webservis.online/candostum.php?servis_adi=tur_getir&kategori='+this.kategori).subscribe(data=>{
this.turler=data;
    })
  }
temizle(){
   this.kategori=undefined;
   this.tur=undefined;
   this.yas=undefined;
   this.konum=undefined;
   this.cinsiyet=undefined;
   this.ilanTuru=undefined;
}
}
