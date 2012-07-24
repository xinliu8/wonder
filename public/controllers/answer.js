var answer = exports;

answer.postAnswer = function(req, res) {
	var qId = req.params.qId;
	console.log(req.body.answer);
    res.redirect('back');
};