import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import App from '../App.jsx'

const mockResponse = (body, ok = true) =>
  Promise.resolve({
    ok,
    json: () => Promise.resolve(body),
});

const todoItem1 = { id: 1, title: 'First todo', done: false, comments: [] };
const todoItem2 = { id: 2, title: 'Second todo', done: false, comments: [
  { id: 1, message: 'First comment' },
  { id: 2, message: 'Second comment' },
] };


const originalTodoList = [
  todoItem1,
  todoItem2,
]


describe('App', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.resetAllMocks();
    vi.unstubAllGlobals();
  });

  it('renders correctly', async () => {
    global.fetch.mockImplementationOnce(() =>
      mockResponse(originalTodoList)
    );
    render(<App />);

    expect(await screen.findByText('First todo')).toBeInTheDocument();
    expect(await screen.findByText('Second todo')).toBeInTheDocument();
    expect(await screen.findByText('First comment')).toBeInTheDocument();
    expect(await screen.findByText('Second comment')).toBeInTheDocument();
  });
});

