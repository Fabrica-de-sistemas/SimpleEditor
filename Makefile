npmbuild:
	npm install --prefix ./front-end
	npm audit fix --prefix front-end
	npm run build --prefix ./front-end
live:
	npm run dev --prefix ./front-end
build: npmbuild
	go build
gobuild: npmbuild
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o bin/SimpleEditor ./cmd/main.go
winbuild: npmbuild
	CGO_ENABLED=0 GOOS=windows GOARCH=amd64 go build -o bin/SimpleEditor.exe ./cmd/main.go
run: build
	./bin/SimpleEditor
go: gobuild
	./bin/SimpleEditor