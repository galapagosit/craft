package models

import (
	"github.com/jinzhu/gorm"
)

type User struct {
	gorm.Model
	Email string `gorm:"unique_index" json:"email"`
	HashedPassword string
}