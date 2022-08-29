/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  //servisler
  kullanici_giris= 'url';
  kullanici_kayit='https://webservis.online/candostum.php?servis_adi=kullanici_kayit&email=';
  kullanici_getir='https://webservis.online/candostum.php?servis_adi=kullanici_getir&email=';
  kullanici_bilgi_guncelle='https://webservis.online/candostum.php?servis_adi=kullanici_bilgileri_guncelle&ad_soyad=';
  sifre_sifirla='https://webservis.online/candostum.php?servis_adi=sifre_sifirla&email=';
  illeri_getir='https://webservis.online/candostum.php?servis_adi=illeri_getir';
  tur_getir='https://webservis.online/candostum.php?servis_adi=tur_getir&kategori=';
  kategori_getir='https://webservis.online/candostum.php?servis_adi=kategori_getir';
  tum_ilanlari_getir='https://webservis.online/candostum.php?servis_adi=tum_ilanlari_getir';
  kullanici_ilanlarini_getir='https://webservis.online/candostum.php?servis_adi=kullanicinin_ilanlarini_getir&user_id=';
  en_yeni_ilanlari_getir='https://webservis.online/candostum.php?servis_adi=en_yeni_ilanlari_getir';
  ilan_detay_getir='https://webservis.online/candostum.php?servis_adi=ilan_detayi_getir&ilanUid=';
  ilan_ekle= 'https://webservis.online/candostum.php?servis_adi=ilan_ekle&ilan_turu=' ;
  ilani_sil='https://webservis.online/candostum.php?servis_adi=ilani_sil&ilanUid=';
  ilan_uid_kontrol=  'https://webservis.online/candostum.php?servis_adi=ilanUid_kontrolu&ilanUid=';
  dogrulama_kodu_gonder= 'https://webservis.online/candostum.php?servis_adi=dogrulama_kodu_gonder&email=';
  hesab_dogrulama='https://webservis.online/candostum.php?servis_adi=hesabi_dogrula&user_id=';
  constructor() {}



}
