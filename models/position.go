package models

import (
	"github.com/jinzhu/gorm"
	"database/sql"
)

type Position struct {
	gorm.Model
	User User
	UserID uint
	ParentPositionID sql.NullInt64
	Name string `json:"name" validate:"required"`
}
