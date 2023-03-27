install:
	npm i

start:
	node main/index.js

start-production:
	NODE_ENV=production node main/index.js

build:
	npx vite build
	npx vite build --outDir dist/server --ssr src/main/entry-server.jsx

analyze-bundle:
	ANALYZE=true npx vite build

lint:
	npx tsc
