
import { Event, Session } from './interfaces/event.interface';

export const events: Event[] = [
  {
    id: 'evt-101',
    title: 'Technology Innovation Summit',
    description: 'Explore modern technology, AI, and innovation.',
    location: 'Main Campus',
    eventDate: '2026-12-04T09:00:00.000Z',
    category: 'technology',
    isPublished: true,
  },
  {
    id: 'evt-102',
    title: 'Business Leadership Workshop',
    description: 'Develop leadership and entrepreneurship skills.',
    location: 'Business Block',
    eventDate: '2026-12-10T10:00:00.000Z',
    category: 'business',
    isPublished: true,
  },
  {
    id: 'evt-103',
    title: 'Campus Music Festival',
    description: 'Enjoy music and performances from students.',
    location: 'Main Campus',
    eventDate: '2026-12-15T14:00:00.000Z',
    category: 'entertainment',
    isPublished: true,
  },
  {
    id: 'evt-104',
    title: 'Science Research Exhibition',
    description: 'Students present their research projects.',
    location: 'Science Block',
    eventDate: '2026-12-20T08:00:00.000Z',
    category: 'science',
    isPublished: false,
  },
  {
    id: 'evt-105',
    title: 'Environmental Awareness Day',
    description: 'Learn about sustainability and environmental protection.',
    location: 'Main Campus',
    eventDate: '2026-10-15T09:00:00.000Z',
    category: 'environment',
    isPublished: true,
  },
  {
    id: 'evt-106',
    title: 'Web Development Bootcamp',
    description: 'Learn the fundamentals of modern web development.',
    location: 'Engineering Block',
    eventDate: '2026-12-25T09:00:00.000Z',
    category: 'technology',
    isPublished: false,
  },
];

export const sessions: Session[] = [
  {
    id: 'ses-201',
    eventId: 'evt-101',
    title: 'Introduction to Artificial Intelligence',
    startsAt: '2026-12-04T09:00:00.000Z',
    endsAt: '2026-12-04T10:30:00.000Z',
    room: 'Engineering Room 1',
  },
  {
    id: 'ses-202',
    eventId: 'evt-101',
    title: 'Future of Cloud Computing',
    startsAt: '2026-12-04T11:00:00.000Z',
    endsAt: '2026-12-04T12:30:00.000Z',
    room: 'Engineering Room 2',
  },
  {
    id: 'ses-203',
    eventId: 'evt-102',
    title: 'Leadership Fundamentals',
    startsAt: '2026-12-10T10:00:00.000Z',
    endsAt: '2026-12-10T11:30:00.000Z',
    room: 'Business Room 1',
  },
  {
    id: 'ses-204',
    eventId: 'evt-102',
    title: 'Starting a Successful Business',
    startsAt: '2026-12-10T13:00:00.000Z',
    endsAt: '2026-12-10T14:30:00.000Z',
    room: 'Business Room 2',
  },
];
