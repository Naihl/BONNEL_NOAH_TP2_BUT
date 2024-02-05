const { validateWatchlist } = require('../repositories/jsonSchema');
const { insertOne, findOne, updateOne, find, deleteOne } = require('../services/db/crud');

async function addWatchList(req, res, next){
    const watchListData = req.body;
    const validation = validateWatchlist(watchListData);
    
    if (validation.errors.length > 0) {
        return res.status(400).json({ errors: validation.errors });
    }
    
    try {
        const result = await insertOne('watchList', watchListData);
        res.status(201).json(result);
        return(res);
    } catch (error) {
        console.error('Erreur lors de l\'insertion de la watchList:', error);
        res.status(500).send('Erreur lors de l\'ajout de la watchList');
        return(next(error));
    }
    
    };

async function getWatchList(req,res,next){
    const watchListId = req.params.id;
    
    try {
        const result = await findOne('watchList', {id: watchListId});
        res.status(200).json(result);
        return(res);
    } catch (error) {
        console.error('Erreur lors de la récupération de la watchList:', error);
        res.status(500).send('Erreur lors de la watchList');
        return(next(error));
    }
    };

async function addItemToWatchList(req, res, next){
    const watchListId = req.params.id;
    const itemData = req.body;
    
    try {
        const result = await updateOne('watchList', {id: watchListId}, {$push: {items: itemData}});
        res.status(201).json(result);
        return(res);
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'item à la watchList:', error);
        res.status(500).send('Erreur lors de l\'ajout de l\'item à la watchList');
        return(next(error));
    }
    };

async function updatestatus(req, res, next){
    const watchListId = req.params.id;
    const itemData = req.body;
    
    try {
        const result = await updateOne('watchList', {id: watchListId, "items.id": itemData.id}, {$set: {"items.$.status": itemData.status}});
        res.status(201).json(result);
        return(res);
    } catch (error) {
        console.error('Erreur lors de la mise à jour du status de l\'item:', error);
        res.status(500).send('Erreur lors de la mise à jour du status de l\'item');
        return(next(error));
    }
    };

async function getAllWatchList(req,res,next){
    try {
        const result = await find('watchList', {});
        res.status(200).json(result);
        return(res);
    } catch (error) {
        console.error('Erreur lors de la récupération des watchList:', error);
        res.status(500).send('Erreur lors de la récupération des watchList');
        return(next(error));
    }
    };

async function deleteItemFromWatchList(req, res, next){
    const watchListId = req.params.id;
    const itemId = req.params.itemId;
    
    try {
        const result = await deleteOne('watchList', {id: watchListId, "items.id": itemId});
        res.status(200).json(result);
        return(res);
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'item de la watchList:', error);
        res.status(500).send('Erreur lors de la suppression de l\'item de la watchList');
        return(next(error));
    }
    };

async function deleteWatchList(req, res, next){
    const watchListId = req.params.id;
    
    try {
        const result = await deleteOne('watchList', {id: watchListId});
        res.status(200).json(result);
        return(res);
    } catch (error) {
        console.error('Erreur lors de la suppression de la watchList:', error);
        res.status(500).send('Erreur lors de la suppression de la watchList');
        return(next(error));
    }
    };

    

module.exports = {addWatchList, getWatchList, addItemToWatchList, updatestatus, getAllWatchList, deleteItemFromWatchList, deleteWatchList};


