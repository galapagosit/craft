package middlewares

import (
	"github.com/ipfans/echo-session"
	"github.com/labstack/echo"
	"net/http"
)

var excludes = []string{"/register", "/login"}

func contains(slice []string, item string) bool {
	set := make(map[string]struct{}, len(slice))
	for _, s := range slice {
		set[s] = struct{}{}
	}
	_, ok := set[item]
	return ok
}

func Auth(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		session := session.Default(c)
		is_login := session.Get("is_login")
		if is_login == true || contains(excludes, c.Path()) {
			return next(c)
		} else {
			return c.Redirect(http.StatusMovedPermanently, "/login")
		}
	}
}
