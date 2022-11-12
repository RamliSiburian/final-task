package consultDto

type ConsultRequest struct {
	Fullname         string `json:"fullname" form:"fullname" gorm:"type: varchar(255)" validate:"required"`
	Phone            string `json:"phone" form:"phone" gorm:"type: varchar(255)" validate:"required"`
	BornDate         string `json:"born_date" `
	Age              int    `json:"age" form:"age" validate:"required"`
	Height           int    `json:"height" form:"height" validate:"required"`
	Weight           int    `json:"weight" form:"weight" validate:"required"`
	Gender           string `json:"gender" form:"gender" gorm:"type: varchar(255)" validate:"required"`
	Subject          string `json:"subject" form:"subject" gorm:"type: varchar(255)" validate:"required"`
	LiveConsultation string `json:"live_consultation" `
	Description      string `json:"description" gorm:"type:text" form:"description" validate:"required"`
	UserID           int    `json:"user_id" form:"user_id"`
}
																																						