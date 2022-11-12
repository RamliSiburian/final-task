package Handlers

import (
	"encoding/json"
	consultDto "halloCorona/Dto/Consultation"
	Dto "halloCorona/Dto/Result"
	"halloCorona/Models"
	"halloCorona/Repositories"
	"net/http"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/gorilla/mux"
)

type handlerconsult struct {
	ConsultRepository Repositories.ConsultRepository
}

func HandlerConsult(ConsultRepository Repositories.ConsultRepository) *handlerconsult {
	return &handlerconsult{ConsultRepository}
}

func (h *handlerconsult) FindConsult(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	consults, err := h.ConsultRepository.FindConsult()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := Dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := Dto.SuccessResult{Code: http.StatusOK, Data: consults}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerconsult) CreateConsult(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	userId := int(userInfo["id"].(float64))

	request := new(consultDto.ConsultRequest)
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := Dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := Dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	consult := Models.Consultation{
		Fullname:         request.Fullname,
		Phone:            request.Phone,
		BornDate:         request.BornDate,
		Age:              request.Age,
		Height:           request.Height,
		Weight:           request.Weight,
		Gender:           request.Gender,
		Subject:          request.Subject,
		LiveConsultation: request.LiveConsultation,
		Description:      request.Description,
		UserID:           userId,
	}

	data, err := h.ConsultRepository.CreateConsult(consult)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := Dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}

	w.WriteHeader(http.StatusOK)
	response := Dto.SuccessResult{Code: http.StatusOK, Data: data}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerconsult) GetConsult(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	var consult Models.Consultation
	consult, err := h.ConsultRepository.GetConsult(id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := Dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := Dto.SuccessResult{Code: http.StatusOK, Data: consult}
	json.NewEncoder(w).Encode(response)
}
