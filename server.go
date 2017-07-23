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
	"html/template"
	"io"
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
		session := session.Default(c)
		session.Set("count", "100")
		session.Save()
		return c.Render(http.StatusOK, "index", "World")
	})

	e.POST("/users", handlers.CreateUser)
	e.GET("/users/:id", handlers.GetUser)
}

type CustomValidator struct {
	validator *validator.Validate
}

func (cv *CustomValidator) Validate(i interface{}) error {
	return cv.validator.Struct(i)
}

type Template struct {
	templates *template.Template
}

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.templates.ExecuteTemplate(w, name, data)
}

func main() {
	e := echo.New()
	e.Debug = os.Getenv("DEBUG") == "1"

	setConfigs()
	setModels()
	setRoutes(e)

	t := &Template{
		templates: template.Must(template.ParseGlob("front/*.html")),
	}
	e.Renderer = t

	e.Validator = &CustomValidator{validator: validator.New()}

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	store, err := session.NewPostgresStore(viper.GetString("db.args"), []byte("secret"))
	if err != nil {
		panic(err)
	}
	e.Use(session.Sessions("GSESSION", store))

	e.Use(middlewares.DbSession)

	if e.Debug {
		e.Static("/dist", "front/dist")
		e.Static("/static", "front/static")
	}

	e.Logger.Fatal(e.Start(":1323"))
}
