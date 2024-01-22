import React, { useEffect, useState } from 'react';
import { Car, useAppContext } from '../AppContextProvider';
import useSWR, { SWRResponse } from 'swr';
import { fetcher } from '../../utils/swr';
import { CarCard } from '../CarCard';
import '../../styles/cars.scss';
import SearchSVG from '../../assets/icons/search.svg';

const CarsList: React.FC = () => {
  const [fetchData, setFetchData] = useState<boolean>(false);
  const { search } = useAppContext();

  const { data: cars, isLoading }: SWRResponse<Car[], Error> = useSWR(
    fetchData ? `http://localhost:8000/api/cars?tag=${search.tag}` : null,
    fetcher
  );

  useEffect(() => {
    if (search.tag && search.tag.length > 0) {
      setFetchData(true);
    }
  }, [search.tag]);

  const heading = search.tag ? search.tag.charAt(0).toUpperCase() + search.tag.slice(1) : undefined;

  return (
    <div>
      {heading && <h1>{heading}</h1>}
      <div className="container">
        {!cars && !isLoading && (
          <div>
            <img src={SearchSVG} />
            <h3>Use the search to find vehicles</h3>
          </div>
        )}
        {isLoading && <div>Loading...</div>}

        <div className="cars-container">{cars && cars.map((car) => <CarCard car={car} key={car.id} />)}</div>
      </div>
    </div>
  );
};

export default CarsList;
