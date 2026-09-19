import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumbs" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs md:text-sm text-slate-400">
        <li className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-pulse transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-pulse transition-colors truncate max-w-[180px] md:max-w-xs"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className="text-slate-200 font-medium truncate max-w-[200px] md:max-w-md"
                  aria-current="page"
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
