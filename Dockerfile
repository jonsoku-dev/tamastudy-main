FROM node:18.15.0  AS base
RUN echo "base"

# BASE IMAGE
FROM base AS builder
RUN echo "builder"

# Set working directory
WORKDIR /usr/app

# Copy project files
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig*.json ./

# Install pnpm package manager and project dependencies
RUN npm install -g pnpm @nrwl/cli nx
RUN pnpm install

RUN pnpm nx --help

# Copy project files and build
COPY . .

RUN pnpm nx --help

RUN npx prisma generate

RUN pnpm nx run main:build:production

## Copy project files and dependencies from base image
#
## Expose the port for the application
#EXPOSE 3000
#
##USER node
#
## Start the application with the custom command
##CMD [ "pm2-runtime", "start", "npm", "--", "serve:main:prod" ]
#CMD ["npm", "run", "nx", "run", "main:serve:production"]

# BASE IMAGE
FROM base AS runner
ARG APP=main
RUN echo "runner"

ENV NODE_ENV=production

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

USER nextjs

## Set working directory
WORKDIR /usr/app

COPY --from=builder --chown=nextjs:nodejs /usr/app/apps/${APP}/public/ ./apps/${APP}/public/

COPY --from=builder --chown=nextjs:nodejs /usr/app/dist/apps/${APP}/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /usr/app/dist/apps/${APP}/.next/static ./dist/apps/${APP}/.next/static

# Uncomment the following line to disable telemetry at run time
# ENV NEXT_TELEMETRY_DISABLED 1

# Note: Don't expose ports here, Compose will handle that for us

CMD ["node", "apps/main/server.js"]
