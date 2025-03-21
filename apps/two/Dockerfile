# Stage 1: Dependencies installation
FROM docker.io/node:lts-alpine as deps
RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install --only=production

# Stage 2: Build
FROM docker.io/node:lts-alpine as builder
WORKDIR /usr/src/app

# Copy package files and install all dependencies, including devDependencies
COPY . ./
RUN npm install

# Run the build command
RUN npx nx run-many -t build


# Stage 3: Production
FROM docker.io/node:lts-alpine as production
RUN apk add --no-cache dumb-init

ENV NODE_ENV production
ENV PORT 3000
ENV HOST 0.0.0.0
ENV NEXT_TELEMETRY_DISABLED 1

WORKDIR /app

# Add system user for security
RUN addgroup --system two && \
    adduser --system -G two two

# Copy built files from the builder stage
COPY --from=builder /usr/src/app/dist/apps/two ./two/

# Set permissions for the `two` user
RUN chown -R two:two ./two

# Install production dependencies
WORKDIR /app/two
RUN npm install --omit=dev --production

# Switch to the non-root user
USER two

# Start the app
CMD [ "node", "." ]
