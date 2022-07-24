

<?php

// 0- Anguler ile bu servise bağlanırken verilmesi gereken izinler

	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Credentials: true");
	header('Access-Control-Allow-Headers: X-gelen_dataed-With');
	header('Access-Control-Allow-Headers: Content-Type');
	header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT');

// 1-DB Bağlantısı gerekli PHP


$host = '45.84.205.102';
$user = 'u113559345_ThGvg';
$pass = 'CUMxQXe1le';
$data = 'u113559345_vz3vz';

try {
	$pdo = new PDO('mysql:host='.$host.';dbname='.$data.';charset=utf8', $user, $pass);
} catch (PDOException $e) {
	print "Error!: " . $e->getMessage();
}




$servis_adi = $_GET['servis_adi'];





if($servis_adi=='kullanici_giris'){
  $email = $_GET['email'];
  $sifre = $_GET['sifre'];
  if($email&&$sifre){
    $stmt = $pdo->prepare(" SELECT * from `kullanicilar` where email='$email' and sifre='$sifre'");
  $stmt->execute();
  $row = $stmt->fetch(PDO::FETCH_ASSOC);
  print json_encode($row);
  }

}

else if($servis_adi=='kullanici_kayit'){
  $ad_soyad = $_GET['ad_soyad'];
  $email = $_GET['email'];
  $sifre = $_GET['sifre'];
  $telefon = $_GET['telefon'];
  $konum = $_GET['konum'];
  $verification = $_GET['verification'];


if($email&&$sifre&&$ad_soyad&&$telefon&&$konum){

  $stmt = $pdo->prepare(" SELECT * from `kullanicilar` where email='$email'");
  $stmt->execute();
  $user = $stmt->fetch(PDO::FETCH_ASSOC);

  if($user==false){


    $stmt = $pdo->prepare(" INSERT INTO `kullanicilar` (`ad_soyad`, `email`, `sifre`, `telefon`,`konum`,`verification`) VALUES ('$ad_soyad', '$email', '$sifre', '$telefon','$konum','false')");
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $stmt = $pdo->prepare(" SELECT * from `kullanicilar` where email='$email'");
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    print json_encode($row);

  }
  else{
   echo 'Kullanıcı Kayıtlı';

  }



}




}

else if($servis_adi=='ilanUid_kontrolu'){
  $ilanUid = $_GET['ilanUid'];
  $stmt = $pdo->prepare(" SELECT * from `ilanlar` where ilanUid='$ilanUid'");
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    print json_encode($row);
}

else if($servis_adi=='ilan_ekle'){
  $ilan_turu = $_GET['ilan_turu'];
  $kategori = $_GET['kategori'];
  $tur = $_GET['tur'];
  $konum = $_GET['konum'];
  $cinsiyet = $_GET['cinsiyet'];
  $ilan_tarihi = $_GET['ilan_tarihi'];
  $aciklama = $_GET['aciklama'];
  $yas = $_GET['yas'];
  $ilanUid = $_GET['ilanUid'];
  $ilan_sahibi_id = $_GET['ilan_sahibi_id'];
  $gorulme = $_GET['gorulme'];
  $resim_url = $_GET['resim_url'];








    $stmt = $pdo->prepare("INSERT INTO `u113559345_vz3vz`.`ilanlar` (`ilan_turu`, `kategori`, `tur`, `konum`, `cinsiyet`, `ilan_tarihi`, `aciklama`, `yas`, `ilan_sahibi_id`, `gorulme`,`ilanUid`,`resim_url`) VALUES ('$ilan_turu', '$kategori', '$tur', ' $konum', ' $cinsiyet', '$ilan_tarihi', ' $aciklama', '$yas', $ilan_sahibi_id, $gorulme,$ilanUid,'$resim_url')");
    $stmt->execute();

    $stmt = $pdo->prepare("SELECT * FROM ilanlar where ilanUid='$ilanUid'");
  $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    print json_encode($row);


}
else if($servis_adi=='kullanici_getir'){
  $email = $_GET['email'];
  $stmt = $pdo->prepare(" SELECT * from `kullanicilar` where email='$email'");
  $stmt->execute();
  $row = $stmt->fetch(PDO::FETCH_ASSOC);
  print json_encode($row);
}

