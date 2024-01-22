import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CarCard } from './CarCard';

const MOCK_CAR = {
  id: '3akA0XDg1_g',
  created_at: '2018-02-07T04:02:51-05:00',
  updated_at: '2020-04-14T01:11:57-04:00',
  color: '#EEEBE9',
  description: 'null',
  alt_description: 'red Ferrari car',
  tags: ['red car', 'red'],
  likes: 346,
  user: '',
  url: '',
};

describe('CarCard component', () => {
  test('renders the image of the car', async () => {
    render(<CarCard car={MOCK_CAR} />);

    expect(screen.getByText('3akA0XDg1_g')).toBeInTheDocument();
  });
});
