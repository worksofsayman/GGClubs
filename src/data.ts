import { Club } from './types';

export const clubsData: Club[] = [
  {
    id: '1',
    collegeName: 'GGITS',
    clubName: 'AI & ML Club',
    description: 'Explore the fascinating world of Artificial Intelligence and Machine Learning. Work on cutting-edge projects, learn from industry experts, and build innovative solutions using the latest AI technologies.',
    googleFormLink: 'https://forms.gle/abcd123',
    startingYear: 2019,
    memberCount: 150,
    pastEvents: [
      {
        id: '1',
        title: 'AI Workshop 2024',
        date: '2024-03-15',
        description: 'Introduction to Machine Learning algorithms and practical implementation',
        participants: 85
      },
      {
        id: '2',
        title: 'Hackathon AI Challenge',
        date: '2024-01-20',
        description: 'Build AI solutions for real-world problems in 48 hours',
        participants: 120
      }
    ]
  },
  {
    id: '2',
    collegeName: 'GGITS',
    clubName: 'Coding Club',
    description: 'Enhance your programming skills through competitive coding, hackathons, and collaborative projects. Join a community of passionate developers and level up your coding expertise.',
    googleFormLink: 'https://forms.gle/xyz789',
    startingYear: 2018,
    memberCount: 200,
    pastEvents: [
      {
        id: '3',
        title: 'CodeFest 2024',
        date: '2024-02-10',
        description: 'Annual coding competition with multiple programming challenges',
        participants: 180
      }
    ]
  },
  {
    id: '3',
    collegeName: 'GGCE',
    clubName: 'Web Development Club',
    description: 'Work on real-world web projects using modern frameworks and technologies. Learn full-stack development, UI/UX design, and deploy applications that make a difference.',
    googleFormLink: 'https://forms.gle/efgh456',
    startingYear: 2020,
    memberCount: 130,
    pastEvents: [
      {
        id: '4',
        title: 'Web Dev Bootcamp',
        date: '2024-04-05',
        description: 'Intensive 3-day bootcamp covering React, Node.js, and MongoDB',
        participants: 95
      }
    ]
  },
  {
    id: '4',
    collegeName: 'GGCE',
    clubName: 'Environmental Club',
    description: 'Join our mission to create a sustainable future. Participate in eco-friendly initiatives, awareness campaigns, and environmental research projects that benefit our community.',
    googleFormLink: 'https://forms.gle/env123',
    startingYear: 2017,
    memberCount: 80,
    pastEvents: [
      {
        id: '5',
        title: 'Green Campus Initiative',
        date: '2024-03-22',
        description: 'Tree plantation drive and waste management awareness program',
        participants: 150
      }
    ]
  },
  {
    id: '5',
    collegeName: 'GGCT',
    clubName: 'Robotics Club',
    description: 'Build robots and automation tools that solve real-world problems. Engage in hands-on projects involving sensors, microcontrollers, and advanced robotics technologies.',
    googleFormLink: 'https://forms.gle/ijkl789',
    startingYear: 2019,
    memberCount: 110,
    pastEvents: [
      {
        id: '6',
        title: 'Robo Wars 2024',
        date: '2024-02-28',
        description: 'Robot fighting competition with custom-built combat robots',
        participants: 75
      }
    ]
  },
  {
    id: '6',
    collegeName: 'GGCT',
    clubName: 'Innovation Club',
    description: 'Foster creativity and innovation through interdisciplinary projects. Collaborate with students from various fields to develop breakthrough solutions and entrepreneurial ventures.',
    googleFormLink: 'https://forms.gle/innov456',
    startingYear: 2021,
    memberCount: 90,
    pastEvents: [
      {
        id: '7',
        title: 'Innovation Summit',
        date: '2024-01-15',
        description: 'Showcase of innovative student projects and startup pitches',
        participants: 200
      }
    ]
  }
];