import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../../Store/Slices/chatSlice';

const Favourite = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const { aiResponse, status, error } = useSelector((state) => state.chat);
  const { filtered } = useSelector((state) => state.products);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch(sendMessage(input));
      setInput('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button type="submit">Send</button>
      </form>

      {status === 'loading' && <p>Thinking...</p>}
      {error && <p>Error: {error}</p>}

      <pre>{aiResponse && JSON.stringify(aiResponse, null, 2)}</pre>

      <h3>Filtered Products</h3>
      {Object.entries(filtered).map(([category, products]) => (
        <div key={category}>
          <h4>{category}</h4>
          <ul>
            {products.map((prod) => (
              <li key={prod.id}>{prod.name} - {prod.color}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Favourite;
