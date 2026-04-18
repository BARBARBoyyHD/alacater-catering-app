# (PRD) Product Requirements Document

Status: Draft | Owner: Product | Last updated: 2025-10-31

## 1. Tujuan & Lingkup

- MVP untuk daily catering individu dengan model paket harian (durasi ditentukan mitra; contoh 5/10/15 hari), pembayaran 1x per paket, self‑delivery oleh mitra, ongkir final di checkout, cutoff H‑1 untuk perubahan.

## 2. Persona Singkat

- Customer individu: ingin meal plan harian praktis, harga jelas, bisa pause/ubah alamat.
- Mitra catering: butuh alat operasional sederhana (menu, area/ongkir, kapasitas, kalender libur), arus pesanan stabil.
- Admin: verifikasi mitra, kelola komisi/fee, handle refund/sengketa, rekonsiliasi payout.

## 3. User Stories (Inti)

1. Sebagai customer, saya bisa mencari vendor berdasarkan lokasi, diet, harga, dan rating agar cepat menemukan paket yang cocok.
2. Sebagai customer, saya bisa checkout paket, melihat total (produk + ongkir + platform fee), dan membayar 1x via payment gateway agar transaksi jelas dan aman.
3. Sebagai customer, saya bisa mengelola langganan (skip/pause/ubah alamat) dengan cutoff H‑1 agar pesanan besok menyesuaikan.
4. Sebagai customer, saya mendapat notifikasi status (reminder cutoff, paket hampir habis, out‑for‑delivery, delivered/failed) agar tidak ketinggalan.
5. Sebagai mitra, saya bisa mengatur area/ongkir, kuota harian per paket (opsional), dan kalender libur agar operasional terkendali.
6. Sebagai mitra, saya bisa melihat pesanan dan ringkasan produksi harian agar produksi efisien.
7. Sebagai admin, saya bisa verifikasi mitra, memantau transaksi, memediasi sengketa (tanpa memproses refund), dan melakukan payout.
8. (Premium) Sebagai mitra, saya bisa mengunggah short video agar konten saya tampil di homepage dan profil mitra.
9. Sebagai mitra, saya bisa menambahkan tautan sosial media (Instagram, Facebook, dll.) yang mengarahkan customer ke halaman sosial saya.

## 4. Flow Utama (E2E)

4.1 Pencarian → Listing → Detail Vendor → Pilih Paket → Checkout → Pembayaran → Konfirmasi Order

4.2 Manajemen Langganan: Calendar View → Aksi per hari (Skip/Pause/Ubah Alamat) → Validasi cutoff H‑1 → Update jadwal

4.3 Operasional Mitra: Atur Area/Ongkir → Set Kuota Harian per Paket (opsional) → Set Kalender Libur → Lihat Pesanan → Ekspor Rute (CSV)

4.4 Sengketa: Customer ajukan → Lampirkan bukti → Admin mediasi → Resolusi vendor (penggantian/voucher opsional)

## 4a. Glossary

- H‑1: Batas perubahan langganan 1 hari sebelum pengiriman; default cutoff 20:00 WIB.
- Delivery window: Slot waktu pengantaran (contoh: 10–12, 12–14) yang dipilih customer (opsional per vendor).
- Area/Zone: Wilayah layanan vendor untuk perhitungan dan validasi ongkir.
- Kuota Harian Paket: Batas maksimum penjualan per paket per hari (opsional) yang ditetapkan vendor.
- Durasi Paket: Jumlah hari layanan dalam satu paket (ditentukan mitra per paket; contoh 5/10/15 hari).

## 5. Aturan & Kebijakan Kunci

- Monetisasi (MVP): rujuk Monetization Baseline pada `SCOPE.md` (source of truth angka). Platform fee Rp5.000 bersifat tax‑inclusive.
- Komisi hanya atas nilai makanan (exclude ongkir/pajak).
- Pembayaran 1x per paket, tanpa auto‑renewal/dompet.
- Ongkir final di checkout; tidak ada penambahan ongkir pasca‑checkout.
- Cutoff H‑1 (default 20:00 WIB) untuk skip/pause/ubah alamat; vendor dapat override dalam guardrail 18:00–22:00 WIB.
- Lead time minimal H+1; vendor dapat mengatur lead time lebih panjang.
- Delivery windows opsional (contoh: 10–12, 12–14); toleransi keterlambatan dasar; tanpa sanksi finansial dari platform.
- Review terverifikasi pasca‑delivery; rating pada level Paket dan Menu (tanpa rating kurir/catering).
- Chat pra‑order diperbolehkan; pembayaran off‑platform dilarang.
- Durasi paket dapat ditentukan oleh mitra per paket; platform menyediakan guardrail konfigurasi untuk batas minimal/maksimal hari.
- Pause subscription membutuhkan persetujuan mitra sebelum berlaku (mengikuti cutoff yang ditetapkan).

