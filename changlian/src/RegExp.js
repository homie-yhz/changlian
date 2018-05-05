export default {
	account:/^[0-9a-zA-Z]{8,}$/,
	phone:/^[0-9]{11}$/,
	pwd:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
	identifyCode:/^[0-9]{4,6}$/,
	num:/^[0-9]+$/
}