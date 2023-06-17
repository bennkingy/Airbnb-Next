'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { useCallback } from 'react';
import { IconType } from 'react-icons';

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter(); // Access the router object from Next.js
  const params = useSearchParams(); // Access the search params from the URL

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString()); // Parse the search params into an object
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label, // Set the 'category' key in the query object to the current category label
    };

    if (params?.get('category') === label) {
      delete updatedQuery.category; // If the category is already selected, remove the 'category' key from the query object
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true } // Skip null or undefined values in the query object
    );

    router.push(url); // Navigate to the updated URL
  }, [label, router, params]);

  return (
    <div
      onClick={handleClick}
      className={`
        flex 
        flex-col 
        items-center 
        justify-center 
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? 'border-b-neutral-800' : 'border-transparent'}
        ${selected ? 'text-neutral-800' : 'text-neutral-500'}
      `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>{' '}
    </div>
  );
};

export default CategoryBox;
