npmbuild:
	npm install --prefix ./front-end
	npm audit fix --prefix front-end
	npm run build --prefix ./front-end
npmoffline:
	npm run build --prefix ./front-end
live:
	npm run dev --prefix ./front-end
godependencies:
	go get github.com/gofiber/fiber/v2
	go mod tidy
build: npmbuild godependencies
	go build -o bin/SimpleEditor ./cmd/main.go
gobuild: npmbuild godependencies
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o bin/SimpleEditor ./cmd/main.go
winbuild: npmbuild godependencies
	CGO_ENABLED=0 GOOS=windows GOARCH=amd64 go build -o bin/SimpleEditor.exe ./cmd/main.go
run: build
	./bin/SimpleEditor
go: gobuild
	./bin/SimpleEditor
gooffline: npmoffline
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o bin/SimpleEditor ./cmd/main.go
offline: gooffline
	./bin/SimpleEditor