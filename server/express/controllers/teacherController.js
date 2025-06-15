const { Teacher, Activity } = require('../models');

exports.getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.findAll();
        res.status(200).json({ status: 'success', data: teachers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', error: error.message });
    }
};

exports.getTeacherById = async (req, res) => {
    try {
        const { id } = req.params;

        const teacher = await Teacher.findByPk(id, {
            include: [
                {
                    model: Activity,
                    attributes: ['id', 'name', 'description', 'photos'],
                    through: {
                        attributes: ['timetable']
                    }
                }
            ]
        });

        if (!teacher) {
            return res.status(404).json({ status: 'error', error: 'Teacher not found' });
        }

        res.status(200).json({ status: 'success', data: teacher });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', error: error.message });
    }
};