package main

import (
	"log"

	"github.com/gorilla/websocket"
)

type ClientList map[*Client]bool

type Client struct {
	connection *websocket.Conn
	manager    *Manager
	egress     chan []byte
}

func NewClient(conn *websocket.Conn, manager *Manager) *Client {
	return &Client{
		connection: conn,
		manager:    manager,
		egress:     make(chan []byte),
	}
}

func (c *Client) readMessages() {
	defer func() {
		log.Println("Removing from read")
		c.manager.removeClient(c)
	}()
	for {
		_, payload, err := c.connection.ReadMessage()

		if err != nil {
			log.Printf("error reading message: %v", err)
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error reading message: %v", err)
			}
			break
		}

		log.Println(string(payload))
		go c.manager.Broadcast(string(payload))

	}
}

func (c *Client) writeMessages() {
	defer func() {
		log.Println("Removing from write")
		c.manager.removeClient(c)
	}()

	for {
		select {
		case message, ok := <-c.egress:
			if !ok {
				if err := c.connection.WriteMessage(websocket.TextMessage, nil); err != nil {
					log.Println("connection closed: ", err)
				}
				return
			}
			//2 same message in chanell so poping one
			if err := c.connection.WriteMessage(websocket.TextMessage, message); err != nil {
				log.Printf("failed to send message: %v\n", err)
			}

			log.Println("msg sent")
		}
	}
}
