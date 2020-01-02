const Store = require('../models/Store');

//@desc Get all stores
//@route GET /api/v1/stores
//@access public

exports.getStores = async (req, res, next) => {
  try {
    const stores = await Store.find();

    res.status(200).json({
      success: true,
      count: stores.length,
      data: stores
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Server error'
    });
  }
};

//@desc Craete store
//@route POST /api/v1/stores
//@access public

exports.addStore = async (req, res, next) => {
  try {
    const store = await Store.create(req.body);
    return res.status(200).json({
      success: true,
      data: store
    });
  } catch (error) {
    console.log(error);
    if ((error.code = 11000)) {
      return res.status(400).json({
        error: 'Sklep o tym ID już istnieje'
      });
    }
    return res.status(500).json({
      error: 'Server error'
    });
  }
};
