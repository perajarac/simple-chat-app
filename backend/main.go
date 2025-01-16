package main

import (
	"log"
	"net/http"
)

func main() {
	// Set the server to listen on port 8080
	setupAPI()
	log.Println("Server started at http://localhost:8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}
}

func setupAPI() {
	manager := NewManager()
	http.Handle("/", http.FileServer(http.Dir("../frontend")))
	http.HandleFunc("/ws", manager.serveWS)
}
