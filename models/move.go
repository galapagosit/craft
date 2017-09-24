package models

import (
	"github.com/jinzhu/gorm"
	"database/sql"
)

type Move struct {
	gorm.Model
	User User
	UserID uint
	Position Position `validate:"-"`
  PositionID sql.NullInt64 `validate:"required"`
	Name string `json:"name" validate:"required"`
}

