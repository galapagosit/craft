package handlers

import (
	"github.com/labstack/echo"
	"net/http"
	"../middlewares"
	"github.com/galapagosit/craft/models"
)

func CreateUser(c echo.Context) (err error){
	cc := c.(*middlewares.CustomContext)
	user := new(models.User)
	if err = c.Bind(user); err != nil {
		return
	}
	if err = c.Validate(user); err != nil {
		return
	}
	u := cc.Db.Create(&user)
	return c.JSON(http.StatusCreated, u)
}

func GetUser(c echo.Context) error {
	cc := c.(*middlewares.CustomContext)
	var user models.User
	cc.Db.First(&user, c.Param("id"))
	return c.JSON(http.StatusOK, user)
}
