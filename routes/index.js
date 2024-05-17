import chatRoutes from './chat.js';

const constructorMethod = (app) => {
    app.use('/', chatRoutes);
    app.use('*', (req, res) => {
      res.status(404).json({error:'Page Not found'});
    });
  };

export default constructorMethod;