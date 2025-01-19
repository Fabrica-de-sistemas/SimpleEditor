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

// Export returns an http.FileSystem that serves the files from the embedded
// filesystem FrontEndFiles, rooted at the directory specified by the dist variable.
// If there is an error accessing the subdirectory, the function logs the error
// and terminates the program.
func Export() (f http.FileSystem) {
	tmp, err := fs.Sub(FrontEndFiles, dist)
	if err != nil {
		log.Fatal(err)
	}

	f = http.FS(tmp)
	return
}

// HandleFrontEnd handles HTTP requests for the front-end files.
// It attempts to open the requested file from the FrontEndFiles.
// If the file does not exist, it serves the "index.html" file instead.
// If any error occurs while reading "index.html", it responds with a Bad Request status.
// If the requested file is found, it serves the file using http.FileServer.
// Parameters:
// - w: http.ResponseWriter to write the response.
// - r: *http.Request containing the request information.
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
