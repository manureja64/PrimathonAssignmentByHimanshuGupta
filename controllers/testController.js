const Direction = require('../models/Direction');
const Question = require('../models/Question');
var Test = require('../models/Test');
var async = require('async');
const { body, validationResult } = require("express-validator");
var readXlsxFile = require('read-excel-file/node');

//Display list of all Test.
exports.test_list = function (req, res, next) {
    Test.find({}, 'title numOfOptions')
        .exec(function (err, list_tests) {
            if (err) { return next(err); }
            //Successful, so render
            res.render('test_list', { title: 'Tests List', test_list: list_tests, subject: "0", class1: "0", chapter: "0" });
        });
    //res.send('NOT IMPLEMENTED: Test list');
};

exports.test_list_post = function (req, res, next) {
    if (req.body.subject === "0") { // 0 MUST be placed in quotes (here and below) for the search feature to work Properly
        if (req.body.class === "0") {   // 0 MUST be placed in quotes (here and below) for the search feature to work Properly
            if (req.body.chapter === "0") { // 0 MUST be placed in quotes (here and below) for the search feature to work Properly
                Test.find({})
                    .exec(function (err, list_tests) {
                        if (err) { return next(err); }
                        //Successful, so render
                        res.render('test_list', { title: 'Tests List', test_list: list_tests, subject: req.body.subject, class1: req.body.class, chapter: req.body.chapter });
                    });

            }
            else {  //chapter is NOT 0 (zero)
                Test.find({ chapter: req.body.chapter })
                    .exec(function (err, list_tests) {
                        if (err) { return next(err); }
                        //Successful, so render
                        res.render('test_list', { title: 'Tests List', test_list: list_tests, subject: req.body.subject, class1: req.body.class, chapter: req.body.chapter });
                    });
            }
        }
        else {  //class is NOT ALL (i.e., NOT 0 (zero))
            if (req.body.chapter === "0") { //Chapter is ALL
                Test.find({ class: req.body.class })
                    .exec(function (err, list_tests) {
                        if (err) { return next(err); }
                        //Successful, so render
                        res.render('test_list', { title: 'Tests List', test_list: list_tests, subject: req.body.subject, class1: req.body.class, chapter: req.body.chapter });
                    });
            }
            else {  // chapter is NOT ALL (i.e., NOT 0 (zero))
                Test.find({ class: req.body.class, chapter: req.body.chapter })
                    .exec(function (err, list_tests) {
                        if (err) { return next(err); }
                        //Successful, so render
                        res.render('test_list', { title: 'Tests List', test_list: list_tests, subject: req.body.subject, class1: req.body.class, chapter: req.body.chapter });
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
                        res.render('test_list', { title: 'Tests List', test_list: list_tests, subject: req.body.subject, class1: req.body.class, chapter: req.body.chapter });
                    });
            }
            else { // chapter is NOT ALL (i.e., NOT 0 (zero))
                Test.find({ subject: req.body.subject, chapter: req.body.chapter })
                    .exec(function (err, list_tests) {
                        if (err) { return next(err); }
                        //Successful, so render
                        res.render('test_list', { title: 'Tests List', test_list: list_tests, subject: req.body.subject, class1: req.body.class, chapter: req.body.chapter });
                    });
            }
        }
        else {  //class is NOT ALL (i.e., NOT 0 (zero))
            if (req.body.chapter === "0") {
                Test.find({ subject: req.body.subject, class: req.body.class })
                    .exec(function (err, list_tests) {
                        if (err) { return next(err); }
                        //Successful, so render
                        res.render('test_list', { title: 'Tests List', test_list: list_tests, subject: req.body.subject, class1: req.body.class, chapter: req.body.chapter });
                    });
            }
            else {// chapter is NOT ALL (i.e., NOT 0 (zero))
                Test.find({ subject: req.body.subject, class: req.body.class, chapter: req.body.chapter })
                    .exec(function (err, list_tests) {
                        if (err) { return next(err); }
                        //Successful, so render
                        res.render('test_list', { title: 'Tests List', test_list: list_tests, subject: req.body.subject, class1: req.body.class, chapter: req.body.chapter });
                    });
            }
        }

    }
}


