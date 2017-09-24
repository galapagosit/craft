package middlewares

import (
	"github.com/labstack/echo"
	"github.com/jinzhu/gorm"
	"github.com/spf13/viper"
	"os"
	"log"
)

func DbSession(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		db, err := gorm.Open("postgres", viper.GetString("db.args"))
		if err != nil {
			panic("failed to connect database")
		}
		defer db.Close()

		db.LogMode(true)
		db.SetLogger(log.New(os.Stdout, "\n", 0))

		cc := &CustomContext{c, db, nil}
		return next(cc)
	}
}