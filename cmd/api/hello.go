package api

import (
	"net/http"
)

func handlerHello(w http.ResponseWriter, r *http.Request) {
	data := message{
		Message: "Hello!",
	}
	JsonResponse(data).ServeHTTP(w, r)
}