//Display detail page for a specific Test.
exports.test_detail = function (req, res, next) {
    async.parallel({
        test: function (callback) {
            Test.findById(req.params.id)
                // .populate('direction')
                // .populate('question')
                .exec(callback);
        },

        test_directions: function (callback) {
            Direction.find({ 'test': req.params.id })
                .exec(callback);
        },

        test_questions: function (callback) {
            Question.find({ 'test': req.params.id })
                .exec(callback);
        },
    }, function (err, results) {
        if (err) { return next(err); }
        if (results.test == null) {//No results.
            var err = new Error('Test not found');
            err.status = 404;
            return next(err);
        }
        //Successful, so render
        res.render('test_detail', { title: 'Test Detail', test: results.test, test_directions: results.test_directions, test_questions: results.test_questions });
    });

    // res.send('NOT IMPLEMENTED: Test detail: ' + req.params.id);


};

//Display Test create form on GET.
exports.test_create_get = function (req, res, next) {
    var test = new Test();
    res.render('test_excel_form', { title: 'Create Test', test: null, errors: null });
    // res.send('NOT IMPLEMENTED: Test create GET');
};

//Handle Test create on POST.
exports.test_create_post = [
    //Validate and santize the name field.
    // body('title', 'Title is required').trim().isLength({ min: 1 }), //--> .escape() <-- this is removed so to not to escape special characters.

    // body('numOfOptions', 'Number of Options is required').trim().isLength({ min: 1 }).escape(),
    // body('duration', 'Duration is required').trim().isLength({ min: 1 }).escape(),
    // body('subject', 'Subject is required').trim().isLength({ min: 1 }).escape(),
    // body('class', 'Class is required').trim().isLength({ min: 1 }).escape(),
    // body('chapter', 'Chapter is required').trim().isLength({ min: 1 }).escape(),

    //Process request after validation and sanitization
    (req, res, next) => {
        //Extract the validation errors from a request
        // const errors = validationResult(req);

        //Create a test object with escaped and trimmed data.
        const schema = {
            'title': {
                prop: 'title',
                type: String
            },
            'numOfOptions': {
                prop: 'numOfOptions',
                type: Number
            },
            'duration': {
                prop: 'duration',
                type: Number
            },
            'subject': {
                prop: 'subject',
                type: Number
            },
            'notes': {
                prop: 'notes',
                type: String
            },
            'class': {
                prop: 'class',
                type: Number
            },
            'chapter': {
                prop: 'chapter',
                type: Number
            },
            'type': {
                prop: 'type',
                type: Number
            },
            'message': {
                prop: 'message',
                type: String
            }
        }
        var filePath = __dirname + '\\public\\uploads\\' + req.file.filename;
        readXlsxFile(filePath, { schema }).then(({ rows, errors }) => {
            for (let i = 0; i < rows.length; i++) {
                var exTest = new Test(
                    {
                        title: rows[i].title,
                        numOfOptions: rows[i].numOfOptions,
                        duration: rows[i].duration,
                        subject: rows[i].subject,
                        notes: rows[i].notes,
                        class: rows[i].class,
                        chapter: rows[i].chapter,
                        type: rows[i].type,
                        message: rows[i].message
                    }
                )
                exTest.save(function (err) {
                    if (err) {
                        return next(err);
                    }
                })
            }
        })
        res.redirect('/catalog/tests');

        // var test = new Test(
        //     {
        //         title: req.body.title,
        //         numOfOptions: req.body.numOfOptions,
        //         duration: req.body.duration,
        //         subject: req.body.subject,
        //         notes: req.body.notes,
        //         class: req.body.class,
        //         chapter: req.body.chapter,
        //         type: req.body.type,
        //         message: req.body.message

        //     }

        // );

        // if (!errors.isEmpty()) {
        //     //There are errors. Render the form again with sanitized values/error
        //     res.render('test_form', { title: 'Create Test', test: test, numOfOptions: test.numOfOptions, errors: errors.array() });
        //     return;

        // }
        // else {
        //     //Data from form is valid
        //     //Check if Test with the same title already exists (The current Test object is NOT saved)
        //     Test.findOne({ 'title': req.body.title })
        //         .exec(function (err, found_title) {
        //             if (err) { return next(err); }
        //             if (found_title) {
        //                 //Title already exists, redirect to its detail page.
        //                 res.redirect(found_title.url);
        //             }
        //             else {
        //                 test.save(function (err) {
        //                     if (err) { return next(err); }
        //                     res.redirect(test.url);
        //                 });
        //             }
        //         })

        // }
    },

    // res.send('NOT IMPLEMENTED: Test create POST');

];

