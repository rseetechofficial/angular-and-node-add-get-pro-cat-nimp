var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var Category = require("../models/category.model")

router.post('/',function(req,res){

    var cat = new Category();
    cat.name = req.body.name;
    cat.save();
    res.json({
        status : true,
        message : "Category saved successfully!"
    })

})

router.get('/',function(req,res){
    Category.find({},function(err,categories){
        if(err){
            res.json({
                status : false,
                error : err
            })
        }
        else{
            res.json({
                status : true,
                categories : categories
            })
        }
    })
})

router.delete('/:id',function(req,res){
    Category.remove({_id : req.params.id},function(err,category){
        if(err){
            res.json({
                status : false,
                error : err
            })
        }
        else {
            res.json({
                status : true,
                message : "Category deleted successfully"
            })
        }
    })
})

router.put('/:id',function(req,res){

    Category.update({_id : req.params.id},{$set : req.body},function(err,category){
    if(err){
        res.json({
            status : false,
            error : err
        })
    }
    else{
        res.json({
            status : true,
            categories : "Category updated successfully"
        })
    }
})

})

module.exports = router;