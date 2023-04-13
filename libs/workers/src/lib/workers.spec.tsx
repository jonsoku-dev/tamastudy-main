import { render } from '@testing-library/react';

import Workers from './workers';

describe('Workers', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Workers />);
    expect(baseElement).toBeTruthy();
  });
});
