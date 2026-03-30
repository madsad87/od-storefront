'use client';

import { useMemo, useState } from 'react';
import { ButtonLink } from '@/components/ui/button';

const SIZE_OPTIONS = ['XS', 'S', 'M', 'L'];

export function PurchasePanel({ price, shortDescription }: { price: string; shortDescription?: string | null }) {
  const [size, setSize] = useState('M');

  const guidance = useMemo(() => {
    if (shortDescription?.trim()) {
      return shortDescription.replace(/<[^>]*>/g, '').slice(0, 120);
    }

    return 'Tailored for rooftop dinners, late reservations, and after-dark plans.';
  }, [shortDescription]);

  return (
    <aside className="purchase-panel">
      <p className="eyebrow">Selected fit</p>
      <p className="price">{price}</p>
      <p className="fit-guidance">{guidance}</p>

      <div>
        <p className="option-label">Size</p>
        <div className="size-grid">
          {SIZE_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              className={`size-chip ${size === option ? 'active' : ''}`}
              onClick={() => setSize(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <ButtonLink href="/checkout" variant="primary" className="cta-full">
        Add to bag — {size}
      </ButtonLink>

      <div className="mobile-sticky-cta">
        <ButtonLink href="/checkout" variant="primary" className="cta-full">
          Add to bag — {price}
        </ButtonLink>
      </div>
    </aside>
  );
}
