// const Direction = require('../models/Direction');
// const Question = require('../models/Question');
// var Test = require('../models/Test');
// var async = require('async');
// const { body, validationResult } = require("express-validator");



const Direction = require('../models/Direction');
const Question = require('../models/Question');
var Test = require('../models/Test');
var async = require('async');
const { body, validationResult } = require("express-validator");

//Display list of all Tests
exports.user_test_list = function (req, res, next) {
    // Test.find({}, 'title numOfOptions duration')
    Test.find({})
        .exec(function (err, list_tests) {
            if (err) { return next(err); }
            //Successful, so render
            //'class1' is used instead of 'class' because 'class' is a RESERVED KEYWORD in CSS and Create PROBLEM in .ejs file
            res.render('user_test_list', { title: 'Tests List (All)', test_list: list_tests, subject: "0", class1: "0", chapter: "0" });
        });
    //res.send('NOT IMPLEMENTED: Test list');
};

// Display list of Test Based on Search
exports.user_test_list_post = function (req, res, next) {
    if (req.body.subject === "0") { // 0 MUST be placed in quotes (here and below) for the search feature to work Properly
        if (req.body.class === "0") {   // 0 MUST be placed in quotes (here and below) for the search feature to work Properly
            if (req.body.chapter === "0") { // 0 MUST be placed in quotes (here and below) for the search feature to work Properly
                Test.find({})
                    .exec(function (err, list_tests) {
                        if (err) { return next(err); }
                        //Successful, so render
                        res.render('user_test_list', { title: 'Tests List', test_list: list_tests, subject: req.body.subject, class1: req.body.class, chapter: req.body.chapter });
                    });

            }
            else {  //chapter is NOT 0 (zero)
                Test.find({ chapter: req.body.chapter })
                    .exec(function (err, list_tests) {
                        if (err) { return next(err); }
                        //Successful, so render
                        res.render('user_test_list', { title: 'Tests List', test_list: list_tests, subject: req.body.subject, class1: req.body.class, chapter: req.body.chapter });
                    });


            }
        }
        else {  //class is NOT ALL (i.e., NOT 0 (zero))
            if (req.body.chapter === "0") { //Chapter is ALL
                Test.find({ class: req.body.class })
                    .exec(function (err, list_tests) {
                        if (err) { return next(err); }
                        //Successful, so render
                        res.render('user_test_list', { title: 'Tests List', test_list: list_tests, subject: req.body.subject, class1: req.body.class, chapter: req.body.chapter });
                    });
            }
            else {  // chapter is NOT ALL (i.e., NOT 0 (zero))
                Test.find({ class: req.body.class, chapter: req.body.chapter })
                    .exec(function (err, list_tests) {
                        if (err) { return next(err); }
                        //Successful, so render
                        res.render('user_test_list', { title: 'Tests List', test_list: list_tests, subject: req.body.subject, class1: req.body.class, chapter: req.body.chapter });
                    });
            }
        }
    }
    else {  //subject is NOT ALL (i.e., NOT 0 (zero))
        if (req.body.class === "0") {    //class is ALL
            if (req.body.chapter === "0") {  //chapter is ALL
                Test.find({ subject: req.body.subject })
                    .exec(function (err, list_tests) {
                        if (err) { return next(err); }
                        //Successful, so render
                        res.render('user_test_list', { title: 'Tests List', test_list: list_tests, subject: req.body.subject, class1: req.body.class, chapter: req.body.chapter });
                    });
            }
            else { // chapter is NOT ALL (i.e., NOT 0 (zero))
                Test.find({ subject: req.body.subject, chapter: req.body.chapter })
                    .exec(function (err, list_tests) {
                        if (err) { return next(err); }
                        //Successful, so render
                        res.render('user_test_list', { title: 'Tests List', test_list: list_tests, subject: req.body.subject, class1: req.body.class, chapter: req.body.chapter });
                    });
            }
        }
        else {  //class is NOT ALL (i.e., NOT 0 (zero))
            if (req.body.chapter === "0") {
                Test.find({ subject: req.body.subject, class: req.body.class })
                    .exec(function (err, list_tests) {
                        if (err) { return next(err); }
                        //Successful, so render
                        res.render('user_test_list', { title: 'Tests List', test_list: list_tests, subject: req.body.subject, class1: req.body.class, chapter: req.body.chapter });
                    });
            }
            else {// chapter is NOT ALL (i.e., NOT 0 (zero))
                Test.find({ subject: req.body.subject, class: req.body.class, chapter: req.body.chapter })
                    .exec(function (err, list_tests) {
                        if (err) { return next(err); }
                        //Successful, so render
                        res.render('user_test_list', { title: 'Tests List', test_list: list_tests, subject: req.body.subject, class1: req.body.class, chapter: req.body.chapter });
                    });
            }
        }

    }
}

