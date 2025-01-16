package main

import (
	"log"
	"net/http"
)

func main() {
	// Serve static files from the frontend directory
	http.Handle("/", http.FileServer(http.Dir("../frontend")))
	// Set the server to listen on port 8080
	log.Println("Server started at http://localhost:8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}
}
