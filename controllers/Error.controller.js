import fs from 'fs/promises';

export const ErrorController = async (req, res) => {
    try {
        const file = await fs.readFile(new URL('../data/Device.json', import.meta.url), 'utf-8');
        const json = JSON.parse(file);

        const errors = json.filter((item) => item.status === "Failed");

        if (errors.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "No devices with error found",
                data: [],
            });
        }

        // Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const paginated = errors.slice(startIndex, endIndex);

        res.status(200).json({
            status: 200,
            message: "Device error data",
            currentPage: page,
            totalPages: Math.ceil(errors.length / limit),
            totalItems: errors.length,
            data: paginated
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

export default ErrorController;
