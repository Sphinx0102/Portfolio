# Etapa de construcción
FROM node:20-slim AS builder

WORKDIR /app

# Actualizar sistema y dependencias mínimas
RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y --no-install-recommends dumb-init && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Crear usuario no-root
RUN useradd --create-home --shell /bin/bash app

# Copiar package.json y package-lock.json / instalar dependencias
COPY package*.json ./
RUN npm ci

# Copiar todo el código y construir
COPY . .

COPY .env .env

RUN npm run build

RUN rm -f .env

# Etapa de producción
FROM gcr.io/distroless/nodejs20-debian11

WORKDIR /app

# Copiar solo lo necesario de la etapa builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY server.js ./

EXPOSE 3000

USER nonroot:nonroot

# Arrancar usando node explícitamente
CMD [ "server.js" ]

