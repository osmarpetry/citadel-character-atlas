import React from 'react';
import { Card } from '@heroui/card';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@heroui/table';
import { Pagination } from '@heroui/pagination';
import { Avatar } from '@heroui/avatar';
import { Chip } from '@heroui/chip';
import { Spinner } from '@heroui/spinner';
import { Skeleton } from '@heroui/skeleton';
import { Icon } from '@iconify/react';

import { Character, CharacterGender, CharacterStatus } from '@/types';
type ColumnKey = 'name' | 'status' | 'species' | 'gender';

const COLUMN_LABELS: Record<ColumnKey, string> = {
  name: 'NAME',
  status: 'STATUS',
  species: 'SPECIES',
  gender: 'GENDER',
};

interface CharacterTableProps {
  characters: Character[] | null | undefined;
  loading: boolean;
  error: string | null;
  page: number;
  pages: number;
  onPageChange: (p: number) => void;
  onRowSelect: (id: string) => void;
  visibleColumns: ColumnKey[];
}

function statusChipColor(
  status: CharacterStatus
): 'success' | 'danger' | 'default' {
  if (status === 'Alive') return 'success';
  if (status === 'Dead') return 'danger';

  return 'default';
}

function genderIcon(gender: CharacterGender) {
  switch (gender) {
    case 'Male':
      return 'lucide:mars';
    case 'Female':
      return 'lucide:venus';
    case 'Genderless':
      return 'lucide:ban';
    default:
      return 'lucide:user';
  }
}

function CharacterName({ character }: { character: Character }) {
  return (
    <div className='flex items-center gap-3 min-w-0'>
      <Avatar
        name={character.name}
        radius='md'
        size='sm'
        src={character.image}
      />
      <span className='font-medium truncate'>{character.name}</span>
    </div>
  );
}

function StatusValue({ character }: { character: Character }) {
  return (
    <div className='flex shrink-0 items-center gap-2'>
      <Icon
        className={
          character.status === 'Alive'
            ? 'text-success-500'
            : character.status === 'Dead'
              ? 'text-danger-500'
              : 'text-default-400'
        }
        height={14}
        icon='lucide:circle-dot'
        width={14}
      />
      <Chip
        className='capitalize'
        color={statusChipColor(character.status)}
        size='sm'
        variant='flat'
      >
        {character.status}
      </Chip>
    </div>
  );
}

function GenderValue({ character }: { character: Character }) {
  return (
    <div className='flex shrink-0 items-center gap-2'>
      <Icon
        className='text-default-500'
        height={16}
        icon={genderIcon(character.gender)}
        width={16}
      />
      <span className='text-small'>{character.gender}</span>
    </div>
  );
}

function CharacterCell({
  character,
  column,
}: {
  character: Character;
  column: ColumnKey;
}) {
  if (column === 'name') return <CharacterName character={character} />;
  if (column === 'status') return <StatusValue character={character} />;
  if (column === 'species') {
    return <span className='text-small'>{character.species}</span>;
  }

  return <GenderValue character={character} />;
}

function DesktopLoadingRows({ columns }: { columns: ColumnKey[] }) {
  return Array.from({ length: 6 }).map((_, rowIndex) => (
    <TableRow key={`loading-${rowIndex}`} textValue='Loading character'>
      {columns.map(column => (
        <TableCell key={column}>
          {column === 'name' ? (
            <div className='flex items-center gap-3'>
              <Skeleton className='h-8 w-8 rounded-md' />
              <Skeleton className='h-4 w-36 rounded-md' />
            </div>
          ) : (
            <Skeleton className='h-6 w-24 rounded-md' />
          )}
        </TableCell>
      ))}
    </TableRow>
  ));
}

function MobileLoadingCards() {
  return (
    <div className='space-y-3 p-3'>
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className='rounded-lg border border-default-200 bg-content1 p-3'
        >
          <div className='flex items-center gap-3'>
            <Skeleton className='h-10 w-10 rounded-md' />
            <div className='flex-1 space-y-2'>
              <Skeleton className='h-4 w-3/4 rounded-md' />
              <Skeleton className='h-3 w-1/2 rounded-md' />
            </div>
          </div>
          <div className='mt-3 grid grid-cols-2 gap-2'>
            <Skeleton className='h-8 rounded-md' />
            <Skeleton className='h-8 rounded-md' />
          </div>
        </div>
      ))}
    </div>
  );
}

