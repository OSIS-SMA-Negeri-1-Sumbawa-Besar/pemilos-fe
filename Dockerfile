# syntax = docker/dockerfile:1

# Adjust BUN_VERSION as desired
ARG BUN_VERSION=1.1.38
FROM oven/bun:${BUN_VERSION}-slim AS base

LABEL fly_launch_runtime="Bun"

# Bun app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"


# Throw-away build stage to reduce size of final image
FROM base AS build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential pkg-config python-is-python3

# Install node modules
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy application code
COPY . .
# entrypoint.sh is also part of your application code, so it's here now at /app/entrypoint.sh in the build stage.

# Copy Prisma schema
COPY prisma ./prisma

# Generate Prisma client
RUN bun prisma generate

# Build application
RUN bun run build

# Remove development dependencies
RUN bun install --frozen-lockfile --production

# Final stage for app image
FROM base

COPY --from=build /app /app

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

RUN apt-get update -y && apt-get install -y openssl

EXPOSE 3000
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD [ "bun", "run", "start" ]