import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DetaymodalPage } from '../detaymodal/detaymodal.page';

@Component({
  selector: 'app-filteradvert',
  templateUrl: './filteradvert.page.html',
  styleUrls: ['./filteradvert.page.scss'],
})
export class FilteradvertPage implements OnInit {
  public filterAdverts:any='';
  public advertId:string;
  @Input() kategori: string;
  @Input() tur: string;
  @Input() yas: string;
  @Input() konum: string;
  @Input() cinsiyet: string;
  @Input() ilanTuru: string;
  @Input() ilan: string;
  constructor(private activatedRoute: ActivatedRoute,private modalCtrl:ModalController,private http:HttpClient) {




   }

  ngOnInit() {

    if(this.ilan!='Yakınındaki İlanlar'&&this.ilan!='Popüler İlanlar'){
      this.filtrele();
    }
    else if (this.ilan=='Yakınındaki İlanlar'){
      this.yakinIlanlariGetir();
    }
    else if (this.ilan=='Popüler İlanlar'){
      this.popülerIlanlariGetir();
    }



  }

  async openDetayModal(id){
    this.advertId=id

    const modal=await this.modalCtrl.create({
      component:DetaymodalPage,
      componentProps:{id:id},

    });
    modal.present();
  }



yakinIlanlariGetir(){
  const user = JSON.parse(localStorage.getItem('user'));

  this.http.get('https://webservis.online/candostum.php?servis_adi=yakindaki_ilanlari_getir&konum='+user.konum).subscribe(data=>{
    this.filterAdverts=data;
  });
}
popülerIlanlariGetir(){
  this.http.get('https://webservis.online/candostum.php?servis_adi=populer_ilanlari_getir').subscribe(data=>{
    this.filterAdverts=data;
  });
}

  closeModal(){
    this.modalCtrl.dismiss();
  }

