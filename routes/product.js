var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var Product = require('../models/product.model');

router.post('/',function(req,res){

var prod = new Product();
prod.title = req.body.title;
prod.description = req.body.description;
prod.price = req.body.price;
prod.category = req.body.category;
prod.save();
    res.json({
        status : true,
        message :  "Product saved successfully"
    })
})

router.get('/',function(req,res){
    Product.find({}).populate('category').exec(function(err,products){
        if(err){
            res.json({
                status : false,
                error : err
            })
        }
        else{
            res.json({
                status : true,
                products : products
            })
        }
    })
})

router.delete('/:id',function(req,res){
    Product.remove({_id : req.params.id},function(err,Product){
        if(err){
            res.json({
                status : false,
                error : err
            })
        }
        else {
            res.json({
                status : true,
                message : "Product deleted successfully"
            })
        }
    })
})

router.put('/:id',function(req,res){

    Product.update({_id : req.params.id},{$set : req.body},function(err,product){
    if(err){
        res.json({
            status : false,
            error : err
        })
    }
    else{
        res.json({
            status : true,
            product : "Product updated successfully"
        })
    }
})

})
module.exports = router;