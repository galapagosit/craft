package handlers

import (
	"../middlewares"
	"github.com/galapagosit/craft/models"
	"github.com/ipfans/echo-session"
	"github.com/labstack/echo"
	"golang.org/x/crypto/bcrypt"
	"net/http"
)

type userForm struct {
	Email    string `form:"email" validate:"required,email"`
	Password string `form:"password" validate:"required"`
}

func Register(c echo.Context) (err error) {
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

func Login(c echo.Context) (err error) {
	cc := c.(*middlewares.CustomContext)
	session := session.Default(c)
	if c.Request().Method == "POST" {
		userForm := new(userForm)
		if err = c.Bind(userForm); err != nil {
			return
		}
		if err = c.Validate(userForm); err != nil {
			return
		}

		var user models.User
		cc.Db.First(&user, &models.User{Email: userForm.Email})

		err = bcrypt.CompareHashAndPassword([]byte(user.HashedPassword), []byte(userForm.Password))
		if err != nil {
			return c.Render(http.StatusOK, "login", "World")
		} else {
			session.Set("is_login", true)
			session.Save()
			return c.Redirect(http.StatusMovedPermanently, "/")
		}
	} else {
		return c.Render(http.StatusOK, "login", "World")
	}
}
