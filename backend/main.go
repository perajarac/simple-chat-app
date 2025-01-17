package main

import (
	"log"
	"net/http"
)

func main() {
	// Set the server to listen on port 8080
	setupAPI()
	log.Println("Server started at http://127.0.0.1:8080")
	if err := http.ListenAndServe("0.0.0.0:8080", nil); err != nil {
		log.Fatal(err)
	}
}

func setupAPI() {
	manager := NewManager()
	//http.Handle("/", http.RedirectHandler("/inital.html", http.StatusFound))

	http.Handle("/", http.FileServer(http.Dir("../frontend")))
	http.HandleFunc("/ws", manager.serveWS)
}
