const express = require('express');
const path = require('path');

const app = express();
const DEFAULT_PORT = 3000;
const PORT = process.env.PORT || DEFAULT_PORT;

const questions = [
  {
    id: 'q1',
    title: 'Session Manager',
    description: 'Event-driven session handling using a custom EventEmitter-based class.',
    highlights: [
      'Custom class extends EventEmitter',
      'Trigger method handles greet and exit events',
      'Once listener for first login',
      'Error event handling and listener count tracking'
    ]
  },
  {
    id: 'q2',
    title: 'DOM-like Event Bubbling',
    description: 'A lightweight custom element system with event bubbling and stopPropagation.',
    highlights: [
      'document -> form -> button hierarchy',
      'Custom dispatchEvent implementation',
      'Bubbling propagation through parent nodes',
      'Listener removal and event type checks'
    ]
  },
  {
    id: 'q3',
    title: 'Event Loop Visualization',
    description: 'Understanding the order of synchronous code, microtasks, and macrotasks.',
    highlights: [
      'Script start and script end logging',
      'setTimeout, setImmediate, Promise, and nextTick',
      'Microtask vs macrotask execution order',
      'Real-time event loop behavior explanation'
    ]
  }
];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', {
    pageTitle: 'Home',
    currentPage: 'home',
    questions
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    pageTitle: 'About',
    currentPage: 'about'
  });
});

app.get('/questions', (req, res) => {
  res.render('questions', {
    pageTitle: 'Questions',
    currentPage: 'questions',
    questions
  });
});

app.get('/questions/:id', (req, res) => {
  const selectedQuestion = questions.find((q) => q.id === req.params.id);

  if (!selectedQuestion) {
    return res.status(404).render('error', {
      pageTitle: 'Page Not Found',
      currentPage: 'questions'
    });
  }

  return res.render('question-detail', {
    pageTitle: selectedQuestion.title,
    currentPage: 'questions',
    question: selectedQuestion
  });
});

app.get('/contact', (req, res) => {
  res.render('contact', {
    pageTitle: 'Contact',
    currentPage: 'contact'
  });
});

app.use((req, res) => {
  res.status(404).render('error', {
    pageTitle: 'Page Not Found',
    currentPage: 'home'
  });
});

function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is already in use. Trying http://localhost:${port + 1}...`);
      startServer(port + 1);
      return;
    }

    console.error('Server error:', err);
    process.exit(1);
  });
}

startServer(PORT);
