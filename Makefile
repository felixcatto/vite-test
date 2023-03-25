install:
	npm i

start:
	npx vite --port 3000

start-production:
	npx vite preview --port 3000

build:
	npx vite build

analyze-bundle:
	ANALYZE=true npx vite build

rollup-bundle:
	npx rollup -c

rollup-bundle-prod:
	NODE_ENV=production npx rollup -c

rollup-analyze:
	NODE_ENV=production ANALYZE=true npx rollup -c
	google-chrome dist/stats.html

lint:
	npx tsc
