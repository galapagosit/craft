package middlewares

import (
	"github.com/labstack/echo"
	"github.com/jinzhu/gorm"
	"github.com/galapagosit/craft/models"
)

type CustomContext struct {
	echo.Context
	Db *gorm.DB
	User *models.User
}