  filtrele(){
    if(this.kategori&&this.tur==undefined &&this.yas==undefined&&this.konum==undefined&&this.cinsiyet==undefined&&this.ilanTuru==undefined){
      this.http.get('https://webservis.online/candostum.php?servis_adi=filtrele&kategori='+this.kategori).subscribe(data=>{

      this.filterAdverts=data;
    })
    }
   else if(this.yas&&this.tur==undefined &&this.kategori==undefined&&this.konum==undefined&&this.cinsiyet==undefined&&this.ilanTuru==undefined){
      this.http.get('https://webservis.online/candostum.php?servis_adi=filtrele&yas='+this.yas).subscribe(data=>{

      this.filterAdverts=data;
    })
    }

    else if(this.konum&&this.tur==undefined &&this.kategori==undefined&&this.yas==undefined&&this.cinsiyet==undefined&&this.ilanTuru==undefined){
      this.http.get('https://webservis.online/candostum.php?servis_adi=filtrele&konum='+this.konum).subscribe(data=>{

      this.filterAdverts=data;
    })
    }




    else if(this.cinsiyet&&this.tur==undefined &&this.kategori==undefined&&this.yas==undefined&&this.konum==undefined&&this.ilanTuru==undefined){
      this.http.get('https://webservis.online/candostum.php?servis_adi=filtrele&cinsiyet='+this.cinsiyet).subscribe(data=>{

      this.filterAdverts=data;
    })
    }


    else if(this.ilanTuru&&this.tur==undefined &&this.kategori==undefined&&this.yas==undefined&&this.cinsiyet==undefined&&this.konum==undefined){
      this.http.get('https://webservis.online/candostum.php?servis_adi=filtrele&ilan_turu='+this.ilanTuru).subscribe(data=>{

      this.filterAdverts=data;
    })
    }
    ///


    else if(this.kategori&&this.tur&&this.yas==undefined&&this.konum==undefined&&this.cinsiyet==undefined&&this.ilanTuru==undefined){
      this.http.get('https://webservis.online/candostum.php?servis_adi=filtrele&kategori='+this.kategori+'&tur='+this.tur).subscribe(data=>{

        this.filterAdverts=data;
      })
    }

    else if(this.kategori&&this.yas&&this.tur==undefined&&this.konum==undefined&&this.cinsiyet==undefined&&this.ilanTuru==undefined){
      this.http.get('https://webservis.online/candostum.php?servis_adi=filtrele&kategori='+this.kategori+'&yas='+this.yas).subscribe(data=>{

        this.filterAdverts=data;
      })
    }


    else if(this.kategori&&this.konum&&this.tur==undefined&&this.yas==undefined&&this.cinsiyet==undefined&&this.ilanTuru==undefined){
      this.http.get('https://webservis.online/candostum.php?servis_adi=filtrele&kategori='+this.kategori+'&konum='+this.konum).subscribe(data=>{

        this.filterAdverts=data;
      })
    }

    else if(this.kategori&&this.cinsiyet&&this.tur==undefined&&this.yas==undefined&&this.konum==undefined&&this.ilanTuru==undefined){
      this.http.get('https://webservis.online/candostum.php?servis_adi=filtrele&kategori='+this.kategori+'&cinsiyet='+this.cinsiyet).subscribe(data=>{

        this.filterAdverts=data;
      })
    }


    else if(this.kategori&&this.ilanTuru&&this.tur==undefined&&this.yas==undefined&&this.konum==undefined&&this.cinsiyet==undefined){
      this.http.get('https://webservis.online/candostum.php?servis_adi=filtrele&kategori='+this.kategori+'&ilan_turu='+this.ilanTuru).subscribe(data=>{

        this.filterAdverts=data;
      })
    }

    else if(this.kategori&&this.tur&&this.yas&&this.ilanTuru==undefined&&this.konum==undefined&&this.cinsiyet==undefined){
      this.http.get('https://webservis.online/candostum.php?servis_adi=filtrele&kategori='+this.kategori+'&tur='+this.tur+'&yas='+this.yas).subscribe(data=>{

        this.filterAdverts=data;
      })
    }
    else if(this.kategori&&this.tur&&this.konum&&this.ilanTuru==undefined&&this.yas==undefined&&this.cinsiyet==undefined){
      this.http.get('https://webservis.online/candostum.php?servis_adi=filtrele&kategori='+this.kategori+'&tur='+this.tur+'&konum='+this.konum).subscribe(data=>{

        this.filterAdverts=data;
      })
    }

    else if(this.kategori&&this.tur&&this.cinsiyet&&this.ilanTuru==undefined&&this.yas==undefined&&this.konum==undefined){
      this.http.get('https://webservis.online/candostum.php?servis_adi=filtrele&kategori='+this.kategori+'&tur='+this.tur+'&cinsiyet='+this.cinsiyet).subscribe(data=>{

        this.filterAdverts=data;
      })
    }

    else if(this.kategori&&this.tur&&this.ilanTuru&&this.cinsiyet==undefined&&this.yas==undefined&&this.konum==undefined){
      this.http.get('https://webservis.online/candostum.php?servis_adi=filtrele&kategori='+this.kategori+'&tur='+this.tur+'&ilan_turu='+this.ilanTuru).subscribe(data=>{

        this.filterAdverts=data;
      })
    }

    else if(this.kategori&&this.tur&&this.yas&&this.konum&&this.cinsiyet==undefined&&this.ilanTuru==undefined){
      this.http.get('https://webservis.online/candostum.php?servis_adi=filtrele&kategori='+this.kategori+'&tur='+this.tur+'&yas='+this.yas+'&konum='+this.konum).subscribe(data=>{

        this.filterAdverts=data;
      })
    }

    else if(this.kategori&&this.tur&&this.yas&&this.cinsiyet&&this.konum==undefined&&this.ilanTuru==undefined){
      this.http.get('https://webservis.online/candostum.php?servis_adi=filtrele&kategori='+this.kategori+'&tur='+this.tur+'&yas='+this.yas+'&cinsiyet='+this.cinsiyet).subscribe(data=>{

        this.filterAdverts=data;
      })
    }

    else if(this.kategori&&this.tur&&this.yas&&this.ilanTuru&&this.konum==undefined&&this.cinsiyet==undefined){
      this.http.get('https://webservis.online/candostum.php?servis_adi=filtrele&kategori='+this.kategori+'&tur='+this.tur+'&yas='+this.yas+'&ilan_turu='+this.ilanTuru).subscribe(data=>{

        this.filterAdverts=data;
      })
    }

    else if(this.kategori&&this.yas&&this.konum&&this.cinsiyet&&this.tur==undefined&&this.ilanTuru==undefined){
      this.http.get('https://webservis.online/candostum.php?servis_adi=filtrele&kategori='+this.kategori+'&yas='+this.yas+'&konum='+this.konum+'&cinsiyet='+this.cinsiyet).subscribe(data=>{

        this.filterAdverts=data;
      })
    }

    else if(this.kategori&&this.yas&&this.konum&&this.ilanTuru&&this.tur==undefined&&this.cinsiyet==undefined){
      this.http.get('https://webservis.online/candostum.php?servis_adi=filtrele&kategori='+this.kategori+'&yas='+this.yas+'&konum='+this.konum+'&ilan_turu='+this.ilanTuru).subscribe(data=>{

        this.filterAdverts=data;
      })
    }
    else if(this.kategori&&this.konum&&this.cinsiyet&&this.ilanTuru&&this.tur==undefined&&this.yas==undefined){
      this.http.get('https://webservis.online/candostum.php?servis_adi=filtrele&kategori='+this.kategori+'&konum='+this.konum+'&cinsiyet='+this.cinsiyet+'&ilan_turu='+this.ilanTuru).subscribe(data=>{

        this.filterAdverts=data;
      })
    }

    else if(this.kategori&&this.tur&&this.yas&&this.konum&&this.cinsiyet&&this.ilanTuru==undefined){
      this.http.get('https://webservis.online/candostum.php?servis_adi=filtrele&kategori='+this.kategori+'&tur='+this.tur+'&yas='+this.yas+'&konum='+this.konum+'&cinsiyet='+this.cinsiyet).subscribe(data=>{

        this.filterAdverts=data;
      })
    }

    else if(this.kategori&&this.tur&&this.yas&&this.konum&&this.cinsiyet&&this.ilanTuru){
      this.http.get('https://webservis.online/candostum.php?servis_adi=filtrele&kategori='+this.kategori+'&tur='+this.tur+'&yas='+this.yas+'&konum='+this.konum+'&cinsiyet='+this.cinsiyet+'&ilan_turu='+this.ilanTuru).subscribe(data=>{

        this.filterAdverts=data;
      })
    }

    else if(this.yas&&this.konum&&this.kategori==undefined&&this.tur==undefined&&this.cinsiyet==undefined&&this.ilanTuru==undefined){
      this.http.get('https://webservis.online/candostum.php?servis_adi=filtrele&yas='+this.yas+'&konum='+this.konum).subscribe(data=>{

        this.filterAdverts=data;
      })
    }
    else if(this.yas&&this.cinsiyet&&this.kategori==undefined&&this.tur==undefined&&this.konum==undefined&&this.ilanTuru==undefined){
      this.http.get('https://webservis.online/candostum.php?servis_adi=filtrele&yas='+this.yas+'&cinsiyet='+this.cinsiyet).subscribe(data=>{
""
        this.filterAdverts=data;
      })
    }
    else if(this.yas&&this.ilanTuru&&this.kategori==undefined&&this.tur==undefined&&this.konum==undefined&&this.cinsiyet==undefined){
      this.http.get('https://webservis.online/candostum.php?servis_adi=filtrele&yas='+this.yas+'&ilan_turu='+this.ilanTuru).subscribe(data=>{

        this.filterAdverts=data;
      })
    }
    else if(this.konum&&this.cinsiyet&&this.kategori==undefined&&this.tur==undefined&&this.yas==undefined&&this.ilanTuru==undefined){
      this.http.get('https://webservis.online/candostum.php?servis_adi=filtrele&konum='+this.konum+'&cinsiyet='+this.cinsiyet).subscribe(data=>{

        this.filterAdverts=data;
      })
    }

    else if(this.konum&&this.ilanTuru&&this.kategori==undefined&&this.tur==undefined&&this.yas==undefined&&this.cinsiyet==undefined){
      this.http.get('https://webservis.online/candostum.php?servis_adi=filtrele&konum='+this.konum+'&ilan_turu='+this.ilanTuru).subscribe(data=>{

        this.filterAdverts=data;
      })
    }



  }

}
