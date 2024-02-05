const { validateUser } = require('../repositories/jsonSchema'); 
const { insertOne, findOne, find, replace} = require('../services/db/crud');

async function addUser(req, res, next){
  const userData = req.body;
  const validation = validateUser(userData);

  if (validation.errors.length > 0) {
      return res.status(400).json({ errors: validation.errors });
  }

  try {
      const result = await insertOne('users', userData);
      res.status(201).json(result);
      return(res);
  } catch (error) {
      console.error('Erreur lors de l\'insertion de l\'utilisateur:', error);
      res.status(500).send('Erreur lors de l\'ajout de l\'utilisateur');
      return(next(error));
  }

};

async function getUser(req,res,next){
    const userId = req.params.id;

    try {
        const result = await findOne('users', {id: userId});
        res.status(200).json(result);
        return(res);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        res.status(500).send('Erreur lors de l\'utilisateur');
        return(next(error));
    }
    };

async function getAllUsers(req,res,next){
    try {
        const result = await find('users', {});
        res.status(200).json(result);
        return(res);
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        res.status(500).send('Erreur lors de la récupération des utilisateurs');
        return(next(error));
    }
    };

async function updateUser(req, res, next){
    const userId = req.params.id;
    const userData = req.body;

    try {
        const result = await replace('users', {id: userId}, userData);
        res.status(201).json(result);
        return(res);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
        res.status(500).send('Erreur lors de la mise à jour de l\'utilisateur');
        return(next(error));
    }
    };

module.exports = {addUser, getUser, getAllUsers, updateUser};