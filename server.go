package main

import (
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"html/template"
	"io"
	"net/http"
	"os"
)

type Template struct {
	templates *template.Template
}

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.templates.ExecuteTemplate(w, name, data)
}

func main() {
	e := echo.New()
	e.Debug = os.Getenv("DEBUG") == "1";

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	t := &Template{
		templates: template.Must(template.ParseGlob("public/views/*.html")),
	}
	e.Renderer = t

	e.Static("/static", "assets")

	e.GET("/", func(c echo.Context) error {
		return c.Render(http.StatusOK, "index", "World")
	})
	e.Logger.Fatal(e.Start(":1323"))
}