else if($servis_adi=='illeri_getir'){
  $stmt = $pdo->prepare(" SELECT il from `iller`");
  $stmt->execute();
  $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
  print json_encode($row);
}
else if($servis_adi=='kategori_getir'){
  $stmt = $pdo->prepare(" SELECT * from `kategoriler`");
  $stmt->execute();
  $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
  print json_encode($row);
}

else if($servis_adi=='tur_getir'){
  $kategori = $_GET['kategori'];
  $stmt = $pdo->prepare(" SELECT tur from `turler` where kategori='$kategori'");
  $stmt->execute();
  $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
  print json_encode($row);
}

else if($servis_adi=='tum_ilanlari_getir'){
  $konum = $_GET['konum'];
  $stmt = $pdo->prepare("SELECT * from `ilanlar`");
  $stmt->execute();
  $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
  print json_encode($row);
}

else if($servis_adi=='yakindaki_ilanlari_getir'){
  $konum = $_GET['konum'];
  $stmt = $pdo->prepare(" SELECT * from `ilanlar` where konum='$konum'");
  $stmt->execute();
  $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
  print json_encode($row);
}
else if($servis_adi=='ilan_sil'){
  $ilanUid = $_GET['ilanUid'];
  $stmt = $pdo->prepare(" DELETE FROM `u113559345_vz3vz`.`ilanlar` WHERE `ilanUid` = $ilanUid");
  $stmt->execute();

}

else if($servis_adi=='kullanicinin_ilanlarini_getir'){
  $user_id = $_GET['user_id'];
  $stmt = $pdo->prepare("SELECT * from ilanlar i where i.ilan_sahibi_id='$user_id'");
  $stmt->execute();
  $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
  print json_encode($row);
}