exports.user_test_list_sectional = function (req, res, next) {
    // Test.find({ type: 0 }, 'title numOfOptions duration')
    Test.find({ type: 0 })
        .exec(function (err, list_tests) {
            if (err) { return next(err); }
            //Successful, so render
            res.render('user_test_list', { title: 'Tests List (Sectional)', test_list: list_tests });
        });
    //res.send('NOT IMPLEMENTED: Test list');
};

exports.user_test_list_fl = function (req, res, next) {
    // Test.find({ type: 1 }, 'title numOfOptions duration')
    Test.find({ type: 1 })
        .exec(function (err, list_tests) {
            if (err) { return next(err); }
            //Successful, so render
            res.render('user_test_list', { title: 'Tests List (Full-Length)', test_list: list_tests });
        });
    //res.send('NOT IMPLEMENTED: Test list');
};

//Display list of all Tests
exports.user_solution_list = function (req, res, next) {
    // Test.find({}, 'title numOfOptions duration')
    Test.find({})
        .exec(function (err, list_tests) {
            if (err) { return next(err); }
            //Successful, so render
            res.render('user_solution_list', { title: 'Notes (All)', test_list: list_tests, subject: "0", class1: "0", chapter: "0" });
        });
    //res.send('NOT IMPLEMENTED: Test list');
};

exports.user_solution_list_post = function (req, res, next) {
    if (req.body.subject === "0") { // 0 MUST be placed in quotes (here and below) for the search feature to work Properly
        if (req.body.class === "0") {   // 0 MUST be placed in quotes (here and below) for the search feature to work Properly
            if (req.body.chapter === "0") { // 0 MUST be placed in quotes (here and below) for the search feature to work Properly
                Test.find({})
                    .exec(function (err, list_tests) {
                        if (err) { return next(err); }
                        //Successful, so render
                        res.render('user_solution_list', { title: 'Notes', test_list: list_tests, subject: req.body.subject, class1: req.body.class, chapter: req.body.chapter });
                    });

            }
            else {  //chapter is NOT 0 (zero)
                Test.find({ chapter: req.body.chapter })
                    .exec(function (err, list_tests) {
                        if (err) { return next(err); }
                        //Successful, so render
                        res.render('user_solution_list', { title: 'Notes', test_list: list_tests, subject: req.body.subject, class1: req.body.class, chapter: req.body.chapter });
                    });


            }
        }
        else {  //class is NOT ALL (i.e., NOT 0 (zero))
            if (req.body.chapter === "0") { //Chapter is ALL
                Test.find({ class: req.body.class })
                    .exec(function (err, list_tests) {
                        if (err) { return next(err); }
                        //Successful, so render
                        res.render('user_solution_list', { title: 'Notes', test_list: list_tests, subject: req.body.subject, class1: req.body.class, chapter: req.body.chapter });
                    });
            }
            else {  // chapter is NOT ALL (i.e., NOT 0 (zero))
                Test.find({ class: req.body.class, chapter: req.body.chapter })
                    .exec(function (err, list_tests) {
                        if (err) { return next(err); }
                        //Successful, so render
                        res.render('user_solution_list', { title: 'Notes', test_list: list_tests, subject: req.body.subject, class1: req.body.class, chapter: req.body.chapter });
                    });
            }
        }
    }
    else {  //subject is NOT ALL (i.e., NOT 0 (zero))
        if (req.body.class === "0") {    //class is ALL
            if (req.body.chapter === "0") {  //chapter is ALL
                Test.find({ subject: req.body.subject })
                    .exec(function (err, list_tests) {
                        if (err) { return next(err); }
                        //Successful, so render
                        res.render('user_solution_list', { title: 'Notes', test_list: list_tests, subject: req.body.subject, class1: req.body.class, chapter: req.body.chapter });
                    });
            }
            else { // chapter is NOT ALL (i.e., NOT 0 (zero))
                Test.find({ subject: req.body.subject, chapter: req.body.chapter })
                    .exec(function (err, list_tests) {
                        if (err) { return next(err); }
                        //Successful, so render
                        res.render('user_solution_list', { title: 'Notes', test_list: list_tests, subject: req.body.subject, class1: req.body.class, chapter: req.body.chapter });
                    });
            }
        }
        else {  //class is NOT ALL (i.e., NOT 0 (zero))
            if (req.body.chapter === "0") {
                Test.find({ subject: req.body.subject, class: req.body.class })
                    .exec(function (err, list_tests) {
                        if (err) { return next(err); }
                        //Successful, so render
                        res.render('user_solution_list', { title: 'Notes', test_list: list_tests, subject: req.body.subject, class1: req.body.class, chapter: req.body.chapter });
                    });
            }
            else {// chapter is NOT ALL (i.e., NOT 0 (zero))
                Test.find({ subject: req.body.subject, class: req.body.class, chapter: req.body.chapter })
                    .exec(function (err, list_tests) {
                        if (err) { return next(err); }
                        //Successful, so render
                        res.render('user_solution_list', { title: 'Notes', test_list: list_tests, subject: req.body.subject, class1: req.body.class, chapter: req.body.chapter });
                    });
            }
        }

    }
}


