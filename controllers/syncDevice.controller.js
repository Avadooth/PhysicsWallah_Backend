import fs from 'fs/promises';

export const syncDevice = async (req, res) => {
    const { id } = req.body;

    try {
        const file = await fs.readFile(new URL('../data/Device.json', import.meta.url), 'utf-8');
        const data = JSON.parse(file);
        const deviceIndex = data.findIndex((device) => String(device.id) === String(id));

        if (deviceIndex === -1) {
            return res.status(404).json({ status: 404, message: 'Device not found' });
        }

        // Update to pending
        data[deviceIndex].lastSync = new Date().toISOString();
        data[deviceIndex].status = 'Pending';
        delete data[deviceIndex].error;

        await saveData(data);

        // Respond immediately
        res.status(200).json({ status: 200, message: 'Sync started', data: data[deviceIndex] });

        // Simulate async delay
        setTimeout(async () => {
            const updatedFile = await fs.readFile(new URL('../data/Device.json', import.meta.url), 'utf-8');
            const newData = JSON.parse(updatedFile);
            const idx = newData.findIndex((device) => String(device.id) === String(id));

            if (idx !== -1) {
                const statuses = ['Success', 'Failed', 'Pending'];
                const randomIndex = Math.floor(Math.random() * 3);
                const finalStatus = statuses[randomIndex];

                newData[idx].status = finalStatus;
                if (finalStatus === 'Failed') {
                    newData[idx].error = "Sync failed due to network timeout";
                } else {
                    delete newData[idx].error;
                }

                await saveData(newData);
            }
        }, 5000);

    } catch (error) {
        res.status(500).json({ status: 500, message: 'Internal server error', error: error.message });
    }
};

const saveData = async (data) => {
    await fs.writeFile(
        new URL('../data/Device.json', import.meta.url),
        JSON.stringify(data, null, 2)
    );
};

export default syncDevice;