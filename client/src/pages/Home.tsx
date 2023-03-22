import Wrapper from "../components/parts/Wrapper/Wrapper";
import DriversList from "../components/complex/DriversList/DriversList";
import AddDriverCard from "../components/complex/AddDriverCard/AddDriverCard";

function Home() {


  return (
    <Wrapper>
      <DriversList />
      <AddDriverCard />
    </Wrapper>
  );
}

export default Home;
