package main

import (
	"SimpleEditor/cmd/api"
	"SimpleEditor/cmd/middlaware"
	frontend "SimpleEditor/front-end"
	"fmt"
	"log"
	"net/http"
)

func main() {
	port := ":8080"
	router := http.NewServeMux()
	//f := frontend.Export()

	stack := middlaware.CreateStack(
		middlaware.LoggerMiddlaware,
	)

	v1 := stack(api.V1())

	//router.Handle("/", stack(http.FileServer(f)))
	router.Handle("GET /", stack(http.HandlerFunc(frontend.HandleFrontEnd)))
	router.Handle("GET /api/V1/*", v1)
	router.Handle("POST /api/V1/*", v1)

	fmt.Printf("Server runnig on port %s\n", port)
	if err := http.ListenAndServe(":8080", router); err != nil {
		log.Fatal(err)
	}
}
