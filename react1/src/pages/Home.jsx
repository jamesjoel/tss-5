import Box1 from "../components/Box1"
import NameContext from "../NameContext";

const Home = () => {
  let name = "rohit";
  return (
    <NameContext.Provider value={name}>
          <div className="container">
            <Box1 />
          </div>
    </NameContext.Provider>
  )
}

export default Home