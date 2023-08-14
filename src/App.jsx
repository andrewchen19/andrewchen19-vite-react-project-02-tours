import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import Load from "./Load";
import Tours from "./Tours";

const url = "https://course-api.com/react-tours-project";

const AppContext = createContext();
// custom hook
export const useAppContext = () => useContext(AppContext);

const App = () => {
  // state
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);

  // define async function
  const fetchData = async () => {
    // 重新 fetch data 時，將 loading 狀態先變回 true
    setIsLoading(true);

    try {
      let response = await axios.get(url);
      console.log(response);
      setData(response.data);
    } catch (err) {
      setIsError(true);
    }
    // 資料獲取完成或出錯，才結束 loading
    setIsLoading(false);
  };

  // useEffect
  useEffect(() => {
    // 執行 async function
    fetchData();
  }, []);

  // conditional rendering
  if (isLoading) {
    return <Load />;
  }
  if (isError) {
    return <div>There is an error...</div>;
  }

  // event handling
  const deleteHandler = (id) => {
    let updatedData = data.filter((n) => n.id !== id);
    setData(updatedData);
  };

  // conditional rendering
  if (data.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>No tours left</h2>
          <button
            type="button"
            className="btn"
            style={{ marginTop: "1rem" }}
            onClick={() => fetchData()}
          >
            refresh
          </button>
        </div>
      </main>
    );
  }

  return (
    <AppContext.Provider value={{ deleteHandler }}>
      <main>
        {/* functional component */}
        <Tours data={data} setData={setData} />
      </main>
    </AppContext.Provider>
  );
};
export default App;
