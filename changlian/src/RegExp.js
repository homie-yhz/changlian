export default {
	account:/^[0-9a-zA-Z]{8,}$/,
	phone:/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
	pwd:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
	identifyCode:/^[0-9]{4,6}$/,
	IDCard:/^[0-9a-zA-Z]+$/
}