package middlewares

import (
	"github.com/labstack/echo"
	"github.com/jinzhu/gorm"
	"github.com/spf13/viper"
)

func DbSession(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		db, err := gorm.Open("postgres", viper.GetString("db.args"))
		if err != nil {
			panic("failed to connect database")
		}
		defer db.Close()
		cc := &CustomContext{c, db}
		return next(cc)
	}
}