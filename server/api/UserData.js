const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json(library);
})
  
//retreiving stuff from user library
router.get('/:id', (req, res) => {
  const valid = library.some(lib => lib.id === parseInt(req.params.id));

  if (valid) {
      res.json(library.filter(lib => lib.id === parseInt(req.params.id)));
  } else {
      res.status(400).json({msg: `No element with id ${req.params.id}`});
}
})

//create
router.post('/', (req, res) => {
  const newData = {
    name: req.body.name,
    status: 'added'
  };

  if (!newData.name) {
    return res.status(400).json({msg: 'no name'});
  }

  library.push(newData);
  res.json(library);

})
  
//update
router.put('/:id', (req, res) => {
  const valid = library.some(lib => lib.id === parseInt(req.params.id));

  if (valid) {
      const update = req.body;
      library.forEach(lib => {
        if (lib.id === parseInt(req.params.id)) {
          lib.name = update.name ? update.name : req.body.name;
          res.json({ msg: 'updated', lib});
        }
      })
  } else {
      res.status(400).json({msg: `No element with id ${req.params.id}`});
}
})


module.exports = router;

//delete
router.delete('/:id', (req, res) => {
  const valid = library.some(lib => lib.id === parseInt(req.params.id));

  if (valid) {
      res.json({msg: 'member deleted', library: library.filter(lib => lib.id !== parseInt(req.params.id))});
  } else {
      res.status(400).json({msg: `No element with id ${req.params.id}`});
}
})