exports.user_solution_list_sectional = function (req, res, next) {
    // Test.find({ type: 0 }, 'title numOfOptions duration')
    Test.find({ type: 0 })
        .exec(function (err, list_tests) {
            if (err) { return next(err); }
            //Successful, so render
            res.render('user_solution_list', { title: 'Notes (Sectional)', test_list: list_tests });
        });
    //res.send('NOT IMPLEMENTED: Test list');
};

exports.user_solution_list_fl = function (req, res, next) {
    // Test.find({ type: 1 }, 'title numOfOptions duration')
    Test.find({ type: 1 })
        .exec(function (err, list_tests) {
            if (err) { return next(err); }
            //Successful, so render
            res.render('user_solution_list', { title: 'Notes (Full-Length)', test_list: list_tests });
        });
    //res.send('NOT IMPLEMENTED: Test list');
};

//solution_get_START!!!!!

exports.test_solution_get = function (req, res, next) {
    // res.send('NOT IMPLEMENTED: test_simulation GET')

    async.parallel({
        test: function (callback) {
            Test.findById(req.params.id).populate('direction').populate('question').exec(callback);

        },
        test_directions: function (callback) {
            Direction.find({ 'test': req.params.id })
                .populate('question')
                .populate('test')
                .exec(callback);
        }
    }, function (err, results) {
        if (err) { return next(err); }
        if (results.test == null) {
            //No results.
            var err = new Error('Test not found');
            err.status = 404;
            return next(err);

        }
        res.render('test_solution', { title: 'Test Detail', test: results.test, direction: results.test_directions });
    })

};


//solution_get_END!!!!!

exports.test_simulation_get = function (req, res, next) {
    // res.send('NOT IMPLEMENTED: test_simulation GET')

    async.parallel({
        test: function (callback) {
            Test.findById(req.params.id).populate('direction').populate('question').exec(callback);

        },
        test_directions: function (callback) {
            Direction.find({ 'test': req.params.id })
                .populate('question')
                .populate('test')
                .exec(callback);
        }
    }, function (err, results) {
        if (err) { return next(err); }
        if (results.test == null) {
            //No results.
            var err = new Error('Test not found');
            err.status = 404;
            return next(err);

        }
        res.render('test_simulation', { title: 'Test Detail', test: results.test, direction: results.test_directions });
    })

    // Test.findById(req.params.id)
    // .populate('direction')
    // .populate('question')
    // .exec(function (err, test_detail) {
    //     if (err) { return next(err); }
    //     res.render('test_simulation', { title: 'Test Detail', test: test_detail });
    // });


};

