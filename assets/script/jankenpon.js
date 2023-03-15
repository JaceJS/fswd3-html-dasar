alert('Selamat Datang di Game Jankenpon');

let inginBermain = confirm('Ingin Bermain?');
if (inginBermain == 1) {
  let namaPemain = prompt('Masukkan nama pemain');
  let scorePemain = 0;
  console.log(`Selamat Datang ${namaPemain}`);
  console.log(`Score Anda adalah ${scorePemain}`);

  // Melakukan perulangan untuk bermain
  let main = 1;
  let jumlahMain = 0;
  do {
    // Pilihan Pemain
    let pilihanPemain = prompt('Masukkan pilihan Anda (gunting, batu, kertas)');
    if (pilihanPemain != 'gunting' && pilihanPemain != 'batu' && pilihanPemain != 'kertas') {
      alert('Masukkan pilihan dengan jelas (gunting, batu, kertas)');
    } else {
      jumlahMain++;
      // Membuat Pilihan Komputer
      let pilihanComputer = Math.floor(Math.random() * 3);
      if (pilihanComputer == 0) {
        pilihanComputer = 'gunting';
      } else if (pilihanComputer == 1) {
        pilihanComputer = 'batu';
      } else {
        pilihanComputer = 'kertas';
      }

      // Logika Menang dan Kalah
      let hasil;
      if ((pilihanPemain === 'gunting' && pilihanComputer === 'kertas') || (pilihanPemain === 'batu' && pilihanComputer === 'gunting') || (pilihanPemain === 'kertas' && pilihanComputer === 'batu')) {
        scorePemain++;
        hasil = 'Anda menang';
      } else if (pilihanPemain === pilihanComputer) {
        hasil = 'seri';
      } else {
        hasil = 'computer menang';
      }

      // Menampilkan semua hasil di console dan browser
      console.log(`Komputer memilih ${pilihanComputer}`);
      console.log(`Kamu memilih ${pilihanPemain}`);
      console.log(`Hasilnya ${hasil}`);
      console.log(`===================================`);
      console.log(`Score Anda adalah ${scorePemain}`);

      alert(`Computer : ${pilihanComputer} \nPlayer : ${pilihanPemain} \nHasilnya ${hasil}  \nScore : ${scorePemain}`);
    }

    let lanjutMain = confirm('Lanjut bermain?');
    if (lanjutMain == 1) {
      continue;
    } else {
      main = 0;
      alert(`Nama Pemain : ${namaPemain} \nScore akhir Anda adalah ${scorePemain} \nAnda bermain sebanyak ${jumlahMain}x`);
    }
  } while (main == 1);
} else {
  alert('Anda memilih untuk tidak bermain :( ');
}
