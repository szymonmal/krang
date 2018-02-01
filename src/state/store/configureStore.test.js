import configureStore from './configureStore';

it('configureStore should generate store without errors and have dispatch', () => {
  const store = configureStore();

  expect(store.dispatch).toBeDefined();
});
