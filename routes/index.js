import chatRoutes from 'chat';

const app = express();
const server = createServer(app);

const constructorMethod = (app) => {
    app.use('/', chatRoutes);
    app.use('*', (req, res) => {
      res.status(404).json({error:'Page Not found'});
    });
  };

export default constructorMethod;