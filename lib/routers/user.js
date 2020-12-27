const express = require('express')
const router = express.Router();

const UserService = require('../services/user');
const userService = new UserService();

router.post('/', async (req, res) => {
    return await userService.createNewUser(req, res)
});

router.get('/', async (req, res) => {
  return await userService.getAllUsers(req, res);
});

router.get('/:id', async(req, res) => {
    return await userService.getUserById(req, res)
});

router.put('/:id', async (req, res) => {
  return await userService.upsertUserById(req, res);
});

router.delete('/:id', async (req, res) => {
  return await userService.deleteUserById(req, res);
})


module.exports = router;