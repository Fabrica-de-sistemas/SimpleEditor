package api

import (
	"net/http"
)

func handlerLogin(w http.ResponseWriter, r *http.Request) {
	buffer := make([]byte, 0, 1024)
	if _, err := r.Body.Read(buffer); err != nil {
		data := errMessage{ErrMessage: "too long"}
		w.WriteHeader(http.StatusBadRequest)
		JsonResponse(data).ServeHTTP(w, r)
		defer r.Body.Close()
		return
	}
	data := message{Message: "ok"}
	JsonResponse(data).ServeHTTP(w, r)
	defer r.Body.Close()
	return
}
