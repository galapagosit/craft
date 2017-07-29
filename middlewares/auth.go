package middlewares

import (
	"github.com/ipfans/echo-session"
	"github.com/labstack/echo"
	"net/http"
	"strings"
)

var excludes = []string{
	"/static",
	"/dist",
	"/register",
	"/login",
}

func Auth(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		session := session.Default(c)
		is_login := session.Get("is_login")
		if is_login == true {
			return next(c)
		}

		for _, v := range excludes {
			if strings.HasPrefix(c.Path(), v) {
				return next(c)
			}
		}

		return c.Redirect(http.StatusMovedPermanently, "/login")
	}
}
