package main

import (
	frontend "SimpleEditor/front-end"
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/filesystem"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {
	port := ":8080"
	app := fiber.New()
	app.Use(logger.New())
	//router := http.NewServeMux()
	//f := frontend.Export()

	//stack := middlaware.CreateStack(
	//	middlaware.LoggerMiddlaware,
	//)

	//v1 := stack(api.V1())

	//router.Handle("/", stack(http.FileServer(f)))
	//router.Handle("GET /", stack(http.HandlerFunc(frontend.HandleFrontEnd)))
	//router.Handle("GET /api/V1/*", v1)
	//router.Handle("POST /api/V1/*", v1)
	app.Use("/", filesystem.New(filesystem.Config{
		Root:         frontend.Export(),
		NotFoundFile: "index.html",
	}))
	fmt.Printf("Server runnig on port %s\n", port)
	log.Fatal(app.Listen(port))
}
