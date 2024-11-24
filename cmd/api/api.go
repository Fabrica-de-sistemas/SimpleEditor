package api

import (
	"encoding/json"
	"net/http"
)

type message struct {
	Message string `json:"message"`
}

type errMessage struct {
	ErrMessage string `json:"error"`
}

func (e *errMessage) Error() string {
	return e.ErrMessage
}

func V1() http.Handler {
	api := http.NewServeMux()
	api.Handle("GET /hello", http.HandlerFunc(handlerHello))
	api.Handle("POST /login", http.HandlerFunc(handlerLogin))
	return http.StripPrefix("/api/V1", api)
}

func JsonResponse(data any) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")

		switch r.Method {
		case http.MethodPost:
			w.WriteHeader(http.StatusCreated)
		case http.MethodDelete:
			w.WriteHeader(http.StatusAccepted)
		default:
			w.WriteHeader(http.StatusOK)
		}

		err := json.NewEncoder(w).Encode(data)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	})
}