function MobileCharacterCards({
  characters,
  loading,
  onRowSelect,
  visibleColumns,
}: {
  characters: Character[];
  loading: boolean;
  onRowSelect: (id: string) => void;
  visibleColumns: ColumnKey[];
}) {
  if (loading && characters.length === 0) return <MobileLoadingCards />;
  if (characters.length === 0) return null;

  return (
    <ul
      aria-label='Character cards'
      aria-busy={loading}
      className={`space-y-3 p-3 ${loading ? 'opacity-70' : ''}`}
    >
      {characters.map(character => {
        const showStatus = visibleColumns.includes('status');
        const showSpecies = visibleColumns.includes('species');
        const showGender = visibleColumns.includes('gender');
        const hasDetails = showGender;

        return (
          <li key={character.id}>
            <button
              aria-label={`View ${character.name}`}
              className='w-full rounded-lg border border-default-200 bg-content1 p-3 text-left shadow-sm transition-colors hover:bg-content2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
              type='button'
              onClick={() => onRowSelect(character.id)}
            >
              <div className='flex items-start gap-3'>
                <Avatar
                  name={character.name}
                  radius='md'
                  size='md'
                  src={character.image}
                />
                <div className='min-w-0 flex-1'>
                  <p className='truncate text-small font-semibold'>
                    {character.name}
                  </p>
                  {showSpecies && (
                    <p className='truncate text-tiny text-foreground-500'>
                      {character.species}
                    </p>
                  )}
                </div>
                {showStatus && <StatusValue character={character} />}
              </div>

              {hasDetails && (
                <div className='mt-3 grid grid-cols-1 gap-2 text-small'>
                  {showGender && (
                    <div className='flex items-center justify-between rounded-md bg-content2 px-3 py-2'>
                      <span className='text-foreground-500'>Gender</span>
                      <GenderValue character={character} />
                    </div>
                  )}
                </div>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function CenteredTableState({
  children,
  testId,
}: {
  children: React.ReactNode;
  testId: string;
}) {
  return (
    <div
      className='flex h-full min-h-[260px] items-center justify-center p-8 text-center'
      data-testid={testId}
    >
      {children}
    </div>
  );
}

export default function CharacterTable({
  characters,
  loading,
  error,
  page,
  pages,
  onPageChange,
  onRowSelect,
  visibleColumns,
}: CharacterTableProps) {
  const hasData = !!characters && characters.length > 0;
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Ensure we always have at least one visible column to prevent table structure errors
  const safeVisibleColumns: ColumnKey[] =
    visibleColumns && visibleColumns.length > 0
      ? visibleColumns
      : ['name', 'status', 'species', 'gender'];
  const rows = characters ?? [];

  return (
    <Card
      className='h-full min-h-0 flex flex-col overflow-hidden border border-default-200 p-0'
      data-testid='character-table-card'
    >
      {loading && !error && (
        <div
          aria-live='polite'
          className='flex items-center gap-2 border-b border-default-200 px-4 py-2 text-small text-foreground-500'
          role='status'
        >
          <Spinner color='primary' size='sm' />
          <span>Loading characters...</span>
        </div>
      )}

      <div
        ref={containerRef}
        className='flex-1 min-h-0 overflow-hidden w-full'
        data-testid='character-table-content'
      >
        {error ? (
          <CenteredTableState testId='character-table-error-state'>
            <div className='rounded-lg border border-danger-200 bg-danger-50 p-4'>
              <h3 className='font-semibold text-danger-900'>
                Error fetching characters
              </h3>
              <p className='text-danger-700'>{error}</p>
            </div>
          </CenteredTableState>
        ) : !loading && !hasData ? (
          <CenteredTableState testId='character-table-empty-state'>
            <div>
              <div className='mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-content2'>
                <Icon
                  className='text-default-500'
                  height={20}
                  icon='lucide:search-x'
                  width={20}
                />
              </div>
              <p className='text-small font-medium'>No characters found</p>
              <p className='text-tiny text-foreground-500'>
                Try searching for a character name like &quot;Rick&quot; or{' '}
                &quot;Morty&quot;.
              </p>
            </div>
          </CenteredTableState>
        ) : (
          <>
            <div
              aria-busy={loading}
              className={`hidden h-full overflow-auto sm:block ${
                loading && hasData ? 'opacity-70' : ''
              }`}
            >
              <Table
                fullWidth
                isStriped
                removeWrapper
                aria-label='Characters table'
                onRowAction={key => onRowSelect(String(key))}
              >
                <TableHeader>
                  {safeVisibleColumns.map(column => (
                    <TableColumn key={column}>
                      {COLUMN_LABELS[column]}
                    </TableColumn>
                  ))}
                </TableHeader>
                <TableBody emptyContent={null} isLoading={false}>
                  {loading && !hasData
                    ? DesktopLoadingRows({ columns: safeVisibleColumns })
                    : hasData
                      ? rows.map(c => (
                          <TableRow key={c.id} textValue={c.name}>
                            {safeVisibleColumns.map(column => (
                              <TableCell key={column}>
                                <CharacterCell character={c} column={column} />
                              </TableCell>
                            ))}
                          </TableRow>
                        ))
                      : []}
                </TableBody>
              </Table>
            </div>

            <div className='h-full overflow-auto sm:hidden'>
              <MobileCharacterCards
                characters={rows}
                loading={loading}
                visibleColumns={safeVisibleColumns}
                onRowSelect={onRowSelect}
              />
            </div>
          </>
        )}
      </div>

      <div
        className='mt-auto flex shrink-0 justify-center border-t border-default-200 py-4'
        data-testid='character-table-pagination'
      >
        <Pagination
          showControls
          color='primary'
          page={Math.max(1, page || 1)}
          total={Math.max(1, pages || 1)}
          onChange={onPageChange}
        />
      </div>
    </Card>
  );
}
