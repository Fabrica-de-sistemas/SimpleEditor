package middlaware

import (
	"log"
	"net/http"
	"time"
)

type writeWrapper struct {
	http.ResponseWriter
	statusCode int
}

func (w *writeWrapper) WriteHeader(statusCode int) {
	w.ResponseWriter.WriteHeader(statusCode)
	w.statusCode = statusCode
}

func LoggerMiddlaware(root http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		wrapped := writeWrapper{ResponseWriter: w, statusCode: http.StatusOK}

		start := time.Now()
		root.ServeHTTP(&wrapped, r)
		end := time.Since(start)

		log.Printf("path: %q\tmethod: %q\tstatus: %d\tduration: %s", r.URL.Path, r.Method, wrapped.statusCode, end.String())
	})
}
