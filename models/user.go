package models

import (
	"github.com/jinzhu/gorm"
)

type User struct {
	gorm.Model
	Email string `form:"email" json:"email" validate:"required,email"`
	Password string `form:"password" validate:"required"`
}