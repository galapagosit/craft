package handlers

import "net/http"

import (
	"../middlewares"
	"github.com/galapagosit/craft/models"
	"github.com/labstack/echo"
)


func CreatePosition(c echo.Context) (err error) {
	cc := c.(*middlewares.CustomContext)
	position := new(models.Position)
	if err = c.Bind(position); err != nil {
		return
	}

	if err = c.Validate(position); err != nil {
		return
	}
	position.User = *cc.User
	cc.Db.Create(&position)
	return c.JSON(http.StatusOK, position)
}

func GetPositions(c echo.Context) error {
	cc := c.(*middlewares.CustomContext)
	positions := []models.Position{}
	cc.Db.Where(&models.Position{UserID: cc.User.ID}).Find(&positions)
	return c.JSON(http.StatusOK, positions)
}

//func getPosition(c echo.Context) error {
//	id, _ := strconv.Atoi(c.Param("id"))
//	return c.JSON(http.StatusOK, users[id])
//}

//func updatePosition(c echo.Context) error {
//	u := new(user)
//	if err := c.Bind(u); err != nil {
//		return err
//	}
//	id, _ := strconv.Atoi(c.Param("id"))
//	users[id].Name = u.Name
//	return c.JSON(http.StatusOK, users[id])
//}
//
//func deletePosition(c echo.Context) error {
//	id, _ := strconv.Atoi(c.Param("id"))
//	delete(users, id)
//	return c.NoContent(http.StatusNoContent)
//}
