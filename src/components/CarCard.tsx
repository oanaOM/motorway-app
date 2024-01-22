import { AsyncImage } from 'loadable-image';
import { Car } from './AppContextProvider';

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  return (
    <div className="card" data-testid={car.id}>
      <AsyncImage
        src={`${car.url}.png`}
        sources={[{ type: 'image/webp', srcSet: `${car.url}.webp` }]}
        style={{ width: 500, height: 400 }}
        loader={<div style={{ background: '#888' }} />}
        alt={`Image for ${car.id}`}
      />
    </div>
  );
}
