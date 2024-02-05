const { validateItem } = require('../repositories/jsonSchema'); 
const { insertOne, findOne, find } = require('../services/db/crud');

async function addItem(req, res, next){
    const itemData = req.body;
    const validation = validateItem(itemData);
    
    if (validation.errors.length > 0) {
        return res.status(400).json({ errors: validation.errors });
    }
    
    try {
        const result = await insertOne('items', itemData);
        res.status(201).json(result);
        return(res);
    } catch (error) {
        console.error('Erreur lors de l\'insertion de l\'item:', error);
        res.status(500).send('Erreur lors de l\'ajout de l\'item');
        return(next(error));
    }
    
    };

async function getItem(req,res,next){
    const itemId = req.params.id;
    
    try {
        const result = await findOne('items', {id: itemId});
        res.status(200).json(result);
        return(res);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'item:', error);
        res.status(500).send('Erreur lors de l\'item');
        return(next(error));
    }
    };

async function getAllItems(req,res,next){
    try {
        const result = await find('items', {});
        res.status(200).json(result);
        return(res);
    } catch (error) {
        console.error('Erreur lors de la récupération des items:', error);
        res.status(500).send('Erreur lors de la récupération des items');
        return(next(error));
    }
    };

module.exports = {addItem, getItem, getAllItems};