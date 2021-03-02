const router = require("express").Router();
const db = require("../models");

router.get("/api/workouts", (req, res) => {
    db.Workout.aggregate([{
        $addFields: {
            totalDuration: {
                $sum: "$exercises.duration"
            }
        }
    }])
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(error => {
            res.status(401).json(error);
        });
});

router.put("/api/workouts/:id", (req, res) => {
    db.Workout.findByIdAndUpdate(req.params.id,
        {
            $push: { exercises: req.body }
        },
        {
            new: true,
            runValidators: true
        }).then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(error => {
            res.status(401).json(error);
        });
});

router.post("/api/workouts", (req, res) => {
    db.Workout.create({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err)
        })
});

router.get("/api/workouts/range", (req, res) => {
    db.Workout.aggregate([{ $limit: 7 },
        {
        $addFields: {
            totalDuration: {
                $sum: "$exercises.duration"
            }
        }
    }])
    .then(dbWorkout => {
        res.json(dbWorkout);
    });
});

// router.get("/api/workouts/:id", (req, res) => {
//     db.Workout.find({})
//         .then(dbWorkout => {
//             res.json(dbWorkout);
//         })
//         .catch(err => {
//             res.status(400).json(err)
//         })
// });

// router.post("/api/workouts", ({ body }, res) => {
//     db.Workout.insertMany(body)
//         .then(dbWorkout => {
//             res.json(dbWorkout);
//         })
//         .catch(err => {
//             res.status(400).json(err)
//         })
// });



    module.exports = router;