package models

import (
	"github.com/jinzhu/gorm"
)

type Position struct {
	gorm.Model
	User User
	UserID uint
	Name string `json:"name" validate:"required"`
}
