# 1. Bazujemy na oficjalnym obrazie Microsoftu (wersja musi pasować do Twojej wersji Playwright w package.json!)
# FROM mcr.microsoft.com/playwright:v1.57.0-jammy

# # 2. Ustawiamy katalog roboczy wewnątrz kontenera
# WORKDIR /app

# # 3. NAJWAŻNIEJSZE: Kopiujemy tylko pliki definicji zależności
# COPY package.json package-lock.json ./

# # 4. Instalujemy zależności (korzystamy z cache'owania warstw)
# RUN npm ci

# # 5. Kopiujemy resztę kodu źródłowego
# COPY . .

# # 6. Domyślna komenda (można ją nadpisać przy uruchomieniu)
# # Uruchamiamy testy
# CMD ["npx", "playwright", "test"]

# ==========================================
# STAGE 1: BUILDER (Kuchnia - tu się bałagani)
# ==========================================
FROM mcr.microsoft.com/playwright:v1.50.0-jammy AS builder

WORKDIR /app

# 1. Kopiujemy pliki konfiguracyjne
COPY package.json package-lock.json ./

# 2. Instalujemy WSZYSTKIE zależności (również devDependencies)
# Używamy 'npm ci' dla szybkości i powtarzalności
RUN npm ci

# 3. Kopiujemy kod źródłowy
COPY . .

# (Opcjonalnie) Tutaj moglibyśmy zrobić np. 'npm run build' jeśli używałbyś TS w trybie kompilacji
# Ale Playwright radzi sobie z TS w locie, więc idziemy dalej.


# ==========================================
# STAGE 2: RUNNER (Restauracja - tu jest czysto)
# ==========================================
FROM mcr.microsoft.com/playwright:v1.50.0-jammy AS runner

WORKDIR /app

# 4. Kopiujemy z Buildera TYLKO to, co niezbędne
# Kopiujemy folder node_modules (już zainstalowany)
COPY --from=builder /app/node_modules ./node_modules
# Kopiujemy pliki projektu (można tu użyć .dockerignore żeby wyciąć śmieci)
COPY --from=builder /app/package.json ./
COPY --from=builder /app/playwright.config.ts ./
COPY --from=builder /app/tests ./tests
COPY --from=builder /app/api ./api
COPY --from=builder /app/db ./db
COPY --from=builder /app/factories ./factories
COPY --from=builder /app/pages ./pages
COPY --from=builder /app/steps ./steps
COPY --from=builder /app/utils ./utils
# Nie kopiujemy np. folderu .git, plików .env (chyba że w .dockerignore), dokumentacji itp.

# 5. Domyślna komenda
CMD ["npx", "playwright", "test"]