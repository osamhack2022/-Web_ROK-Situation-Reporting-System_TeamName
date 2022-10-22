const asyncHandler = require("express-async-handler");
const Reportsys = require("../models/reportsysModel");
const UnitM = require("../models/unitModel");
var mongoose = require('mongoose');

//@description     Create new reportsys
//@route           POST /api/reportsys
//@access          Protected(onlyadmin)
const addReportsys = asyncHandler(async (req, res) => {
	const {
		Title,
		List
	} = req.body;

	if (!Title || !List) {
		res.status(400);
		throw new Error("모든 정보를 입력하세요.");
	}

	Unit = req.user.Unit;

	const reportsys = await Reportsys.create({
		Title,
		List,
		Unit
	});


	const added = await UnitM.findByIdAndUpdate(
		Unit._id, {
			$push: {
				reportSys: reportsys._id
			},
		}, {
			new: true,
		}
	)

	if (reportsys) {
		res.status(201).json({
			_id: reportsys._id,
			Title: reportsys.Title,
			List: reportsys.List,
			Unit: reportsys.Unit
		});
	} else {
		res.status(400);
		throw new Error("보고체계를 찾을 수 없습니다.");
	}
});

//@description     Delete reportsys
//@route           DELETE /api/reportsys
//@access          Protected(onlyadmin)
const removeReportsys = asyncHandler(async (req, res) => {
	const {
		_id
	} = req.body;

	if (!_id) {
		res.status(400);
		throw new Error("정보를 입력하세요.");
	}

	Unit = req.user.Unit;

	try {
		await Reportsys.findByIdAndRemove(_id).exec();
	} catch (e) {
		res.status(400);
		throw new Error("해당 보고체계가 없습니다.");
	}
	console.log(Unit._id)
	const removed = await UnitM.findByIdAndUpdate(
		Unit._id, {
			$pull: {
				reportSys: mongoose.Types.ObjectId(_id)
			},
		}, {
			new: true,
		}
	)

	res.status(201).json({
		message: "remove success",
		_id: mongoose.Types.ObjectId(_id)
	});
});


//@description     get reportsys
//@route           GET /api/reportsys
//@access          Protected
const getReportsys = asyncHandler(async (req, res) => {
	const keyword = req.query.search;

	if (keyword) {
		ret = await Reportsys.find({ Title: { $eq: keyword }}).find({Unit: {$eq: req.user.Unit}});
		return res.status(200).send(ret);
	} else {
		return res.status(200).send(await Reportsys.find({Unit: {$eq: req.user.Unit}}));
	}
});

module.exports = {
	addReportsys,
	removeReportsys,
	getReportsys
};