## 6. Acceptance Criteria (ringkas)

6.1 Checkout Total Transparan

- Given customer memilih paket dan alamat di area layanan,
When masuk ke checkout,
Then sistem menampilkan total (produk + ongkir + platform fee Rp5.000) dan metode pembayaran gateway.
    
    6.2 Pembayaran 1x & Konfirmasi
    
- Given customer menuntaskan pembayaran sukses,
When gateway mengirim callback sukses (idempotent),
Then order = paid, invoice terbit, subscription aktif sesuai paket.
    
    6.3 Validasi Area Layanan
    
- Given alamat di luar coverage vendor,
When checkout,
Then sistem memblok checkout dan minta pilih vendor/alamat lain.

6.4 Cutoff H‑1 untuk Perubahan

- Given subscription aktif,
When customer melakukan skip/pause/ubah alamat sebelum cutoff H‑1,
Then perubahan berlaku untuk hari terkait setelah disetujui mitra; sesudah cutoff → berlaku untuk hari berikutnya.

6.5 Kuota Harian Paket

- Given kuota harian paket tercapai,
When customer memilih tanggal tersebut,
Then tanggal menjadi sold out untuk paket terkait dan tidak tersedia di checkout.
    
    6.6 Kalender Libur Vendor
    
- Given vendor menandai tanggal libur,
When customer memilih tanggal itu,
Then tanggal tidak dapat dipilih; subscription melewati tanggal libur.

6.7 Refund via Platform

- Dihapus: platform tidak memproses refund. Lihat Bagian 13 untuk mediasi vendor‑led.

6.8 Payout Schedule

- Given transaksi berstatus delivered dan melewati hold waktu (jika ada),
When mencapai jadwal payout,
Then gateway/platform melakukan payout sesuai tier: Free T+3 (batch mingguan, min Rp200k, fee Rp4k), Premium T+1 (harian, min Rp100k, 1 on‑demand gratis/hari).

6.9 Cutoff Vendor Override

- Given vendor menetapkan cutoff di pengaturan,
When cutoff di luar guardrail 18:00–22:00 WIB,
Then sistem menolak nilai tersebut dan menggunakan default platform (20:00 WIB).

6.10 Lead Time

- Given order dibuat pada H (hari ini),
When vendor lead time minimal H+1 diaktifkan,
Then sistem hanya menampilkan tanggal mulai H+1 atau lebih lambat sesuai konfigurasi vendor.

6.11 Chat Pra‑order

- Given customer memulai chat pra‑order,
When vendor mengirimkan instruksi pembayaran off‑platform,
Then sistem memperingatkan dan memblokir tautan/teks pembayaran luar.

6.12 Rating Paket & Menu

- Given customer menyelesaikan transaksi,
When memberikan ulasan,
Then sistem hanya menerima rating untuk Paket dan Menu (tanpa rating kurir/catering) dan menampilkannya di profil vendor/paket/menu.

6.13 Social Media Links

- Given vendor menambahkan tautan sosial media di dashboard,
When customer mengklik tautan tersebut,
Then sistem membuka aplikasi/situs sosial media terkait (link‑out; tanpa integrasi data ke platform).

6.14 Upload Short Video (Premium)

- Given vendor bertier Premium,
When mengunggah short video yang lolos moderasi dasar,
Then video tampil di homepage (feed short video) dan di profil vendor.

6.15 Validasi Short Video

- Given vendor mengunggah short video,
When file tidak memenuhi batasan teknis,
Then sistem menolak unggahan dan menampilkan alasan.

Catatan teknis short video (saran awal, dapat diubah di konfigurasi platform):

- Format: MP4 (H.264/AAC) atau WebM.
- Durasi: ≤ 60 detik.
- Ukuran: ≤ 20 MB.
- Rasio: 9:16 (disarankan), dukung letterboxing untuk rasio lain.
- Moderasi: otomatis dasar (ukuran/durasi/format) + manual oleh admin untuk konten yang di‑flag.

6.13 1‑click Reorder

- Given customer memiliki riwayat pesanan,
When memilih 1‑click reorder,
Then sistem mengisi paket, alamat, dan preferensi sebelumnya, dan langsung menuju ringkasan checkout untuk konfirmasi.

