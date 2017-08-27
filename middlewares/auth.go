package middlewares

import (
	"github.com/ipfans/echo-session"
	"github.com/labstack/echo"
	"net/http"
	"strings"
	"github.com/galapagosit/craft/models"
)

var excludes = []string{
	"/signup",
	"/login",
}

type Result struct {
	Error  string `json:"error"`
}

func Auth(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		for _, v := range excludes {
			if strings.HasPrefix(c.Path(), v) {
				return next(c)
			}
		}

		session := session.Default(c)
		user_id := session.Get("user_id")
		if user_id != nil {
			cc := c.(*CustomContext)
			var user models.User
			cc.Db.First(&user, user_id.(uint))
			cc.User = &user
			return next(c)
		}

		return c.JSON(http.StatusForbidden, Result{Error: "not authorized"})
	}
}
