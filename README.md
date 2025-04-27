# LocationDomain API

LocationDomain API, kullanıcı konumlarını ve alanlarını takip etmek için geliştirilmiş bir REST API'dir.

## Özellikler

- Konum yönetimi (oluşturma, güncelleme, silme, listeleme)
- Alan yönetimi (oluşturma, güncelleme, silme, listeleme)
- Log yönetimi (oluşturma, silme, listeleme)
- Swagger dokümantasyonu
- PostgreSQL veritabanı desteği

## Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. `.env` dosyasını düzenleyin:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=location_api
NODE_ENV=development
```

3. Uygulamayı başlatın:
```bash
npm run start:dev
```

## API Dokümantasyonu

Swagger dokümantasyonuna erişmek için:
```
http://localhost:3000/docs
```

