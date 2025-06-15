const { Activity, Teacher } = require('../models');

exports.getActivities = async (req, res) => {
    try {
        const { categoryId, highlighted, limit } = req.query;

        const whereCondition = {};

        if (categoryId) {
            whereCondition.activity_category_id = categoryId;
        }

        if (highlighted !== undefined) {
            whereCondition.highlighted = highlighted === 'true';
        }

        const queryOptions = {
            where: whereCondition,
            include: [
                {
                    model: Teacher,
                    attributes: ['id', 'name', 'surname', 'photos'],
                    through: {
                        attributes: ['timetable']
                    }
                }
            ],
            order: [['name', 'ASC']]
        };

        if (limit !== undefined) {
            queryOptions.limit = parseInt(limit, 3);
        }

        const activities = await Activity.findAll(queryOptions);

        res.status(200).json({ status: 'success', data: activities });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', error: error.message });
    }
};


exports.getActivityById = async (req, res) => {
    try {
        const { id } = req.params;

        const activity = await Activity.findByPk(id, {
            include: [
                {
                    model: Teacher,
                    attributes: ['id', 'name', 'surname'],
                    through: {
                        attributes: ['timetable']
                    }
                }
            ]
        });

        if (!activity) {
            return res.status(404).json({ status: 'error', error: 'Activity not found' });
        }

        res.status(200).json({ status: 'success', data: activity });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', error: error.message });
    }
};
