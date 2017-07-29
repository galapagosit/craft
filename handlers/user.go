package handlers

import (
	"../middlewares"
	"github.com/galapagosit/craft/models"
	"github.com/ipfans/echo-session"
	"github.com/labstack/echo"
	"golang.org/x/crypto/bcrypt"
	"net/http"
)

type UserForm struct {
	Email    string `form:"email" validate:"required,email"`
	Password string `form:"password" validate:"required"`
}

type RegisterForm struct {
	UserForm
	PasswordConfirm string `form:"password_confirm" validate:"required"`
}

func Register(c echo.Context) (err error) {
	cc := c.(*middlewares.CustomContext)
	session := session.Default(c)
	if c.Request().Method == "POST" {
		registerForm := new(RegisterForm)
		if err = c.Bind(registerForm); err != nil {
			return
		}
		if err = c.Validate(registerForm); err != nil {
			return
		}

		if registerForm.Password != registerForm.PasswordConfirm {
			return
		}

		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(registerForm.Password), bcrypt.DefaultCost)
		if err != nil {
			panic(err)
		}
		cc.Db.Create(&models.User{Email: registerForm.Email, HashedPassword: string(hashedPassword)})
		session.Set("is_login", true)
		session.Save()
		return c.Redirect(http.StatusMovedPermanently, "/")
	} else {
		return c.Render(http.StatusOK, "register", nil)
	}
}

func Login(c echo.Context) (err error) {
	cc := c.(*middlewares.CustomContext)
	session := session.Default(c)
	if c.Request().Method == "POST" {
		userForm := new(UserForm)
		if err = c.Bind(userForm); err != nil {
			return
		}
		if err = c.Validate(userForm); err != nil {
			return
		}

		var user models.User
		var count = 0
		cc.Db.First(&user, &models.User{Email: userForm.Email}).Count(&count)
		if count == 0 {
			return c.Render(http.StatusOK, "login", nil)
		}

		err = bcrypt.CompareHashAndPassword([]byte(user.HashedPassword), []byte(userForm.Password))
		if err != nil {
			return c.Render(http.StatusOK, "login", nil)
		} else {
			session.Set("is_login", true)
			session.Save()
			return c.Redirect(http.StatusMovedPermanently, "/")
		}
	} else {
		return c.Render(http.StatusOK, "login", nil)
	}
}

func Logout(c echo.Context) (err error) {
	session := session.Default(c)
	session.Delete("is_login")
	session.Save()
	return c.Redirect(http.StatusMovedPermanently, "/login")
}
