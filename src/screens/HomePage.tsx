'use client';
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { useTranslations } from 'next-intl';

type UserFake = {
  id: number;
  name: string;
  email: string;
  address: string;
};

const users: UserFake[] = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao@example.com',
    address: 'Rua A, 123',
  },
  {
    id: 2,
    name: 'Maria Santos',
    email: 'maria@example.com',
    address: 'Av. B, 456',
  },
  {
    id: 3,
    name: 'Pedro Oliveira',
    email: 'pedro@example.com',
    address: 'Praça C, 789',
  },
  {
    id: 4,
    name: 'Ana Rodrigues',
    email: 'ana@example.com',
    address: 'Rua D, 101',
  },
  {
    id: 5,
    name: 'Carlos Ferreira',
    email: 'carlos@example.com',
    address: 'Av. E, 202',
  },
  {
    id: 6,
    name: 'Beatriz Lima',
    email: 'beatriz@example.com',
    address: 'Praça F, 303',
  },
  {
    id: 7,
    name: 'Fernando Costa',
    email: 'fernando@example.com',
    address: 'Rua G, 404',
  },
  {
    id: 8,
    name: 'Mariana Alves',
    email: 'mariana@example.com',
    address: 'Av. H, 505',
  },
  {
    id: 9,
    name: 'Ricardo Nunes',
    email: 'ricardo@example.com',
    address: 'Praça I, 606',
  },
  {
    id: 10,
    name: 'Camila Souza',
    email: 'camila@example.com',
    address: 'Rua J, 707',
  },
];

const ITEMS_PER_PAGE = 5;

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const translate = useTranslations('Home');

  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentUsers = users.slice(startIndex, endIndex);

  return (
    <div>
      <Navbar />
      <main className='container mx-auto mt-8 px-4 sm:px-0'>
        <h1 className='text-2xl font-bold mb-4'>
          {translate('userListTitle')}
        </h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{translate('name')}</TableHead>
              <TableHead>{translate('email')}</TableHead>
              <TableHead>{translate('address')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className='flex justify-between items-center mt-4'>
          <Button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
          >
            {translate('previous')}
          </Button>
          <span>
            {translate('pageInfo', { current: currentPage, total: totalPages })}
          </span>
          <Button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
          >
            {translate('next')}
          </Button>
        </div>
      </main>
    </div>
  );
}
