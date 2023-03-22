import Wrapper from "../components/parts/Wrapper/Wrapper";
import CarsList from "../components/complex/CarsList/CarsList";
import AddCarCard from "../components/complex/AddCarCard/AddCarCard";

function PageCarsList() {
  return (
    <Wrapper>
      <CarsList />
      <AddCarCard />
    </Wrapper>
  );
}

export default PageCarsList;