//Display Test delete form on GET.
exports.test_delete_get = function (req, res, next) {

    // res.send('NOT IMPLEMENTED: Test delete GET');
    async.parallel({
        test: function (callback) {
            Test.findById(req.params.id).exec(callback)
        },
        test_directions: function (callback) {
            Direction.find({ 'test': req.params.id }).exec(callback)
        },
    }, function (err, results) {
        if (err) { return next(err); }
        if (results.test == null) { // No results.
            res.redirect('/catalog/tests');

        }
        //Successful, so render.
        res.render('test_delete', { title: 'Delete Test', test: results.test, test_directions: results.test_directions });

    });
};

//Handle Test delete on POST.
exports.test_delete_post = function (req, res, next) {
    // res.send('NOT IMPLEMENTED: Test delete POST');
    async.parallel({
        test: function (callback) {
            Test.findById(req.params.id).exec(callback)
        },
        test_directions: function (callback) {
            Direction.find({ 'test': req.params.id }).exec(callback)
        },
    }, function (err, results) {
        if (err) { return next(err); }
        //Success
        if (results.test_directions.length > 0) {
            //Test has directions. Render in same way as for GET route.
            res.render('test_delete', { title: 'Delete Test', test: results.test, test_directions: results.test_directions });
            return;
        }
        else {
            Test.findByIdAndRemove(req.body.testid, function deleteTest(err) {
                if (err) { return next(err); }
                //Success - go to Test list
                res.redirect('/catalog/tests')
            })
        }
    })
};

//Display Test update form on GET.
exports.test_update_get = function (req, res, next) {
    // res.send('NOT IMPLEMENTED: Test update GET');
    async.parallel({
        test: function (callback) {
            Test.findById(req.params.id).populate('direction').populate('question').exec(callback);

        },
        directions: function (callback) {
            Direction.find(callback);
        },
        questions: function (callback) {
            Question.find(callback);
        },
    }, function (err, results) {
        if (err) { return next(err); }
        if (results.test == null) {
            var err = new Error('Test not found');
            err.status = 404;
            return next(err);
        }
        //Success.
        res.render('test_form', { title: 'Update Test', test: results.test, errors: results.errors })
    });

};

//Handle Test update on POST.
exports.test_update_post = [
    //Validate and sanitise fields.
    body('title', 'Title must not be empty.').trim().isLength({ min: 1 }),

    body('duration', 'Duration is required').trim().isLength({ min: 1 }).escape(),
    body('subject', 'Subject is required').trim().isLength({ min: 1 }).escape(),
    body('class', 'Class is required').trim().isLength({ min: 1 }).escape(),
    body('chapter', 'Chapter is required').trim().isLength({ min: 1 }).escape(),

    //Process request after validation and sanitization.
    (req, res, next) => {
        //Extract the validation errors from a request.
        const errors = validationResult(req);

        //Create a Test object with trimmed data and old id.
        var test = new Test({
            title: req.body.title,
            numOfOptions: req.body.numOfOptions,
            duration: req.body.duration,
            subject: req.body.subject,
            notes: req.body.notes,
            class: req.body.class,
            chapter: req.body.chapter,
            type: req.body.type,
            message: req.body.message,
            _id: req.params.id //This is required, or a new ID will be created            
        });
        if (!errors.isEmpty()) {
            //There are errors. Render form again with sanitized values/error messages.
            async.parallel({
                test: function (callback) {
                    Test.findById(req.params.id).populate('direction').populate('question').exec(callback);

                },
                directions: function (callback) {
                    Direction.find(callback);
                },
                questions: function (callback) {
                    Question.find(callback);
                },
            }, function (err, results) {
                if (err) { return next(err); }
                if (results.test == null) {
                    var err = new Error('Test not found');
                    err.status = 404;
                    return next(err);
                }
                //Success.
                res.render('test_form', { title: 'Update Test', test: results.test, errors: results.errors })
            });
            return;
        }
        else {
            //Data from form is valid. Update the record.
            Test.findByIdAndUpdate(req.params.id, test, {}, function (err, thetest) {
                if (err) { return next(err); }
                //Successful - redirect to Test detail page.
                res.redirect(thetest.url);
            });

        }
    }
];