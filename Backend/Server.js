require('dotenv').config();
const http = require('http');
const app = require('./App');
const db = require('./V1/Model/index.Model');

const PORT = process.env.PORT || 5000;

// Create server
const server = http.createServer(app);

// Sync Sequelize DB and start server
db.sequelize.sync({ force: false })
    .then(() => {
        console.log('📦 Database connected successfully');
        server.listen(PORT, () => {
            console.log(`✅ Server running at http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ Failed to connect to database:', err);
        process.exit(1);
    });
