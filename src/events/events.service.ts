
import { Injectable, NotFoundException } from '@nestjs/common';
import { events, sessions } from './events.data';
import { Event, Session } from './interfaces/event.interface';
import { CreateEventDto } from './dto/create-event.dto';
import { FindEventsQueryDto } from './dto/find-events-query.dto';

@Injectable()
export class EventsService {
  // 1. Get all events with filtering, sorting and pagination
  findAll(query: FindEventsQueryDto) {
    const {
      category,
      location,
      isPublished,
      sortBy = 'eventDate',
      order = 'asc',
      page = 1,
      limit = 5,
    } = query;

    // Step 1: Filter events
    let result = events.filter((event) => {
      const matchesCategory =
        !category ||
        event.category.toLowerCase() === category.toLowerCase();

      const matchesLocation =
        !location ||
        event.location.toLowerCase().includes(location.toLowerCase());

      const matchesPublished =
        isPublished === undefined ||
        event.isPublished === (isPublished === 'true');

      return (
        matchesCategory &&
        matchesLocation &&
        matchesPublished
      );
    });

    // Step 2: Sort a copy of the filtered results
    result = [...result].sort((a, b) => {
      let comparison = 0;

      if (sortBy === 'title') {
        comparison = a.title.localeCompare(b.title);
      } else {
        comparison =
          new Date(a.eventDate).getTime() -
          new Date(b.eventDate).getTime();
      }

      return order === 'desc' ? -comparison : comparison;
    });

    // Step 3: Paginate the sorted results
    const offset = (page - 1) * limit;
    const items = result.slice(offset, offset + limit);

    const total = result.length;
    const totalPages = Math.ceil(total / limit);

    // Step 4: Return consistent response
    return {
      items,
      total,
      page,
      limit,
      totalPages,
    };
  }

  // 2. Get upcoming events
  findUpcoming(): Event[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return events
      .filter((event) => new Date(event.eventDate) >= today)
      .sort(
        (a, b) =>
          new Date(a.eventDate).getTime() -
          new Date(b.eventDate).getTime(),
      );
  }

  // 3. Find one event by ID
  findOne(id: string): Event {
    const event = events.find((event) => event.id === id);

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    return event;
  }

  // 4. Get sessions belonging to an event
  findSessions(eventId: string): Session[] {
    this.findOne(eventId);

    return sessions.filter(
      (session) => session.eventId === eventId,
    );
  }

  // 5. Find one session belonging to a particular event
  findSession(eventId: string, sessionId: string): Session {
    this.findOne(eventId);

    const session = sessions.find(
      (session) =>
        session.id === sessionId &&
        session.eventId === eventId,
    );

    if (!session) {
      throw new NotFoundException(
        `Session ${sessionId} not found for event ${eventId}`,
      );
    }

    return session;
  }

  // 6. Create a new event
  create(dto: CreateEventDto): Event {
    const newEvent: Event = {
      id: `evt-${Date.now()}`,
      ...dto,
    };

    events.push(newEvent);

    return newEvent;
  }
}
