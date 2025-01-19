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
	app.Use("/", filesystem.New(filesystem.Config{
		Root:         frontend.Export(),
		NotFoundFile: "index.html",
	}))
	fmt.Printf("Server running on port %s\n", port)
	log.Fatal(app.Listen(port))
}