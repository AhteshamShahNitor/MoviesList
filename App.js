import { Provider } from "react-redux";
import store from "./src/store/store";
import AppInternal from "./src/AppInternal";

function App() {
  return (
    <Provider store={store}>
      <AppInternal />
    </Provider>
  );
}

export default App;