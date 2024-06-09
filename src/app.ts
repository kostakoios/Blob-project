import { createApp } from './createApp';

const app = createApp();

const PORT = 5000;
app.listen(PORT, () => console.log(`server running on Port ${PORT}`));