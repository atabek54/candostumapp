/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { LoadingController, ModalController, } from '@ionic/angular';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-detaymodal',
  templateUrl: './detaymodal.page.html',
  styleUrls: ['./detaymodal.page.scss'],
})
export class DetaymodalPage implements OnInit {

  public telefon: any;
  public user: any = '';
  public ilan: any = '';
  @Input() id: string;
  constructor(private http: HttpClient, private modalCtrl: ModalController, private call: CallNumber, private loading: LoadingController, private service: AppComponent) {
    this.user = JSON.parse(localStorage.getItem('user'));

    this.detayGetir();
  }

  callNumber() {
    this.call.callNumber(this.ilan.telefon, true)
      .then(res => { })
      .catch(err => { });
  }


  async detayGetir() {
    const loading = await this.loading.create();
    loading.present();

    this.http.get(this.service.ilan_detay_getir + this.id).subscribe(data => {
      this.ilan = data;

    });
    loading.dismiss();
  }
  ngOnInit() {

    this.detayGetir();



  }

  back() {
    this.modalCtrl.dismiss();
  }


}
