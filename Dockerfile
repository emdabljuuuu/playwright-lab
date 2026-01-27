# 1. Bazujemy na oficjalnym obrazie Microsoftu (wersja musi pasować do Twojej wersji Playwright w package.json!)
FROM mcr.microsoft.com/playwright:v1.57.0-jammy

# 2. Ustawiamy katalog roboczy wewnątrz kontenera
WORKDIR /app

# 3. NAJWAŻNIEJSZE: Kopiujemy tylko pliki definicji zależności
COPY package.json package-lock.json ./

# 4. Instalujemy zależności (korzystamy z cache'owania warstw)
RUN npm ci

# 5. Kopiujemy resztę kodu źródłowego
COPY . .

# 6. Domyślna komenda (można ją nadpisać przy uruchomieniu)
# Uruchamiamy testy
CMD ["npx", "playwright", "test"]