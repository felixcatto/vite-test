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

lint:
	npx tsc
