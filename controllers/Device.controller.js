import fs from 'fs/promises';

export const Device = async (req, res) => {
    try {
        const file = await fs.readFile(new URL('../data/Device.json', import.meta.url), 'utf-8');
        const data = JSON.parse(file);

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const paginatedData = data.slice(startIndex, endIndex);

        res.status(200).json({
            status: 200,
            message: "Device data",
            currentPage: page,
            totalPages: Math.ceil(data.length / limit),
            totalItems: data.length,
            data: paginatedData
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

export default Device;
