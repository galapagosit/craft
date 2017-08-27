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
	Email    string `form:"email" validate:"required,email" json:"email"`
	Password string `form:"password" validate:"required" json:"password"`
}

type SignupForm struct {
	UserForm
	PasswordConfirm string `form:"password_confirm" validate:"required" json:"password_confirm"`
}

type SignupResult struct {
	Result string `json:"result"`
	Error string `json:"error"`
}

func Signup(c echo.Context) (err error) {
	cc := c.(*middlewares.CustomContext)
	session := session.Default(c)

	signupForm := new(SignupForm)
	if err = c.Bind(signupForm); err != nil {
		return
	}

	if err = c.Validate(signupForm); err != nil {
		return
	}

	if signupForm.Password != signupForm.PasswordConfirm {
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(signupForm.Password), bcrypt.DefaultCost)
	if err != nil {
		panic(err)
	}
	user := &models.User{Email: signupForm.Email, HashedPassword: string(hashedPassword)}
	cc.Db.Create(user)
	session.Set("user_id", user.ID)
	session.Save()

	return c.JSON(http.StatusOK, SignupResult{
		Result: "ok",
	})
}

func Login(c echo.Context) (err error) {
	cc := c.(*middlewares.CustomContext)
	session := session.Default(c)

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
		return c.JSON(http.StatusOK, SignupResult{
			Result: "ng",
		})
	} else {
		session.Set("user_id", user.ID)
		session.Save()
		return c.JSON(http.StatusOK, SignupResult{
			Result: "ok",
		})
	}
}

func Logout(c echo.Context) (err error) {
	session := session.Default(c)
	session.Delete("user_id")
	session.Save()
	return c.Redirect(http.StatusMovedPermanently, "/login")
}
