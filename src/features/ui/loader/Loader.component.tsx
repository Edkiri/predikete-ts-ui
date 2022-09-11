import ClipLoader from 'react-spinners/ClipLoader';
import './Loader.css';

interface LoaderProps {
  loading: boolean;
  size?: number;
  color?: string;
}

export function Loader({ loading, size = 60, color = '#008EE9' }: LoaderProps) {
  return (
    <div className="LoaderContainer">
      <ClipLoader loading={loading} color={color} size={size} />
    </div>
  );
}
