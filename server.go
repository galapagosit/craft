package main

import (
	"./handlers"
	"./middlewares"
	"./models"
	"fmt"
	"github.com/go-playground/validator"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"github.com/spf13/viper"
	"github.com/ipfans/echo-session"
	"net/http"
	"os"
)

func setConfigs() {
	viper.SetConfigName("config")
	viper.AddConfigPath("./settings")
	err := viper.ReadInConfig()
	if err != nil {
		panic(fmt.Errorf("Fatal error config file: %s \n", err))
	}
}

func setModels() {
	db, err := gorm.Open("postgres", viper.GetString("db.args"))
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()

	// Migrate the schema
	db.AutoMigrate(&models.User{})
}

func setRoutes(e *echo.Echo) {
	e.GET("/", func(c echo.Context) error {
		return c.Render(http.StatusOK, "index", "World")
	})

	e.POST("/signup", handlers.Signup)
	e.POST("/login", handlers.Login)
	e.POST("/logout", handlers.Logout)
}

type CustomValidator struct {
	validator *validator.Validate
}

func (cv *CustomValidator) Validate(i interface{}) error {
	return cv.validator.Struct(i)
}

func main() {
	e := echo.New()
	e.Debug = os.Getenv("DEBUG") == "1"

	setConfigs()
	setModels()
	setRoutes(e)

	e.Validator = &CustomValidator{validator: validator.New()}

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	}))

	store, err := session.NewPostgresStore(viper.GetString("db.args"), []byte("uekjdakjnc"))
	if err != nil {
		panic(err)
	}
	e.Use(session.Sessions("GSESSION", store))

	e.Use(middlewares.DbSession)
	e.Use(middlewares.Auth)

	if e.Debug {
		e.Static("/dist", "front/dist")
		e.Static("/static", "front/static")
	}

	e.Logger.Fatal(e.Start(":1323"))
}
