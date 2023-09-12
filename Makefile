prod:
	sudo docker compose -f docker-compose.yml -f docker-compose.start.yml up -d --build 
	sudo docker rmi $$(docker images -f "dangling=true" -q)

dev:
	pnpm i 
	cd ./packages/common && npx prisma generate && npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > ../../database/init/dev/01_init.sql && cd ../..
	sudo docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build  
	sudo docker rmi $$(docker images -f "dangling=true" -q)