else if($servis_adi=='populer_ilanlari_getir'){

  $stmt = $pdo->prepare("SELECT *
  FROM ilanlar
  ORDER BY gorulme DESC");
  $stmt->execute();
  $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
  print json_encode($row);
}
else if($servis_adi=='kullanici_numara_getir'){
  $user_id = $_GET['user_id'];
  $stmt = $pdo->prepare("SELECT k.telefon from kullanicilar k,  ilanlar i where i.ilan_sahibi_id=$user_id");
  $stmt->execute();
  $row = $stmt->fetch(PDO::FETCH_ASSOC);
  print json_encode($row);
}
else if($servis_adi=='gorulme_artir'){
  $ilanUid = $_GET['ilanUid'];


  $stmt = $pdo->prepare("UPDATE `u113559345_vz3vz`.`ilanlar` SET `gorulme` = (`gorulme`+1) WHERE `ilanUid` = $ilanUid ");
  $stmt->execute();
}

else if($servis_adi=='ilan_detayi_getir'){
  $ilanUid = $_GET['ilanUid'];
  $stmt = $pdo->prepare("SELECT * FROM ilanlar where ilanUid='$ilanUid'");
  $stmt->execute();
  $row = $stmt->fetch(PDO::FETCH_ASSOC);
  print json_encode($row);
}
else if($servis_adi=='ilani_sil'){
  $ilanUid = $_GET['ilanUid'];

  $stmt = $pdo->prepare("DELETE FROM `u113559345_vz3vz`.`ilanlar` WHERE `ilanUid` = $ilanUid");
  $stmt->execute();

}
else if($servis_adi=='kullanici_bilgileri_guncelle'){
  $user_id = $_GET['user_id'];
  $ad_soyad = $_GET['ad_soyad'];
  $telefon = $_GET['telefon'];
  $konum = $_GET['konum'];

  $stmt = $pdo->prepare("UPDATE `u113559345_vz3vz`.`kullanicilar` SET `ad_soyad` = '$ad_soyad', `telefon` = '$telefon', `konum` = '$konum' WHERE `id` = '$user_id'");
  $stmt->execute();

  $stmt = $pdo->prepare("SELECT * FROM kullanicilar where id='$user_id'");
  $stmt->execute();
  $row = $stmt->fetch(PDO::FETCH_ASSOC);
  print json_encode($row);
}

else if($servis_adi=='dogrulama_kodu_gonder'){
  $email = $_GET['email'];
  $code = $_GET['code'];

  if($email&&$code){
    ini_set( 'display_errors', 1 );
    error_reporting( E_ALL );
    $from = "candostum@webservis.online";
    $to = "$email";
    $subject = "Dogrulama kodu";
    $message = "$code";
    $headers = "From:" . $from;
    mail($to,$subject,$message, $headers);
    echo "Dogrulama kodu gonderildi.";
  }


}

else if ($servis_adi=='hesabi_dogrula'){
  $user_id = $_GET['user_id'];
  if($user_id){
    $stmt = $pdo->prepare("UPDATE `u113559345_vz3vz`.`kullanicilar` SET `verification` = 'true'WHERE `id` = '$user_id'");
    $stmt->execute();
  }


  $stmt = $pdo->prepare("SELECT * FROM kullanicilar where id='$user_id'");
  $stmt->execute();
  $row = $stmt->fetch(PDO::FETCH_ASSOC);
  print json_encode($row);
}
else if($servis_adi=='sifre_sifirla'){
  $email = $_GET['email'];

if($email){
  $password = $_GET['password'];
  $stmt = $pdo->prepare("SELECT * FROM kullanicilar where email='$email'");
  $stmt->execute();
  $row = $stmt->fetch(PDO::FETCH_ASSOC);
  if($row==false){
    echo 'Kullanıcı kayıtlı değil.';
  }
  else if($row!=false&&$password){

    ini_set( 'display_errors', 1 );
    error_reporting( E_ALL );
    $from = "candostum@webservis.online";
    $to = "$email";
    $subject = "Dogrulama kodu";
    $message = "$password";
    $headers = "From:" . $from;
    mail($to,$subject,$message, $headers);
    echo "Dogrulama kodu gonderildi.";



  $stmt = $pdo->prepare("UPDATE `u113559345_vz3vz`.`kullanicilar` SET  `sifre` = '$password' WHERE `email` = '$email'");
  $stmt->execute();

  $stmt = $pdo->prepare("SELECT * FROM kullanicilar where email='$email'");
  $stmt->execute();
  $row = $stmt->fetch(PDO::FETCH_ASSOC);
  print json_encode($row);

  }




}
}
else if($servis_adi=='yakindaki_ilanlari_getir'){
  $konum = $_GET['konum'];
  $stmt = $pdo->prepare("SELECT * FROM ilanlar where konum='$konum'");
  $stmt->execute();
  $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
  print json_encode($row);
}

else if($servis_adi=='popüler_ilanlari_getir'){
  $stmt = $pdo->prepare("SELECT *
  FROM ilanlar
  ORDER BY gorulme DESC");
  $stmt->execute();
  $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
  print json_encode($row);
}


// FİLTRELEME SERVİSLERİ
else if($servis_adi=='filtrele'){
  $kategori = $_GET['kategori'];
  $cinsiyet = $_GET['cinsiyet'];
  $tur = $_GET['tur'];
  $yas = $_GET['yas'];
  $konum = $_GET['konum'];
  $ilan_turu = $_GET['ilan_turu'];





  if($kategori&&!$tur&&!$yas&&!$konum&&!$cinsiyet&&!$ilan_turu){
    $stmt = $pdo->prepare("SELECT * FROM ilanlar where kategori='$kategori'");
$stmt->execute();
$row = $stmt->fetchAll(PDO::FETCH_ASSOC);
print json_encode($row);
  }
  //Çalışıyor

  else if($yas&&!$kategori&&!$tur&&!$konum&&!$cinsiyet&&!$ilan_turu){
    $stmt = $pdo->prepare("SELECT * FROM ilanlar where  yas='$yas'");
    $stmt->execute();
    $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
    print json_encode($row);
  }  //Çalışıyor

  else if($konum&&!$kategori&&!$tur&&!$yas&&!$cinsiyet&&!$ilan_turu){
    $stmt = $pdo->prepare("SELECT * FROM ilanlar where  konum='$konum'");
    $stmt->execute();
    $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
    print json_encode($row);
  }  //Çalışıyor

  else if($cinsiyet&&!$kategori&&!$tur&&!$yas&&!$konum&&!$ilan_turu){
    $stmt = $pdo->prepare("SELECT * FROM ilanlar where  cinsiyet='$cinsiyet'");
    $stmt->execute();
    $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
    print json_encode($row);
  }  //Çalışıyor

  else if($ilan_turu&&!$kategori&&!$tur&&!$yas&&!$konum&&!$cinsiyet){
    $stmt = $pdo->prepare("SELECT * FROM ilanlar where  ilan_turu='$ilan_turu'");
    $stmt->execute();
    $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
    print json_encode($row);
  }  //Çalışıyor
  else if($kategori&&$tur&&!$yas&&!$konum&&!$cinsiyet&&!$ilan_turu){
    $stmt = $pdo->prepare("SELECT * FROM ilanlar where kategori='$kategori' and tur='$tur'");
    $stmt->execute();
    $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
    print json_encode($row);
  }  //Çalışıyor

  else if($kategori&&$yas&&!$tur&&!$konum&&!$cinsiyet&&!$ilan_turu){
    $stmt = $pdo->prepare("SELECT * FROM ilanlar where kategori='$kategori' and yas='$yas'");
    $stmt->execute();
    $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
    print json_encode($row);
  } //Çalışıyor


  else if($kategori&&$konum&&!$yas&&!$tur&&!$cinsiyet&&!$ilan_turu){
    $stmt = $pdo->prepare("SELECT * FROM ilanlar where kategori='$kategori' and konum='$konum'");
    $stmt->execute();
    $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
    print json_encode($row);
  }

  //Çalışıyor

  else if($kategori&&$cinsiyet&&!$yas&&!$tur&&!$konum&&!$ilan_turu){
    $stmt = $pdo->prepare("SELECT * FROM ilanlar where kategori='$kategori' and cinsiyet='$cinsiyet'");
    $stmt->execute();
    $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
    print json_encode($row);
  }
  //Çalışıyor

  else if($kategori&&$ilan_turu&&!$yas&&!$konum&&!$cinsiyet&&!$tur){
    $stmt = $pdo->prepare("SELECT * FROM ilanlar where kategori='$kategori' and ilan_turu='$ilan_turu'");
    $stmt->execute();
    $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
    print json_encode($row);
  }
//Çalışıyor

  else if($kategori&&$tur&&$yas&&!$konum&&!$cinsiyet&&!$ilan_turu){
    $stmt = $pdo->prepare("SELECT * FROM ilanlar where kategori='$kategori' and tur='$tur' and yas='$yas'");
    $stmt->execute();
    $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
    print json_encode($row);
  }

  //Çalışıyor
  else if($kategori&&$tur&&$konum&&!$yas&&!$cinsiyet&&!$ilan_turu){
    $stmt = $pdo->prepare("SELECT * FROM ilanlar where kategori='$kategori' and tur='$tur' and konum='$konum'");
    $stmt->execute();
    $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
    print json_encode($row);
  }

  //Çalışıyor

  else if($kategori&&$tur&&$cinsiyet&&!$konum&&!$yas&&!$ilan_turu){
    $stmt = $pdo->prepare("SELECT * FROM ilanlar where kategori='$kategori' and tur='$tur' and cinsiyet='$cinsiyet'");
    $stmt->execute();
    $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
    print json_encode($row);
  }

   //Çalışıyor
  else if($kategori&&$tur&&$ilan_turu&&!$konum&&!$cinsiyet&&!$yas){
    $stmt = $pdo->prepare("SELECT * FROM ilanlar where kategori='$kategori' and tur='$tur' and ilan_turu='$ilan_turu'");
    $stmt->execute();
    $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
    print json_encode($row);
  }
    //Çalışıyor
  else if($kategori&&$tur&&$yas&&$konum&&!$cinsiyet&&!$ilan_turu){
    $stmt = $pdo->prepare("SELECT * FROM ilanlar where kategori='$kategori' and tur='$tur' and yas='$yas' and konum='$konum'");
    $stmt->execute();
    $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
    print json_encode($row);
  }
  //Çalışıyor
  else if($kategori&&$tur&&$yas&&$cinsiyet&&!$konum&&!$ilan_turu){
    $stmt = $pdo->prepare("SELECT * FROM ilanlar where kategori='$kategori' and tur='$tur' and yas='$yas' and cinsiyet='$cinsiyet'");
    $stmt->execute();
    $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
    print json_encode($row);
  }
  else if($kategori&&$tur&&$yas&&$ilan_turu&&!$cinsiyet&&!$konum){
    $stmt = $pdo->prepare("SELECT * FROM ilanlar where kategori='$kategori' and tur='$tur' and yas='$yas' and ilan_turu='$ilan_turu'");
    $stmt->execute();
    $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
    print json_encode($row);
  }
  else if($kategori&&$yas&&$konum&&$cinsiyet&&!$tur&&!$ilan_turu){
    $stmt = $pdo->prepare("SELECT * FROM ilanlar where kategori='$kategori' and yas='$yas' and konum='$konum' and cinsiyet='$cinsiyet'");
    $stmt->execute();
    $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
    print json_encode($row);
  }
  else if($kategori&&$yas&&$konum&&$ilan_turu&&!$cinsiyet&&!$tur){
    $stmt = $pdo->prepare("SELECT * FROM ilanlar where kategori='$kategori' and yas='$yas' and konum='$konum' and ilan_turu='$ilan_turu'");
    $stmt->execute();
    $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
    print json_encode($row);
  }
  else if($kategori&&$konum&&$cinsiyet&&$ilan_turu&&!$yas&&!$tur){
    $stmt = $pdo->prepare("SELECT * FROM ilanlar where kategori='$kategori' and konum='$konum' and cinsiyet='$cinsiyet' and ilan_turu='$ilan_turu'");
    $stmt->execute();
    $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
    print json_encode($row);
  }
  else if($kategori&&$tur&&$yas&&$konum&&$cinsiyet){
    $stmt = $pdo->prepare("SELECT * FROM ilanlar where kategori='$kategori' and tur='$tur' and yas='$yas' and konum='$konum' and cinsiyet='$cinsiyet'");
    $stmt->execute();
    $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
    print json_encode($row);
  }
  else if($kategori&&$tur&&$yas&&$konum&&$cinsiyet&&$ilan_turu){
    $stmt = $pdo->prepare("SELECT * FROM ilanlar where kategori='$kategori' and tur='$tur' and yas='$yas' and konum='$konum' and cinsiyet='$cinsiyet' and ilan_turu='$ilan_turu'");
    $stmt->execute();
    $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
    print json_encode($row);
  }

  else if($yas&&$konum&&!$kategori&!$tur&&!$cinsiyet&&!$ilan_turu){
    $stmt = $pdo->prepare("SELECT * FROM ilanlar where yas='$yas' and konum='$konum'");
    $stmt->execute();
    $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
    print json_encode($row);
  }

  else if($yas&&$cinsiyet&&!$kategori&!$tur&&!$konum&&!$ilan_turu){
    $stmt = $pdo->prepare("SELECT * FROM ilanlar where yas='$yas' and cinsiyet='$cinsiyet'");
    $stmt->execute();
    $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
    print json_encode($row);
  }
  else if($yas&&$ilan_turu&&!$kategori&!$tur&&!$cinsiyet&&!$konum){
    $stmt = $pdo->prepare("SELECT * FROM ilanlar where yas='$yas' and ilan_turu='$ilan_turu'");
    $stmt->execute();
    $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
    print json_encode($row);
  }

  else if($konum&&$cinsiyet&&!$kategori&!$tur&&!$yas&&!$ilan_turu){
    $stmt = $pdo->prepare("SELECT * FROM ilanlar where konum='$konum' and cinsiyet='$cinsiyet'");
    $stmt->execute();
    $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
    print json_encode($row);
  }

  else if($konum&&$ilan_turu&&!$kategori&!$tur&&!$cinsiyet&&!$yas){
    $stmt = $pdo->prepare("SELECT * FROM ilanlar where konum='$konum' and ilan_turu='$ilan_turu'");
    $stmt->execute();
    $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
    print json_encode($row);
  }


}


?>
