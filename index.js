require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./models/index.js');
const routes = require('./routes/index.js');
const compression = require('compression');
const swagger = require('swagger-ui-express');
const docs = require('./api.json');
// const { GALLERY_DIR } = require('./settings');
const seederUser = require('./seeders/user.seeder');
const seederOutlet = require('./seeders/outlet.seeder');
const seederMenu = require('./seeders/menu.seeder');
// const scheduler = require('./scheduler')

const app = express();

// front end domain
const corsOption = {
    origin: true, // ['clienturl']
    credentials: true,
};

app.use(compression());
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(GALLERY_DIR, express.static(path.join(__dirname, GALLERY_DIR)));

//only on developent development
db.sequelize
    .sync({ force: process.env.NODE_ENV !== 'production' ? true : false })
    .then(() => {
        console.log('Drop and re-sync db.');
        if (process.env.NODE_ENV !== 'production') {
            (async () => {
                try {
                    const user = await seederUser.createSuperUser();
                    const outlet = await seederOutlet.createOutlet();
                    const menus = await seederMenu.createMenu();

                    if (user && outlet) {
                        await seederOutlet.createOutletUser(outlet.id, user.id);
                    }
                    console.log("menusyayay", menus);
                    if (menus && user) {
                        await seederMenu.createRoleAccess(user.role_id, menus);
                    }

                    // console.log(menus);
                } catch (err) {
                    console.log(err);
                }
            })();
        }
    });

if (process.env.NODE_ENV !== 'production') {
    app.use('/api-docs', swagger.serve, swagger.setup(docs));
}

app.get('/', (_, res) => {
    res.send({ message: 'ok' });
});

// routes.role(app);
// routes.user(app);
// routes.dashboard(app);
// routes.customer(app);
// routes.installmentHistory(app);
// routes.customerLoan(app);
// routes.auth(app);
// routes.gallery(app, __dirname);

const port = process.env.PORT || 3001;
const host = process.env.HOST || 'localhost';

app.listen(port, host, () => {
    console.log(`Server is running on ${host}:${port}`);
});

//scheduler.payment.start()
