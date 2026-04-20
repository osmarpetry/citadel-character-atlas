import React, { useState, useEffect } from 'react';
import { Input } from '@heroui/input';
import { Select, SelectItem } from '@heroui/select';
import { Icon } from '@iconify/react';

interface SearchBarProps {
  value: string;
  statusValues: string[];
  genderValues: string[];
  columnValues: ('name' | 'status' | 'species' | 'gender')[];
  onChange: (val: string) => void;
  onClear?: () => void;
  onStatusChange: (vals: string[]) => void;
  onGenderChange: (vals: string[]) => void;
  onColumnsChange: (vals: ('name' | 'status' | 'species' | 'gender')[]) => void;
}

export default function SearchBar({
  value,
  statusValues,
  genderValues,
  columnValues,
  onChange,
  onClear,
  onStatusChange,
  onGenderChange,
  onColumnsChange,
}: SearchBarProps) {
  const idPrefix = React.useId();
  const [inputValue, setInputValue] = useState(value);
  const statusValuesKey = statusValues.join('\u0000');
  const genderValuesKey = genderValues.join('\u0000');
  const columnValuesKey = columnValues.join('\u0000');
  const statusSelectedKeys = React.useMemo(
    () => new Set(statusValues),
    [statusValuesKey]
  );
  const genderSelectedKeys = React.useMemo(
    () => new Set(genderValues),
    [genderValuesKey]
  );
  const columnSelectedKeys = React.useMemo(
    () => new Set(columnValues),
    [columnValuesKey]
  );

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
    onChange(newValue);
  };

  const handleClear = () => {
    setInputValue('');
    if (onClear) {
      onClear();
    } else {
      onChange('');
    }
  };

  return (
    <div className='w-full flex flex-col gap-3'>
      {/* Search input - full width */}
      <div className='w-full'>
        <Input
          isClearable
          aria-label='Search characters'
          classNames={{
            inputWrapper: 'h-14 min-h-14', // 56px height
            input: 'h-14',
          }}
          id={`${idPrefix}-character-search`}
          placeholder='Search the Citadel character atlas...'
          size='md'
          startContent={
            <Icon
              className='text-default-400'
              height={18}
              icon='lucide:search'
              width={18}
            />
          }
          value={inputValue}
          onClear={handleClear}
          onValueChange={handleInputChange}
        />
      </div>

      {/* Filters row - three selects */}
      <div className='w-full grid grid-cols-1 sm:grid-cols-3 gap-3'>
        <Select
          isClearable
          aria-label='Filter by status'
          className='w-full'
          classNames={{ trigger: 'h-14 min-h-14' }} // 56px height
          id={`${idPrefix}-status-filter`}
          label='Status'
          placeholder='All'
          selectedKeys={statusSelectedKeys}
          selectionMode='multiple'
          size='md'
          onSelectionChange={keys =>
            onStatusChange(Array.from(keys as Set<React.Key>).map(String))
          }
        >
          <SelectItem key='Alive'>Alive</SelectItem>
          <SelectItem key='Dead'>Dead</SelectItem>
          <SelectItem key='unknown'>Unknown</SelectItem>
        </Select>

        <Select
          isClearable
          aria-label='Filter by gender'
          className='w-full'
          classNames={{ trigger: 'h-14 min-h-14' }} // 56px height
          id={`${idPrefix}-gender-filter`}
          label='Gender'
          placeholder='All'
          selectedKeys={genderSelectedKeys}
          selectionMode='multiple'
          size='md'
          onSelectionChange={keys =>
            onGenderChange(Array.from(keys as Set<React.Key>).map(String))
          }
        >
          <SelectItem key='Female'>Female</SelectItem>
          <SelectItem key='Male'>Male</SelectItem>
          <SelectItem key='Genderless'>Genderless</SelectItem>
          <SelectItem key='unknown'>Unknown</SelectItem>
        </Select>

        <Select
          isClearable
          aria-label='Visible columns'
          className='w-full'
          classNames={{ trigger: 'h-14 min-h-14' }} // 56px height
          id={`${idPrefix}-columns-filter`}
          label='Columns'
          placeholder='Choose'
          selectedKeys={columnSelectedKeys}
          selectionMode='multiple'
          size='md'
          onSelectionChange={keys =>
            onColumnsChange(
              Array.from(keys as Set<React.Key>).map(
                k => k as 'name' | 'status' | 'species' | 'gender'
              )
            )
          }
        >
          <SelectItem key='name'>Name</SelectItem>
          <SelectItem key='status'>Status</SelectItem>
          <SelectItem key='species'>Species</SelectItem>
          <SelectItem key='gender'>Gender</SelectItem>
        </Select>
      </div>
    </div>
  );
}
