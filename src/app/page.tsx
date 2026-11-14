'use client';

import { useState } from 'react';

type Table = {
  id: number;
  status: string;
  waiter: string;
  cls: string;
};

const tables: Table[] = [
  { id: 1, status: 'Available', waiter: '—', cls: 'green' },
  { id: 2, status: 'Occupied', waiter: 'Rahul', cls: 'red' },
  { id: 3, status: 'Preparing', waiter: 'Amit', cls: 'yellow' },
  { id: 4, status: 'Food Ready', waiter: 'Priya', cls: 'blue' },
  { id: 5, status: 'Delayed', waiter: 'Rahul', cls: 'red' },
  { id: 6, status: 'Bill Requested', waiter: 'Amit', cls: 'purple' },
  { id: 7, status: 'Cleaning', waiter: '—', cls: 'yellow' },
  { id: 8, status: 'Available', waiter: '—', cls: 'green' },
];

export default function Home() {
  const [view, setView] = useState('owner');
  const [selected, setSelected] = useState<Table | null>(null);
  const [message, setMessage] = useState(
    'Welcome! What would you like to eat today?'
  );
  const [request, setRequest] = useState('');

  const nav = ['owner', 'manager', 'waiter', 'kitchen', 'customer'];

  const go = (newView: string) => {
    setView(newView);
    setSelected(null);
  };

  const content = () => {
    if (view === 'owner') return <Owner onTable={setSelected} />;
    if (view === 'manager') return <Manager />;
    if (view === 'waiter') return <Waiter />;
    if (view === 'kitchen') return <Kitchen />;

    return (
      <Customer
        message={message}
        setMessage={setMessage}
        request={request}
        setRequest={setRequest}
      />
    );
  };

  return (
    <div className="app">
      <header className="top">
        <div className="brand">
          ServeFlow <span>AI</span>
        </div>

        <nav className="nav">
          {nav.map((item) => (
            <button
              key={item}
              className={view === item ? 'active' : ''}
              onClick={() => go(item)}
            >
              {item === 'customer'
                ? '📱 Customer QR'
                : item === 'owner'
                  ? '👑 Owner'
                  : item === 'manager'
                    ? '👨‍💼 Manager'
                    : item === 'waiter'
                      ? '🧑‍🍽️ Waiter'
                      : '👨‍🍳 Kitchen'}
            </button>
          ))}
        </nav>
      </header>

      <main className="main">{content()}</main>

      {selected && (
        <div
          className="modal-backdrop"
          onClick={() => setSelected(null)}
        >
          <div
            className="card modal"
            onClick={(event) => event.stopPropagation()}
          >
            <h2>Table {selected.id}</h2>
            <p>
              Status: <b>{selected.status}</b>
            </p>
            <p>
              Assigned waiter: <b>{selected.waiter}</b>
            </p>
            <p className="muted">
              Customer count, order timeline, requests and billing details
              will appear here when the Supabase backend is connected.
            </p>

            <button
              className="button"
              onClick={() => setSelected(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Owner({
  onTable,
}: {
  onTable: (table: Table) => void;
}) {
  const stats = [
    ['🟢 Available Tables', '8'],
    ['🔴 Occupied Tables', '12'],
    ['🍳 Preparing Orders', '9'],
    ['⚠️ Attention Required', '3'],
    ['💰 Today Revenue', '₹24,500'],
    ['📦 Total Orders', '87'],
  ];

  return (
    <>
      <div className="hero">
        <h1>Good morning, Owner 👋</h1>
        <p className="muted">
          Spice Garden • Live restaurant command center
        </p>
      </div>

      <div className="grid">
        {stats.map(([title, value]) => (
          <div className="card" key={title}>
            <div className="muted">{title}</div>
            <div className="value">{value}</div>
          </div>
        ))}
      </div>

      <div className="two">
        <section className="card">
          <h2>🪑 Live Restaurant Floor</h2>

          <div className="tables">
            {tables.map((table) => (
              <button
                className={`table ${table.cls}`}
                key={table.id}
                onClick={() => onTable(table)}
              >
                <b>T{String(table.id).padStart(2, '0')}</b>

                <div className="small">{table.status}</div>

                <div className="small muted">
                  {table.waiter}
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="card">
          <h2>🚨 Attention Required</h2>

          <div className="list">
            <div className="alert">
              ⚠️ Table 5 — Order delayed 24 minutes
            </div>

            <div className="alert">
              🔔 Table 8 — Customer needs waiter
            </div>

            <div className="alert">
              🍔 Table 3 — Food ready for 6 minutes
            </div>
          </div>
        </section>
      </div>

      <section className="card section">
        <h2>✨ ServeFlow AI Insights</h2>

        <div className="list">
          <div className="row">
            <span>Rahul is overloaded with 6 tables.</span>
            <b>Assign next table → Priya</b>
          </div>

          <div className="row">
            <span>Pizza preparation is slower than usual.</span>
            <b>+8 min today</b>
          </div>

          <div className="row">
            <span>Peak period predicted.</span>
            <b>7 PM – 9 PM</b>
          </div>
        </div>
      </section>
    </>
  );
}

function Manager() {
  const stats = [
    ['🪑 Live Tables', '24'],
    ['📦 Active Orders', '11'],
    ['🔔 Customer Requests', '3'],
    ['⚠️ Delays', '2'],
  ];

  return (
    <>
      <div className="hero">
        <h1>Manager Dashboard 👨‍💼</h1>
        <p className="muted">
          Control daily restaurant operations.
        </p>
      </div>

      <div className="grid">
        {stats.map(([title, value]) => (
          <div className="card" key={title}>
            <div>{title}</div>
            <div className="value">{value}</div>
          </div>
        ))}
      </div>

      <section className="card section">
        <h2>Today's Operations</h2>

        <div className="list">
          <div className="row">
            <span>Assign waiter to Table 8</span>
            <button className="button">Assign</button>
          </div>

          <div className="row">
            <span>Order #1025 delayed</span>
            <button className="button danger">Escalate</button>
          </div>
        </div>
      </section>
    </>
  );
}

function Waiter() {
  const [completed, setCompleted] = useState<string[]>([]);

  const requests = [
    ['Table 2', '🍳 Food Preparing'],
    ['Table 5', '💧 Water Requested'],
    ['Table 9', '💳 Bill Requested'],
    ['Table 4', '🔔 Food Ready'],
  ];

  const complete = (table: string) => {
    setCompleted([...completed, table]);
  };

  return (
    <>
      <div className="hero">
        <h1>Rahul&apos;s Dashboard 🧑‍🍽️</h1>
        <p className="muted">
          Your active tables and customer requests.
        </p>
      </div>

      <div className="list">
        {requests.map(([table, status]) => (
          <div className="row" key={table}>
            <div>
              <b>{table}</b>

              <div className="small muted">
                {status}
              </div>
            </div>

            {completed.includes(table) ? (
              <button className="button success">
                Completed ✓
              </button>
            ) : (
              <button
                className="button"
                onClick={() => complete(table)}
              >
                Complete
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

function Kitchen() {
  const [ready, setReady] = useState<string[]>([]);

  const orders = [
    ['#1025', 'Table 05', 'Pizza + Pasta', '18 min'],
    ['#1026', 'Table 03', 'Paneer Tikka', '9 min'],
    ['#1027', 'Table 09', 'Burger + Fries', '4 min'],
  ];

  const markReady = (orderId: string) => {
    if (!ready.includes(orderId)) {
      setReady([...ready, orderId]);
    }
  };

  return (
    <>
      <div className="hero">
        <h1>Kitchen Display 👨‍🍳</h1>
        <p className="muted">
          Live order queue
        </p>
      </div>

      <div className="grid">
        {orders.map((order) => {
          const isReady = ready.includes(order[0]);

          return (
            <div className="card" key={order[0]}>
              <b>
                {order[0]} • {order[1]}
              </b>

              <p>{order[2]}</p>

              <p className="muted">
                Waiting: {order[3]}
              </p>

              <button
                className={`button ${
                  isReady ? 'success' : 'warning'
                }`}
                onClick={() => markReady(order[0])}
              >
                {isReady ? 'Ready ✓' : 'Mark Ready'}
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

function Customer({
  message,
  setMessage,
  request,
  setRequest,
}: {
  message: string;
  setMessage: (value: string) => void;
  request: string;
  setRequest: (value: string) => void;
}) {
  const [cart, setCart] = useState<string[]>([]);

  const askAI = () => {
    const question = request.toLowerCase();

    if (question.includes('spicy')) {
      setMessage(
        '🌶️ Try Paneer Tikka Masala — spicy, popular and rated 4.9 ⭐'
      );
    } else if (question.includes('veg')) {
      setMessage(
        '🥇 Best vegetarian choice: Paneer Tikka Masala. ⭐ 4.9 • 🔥 Best Seller'
      );
    } else if (question.includes('best')) {
      setMessage(
        '🥇 Our top pick: Paneer Tikka Masala. 🥈 Special Pizza. 🥉 Cold Coffee.'
      );
    } else if (question.includes('budget')) {
      setMessage(
        '💰 Best budget choice: Cold Coffee + Garlic Bread for an affordable meal.'
      );
    } else {
      setMessage(
        '✨ I recommend Paneer Tikka Masala or our Special Cheese Pizza based on popularity and ratings.'
      );
    }
  };

  const sendRequest = (type: string) => {
    alert(`${type} request sent successfully! (Demo mode)`);
  };

  const addToCart = (item: string) => {
    setCart([...cart, item]);
  };

  const menu = [
    ['Paneer Tikka Masala', '₹280'],
    ['Special Cheese Pizza', '₹350'],
    ['Cold Coffee', '₹160'],
  ];

  return (
    <div className="phone">
      <div className="hero">
        <h1>Spice Garden ✨</h1>
        <p className="muted">
          🪑 Table 05 • Welcome!
        </p>
      </div>

      <div className="grid">
        <button
          className="card action-card"
          onClick={() => alert('Menu is below 👇')}
        >
          <div className="value">📖</div>
          <b>View Menu</b>
        </button>

        <button
          className="card action-card"
          onClick={() => sendRequest('Call Waiter')}
        >
          <div className="value">🛎️</div>
          <b>Call Waiter</b>
        </button>

        <button
          className="card action-card"
          onClick={() => sendRequest('Water')}
        >
          <div className="value">💧</div>
          <b>Request Water</b>
        </button>

        <button
          className="card action-card"
          onClick={() => sendRequest('Bill')}
        >
          <div className="value">💳</div>
          <b>Request Bill</b>
        </button>
      </div>

      <section className="card section">
        <h2>✨ Ask ServeFlow AI</h2>

        <div className="chat">{message}</div>

        <input
          className="input"
          value={request}
          onChange={(event) =>
            setRequest(event.target.value)
          }
          placeholder="What is the best food here?"
        />

        <button
          className="button primary"
          style={{ marginTop: 10 }}
          onClick={askAI}
        >
          Ask AI
        </button>
      </section>

      <section className="card section">
        <h2>🍽️ Popular Menu</h2>

        {menu.map(([name, price]) => (
          <div className="menuitem" key={name}>
            <span>
              <b>{name}</b>

              <div className="small muted">
                ⭐ Popular choice
              </div>
            </span>

            <button
              className="button"
              onClick={() => addToCart(name)}
            >
              Add {price}
            </button>
          </div>
        ))}

        {cart.length > 0 && (
          <div className="chat">
            🛒 Cart: {cart.join(', ')}
          </div>
        )}
      </section>
    </div>
  );
}
