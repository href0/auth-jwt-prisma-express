# Auth Multirole JWT Prisma Express

REST API yang dibangun menggunakan stack teknologi Auth Multirole JWT Prisma Express.

## Fitur Utama

- **Autentikasi JWT**: Implementasi autentikasi berbasis token (JWT) untuk mengelola akses pengguna ke sumber daya tertentu.
- **Prisma ORM**: Menggunakan Prisma untuk menyederhanakan interaksi dengan database dan mengelola model data.
- **Sistem Otorisasi Multirole**: Memberikan kemampuan bagi pengguna untuk memiliki peran yang berbeda dengan akses terbatas sesuai peran yang diberikan.
- **Express Framework**: Menerapkan Express sebagai kerangka kerja untuk menangani rute API dan permintaan dari klien.

## Konfigurasi Lingkungan (.env)

Proyek ini membutuhkan file `.env` untuk konfigurasi. Berikut langkah-langkah untuk membuat file `.env` dan mengisi variabel yang diperlukan:

1. Buat file baru bernama `.env` di root proyek Anda.

2. Isi file `.env` dengan variabel yang diperlukan:

    ```dotenv
    # PORT
    PORT = 3000
    
    # Atur lingkungan proyek (development, production, testing, dsb.)
    NODE_ENV = development

     # Atur database anda di sini
    DATABASE_URL = "mysql://username:password@localhost:3306/dbname"

    # Masukkan access token Anda di sini
    ACCESS_TOKEN_SECRET = your_access_token_value

    # Masukkan refresh token Anda di sini
    REFRESH_TOKEN_SECRET = your_refresh_token_value

     # Masukkan access token expired Anda di sini
    ACCESS_TOKEN_EXPIRED = 1d # 1 hari

     # Masukkan refresh token expired Anda di sini
    REFRESH_TOKEN_EXPIRED = 30d # 30 hari

     # Masukkan refresh token expired Anda di sini
    COOKIE_EXPIRED = 30 # 30 hari (harus sama dengan REFRESH_TOKEN_EXPIRED)
    
    ```

Pastikan untuk mengganti `your_access_token_value` dan `your_refresh_token_value` dan  dengan nilai token yang sebenarnya yang Anda gunakan dalam proyek Anda.


## Cara Menggunakan

Ikuti langkah-langkah di bawah ini untuk mulai menggunakan proyek ini:

1. **Install Dependencies**
    Jalankan perintah berikut untuk menginstal semua dependensi:

    ```bash
    npm install
    ```

2. **Prisma Migration**
    Lakukan migrasi Prisma dengan menjalankan perintah:

    ```bash
    npx prisma migrate dev --name init
    ```

3. **Prisma Seed**
    Lakukan seeder Prisma dengan menjalankan perintah:

    ```bash
    npx prisma db seed
    ```

    Ini diperlukan untuk memberikan data awal seperti user dan role, bisa anda cek di `prisma/seed.js`

4. **Jalankan Aplikasi**
    Setelah semua selesai, anda bisa menjalankan aplikasi dengan menjalankan perintah : 

    ```bash
    npx run start
    ```





    