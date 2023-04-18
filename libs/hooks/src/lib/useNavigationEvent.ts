'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

// for layout
export function useNavigationEvent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + searchParams.toString();
    // You can now use the current URL
  }, [pathname, searchParams]);
}
