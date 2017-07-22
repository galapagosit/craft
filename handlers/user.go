package handlers

import (
	"github.com/labstack/echo"
	"net/http"
	"../middlewares"
	"github.com/galapagosit/craft/models"
)

func CreateUser(c echo.Context) error {
	cc := c.(*middlewares.CustomContext)
	u := cc.Db.Create(&models.User{Name: "name", Password: "pass"})
	return c.JSON(http.StatusCreated, u)
}

func GetUser(c echo.Context) error {
	cc := c.(*middlewares.CustomContext)
	var user models.User
	cc.Db.First(&user, c.Param("id"))
	return c.JSON(http.StatusOK, user)
}
