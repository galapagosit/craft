package handlers

import (
	"github.com/labstack/echo"
	"net/http"
	"../middlewares"
	"github.com/galapagosit/craft/models"
	"golang.org/x/crypto/bcrypt"
)

type userForm struct {
	Email string `form:"email" validate:"required,email"`
	Password string `form:"password" validate:"required"`
}

func CreateUser(c echo.Context) (err error){
	cc := c.(*middlewares.CustomContext)
	userForm := new(userForm)
	if err = c.Bind(userForm); err != nil {
		return
	}
	if err = c.Validate(userForm); err != nil {
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(userForm.Password), bcrypt.DefaultCost)
	if err != nil {
		panic(err)
	}
	u := cc.Db.Create(&models.User{Email: userForm.Email, HashedPassword: string(hashedPassword)})
	return c.JSON(http.StatusCreated, u)
}

func Login(c echo.Context) error {
	cc := c.(*middlewares.CustomContext)
	var user models.User
	cc.Db.First(&user, c.Param("id"))
	return c.JSON(http.StatusOK, user)
}
