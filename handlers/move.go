package handlers

import "net/http"

import (
	"github.com/galapagosit/craft/middlewares"
	"github.com/galapagosit/craft/models"
	"github.com/labstack/echo"
)


func CreateMove(c echo.Context) (err error) {
	cc := c.(*middlewares.CustomContext)
	move := new(models.Move)
	if err = c.Bind(move); err != nil {
		return
	}

	if err = c.Validate(move); err != nil {
		return
	}

	var position models.Position
	cc.Db.First(&position, 1)
	move.Position = position

	move.User = *cc.User
	cc.Db.Create(&move)
	return c.JSON(http.StatusOK, move)
}

func GetMoves(c echo.Context) error {
	cc := c.(*middlewares.CustomContext)
	moves := []models.Move{}
	cc.Db.Where(&models.Position{UserID: cc.User.ID}).Find(&moves)
	return c.JSON(http.StatusOK, moves)
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
