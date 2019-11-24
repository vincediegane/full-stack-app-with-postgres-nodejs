const express = require('express')
const pool = require('../../config/db')
const router = express.Router()
const { check, validationResult } = require('express-validator')

// @route     GET api/users
// @desc      GET ALL USERS
// @access    Public
router.get('/', (req, res) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (err, results) => {
    if (err) throw err
    res.json(results.rows)
  })
})

// @route     GET api/users/:id
// @desc      GET A USER BY ID
// @access    Public
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  pool.query('SELECT * FROM users WHERE id = $1', [id], (err, results) => {
    if (err) throw err
    res.json(results.rows)
  })
})

// @route     POST api/users
// @desc      ADD A USER
// @access    Public
router.post('/', [
  check('name', 'Name is required.').not().isEmpty(),
  check('email', 'Email is required.').not().isEmpty(),
  check('email', 'Please enter a valid email.').isEmail()
],
(req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
  }

  const { name, email } = req.body
  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (err, results) => {
    if (err) throw err
    res.send('User added successfully')
  })
})

// @route     PUT api/users/:id
// @desc      EDIT A USER
// @access    Public
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const { name, email } = req.body

  pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id], (err, results) => {
    if (err) throw err
    res.send('User updated succesfully')
  })
})

// @route     DELETE api/users/:id
// @desc      DELETE A USER
// @access    Public
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  
  pool.query('DELETE FROM users WHERE id = $1', [id], (err, results) => {
    if (err) throw err
    res.send(`User with id = ${id} deleted succesfully`)
  })
})

module.exports = router
