'use client';
import { useEffect, useState } from 'react';

interface Props {
  date: string;
}

const FormattedDate: React.FC<Props> = ({ date }) => {
  const [formatted, setFormatted] = useState('');

  useEffect(() => {
    const d = new Date(date);
    const str = d.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    setFormatted(str);
  }, [date]);

  return <span>{formatted}</span>;
};

export default FormattedDate;
