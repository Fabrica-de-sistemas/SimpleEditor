package frontend

import (
	"embed"
	"io/fs"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

//go:embed all:dist/*
var FrontEndFiles embed.FS

const dist = "dist"

func Export() (f http.FileSystem) {
	tmp, err := fs.Sub(FrontEndFiles, dist)
	if err != nil {
		log.Fatal(err)
	}

	f = http.FS(tmp)
	return
}

func HandleFrontEnd(w http.ResponseWriter, r *http.Request) {
	f, err := FrontEndFiles.Open(filepath.Join(dist, r.URL.Path))

	if os.IsNotExist(err) {
		index, err := FrontEndFiles.ReadFile(filepath.Join(dist, "index.html"))
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
		}

		w.WriteHeader(http.StatusAccepted)
		w.Write(index)
		return
	} else if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	defer f.Close()
	http.FileServer(Export()).ServeHTTP(w, r)
}
