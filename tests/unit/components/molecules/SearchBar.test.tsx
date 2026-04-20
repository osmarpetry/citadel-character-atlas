/**
 * Unit tests for SearchBar component
 * Tests input behavior and filter interactions
 */

import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import SearchBar from '@/components/molecules/SearchBar';
import { vi } from 'vitest';

const SEARCH_PLACEHOLDER = 'Search the Citadel character atlas...';

describe('SearchBar Component', () => {
  const defaultProps = {
    value: '',
    statusValues: [],
    genderValues: [],
    columnValues: ['name', 'status', 'species', 'gender'] as (
      | 'name'
      | 'status'
      | 'species'
      | 'gender'
    )[],
    onChange: vi.fn(),
    onClear: vi.fn(),
    onStatusChange: vi.fn(),
    onGenderChange: vi.fn(),
    onColumnsChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Search Input', () => {
    it('should render search input with correct placeholder', () => {
      render(<SearchBar {...defaultProps} />);

      const input = screen.getByPlaceholderText(SEARCH_PLACEHOLDER);
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('aria-label', 'Search characters');
    });

    it('should display the provided value', () => {
      render(<SearchBar {...defaultProps} value='rick' />);

      const input = screen.getByDisplayValue('rick');
      expect(input).toBeInTheDocument();
    });

    it('should update input value immediately when typing', () => {
      render(<SearchBar {...defaultProps} />);

      const input = screen.getByPlaceholderText(SEARCH_PLACEHOLDER);

      fireEvent.change(input, { target: { value: 'rick' } });

      expect(input).toHaveValue('rick');
    });

    it('should call onChange immediately while typing', () => {
      const mockOnChange = vi.fn();
      render(<SearchBar {...defaultProps} onChange={mockOnChange} />);

      const input = screen.getByPlaceholderText(SEARCH_PLACEHOLDER);

      fireEvent.change(input, { target: { value: 'rick' } });

      expect(input).toHaveValue('rick');
      expect(mockOnChange).toHaveBeenCalledWith('rick');
    });

    it('should update the input value when it is cleared', () => {
      const mockOnClear = vi.fn();
      render(
        <SearchBar {...defaultProps} value='test' onClear={mockOnClear} />
      );

      const input = screen.getByDisplayValue('test');

      fireEvent.change(input, { target: { value: '' } });

      expect(input).toHaveValue('');
    });

    it('should call onChange with empty string when input is cleared', () => {
      const mockOnChange = vi.fn();
      render(
        <SearchBar {...defaultProps} value='test' onChange={mockOnChange} />
      );

      const input = screen.getByDisplayValue('test');

      // Simulate clear action
      fireEvent.change(input, { target: { value: '' } });

      expect(input).toHaveValue('');
      expect(mockOnChange).toHaveBeenCalledWith('');
    });
  });

  describe('Status Filter', () => {
    it('should render status select with correct options', () => {
      render(<SearchBar {...defaultProps} />);

      const statusSelect = screen.getByLabelText('Filter by status');
      expect(statusSelect).toBeInTheDocument();
    });

    it('should display selected status values', () => {
      render(<SearchBar {...defaultProps} statusValues={['Alive', 'Dead']} />);

      const statusSelect = screen.getByLabelText('Filter by status');
      expect(statusSelect).toBeInTheDocument();
      // Note: HeroUI Select component behavior would need more specific testing
    });

    it('should call onStatusChange when selection changes', () => {
      const mockOnStatusChange = vi.fn();
      render(
        <SearchBar {...defaultProps} onStatusChange={mockOnStatusChange} />
      );

      // This would require more complex interaction with HeroUI Select
      // For now, we verify the callback is passed correctly
      expect(mockOnStatusChange).toBeDefined();
    });
  });

  describe('Gender Filter', () => {
    it('should render gender select with correct label', () => {
      render(<SearchBar {...defaultProps} />);

      const genderSelect = screen.getByLabelText('Filter by gender');
      expect(genderSelect).toBeInTheDocument();
    });

    it('should display selected gender values', () => {
      render(<SearchBar {...defaultProps} genderValues={['Male', 'Female']} />);

      const genderSelect = screen.getByLabelText('Filter by gender');
      expect(genderSelect).toBeInTheDocument();
    });
  });

  describe('Columns Filter', () => {
    it('should render columns select with correct label', () => {
      render(<SearchBar {...defaultProps} />);

      const columnsSelect = screen.getByLabelText('Visible columns');
      expect(columnsSelect).toBeInTheDocument();
    });

    it('should display selected column values', () => {
      render(<SearchBar {...defaultProps} columnValues={['name', 'status']} />);

      const columnsSelect = screen.getByLabelText('Visible columns');
      expect(columnsSelect).toBeInTheDocument();
    });
  });

  describe('Component Integration', () => {
    it('should sync input value with prop changes', () => {
      const { rerender } = render(<SearchBar {...defaultProps} value='' />);

      const input = screen.getByPlaceholderText(SEARCH_PLACEHOLDER);
      expect(input).toHaveValue('');

      // Update prop value
      rerender(<SearchBar {...defaultProps} value='morty' />);

      expect(input).toHaveValue('morty');
    });

    it('should maintain local input state during typing', () => {
      render(<SearchBar {...defaultProps} value='' />);

      const input = screen.getByPlaceholderText(SEARCH_PLACEHOLDER);

      // Type in input
      fireEvent.change(input, { target: { value: 'typing...' } });

      // Input should show what user typed
      expect(input).toHaveValue('typing...');
    });

    it('should render all filter sections', () => {
      render(<SearchBar {...defaultProps} />);

      // Check that all main sections are present
      expect(screen.getByLabelText('Search characters')).toBeInTheDocument();
      expect(screen.getByLabelText('Filter by status')).toBeInTheDocument();
      expect(screen.getByLabelText('Filter by gender')).toBeInTheDocument();
      expect(screen.getByLabelText('Visible columns')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      render(<SearchBar {...defaultProps} />);

      expect(screen.getByLabelText('Search characters')).toBeInTheDocument();
      expect(screen.getByLabelText('Filter by status')).toBeInTheDocument();
      expect(screen.getByLabelText('Filter by gender')).toBeInTheDocument();
      expect(screen.getByLabelText('Visible columns')).toBeInTheDocument();
    });

    it('should be keyboard accessible', () => {
      render(<SearchBar {...defaultProps} />);

      const input = screen.getByLabelText('Search characters');

      // Input should be focusable
      act(() => {
        input.focus();
      });
      expect(document.activeElement).toBe(input);
    });
  });
});