## 7. Data Kunci

- Entitas: User, Address, Vendor, MenuItem, MenuCalendar, Subscription, SubscriptionDay, Delivery, Order, Payment, Refund, Review, Zone, PackageQuota.
- Field penting: cutoff_at (platform‑level), delivery_window, area_zone, fee_platform (Rp5.000), commission_rate, vendor_tier.

## 8. Non‑Fungsional (target)

- Performa: listing TTFB < 2s; checkout < 3s.
- Keandalan: 99.5% uptime jalur checkout; idempotency pada webhook pembayaran.
- Observabilitas: request‑id, log terstruktur, dashboard error/latensi.
- Keamanan/Privasi: UU PDP, PCI SAQ A (tanpa simpan data kartu), least privilege untuk data pribadi.

## 9. Out‑of‑Scope (MVP)

- Auto‑renewal/dompet, integrasi kurir pihak ketiga, optimisasi rute otomatis, loyalty/referral kompleks, BOM/analitik mendalam.

## 10. Dependensi & Risiko

- Gateway pembayaran (Midtrans/Xendit), pengiriman notifikasi (email/push/WA), keakuratan zona alamat, edukasi cutoff H‑1.

## 11. Monitoring KPI

- Active subscribers mingguan, on‑time delivery rate, D30 repurchase, complaint rate, take rate bersih, conversion ke Premium.

## 12. Payout & Settlement Policy

- Mekanisme: Split disbursement di payment gateway memisahkan bagian platform dan mitra secara real‑time; pencairan ke rekening bank mengikuti jadwal settlement T+.
- Jadwal:
    - Free: T+3 hari kerja; batch mingguan (default Senin). Minimum payout Rp200.000. Biaya transfer Rp4.000/transfer.
    - Premium: T+1 hari kerja; otomatis harian. Minimum payout Rp100.000. 1 on‑demand payout gratis per hari (berikutnya Rp4.000/transfer).
- Perhitungan:
    - commission = rate × food_subtotal (exclude ongkir/pajak)
    - platform_take = commission + platform_fee (tax‑inclusive)
    - vendor_take_before_mdr = (food_subtotal − commission) + shipping
    - vendor_settlement = vendor_take_before_mdr − mdr_amount
- Laporan: portal mitra menampilkan rincian order, komisi, platform fee, PPN komisi/SaaS, MDR, dan status payout; dukung export CSV.

## 13. SLA Pengantaran (Ringkas)

- Delivery windows: minimal 2 slot (contoh: 10–12, 12–14). Dapat dikonfigurasi per vendor di masa depan.
- Toleransi keterlambatan: 30 menit dari akhir window (tanpa sanksi platform; angka dapat diperbarui di PRD bila perlu).
- Pelaporan: Vendor wajib menandai status out‑for‑delivery dan delivered; kegagalan kirim harus disertai alasan.
- Kompensasi: tidak ada kompensasi finansial dari platform; vendor dapat menawarkan resolusi sukarela ke customer.

## 14. Refund & Sengketa (Ringkas)

- Kebijakan: platform tidak memproses refund. Penyelesaian masalah dilakukan langsung antara customer dan mitra (vendor‑led resolution). Platform memfasilitasi mediasi dan komunikasi.
- Bukti (untuk mediasi): foto produk/kemasan/label waktu, deskripsi masalah, waktu kejadian.
- Opsi resolusi: penggantian menu/hari atau voucher dari mitra (opsional, di luar platform).
6.16 Durasi Paket (Configurable)
- Given vendor membuat/mengedit paket,
When mengisi durasi hari yang tidak valid (bukan bilangan bulat positif atau di luar guardrail platform),
Then sistem menolak penyimpanan dan menampilkan batasan yang berlaku.
- 6.17 Konfigurasi Ongkir di Catering Settings
- Given vendor mengubah ongkir per area di Catering Settings,
When perubahan disimpan,
Then nilai ongkir baru digunakan untuk checkout berikutnya dan tidak perlu pengaturan di level produk.

6.18 Resolusi Ongkir di Checkout

- Given customer mengisi alamat,
When alamat berada pada area yang dicakup vendor,
Then sistem mengambil ongkir dari Catering Settings vendor untuk area tersebut dan menampilkannya sebagai ongkir final di checkout.
- Given alamat berada di luar cakupan area vendor,
When checkout,
Then sistem memblokir checkout dan meminta customer mengganti alamat atau memilih vendor lain.