exports.test_simulation_post = function (req, res, next) {
    // res.send('NOT IMPLEMENTED: test_simulation POST')

    async.parallel({
        test: function (callback) {
            Test.findById(req.params.id).populate('direction').populate('question').exec(callback);

        },
        test_directions: function (callback) {
            Direction.find({ 'test': req.params.id })
                .populate('question')
                .populate('test')
                .exec(callback);
        }
    }, async function (err, results) {
        if (err) { return next(err); }
        if (results.test == null) {
            //No results.
            var err = new Error('Test not found');
            err.status = 404;
            return next(err);

        }
        let n_correct = 0;
        let n_wrong = 0;
        let n_unattempted = 0;
        let user_ans = [];
        // let data = JSON.stringify(req.body);
        // let data = JSON.stringify(req.body);
        let data = req.body;
        // console.log(JSON.stringify(req.body));
        // console.log('/////////')
        // console.log(`req.body is ${data}`)
        for (var key in data) {
            // console.log(`key is ${key}`);
            // console.log(`Value is (data[key]) is: ${data[key]}`);
            // console.log(`value of data[key] is: ${data[key]}`);
            // if (data[key] === 'd') {
            //     console.log(`Hi, data[key] is d`);
            // }
            if (data[key] === 'n') {
                n_unattempted += 1;
                // console.log(`n_unattempted: ${n_unattempted}`);
                user_ans.push(data[key]);

            } else {
                //////////////////////////////////////////////
                for (let i = 0; i < results.test_directions.length; i++) {

                    for (let j = 0; j < results.test_directions[i].question.length; j++) {
                        // console.log(`question id is: ${results.test_directions[i].question[j]._id} and key is: ${key}`);
                        quesid = results.test_directions[i].question[j]._id;
                        // console.log(`quesid is: ${quesid} and key is: ${key}`);
                        if (JSON.stringify(quesid) === JSON.stringify(key)) {
                            // if (results.test_directions[i].question[j]._id === key) {
                            // console.log(`question with question id ${results.test_directions[i].question[j]._id} and key ${key} is FOUND`)
                            if (results.test_directions[i].question[j].ans === data[key]) {
                                n_correct += 1;
                                user_ans.push(data[key]);
                            }
                            else {
                                n_wrong += 1;
                                user_ans.push(data[key]);
                            }
                            break;
                        }
                    }
                }
                // console.log(`n_correct is ${n_correct}`);
                // console.log(`n_wrong is ${n_wrong}`);
                // console.log(`n_unattempted is ${n_unattempted}`);
                // console.log(`user_ans is: ${user_ans}`);

                ////////////////////////////////////////
                // const ques = await Question.findById(key).exec(function (err, ques) { if (err) { return next(err); } });
                // console.log(ques.ans);
                /////////////////////////////////////////////////////////
                // async.parallel({
                //     ques: function (callback) {

                //         Question.findById(key)
                //             // .populate('direction')
                //             // .populate('question')
                //             .exec(callback);
                //     },
                // }, function (err, res11) {
                //     if (err) { return next(err); }
                //     console.log(`ques.question is: ${res11.ques.question}`);
                //     console.log(`ques.ans is: ${res11.ques.ans}`);
                //     console.log(`data[key] is: ${data[key]}`);
                // });

                ///////////////////////////////////////////////////////////
                // Question.findById(key).exec(function (err, ques) {
                //     if (err) { return next(err); }
                //     else {
                //         console.log(`ques.ans is: ${ques.ans}`);
                //         console.log(`data[key] is: ${data[key]}`);
                //         if (ques.ans === data[key]) {
                //             n_correct += 1;
                //             console.log(`n_correct: ${n_correct}`);
                //             user_ans.push(data[key]);
                //         }
                //         else {
                //             n_wrong += 1;
                //             console.log(`n_wrong: ${n_wrong}`);

                //             user_ans.push(data[key]);
                //         }

                //     }
                // })
                ///////////////////////////////////////////////
            }
        }
        res.render('test_result', { title: 'Test Result', test: results.test, direction: results.test_directions, user_ans: user_ans, correct: n_correct, wrong: n_wrong, unattempted: n_unattempted });
        return;
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////   ALTERNATIVE //////////////////////////////////////////////////////////////////////////

        //     for (let i = 0; i < results.test_directions.length; i++) {
        //         for (let j = 0; j < results.test_directions[i].question.length; j++) {
        //             questionId = JSON.stringify(results.test_directions[i].question[j].id);
        //             let temp = data.questionId;
        //             console.log(`temp: ${temp}`);
        //             console.log(`questionId is ${questionId}`);
        //             console.log(`req.body.questionId is: ${data.questionId}`);

        //             questionId1 = results.test_directions[i].question[j]._id;


        //             console.log(`questionId is ${questionId1}`)
        //             console.log(`Question (test_directions array) is: ${results.test_directions[i].question[j]._id}`)
        //             if (req.body.questionId !== undefined) { //Question is attempted
        //                 console.log(`req.body.questionId is: ${req.body.questionId}`)
        //                 user_ans.push(req.body.questionId);
        //                 if (results.test_directions[i].question[j].ans === req.body.questionId) {
        //                     n_correct += 1;
        //                 }
        //                 else {
        //                     n_wrong += 1;
        //                 }


        //             }
        //             else {
        //                 user_ans.push('n');
        //                 n_unattempted += 1;
        //             }

        //         }

        //         console.log(`\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\`)
        //         console.log(`user_ans is: ${user_ans}`)
        //         console.log(`Number of unattempted is ${n_unattempted}`)
        //     }
        //     res.render('test_result', { title: 'Test Result', test: results.test, direction: results.test_directions, user_ans: user_ans, correct: n_correct, wrong: n_wrong, unattempted: n_unattempted });
        ////////////////////////////END OF ALTERNATIVE /////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    })
};

