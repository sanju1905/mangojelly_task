const bookController=require('../server/bookController');
const express=require('express')
const router=express.Router()
router.get('/getalldetails',bookController.getBooks);
router.post('/addcomicbook',bookController.addComicBook);
router.delete('/deletecomicbookbyid/:id',bookController.deleteBookById);
router.get('/getcomicbookbyid/:id',bookController.getBookById);
router.put('/updatecomicbookbyid/:id',bookController.editBookById);
router.get('/pagination',bookController.getAllComicBooks);
router.get('/filter',bookController.getAllComicBooks)
router.get('/sort',bookController.getAllComicBooks)
module.exports=router
