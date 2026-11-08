export type CampusEvent = {
  id: number
  title: string
  date: string
  place: string
  seats: number
}

export const events: CampusEvent[] = [
  {
    id: 1,
    title: 'React Study Night',
    date: '2026-10-22',
    place: 'Room 302',
    seats: 20,
  },
  {
    id: 2,
    title: 'TypeScript Workshop',
    date: '2026-10-28',
    place: 'Room 205',
    seats: 8,
  },
  {
    id: 3,
    title: 'Web Development Meetup',
    date: '2026-11-03',
    place: 'Room 101',
    seats: 3,
  },
  {
    id: 4,
    title: 'Frontend Career Talk',
    date: '2026-11-10',
    place: 'Main Hall',
    seats: 15,
  },
]