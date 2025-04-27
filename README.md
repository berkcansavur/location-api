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

2. Veritabanını oluşturun:
```bash
createdb location_api
```

3. `.env` dosyasını düzenleyin:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=location_api
NODE_ENV=development
```

4. Uygulamayı başlatın:
```bash
npm run start:dev
```

## API Dokümantasyonu

Swagger dokümantasyonuna erişmek için:
```
http://localhost:3000/api
```

## Test

```bash
# unit testler
npm run test

# e2e testler
npm run test:e2e

# test coverage
npm run test:cov
```

## Lisans

UNLICENSED
