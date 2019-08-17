//envio de respuestas

function Error(res,msg){
		return res.send({
			success: false,
			message: msg
		});
};

function Success(res,msg,data=''){
	return res.send({
		success: true,
		message: msg,
		data
	});
};

module.exports = {
	Error,
	Success
}
