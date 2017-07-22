package middlewares

import (
	"github.com/labstack/echo"
	"github.com/jinzhu/gorm"
)

type CustomContext struct {
	echo.Context
	Db *gorm.DB
}
