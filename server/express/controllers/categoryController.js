const { Category, Activity } = require('../models');

exports.getAllCategories = async (req, res) => {
    const categories = await Category.findAll();
    res.status(200).json({ status: 'success', data: categories });
};

exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id, {
            attributes: ['id', 'name','description'],
            include: [
                {
                    model: Activity,
                    as: 'activities',
                    attributes: ['id', 'name', 'description']
                }
            ]
        });

        if (!category) {
            return res.status(404).json({ status: 'error', error: 'Category not found' });
        }

        res.status(200).json({ status: 'success', data: category });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', error: error.message });
    }
};