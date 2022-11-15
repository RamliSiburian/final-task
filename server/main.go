package main

import (
	"fmt"
	"halloCorona/Databases"
	"halloCorona/Pkg/Mysql"
	"halloCorona/Routes"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()

	if err != nil {
		log.Fatal("error loading env file")
	}

	Mysql.DatabaseInit()
	Databases.Migration()

	r := mux.NewRouter()

	Routes.RouteInit(r.PathPrefix("/api/v1").Subrouter())
	r.PathPrefix("/Uploads").Handler(http.StripPrefix("/Uploads", http.FileServer(http.Dir("./Uploads"))))

	var port = os.Getenv("PORT")

	var AllowedHeaders = handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	var AllowedMethods = handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS", "PATCH", "DELETE"})
	var AllowedOrigins = handlers.AllowedOrigins([]string{"*"})

	fmt.Println("server running localhost:" + port)
	http.ListenAndServe("localhost:"+port, handlers.CORS(AllowedHeaders, AllowedMethods, AllowedOrigins)(r))

}
