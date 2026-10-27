import React from 'react';
import { ICategory } from '../types/categoryTypes';
import Link from 'next/link';

const NavLinks = async () => {
    const res = await fetch('https://news-api-v2.vercel.app/api/categories');
    const data = await res.json();
    const categories: ICategory[] = data.data;
    const filteredCategories = categories.filter((category: ICategory) => category.scrapable);

    console.log(filteredCategories);

    return (
        <div>
            {filteredCategories.map((category: ICategory, index: number) => (
                <Link
                    key={index}
                    href={category.slug}
                    className="flex gap-2 font-medium text-gray-700 transition-colors hover:text-red-600"
                > 
                    {category.title}
                </Link>
            ))}
        </div>
    );
};

export default NavLinks;