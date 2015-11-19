import { Router5 } from 'router5';
import historyPlugin from 'router5-history';

export default function createRouter() {
  const router = new Router5()
    .setOption('useHash', false)
    .setOption('trailingSlash', true)
    // .setOption('defaultRoute', 'home')
    // Routes
    .addNode('home', '/')
    .addNode('about', '/about')
    // .addNode('404', '/404')
    // Plugins
    .usePlugin(historyPlugin());

  if (__CLIENT__ && process.env.NODE_ENV !== 'production') {
    router.usePlugin(Router5.loggerPlugin());
  }

  return router;
};
