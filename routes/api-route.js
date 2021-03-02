const db = require("../models");
const router = require("express").Router();

router.get("/api/workouts", (req, res) => {
    db.Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        }).catch(err => {
            res.status(400).json(err)
        })
});

db.Workout.aggregate([
    {
        $addFields: {
            $sum: "$exercise.duration"
        }
    }
]);

router.put("/api/workouts/:id", ({ params, body }, res) => {
    db.Workout.findOneAndUpdate(params.id, body.Workout)
        .then(dbWorkout => {
            res.json(dbWorkout);
        }).catch(err => {
            res.status(400).json(err)
        })
});

router.get("/api/exercise/:id", (req, res) => {
    db.Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err)
        })
});

router.post("/api/exercise", ({ body }, res) => {
    db.Workout.insertMany(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err)
        })
});

router.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err)
        })
});

router.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
        .then(dbWorkout => {
            console.log("all workouts")
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err)
        })
});

module.exports = router;